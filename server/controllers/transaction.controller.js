const db = require("../models");
const Transaction = db.transactions;
const Op = db.Sequelize.Op;

// Create and Save a new Transaction
exports.create = (req, res) => {
  if (!req.body.creditor || !req.body.debtor || !req.body.amount) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const transaction = {
    creditor: req.body.creditor,
    debtor: req.body.debtor,
    amount: req.body.amount,
  };
  Transaction.create(transaction)
  .then( async (data) => {
    const newTransactions = await findAllTransactions({})
    res.send(newTransactions)
  })
  .catch((err) => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Transaction.",
    });
  });
};
exports.findAllTransactions = async (req, res) => {
  res.send(await findAllTransactions(req.query))
};
exports.fundUserTransaction = (req, res) => {
  const userName = req.params.userName;
  let condition = {
    [Op.or]: [
      { creditor: { [Op.iLike]: `%${userName}%` } },
      { debtor: { [Op.iLike]: `%${userName}%` } },
    ],
  };
  Transaction.findAll({ where: condition })
    .then((data) => {
      const temp = data.reduce((res, x) => {
        const otherStatus = x.creditor === userName ? "debtor" : "creditor";
        res[x[otherStatus]] = res[x[otherStatus]] || 0;
        res[x[otherStatus]] +=
          otherStatus === "creditor" ? -x.amount : x.amount;
        return res;
      }, {});
      const dataShow = Object.keys(temp).map((x) => {
        return {
          name: x,
          status: temp[x] < 0 ? "ลูกหนี้" : "เจ้าหนี้",
          amount: temp[x],
        };
      });
      res.send(dataShow);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Transaction with userName=" + userName,
      });
    });
};

exports.findAllBalance = (req, res) => {
  Transaction.findAll()
    .then((transactions) => {
      const data = transactions.reduce((res, x) => {
        res[x.creditor] = res[x.creditor] || 0;
        res[x.debtor] = res[x.debtor] || 0;
        res[x.creditor] += x.amount;
        res[x.debtor] -= x.amount;
        return res;
      }, {});
      const dataShow = Object.keys(data).map((x) => {
        return {
          name: x,
          status: data[x] < 0 ? "ลูกหนี้" : "เจ้าหนี้",
          amount: data[x],
        };
      });
      res.send(dataShow);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Transaction with userName=" + userName,
      });
    });
};
exports.findAllName = (req, res) => {
  Transaction.findAll()
    .then((data) => {
      let tempAllUser = [];
      data.forEach((x) => {
        tempAllUser.push(x.creditor);
        tempAllUser.push(x.debtor);
      });
      res.send([...new Set(tempAllUser)]);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving transactions.",
      });
    });
};

async function findAllTransactions({filterName, filterType}){
  let filter = {};
  if (filterName) {
    if (filterType !== "all") {
      filter = {
        [filterType]: { [Op.iLike]: `%${filterName}%` },
      };
    } else {
      filter = {
        [Op.or]: [
          { creditor: { [Op.iLike]: `%${filterName}%` } },
          { debtor: { [Op.iLike]: `%${filterName}%` } },
        ],
      };
    }
  }
  let condition = { ...filter };
  return Transaction.findAll({ where: condition })
  .then((data) => data)
  .catch((err) => err);
}