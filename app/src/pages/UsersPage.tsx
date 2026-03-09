// app/src/pages/UsersPage.tsx
import {
  Alert,
  Box,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../api/users";
import type { User } from "../types/user";
import { usePersistedState } from "../hooks/usePersistedState";

const FILTER_KEY = "users.filter.v1";

function filterUsers(users: readonly User[], query: string): User[] {
  const q = query.trim().toLowerCase();
  if (!q) return [...users];
  return users.filter((u) => u.name.toLowerCase().includes(q));
}

export default function UsersPage() {
  const navigate = useNavigate();
  const [filterText, setFilterText] = usePersistedState(FILTER_KEY, "");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: ({ signal }) => fetchUsers(signal)
  });

  const users = data ?? [];
  const filtered = useMemo(() => filterUsers(users, filterText), [users, filterText]);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: 2 }}>
        <Typography variant="h5" fontWeight={800}>
          Users
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          {filtered.length} shown
        </Typography>
      </Stack>

      <TextField
        fullWidth
        label="Filter by name"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        inputProps={{ "aria-label": "filter-by-name" }}
        sx={{ mb: 2 }}
      />

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

      {!isLoading && !isError && (
        <TableContainer component={Paper} variant="outlined">
          <Table aria-label="users-table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>City</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((u) => (
                <TableRow
                  key={u.id}
                  hover
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/users/${u.id}`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") navigate(`/users/${u.id}`);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.address.city}</TableCell>
                </TableRow>
              ))}

              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <Typography variant="body2" sx={{ opacity: 0.75 }}>
                      No users match that filter.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}