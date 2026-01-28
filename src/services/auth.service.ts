import { User } from '../models/user.model.js'
import type { IRegisterUser, ILoginCredentials, ILoginResponse } from '../types/auth.types.js'
import type { ServiceResponse } from '../types/types.js'
import { hashPassword, verifyPassword } from '../utils/crypto.js'
import { generateToken } from '../utils/jwt.js'

export const signup = async (data: IRegisterUser): Promise<ServiceResponse<{}>> => {
  try {
    const user = new User({
      email: data.email.toLowerCase(),
      password: await hashPassword(data.password)
    })

    await user.save()
    return { success: true, data: {} }
  } catch (error: any) {
    if (error.code === 11000)
      return {
        success: false,
        error: 'El correo ya existe',
        code: 400
      }

    return {
      success: false,
      error: 'No se pudo crear usuario',
      code: 500
    }
  }
}

export const login = async (
  credentials: ILoginCredentials
): Promise<ServiceResponse<ILoginResponse>> => {
  const noAuthError: ServiceResponse<ILoginResponse> = {
    success: false,
    error: 'Credenciales inválidas',
    code: 401
  }
  const userDoc = await User.findOne({ email: credentials.email.toLowerCase() })
  if (!userDoc) return noAuthError

  const { id, email, password } = userDoc
  const isMatch = await verifyPassword(credentials.password, password)
  if (!isMatch) return noAuthError

  const token = generateToken({ id, email })

  if (!token) return { success: false, error: 'No se pudo generar token', code: 500 }
  const user = { id, email }

  return { success: true, data: { user, token } }
}
