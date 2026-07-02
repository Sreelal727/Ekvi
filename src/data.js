// ------------------------------------------------------------------
// Ekvi Air — hardcoded mock data for the UI prototype.
// No backend. Everything here is static demo data.
// ------------------------------------------------------------------

export const brand = {
  name: 'Ekvi Air',
  tagline: 'Flying Training Organisation',
  base: 'Belagavi (VOBM) · Karnataka',
}

// Reusable accent palette — each module / aircraft picks an accent.
export const accents = {
  sky: { text: 'text-sky-600', bg: 'bg-sky-500', soft: 'bg-sky-50', ring: 'ring-sky-200', hex: '#0ea5e9', softHex: '#e0f2fe' },
  teal: { text: 'text-teal-600', bg: 'bg-teal-500', soft: 'bg-teal-50', ring: 'ring-teal-200', hex: '#14b8a6', softHex: '#ccfbf1' },
  coral: { text: 'text-orange-600', bg: 'bg-orange-500', soft: 'bg-orange-50', ring: 'ring-orange-200', hex: '#f97316', softHex: '#ffedd5' },
  green: { text: 'text-emerald-600', bg: 'bg-emerald-500', soft: 'bg-emerald-50', ring: 'ring-emerald-200', hex: '#10b981', softHex: '#d1fae5' },
  amber: { text: 'text-amber-600', bg: 'bg-amber-500', soft: 'bg-amber-50', ring: 'ring-amber-200', hex: '#f59e0b', softHex: '#fef3c7' },
  violet: { text: 'text-violet-600', bg: 'bg-violet-500', soft: 'bg-violet-50', ring: 'ring-violet-200', hex: '#8b5cf6', softHex: '#ede9fe' },
  rose: { text: 'text-rose-600', bg: 'bg-rose-500', soft: 'bg-rose-50', ring: 'ring-rose-200', hex: '#f43f5e', softHex: '#ffe4e6' },
  indigo: { text: 'text-indigo-600', bg: 'bg-indigo-500', soft: 'bg-indigo-50', ring: 'ring-indigo-200', hex: '#6366f1', softHex: '#e0e7ff' },
}

// ---------------------------- Fleet -------------------------------
export const fleet = [
  {
    tail: 'VT-EKA', type: 'Cessna 172S', status: 'Available', accent: 'sky',
    hours: 3420, nextInspAt: 3450, cycle50: 32, cycle100: 78, annual: 61,
    snags: [], tbo: { engine: 74, prop: 52 }, engineHrs: 1480, tboLimit: 2000,
  },
  {
    tail: 'VT-EKB', type: 'Cessna 172S', status: 'Available', accent: 'teal',
    hours: 2980, nextInspAt: 3050, cycle50: 12, cycle100: 40, annual: 45,
    snags: [{ id: 'S-118', text: 'Nav light flicker (LH wing)', sev: 'low' }], tbo: { engine: 61, prop: 48 }, engineHrs: 1220, tboLimit: 2000,
  },
  {
    tail: 'VT-EKC', type: 'Diamond DA40 NG', status: 'In Maintenance', accent: 'coral',
    hours: 4110, nextInspAt: 4120, cycle50: 96, cycle100: 92, annual: 88,
    snags: [{ id: 'S-121', text: '100hr inspection in progress', sev: 'med' }, { id: 'S-122', text: 'Brake pad wear LH', sev: 'med' }], tbo: { engine: 83, prop: 70 }, engineHrs: 1660, tboLimit: 2000,
  },
  {
    tail: 'VT-EKD', type: 'Diamond DA40 NG', status: 'Available', accent: 'green',
    hours: 1890, nextInspAt: 1950, cycle50: 20, cycle100: 55, annual: 30,
    snags: [], tbo: { engine: 38, prop: 24 }, engineHrs: 760, tboLimit: 2000,
  },
  {
    tail: 'VT-EKE', type: 'Diamond DA42-VI', status: 'Available', accent: 'violet',
    hours: 2240, nextInspAt: 2300, cycle50: 45, cycle100: 62, annual: 52,
    snags: [], tbo: { engine: 55, prop: 41 }, engineHrs: 1100, tboLimit: 2000,
  },
  {
    tail: 'VT-EKF', type: 'Cessna 152', status: 'Available', accent: 'amber',
    hours: 5320, nextInspAt: 5380, cycle50: 28, cycle100: 66, annual: 40,
    snags: [], tbo: { engine: 68, prop: 59 }, engineHrs: 1360, tboLimit: 2000,
  },
  {
    tail: 'VT-EKG', type: 'Cessna 172S', status: 'Grounded', accent: 'rose',
    hours: 3760, nextInspAt: 3760, cycle50: 100, cycle100: 100, annual: 95,
    snags: [{ id: 'S-130', text: 'Engine cylinder compression low #3', sev: 'high' }, { id: 'S-131', text: 'Awaiting spare — cylinder assy', sev: 'high' }], tbo: { engine: 91, prop: 77 }, engineHrs: 1820, tboLimit: 2000,
  },
  {
    tail: 'VT-EKH', type: 'Diamond DA40 NG', status: 'Available', accent: 'indigo',
    hours: 1450, nextInspAt: 1500, cycle50: 8, cycle100: 25, annual: 18,
    snags: [], tbo: { engine: 29, prop: 15 }, engineHrs: 580, tboLimit: 2000,
  },
]

