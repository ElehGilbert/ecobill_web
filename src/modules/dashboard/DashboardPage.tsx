import { ArrowRight, CheckCircle2, Droplets, Gauge, ReceiptText, TrendingUp, Wallet } from 'lucide-react'
import type { UserRole } from '../../shared/api/httpClient'
import { Badge, Button } from '../../shared/components/ui'
import { EmptyState, ErrorState, TableSkeleton } from '../../shared/components/DataState'
import { useAsync } from '../../shared/hooks/useAsync'
import { formatCurrency, formatDate } from '../../shared/utils/format'
import type { Page } from '../../shared/layout/AppShell'
import { billingApi } from '../billing/api/billingApi'

export function DashboardPage({ role, navigate, selectPeriod }: { role: UserRole; navigate:(p:Page)=>void; selectPeriod:(id:string)=>void }) {
  const periods = useAsync(() => billingApi.list(role), [role])
  const latest = periods.data?.[0]
  const summary = useAsync(() => latest ? billingApi.summary(latest.id, role) : Promise.resolve(null), [latest?.id, role])
  if (periods.loading) return <TableSkeleton/>
  if (periods.error) return <ErrorState message={periods.error} retry={periods.reload}/>
  if (!latest) return <><div className="page-header"><div><p className="eyebrow">OVERVIEW</p><h1>Dashboard</h1><p>Your water billing operations at a glance.</p></div></div><section className="panel"><EmptyState title="No billing data yet" message="Create your first billing period to populate the dashboard." action={<Button onClick={()=>navigate('periods')}>Create billing period</Button>}/></section></>
  if (summary.loading) return <TableSkeleton/>
  if (summary.error) return <ErrorState message={summary.error} retry={summary.reload}/>
  const data = summary.data
  if (!data) return null
  const latestId = latest.id
  const paid = data.tenantBills.filter(x=>x.hasPaid).length
  const outstanding = data.tenantBills.reduce((total,x)=>total+x.balance,0)
  const metrics = [['Total bill',formatCurrency(data.totalBillAmount),ReceiptText,'teal'],['Billable water',formatCurrency(data.billableWaterAmount),Droplets,'blue'],['Total units',`${data.totalUnits} m³`,Gauge,'violet'],['Amount / unit',formatCurrency(data.amountPerUnit),TrendingUp,'amber'],['Payments',`${paid} of ${data.tenantBills.length} paid`,CheckCircle2,'green'],['Outstanding',formatCurrency(outstanding),Wallet,'red']] as const
  const openSummary = () => { selectPeriod(latestId); navigate('summary') }
  return <><div className="page-header"><div><p className="eyebrow">OVERVIEW</p><h1>Dashboard</h1><p>Here’s what’s happening with your water billing.</p></div><Button onClick={()=>navigate('readings')}><Gauge size={17}/>Enter meter readings</Button></div><section className="period-banner"><div><span className="live-dot"/>LATEST BILLING PERIOD</div><h2>{latest.name}</h2><p>{formatDate(latest.startsOn)} — {formatDate(latest.endsOn)}</p><button onClick={openSummary}>View full summary <ArrowRight size={16}/></button></section><div className="metric-grid">{metrics.map(([label,value,Icon,tone])=><article className="metric" key={label}><div className={`metric-icon ${tone}`}><Icon size={19}/></div><p>{label}</p><strong>{value}</strong></article>)}</div><section className="panel"><div className="panel-head"><div><h2>Tenant payments</h2><p>Payment activity for {latest.name}</p></div><button className="text-btn" onClick={openSummary}>View all <ArrowRight size={15}/></button></div>{!data.tenantBills.length?<EmptyState title="No tenant bills" message="Enter meter readings for this billing period."/>:<div className="table-wrap"><table><thead><tr><th>Tenant</th><th>House</th><th>Amount</th><th>Paid on</th><th>Status</th></tr></thead><tbody>{data.tenantBills.slice(0,5).map(x=><tr key={x.tenantProfileId}><td><strong>{x.tenantName}</strong></td><td>{x.houseNumber}</td><td><strong>{formatCurrency(x.amountPaid)}</strong></td><td>{formatDate(x.paidOn)}</td><td><Badge tone={x.hasPaid?'success':x.amountPaid?'warning':'neutral'}>{x.hasPaid?'Paid':x.amountPaid?'Partial':'Unpaid'}</Badge></td></tr>)}</tbody></table></div>}</section></>
}
