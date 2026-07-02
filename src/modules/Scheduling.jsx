import { useState } from 'react'
import {
  CalendarDays, CloudRain, Plane, X, Clock, User, GraduationCap,
  MapPin, Wind, Gauge, ClipboardList,
} from 'lucide-react'
import { SectionTitle, Pill } from '../components/ui'
import { scheduleDays, scheduleSlots, bookings, wxCancellations, accents, fleet } from '../data'

const cellAccent = {
  sky: 'bg-sky-50 border-sky-200 hover:bg-sky-100',
  teal: 'bg-teal-50 border-teal-200 hover:bg-teal-100',
  coral: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
  green: 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100',
  amber: 'bg-amber-50 border-amber-200 hover:bg-amber-100',
  violet: 'bg-violet-50 border-violet-200 hover:bg-violet-100',
  indigo: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100',
  rose: 'bg-rose-50 border-rose-200 hover:bg-rose-100',
}

// deterministic mock extras so the detail view feels real
const runways = ['08', '26']
const metar = ['CAVOK 240/08KT', 'FEW025 250/10KT', 'SCT030 220/06KT', 'BKN040 260/12KT']

export default function Scheduling() {
  const [view, setView] = useState('week')
  const [selected, setSelected] = useState(null)

  const openBooking = (b, si, di) => {
    const ac = fleet.find((f) => f.tail === b.tail)
    setSelected({
      ...b,
      acType: ac?.type || '—',
      time: scheduleSlots[si],
      day: scheduleDays[di],
      runway: runways[(si + di) % runways.length],
      met: metar[(si + di) % metar.length],
      duration: b.type.includes('Nav') ? '2.0 hr' : b.type.includes('Test') ? '1.5 hr' : '1.0 hr',
      pic: b.type.includes('Solo') ? 'Student (PIC/S)' : b.instr,
      status: b.type.includes('Solo') ? 'Solo — authorised' : 'Dual instruction',
    })
  }

  return (
    <div className="space-y-6">
      <SectionTitle icon={CalendarDays} title="Scheduling" sub="Click any sortie to view details · week of 30 Jun" accent="violet"
        action={
          <div className="flex bg-slate-100 rounded-xl p-1">
            {['day', 'week'].map((v) => (
              <button key={v} onClick={() => setView(v)}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold capitalize transition-all ${view === v ? 'bg-white text-violet-600 shadow-sm' : 'text-slate-500'}`}>
                {v}
              </button>
            ))}
          </div>
        } />

      {/* Aircraft legend */}
      <div className="flex flex-wrap gap-2">
        {fleet.filter((f) => f.status !== 'Grounded').map((f) => {
          const a = accents[f.accent]
          return (
            <span key={f.tail} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-slate-100 shadow-sm text-xs font-semibold text-slate-600">
              <span className={`w-2.5 h-2.5 rounded-full ${a.bg}`} />{f.tail}
            </span>
          )
        })}
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-500">
          <CloudRain className="w-3.5 h-3.5" /> Weather cancelled
        </span>
      </div>

      <div className="rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-100 shadow-sm p-4 overflow-x-auto animate-slide-up">
        <div className="min-w-[720px]">
          {/* header row */}
          <div className="grid" style={{ gridTemplateColumns: `64px repeat(${(view === 'day' ? 1 : scheduleDays.length)}, 1fr)` }}>
            <div />
            {(view === 'day' ? scheduleDays.slice(1, 2) : scheduleDays).map((d) => (
              <div key={d} className="text-center pb-3">
                <div className="text-sm font-bold text-slate-700">{d.split(' ')[0]}</div>
                <div className="text-xs text-slate-400">Jun/Jul {d.split(' ')[1]}</div>
              </div>
            ))}
          </div>

          {/* slot rows */}
          {scheduleSlots.map((slot, si) => (
            <div key={slot} className="grid border-t border-slate-100" style={{ gridTemplateColumns: `64px repeat(${(view === 'day' ? 1 : scheduleDays.length)}, 1fr)` }}>
              <div className="py-2 pr-2 text-right text-xs font-semibold text-slate-400">{slot}</div>
              {(view === 'day' ? [1] : scheduleDays.map((_, i) => i)).map((di) => {
                const key = `${si}-${di}`
                const b = bookings[key]
                const wx = wxCancellations.includes(key)
                return (
                  <div key={di} className="p-1 border-l border-slate-50 min-h-[54px]">
                    {b ? (
                      <button onClick={() => openBooking(b, si, di)}
                        className={`w-full text-left h-full rounded-lg border p-1.5 cursor-pointer transition-all ${cellAccent[b.accent]} hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-violet-300`}>
                        <div className="flex items-center gap-1">
                          <Plane className={`w-3 h-3 ${accents[b.accent].text} -rotate-45`} />
                          <span className={`text-[11px] font-bold ${accents[b.accent].text}`}>{b.tail}</span>
                        </div>
                        <div className="text-[10px] font-semibold text-slate-600 leading-tight mt-0.5 truncate">{b.cadet}</div>
                        <div className="text-[9px] text-slate-400 leading-tight truncate">{b.type}</div>
                      </button>
                    ) : wx ? (
                      <div className="h-full rounded-lg border border-dashed border-slate-200 bg-slate-50 grid place-items-center">
                        <CloudRain className="w-4 h-4 text-slate-300" />
                      </div>
                    ) : (
                      <div className="h-full rounded-lg border border-dashed border-slate-100 hover:border-violet-200 hover:bg-violet-50/40 transition-colors cursor-pointer grid place-items-center group">
                        <span className="text-slate-300 text-lg opacity-0 group-hover:opacity-100 transition-opacity">+</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Pill tone="sky">17 sorties booked</Pill>
        <Pill tone="amber">3 weather cancellations</Pill>
        <Pill tone="green">6 aircraft in rotation</Pill>
      </div>

      {selected && <BookingModal b={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

function BookingModal({ b, onClose }) {
  const a = accents[b.accent]
  const rows = [
    { icon: Clock, label: 'Slot', value: `${b.day} · ${b.time} LT` },
    { icon: Gauge, label: 'Planned duration', value: b.duration },
    { icon: User, label: 'Instructor', value: b.instr },
    { icon: GraduationCap, label: 'Cadet', value: b.cadet },
    { icon: ClipboardList, label: 'Pilot-in-command', value: b.pic },
    { icon: MapPin, label: 'Runway in use', value: `RWY ${b.runway} · Belagavi (VOBM)` },
    { icon: Wind, label: 'METAR', value: b.met },
  ]
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
      onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden animate-pop"
        onClick={(e) => e.stopPropagation()}>
        {/* header */}
        <div className={`relative p-5 ${a.bg} text-white overflow-hidden`}>
          <div className="absolute -right-6 -top-6 opacity-20"><Plane className="w-32 h-32 -rotate-12" /></div>
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-white/80 text-xs font-semibold uppercase tracking-wider">Sortie briefing</p>
              <h3 className="text-2xl font-extrabold mt-1">{b.tail}</h3>
              <p className="text-white/90 text-sm">{b.acType}</p>
            </div>
            <button onClick={onClose} className="grid place-items-center w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="relative mt-3 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold">{b.type}</span>
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold">{b.status}</span>
          </div>
        </div>

        {/* body */}
        <div className="p-5 space-y-1">
          {rows.map((r) => {
            const Icon = r.icon
            return (
              <div key={r.label} className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0">
                <div className="grid place-items-center w-9 h-9 rounded-lg bg-slate-100">
                  <Icon className="w-4 h-4 text-slate-500" />
                </div>
                <span className="text-sm text-slate-400 flex-1">{r.label}</span>
                <span className="text-sm font-semibold text-slate-700 text-right">{r.value}</span>
              </div>
            )
          })}
        </div>

        {/* actions */}
        <div className="flex gap-2 p-5 pt-0">
          <button className={`flex-1 py-2.5 rounded-xl text-white font-semibold text-sm ${a.bg} hover:opacity-90 transition-opacity`}>
            Confirm sortie
          </button>
          <button className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-semibold text-sm hover:bg-slate-200 transition-colors">
            Reschedule
          </button>
        </div>
      </div>
    </div>
  )
}
