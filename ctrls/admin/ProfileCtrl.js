const fs = require("fs");
const bcrypt = require("bcrypt");
const UserModel = require("../../models/User");

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (req.file) {
      const user = await UserModel.findById(id);
      if (user.avatar && fs.existsSync(`uploads/users/${user.avatar}`)) {
        fs.unlinkSync(`uploads/users/${user.avatar}`);
      }
      data.avatar = req.file.filename;
    }
    if (data.password == "") {
      delete data.password;
    } else {
      const salt = bcrypt.genSaltSync(10);
      data.password = bcrypt.hashSync(data.password, salt);
    }

    await UserModel.findByIdAndUpdate(id, data);
    return res.json({
      status: true,
      avatar: data.avatar,
      msg: "Successfully updated.",
    });
  } catch (err) {
    return res.json({
      status: false,
      msg: err.message,
    });
  }
};

module.exports = { update };
