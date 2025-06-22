import {
  TranscribeClient,
  StartTranscriptionJobCommand,
  GetTranscriptionJobCommand,
} from "@aws-sdk/client-transcribe";
import {
  showToastError,
  showToastSuccess,
} from "../components/common/ShowToast";

const client = new TranscribeClient({
  region: "us-east-2",
  credentials: {
    accessKeyId: import.meta.env.VITE_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_APP_AWS_SECRET_ACCESS_KEY,
  },
});

// Check if AWS SDK is loaded
const checkAWSSDK = () => {
  if (typeof window.AWS === "undefined") {
    throw new Error(
      "AWS SDK not loaded. Please include the AWS SDK script in your HTML."
    );
  }
};

// Initialize AWS configuration
export const initializeAWS = () => {
  checkAWSSDK();

  const config = {
    region: "us-east-2",
    accessKeyId: import.meta.env.VITE_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_APP_AWS_SECRET_ACCESS_KEY,
    signatureVersion: "v4",
  };

  if (!config.accessKeyId || !config.secretAccessKey) {
    throw new Error(
      "AWS credentials not found. Please check your environment variables."
    );
  }

  window.AWS.config.update({
    region: "us-east-2",
    credentials: new window.AWS.Credentials({
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    }),
    signatureVersion: config.signatureVersion,
    httpOptions: {
      timeout: 60000,
      connectTimeout: 10000,
    },
  });
};

export const uploadToS3 = async (audioBlob) => {
  try {
    checkAWSSDK();

    // Validate inputs
    if (!audioBlob || audioBlob.size === 0) {
      throw new Error("Invalid audio blob provided");
    }

    const bucketName = import.meta.env.VITE_APP_S3_BUCKET_NAME;
    if (!bucketName) {
      throw new Error("S3 bucket name not configured");
    }

    const s3 = new window.AWS.S3({
      region: "us-east-2",
      credentials: new window.AWS.Credentials({
        accessKeyId: import.meta.env.VITE_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_APP_AWS_SECRET_ACCESS_KEY,
      }),
      signatureVersion: "v4",
      httpOptions: {
        timeout: 60000,
        connectTimeout: 10000,
      },
    });

    const fileName = `audio-${Date.now()}.webm`;
    const uploadParams = {
      Bucket: bucketName,
      Key: fileName,
      Body: audioBlob,
      ContentType: "audio/webm",
      ServerSideEncryption: "AES256",
    };

    console.log("Starting S3 upload with params:", {
      bucket: uploadParams.Bucket,
      key: uploadParams.Key,
      contentType: uploadParams.ContentType,
      fileSize: audioBlob.size,
    });

    const upload = s3.upload(uploadParams);

    upload.on("httpUploadProgress", (progress) => {
      const percentComplete = Math.round(
        (progress.loaded / progress.total) * 100
      );
      console.log(`Upload progress: ${percentComplete}%`);
    });

    const result = await Promise.race([
      upload.promise(),
      new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error("Upload timeout after 60 seconds")),
          60000
        )
      ),
    ]);

    console.log("S3 upload successful:", result.Location);
    return result.Location;
  } catch (error) {
    console.error("S3 upload error:", error);

    // Provide more specific error messages
    if (error.code === "NetworkingError") {
      throw new Error(
        "Network error during upload. Please check your internet connection."
      );
    } else if (error.code === "AccessDenied") {
      throw new Error(
        "Access denied. Please check your AWS credentials and S3 bucket permissions."
      );
    } else if (error.code === "NoSuchBucket") {
      throw new Error("S3 bucket not found. Please verify the bucket name.");
    }

    throw new Error(`Upload failed: ${error.message}`);
  }
};

export const transcribeAudio = async (s3Uri) => {
  try {
    const jobName = `transcription-${Date.now()}`;

    const startParams = {
      TranscriptionJobName: jobName,
      LanguageCode: "en-US",
      MediaFormat: "webm",
      Media: {
        MediaFileUri: s3Uri,
      },
      OutputBucketName: import.meta.env.VITE_APP_S3_BUCKET_NAME,
    };

    console.log("Starting transcription job:", jobName);
    showToastSuccess("Starting transcription job");
    const startCommand = new StartTranscriptionJobCommand(startParams);
    await client.send(startCommand);

    return await pollTranscriptionJob(jobName);
  } catch (error) {
    console.error("Transcription error:", error);
    showToastError(error.message);
    throw new Error(`Transcription failed: ${error.message}`);
  }
};

const pollTranscriptionJob = async (
  jobName,
  maxAttempts = 30,
  delayMs = 2000
) => {
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      const getCommand = new GetTranscriptionJobCommand({
        TranscriptionJobName: jobName,
      });

      const result = await client.send(getCommand);
      const status = result.TranscriptionJob.TranscriptionJobStatus;
      showToastSuccess(`Transcription job status: ${status}`);

      if (status === "COMPLETED") {
        showToastSuccess("Your transcrption is available in text box");
        const transcriptUri =
          result.TranscriptionJob.Transcript.TranscriptFileUri;
        const response = await fetch(transcriptUri);

        if (!response.ok) {
          throw new Error(`Failed to fetch transcript: ${response.statusText}`);
        }

        const transcriptData = await response.json();
        return transcriptData.results.transcripts[0].transcript;
      } else if (status === "FAILED") {
        const failureReason =
          result.TranscriptionJob.FailureReason || "Unknown error";
        throw new Error(`Transcription job failed: ${failureReason}`);
      }

      await new Promise((resolve) => setTimeout(resolve, delayMs));
      attempts++;
    } catch (error) {
      console.error("Error polling transcription job:", error);
      throw error;
    }
  }

  throw new Error("Transcription job timed out");
};

export const synthesizeSpeech = async (text) => {
  try {
    checkAWSSDK();

    if (!text || text.trim().length === 0) {
      throw new Error("No text provided for speech synthesis");
    }

    const polly = new window.AWS.Polly();
    const params = {
      Text: text,
      OutputFormat: "mp3",
      VoiceId: "Joanna",
      Engine: "neural",
      LanguageCode: "en-US",
    };

    const result = await polly.synthesizeSpeech(params).promise();
    const audioBlob = new Blob([result.AudioStream], { type: "audio/mpeg" });
    return URL.createObjectURL(audioBlob);
  } catch (error) {
    console.error("Speech synthesis error:", error);
    throw new Error(`Speech synthesis failed: ${error.message}`);
  }
};
