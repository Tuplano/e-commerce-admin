

export interface Users {
  _id: string;
  username?: string;
  password?: string;
  email: string;
  contact?: string;
  address?: string;
  role?: "user";
  createdAt: Date;
  updatedAt: Date;
}
