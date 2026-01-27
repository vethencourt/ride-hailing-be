export interface User {
  id: string
  email: string
}

export interface RegisterUser extends Omit<User, 'id'> {
  password: string
}

export type LoginCredentials = Pick<RegisterUser, 'email' | 'password'>

export type LoginResponse = {
  user: User
  token: string
}
