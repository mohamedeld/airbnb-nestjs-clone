export interface ICurrentUser {
  _id: string;
  name: string;
  email: string;
}
export interface IPrincipal {
  user: ICurrentUser;
  role: string;
}
