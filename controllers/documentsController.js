const ResponseManager = require('../utils/responseManager');
const ErrorConstants = require('../constants/errorConstants');
const DocumentUtil = require('../utils/documentUtil');
const DocumentDAO = require('../db/repository/documentDao');
const _ = require('lodash');

/**
 * Upload document
 * @param {*} req
 * @param {*} res
 */
const uploadDocument = (req, res) => {
  try {
    DocumentUtil.uploadingFile(req.files.document, req.body)
      .then((uploaded) => {
        let newDocument = {
          documentKey: uploaded.s3.Key,
          type: uploaded.type,
          extension: uploaded.extension,
          name: uploaded.documentName,
          tags: JSON.parse(req.body.tags),
        };
        DocumentDAO.createDocument(newDocument).then((createdDoc) => {
          console.log('created Document:', createdDoc);
        });
      })
      .catch((err) => {
        console.error(err.message);
      });
    ResponseManager.customResponse(
      res,
      202,
      `${req.files.document.name} is being uploaded to cloud storage under category type: ${req.body.type} !!`
    );
  } catch (error) {
    ResponseManager.errorResponse(
      res,
      500,
      ErrorConstants.SOMETHING_WENT_WRONG,
      error.message
    );
  }
};

/**
 * Fetches documents
 * @param {*} req
 * @param {*} res
 */
const retrieveDocuments = (req, res) => {
  try {
    // query params processing
    let queryDetails = {};
    if (
      req.query.tags &&
      !_.isEmpty(req.query.tags) &&
      !_.isArray(req.query.tags)
    )
      req.query.tags = [req.query.tags];

    if (!_.isEmpty(req.query.tags))
      _.extend(queryDetails, { tags: { $in: req.query.tags } });

    if (req.query.onlyAvailableDocuments == 'true')
      _.extend(queryDetails, { status: 'available' });

    let pagination = {};
    if (req.query.page)
      _.extend(pagination, { page: parseInt(req.query.page) });
    if (req.query.limit)
      _.extend(pagination, { limit: parseInt(req.query.limit) });

    DocumentDAO.getDocuments(queryDetails, pagination)
      .then((filteredDocuments) => {
        ResponseManager.documentResponse(res, 200, {
          count: filteredDocuments.length,
          data: filteredDocuments,
          pagination: { page: pagination.page, limit: pagination.limit },
        });
      })
      .catch((err) => {
        ResponseManager.errorResponse(
          res,
          400,
          ErrorConstants.FAILED,
          err.message
        );
      });
  } catch (error) {
    ResponseManager.errorResponse(
      res,
      500,
      ErrorConstants.SOMETHING_WENT_WRONG,
      error.message
    );
  }
};

module.exports = {
  uploadDocument,
  retrieveDocuments,
};
