import { useState } from 'react'
import { Settings as SettingsIcon, Bell, Moon, Plane, Building2, Globe, ShieldCheck } from 'lucide-react'
import { Panel, SectionTitle, Pill } from '../components/ui'
import { brand } from '../data'

function Toggle({ on, onClick }) {
  return (
    <button onClick={onClick}
      className={`relative w-11 h-6 rounded-full transition-colors ${on ? 'bg-sky-500' : 'bg-slate-200'}`}>
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-5' : ''}`} />
    </button>
  )
}

export default function Settings() {
  const [toggles, setToggles] = useState({ notif: true, dark: false, wx: true, digest: false })
  const t = (k) => setToggles((s) => ({ ...s, [k]: !s[k] }))
  const rows = [
    { k: 'notif', icon: Bell, label: 'Snag & AOG alerts', sub: 'Push when an aircraft is grounded' },
    { k: 'wx', icon: Globe, label: 'Weather auto-cancel', sub: 'Flag sorties below VFR minima' },
    { k: 'digest', icon: ShieldCheck, label: 'Daily compliance digest', sub: 'Morning DGCA readiness summary' },
    { k: 'dark', icon: Moon, label: 'Dark mode', sub: 'Reduce glare in the ops room' },
  ]
  return (
    <div className="space-y-6">
      <SectionTitle icon={SettingsIcon} title="Settings" sub="Organisation & preferences" accent="sky" />

      <div className="grid lg:grid-cols-3 gap-4">
        <Panel className="lg:col-span-1">
          <SectionTitle icon={Building2} title="Organisation" accent="teal" />
          <div className="flex flex-col items-center text-center py-2">
            <div className="grid place-items-center w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-500 to-teal-500 shadow-lg shadow-sky-200">
              <Plane className="w-10 h-10 text-white -rotate-45" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-800 mt-3">{brand.name}</h3>
            <p className="text-sm text-slate-400">{brand.tagline}</p>
            <p className="text-xs text-slate-400 mt-1">{brand.base}</p>
            <div className="flex gap-2 mt-3">
              <Pill tone="green">DGCA Approved FTO</Pill>
              <Pill tone="sky">CAR 21</Pill>
            </div>
          </div>
        </Panel>

        <Panel className="lg:col-span-2">
          <SectionTitle icon={Bell} title="Preferences" accent="violet" />
          <div className="space-y-1">
            {rows.map((r) => {
              const Icon = r.icon
              return (
                <div key={r.k} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="grid place-items-center w-10 h-10 rounded-xl bg-slate-100">
                    <Icon className="w-5 h-5 text-slate-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-700">{r.label}</p>
                    <p className="text-xs text-slate-400">{r.sub}</p>
                  </div>
                  <Toggle on={toggles[r.k]} onClick={() => t(r.k)} />
                </div>
              )
            })}
          </div>
          <p className="text-xs text-slate-300 mt-4 text-center">Prototype build · UI demo only · no data is saved</p>
        </Panel>
      </div>
    </div>
  )
}
