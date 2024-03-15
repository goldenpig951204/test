const SettingModel = require("../../models/Setting");

const fetch = async (req, res) => {
  const setting = await SettingModel.findOne();
  return res.json(setting);
};

const update = async (req, res) => {
  try {
    const data = req.body;
    await SettingModel.findOneAndUpdate(null, data, {
      upsert: true,
    });
    return res.json({
      status: true,
      msg: "Successfully updated.",
    });
  } catch (err) {
    return res.json({
      status: false,
      msg: err.message,
    });
  }
};

module.exports = {
  fetch,
  update,
};
