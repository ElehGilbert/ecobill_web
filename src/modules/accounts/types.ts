export type AccountRole = 'SuperAdmin' | 'Landlord' | 'CareTaker' | 'Tenant'
export type Account = {
  id: string
  fullName: string
  userName: string
  role: AccountRole
  phoneNumber?: string | null
  houseNumber?: string | null
  tenantProfileId?: string | null
  tenantProfile?: { id:string; houseNumber:string } | null
  canViewTenantBills?: boolean
  canUpdateTenantBills?: boolean
}
export type TenantProfileReference = { id?:string; tenantProfileId?:string; houseNumber?:string }
export type AccountApiModel = Omit<Account,'tenantProfile'> & {
  tenantProfile?: TenantProfileReference | null
  tenant?: TenantProfileReference | null
  profile?: TenantProfileReference | null
}
export type TenantAccount = {
  accountId: string
  tenantProfileId: string
  fullName: string
  userName: string
  phoneNumber?: string | null
  houseNumber: string
}
export type CreateAccountRequest = { fullName: string; userName:string; password:string; role: 'SuperAdmin' | 'Landlord'; phoneNumber: string | null }
export type CreateTenantRequest = { fullName: string; houseNumber: string; pin: string; phoneNumber: string | null }
export type CreateCareTakerRequest = { fullName: string; userName:string; pin:string; phoneNumber: string | null }
