// src/types.ts
// src/types.ts
export interface User {
  id: string;
  username: string;
  role: string;
}

export interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: "Open" | "In Progress" | "Closed";
  createdBy: User;

}
