/* eslint-disable @typescript-eslint/no-unused-vars */
import { apiRequest } from '../../../shared/api/httpClient'
import type { MeterReading, UpsertMeterReadingRequest } from '../types'
export const meterReadingsApi = {
  list: (periodId: string, _role?:unknown) => apiRequest<MeterReading[]>(`/api/billing-periods/${periodId}/meter-readings`),
  upsert: (periodId: string, body: UpsertMeterReadingRequest, _role?:unknown) => apiRequest<MeterReading>(`/api/billing-periods/${periodId}/meter-readings`, { method: 'PUT', body: JSON.stringify(body) }),
}
