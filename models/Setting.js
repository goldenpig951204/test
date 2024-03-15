const mongoose = require("mongoose");

const SettingSchema = mongoose.Schema(
  {
    indexmenowEmail: {
      type: String,
      required: true,
    },
    indexmenowPassword: {
      type: String,
      required: true,
    },
    indexmenowApiKey: {
      type: String,
      required: true,
    },
    sendgridApiKey: {
      type: String,
      required: true,
    },
    sendgridUser: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Setting = mongoose.model("Setting", SettingSchema);

module.exports = Setting;
