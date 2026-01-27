import { Schema, model } from 'mongoose'
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
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_: any, ret: any) => {
        delete ret._id
      }
    }
  }
)

export const Vehicle = model<IVehicle>('Vehicle', vehicleSchema)
