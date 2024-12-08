import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect } from "react";
import { Fragment } from "react"
import { Authentication } from "../server/auth";
import { useNavigate } from "react-router";
import { readDataAll } from "../server/database";
import { useState } from "react";

const Member = () => {
    let iterasi = 1;
    const [ rows, setRows ] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = Authentication((user) => {
          if(user && !user?.emailVerified) {
              navigate("/verify");
          } else if(!user) {
              navigate("/login");
          }
        })
        return () => unsubscribe; // Bersihkan listener saat komponen unmounted
      }, []);

    useEffect(() => {
        (async() => {
            const response = await readDataAll();
            setRows(response);
        })()

    }, []);

    
  return (
    <Fragment>
        <Typography variant="h4" fontWeight="bold" gutterBottom>Member</Typography>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight: "bold", fontSize: "1rem"}}>No</TableCell>
            <TableCell sx={{fontWeight: "bold", fontSize: "1rem"}}>Nama Lengkap</TableCell>
            <TableCell align="center" sx={{fontWeight: "bold", fontSize: "1rem"}}>Kelas</TableCell>
            <TableCell align="center" sx={{fontWeight: "bold", fontSize: "1rem"}}>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.uid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {iterasi++}
              </TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell align="center">{row.kelas ? row.kelas : "?"}</TableCell>
              <TableCell align="center">{row.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Fragment>
  )
}

export default Member
