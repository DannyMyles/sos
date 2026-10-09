import SettingsView from '@/components/admin-kit/SettingsView'

const PAGES = [
  { key: 'adventures', label: 'Adventures', highlight: true, image: true },
  { key: 'events', label: 'Events', highlight: true, image: true },
  { key: 'calendar', label: 'Calendar', highlight: true, image: true },
  { key: 'activities', label: 'Activities & classes', highlight: true, image: true },
  { key: 'corporate', label: 'Corporate', highlight: true, image: true },
  { key: 'gallery', label: 'Gallery', highlight: true, image: true },
  { key: 'about', label: 'About', highlight: true, image: true },
  { key: 'contact', label: 'Contact', highlight: true, image: true },
]

export default function SettingsPage() {
  return <SettingsView showCorporate pages={PAGES} />
}
