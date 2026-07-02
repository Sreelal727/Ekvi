import { Package, AlertTriangle, PackageCheck, ShoppingCart, TrendingDown } from 'lucide-react'
import { Panel, SectionTitle, Pill, ProgressBar } from '../components/ui'
import { inventory, accents } from '../data'

const reorderTone = { OK: 'green', Low: 'amber', Critical: 'rose', 'On Order': 'coral' }

export default function Inventory() {
  const lowCount = inventory.filter((p) => p.reorder === 'Low' || p.reorder === 'Critical').length
  const onOrder = inventory.filter((p) => p.reorder === 'On Order').length
  return (
    <div className="space-y-6">
      <SectionTitle icon={Package} title="Inventory / Spares" sub="Stock levels & reorder status" accent="rose" />

      {/* summary strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total SKUs', value: inventory.length, icon: Package, accent: 'sky' },
          { label: 'Below Threshold', value: lowCount, icon: TrendingDown, accent: 'rose' },
          { label: 'On Order', value: onOrder, icon: ShoppingCart, accent: 'coral' },
          { label: 'Healthy Stock', value: inventory.length - lowCount - onOrder, icon: PackageCheck, accent: 'green' },
        ].map((s) => {
          const a = accents[s.accent]
          const Icon = s.icon
          return (
            <div key={s.label} className="rounded-2xl bg-white/90 border border-slate-100 shadow-sm p-4 flex items-center gap-3 animate-slide-up">
              <div className={`grid place-items-center w-11 h-11 rounded-xl ${a.soft}`}>
                <Icon className={`w-5 h-5 ${a.text}`} />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-800 leading-none">{s.value}</p>
                <p className="text-xs text-slate-400 mt-1">{s.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      <Panel>
        <div className="space-y-1">
          {/* header */}
          <div className="hidden md:grid grid-cols-12 gap-3 px-3 pb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
            <div className="col-span-5">Part</div>
            <div className="col-span-3">Stock level</div>
            <div className="col-span-2 text-center">Min</div>
            <div className="col-span-2 text-right">Status</div>
          </div>
          {inventory.map((p) => {
            const a = accents[p.accent]
            const low = p.reorder === 'Low' || p.reorder === 'Critical'
            const pct = Math.min(100, Math.round((p.stock / (p.min * 2)) * 100))
            return (
              <div key={p.id}
                className={`grid grid-cols-12 gap-3 items-center px-3 py-3 rounded-xl transition-colors
                  ${low ? 'bg-rose-50/60 hover:bg-rose-50' : 'hover:bg-slate-50'}`}>
                <div className="col-span-12 md:col-span-5 flex items-center gap-2">
                  {low && <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />}
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{p.part}</p>
                    <p className="text-xs text-slate-400">{p.id}</p>
                  </div>
                </div>
                <div className="col-span-7 md:col-span-3">
                  <ProgressBar value={pct} accent={low ? 'rose' : p.accent} sub={`${p.stock} ${p.unit}`} label="" />
                </div>
                <div className="col-span-2 hidden md:block text-center text-sm text-slate-500 font-medium">{p.min}</div>
                <div className="col-span-5 md:col-span-2 text-right">
                  <Pill tone={reorderTone[p.reorder]}>{p.reorder}</Pill>
                </div>
              </div>
            )
          })}
        </div>
      </Panel>
    </div>
  )
}
