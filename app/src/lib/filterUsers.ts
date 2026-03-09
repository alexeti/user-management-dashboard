import type { User } from "../types/user";

export function filterUsers(users: readonly User[], query: string): User[] {
  const q = query.trim().toLowerCase();
  if (!q) return [...users];
  return users.filter((u) => u.name.toLowerCase().includes(q));
}