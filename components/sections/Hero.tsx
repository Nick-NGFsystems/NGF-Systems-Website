import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-4 pt-24 pb-16 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50/40 to-white">

      {/* Background orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-3xl -translate-x-1/2 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-3xl translate-x-1/3 translate-y-1/4 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/20 rounded-full px-4 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-xs font-medium text-blue-600 font-inter">Michigan-based web management platform</span>
        </div>

        {/* Heading */}
        <h1 className="font-sora font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tight text-slate-900 leading-[1.1] mb-5">
          Your website.<br />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Managed smarter.
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-slate-500 font-inter leading-relaxed max-w-xl mx-auto mb-8">
          NGFsystems gives small businesses and realtors a powerful platform to manage, update, and grow their web presence — without the hassle.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
          <Link
            href="#contact"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-base px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
          >
            Start Free Trial
          </Link>
          <Link
            href="#features"
            className="bg-white/80 backdrop-blur-sm hover:bg-white text-slate-800 font-medium text-base px-7 py-3.5 rounded-xl border border-slate-200 transition-all"
          >
            See How It Works →
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          <div className="text-center">
            <div className="font-sora font-bold text-2xl text-slate-900">100%</div>
            <div className="text-xs text-slate-400 mt-0.5 font-inter">Client uptime SLA</div>
          </div>
          <div className="hidden sm:block w-px h-8 bg-slate-200" />
          <div className="text-center">
            <div className="font-sora font-bold text-2xl text-slate-900">48hr</div>
            <div className="text-xs text-slate-400 mt-0.5 font-inter">Average turnaround</div>
          </div>
          <div className="hidden sm:block w-px h-8 bg-slate-200" />
          <div className="text-center">
            <div className="font-sora font-bold text-2xl text-slate-900">MI</div>
            <div className="text-xs text-slate-400 mt-0.5 font-inter">Locally built & supported</div>
          </div>
        </div>

        {/* Dashboard mockup */}
        <div className="mt-14 bg-white/65 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-5 shadow-2xl shadow-blue-500/10 max-w-2xl mx-auto">
          {/* Browser bar */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
            <div className="flex-1 bg-slate-100 rounded-md h-6 flex items-center px-3">
              <span className="text-[10px] text-slate-400 font-inter">app.ngfsystems.com/dashboard</span>
            </div>
          </div>

          {/* Mockup body */}
          <div className="flex gap-3">
            {/* Sidebar */}
            <div className="w-28 flex flex-col gap-1 shrink-0">
              <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest px-2 mb-1 font-inter">Menu</p>
              {['Dashboard', 'Clients', 'Websites', 'Billing', 'Settings'].map((item) => (
                <div
                  key={item}
                  className={`text-[11px] font-medium px-2.5 py-1.5 rounded-md font-inter ${item === 'Dashboard' ? 'bg-blue-600/10 text-blue-600' : 'text-slate-400'}`}
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col gap-2.5 min-w-0">
              {/* Stat cards */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Active Sites', value: '12', color: 'text-blue-600' },
                  { label: 'Requests', value: '4', color: 'text-slate-800' },
                  { label: 'MRR', value: '$2.4k', color: 'text-green-600' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-lg p-2.5 border border-slate-100">
                    <div className="text-[9px] text-slate-400 mb-1 font-inter">{stat.label}</div>
                    <div className={`font-sora font-semibold text-sm ${stat.color}`}>{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Client table */}
              <div className="bg-white rounded-lg border border-slate-100 overflow-hidden">
                <div className="grid grid-cols-3 px-3 py-1.5 bg-slate-50 text-[9px] font-semibold text-slate-400 uppercase tracking-wide font-inter">
                  <span>Client</span><span>Status</span><span>Plan</span>
                </div>
                {[
                  { name: 'North Cove Builders', status: 'Live', statusColor: 'bg-green-100 text-green-700', plan: 'Pro' },
                  { name: 'Lakefront Realty', status: 'Setup', statusColor: 'bg-blue-100 text-blue-700', plan: 'Starter' },
                  { name: 'Sunrise Auto', status: 'Review', statusColor: 'bg-amber-100 text-amber-700', plan: 'Pro' },
                ].map((row) => (
                  <div key={row.name} className="grid grid-cols-3 px-3 py-2 border-t border-slate-50 items-center">
                    <span className="text-[10px] text-slate-700 font-inter truncate">{row.name}</span>
                    <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full w-fit font-inter ${row.statusColor}`}>{row.status}</span>
                    <span className="text-[10px] text-slate-400 font-inter">{row.plan}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
