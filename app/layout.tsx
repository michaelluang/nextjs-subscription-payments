import { Analytics } from '@vercel/analytics/react';
import { getBuildConfig } from '@/config/build';
import { getServerSideConfig } from '@/config/server';
import { MyUserContextProvider } from '@/utils/useUser';
import '@/styles/main.css';
import '@/styles/chrome-bug.css';
import '@/styles/globals.scss';
import '@/styles/markdown.scss';
import '@/styles/highlight.scss';

const buildConfig = getBuildConfig();
const serverConfig = getServerSideConfig();

export const metadata = {
	title: 'Teabot',
	viewport: {
    width: 'device-width',
    initialScale: 1,
		userScalable: false,
		minimumScale: 1,
    maximumScale: 1,
  },
	robots: {
		index: true,
		follow: true,
	},
	manifest: '/site.webmanifest',
	description: "Your Personal Chat Bot.",
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon.ico",
	},
  appleWebApp: {
    title: "Teabot",
    statusBarStyle: "default",
  },
	openGraph: {
		title: "Teabot",
		description: "Your Personal Chat Bot.",
		url: "https://teabot.buzheteng.work",
		type: "website",
		images: [
			{
        url: 'https://nextjs.org/og.png',
        width: 800,
        height: 600,
      },
		],
	},
	twitter: {
		card: 'summary_large_image',
    title: 'Next.js',
    description: 'The React Framework for the Web',
    siteId: '1467726470533754880',
    creator: '@nextjs',
    creatorId: '1467726470533754880',
    images: ['https://nextjs.org/og.png'],
	},
	themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f5f5' },
    { media: '(prefers-color-scheme: dark)', color: '#151515' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
			<head>
				<meta name="version" content={buildConfig.commitId} />
				<link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;700;900&display=swap"
          rel="stylesheet"
        ></link>
				<script src="/serviceWorkerRegister.js" defer></script>
			</head>
			<MyUserContextProvider>
				<body>
					{children}
		      {serverConfig?.isVercel && <Analytics />}
				</body>
			</MyUserContextProvider>
    </html>
  );
}
