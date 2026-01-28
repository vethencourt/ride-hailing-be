import type { IUser } from './auth.types.js'
import type { Pagination } from './types.js'

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

export interface IVehicleListRequest {
  pagination: Pagination
  searchTerm?: string
  sortBy?: keyof IVehicle
  sortOrder?: '1' | '-1'
}

export interface IVehicleListResponse {
  vehicles: IVehicle[]
  pagination: Pagination
}

export type IVehicleStatus = 'AVAILABLE' | 'MAINTENANCE' | 'SERVICING'

export type ICreateVehicle = Omit<
  IVehicle,
  'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy' | 'status'
>
