"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Logo from '@/icons/logo';
import { useUser } from '@/utils/useUser';

import s from './navbar.module.css';

const Navbar = () => {
  const router = useRouter();
  const { user, supabaseClient } = useUser();

  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex justify-between align-center flex-row py-4 md:py-6 relative">
          <div className="flex flex-1 items-center">
            <Link href="/" className={s.logo} aria-label="Logo">
              <Logo />
            </Link>
            <nav className="space-x-2 ml-6 hidden lg:block">
              <Link href="/" className={s.link}>
                Pricing
              </Link>
							<Link href="/account" className={s.link}>
                Account
              </Link>
							<Link href="/chat" className={s.link}>
                Chat
              </Link>
            </nav>
          </div>

          <div className="flex flex-1 justify-end space-x-8">
            {user ? (
              <span
                className={s.link}
                onClick={async () => {
                  await supabaseClient.auth.signOut();
                }}
              >
                Sign out
              </span>
            ) : (
              <Link href="/signin" className={s.link}>
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
