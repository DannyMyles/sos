# Source of Adventure

Marketing + booking site for Source of Adventure (Next.js 16, Tailwind v4).

Adventures, availability and bookings come from the shared backend in
`../mark254-commerce-api` (MariaDB), which also serves the Fitness site. SOS data
is kept completely separate there by its app key, `sos`.

```bash
cp .env.example .env.local   # BACKEND_URL, NEXT_PUBLIC_APP_KEY=sos, NEXT_PUBLIC_WHATSAPP
npm install
npm run dev -- -p 3001       # http://localhost:3001
```

## How booking works

1. A visitor picks an adventure (Home, **Adventures** or **Calendar**).
2. One short form: name, phone, number of people (optional note).
3. The booking is saved (holding the spots), and WhatsApp opens with the booking
   summary — they tap Send and the team confirms the spot and payment in that chat.

No account, no online payment. The contact form and newsletter also go to the shared API.

## Where things live

| | |
|---|---|
| Backend calls, types | `lib/api.ts` (browser → same-origin `/api`, `proxy.ts` adds `X-App-Key: sos`) |
| Contact details / WhatsApp link | `lib/contact.ts` |
| Booking modal | `components/booking/BookingModal.tsx` |
| Adventure list + filters | `components/adventures/` |
| Calendar | `components/ui/Calendar.tsx`, `components/calendar/CalendarView.tsx` |

## Admin (`/admin`)

Sign in at `/admin/login` with an SOS admin account (create or reset one in the
backend: `npm run app -- create-admin --key sos --email you@example.com`).

* **Bookings** — everything booked on the site; confirm or cancel once you've agreed
  details on WhatsApp (one tap opens a chat with the customer). Cancelling frees the spots.
* **Adventures** — add, edit, hide or delete adventures: photo (upload or URL), date,
  location, price per person (`0` shows "Price on request"), spots, category, level.

The admin session is an httpOnly cookie read only by this site's `/admin-api/*` route
handlers, which call the shared API as the `sos` app — Fitness admins can't sign in here.
