import { User } from "../models/user.interface";

export function searchUser(term: string, users: User[]): User[] {
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(term.toLocaleLowerCase())
    ||
    user.email.toLowerCase().includes(term.toLocaleLowerCase())
  )
  return filteredUsers;
}
