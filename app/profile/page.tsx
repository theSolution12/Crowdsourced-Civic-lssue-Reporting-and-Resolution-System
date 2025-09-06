import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { UserProfile } from '@/components/UserProfile'
import LiquidGlassDemo from '@/demo/liquidglass-demo'

export default async function ProfilePage() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <LiquidGlassDemo />
      <div className="mb-8 mt-20">
        <h1 className="text-3xl font-bold">User Profile</h1>
        <p className="text-muted-foreground mt-2">
          View and manage your account information and database sync status.
        </p>
      </div>
      
      <UserProfile />
    </div>
  )
}

export const metadata = {
  title: 'Profile | Civic Issue Reporting',
  description: 'View and manage your account information',
}
