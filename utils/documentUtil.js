const AWSService = require('../services/awsService');
const _ = require('lodash');

const uploadingFile = (file, body) => {
  return new Promise((resolve, reject) => {
    try {
      let imageNameArray = file.name.split('.');
      let extension = imageNameArray[imageNameArray.length - 1];
      let documentName = _.replace(file.name, `.${extension}`, '');

      let objectKey = body.type.toString() + '/' + file.name;
      AWSService.uploadToS3(objectKey, file, 'public-read')
        .then((createdS3Object) =>
          resolve({
            s3: createdS3Object,
            type: body.type.toString(),
            extension,
            documentName,
          })
        )
        .catch((err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  uploadingFile,
};
