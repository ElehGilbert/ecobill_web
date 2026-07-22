export const formatCurrency = (value: number) => new Intl.NumberFormat('en-CM', {
  style: 'currency', currency: 'XAF', maximumFractionDigits: 0,
}).format(value)

export const formatDate = (value?: string | null) => value
  ? new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value))
  : '—'