// ---------------------------- Cadets ------------------------------
export const cadets = [
  { id: 'C-2201', name: 'Aarav Deshpande', goal: 'CPL', total: 168, dual: 62, solo: 58, instrument: 34, night: 14, syllabus: 84, batch: 'CPL-24A', accent: 'sky' },
  { id: 'C-2202', name: 'Ananya Iyer', goal: 'CPL', total: 142, dual: 55, solo: 47, instrument: 28, night: 12, syllabus: 71, batch: 'CPL-24A', accent: 'teal' },
  { id: 'C-2203', name: 'Rohan Kulkarni', goal: 'CPL', total: 196, dual: 70, solo: 74, instrument: 38, night: 14, syllabus: 96, batch: 'CPL-23B', accent: 'green' },
  { id: 'C-2204', name: 'Ishita Nair', goal: 'PPL', total: 44, dual: 30, solo: 14, instrument: 0, night: 0, syllabus: 62, batch: 'PPL-24C', accent: 'violet' },
  { id: 'C-2205', name: 'Kabir Menon', goal: 'CPL', total: 118, dual: 48, solo: 40, instrument: 22, night: 8, syllabus: 59, batch: 'CPL-24A', accent: 'amber' },
  { id: 'C-2206', name: 'Diya Reddy', goal: 'CPL', total: 88, dual: 44, solo: 30, instrument: 12, night: 2, syllabus: 44, batch: 'CPL-24B', accent: 'coral' },
  { id: 'C-2207', name: 'Vivaan Shetty', goal: 'PPL', total: 52, dual: 34, solo: 18, instrument: 0, night: 0, syllabus: 74, batch: 'PPL-24C', accent: 'indigo' },
  { id: 'C-2208', name: 'Saanvi Rao', goal: 'CPL', total: 154, dual: 58, solo: 52, instrument: 32, night: 12, syllabus: 77, batch: 'CPL-23B', accent: 'rose' },
]

// -------------------------- Instructors ---------------------------
export const instructors = [
  { id: 'I-01', name: 'Capt. Vikram Sinha', role: 'Chief Flight Instructor', currency: 'Current', dutyUsed: 62, dutyLimit: 90, cadets: 6, ratings: ['CPL', 'IR', 'FI'], accent: 'sky' },
  { id: 'I-02', name: 'Capt. Meera Joshi', role: 'Sr. Flight Instructor', currency: 'Current', dutyUsed: 71, dutyLimit: 90, cadets: 5, ratings: ['CPL', 'IR', 'FI'], accent: 'teal' },
  { id: 'I-03', name: 'Capt. Arjun Pillai', role: 'Flight Instructor', currency: 'Due Soon', dutyUsed: 84, dutyLimit: 90, cadets: 4, ratings: ['CPL', 'FI'], accent: 'amber' },
  { id: 'I-04', name: 'Capt. Neha Bhatt', role: 'Flight Instructor', currency: 'Current', dutyUsed: 40, dutyLimit: 90, cadets: 4, ratings: ['CPL', 'IR', 'FI'], accent: 'green' },
  { id: 'I-05', name: 'Capt. Rahul Verma', role: 'Asst. Flight Instructor', currency: 'Expired', dutyUsed: 12, dutyLimit: 90, cadets: 2, ratings: ['CPL', 'FI'], accent: 'rose' },
  { id: 'I-06', name: 'Capt. Priya Menon', role: 'Flight Instructor', currency: 'Current', dutyUsed: 55, dutyLimit: 90, cadets: 5, ratings: ['CPL', 'IR', 'FI'], accent: 'violet' },
]

