import { apiRequest } from '../../../shared/api/httpClient'
import type { AuthSession, LoginRequest, SignupRequest } from '../types'
export const authApi={
 login:(body:LoginRequest)=>apiRequest<AuthSession>('/api/auth/login',{method:'POST',body:JSON.stringify(body),skipAuth:true}),
 signup:(body:SignupRequest)=>apiRequest<AuthSession>('/api/auth/signup',{method:'POST',body:JSON.stringify(body),skipAuth:true}),
}
