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
    region: "us-east-1",
    accessKeyId: import.meta.env.VITE_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_APP_AWS_SECRET_ACCESS_KEY,
    signatureVersion: "v4",
  };

  // Validate environment variables
  if (!config.accessKeyId || !config.secretAccessKey) {
    throw new Error(
      "AWS credentials not found. Please check your environment variables."
    );
  }

  window.AWS.config.update({
    region: config.region,
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

  console.log("AWS Configuration:", {
    region: window.AWS.config.region,
    credentials: window.AWS.config.credentials
      ? "Configured"
      : "Not configured",
    signatureVersion: window.AWS.config.signatureVersion,
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
      region: "us-east-1",
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
    checkAWSSDK();

    // Check if TranscribeService is available
    if (typeof window.AWS.TranscribeService !== "function") {
      throw new Error(
        "AWS TranscribeService not available. Please ensure you have the correct AWS SDK version."
      );
    }

    const transcribeService = new window.AWS.TranscribeService();
    const jobName = `transcription-${Date.now()}`;

    const params = {
      TranscriptionJobName: jobName,
      LanguageCode: "en-US",
      MediaFormat: "webm",
      Media: {
        MediaFileUri: s3Uri,
      },
      OutputBucketName: import.meta.env.VITE_APP_S3_BUCKET_NAME,
    };

    console.log("Starting transcription job:", jobName);
    await transcribeService.startTranscriptionJob(params).promise();

    return await pollTranscriptionJob(jobName);
  } catch (error) {
    console.error("Transcription error:", error);
    throw new Error(`Transcription failed: ${error.message}`);
  }
};

const pollTranscriptionJob = async (jobName, maxAttempts = 30) => {
  const transcribeService = new window.AWS.TranscribeService();
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      const result = await transcribeService
        .getTranscriptionJob({ TranscriptionJobName: jobName })
        .promise();

      const status = result.TranscriptionJob.TranscriptionJobStatus;
      console.log(`Transcription job status: ${status}`);

      if (status === "COMPLETED") {
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

      // Wait 2 seconds before polling again
      await new Promise((resolve) => setTimeout(resolve, 2000));
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

// const AWS_CONFIG = {
//   region: "us-east-1",
//   accessKeyId: import.meta.env.VITE_APP_AWS_ACCESS_KEY_ID,
//   secretAccessKey: import.meta.env.VITE_APP_AWS_SECRET_ACCESS_KEY,
// };

// // Initialize AWS configuration
// export const initializeAWS = () => {
//   window.AWS.config.update({
//     region: "us-east-1",
//     credentials: new window.AWS.Credentials({
//       accessKeyId: import.meta.env.VITE_APP_AWS_ACCESS_KEY_ID,
//       secretAccessKey: import.meta.env.VITE_APP_AWS_SECRET_ACCESS_KEY,
//     }),
//     signatureVersion: "v4",
//     httpOptions: {
//       timeout: 60000,
//       connectTimeout: 10000,
//     },
//   });

//   console.log("AWS Configuration:", {
//     region: window.AWS.config.region,
//     credentials: window.AWS.config.credentials
//       ? "Configured"
//       : "Not configured",
//     signatureVersion: window.AWS.config.signatureVersion,
//   });
// };

// export const uploadToS3 = async (audioBlob) => {
//   try {
//     const s3 = new window.AWS.S3({
//       region: "us-east-1",
//       credentials: new window.AWS.Credentials({
//         accessKeyId: import.meta.env.VITE_APP_AWS_ACCESS_KEY_ID,
//         secretAccessKey: import.meta.env.VITE_APP_AWS_SECRET_ACCESS_KEY,
//       }),
//       signatureVersion: "v4",
//       httpOptions: {
//         timeout: 60000,
//         connectTimeout: 10000,
//       },
//     });

//     const fileName = `audio-${Date.now()}.webm`;
//     const uploadParams = {
//       Bucket: import.meta.env.VITE_APP_S3_BUCKET_NAME,
//       Key: fileName,
//       Body: audioBlob,
//       ContentType: "audio/webm",
//       ServerSideEncryption: "AES256",
//     };

//     console.log("Starting S3 upload with params:", {
//       bucket: uploadParams.Bucket,
//       key: uploadParams.Key,
//       contentType: uploadParams.ContentType,
//       fileSize: audioBlob.size,
//     });

//     const upload = s3.upload(uploadParams);

//     upload.on("httpUploadProgress", (progress) => {
//       const percentComplete = Math.round(
//         (progress.loaded / progress.total) * 100
//       );
//       console.log(`Upload progress: ${percentComplete}%`);
//     });

//     const result = await Promise.race([
//       upload.promise(),
//       new Promise((_, reject) =>
//         setTimeout(() => reject(new Error("Upload timeout")), 60000)
//       ),
//     ]);

//     console.log("S3 upload successful:", result.Location);
//     return result.Location;
//   } catch (error) {
//     console.error("S3 upload error:", error);
//     throw new Error(`Upload failed: ${error.message}`);
//   }
// };

// export const transcribeAudio = async (s3Uri) => {
//   // const transcribeService = new window.AWS.TranscribeService();
//   const transcribeService = new window.AWS.TranscribeService();
//   const jobName = `transcription-${Date.now()}`;

//   const params = {
//     TranscriptionJobName: jobName,
//     LanguageCode: "en-US",
//     MediaFormat: "webm",
//     Media: {
//       MediaFileUri: s3Uri,
//     },
//     OutputBucketName: import.meta.env.VITE_APP_S3_BUCKET_NAME,
//   };

//   await transcribeService.startTranscriptionJob(params).promise();
//   return await pollTranscriptionJob(jobName);
// };

// const pollTranscriptionJob = async (jobName) => {
//   const transcribeService = new window.AWS.TranscribeService();

//   while (true) {
//     try {
//       const result = await transcribeService
//         .getTranscriptionJob({ TranscriptionJobName: jobName })
//         .promise();

//       if (result.TranscriptionJob.TranscriptionJobStatus === "COMPLETED") {
//         const transcriptUri =
//           result.TranscriptionJob.Transcript.TranscriptFileUri;
//         const response = await fetch(transcriptUri);
//         const transcriptData = await response.json();
//         return transcriptData.results.transcripts[0].transcript;
//       } else if (result.TranscriptionJob.TranscriptionJobStatus === "FAILED") {
//         throw new Error("Transcription job failed");
//       }

//       await new Promise((resolve) => setTimeout(resolve, 2000));
//     } catch (error) {
//       console.error("Error polling transcription job:", error);
//       break;
//     }
//   }
// };

// export const synthesizeSpeech = async (text) => {
//   const polly = new window.AWS.Polly();
//   const params = {
//     Text: text,
//     OutputFormat: "mp3",
//     VoiceId: "Joanna",
//     Engine: "neural",
//     LanguageCode: "en-US",
//   };

//   const result = await polly.synthesizeSpeech(params).promise();
//   const audioBlob = new Blob([result.AudioStream], { type: "audio/mpeg" });
//   return URL.createObjectURL(audioBlob);
// };
