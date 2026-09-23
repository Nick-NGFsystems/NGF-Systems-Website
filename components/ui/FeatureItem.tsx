import Icon, { type IconName } from './Icon'

/**
 * A capability, stated as a title and one short paragraph with a line icon.
 * Shared by the home page and Services so the same fact is described the same
 * way wherever a visitor meets it.
 */
export default function FeatureItem({
  icon,
  title,
  children,
}: {
  icon: IconName
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-4">
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-panel text-accent-light">
        <Icon name={icon} />
      </div>
      <div>
        <h3 className="text-[16.5px] font-semibold text-white">{title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{children}</p>
      </div>
    </div>
  )
}

/** A checked line in a list of included things. */
export function Tick({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-sand" />
      <span className="text-[15.5px] leading-relaxed text-white/85">{children}</span>
    </li>
  )
}
