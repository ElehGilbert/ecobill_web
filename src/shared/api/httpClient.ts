import { clearSession, getAccessToken } from '../../modules/auth/authStorage'
export type UserRole = 'SuperAdmin'|'Landlord'|'CareTaker'|'Tenant'

// Development uses Vite's same-origin /api proxy to avoid local CORS issues.
// Production calls the configured API origin directly. An empty production
// value intentionally supports same-origin frontend/backend deployments.
const configuredApiBaseUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') ?? ''
const API_BASE_URL = import.meta.env.DEV ? '' : configuredApiBaseUrl

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
      cache: init.cache ?? 'no-store',
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
  const responseText = await response.text()
  if (!responseText.trim()) return undefined as T
  try {
    return JSON.parse(responseText) as T
  } catch {
    throw new ApiError('The EcoBill API returned an invalid response.', response.status)
  }
}
