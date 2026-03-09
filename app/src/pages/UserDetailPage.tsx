// app/src/pages/UserDetailPage.tsx
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { fetchUsers } from "../api/users";

function parseId(idParam: string | undefined): number | null {
  if (!idParam) return null;
  const n = Number(idParam);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export default function UserDetailPage() {
  const { id: idParam } = useParams();
  const id = parseId(idParam);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: ({ signal }) => fetchUsers(signal)
  });

  const user = (data ?? []).find((u) => u.id === id);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5" fontWeight={800}>
          User detail
        </Typography>
        <Button component={Link} to="/users" variant="outlined">
          Back
        </Button>
      </Stack>

      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress aria-label="loading" />
        </Box>
      )}

      {isError && (
        <Alert severity="error">
          {error instanceof Error ? error.message : "Something went wrong"}
        </Alert>
      )}

      {!isLoading && !isError && !user && <Alert severity="warning">User not found.</Alert>}

      {!isLoading && !isError && user && (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }} fontWeight={800}>
            {user.name}
          </Typography>

          <Stack spacing={1}>
            <Typography>
              <b>Email:</b> {user.email}
            </Typography>
            <Typography>
              <b>City:</b> {user.address.city}
            </Typography>
            <Typography>
              <b>Phone:</b> {user.phone}
            </Typography>
            <Typography>
              <b>Website:</b> {user.website}
            </Typography>
            <Typography>
              <b>Company:</b> {user.company.name}
            </Typography>
          </Stack>
        </Paper>
      )}
    </Box>
  );
}