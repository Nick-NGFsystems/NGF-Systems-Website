import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-950 px-4 sm:px-5 py-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="font-sora font-bold text-lg mb-1">
            <span className="text-blue-400">NGF</span>
            <span className="text-white/90">systems</span>
          </div>
          <p className="text-xs text-slate-500 font-inter">Hudsonville, Michigan</p>
        </div>
        <div className="flex items-center justify-center flex-wrap gap-x-6 gap-y-3">
          {[['#features', 'Features'], ['#pricing', 'Pricing'], ['#contact', 'Contact']].map(([href, label]) => (
            <Link key={href} href={href} className="text-xs text-slate-500 hover:text-slate-300 font-inter transition-colors">
              {label}
            </Link>
          ))}
        </div>
        <p className="text-xs text-slate-600 font-inter">
          © {new Date().getFullYear()} NGFsystems
        </p>
      </div>
    </footer>
  )
}
