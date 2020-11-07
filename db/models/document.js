const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const documentSchema = new mongoose.Schema(
  {
    documentKey: {
      type: Types.String,
      required: false,
      default: null,
    },
    name: {
      type: Types.String,
      required: false,
      default: null,
    },
    type: {
      type: Types.String,
      required: false,
      default: null,
    },
    extension: {
      type: Types.String,
      required: false,
      default: null,
    },
    status: {
      type: Types.String,
      required: false,
      default: 'available',
    },
    tags: {
      type: [Types.String],
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Document', documentSchema);
