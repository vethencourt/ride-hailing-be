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

export type ILoginCredentials = Pick<IRegisterUser, 'email' | 'password'>

export type ILoginResponse = {
  user: IUser
  token: string
}
