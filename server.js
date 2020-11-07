require('custom-env').env(true);
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
var fileupload = require('express-fileupload');
var fs = require('fs');
var path = require('path');

// to log unhandled errors
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

const port = process.env.PORT || 5000;
const dbUrl = process.env.DATABASE_URL;

let dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(dbUrl, dbOptions);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));

//routes
const documentRouter = require('./routes/documents');

// middleware
app.use(express.json());
app.use(
  morgan('common', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {
      flags: 'a',
    }),
  })
);
app.use(cors());
app.use(fileupload());

// resources routes
app.use('/document', documentRouter);

// health check
app.get('/', (req, res) => {
  res.status(200).json({
    state: 'healthy',
  });
});

// start server
db.once('open', () => {
  console.log('********** Successfully connected to database @ ', dbUrl);
  app.listen(port, () => {
    console.log('********** Express server started');
  });
});
