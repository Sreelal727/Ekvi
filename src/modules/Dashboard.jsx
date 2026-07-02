import {
  Plane, CheckCircle2, GraduationCap, Users, CalendarClock,
  AlertTriangle, Award, TrendingUp, ArrowRight, Clock,
} from 'lucide-react'
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
  AreaChart, Area, PieChart, Pie, Cell,
} from 'recharts'
import { ExpandCard, Pill, Panel, SectionTitle } from '../components/ui'
import {
  utilisationData, availabilityTrend, fleetStatusPie,
  upcomingMaintenance, todaySchedule, accents,
} from '../data'

const kpis = [
  { label: 'Total Aircraft', value: '8', accent: 'sky', icon: Plane, hint: 'Fleet strength',
    detail: [['Cessna 172S', '4'], ['Diamond DA40', '3'], ['DA42 / C152', '2']] },
  { label: 'Aircraft Available', value: '6', accent: 'green', icon: CheckCircle2, hint: '75% dispatch rate',
    detail: [['In maintenance', '1'], ['Grounded (AOG)', '1'], ['Ready to fly', '6']] },
  { label: 'Active Cadets', value: '48', accent: 'teal', icon: GraduationCap, hint: '6 batches running',
    detail: [['CPL track', '34'], ['PPL track', '14'], ['Skill test due', '3']] },
  { label: 'Instructors On Duty', value: '5', accent: 'indigo', icon: Users, hint: 'of 6 rostered',
    detail: [['Airborne now', '2'], ['Briefing', '1'], ['Available', '2']] },
  { label: 'Upcoming Inspections', value: '4', accent: 'amber', icon: CalendarClock, hint: 'next 14 days',
    detail: [['50 hr checks', '1'], ['100 hr checks', '1'], ['Annual / other', '2']] },
  { label: 'Open Snags', value: '5', accent: 'coral', icon: AlertTriangle, hint: '2 high priority',
    detail: [['High', '2'], ['Medium', '2'], ['Low', '1']] },
  { label: 'DGCA Ranking', value: 'A+', accent: 'violet', icon: Award, hint: 'Category — 88/100',
    detail: [['Operational', '37/40'], ['Safety', '18/20'], ['Compliance', '9/10']] },
]

const statusTone = { Completed: 'green', Airborne: 'sky', Boarding: 'amber', Scheduled: 'slate' }

