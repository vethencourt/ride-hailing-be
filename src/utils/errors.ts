import type { ServiceResponse } from '../types/types.js'
import type { IVehicle, IVehicleListResponse } from '../types/vehicles.types.js'
import type { IMake, IModel, IYear } from '../types/meta.types.js'

export const vehicle404: ServiceResponse<IVehicle> = {
  success: false,
  error: 'Vehículo no encontrado',
  code: 404
}

export const vehicle500 = (verb: string): ServiceResponse<IVehicle> => {
  return {
    success: false,
    error: `No se pudo ${verb} el vehículo`,
    code: 500
  }
}

export const vehicleList500: ServiceResponse<IVehicleListResponse> = {
  success: false,
  error: `No se pudo obtener la lista de vehículos`,
  code: 500
}

export const meta500: ServiceResponse<IMake[] | IModel[] | IYear[]> = {
  success: false,
  error: 'datos no encontrados',
  code: 500
}
