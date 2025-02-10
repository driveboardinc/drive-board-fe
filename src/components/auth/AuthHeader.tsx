'use client';
import companyLogo from '@/assets/images/logo.png';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import Image from 'next/image';
import React from 'react';
import { usePathname } from 'next/navigation';

export default function AuthHeader() {
  const pathname = usePathname();
  const isSignInPage = pathname?.includes('/signin');

  return (
    <div className="relative flex items-center gap-2 justify-between">
      <Image
        src={companyLogo}
        alt="Company logo"
        width={800}
        height={600}
        className="object-contain w-24 sm:w-32 hover:scale-105 transition-transform"
        priority
      />
      <Button variant="outline" size="sm" asChild>
        <Link
          href={isSignInPage ? '/signup/carrier' : '/signin/carrier'}
          className="font-medium"
        >
          {isSignInPage ? 'Sign Up' : 'Sign In'}
        </Link>
      </Button>
    </div>
  );
}
