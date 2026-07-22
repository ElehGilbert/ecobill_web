import { clearSession, getAccessToken } from '../../modules/auth/authStorage'
export type UserRole = 'SuperAdmin'|'Landlord'|'CareTaker'|'Tenant'

// Development requests use Vite's same-origin proxy to avoid requiring local
// backend CORS configuration. Deployments can provide an absolute API origin.
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') ?? ''

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) { super(message); this.status = status }
}

export async function apiRequest<T>(path: string, options: RequestInit & {skipAuth?:boolean} = {}): Promise<T> {
  const {skipAuth,...init}=options
  const token=skipAuth?null:getAccessToken()
  let response: Response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...init.headers,
      },
    })
  } catch {
    throw new ApiError('Unable to reach the EcoBill API. Confirm the backend is running and try again.', 0)
  }
  if (!response.ok) {
    if(response.status===401&&!skipAuth){clearSession();window.dispatchEvent(new Event('ecobill:unauthorized'))}
    const body = await response.json().catch(() => null) as { detail?: string; title?: string; message?: string; errors?: Record<string, string[]> } | null
    const validationMessage = body?.errors
      ? Object.values(body.errors).flat().join(' ')
      : undefined
    throw new ApiError(validationMessage ?? body?.detail ?? body?.message ?? body?.title ?? 'Something went wrong. Please try again.', response.status)
  }
  if (response.status === 204) return undefined as T
  return response.json() as Promise<T>
}
