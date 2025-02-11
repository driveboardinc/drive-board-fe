import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import AuthHeader from '@/components/auth/AuthHeader';

export default function CarrierSignInPage() {
  return (
    <div className="h-full  flex flex-col">
      <div>
        <AuthHeader />
      </div>
      <div className="flex-1  flex justify-center items-center">
        <div className="w-full max-w-md space-y-6 p-6 bg-background ">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Sign in</h1>
            <p className="text-muted-foreground">
              Enter your email and password to access your carrier account
            </p>
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
