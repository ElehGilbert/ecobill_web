/* eslint-disable @typescript-eslint/no-unused-vars */
import { apiRequest } from '../../../shared/api/httpClient'
import type { BillingPeriod, BillingSummary, CreatePenaltyRequest, TenantBill, TenantBillingPeriod, UpdatePaymentRequest } from '../types'

export const billingApi = {
  list: (_role?:unknown) => apiRequest<BillingPeriod[]>('/api/billing-periods'),
  summary: (id: string, _role?:unknown) => apiRequest<BillingSummary>(`/api/billing-periods/${id}/summary`),
  create: (data: Omit<BillingPeriod, 'id' | 'isPublished'>, _role?:unknown) => apiRequest<BillingPeriod>('/api/billing-periods', { method: 'POST', body: JSON.stringify(data) }),
  publish: (id: string, _role?:unknown) => apiRequest<void>(`/api/billing-periods/${id}/publish`, { method: 'POST' }),
  addPenalty: (id:string, body:CreatePenaltyRequest) => apiRequest<void>(`/api/billing-periods/${id}/penalties`, {method:'POST',body:JSON.stringify(body)}),
  myBill: (id: string) => apiRequest<TenantBill>(`/api/billing-periods/${id}/my-bill`),
  myBills: () => apiRequest<TenantBillingPeriod[]>('/api/billing-periods/my-bills'),
  updatePayment: (periodId: string, tenantId: string, body: UpdatePaymentRequest, _role?:unknown) => apiRequest<TenantBill>(`/api/billing-periods/${periodId}/tenants/${tenantId}/payment`, { method: 'PUT', body: JSON.stringify(body) }),
}
