import type { Request, Response, NextFunction } from 'express'
import { object, string, number, Schema } from 'yup'
import type { IVehicleStatus } from '../types/vehicles.types.js'

const VEHICLE_STATUS: IVehicleStatus[] = ['AVAILABLE', 'MAINTENANCE', 'SERVICING']

export const vehicleCreateSchema = object({
  make: string().trim().required('Make is required'),
  model: string().trim().required('Model is required'),
  year: number().required('Year is required').typeError('Year must be a number'),
  status: string()
    .required('Status is required')
    .oneOf(Array.from(VEHICLE_STATUS), `Status must be one of: ${VEHICLE_STATUS.join(', ')}`)
}) as Schema<Record<string, any>>

export const authSignupSchema = object({
  email: string().trim().required('Email is required').email('Email must be valid'),
  password: string().required('Password is required')
}) as Schema<Record<string, any>>

export const authLoginSchema = authSignupSchema

export function validateBody(schema: Schema<any>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
      })

      req.body = validated
      return next()
    } catch (err: any) {
      const errors = err?.inner?.length
        ? err.inner.map((e: any) => ({ path: e.path, message: e.message }))
        : [{ message: err?.message ?? 'Validation error' }]

      return res.status(400).json({ message: 'Validation failed', errors })
    }
  }
}
