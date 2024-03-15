const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");

const dbConnect = (url) => {
  mongoose.connect(url, {
    serverSelectionTimeoutMS: 5000,
    dbName: "indexmenow",
  });

  mongoose.connection.on("connected", () => {
    console.log(`========>Mongo DB was connected successfully.=======`);
    seedData();
  });
};

const seedData = async () => {
  const userCount = await UserModel.find().count();
  if (!userCount) {
    const salt = bcrypt.genSaltSync(10);

    await UserModel.create({
      name: "Jose Cha",
      email: "seosmith13@gmail.com",
      password: bcrypt.hashSync("admin123!@#", salt),
      role: "admin",
      status: true,
    });
    console.log("===========>DB is seeded successfully.==========");
  }
};

module.exports = {
  dbConnect,
};
