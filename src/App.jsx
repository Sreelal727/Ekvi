import { useState } from 'react'
import { Search, ChevronRight } from 'lucide-react'
import Sidebar, { navItems } from './components/Sidebar'
import { NotificationProvider, NotificationBell } from './components/Notifications'
import Dashboard from './modules/Dashboard'
import Fleet from './modules/Fleet'
import Cadets from './modules/Cadets'
import Scheduling from './modules/Scheduling'
import Compliance from './modules/Compliance'
import Finance from './modules/Finance'
import Instructors from './modules/Instructors'
import Inventory from './modules/Inventory'
import Settings from './modules/Settings'

const views = {
  dashboard: Dashboard,
  fleet: Fleet,
  cadets: Cadets,
  scheduling: Scheduling,
  compliance: Compliance,
  finance: Finance,
  instructors: Instructors,
  inventory: Inventory,
  settings: Settings,
}

export default function App() {
  const [active, setActive] = useState('dashboard')
  const View = views[active]
  const current = navItems.find((n) => n.id === active)

  return (
    <NotificationProvider>
    <div className="doodle-bg min-h-screen">
      <Sidebar active={active} onChange={setActive} />

      {/* content shifts for the collapsed rail width */}
      <div className="pl-16">
        {/* Top bar */}
        <header className="sticky top-0 z-20 h-16 bg-white/70 backdrop-blur-md border-b border-slate-100 flex items-center gap-4 px-5">
          <div className="flex items-center gap-1.5 text-sm">
            <span className="text-slate-400 font-medium">Ekvi Air</span>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <span className="font-bold text-slate-700">{current?.label}</span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2 w-56">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                placeholder="Search tail no, cadet…"
                className="bg-transparent outline-none text-sm text-slate-600 placeholder:text-slate-400 w-full"
              />
            </div>
            <NotificationBell />
            <div className="flex items-center gap-2 pl-1">
              <div className="grid place-items-center w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white text-xs font-bold">
                VS
              </div>
            </div>
          </div>
        </header>

        <main key={active} className="p-5 md:p-6 max-w-[1400px] mx-auto animate-fade-in">
          <View />
        </main>

        <footer className="text-center text-xs text-slate-300 pb-6">
          Ekvi Air FTO Operations Suite · UI prototype · mock data only
        </footer>
      </div>
    </div>
    </NotificationProvider>
  )
}
