import { accents } from '../data'

// A hover-to-expand card. Collapsed shows `children`; on hover it lifts,
// scales slightly, and reveals `expand` content with a smooth transition.
export function ExpandCard({ accent = 'sky', className = '', children, expand, delay = 0 }) {
  const a = accents[accent] || accents.sky
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className={`group relative rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-100 shadow-sm
        transition-all duration-300 ease-out will-change-transform
        hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl hover:${a.ring} hover:ring-2
        animate-slide-up ${className}`}
    >
      <span className={`absolute left-0 top-5 bottom-5 w-1 rounded-r-full ${a.bg} opacity-70`} />
      <div className="p-5">
        {children}
        {expand && (
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 ease-out">
            <div className="overflow-hidden">
              <div className="pt-4 mt-4 border-t border-dashed border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {expand}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function Pill({ children, tone = 'slate', className = '' }) {
  const tones = {
    slate: 'bg-slate-100 text-slate-600',
    green: 'bg-emerald-100 text-emerald-700',
    amber: 'bg-amber-100 text-amber-700',
    rose: 'bg-rose-100 text-rose-700',
    sky: 'bg-sky-100 text-sky-700',
    coral: 'bg-orange-100 text-orange-700',
    violet: 'bg-violet-100 text-violet-700',
    teal: 'bg-teal-100 text-teal-700',
    indigo: 'bg-indigo-100 text-indigo-700',
  }
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${tones[tone] || tones.slate} ${className}`}>
      {children}
    </span>
  )
}

export function ProgressBar({ value, accent = 'sky', label, sub, height = 'h-2' }) {
  const a = accents[accent] || accents.sky
  const v = Math.min(100, Math.max(0, value))
  return (
    <div>
      {(label || sub) && (
        <div className="flex items-center justify-between mb-1 text-xs">
          <span className="font-medium text-slate-600">{label}</span>
          <span className="font-semibold text-slate-500">{sub ?? `${Math.round(v)}%`}</span>
        </div>
      )}
      <div className={`w-full ${height} bg-slate-100 rounded-full overflow-hidden`}>
        <div className={`${height} ${a.bg} rounded-full transition-all duration-700 ease-out`} style={{ width: `${v}%` }} />
      </div>
    </div>
  )
}

// SVG progress ring with a centered label.
export function Ring({ value, size = 96, stroke = 9, accent = 'sky', center }) {
  const a = accents[accent] || accents.sky
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const v = Math.min(100, Math.max(0, value))
  const off = c - (v / 100) * c
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#eef2f7" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={a.hex} strokeWidth={stroke}
          strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.9s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{center}</div>
    </div>
  )
}

export function SectionTitle({ icon: Icon, title, sub, accent = 'sky', action }) {
  const a = accents[accent] || accents.sky
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className={`grid place-items-center w-10 h-10 rounded-xl ${a.soft}`}>
            <Icon className={`w-5 h-5 ${a.text}`} />
          </div>
        )}
        <div>
          <h2 className="text-lg font-bold text-slate-800 leading-tight">{title}</h2>
          {sub && <p className="text-sm text-slate-400">{sub}</p>}
        </div>
      </div>
      {action}
    </div>
  )
}

export function Panel({ className = '', children }) {
  return (
    <div className={`rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-100 shadow-sm p-5 animate-slide-up ${className}`}>
      {children}
    </div>
  )
}
