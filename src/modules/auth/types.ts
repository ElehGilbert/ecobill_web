import type { AccountRole } from '../accounts/types'
export type AuthAccount = { id:string; fullName:string; userName:string; phoneNumber?:string|null; role:AccountRole }
export type AuthSession = { accessToken:string; expiresAt:string; account:AuthAccount }
export type LoginRequest = { userName:string; secret:string }
export type SignupRequest = { fullName:string; userName:string; password:string; role:'SuperAdmin'|'Landlord'; phoneNumber:string|null }
