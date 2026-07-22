/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react'
import { clearSession, readSession, saveSession } from './authStorage'
import type { AuthSession } from './types'
type AuthContextValue={session:AuthSession|null;authenticate:(session:AuthSession)=>void;logout:()=>void}
const AuthContext=createContext<AuthContextValue|null>(null)
export function AuthProvider({children}:{children:ReactNode}){const [session,setSession]=useState(readSession);function authenticate(next:AuthSession){saveSession(next);setSession(next)}function logout(){clearSession();setSession(null)}return <AuthContext.Provider value={{session,authenticate,logout}}>{children}</AuthContext.Provider>}
export function useAuth(){const value=useContext(AuthContext);if(!value)throw new Error('useAuth must be used inside AuthProvider');return value}
