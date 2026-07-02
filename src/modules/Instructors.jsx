import { Users, Clock, BadgeCheck, GraduationCap, AlertCircle } from 'lucide-react'
import { ExpandCard, Pill, ProgressBar, SectionTitle } from '../components/ui'
import { instructors, accents } from '../data'

const currencyTone = { Current: 'green', 'Due Soon': 'amber', Expired: 'rose' }

export default function Instructors() {
  return (
    <div className="space-y-6">
      <SectionTitle icon={Users} title="Instructors" sub="Licence currency & flight-duty limits · hover for detail" accent="indigo" />

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {instructors.map((ins, i) => {
          const a = accents[ins.accent]
          const dutyPct = Math.round((ins.dutyUsed / ins.dutyLimit) * 100)
          const dutyAccent = dutyPct > 85 ? 'rose' : dutyPct > 70 ? 'amber' : ins.accent
          return (
            <ExpandCard key={ins.id} accent={ins.accent} delay={i * 40}
              expand={
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1.5">Ratings held</p>
                    <div className="flex flex-wrap gap-1.5">
                      {ins.ratings.map((r) => <Pill key={r} tone="indigo">{r}</Pill>)}
                    </div>
                  </div>
                  <ProgressBar value={dutyPct} accent={dutyAccent} label="Flight duty period" sub={`${ins.dutyUsed}/${ins.dutyLimit} hr`} />
                  {ins.currency !== 'Current' && (
                    <div className="flex items-center gap-2 text-xs rounded-lg bg-amber-50 p-2 text-amber-700">
                      <AlertCircle className="w-4 h-4" />
                      {ins.currency === 'Expired' ? 'Currency lapsed — schedule proficiency check' : 'Currency renewal due within 15 days'}
                    </div>
                  )}
                </div>
              }>
              <div className="flex items-center gap-3">
                <div className={`grid place-items-center w-12 h-12 rounded-full text-white font-bold shadow-md ${a.bg}`}>
                  {ins.name.split(' ').slice(-1)[0][0]}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-800 truncate">{ins.name}</p>
                  <p className="text-xs text-slate-400">{ins.role}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="rounded-xl bg-slate-50 p-2.5 text-center">
                  <BadgeCheck className={`w-4 h-4 mx-auto ${currencyTone[ins.currency] === 'green' ? 'text-emerald-500' : currencyTone[ins.currency] === 'amber' ? 'text-amber-500' : 'text-rose-500'}`} />
                  <p className="text-[11px] font-bold text-slate-700 mt-1">{ins.currency}</p>
                  <p className="text-[10px] text-slate-400">Currency</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-2.5 text-center">
                  <Clock className="w-4 h-4 mx-auto text-slate-400" />
                  <p className="text-sm font-bold text-slate-700 mt-1">{ins.dutyUsed}h</p>
                  <p className="text-[10px] text-slate-400">Duty used</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-2.5 text-center">
                  <GraduationCap className="w-4 h-4 mx-auto text-slate-400" />
                  <p className="text-sm font-bold text-slate-700 mt-1">{ins.cadets}</p>
                  <p className="text-[10px] text-slate-400">Cadets</p>
                </div>
              </div>
            </ExpandCard>
          )
        })}
      </div>
    </div>
  )
}
