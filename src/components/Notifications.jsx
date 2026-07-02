import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { AlertTriangle, Bell, CheckCircle2, Info, Siren, X } from 'lucide-react'

const NotifCtx = createContext(null)
export const useNotify = () => useContext(NotifCtx)

let counter = 0

const toneStyles = {
  sos: { bar: 'bg-rose-500', soft: 'bg-rose-50', text: 'text-rose-600', icon: Siren },
  rose: { bar: 'bg-rose-500', soft: 'bg-rose-50', text: 'text-rose-600', icon: AlertTriangle },
  amber: { bar: 'bg-amber-500', soft: 'bg-amber-50', text: 'text-amber-600', icon: AlertTriangle },
  green: { bar: 'bg-emerald-500', soft: 'bg-emerald-50', text: 'text-emerald-600', icon: CheckCircle2 },
  sky: { bar: 'bg-sky-500', soft: 'bg-sky-50', text: 'text-sky-600', icon: Info },
}

// Seed a couple of items so the bell isn't empty on first load.
const seed = [
  { id: ++counter, tone: 'amber', title: 'Instructor currency due', body: 'Capt. Arjun Pillai — renewal within 15 days', at: '2h ago', read: false },
  { id: ++counter, tone: 'sky', title: 'DGCA CA 39 filed', body: 'Monthly utilisation return submitted', at: 'Yesterday', read: true },
]

export function NotificationProvider({ children }) {
  const [items, setItems] = useState(seed)
  const [toasts, setToasts] = useState([])

  const dismissToast = useCallback((id) => {
    setToasts((s) => s.filter((t) => t.id !== id))
  }, [])

  const notify = useCallback((n) => {
    const id = ++counter
    const item = { id, tone: 'sky', at: 'just now', read: false, ...n }
    setItems((s) => [item, ...s])
    setToasts((s) => [item, ...s])
    return id
  }, [])

  const markAllRead = useCallback(() => {
    setItems((s) => s.map((i) => ({ ...i, read: true })))
  }, [])

  const clearAll = useCallback(() => setItems([]), [])

  const unread = items.filter((i) => !i.read).length

  return (
    <NotifCtx.Provider value={{ items, notify, markAllRead, clearAll, unread }}>
      {children}
      <ToastStack toasts={toasts} onClose={dismissToast} />
    </NotifCtx.Provider>
  )
}

function ToastStack({ toasts, onClose }) {
  return (
    <div className="fixed top-4 right-4 z-[60] flex flex-col gap-2.5 w-[340px] max-w-[calc(100vw-2rem)] pointer-events-none">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onClose={onClose} />
      ))}
    </div>
  )
}

function Toast({ toast, onClose }) {
  const s = toneStyles[toast.tone] || toneStyles.sky
  const Icon = s.icon
  const isSos = toast.tone === 'sos'
  useEffect(() => {
    const ms = isSos ? 7000 : 5000
    const timer = setTimeout(() => onClose(toast.id), ms)
    return () => clearTimeout(timer)
  }, [toast.id, onClose, isSos])
  return (
    <div
      className={`pointer-events-auto relative overflow-hidden rounded-2xl bg-white shadow-xl border border-slate-100
        flex items-start gap-3 p-3.5 animate-pop ${isSos ? 'ring-2 ring-rose-300' : ''}`}
    >
      <span className={`absolute left-0 top-0 bottom-0 w-1.5 ${s.bar}`} />
      <div className={`grid place-items-center min-w-9 w-9 h-9 rounded-xl ${s.soft} ${isSos ? 'animate-pulse' : ''}`}>
        <Icon className={`w-5 h-5 ${s.text}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {isSos && (
            <span className="px-1.5 py-0.5 rounded-md bg-rose-500 text-white text-[10px] font-extrabold tracking-wide animate-pulse">
              SOS
            </span>
          )}
          <p className="font-bold text-slate-800 text-sm truncate">{toast.title}</p>
        </div>
        {toast.body && <p className="text-xs text-slate-500 mt-0.5">{toast.body}</p>}
      </div>
      <button onClick={() => onClose(toast.id)} className="text-slate-300 hover:text-slate-500 transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

// Bell + dropdown panel for the top bar.
export function NotificationBell() {
  const { items, unread, markAllRead, clearAll } = useNotify()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  }, [open])

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => { setOpen((o) => !o); if (!open) markAllRead() }}
        className="relative grid place-items-center w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
      >
        <Bell className="w-5 h-5 text-slate-500" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 grid place-items-center rounded-full bg-rose-500 text-white text-[10px] font-bold ring-2 ring-white animate-pop">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] rounded-2xl bg-white shadow-2xl border border-slate-100 overflow-hidden animate-pop z-[55]">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <p className="font-bold text-slate-800">Notifications</p>
            {items.length > 0 && (
              <button onClick={clearAll} className="text-xs font-semibold text-slate-400 hover:text-rose-500 transition-colors">
                Clear all
              </button>
            )}
          </div>
          <div className="max-h-96 overflow-y-auto no-scrollbar">
            {items.length === 0 ? (
              <div className="px-4 py-10 text-center text-sm text-slate-400">
                <Bell className="w-8 h-8 mx-auto text-slate-200 mb-2" />
                You're all caught up 🎉
              </div>
            ) : (
              items.map((n) => {
                const s = toneStyles[n.tone] || toneStyles.sky
                const Icon = s.icon
                return (
                  <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
                    <div className={`grid place-items-center min-w-8 w-8 h-8 rounded-lg ${s.soft}`}>
                      <Icon className={`w-4 h-4 ${s.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-700 leading-tight">{n.title}</p>
                      {n.body && <p className="text-xs text-slate-500 mt-0.5">{n.body}</p>}
                      <p className="text-[10px] text-slate-400 mt-1">{n.at}</p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}
