'use client'

import { useCallback, useEffect, useState } from 'react'
import { Calendar, EyeOff, ImagePlus, Loader2, MapPin, Pencil, Plus, Trash2, Users, X } from 'lucide-react'
import { AdminAdventure, adminApi } from '@/lib/adminApi'
import { formatDate, priceLabel } from '@/lib/api'

interface Draft {
  title: string
  description: string
  date: string
  time: string
  location: string
  kind: 'adventure' | 'event'
  category: string
  difficulty: string
  duration: string
  price: string
  maxSpots: string
  imageUrl: string
  published: boolean
}

const EMPTY: Draft = {
  title: '', description: '', date: '', time: '7:00 AM', location: '', kind: 'adventure', category: '', difficulty: '',
  duration: '', price: '0', maxSpots: '15', imageUrl: '', published: true,
}

const toDateInput = (iso: string) => new Date(iso).toLocaleDateString('en-CA', { timeZone: 'Africa/Nairobi' })

function draftFrom(a: AdminAdventure): Draft {
  return {
    title: a.title,
    description: a.description,
    date: toDateInput(a.date),
    time: a.time,
    location: a.location,
    kind: a.kind ?? 'adventure',
    category: a.category ?? '',
    difficulty: a.difficulty ?? '',
    duration: a.duration ?? '',
    price: String(a.price),
    maxSpots: String(a.maxSpots),
    imageUrl: '',
    published: a.published,
  }
}

export default function AdventuresAdmin() {
  const [items, setItems] = useState<AdminAdventure[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<AdminAdventure | 'new' | null>(null)

  const load = useCallback(() => {
    setLoading(true)
    adminApi.adventures().then(setItems).catch((e) => alert(e.message)).finally(() => setLoading(false))
  }, [])
  useEffect(load, [load])

  const remove = async (a: AdminAdventure) => {
    if (!confirm(`Delete “${a.title}”? Its bookings are deleted too.`)) return
    await adminApi.deleteAdventure(a.id).catch((e) => alert(e.message))
    load()
  }

  return (
    <div>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Adventures & events</h1>
          <p className="text-gray-500">Trips show on Adventures, events on Events; both appear in the calendar. Price 0 shows “Price on request”.</p>
        </div>
        <button onClick={() => setEditing('new')} className="btn-adventure inline-flex shrink-0 items-center gap-2 px-4">
          <Plus className="h-4 w-4" /> <span className="hidden sm:inline">New adventure / event</span><span className="sm:hidden">New</span>
        </button>
      </div>

      {loading && items.length === 0 ? (
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-accent-500" /></div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          No adventures yet — add your first one.
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a) => {
            const booked = a.maxSpots - a.spotsRemaining
            const past = new Date(a.date) < new Date(new Date().toDateString())
            return (
              <li key={a.id} className={`overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm ${past ? 'opacity-60' : ''}`}>
                <div className="relative h-36 bg-gray-100">
                  {a.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={a.image} alt="" className="h-full w-full object-cover" />
                  )}
                  <div className="absolute left-2 top-2 flex gap-1.5">
                    {!a.published && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-900/80 px-2.5 py-1 text-xs font-semibold text-white">
                        <EyeOff className="h-3 w-3" /> Hidden
                      </span>
                    )}
                    {past && <span className="rounded-full bg-gray-900/80 px-2.5 py-1 text-xs font-semibold text-white">Past</span>}
                  </div>
                </div>
                <div className="space-y-2 p-4">
                  <p className="font-bold leading-snug">
                    {a.title}{' '}
                    <span className={`ml-1 rounded-full px-2 py-0.5 align-middle text-[11px] font-semibold ${a.kind === 'event' ? 'bg-sky-100 text-sky-800' : 'bg-accent-100 text-accent-800'}`}>
                      {a.kind === 'event' ? 'Event' : 'Adventure'}
                    </span>
                  </p>
                  <p className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-500">
                    <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{formatDate(a.date)}</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{a.location}</span>
                  </p>
                  <div>
                    <div className="mb-1 flex justify-between text-xs text-gray-500">
                      <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" />{booked} / {a.maxSpots} booked</span>
                      <span>{priceLabel(a.price)}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                      <div className="h-full rounded-full bg-accent-500" style={{ width: `${Math.min(100, (booked / a.maxSpots) * 100)}%` }} />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button onClick={() => setEditing(a)} className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gray-200 py-2 text-sm font-semibold hover:bg-gray-50">
                      <Pencil className="h-4 w-4" /> Edit
                    </button>
                    <button onClick={() => remove(a)} className="rounded-xl border border-gray-200 px-3 text-gray-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600" aria-label={`Delete ${a.title}`}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}

      {editing && (
        <AdventureForm
          adventure={editing === 'new' ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null)
            load()
          }}
        />
      )}
    </div>
  )
}

