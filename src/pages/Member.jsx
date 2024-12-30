import {
  IconButton,
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
import DeleteIcon from '@mui/icons-material/Delete';
import { MixinAlert } from "../assets/sweetalert";
import { banned as bannedUser } from "../firebase/database";

const Member = () => {
  let iterasi = 1;
  const { users } = Pengguna();
  const { banned } = Pengguna();
  const { role } = Pengguna();
  const keys = useId();
  const handleBanned = async (uid) => {
    try {
      if(banned.includes(uid)) {
        const response = await bannedUser(uid, "unbanned");
        MixinAlert("success", response);
      } else {
        const response = await bannedUser(uid, "banned");
        MixinAlert("success", response);
      }
    } catch(error) {
      MixinAlert("error", error);
    }
  }

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
                Status
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "1rem" }}
              >
                Role
              </TableCell>
              {role === "admin" && (
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", fontSize: "1rem" }}
                >
                  Banned
                </TableCell>
              )}
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
                <TableCell align="center" sx={{bgcolor: row.status ? "#00ff00" : "#ff0000", color: "#fff"}}>
                  {(row.status ? "Online" : "Offline") || <Skeleton width="100%" height="2rem" />}
                </TableCell>
                <TableCell align="center">
                  {row.role || <Skeleton width="100%" height="2rem" />}
                </TableCell>
                {role === "admin" && (
                  <TableCell align="center">
                    <IconButton color={banned.includes(row.uid) ? "success" : "error"} sx={{ borderRadius: 2, '&:hover': { backgroundColor: banned.includes(row.uid) ? '#00ff00' : '#ff0000', color: '#fff' }}} onClick={() => handleBanned(row.uid)}><DeleteIcon /></IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default Member;
