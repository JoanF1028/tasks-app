import { SignUp } from '@clerk/nextjs'
import { AuthLayout } from '@/components/auth/AuthLayout'

export default function Page() {
  return (
    <AuthLayout
      title="Join TaskFlow!"
      subtitle="Create your account and start organizing your tasks efficiently"
    >
      <SignUp 
        signInUrl="/sign-in"
      />
    </AuthLayout>
  )
}