import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { useId } from "react";
import { Helmet } from "react-helmet";
import { Pengguna } from "../context/PenggunaContext";

const Member = () => {
  let iterasi = 1;
  const { users } = Pengguna();
  const keys = useId();

  return (
    <Fragment>
      <Helmet>
        <meta
          name="description"
          content="Menampilkan data mahasiswa yang terdaftar di aplikasi MIPA T"
        />
        <meta name="keywords" content="Data mahasiswa, Aplikasi MIPA T" />
      </Helmet>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Member
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                No
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                Nama Lengkap
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "1rem" }}
              >
                Kelas
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "1rem" }}
              >
                Role
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow
                key={row.uid || keys}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {iterasi++}
                </TableCell>
                <TableCell>
                  {row.username || <Skeleton width="100%" height="2rem" />}
                </TableCell>
                <TableCell align="center">
                  {(row.kelas ? row.kelas : "?") || (
                    <Skeleton width="100%" height="2rem" />
                  )}
                </TableCell>
                <TableCell align="center">
                  {row.role || <Skeleton width="100%" height="2rem" />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default Member;
