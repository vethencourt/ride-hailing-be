import { Schema, model } from 'mongoose'
import type { IMake, IModel, IYear } from '../types/meta.types.js'

const makeSchema = new Schema<IMake>(
  {
    name: { type: String, required: true, unique: true }
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_, ret: any) => {
        delete ret._id
        return ret
      }
    }
  }
)

const modelSchema = new Schema<IModel>(
  {
    name: { type: String, required: true },
    makeId: { type: Schema.Types.ObjectId as any, ref: 'Make', required: true }
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_, ret: any) => {
        delete ret._id
        return ret
      }
    }
  }
)

const yearSchema = new Schema<IYear>(
  {
    value: { type: Number, required: true },
    modelId: { type: Schema.Types.ObjectId as any, ref: 'Model', required: true }
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_, ret: any) => {
        delete ret._id
        return ret
      }
    }
  }
)

export const MakeModel = model<IMake>('Make', makeSchema)
export const CarModel = model<IModel>('Model', modelSchema)
export const YearModel = model<IYear>('Year', yearSchema)
