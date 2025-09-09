import { SignIn } from '@clerk/nextjs'
import { AuthLayout } from '@/components/auth/AuthLayout'

export default function Page() {
  return (
    <AuthLayout
      title="Welcome back!"
      subtitle="Sign in to your account to continue managing your tasks"
    >
      <SignIn 
        signUpUrl="/sign-up"
      />
    </AuthLayout>
  )
}