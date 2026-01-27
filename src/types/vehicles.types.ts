import type { User } from './auth.types.js'

export interface IVehicle {
  id: string
  make: string
  model: string
  year: number
  createdAt: Date | string
  updatedAt: Date | string
  createdBy: User
  updatedBy: User
  status: IVehicleStatus
}

export type IVehicleStatus = 'AVAILABLE' | 'MAINTENANCE' | 'SERVICING'
