export type MeterReading = { tenantProfileId: string; tenantName: string; houseNumber: string; previousReading: number; newReading: number; unitsUsed: number; isFirstReading?: boolean }
export type UpsertMeterReadingRequest = { tenantProfileId: string; isFirstReading: boolean; previousReading: number | null; newReading: number; recordedByAccountId: string }
