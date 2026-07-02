import {
  LayoutDashboard, Wrench, GraduationCap, CalendarDays,
  ShieldCheck, Wallet, Users, Package, Settings, Plane,
} from 'lucide-react'
import { brand } from '../data'

export const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, accent: 'sky' },
  { id: 'fleet', label: 'Fleet & Maintenance', icon: Wrench, accent: 'coral' },
  { id: 'cadets', label: 'Cadets & Training', icon: GraduationCap, accent: 'teal' },
  { id: 'scheduling', label: 'Scheduling', icon: CalendarDays, accent: 'violet' },
  { id: 'compliance', label: 'Compliance & DGCA', icon: ShieldCheck, accent: 'green' },
  { id: 'finance', label: 'Finance', icon: Wallet, accent: 'amber' },
  { id: 'instructors', label: 'Instructors', icon: Users, accent: 'indigo' },
  { id: 'inventory', label: 'Inventory / Spares', icon: Package, accent: 'rose' },
  { id: 'settings', label: 'Settings', icon: Settings, accent: 'sky' },
]

const accentActive = {
  sky: 'bg-sky-500 text-white shadow-sky-200',
  coral: 'bg-orange-500 text-white shadow-orange-200',
  teal: 'bg-teal-500 text-white shadow-teal-200',
  violet: 'bg-violet-500 text-white shadow-violet-200',
  green: 'bg-emerald-500 text-white shadow-emerald-200',
  amber: 'bg-amber-500 text-white shadow-amber-200',
  indigo: 'bg-indigo-500 text-white shadow-indigo-200',
  rose: 'bg-rose-500 text-white shadow-rose-200',
}

export default function Sidebar({ active, onChange }) {
  return (
    <aside
      className="group/sb fixed z-30 top-0 left-0 h-full bg-white/95 backdrop-blur-md border-r border-slate-100
        shadow-sm w-16 hover:w-60 transition-[width] duration-300 ease-in-out overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 h-16 px-3 border-b border-slate-100">
        <div className="grid place-items-center min-w-10 w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 shadow-lg shadow-sky-200">
          <Plane className="w-5 h-5 text-white -rotate-45" />
        </div>
        <div className="whitespace-nowrap opacity-0 group-hover/sb:opacity-100 transition-opacity duration-200">
          <div className="font-extrabold text-slate-800 leading-tight tracking-tight">{brand.name}</div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-sky-500">{brand.tagline}</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="p-2 space-y-1 mt-2">
        {navItems.map((item) => {
          const isActive = active === item.id
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                ${isActive
                  ? `${accentActive[item.accent]} shadow-md`
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'}`}
            >
              <Icon className="min-w-5 w-5 h-5" strokeWidth={isActive ? 2.4 : 2} />
              <span className="whitespace-nowrap text-sm font-semibold opacity-0 group-hover/sb:opacity-100 transition-opacity duration-200">
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>

      {/* Footer badge */}
      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-slate-100">
        <div className="flex items-center gap-3">
          <div className="grid place-items-center min-w-10 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white text-xs font-bold">
            VS
          </div>
          <div className="whitespace-nowrap opacity-0 group-hover/sb:opacity-100 transition-opacity duration-200">
            <div className="text-sm font-bold text-slate-700">Capt. V. Sinha</div>
            <div className="text-[11px] text-slate-400">Chief Flt. Instructor</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
