import { describe, expect, it } from "vitest";
import { filterUsers } from "./filterUsers";
import type { User } from "../types/user";

const users: User[] = [
  {
    id: 1,
    name: "Alice Johnson",
    username: "alice",
    email: "a@a.com",
    address: { street: "x", suite: "x", city: "NY", zipcode: "x", geo: { lat: "0", lng: "0" } },
    phone: "x",
    website: "x",
    company: { name: "A", catchPhrase: "x", bs: "x" }
  },
  {
    id: 2,
    name: "Bob Smith",
    username: "bob",
    email: "b@b.com",
    address: { street: "x", suite: "x", city: "LA", zipcode: "x", geo: { lat: "0", lng: "0" } },
    phone: "x",
    website: "x",
    company: { name: "B", catchPhrase: "x", bs: "x" }
  }
];

describe("filterUsers", () => {
  it("returns all users when query is empty/whitespace", () => {
    expect(filterUsers(users, "")).toHaveLength(2);
    expect(filterUsers(users, "   ")).toHaveLength(2);
  });

  it("filters by name case-insensitively", () => {
    const res = filterUsers(users, "ali");
    expect(res).toHaveLength(1);
    expect(res[0]?.name).toBe("Alice Johnson");
  });
});