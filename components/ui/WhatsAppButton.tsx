'use client'

import WhatsAppWidget from '@/components/site/WhatsAppWidget'
import { useSite } from '@/components/site/SiteProvider'

/** Floating WhatsApp chat on every public page (not the admin area). */
export default function WhatsAppButton() {
  const { name } = useSite()
  return (
    <WhatsAppWidget
      greeting="Hey! 👋 Planning an adventure? Pick a topic and we’ll pick it up on WhatsApp."
      options={[
        { label: 'Book an adventure', message: `Hi ${name}! I'd like to book an adventure. Which dates are coming up?` },
        { label: 'Join an event', message: `Hi ${name}! Which events are coming up?` },
        { label: 'Corporate / team outing', message: `Hi ${name}! I'd like a quote for a corporate or team outing. Company: , group size: , preferred date: ` },
        { label: 'Join a fitness class', message: `Hi ${name}! I'd like to join one of your outdoor fitness classes.` },
        { label: 'Something else', message: `Hi ${name}! I have a question.` },
      ]}
    />
  )
}
