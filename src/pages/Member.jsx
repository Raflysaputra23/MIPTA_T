import { Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect } from "react";
import { Fragment } from "react"
import { Authentication } from "../firebase/auth";
import { useNavigate } from "react-router";
import { readDataAll } from "../firebase/database";
import { useState } from "react";
import { useId } from "react";

const Member = () => {
    let iterasi = 1;
    const [ rows, setRows ] = useState([{ username: "", kelas: "", role: ""}]);
    const navigate = useNavigate();
    const keys = useId();

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
              key={row.uid || keys}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {iterasi++}
              </TableCell>
              <TableCell>{row.username || <Skeleton width="100%" height="2rem" />}</TableCell>
              <TableCell align="center">{(row.kelas ? row.kelas : "?") || <Skeleton width="100%" height="2rem" />}</TableCell>
              <TableCell align="center">{row.role || <Skeleton width="100%" height="2rem" />}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Fragment>
  )
}

export default Member
