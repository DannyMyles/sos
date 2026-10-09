# Source of Adventure

Marketing + booking site for Source of Adventure (Next.js 16, Tailwind v4).

Adventures, availability and bookings come from the shared backend in
`../marksila_api` (MariaDB), which also serves the Fitness site. SOS data
is kept completely separate there by its app key, `sos`.

```bash
cp .env.example .env.local   # BACKEND_URL, NEXT_PUBLIC_APP_KEY=sos (NEXT_PUBLIC_WHATSAPP is only a fallback)
npm install
npm run dev                  # http://localhost:3001 (port pinned in package.json)
```

Business details (phone, email, WhatsApp, hours, social links), the homepage hero,
steps, About/team, values, FAQs, banners, outdoor activities and aerobics classes all
come from the database and are edited in the admin. `lib/site.ts` loads the business
details server-side (cached for a minute); client components read them via `useSite()`.

## How booking works

1. A visitor picks an adventure (Home, **Adventures** or **Calendar**).
2. One short form: name, phone, number of people (optional note).
3. The booking is saved (holding the spots), and WhatsApp opens with the booking
   summary — they tap Send and the team confirms the spot and payment in that chat.

Adventures (trips) and events (fun runs, workshops, meet-ups) are the same kind of
bookable date; the **Type** field in Admin → Adventures & events decides whether it
is listed on `/adventures` or `/events` (both show in `/calendar`). `/corporate`
lists services whose audience is "corporate", with package selection, a corporate
booking form and a custom quote request.

No account, no online payment. Activities and classes (`/activities`, `/aerobics`) use
the same short form and are saved as enquiries. The contact form is saved as an
enquiry too, so nothing depends on email arriving. Every form sends a request id, so
a retried submit never creates a duplicate.

### Emails

When the API has SMTP configured, customers who give an email get a branded
confirmation (bookings include a QR code for check-in), and the team gets an alert.
Status changes (confirmed / completed / cancelled), quotes and reminders email the
customer. Every send is logged — see **Admin → Email log** — and failures never block
a booking.

## Where things live

| | |
|---|---|
| Backend calls, types | `lib/api.ts` (browser → same-origin `/api`, `proxy.ts` adds `X-App-Key: sos`) |
| Contact details / WhatsApp link | `lib/contact.ts` |
| Booking modal | `components/booking/BookingModal.tsx` |
| Adventure list + filters | `components/adventures/` |
| Calendar | `components/ui/Calendar.tsx`, `components/calendar/CalendarView.tsx` |

## Admin (`/admin`)

Sign in at `/admin/login` with an SOS admin account. Set or reset one in the backend:
`ADMIN_PASSWORD='…' npm run app -- set-password --key sos --email you@example.com`.

* **Dashboard** — bookings and enquiries by status, recent activity, capacity of upcoming dates, email health.
* **Bookings** — search, filter by status/event, paginate; confirm / complete / cancel (the customer is
  emailed), send reminders or resend emails. Cancelling frees the spots.
* **Enquiries** — contact messages and activity/class requests; status, quote amount, internal notes,
  optional email to the customer.
* **Activities & classes** — services with category, schedule, level, price or "on request", packages.
* **Website content** — FAQs, banners/offers (with date windows) and testimonials.
* **Settings** — contact details, WhatsApp number, hero and About copy, team, steps, email branding, test email.
* **Email log** — what was sent, failed or not sent.
* **Adventures** — add, edit, hide or delete adventures: photo (upload or URL), date,
  location, price per person (`0` shows "Price on request"), spots, category, level.

The admin session is an httpOnly cookie read only by this site's `/admin-api/*` route
handlers, which call the shared API as the `sos` app — Fitness admins can't sign in here.
