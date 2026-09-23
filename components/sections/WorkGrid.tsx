import Link from 'next/link'
import Icon from '@/components/ui/Icon'
import Card from '@/components/ui/Card'
import type { ClientWork } from '@/lib/clients'

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
  /** Work page: show the brief and the capabilities. Home page: just the essentials. */
  detailed?: boolean
}) {
  return (
    <ul className={`grid gap-6 ${detailed ? 'lg:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
      {clients.map((client) => (
        <Card as="li" key={client.domain} interactive className="flex flex-col overflow-hidden">
          {client.image && (
            <img
              src={client.image}
              alt={`The ${client.name} website`}
              className="aspect-[16/10] w-full border-b border-slate-200 object-cover object-top dark:border-slate-800"
              loading="lazy"
            />
          )}

          <div className="flex flex-1 flex-col p-6">
            <p className="font-body text-xs font-medium uppercase tracking-[0.1em] text-blue-600 dark:text-blue-400">
              {client.industry}
            </p>

            <h3 className="mt-2.5 font-sora text-lg font-semibold text-slate-900 dark:text-white">
              {client.name}
            </h3>

            <p className="mt-1 font-body text-sm text-slate-500 dark:text-slate-500">
              {client.location}
            </p>

            <p className="mt-4 font-body text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {detailed ? client.brief : client.summary}
            </p>

            {detailed && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {client.modules.map((module) => (
                  <li
                    key={module}
                    className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-body text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400"
                  >
                    {module}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 flex-1" />

            <Link
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400 underline-offset-4"
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
