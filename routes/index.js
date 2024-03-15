var express = require("express");
var router = express.Router();
const adminRoute = require("./admin");
const AuthCtrl = require("../ctrls/AuthCtrl");
const axios = require("axios");

router.get("/test", async (req, res) => {
  const { data } = await axios.post(
    "https://tool.indexmenow.com/ajax/project/list",
    {
      draw: 1,
      "columns[0][data]": "name",
      "columns[0][name]": "",
      "columns[0][searchable]": true,
      "columns[0][orderable]": true,
      "columns[0][search][value]": "",
      "columns[0][search][regex]": false,
      "columns[1][data]": "status",
      "columns[1][name]": "",
      "columns[1][searchable]": true,
      "columns[1][orderable]": true,
      "columns[1][search][value]": "",
      "columns[1][search][regex]": false,
      "columns[2][data]": "all_total_urls",
      "columns[2][name]": "",
      "columns[2][searchable]": true,
      "columns[2][orderable]": true,
      "columns[2][search][value]": "",
      "columns[2][search][regex]": false,
      "columns[3][data]": "indexed_urls",
      "columns[3][name]": "",
      "columns[3][searchable]": true,
      "columns[3][orderable]": true,
      "columns[3][search][value]": "",
      "columns[3][search][regex]": false,
      "columns[4][data]": "non_indexed_urls",
      "columns[4][name]": "",
      "columns[4][searchable]": true,
      "columns[4][orderable]": true,
      "columns[4][search][value]": "",
      "columns[4][search][regex]": false,
      "columns[5][data]": "refunded_urls",
      "columns[5][name]": "",
      "columns[5][searchable]": true,
      "columns[5][orderable]": true,
      "columns[5][search][value]": "",
      "columns[5][search][regex]": false,
      "columns[6][data]": "nonindexable_refunded_urls",
      "columns[6][name]": "",
      "columns[6][searchable]": true,
      "columns[6][orderable]": true,
      "columns[6][search][value]": "",
      "columns[6][search][regex]": false,
      "columns[7][data]": "created_at",
      "columns[7][name]": "",
      "columns[7][searchable]": true,
      "columns[7][orderable]": true,
      "columns[7][search][value]": "",
      "columns[7][search][regex]": false,
      "columns[8][data]": "updated_at",
      "columns[8][name]": "",
      "columns[8][searchable]": true,
      "columns[8][orderable]": true,
      "columns[8][search][value]": "",
      "columns[8][search][regex]": false,
      "order[0][column]": 8,
      "order[0][dir]": "desc",
      "order[0][column_name]": "updated_at",
      start: 0,
      length: 50,
      "search[value]": "",
      "search[regex]": false,
    },
    {
      headers: {
        Cookie:
          "AeFirst61c4e32b8750df2f5bf8913d=1709456275912; csrf_cookie_name=0c0d192686512c9e311809252f87cf2e; ci_session=084b46evdheiohrqvlj8oun7000d1251",
      },
    }
  );
  console.log(data);
  return res.json(data)
});
router.get("/", async (req, res) => {
  const { data } = await axios.get(
    "https://tool.indexmenow.com/api/v1/project/list",
    {
      headers: {
        Authorization: "Bearer 5d3f368285cd490ab9460d4b49c46580",
      },
    }
  );
  console.log(data);
  return res.json(data);
});
router.use("/admin", adminRoute);
router.post("/auth/register", AuthCtrl.register);
router.post("/auth/login", AuthCtrl.login);
router.get("/auth/me", AuthCtrl.me);

module.exports = router;
