import type { ServiceResponse } from '../types/types.js'
import type { IVehicle } from '../types/vehicles.types.js'

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
