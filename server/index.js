const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync();

// mock data drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  db.transactions.create({ creditor: "A", debtor: "B", amount: 1 })
  db.transactions.create({ creditor: "B", debtor: "C", amount: 2 })
  db.transactions.create({ creditor: "C", debtor: "A", amount: 3 })
  db.transactions.create({ creditor: "B", debtor: "D", amount: 4 })
  db.transactions.create({ creditor: "D", debtor: "C", amount: 5 })
  db.transactions.create({ creditor: "A", debtor: "C", amount: 6 })
});

app.get("/", (req, res) => {
  res.json({ message: "backend" });
});

require("./routes/transaction.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});