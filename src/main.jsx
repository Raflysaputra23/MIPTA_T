/* eslint-disable no-unused-vars */
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
// LAYOUTS
import HomeLayoutes from "./layouts/HomeLayoutes";
import AuthLayoutes from "./layouts/AuthLayoutes";
// PAGES
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
// FONTS
import "@fontsource/poppins/300.css";
import "@fontsource/tillana/400.css";
import Tugas from "./pages/Tugas";
import Verify from "./pages/Verify";
import Assistant from "./pages/Assistant";
import Profil from "./pages/Profil";
import Reset from "./pages/Reset";
import ResetPassword from "./pages/ResetPassword";
import ResetLayoutes from "./layouts/ResetLayoutes";
import TugasLayoutes from "./layouts/TugasLayoutes";
import TambahTugas from "./pages/TambahTugas";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    main: "#06D001",
  },
});

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<HomeLayoutes />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tugas" element={<TugasLayoutes />} >
            <Route index element={<Tugas />} />
            <Route path="tambah-tugas" element={<TambahTugas />} />
          </Route>
          <Route path="assistant" element={<Assistant />} />
          <Route path="profil" element={<Profil />} />
        </Route>
        <Route path="/" element={<AuthLayoutes />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="verify" element={<Verify />} />
          <Route path="reset-password" element={<ResetLayoutes />} >
            <Route index element={<ResetPassword />} />
            <Route path="reset" element={<Reset />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  </BrowserRouter>
);
