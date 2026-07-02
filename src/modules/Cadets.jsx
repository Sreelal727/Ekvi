import { GraduationCap, User, Moon, Compass, Plane, UserCheck } from 'lucide-react'
import { ExpandCard, Pill, Ring, ProgressBar, SectionTitle } from '../components/ui'
import { cadets, accents } from '../data'

const CPL_TARGET = 200

export default function Cadets() {
  return (
    <div className="space-y-6">
      <SectionTitle icon={GraduationCap} title="Cadets & Training" sub="Progress toward 200-hr CPL target · hover for hour breakdown" accent="teal" />

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cadets.map((c, i) => {
          const a = accents[c.accent]
          const pct = Math.round((c.total / CPL_TARGET) * 100)
          const initials = c.name.split(' ').map((n) => n[0]).join('').slice(0, 2)
          const breakdown = [
            { label: 'Dual', value: c.dual, icon: UserCheck, tone: 'sky' },
            { label: 'Solo', value: c.solo, icon: Plane, tone: 'teal' },
            { label: 'Instrument', value: c.instrument, icon: Compass, tone: 'violet' },
            { label: 'Night', value: c.night, icon: Moon, tone: 'indigo' },
          ]
          return (
            <ExpandCard key={c.id} accent={c.accent} delay={i * 40}
              expand={
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Hour breakdown</p>
                  <div className="grid grid-cols-2 gap-2">
                    {breakdown.map((b) => {
                      const ba = accents[b.tone]
                      const Icon = b.icon
                      return (
                        <div key={b.label} className="flex items-center gap-2 rounded-xl bg-slate-50 p-2">
                          <Icon className={`w-4 h-4 ${ba.text}`} />
                          <div>
                            <p className="text-sm font-bold text-slate-700 leading-none">{b.value}<span className="text-[10px] font-medium text-slate-400"> hr</span></p>
                            <p className="text-[10px] text-slate-400">{b.label}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <ProgressBar value={c.syllabus} accent={c.accent} label="Syllabus completion" />
                </div>
              }>
              <div className="flex items-center gap-3">
                <div className={`grid place-items-center w-12 h-12 rounded-full text-white font-bold shadow-md ${a.bg}`}>
                  {initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-800 truncate">{c.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Pill tone={c.goal === 'CPL' ? 'sky' : 'teal'}>{c.goal}</Pill>
                    <span className="text-[11px] text-slate-400">{c.batch}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <Ring value={pct} accent={c.accent} size={84} center={
                  <>
                    <span className="text-lg font-extrabold text-slate-800 leading-none">{c.total}</span>
                    <span className="text-[9px] font-semibold text-slate-400">/ {CPL_TARGET} hr</span>
                  </>
                } />
                <div className="flex-1 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Total logged</span>
                    <span className={`font-bold ${a.text}`}>{pct}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Syllabus</span>
                    <span className="font-bold text-slate-700">{c.syllabus}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Remaining</span>
                    <span className="font-bold text-slate-700">{Math.max(0, CPL_TARGET - c.total)} hr</span>
                  </div>
                </div>
              </div>
            </ExpandCard>
          )
        })}
      </div>
    </div>
  )
}
