export interface ICreateUser {
  email: string;
  password: string;
  timezone?: string;
}

export interface IEditUser {
  timezone?: string;
}
