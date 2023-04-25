import './styles/main.css';
import './styles/chrome-bug.css';
import { MyUserContextProvider } from '@/utils/useUser';

export const metadata = {
	title: 'Teabot',
	robots: {
		index: true,
		follow: true,
	},
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
	themeColor: "#fafafa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
			<MyUserContextProvider>
				<body>{children}</body>
			</MyUserContextProvider>
    </html>
  );
}
