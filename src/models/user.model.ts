import { Schema, model } from 'mongoose'
import type { IUser } from '../types/auth.types.js'

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
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

export const User = model<IUser>('User', userSchema)
