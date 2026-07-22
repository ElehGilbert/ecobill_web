import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react'
import { LoaderCircle, X } from 'lucide-react'

export function Button({ children, variant = 'primary', loading, className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary'|'secondary'|'danger'|'ghost'; loading?: boolean }) {
  return <button className={`btn btn-${variant} ${className}`} disabled={loading || props.disabled} {...props}>{loading && <LoaderCircle size={16} className="spin" />}{children}</button>
}
export function Field({ label, error, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return <label className="field"><span>{label}</span><input className={error ? 'invalid' : ''} {...props}/>{error && <small>{error}</small>}</label>
}
export function SelectField({ label, children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { label: string; children: ReactNode }) {
  return <label className="field"><span>{label}</span><select {...props}>{children}</select></label>
}
export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral'|'success'|'warning'|'info' }) { return <span className={`badge badge-${tone}`}>{children}</span> }
export function Modal({ title, description, children, onClose }: { title: string; description?: string; children: ReactNode; onClose: () => void }) {
  return <div className="modal-backdrop" onMouseDown={onClose}><section className="modal" onMouseDown={e=>e.stopPropagation()} role="dialog" aria-modal="true"><header><div><h2>{title}</h2>{description && <p>{description}</p>}</div><button className="icon-btn" onClick={onClose} aria-label="Close"><X size={20}/></button></header>{children}</section></div>
}
