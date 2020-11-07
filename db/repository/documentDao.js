const Document = require('../models/document');
const DocumentConstants = require('../../constants/documentConstants');

const _ = require('lodash');

const createDocument = (newDocument) => {
  return new Promise((resolve, reject) => {
    try {
      const documentObj = new Document(newDocument);
      resolve(documentObj.save());
    } catch (error) {
      reject(error);
    }
  });
};

const getDocuments = (queryDetails, pagination = {}) => {
  return new Promise((resolve, reject) => {
    try {
      if (!_.isEmpty(pagination))
        resolve(
          Document.find(queryDetails)
            .sort({ createdAt: 'asc' })
            .skip(
              (pagination.limit || DocumentConstants.PAGE_LIMIT) *
                (pagination.page || 1) -
                (pagination.limit || DocumentConstants.PAGE_LIMIT)
            )
            .limit(pagination.limit || DocumentConstants.PAGE_LIMIT)
        );
      else resolve(Document.find(queryDetails).sort({ createdAt: 'asc' }));
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createDocument,
  getDocuments,
};
