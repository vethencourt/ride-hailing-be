import { Schema, model } from 'mongoose'
import type { IRegisterUser } from '../types/auth.types.js'

const userSchema = new Schema<IRegisterUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true }
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_: any, ret: any) => {
        delete ret._id
        delete ret.password
        return ret
      }
    }
  }
)

export const User = model<IRegisterUser>('User', userSchema)
