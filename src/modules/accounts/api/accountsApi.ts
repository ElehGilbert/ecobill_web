/* eslint-disable @typescript-eslint/no-unused-vars */
import { apiRequest } from '../../../shared/api/httpClient'
import type { Account, AccountApiModel, CreateAccountRequest, CreateCareTakerRequest, CreateTenantRequest, TenantAccount } from '../types'

function normalizeAccount(account: AccountApiModel): Account {
  const profile = account.tenantProfile ?? account.tenant ?? account.profile
  return {
    ...account,
    houseNumber: account.houseNumber ?? profile?.houseNumber ?? (account.role === 'Tenant' ? account.userName : null),
    tenantProfileId: account.tenantProfileId ?? profile?.id ?? profile?.tenantProfileId ?? null,
    tenantProfile: profile?.id || profile?.tenantProfileId
      ? { id: profile.id ?? profile.tenantProfileId!, houseNumber: profile.houseNumber ?? account.houseNumber ?? '' }
      : null,
  }
}

export const accountsApi = {
  list: async (_role?:unknown) => {
    const [accounts, tenants] = await Promise.all([
      apiRequest<AccountApiModel[]>('/api/accounts'),
      apiRequest<TenantAccount[]>('/api/accounts/tenants').catch(() => []),
    ])
    const tenantsByAccount = new Map(tenants.map(tenant => [tenant.accountId, tenant]))
    return accounts.map(raw => {
      const account = normalizeAccount(raw)
      const tenant = tenantsByAccount.get(account.id)
      return tenant ? { ...account, tenantProfileId: tenant.tenantProfileId, houseNumber: tenant.houseNumber, userName: tenant.userName } : account
    })
  },
  listTenants: () => apiRequest<TenantAccount[]>('/api/accounts/tenants'),
  create: (body: CreateAccountRequest) => apiRequest<Account>('/api/accounts', { method: 'POST', body: JSON.stringify(body) }),
  createTenant: (body: CreateTenantRequest) => apiRequest<Account>('/api/accounts/tenants', { method: 'POST', body: JSON.stringify(body) }),
  createCareTaker: (body: CreateCareTakerRequest) => apiRequest<Account>('/api/accounts/caretakers', { method: 'POST', body: JSON.stringify(body) }),
  updatePermissions: (id: string, body: { canViewTenantBills: boolean; canUpdateTenantBills: boolean }) => apiRequest<Account>(`/api/accounts/caretakers/${id}/permissions`, { method: 'PUT', body: JSON.stringify(body) }),
}
