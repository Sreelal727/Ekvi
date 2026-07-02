import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from 'recharts'
import { ExpandCard, Panel, SectionTitle, ProgressBar, Pill } from '../components/ui'
import { financeKpis, revenueData, feeTracking, payroll, accents } from '../data'

const fmt = (n) => '₹' + (n / 100000).toFixed(1) + ' L'

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl bg-white shadow-lg border border-slate-100 px-3 py-2 text-xs">
      <div className="font-bold text-slate-700 mb-1">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 text-slate-500">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color || p.fill }} />
          <span className="capitalize">{p.name}:</span>
          <span className="font-semibold text-slate-700">₹{p.value} L</span>
        </div>
      ))}
    </div>
  )
}

export default function Finance() {
  return (
    <div className="space-y-6">
      <SectionTitle icon={Wallet} title="Finance" sub="Fees, payroll & procurement" accent="amber" />

      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {financeKpis.map((k, i) => {
          const a = accents[k.accent]
          return (
            <ExpandCard key={k.label} accent={k.accent} delay={i * 40}
              expand={
                <div className="flex items-center gap-2 text-sm">
                  {k.up ? <ArrowUpRight className="w-4 h-4 text-emerald-500" /> : <ArrowDownRight className="w-4 h-4 text-emerald-500" />}
                  <span className="text-slate-500">vs last month</span>
                  <span className={`ml-auto font-bold ${k.up ? 'text-emerald-600' : 'text-amber-600'}`}>{k.delta}</span>
                </div>
              }>
              <p className="text-sm font-medium text-slate-400">{k.label}</p>
              <p className="text-2xl font-extrabold text-slate-800 mt-1">{k.value}</p>
              <div className={`inline-flex items-center gap-1 mt-1 text-xs font-semibold ${a.text}`}>
                {k.up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {k.delta}
              </div>
            </ExpandCard>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        {/* Revenue chart */}
        <Panel className="lg:col-span-3">
          <SectionTitle icon={TrendingUp} title="Revenue vs Expense" sub="₹ Lakh · last 6 months" accent="green" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData} margin={{ left: -18, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: '#f8fafc' }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="revenue" name="Revenue" radius={[6, 6, 0, 0]} fill="#10b981" />
              <Bar dataKey="expense" name="Expense" radius={[6, 6, 0, 0]} fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        {/* Payroll */}
        <Panel className="lg:col-span-2">
          <SectionTitle icon={Wallet} title="Instructor Payroll" sub="June · staged" accent="sky" />
          <div className="space-y-2.5">
            {payroll.map((p) => (
              <div key={p.name} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="grid place-items-center w-9 h-9 rounded-full bg-sky-100 text-sky-600 text-xs font-bold">
                  {p.name.split(' ').slice(-1)[0][0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700 truncate">{p.name}</p>
                  <p className="text-xs text-slate-400">{p.role} · {p.hours} hrs</p>
                </div>
                <span className="text-sm font-bold text-slate-700">{fmt(p.pay)}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Fee tracking */}
      <Panel>
        <SectionTitle icon={Wallet} title="Student Fee Tracking" sub="Staged payments · paid vs pending" accent="teal" />
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {feeTracking.map((f) => {
            const pct = Math.round((f.paid / f.total) * 100)
            const pending = f.total - f.paid
            return (
              <div key={f.name} className="rounded-xl border border-slate-100 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-bold text-slate-700 text-sm">{f.name}</p>
                    <p className="text-xs text-slate-400">{f.batch}</p>
                  </div>
                  {pct === 100
                    ? <Pill tone="green">Cleared</Pill>
                    : <Pill tone={pct < 40 ? 'rose' : 'amber'}>{pct}% paid</Pill>}
                </div>
                <ProgressBar value={pct} accent={f.accent} />
                <div className="flex justify-between mt-2 text-xs">
                  <span className="text-emerald-600 font-semibold">Paid {fmt(f.paid)}</span>
                  <span className="text-slate-400 font-semibold">Due {fmt(pending)}</span>
                </div>
              </div>
            )
          })}
        </div>
      </Panel>
    </div>
  )
}
