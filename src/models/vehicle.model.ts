import { Schema, model, Types } from 'mongoose'
import type { IVehicle } from '../types/vehicles.types.js'

const vehicleSchema = new Schema<IVehicle>(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: ['AVAILABLE', 'MAINTENANCE', 'SERVICING'],
      default: 'AVAILABLE'
    },
    createdBy: { type: Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: Types.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_: any, ret: any) => {
        delete ret._id
        return ret
      }
    }
  }
)

export const Vehicle = model<IVehicle>('Vehicle', vehicleSchema)
