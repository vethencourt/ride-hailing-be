export interface IUser {
  id: string
  email: string
  password: string
}

export interface IUserResponse {
  id: string
  email: string
}

export interface IRegisterUser extends Omit<IUser, 'id'> {}

export type ILoginCredentials = Pick<IUser, 'email' | 'password'>

export type ILoginResponse = {
  user: Omit<IUser, 'password'>
  token: string
}
