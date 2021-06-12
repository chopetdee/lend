import { useState, useEffect } from "react";
import Container from "../src/Container";
import Table from "../src/Table";
import { getAllBalance } from "../src/Util";

export default function Balance() {
  const [tableData, setTableData] = useState([]);
  const tableDetail = [
    { name: "name", thai: "ชื่อ", position: "left", linkBase: "/user/", slugField: "name"},
    { name: "status", thai: "สถานะ", position: "center" },
    { name: "amount", thai: "จำนวนเงิน(บาท)", position: "right" },
  ]
  useEffect( async () => {
    setTableData(await getAllBalance())
  }, [])

  return (
    <Container currentPage="balance">
      <h1 className="title">Balance</h1>
      <Table
        tableDetail={tableDetail}
        tableData={tableData}
      />
    </Container>
  );
}