// -------------------------- Inventory -----------------------------
export const inventory = [
  { id: 'P-1001', part: 'Engine Oil (Aeroshell W100)', unit: 'ltr', stock: 46, min: 20, reorder: 'OK', accent: 'green' },
  { id: 'P-1002', part: 'Oil Filter — Champion CH48110', unit: 'pcs', stock: 8, min: 10, reorder: 'Low', accent: 'amber' },
  { id: 'P-1003', part: 'Spark Plug — Tempest UREM40E', unit: 'pcs', stock: 24, min: 16, reorder: 'OK', accent: 'green' },
  { id: 'P-1004', part: 'Brake Pad Set — Cleveland', unit: 'set', stock: 3, min: 6, reorder: 'Critical', accent: 'rose' },
  { id: 'P-1005', part: 'Main Tyre 6.00-6', unit: 'pcs', stock: 5, min: 4, reorder: 'OK', accent: 'green' },
  { id: 'P-1006', part: 'Nav Light Bulb — LED', unit: 'pcs', stock: 2, min: 8, reorder: 'Critical', accent: 'rose' },
  { id: 'P-1007', part: 'Air Filter Element', unit: 'pcs', stock: 11, min: 8, reorder: 'OK', accent: 'green' },
  { id: 'P-1008', part: 'Cylinder Assy — Lycoming', unit: 'pcs', stock: 0, min: 1, reorder: 'On Order', accent: 'coral' },
  { id: 'P-1009', part: 'Hydraulic Fluid 5606', unit: 'ltr', stock: 18, min: 10, reorder: 'OK', accent: 'green' },
  { id: 'P-1010', part: 'Battery — Concorde RG25', unit: 'pcs', stock: 4, min: 3, reorder: 'OK', accent: 'green' },
]

// ------------------------- Scheduling -----------------------------
export const scheduleDays = ['Mon 30', 'Tue 01', 'Wed 02', 'Thu 03', 'Fri 04', 'Sat 05']
export const scheduleSlots = ['06:00', '07:30', '09:00', '10:30', '12:00', '14:00', '15:30', '17:00']

// bookings keyed by "slotIndex-dayIndex"
export const bookings = {
  '0-0': { tail: 'VT-EKA', accent: 'sky', instr: 'Capt. Sinha', cadet: 'Aarav D.', type: 'Dual — Circuits' },
  '0-2': { tail: 'VT-EKD', accent: 'green', instr: 'Capt. Bhatt', cadet: 'Ishita N.', type: 'PPL Ex.14' },
  '1-0': { tail: 'VT-EKB', accent: 'teal', instr: 'Capt. Joshi', cadet: 'Ananya I.', type: 'Solo Nav' },
  '1-1': { tail: 'VT-EKE', accent: 'violet', instr: 'Capt. Menon', cadet: 'Saanvi R.', type: 'IR Approach' },
  '1-3': { tail: 'VT-EKA', accent: 'sky', instr: 'Capt. Sinha', cadet: 'Kabir M.', type: 'Dual — Stalls' },
  '2-0': { tail: 'VT-EKF', accent: 'amber', instr: 'Capt. Pillai', cadet: 'Diya R.', type: 'GF Ex.5' },
  '2-2': { tail: 'VT-EKH', accent: 'indigo', instr: 'Capt. Bhatt', cadet: 'Vivaan S.', type: 'PPL Ex.9' },
  '2-4': { tail: 'VT-EKB', accent: 'teal', instr: 'Capt. Joshi', cadet: 'Rohan K.', type: 'CPL Skill Test' },
  '3-1': { tail: 'VT-EKD', accent: 'green', instr: 'Capt. Menon', cadet: 'Aarav D.', type: 'Solo Circuits' },
  '3-3': { tail: 'VT-EKE', accent: 'violet', instr: 'Capt. Sinha', cadet: 'Ananya I.', type: 'IR Nav' },
  '4-0': { tail: 'VT-EKA', accent: 'sky', instr: 'Capt. Joshi', cadet: 'Saanvi R.', type: 'Dual — PFL' },
  '4-2': { tail: 'VT-EKF', accent: 'amber', instr: 'Capt. Pillai', cadet: 'Kabir M.', type: 'GF Ex.7' },
  '4-4': { tail: 'VT-EKH', accent: 'indigo', instr: 'Capt. Bhatt', cadet: 'Diya R.', type: 'PPL Ex.12' },
  '5-1': { tail: 'VT-EKD', accent: 'green', instr: 'Capt. Menon', cadet: 'Vivaan S.', type: 'Solo Nav' },
  '5-3': { tail: 'VT-EKB', accent: 'teal', instr: 'Capt. Joshi', cadet: 'Rohan K.', type: 'CPL Nav' },
  '6-2': { tail: 'VT-EKE', accent: 'violet', instr: 'Capt. Menon', cadet: 'Aarav D.', type: 'IR Hold' },
}

