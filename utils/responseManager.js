const _ = require('lodash');

const errorResponse = (res, code, type, message) => {
  res.status(code).json({
    status: 'error',
    error_type: type,
    message: message,
  });
};

const customResponse = (res, code, message) => {
  res.status(code).json({
    status: 'success',
    message: message,
  });
};

const documentResponse = (res, code, object) => {
  if (!_.isEmpty(object.data) && _.isArray(object.data)) {
    object.data = _.map(object.data, (obj) => {
      obj.document = obj.documentKey;
      obj = _.pick(obj, [
        '_id',
        'document',
        'tags',
        'type',
        'extension',
        'status',
        'createdAt',
        'updatedAt',
      ]);
      if (obj.document)
        obj.document = process.env.CLOUDFRONT_URL + obj.document;

      return obj;
    });
    res.status(code).json({
      documents: object,
    });
  } else if (_.isEmpty(object.data) && _.isArray(object.data)) {
    res.status(code).json({
      documents: object,
    });
  } else {
    object.document = object.documentKey;
    object = _.pick(object, [
      '_id',
      'document',
      'tags',
      'type',
      'extension',
      'status',
      'createdAt',
      'updatedAt',
    ]);
    if (object.document)
      object.document = process.env.CLOUDFRONT_URL + object.document;
    res.status(code).json({
      document: object,
    });
  }
};

module.exports = {
  errorResponse,
  customResponse,
  documentResponse,
};
