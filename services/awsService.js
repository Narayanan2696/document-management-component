const AWS = require('aws-sdk');
var s3;

(async () => {
  s3 = await initializeS3Service();
})();

/**
 * Upload the file to given S3 bucket
 * @param {*} key file path (object key)
 * @param {*} file file to upload in S3
 * @param {*} aclAccess optional param which signifies the access right for an object
 */
const uploadToS3 = (key, file, aclAccess = 'public-read') => {
  return new Promise(async (resolve, reject) => {
    try {
      let uploadParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: '',
        Body: '',
        ACL: aclAccess, // is set to aceess uploaded object through cloud front
      };
      parseUploadedFile(file).then(async (fileStream) => {
        uploadParams.Body = fileStream;
        uploadParams.Key = key;

        await s3.upload(uploadParams, (err, uploadedFile) => {
          if (err) {
            reject(err);
          }
          if (uploadedFile) {
            console.log('Upload Success', uploadedFile);
            resolve(uploadedFile);
          }
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};

// utility functions
// initialize s3
async function initializeS3Service() {
  await AWS.config.update({ region: process.env.AWS_REGION });
  let s3 = await new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });
  return s3;
}

/**
 * convert the file to buffer data
 * @param {*} file
 * @returns {Buffer} filesteam
 */
function parseUploadedFile(file) {
  return new Promise(async (resolve, reject) => {
    try {
      let docFile = file;
      let stringified = await JSON.stringify(docFile.data); // convert products data to buffer json string
      let bufferedData = await Buffer.from(JSON.parse(stringified).data);
      resolve(bufferedData);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  uploadToS3,
};
