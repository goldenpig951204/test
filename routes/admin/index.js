const express = require("express")
const path = require("path");
const multer = require("multer");
const UserCtrl = require("../../ctrls/admin/UserCtrl")
const SettingCtrl = require("../../ctrls/admin/SettingCtrl");
const ProfileCtrl = require("../../ctrls/admin/ProfileCtrl");
const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/users/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});
const uploader = multer({ storage: storage });

router.get("/users", UserCtrl.fetch);
router.get("/users/:id", UserCtrl.fetchById);
router.post("/users", UserCtrl.create);
router.put("/users/:id", UserCtrl.update);
router.delete("/users/:id", UserCtrl.remove);
router.get("/settings", SettingCtrl.fetch);
router.post("/settings", SettingCtrl.update);
router.post("/profile/:id", uploader.single("avatar"), ProfileCtrl.update);

module.exports = router;