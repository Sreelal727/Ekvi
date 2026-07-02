import { Plane, Gauge, Wrench, AlertTriangle, Cog } from 'lucide-react'
import { ExpandCard, Pill, ProgressBar, SectionTitle } from '../components/ui'
import { fleet, accents } from '../data'

const statusMap = {
  Available: { tone: 'green', dot: 'bg-emerald-500' },
  'In Maintenance': { tone: 'coral', dot: 'bg-orange-500' },
  Grounded: { tone: 'rose', dot: 'bg-rose-500' },
}
const sevTone = { low: 'slate', med: 'amber', high: 'rose' }

export default function Fleet() {
  return (
    <div className="space-y-6">
      <SectionTitle icon={Wrench} title="Fleet & Maintenance" sub="8 aircraft · hover a card for inspection & snag detail" accent="coral" />

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {fleet.map((ac, i) => {
          const a = accents[ac.accent]
          const s = statusMap[ac.status]
          const toGo = ac.nextInspAt - ac.hours
          return (
            <ExpandCard key={ac.tail} accent={ac.accent} delay={i * 40}
              expand={
                <div className="space-y-3">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Inspection cycles</p>
                    <ProgressBar value={ac.cycle50} accent={ac.accent} label="50 hr" />
                    <ProgressBar value={ac.cycle100} accent={ac.accent} label="100 hr" />
                    <ProgressBar value={ac.annual} accent={ac.accent} label="Annual" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Component TBO</p>
                    <ProgressBar value={ac.tbo.engine} accent={ac.tbo.engine > 85 ? 'rose' : ac.accent} label="Engine" sub={`${ac.engineHrs}/${ac.tboLimit} hr`} />
                    <ProgressBar value={ac.tbo.prop} accent={ac.accent} label="Propeller" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1.5">
                      Open snags {ac.snags.length === 0 && <span className="text-emerald-500">· none 🎉</span>}
                    </p>
                    <div className="space-y-1.5">
                      {ac.snags.map((sn) => (
                        <div key={sn.id} className="flex items-center gap-2 text-xs">
                          <AlertTriangle className={`w-3.5 h-3.5 ${sn.sev === 'high' ? 'text-rose-500' : sn.sev === 'med' ? 'text-amber-500' : 'text-slate-400'}`} />
                          <span className="text-slate-600 flex-1">{sn.text}</span>
                          <Pill tone={sevTone[sn.sev]}>{sn.sev}</Pill>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              }>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`grid place-items-center w-12 h-12 rounded-xl ${a.soft}`}>
                    <Plane className={`w-6 h-6 ${a.text} -rotate-45`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-extrabold text-slate-800 tracking-tight">{ac.tail}</span>
                      <span className={`w-2 h-2 rounded-full ${s.dot} animate-pulse`} />
                    </div>
                    <p className="text-xs text-slate-400 font-medium">{ac.type}</p>
                  </div>
                </div>
                <Pill tone={s.tone}>{ac.status}</Pill>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="rounded-xl bg-slate-50 p-2.5 text-center">
                  <Gauge className="w-4 h-4 mx-auto text-slate-400" />
                  <p className="text-sm font-bold text-slate-700 mt-1">{ac.hours.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-400">Total hrs</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-2.5 text-center">
                  <Wrench className="w-4 h-4 mx-auto text-slate-400" />
                  <p className={`text-sm font-bold mt-1 ${toGo <= 20 ? 'text-rose-500' : 'text-slate-700'}`}>{toGo <= 0 ? '—' : `${toGo}h`}</p>
                  <p className="text-[10px] text-slate-400">To insp.</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-2.5 text-center">
                  <Cog className="w-4 h-4 mx-auto text-slate-400" />
                  <p className="text-sm font-bold text-slate-700 mt-1">{ac.snags.length}</p>
                  <p className="text-[10px] text-slate-400">Snags</p>
                </div>
              </div>
            </ExpandCard>
          )
        })}
      </div>
    </div>
  )
}