// weather cancellations (slot-day)
export const wxCancellations = ['0-4', '1-4', '2-3']

// ----------------------- Today's schedule -------------------------
export const todaySchedule = [
  { time: '06:00', tail: 'VT-EKA', accent: 'sky', cadet: 'Aarav Deshpande', instr: 'Capt. Sinha', ex: 'Dual — Circuits', status: 'Completed' },
  { time: '07:30', tail: 'VT-EKB', accent: 'teal', cadet: 'Ananya Iyer', instr: 'Capt. Joshi', ex: 'Solo Nav', status: 'Airborne' },
  { time: '09:00', tail: 'VT-EKD', accent: 'green', cadet: 'Ishita Nair', instr: 'Capt. Bhatt', ex: 'PPL Ex.14', status: 'Boarding' },
  { time: '10:30', tail: 'VT-EKE', accent: 'violet', cadet: 'Saanvi Rao', instr: 'Capt. Menon', ex: 'IR Approach', status: 'Scheduled' },
  { time: '12:00', tail: 'VT-EKF', accent: 'amber', cadet: 'Diya Reddy', instr: 'Capt. Pillai', ex: 'GF Ex.5', status: 'Scheduled' },
  { time: '14:00', tail: 'VT-EKH', accent: 'indigo', cadet: 'Vivaan Shetty', instr: 'Capt. Bhatt', ex: 'PPL Ex.9', status: 'Scheduled' },
]

// --------------------- Upcoming maintenance -----------------------
export const upcomingMaintenance = [
  { tail: 'VT-EKC', type: 'Diamond DA40 NG', task: '100 hr Inspection', dueIn: 'In progress', accent: 'coral', urgency: 'high' },
  { tail: 'VT-EKA', type: 'Cessna 172S', task: '50 hr Check', dueIn: '30 hrs', accent: 'sky', urgency: 'med' },
  { tail: 'VT-EKG', type: 'Cessna 172S', task: 'Cylinder Replacement', dueIn: 'AOG', accent: 'rose', urgency: 'high' },
  { tail: 'VT-EKE', type: 'Diamond DA42-VI', task: 'Annual Review', dueIn: '12 days', accent: 'violet', urgency: 'low' },
  { tail: 'VT-EKF', type: 'Cessna 152', task: 'Oil & Filter', dueIn: '60 hrs', accent: 'amber', urgency: 'low' },
]

// ---------------------- Charts (dashboard) ------------------------
export const utilisationData = [
  { tail: 'EKA', hrs: 142 }, { tail: 'EKB', hrs: 118 }, { tail: 'EKC', hrs: 64 },
  { tail: 'EKD', hrs: 156 }, { tail: 'EKE', hrs: 98 }, { tail: 'EKF', hrs: 132 },
  { tail: 'EKG', hrs: 22 }, { tail: 'EKH', hrs: 148 },
]

export const availabilityTrend = [
  { day: 'Mon', avail: 7, target: 6 }, { day: 'Tue', avail: 6, target: 6 },
  { day: 'Wed', avail: 6, target: 6 }, { day: 'Thu', avail: 5, target: 6 },
  { day: 'Fri', avail: 6, target: 6 }, { day: 'Sat', avail: 7, target: 6 },
  { day: 'Sun', avail: 6, target: 6 },
]

export const fleetStatusPie = [
  { name: 'Available', value: 6, color: '#10b981' },
  { name: 'In Maintenance', value: 1, color: '#f97316' },
  { name: 'Grounded', value: 1, color: '#f43f5e' },
]

