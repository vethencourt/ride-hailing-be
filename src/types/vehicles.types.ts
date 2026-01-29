import type { Pagination, PaginationRequest } from './types.js'

export interface IVehicle {
  id: string
  make: string
  model: string
  year: number
  createdAt: Date | string
  updatedAt: Date | string
  createdBy: { email: string }
  updatedBy: { email: string }
  status: IVehicleStatus
}

export interface IVehicleListRequest {
  pagination: PaginationRequest
  searchTerm?: string
  sortBy?: keyof IVehicle
  sortOrder?: '1' | '-1'
}

export interface IVehicleListResponse {
  vehicles: IVehicle[]
  pagination: Pagination
}

export type IVehicleStatus = 'DISPONIBLE' | 'MANTENIMIENTO' | 'SERVICIO'

export type ICreateVehicle = Omit<
  IVehicle,
  'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'
>
