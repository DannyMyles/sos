import { ChevronDown } from 'lucide-react'
import type { Faq } from '@/lib/api'

/** FAQ accordion (native <details>, so it works without JavaScript and is keyboard accessible). */
export default function FaqList({ faqs }: { faqs: Faq[] }) {
  if (faqs.length === 0) return null
  return (
    <div className="divide-y divide-stone-100 overflow-hidden rounded-3xl border border-stone-100 bg-white">
      {faqs.map((f) => (
        <details key={f.id} className="group p-5 open:bg-accent-50/40 sm:p-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-stone-900 [&::-webkit-details-marker]:hidden">
            {f.question}
            <ChevronDown className="h-5 w-5 shrink-0 text-accent-500 transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-3 whitespace-pre-line text-stone-600">{f.answer}</p>
        </details>
      ))}
    </div>
  )
}