// ---------------------------- Finance -----------------------------
export const revenueData = [
  { month: 'Jan', revenue: 82, expense: 61 }, { month: 'Feb', revenue: 91, expense: 64 },
  { month: 'Mar', revenue: 104, expense: 70 }, { month: 'Apr', revenue: 96, expense: 66 },
  { month: 'May', revenue: 118, expense: 74 }, { month: 'Jun', revenue: 132, expense: 79 },
]

export const feeTracking = [
  { name: 'Aarav Deshpande', batch: 'CPL-24A', total: 4500000, paid: 3600000, accent: 'sky' },
  { name: 'Ananya Iyer', batch: 'CPL-24A', total: 4500000, paid: 2700000, accent: 'teal' },
  { name: 'Rohan Kulkarni', batch: 'CPL-23B', total: 4500000, paid: 4500000, accent: 'green' },
  { name: 'Ishita Nair', batch: 'PPL-24C', total: 1200000, paid: 600000, accent: 'violet' },
  { name: 'Kabir Menon', batch: 'CPL-24A', total: 4500000, paid: 1800000, accent: 'amber' },
  { name: 'Diya Reddy', batch: 'CPL-24B', total: 4500000, paid: 900000, accent: 'coral' },
]

export const financeKpis = [
  { label: 'Fees Collected (FY)', value: '₹6.42 Cr', delta: '+12.4%', up: true, accent: 'green' },
  { label: 'Pending Dues', value: '₹1.18 Cr', delta: '-3.1%', up: false, accent: 'amber' },
  { label: 'Instructor Payroll (Jun)', value: '₹18.6 L', delta: '+2.0%', up: true, accent: 'sky' },
  { label: 'Spares Procurement (Jun)', value: '₹7.4 L', delta: '+9.8%', up: true, accent: 'violet' },
]

export const payroll = [
  { name: 'Capt. Vikram Sinha', role: 'CFI', hours: 62, pay: 285000 },
  { name: 'Capt. Meera Joshi', role: 'Sr. FI', hours: 71, pay: 246000 },
  { name: 'Capt. Arjun Pillai', role: 'FI', hours: 84, pay: 218000 },
  { name: 'Capt. Neha Bhatt', role: 'FI', hours: 40, pay: 162000 },
  { name: 'Capt. Priya Menon', role: 'FI', hours: 55, pay: 198000 },
]

// -------------------------- Compliance ----------------------------
export const dgcaParams = [
  { name: 'Operational', weight: 40, score: 37, accent: 'sky' },
  { name: 'Safety', weight: 20, score: 18, accent: 'green' },
  { name: 'Performance', weight: 20, score: 16, accent: 'teal' },
  { name: 'Compliance', weight: 10, score: 9, accent: 'violet' },
  { name: 'Student Assistance', weight: 10, score: 8, accent: 'amber' },
]

export const auditChecklist = [
  { item: 'CAR 21 — Operations Manual current', done: true },
  { item: 'Aircraft airworthiness certificates valid', done: true },
  { item: 'Instructor licence currency records', done: false },
  { item: 'Cadet training records digitised', done: true },
  { item: 'Snag rectification within TAT', done: true },
  { item: 'Fuel quality checks logged', done: true },
  { item: 'Emergency response drill (quarterly)', done: false },
  { item: 'DGCA CA 39 forms submitted', done: true },
]

export const evidenceTrail = [
  { at: '09:42', who: 'Capt. Joshi', text: 'Closed work order WO-4482 — VT-EKB nav light', accent: 'teal' },
  { at: '08:15', who: 'AME Ramesh', text: 'Updated 100hr inspection log — VT-EKC', accent: 'coral' },
  { at: 'Yesterday', who: 'Ops Desk', text: 'Filed DGCA CA 39 monthly utilisation return', accent: 'sky' },
  { at: 'Yesterday', who: 'Capt. Sinha', text: 'Approved cadet Rohan K. — CPL skill test cleared', accent: 'green' },
  { at: '2 days ago', who: 'Stores', text: 'GRN posted — cylinder assy (PO-2231)', accent: 'violet' },
  { at: '2 days ago', who: 'Safety Cell', text: 'Logged VOR reliability check — satisfactory', accent: 'amber' },
]
