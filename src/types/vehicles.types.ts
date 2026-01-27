import type { IUser } from './auth.types.js'

export interface IVehicle {
  id: string
  make: string
  model: string
  year: number
  createdAt: Date | string
  updatedAt: Date | string
  createdBy: IUser
  updatedBy: IUser
  status: IVehicleStatus
}

export type IVehicleStatus = 'AVAILABLE' | 'MAINTENANCE' | 'SERVICING'

export type ICreateVehicle = Omit<
  IVehicle,
  'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy' | 'status'
>
