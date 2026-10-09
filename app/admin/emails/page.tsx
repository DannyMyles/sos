import EmailsView from '@/components/admin-kit/EmailsView'

type Props = { searchParams: Promise<{ status?: string }> }

export default async function EmailsPage({ searchParams }: Props) {
  const { status } = await searchParams
  return <EmailsView initialStatus={status} />
}
