import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';

export default function Home({
	children,
}: {
	children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main id="skip">{children}</main>
      <Footer />
    </>
  );
}
