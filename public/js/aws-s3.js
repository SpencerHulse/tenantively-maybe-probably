require("dotenv").config();
const fs = require("fs");
/* Amazon Web Services s3 Bucket */
const S3 = require("aws-sdk/clients/s3");

/* Bucket Data */
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// Uploads a file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
}

exports.uploadFile = uploadFile;

// Delete a file on s3
function deleteFile(fileKey) {
  const deleteParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.deleteObject(deleteParams).promise();
}

exports.deleteFile = deleteFile;
