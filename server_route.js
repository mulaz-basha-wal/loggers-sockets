var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("index get method");
});
router.post("/", (req, res) => {
  res.status(200).send("index post method");
});
router.put("/", (req, res) => {
  res.status(200).send("index put method");
});
router.delete("/", (req, res) => {
  res.status(200).send("index delete method");
});

module.exports = router;
