const Document = require('../models/document');
const DocumentConstants = require('../../constants/documentConstants');

const _ = require('lodash');

/**
 * Create a new document
 * @param {*} newDocument
 * @returns {Promise}
 */
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

/**
 * Fetch documents based on query details
 * @param {*} queryDetails
 * @param {*} pagination
 * @returns {Array} array of matched documents
 */
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
