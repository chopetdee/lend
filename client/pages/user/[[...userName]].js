import { useState, useEffect } from "react";
import Container from "../../src/Container"
import Table from "../../src/Table"
import {useRouter} from "next/router"
import { getTransaction, getAllUsers, getUserRalation } from "../../src/Util";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function User() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [total, setTotal] = useState(0);
  const [allUser, setAllUser] = useState([]);
  const [tableData, setTableData] = useState([]);
  const tableDetail = [
    { name: "status", thai: `สถานะ`, position: "center" },
    { name: "name", thai: "ชื่อ", position: "left", linkBase: "/user/", slugField: "name" },
    { name: "amount", thai: "จำนวนเงิน(บาท)", position: "right" },
  ]
  useEffect( async ()=>{
    if(router.isReady) {
      const tempAllUser = await getAllUsers()
      setAllUser(tempAllUser)
      if(router.query.userName && router.query.userName[0]){
        setUserName(router.query.userName[0])
      } else {
        changeUser(tempAllUser[0])
      }
    }
  },[router.isReady, router.asPath])

  useEffect( async () => {
    if(userName){
        const data = await getUserRalation(userName)
        setTableData(data)
        setTotal(data.reduce( (res,x) => res += x.amount, 0))
    }
  },[userName])

  function changeUser(user){
      router.push('/user/'+ user)
      setUserName(user)
  }

  return (
    <Container currentPage="user">
      <h1 className="title">{"Account "}
        <FormControl style={{width: "150px"}}>
          <InputLabel/>
          <Select
            value={userName}
            onChange={ (e)=> changeUser(e.target.value) }
          >
            {allUser.map( x => <MenuItem key={x} value={x}>{x}</MenuItem>)}
          </Select>
        </FormControl>
      </h1>
      <Table
        tableDetail={tableDetail}
        tableData={tableData}
      />
      <h3>ยอดรวม: {total} บาท</h3>
    </Container>
  );
}
