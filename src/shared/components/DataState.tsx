import { AlertCircle, Inbox } from 'lucide-react'
import { Button } from './ui'

export function TableSkeleton({ rows = 5, columns = 5 }: { rows?: number; columns?: number }) {
  return <div className="skeleton-table">{Array.from({ length: rows }, (_, row) => <div key={row}>{Array.from({ length: columns }, (_, column) => <i key={column}/>)}</div>)}</div>
}
export function EmptyState({ title, message, action }: { title: string; message: string; action?: React.ReactNode }) {
  return <div className="data-state"><Inbox size={28}/><strong>{title}</strong><p>{message}</p>{action}</div>
}
export function ErrorState({ message, retry }: { message: string; retry: () => void }) {
  return <div className="data-state error"><AlertCircle size={28}/><strong>Couldn’t load this data</strong><p>{message}</p><Button variant="secondary" onClick={retry}>Try again</Button></div>
}
