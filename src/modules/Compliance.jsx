import { ShieldCheck, CheckCircle2, Circle, Award, ClipboardCheck, Activity } from 'lucide-react'
import { Panel, SectionTitle, Ring, Pill } from '../components/ui'
import { dgcaParams, auditChecklist, evidenceTrail, accents } from '../data'

export default function Compliance() {
  const totalScore = dgcaParams.reduce((s, p) => s + p.score, 0)
  const doneCount = auditChecklist.filter((c) => c.done).length
  return (
    <div className="space-y-6">
      <SectionTitle icon={ShieldCheck} title="Compliance & DGCA" sub="FTO ranking, audit readiness & evidence trail" accent="green" />

      {/* Score hero */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Panel className="lg:col-span-1 flex flex-col items-center justify-center text-center bg-gradient-to-br from-emerald-50 to-teal-50">
          <div className="flex items-center gap-1.5 text-emerald-600 font-semibold text-sm mb-2">
            <Award className="w-4 h-4" /> DGCA Ranking
          </div>
          <Ring value={totalScore} accent="green" size={150} stroke={12} center={
            <>
              <span className="text-4xl font-extrabold text-slate-800">{totalScore}</span>
              <span className="text-xs font-semibold text-slate-400">out of 100</span>
            </>
          } />
          <div className="mt-3">
            <Pill tone="green">Category A+ · Top Tier</Pill>
          </div>
          <p className="text-xs text-slate-400 mt-3 max-w-[220px]">Composite of 5 DGCA parameters weighted per the FTO ranking framework.</p>
        </Panel>

        <Panel className="lg:col-span-2">
          <SectionTitle icon={Activity} title="Ranking Parameters" sub="Weighted score breakdown" accent="sky" />
          <div className="space-y-4">
            {dgcaParams.map((p) => {
              const a = accents[p.accent]
              const pct = Math.round((p.score / p.weight) * 100)
              return (
                <div key={p.name}>
                  <div className="flex items-center justify-between mb-1.5 text-sm">
                    <span className="font-semibold text-slate-700">{p.name} <span className="text-slate-400 font-normal">· weight {p.weight}%</span></span>
                    <span className={`font-bold ${a.text}`}>{p.score}/{p.weight} <span className="text-xs text-slate-400">({pct}%)</span></span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-3 ${a.bg} rounded-full transition-all duration-700 ease-out relative`} style={{ width: `${pct}%` }}>
                      <span className="absolute inset-0 bg-white/20" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Panel>
      </div>

      {/* Checklist + evidence */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Panel>
          <SectionTitle icon={ClipboardCheck} title="Audit Readiness" sub={`${doneCount}/${auditChecklist.length} items ready`} accent="violet" />
          <div className="space-y-1">
            {auditChecklist.map((c) => (
              <div key={c.item} className={`flex items-center gap-3 p-2.5 rounded-xl transition-colors ${c.done ? 'hover:bg-emerald-50' : 'bg-amber-50/50 hover:bg-amber-50'}`}>
                {c.done
                  ? <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  : <Circle className="w-5 h-5 text-amber-400 shrink-0" />}
                <span className={`text-sm ${c.done ? 'text-slate-600' : 'text-slate-700 font-medium'}`}>{c.item}</span>
                {!c.done && <Pill tone="amber" className="ml-auto">Action</Pill>}
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <SectionTitle icon={Activity} title="Evidence Trail" sub="Recent compliance activity" accent="teal" />
          <div className="relative pl-4">
            <div className="absolute left-[7px] top-1 bottom-1 w-0.5 bg-slate-100" />
            <div className="space-y-4">
              {evidenceTrail.map((e, i) => {
                const a = accents[e.accent]
                return (
                  <div key={i} className="relative">
                    <span className={`absolute -left-4 top-1 w-3 h-3 rounded-full ring-4 ring-white ${a.bg}`} />
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-700">{e.who}</span>
                      <span className="text-xs text-slate-400 ml-auto">{e.at}</span>
                    </div>
                    <p className="text-sm text-slate-500">{e.text}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </Panel>
      </div>
    </div>
  )
}
