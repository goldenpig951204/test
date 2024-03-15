const bcrypt = require("bcrypt");
const UserModel = require("../../models/User");
const User = require("../../models/User");

const fetch = async (req, res) => {
  const users = await UserModel.find({ role: "user" }).sort({ name: 1 });
  return res.json(users);
};

const fetchById = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);
  return res.json(user);
};

const create = async (req, res) => {
  try {
    const data = req.body;
    const salt = bcrypt.genSaltSync(10);
    data.password = bcrypt.hashSync(data.password, salt);
    await UserModel.create(data);
    return res.json({
      status: true,
      msg: "Successfully created.",
    });
  } catch (err) {
    return res.json({
      status: false,
      msg: err.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const isDuplicateEmail = await UserModel.findOne({
      _id: { $ne: id },
      email: data.email,
    });
    if (!isDuplicateEmail) {
      if (data.password === "") {
        await UserModel.findByIdAndUpdate(id, {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          status: data.status,
        });
      } else {
        const salt = bcrypt.genSaltSync(10);
        await UserModel.findByIdAndUpdate(id, {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          password: bcrypt.hashSync(data.password, salt),
          status: data.status,
        });
      }
      return res.json({
        status: true,
        msg: "Successfully updated.",
      });
    } else {
      return res.json({
        status: false,
        msg: "The email is duplicated.",
      });
    }
  } catch (err) {
    return res.json({
      status: false,
      msg: err.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.body;
    await UserModel.findByIdAndDelete(id);
    return res.json({
      status: true,
      msg: "Successfully deleted.",
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
  fetchById,
  create,
  update,
  remove,
};