function AdventureForm({ adventure, onClose, onSaved }: { adventure: AdminAdventure | null; onClose: () => void; onSaved: () => void }) {
  const [d, setD] = useState<Draft>(adventure ? draftFrom(adventure) : EMPTY)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>(adventure?.image ?? '')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const set = (k: keyof Draft) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setD((x) => ({ ...x, [k]: e.target.value }))

  const pickFile = (f: File | null) => {
    setFile(f)
    if (f) setPreview(URL.createObjectURL(f))
  }

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    const form = new FormData()
    for (const k of ['title', 'description', 'date', 'time', 'location', 'kind', 'category', 'difficulty', 'duration', 'price', 'maxSpots'] as const) {
      form.append(k, d[k].trim())
    }
    form.append('published', String(d.published))
    if (file) form.append('image', file)
    else if (d.imageUrl.trim()) form.append('imageUrl', d.imageUrl.trim())
    try {
      await adminApi.saveAdventure(adventure?.id ?? null, form)
      onSaved()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save')
      setBusy(false)
    }
  }

  const label = 'mb-1.5 block text-sm font-medium text-gray-700'

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <form
        onSubmit={save}
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-lg flex-col bg-white shadow-2xl animate-[sheet-in_200ms_ease-out]"
      >
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-lg font-bold">{adventure ? `Edit ${adventure.kind === 'event' ? 'event' : 'adventure'}` : 'New adventure or event'}</h2>
          <button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-gray-100" aria-label="Close"><X className="h-5 w-5" /></button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
          <label className="group relative flex h-40 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 hover:border-accent-300">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="flex flex-col items-center gap-1 text-sm text-gray-500"><ImagePlus className="h-6 w-6" /> Upload a photo</span>
            )}
            {preview && <span className="absolute bottom-2 right-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold">Change photo</span>}
            <input type="file" accept="image/*" className="sr-only" onChange={(e) => pickFile(e.target.files?.[0] ?? null)} />
          </label>
          {!file && (
            <input
              value={d.imageUrl}
              onChange={(e) => {
                set('imageUrl')(e)
                const v = e.target.value.trim()
                if (/^https?:\/\//.test(v)) setPreview(v)
              }}
              placeholder="…or paste an image URL (https://…)" className="field text-sm" aria-label="Image URL" />
          )}

          <div><label className={label} htmlFor="f-title">Title</label><input id="f-title" required maxLength={200} value={d.title} onChange={set('title')} className="field" /></div>
          <div><label className={label} htmlFor="f-desc">Description</label><textarea id="f-desc" required rows={3} maxLength={5000} value={d.description} onChange={set('description')} className="field" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={label} htmlFor="f-date">Date</label><input id="f-date" type="date" required value={d.date} onChange={set('date')} className="field" /></div>
            <div><label className={label} htmlFor="f-time">Start time</label><input id="f-time" required maxLength={50} value={d.time} onChange={set('time')} className="field" placeholder="7:00 AM" /></div>
          </div>
          <div><label className={label} htmlFor="f-loc">Location</label><input id="f-loc" required maxLength={300} value={d.location} onChange={set('location')} className="field" placeholder="e.g. Ngong Hills" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={label} htmlFor="f-price">Price / person (KES)</label><input id="f-price" type="number" min={0} required value={d.price} onChange={set('price')} className="field" /></div>
            <div><label className={label} htmlFor="f-spots">Spots</label><input id="f-spots" type="number" min={1} required value={d.maxSpots} onChange={set('maxSpots')} className="field" /></div>
          </div>
          <div>
            <label className={label} htmlFor="f-kind">Type</label>
            <select id="f-kind" value={d.kind} onChange={set('kind')} className="field">
              <option value="adventure">Adventure / trip — listed on Adventures</option>
              <option value="event">Event — listed on Events (fun runs, workshops, meet-ups)</option>
            </select>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div><label className={label} htmlFor="f-cat">Category</label><input id="f-cat" maxLength={60} value={d.category} onChange={set('category')} className="field" placeholder="Trekking" /></div>
            <div>
              <label className={label} htmlFor="f-diff">Level</label>
              <select id="f-diff" value={d.difficulty} onChange={set('difficulty')} className="field">
                <option value="">—</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>All Levels</option>
              </select>
            </div>
            <div><label className={label} htmlFor="f-dur">Duration</label><input id="f-dur" maxLength={60} value={d.duration} onChange={set('duration')} className="field" placeholder="1 Day" /></div>
          </div>
          <label className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
            <span className="text-sm font-medium">Visible on the website</span>
            <input type="checkbox" checked={d.published} onChange={(e) => setD((x) => ({ ...x, published: e.target.checked }))} className="h-5 w-5 accent-orange-500" />
          </label>
          {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        </div>

        <div className="flex gap-3 border-t px-5 py-4">
          <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-gray-200 py-3 font-semibold hover:bg-gray-50">Cancel</button>
          <button type="submit" disabled={busy} className="btn-adventure inline-flex flex-1 items-center justify-center gap-2 disabled:opacity-60">
            {busy && <Loader2 className="h-4 w-4 animate-spin" />} Save
          </button>
        </div>
      </form>
    </div>
  )
}
