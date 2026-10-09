import BookingsView from '@/components/admin-kit/BookingsView'

type Props = { searchParams: Promise<{ q?: string; status?: string }> }

export default async function BookingsPage({ searchParams }: Props) {
  const { q, status } = await searchParams
  return <BookingsView initialQuery={q ?? ''} initialStatus={status} />
}
