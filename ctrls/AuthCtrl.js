const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const data = req.body;
        let user = await UserModel.findOne({ email: data.email });
        if (!user) {
            const salt = bcrypt.genSaltSync(10);
            data.password = bcrypt.hashSync(data.password, salt);
            await UserModel.create(data);

            return res.json({
                status: true,
                msg: "Successfully registered."
            });
        } else {
            return res.json({
                status: false,
                msg: "A user with the email already exists."
            });
        }
    } catch (err) {
        return res.json({
            status: false,
            msg: err.message
        });
    }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        if (user.status) {
          const token = jwt.sign(
            {
              id: user._id,
              email: user.email,
            },
            "a1A!s2S@d3D#f4F$",
            {
              expiresIn: "24h",
            }
          );

          return res.json({
            status: true,
            user: user,
            token: token,
            msg: "Successfully logged in.",
          });
        } else {
          return res.json({
            status: false,
            msg: "Please wait for administrator's approval.",
          });
        }
      } else {
        return res.json({
          status: false,
          msg: "The password does not match.",
        });
      }
    } else {
      return res.json({
        status: false,
        msg: "The user with the email does not exist.",
      });
    }
  } catch (err) {
    return res.json({
      status: false,
      msg: err.message,
    });
  }
};

const me = async (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, "a1A!s2S@d3D#f4F$", async (err, data) => {
    if (err) {
      return res.sendStatus(401);
    }

    const user = await UserModel.findById(data.id);
    return res.json({ user });
  });
};

module.exports = {
    register,
    login,
    me
}