function ChartTooltip({ active, payload, label, unit }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl bg-white shadow-lg border border-slate-100 px-3 py-2 text-xs">
      <div className="font-bold text-slate-700 mb-1">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 text-slate-500">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color || p.fill }} />
          <span className="capitalize">{p.name}:</span>
          <span className="font-semibold text-slate-700">{p.value}{unit}</span>
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Hero header */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-sky-500 via-sky-500 to-teal-500 text-white shadow-lg shadow-sky-200 relative overflow-hidden animate-slide-up">
        <div className="absolute -right-8 -top-8 opacity-20">
          <Plane className="w-48 h-48 -rotate-12" />
        </div>
        <div className="relative">
          <p className="text-sky-100 font-medium">Good morning, Capt. Sinha 👋</p>
          <h1 className="text-2xl md:text-3xl font-extrabold mt-1">Operations Dashboard</h1>
          <p className="text-sky-100 mt-2 max-w-xl">
            Belagavi base · Wednesday, 2 July · <span className="font-semibold text-white">CAVOK</span>, wind 240/08kt.
            6 aircraft ready, 6 sorties planned before noon.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-3 py-1 rounded-full bg-white/20 text-sm font-semibold backdrop-blur-sm">☀️ VFR conditions</span>
            <span className="px-3 py-1 rounded-full bg-white/20 text-sm font-semibold backdrop-blur-sm">🛫 142 hrs flown this week</span>
            <span className="px-3 py-1 rounded-full bg-white/20 text-sm font-semibold backdrop-blur-sm">✅ 0 safety reports open</span>
          </div>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {kpis.map((k, i) => {
          const a = accents[k.accent]
          const Icon = k.icon
          return (
            <ExpandCard key={k.label} accent={k.accent} delay={i * 40}
              expand={
                <div className="space-y-2">
                  {k.detail.map(([l, v]) => (
                    <div key={l} className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">{l}</span>
                      <span className={`font-bold ${a.text}`}>{v}</span>
                    </div>
                  ))}
                </div>
              }>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">{k.label}</p>
                  <p className="text-3xl font-extrabold text-slate-800 mt-1">{k.value}</p>
                  <p className={`text-xs font-semibold mt-1 ${a.text}`}>{k.hint}</p>
                </div>
                <div className={`grid place-items-center w-11 h-11 rounded-xl ${a.soft}`}>
                  <Icon className={`w-6 h-6 ${a.text}`} />
                </div>
              </div>
            </ExpandCard>
          )
        })}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Panel className="lg:col-span-1">
          <SectionTitle icon={CheckCircle2} title="Fleet Availability" sub="Ready vs target" accent="green" />
          <div className="flex items-center gap-2">
            <ResponsiveContainer width="55%" height={150}>
              <PieChart>
                <Pie data={fleetStatusPie} dataKey="value" nameKey="name" innerRadius={38} outerRadius={62} paddingAngle={3}>
                  {fleetStatusPie.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {fleetStatusPie.map((s) => (
                <div key={s.name} className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 rounded-full" style={{ background: s.color }} />
                  <span className="text-slate-500 flex-1">{s.name}</span>
                  <span className="font-bold text-slate-700">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <Panel className="lg:col-span-2">
          <SectionTitle icon={TrendingUp} title="Aircraft Utilisation" sub="Flight hours · this month" accent="sky" />
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={utilisationData} margin={{ left: -20, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="tail" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip unit=" hrs" />} cursor={{ fill: '#f8fafc' }} />
              <Bar dataKey="hrs" radius={[6, 6, 0, 0]} fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      {/* Availability trend + maintenance + schedule */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Panel>
          <SectionTitle icon={TrendingUp} title="Availability Trend" sub="Last 7 days" accent="teal" />
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={availabilityTrend} margin={{ left: -20, right: 8 }}>
              <defs>
                <linearGradient id="av" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[0, 8]} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="avail" stroke="#14b8a6" strokeWidth={3} fill="url(#av)" />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>

        <Panel>
          <SectionTitle icon={CalendarClock} title="Upcoming Maintenance" sub="Next due" accent="coral" />
          <div className="space-y-2.5">
            {upcomingMaintenance.map((m) => {
              const a = accents[m.accent]
              return (
                <div key={m.tail} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className={`grid place-items-center w-9 h-9 rounded-lg ${a.soft}`}>
                    <Plane className={`w-4 h-4 ${a.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-700 text-sm">{m.tail}</span>
                      <span className="text-xs text-slate-400 truncate">{m.task}</span>
                    </div>
                    <div className="text-xs text-slate-400">{m.type}</div>
                  </div>
                  <Pill tone={m.urgency === 'high' ? 'rose' : m.urgency === 'med' ? 'amber' : 'slate'}>{m.dueIn}</Pill>
                </div>
              )
            })}
          </div>
        </Panel>

        <Panel>
          <SectionTitle icon={Clock} title="Today's Flight Schedule" sub="Belagavi · live" accent="violet" />
          <div className="relative pl-4">
            <div className="absolute left-[7px] top-1 bottom-1 w-0.5 bg-slate-100" />
            <div className="space-y-3">
              {todaySchedule.map((s) => {
                const a = accents[s.accent]
                return (
                  <div key={s.time} className="relative">
                    <span className={`absolute -left-4 top-1.5 w-3 h-3 rounded-full ring-4 ring-white ${a.bg}`} />
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-700 w-11">{s.time}</span>
                      <span className={`text-xs font-bold ${a.text}`}>{s.tail}</span>
                      <Pill tone={statusTone[s.status]} className="ml-auto">{s.status}</Pill>
                    </div>
                    <div className="text-xs text-slate-400 ml-[52px]">{s.cadet} · {s.ex}</div>
                  </div>
                )
              })}
            </div>
          </div>
          <button className="mt-4 w-full flex items-center justify-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors">
            View full schedule <ArrowRight className="w-4 h-4" />
          </button>
        </Panel>
      </div>
    </div>
  )
}
