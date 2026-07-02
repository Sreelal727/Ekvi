import { useState } from 'react'
import { Plane, Gauge, Wrench, AlertTriangle, Cog, Siren, ShieldCheck } from 'lucide-react'
import { ExpandCard, Pill, ProgressBar, SectionTitle } from '../components/ui'
import { useNotify } from '../components/Notifications'
import { fleet, accents } from '../data'

const statusMap = {
  Available: { tone: 'green', dot: 'bg-emerald-500' },
  'In Maintenance': { tone: 'coral', dot: 'bg-orange-500' },
  Grounded: { tone: 'rose', dot: 'bg-rose-500' },
}
const sevTone = { low: 'slate', med: 'amber', high: 'rose' }

export default function Fleet() {
  const { notify } = useNotify()
  // VT-EKG (AOG) starts flagged to show the state.
  const [flagged, setFlagged] = useState(() => ({ 'VT-EKG': true }))

  const toggleFlag = (ac) => {
    setFlagged((s) => {
      const next = { ...s, [ac.tail]: !s[ac.tail] }
      if (next[ac.tail]) {
        notify({
          tone: 'sos',
          title: `SOS raised — ${ac.tail}`,
          body: `${ac.type} flagged for urgent attention. Maintenance & Ops notified.`,
        })
      } else {
        notify({
          tone: 'green',
          title: `SOS cleared — ${ac.tail}`,
          body: `${ac.tail} flag resolved and stood down.`,
        })
      }
      return next
    })
  }

  const activeFlags = Object.values(flagged).filter(Boolean).length

  return (
    <div className="space-y-6">
      <SectionTitle icon={Wrench} title="Fleet & Maintenance"
        sub="Hover a card for detail · flag an aircraft to raise an SOS" accent="coral"
        action={
          <div className="flex items-center gap-2">
            {activeFlags > 0 ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 text-sm font-bold animate-pulse">
                <Siren className="w-4 h-4" /> {activeFlags} SOS active
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-600 text-sm font-bold">
                <ShieldCheck className="w-4 h-4" /> No active flags
              </span>
            )}
          </div>
        } />

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {fleet.map((ac, i) => {
          const a = accents[ac.accent]
          const s = statusMap[ac.status]
          const toGo = ac.nextInspAt - ac.hours
          const isFlagged = !!flagged[ac.tail]
          return (
            <div key={ac.tail} className={`rounded-2xl transition-all ${isFlagged ? 'ring-2 ring-rose-400 ring-offset-2 rounded-2xl' : ''}`}>
            <ExpandCard accent={isFlagged ? 'rose' : ac.accent} delay={i * 40}
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
                  {/* Flag / SOS control */}
                  <button
                    onClick={() => toggleFlag(ac)}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all
                      ${isFlagged
                        ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-md shadow-rose-200'
                        : 'bg-rose-50 text-rose-600 hover:bg-rose-100'}`}
                  >
                    <Siren className="w-4 h-4" />
                    {isFlagged ? 'Stand down SOS' : 'Raise SOS / Flag aircraft'}
                  </button>
                </div>
              }>
              {isFlagged && (
                <div className="flex items-center gap-2 mb-3 -mt-1 px-3 py-2 rounded-xl bg-rose-50 border border-rose-200 animate-pop">
                  <Siren className="w-4 h-4 text-rose-500 animate-pulse shrink-0" />
                  <span className="text-xs font-bold text-rose-600">SOS raised — Maintenance & Ops notified</span>
                </div>
              )}
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
                <div className="flex items-center gap-2">
                  <Pill tone={s.tone}>{ac.status}</Pill>
                  {/* quick-flag button (visible without expanding) */}
                  <button
                    onClick={() => toggleFlag(ac)}
                    title={isFlagged ? 'Stand down SOS' : 'Raise SOS / flag aircraft'}
                    className={`grid place-items-center w-8 h-8 rounded-lg transition-all
                      ${isFlagged
                        ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-200'
                        : 'bg-slate-100 text-slate-400 hover:bg-rose-50 hover:text-rose-500'}`}
                  >
                    <Siren className="w-4 h-4" />
                  </button>
                </div>
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
            </div>
          )
        })}
      </div>
    </div>
  )
}
