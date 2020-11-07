const router = require('express').Router();
const DocumentController = require('../controllers/documentsController');

router.post('/upload', DocumentController.uploadDocument);

router.get('/', DocumentController.retrieveDocuments);

module.exports = router;
