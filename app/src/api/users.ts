import type { User } from "../types/user";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export async function fetchUsers(signal?: AbortSignal): Promise<User[]> {
  const res = await fetch(USERS_URL, { signal });
  if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`);
  const data: unknown = await res.json();
  if (!Array.isArray(data)) throw new Error("Invalid users payload");
  return data as User[];
}