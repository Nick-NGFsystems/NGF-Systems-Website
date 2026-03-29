export default function Footer() {
  return (
    <footer className="bg-slate-900 px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
      <div className="font-sora font-bold text-lg">
        <span className="text-blue-400">NGF</span>
        <span className="text-white/90">systems</span>
      </div>
      <p className="text-xs text-white/30 font-inter">
        © {new Date().getFullYear()} NGFsystems · Hudsonville, Michigan
      </p>
    </footer>
  )
}
