import { redirect } from 'next/navigation'

// Fitness classes now live on the Activities page; keeps old links working.
export default function AerobicsRedirect() {
  redirect('/activities#classes')
}
