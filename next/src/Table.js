import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export default function Home({tableDetail, tableData}) {
  return (
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {tableDetail.map((x,i) => (
                <TableCell key={i} align="center">{x.thai}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, i) => (
              <TableRow key={i}>
                {tableDetail.map((x,j) => {
                  if(x.linkBase){
                    return <TableCell key={j} align="center"> 
                    {/* return <TableCell key={j} align={x.position}>  */}
                      <Link href={x.linkBase+row[x.slugField]}>
                        <a href="" className={"noDecor"}>
                          {row[x.name]}
                        </a>  
                      </Link>
                      </TableCell>
                  }else {
                    return <TableCell key={j}  align="center">{row[x.name]}</TableCell>
                    {/* return <TableCell key={j} align={x.position} >{row[x.name]}</TableCell> */}
                  }
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}