import EnquiriesView from '@/components/admin-kit/EnquiriesView'

type Props = { searchParams: Promise<{ q?: string; type?: string }> }

export default async function EnquiriesPage({ searchParams }: Props) {
  const { q, type } = await searchParams
  return <EnquiriesView initialQuery={q ?? ''} initialType={type ?? ''} />
}
