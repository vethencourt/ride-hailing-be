export interface IUser {
  id: string
  email: string
}

export interface IRegisterUser extends Omit<IUser, 'id'> {
  password: string
}

export type ILoginCredentials = Pick<IRegisterUser, 'email' | 'password'>

export type ILoginResponse = {
  user: IUser
  token: string
}
