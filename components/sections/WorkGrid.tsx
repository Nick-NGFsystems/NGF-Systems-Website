import Link from 'next/link'
import Icon from '@/components/ui/Icon'
import Card from '@/components/ui/Card'
import { EYEBROW } from '@/components/ui/SectionHeading'
import type { ClientWork } from '@/lib/clients'

/** A placeholder tint per card, so the grid has rhythm without screenshots. */
const WASHES = ['from-[#1C2426]', 'from-[#24231E]', 'from-[#201F24]', 'from-[#1E2422]', 'from-[#24201E]', 'from-[#1D2124]']

/**
 * The portfolio grid, shared by the home page (three entries) and the Work
 * page (all of them). Every card links to a site that is live right now —
 * see the note at the top of lib/clients.ts.
 */
export default function WorkGrid({
  clients,
  detailed = false,
}: {
  clients: readonly ClientWork[]
  /** Work page: show the brief and the capabilities. Home: just the essentials. */
  detailed?: boolean
}) {
  return (
    <ul className={`grid gap-5 ${detailed ? 'lg:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
      {clients.map((client, index) => (
        <Card as="li" key={client.domain} interactive className="flex flex-col overflow-hidden">
          {client.image ? (
            <img
              src={client.image}
              alt={`The ${client.name} website`}
              className="aspect-[16/10] w-full border-b border-line object-cover object-top"
              loading="lazy"
            />
          ) : (
            <div
              aria-hidden
              className={`h-40 border-b border-line bg-gradient-to-br ${WASHES[index % WASHES.length]} to-[#121412]`}
            />
          )}

          <div className="flex flex-1 flex-col p-5">
            <p className={EYEBROW}>{client.industry}</p>
            <h3 className="mt-2.5 text-[17.5px] font-semibold text-white">{client.name}</h3>
            <p className="mt-1 text-[13.5px] text-muted">{client.location}</p>

            <p className="mt-4 text-[14.5px] leading-relaxed text-muted">
              {detailed ? client.brief : client.summary}
            </p>

            {detailed && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {client.modules.map((module) => (
                  <li
                    key={module}
                    className="rounded-md border border-line bg-panel px-2.5 py-1 text-[12.5px] font-medium text-muted"
                  >
                    {module}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-5 flex-1" />

            <Link
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-accent-light hover:underline underline-offset-4"
            >
              {client.domain}
              <Icon name="external" className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Card>
      ))}
    </ul>
  )
}
