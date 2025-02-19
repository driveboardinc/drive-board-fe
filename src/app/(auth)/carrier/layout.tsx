'use client';
import Image from 'next/image';
import signupImage from '@/assets/images/signup.png';
import { withAuthRedirect } from '@/components/auth/hocs/withAuthRedirect';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left Column - Image */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-primary/5 to-primary/10 relative items-center justify-center">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <Image
          src={signupImage}
          alt="Carrier signup illustration"
          width={800}
          height={600}
          className="object-contain w-4/6 h-auto relative z-10 drop-shadow-xl"
          priority
        />
      </div>

      {/* Right Column - Content */}
      <div className="flex flex-col justify-between flex-1 p-4 sm:p-6 md:p-12 w-full md:w-1/2">
        {children}
      </div>
    </div>
  );
}

export default withAuthRedirect(AuthLayout);
