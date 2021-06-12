module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define("tutorial", {
    creditor: {
      type: Sequelize.STRING
    },
    debtor: {
      type: Sequelize.STRING
    },
    amount: {
      type: Sequelize.INTEGER
    }
  });

  return Transaction;
};
