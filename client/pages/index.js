import { useState, useEffect } from "react";
import Container from "../src/Container";
import Table from "../src/Table";
import { getTransaction, addTransaction, getAllUsers } from "../src/Util";
import { Button, TextField } from "@material-ui/core";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default function Transaction() {
  const [filterName, setFilterName] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [creditor, setCreditor] = useState("");
  const [debtor, setDebtor] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const tableDetail = [
    {
      name: "creditor",
      thai: "ผู้จ่ายเงิน",
      position: "left",
      linkBase: "/user/",
      slugField: "creditor",
    },
    {
      name: "debtor",
      thai: "ผู้รับเงิน",
      position: "left",
      linkBase: "/user/",
      slugField: "debtor",
    },
    { name: "amount", thai: "จำนวนเงิน(บาท)", position: "right" },
  ];
  async function add() {
    if (creditor && debtor && amount && creditor !== debtor) {
      const newTransactions = await addTransaction({
        creditor,
        debtor,
        amount,
      });
      setAllUsers(await getAllUsers(transactions));
      setTransactions(newTransactions);
      setCreditor("");
      setDebtor("");
      setAmount("");
      setFilterName("");
      setFilterType("all");
    }
  }
  useEffect(async () => {
    setAllUsers(await getAllUsers(transactions));
  }, []);
  useEffect(async () => {
    const newTransactionsawait = await getTransaction({
      filterName,
      filterType,
    });
    setTransactions(newTransactionsawait);
  }, [filterName, filterType]);
  return (
    <Container currentPage="transactions">
      <h1 className="title">Transactions</h1>
      <div style={{ direction: "ltr" }}>
        <FormControl placeholder="ชื่อ" style={{ width: "150px" }}>
          <InputLabel>ชื่อ</InputLabel>
          <Select
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          >
            <MenuItem value={""}>{"ทั้งหมด"}</MenuItem>
            {allUsers.map((x) => (
              <MenuItem key={x} value={x}>
                {x}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl style={{ width: "150px" }}>
          <InputLabel />
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <MenuItem value={"all"}>{"ทั้งหมด"}</MenuItem>
            <MenuItem value={"creditor"}>{"ผู้จ่ายเงิน	"}</MenuItem>
            <MenuItem value={"debtor"}>{"ผู้รับเงิน"}</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Table tableDetail={tableDetail} tableData={transactions} />
      <br />
      <br />
      <div style={{ direction: "ltr" }}>
        <TextField
          placeholder="ผู้จ่ายเงิน"
          value={creditor || ""}
          onChange={(e) => setCreditor(e.target.value.trim().toUpperCase())}
        />
        <TextField
          placeholder="ผู้รับเงิน"
          value={debtor || ""}
          onChange={(e) => setDebtor(e.target.value.trim().toUpperCase())}
        />
        <TextField
          placeholder="จำนวนเงิน(บาท)"
          value={amount || ""}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          onKeyPress={(e) => e.code === "Enter" && add()}
        />
      </div>
      <Button onClick={add}>Add</Button>
    </Container>
  );
}
