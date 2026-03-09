import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import UserDetailPage from "./pages/UserDetailPage";

const APP_TITLE = "e-Booking";
const APP_SUBTITLE = "User Management";

export default function App() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{ position: "relative" }}>
          <Typography variant="h6" fontWeight={800}>
            {APP_TITLE}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              opacity: 0.9,
            }}
          >
            {APP_SUBTITLE}
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 3 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </Container>
    </Box>
  );
}
