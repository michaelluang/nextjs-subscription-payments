"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import { useUser } from '@/utils/useUser';

import Layout from '@/components/layout';
import LoadingDots from '@/components/ui/loading-dots';
import Logo from '@/icons/logo';
import { getURL } from '@/utils/helpers';

const SignIn = () => {
  const router = useRouter();
  const {user, supabaseClient} = useUser();

  useEffect(() => {
    if (user) {
      router.replace('/account');
    }
  }, [user, router]);

  if (!user)
    return (
			<Layout>
				<div className="flex justify-center height-screen-helper">
					<div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
						<div className="flex justify-center pb-12 ">
							<Logo width="64px" height="64px" />
						</div>
						<div className="flex flex-col space-y-4">
							<Auth
								supabaseClient={supabaseClient}
								providers={[]}
								redirectTo={getURL()}
								magicLink={true}
								appearance={{
									theme: ThemeSupa,
									variables: {
										default: {
											colors: {
												brand: '#404040',
												brandAccent: '#52525b'
											}
										}
									}
								}}
								theme="dark"
							/>
						</div>
					</div>
				</div>
			</Layout>
    );

  return (
    <div className="m-6">
      <LoadingDots />
    </div>
  );
};

export default SignIn;
