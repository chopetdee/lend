module.exports = app => {
  const transactions = require("../controllers/transaction.controller.js");
  var router = require("express").Router();

  router.post("/", transactions.create);
  router.get("/", transactions.findAllTransactions);
  router.get("/allUser", transactions.findAllName);
  router.get("/user/:userName", transactions.fundUserTransaction);
  router.get("/allBalance", transactions.findAllBalance);
  app.use("/api/transactions", router);
};
