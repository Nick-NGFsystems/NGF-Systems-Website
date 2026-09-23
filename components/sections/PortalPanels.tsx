import Card, { CardHeader } from '@/components/ui/Card'

/**
 * The two portal surfaces the site depicts. They are the argument for NGF —
 * a client editing their own live site, and every enquiry landing somewhere
 * they own — so they are shown rather than described, and shared between
 * pages so both tell the same story.
 *
 * The rows are illustrative, not real client data.
 */

export function WebsiteEditorPanel({ className = '' }: { className?: string }) {
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader title="Your portal · Website" badge="3 unpublished changes" badgeTone="sand" />
      <div className="grid grid-cols-[150px_1fr] text-left sm:grid-cols-[190px_1fr]">
        <aside className="border-r border-line bg-panel/60 p-4">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-dim">Sections</p>
          <div className="mt-3 space-y-1">
            <div className="rounded-md bg-accent/20 px-3 py-2 text-[14px] font-medium">Hero</div>
            <div className="px-3 py-2 text-[14px] text-muted">Services</div>
            <div className="px-3 py-2 text-[14px] text-muted">Photos</div>
            <div className="px-3 py-2 text-[14px] text-muted">Contact</div>
          </div>
          <div className="mt-5 rounded-lg border border-line bg-ink/60 p-3.5">
            <p className="text-[13.5px] text-white/80">Ready to go live</p>
            <div className="mt-2.5 grid h-9 place-items-center rounded-md bg-accent text-[13.5px] font-semibold">
              Publish
            </div>
          </div>
        </aside>
        <div className="bg-ink/70 p-5">
          <div className="rounded-lg border border-dashed border-accent/60 bg-accent/[0.07] p-4">
            <p className="text-[12.5px] font-medium text-accent-light">Editing your headline</p>
            <p className="mt-2 text-[19px] font-semibold leading-snug">
              Premium window tint in Grand Rapids
            </p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2.5">
            <div className="h-20 rounded-lg border border-line bg-panel" />
            <div className="h-20 rounded-lg border border-line bg-panel" />
            <div className="h-20 rounded-lg border border-line bg-panel" />
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-2.5 w-3/4 rounded bg-line" />
            <div className="h-2.5 w-2/3 rounded bg-line" />
            <div className="h-2.5 w-1/2 rounded bg-line" />
          </div>
        </div>
      </div>
    </Card>
  )
}

const LEADS: [string, string, string, string][] = [
  ['Dana Whitfield', 'Ceramic tint, full vehicle', 'New', 'bg-accent/20 text-accent-light'],
  ['Marcus Webb', 'Quote for storefront film', 'New', 'bg-accent/20 text-accent-light'],
  ['Priya Raman', 'Two cars, asked about timing', 'Replied', 'bg-white/[0.07] text-muted'],
  ['Tom Alderman', 'Vinyl wrap, colour samples', 'Won', 'bg-sand/20 text-sand'],
]

export function LeadsPanel({ className = '' }: { className?: string }) {
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader title="Your enquiries" badge="4 new" />
      <div className="divide-y divide-line">
        {LEADS.map(([name, note, status, chip]) => (
          <div key={name} className="flex items-center justify-between gap-4 px-5 py-4">
            <div className="min-w-0">
              <p className="truncate text-[15px] font-medium">{name}</p>
              <p className="mt-0.5 truncate text-[13.5px] text-muted">{note}</p>
            </div>
            <span className={`shrink-0 rounded-md px-2.5 py-1 text-[12.5px] font-medium ${chip}`}>
              {status}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}
