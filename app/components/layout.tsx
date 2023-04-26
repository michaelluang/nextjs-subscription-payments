import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';

export default function Home({
	children,
}: {
	children: React.ReactNode;
}) {
  return (
    <div className="bg-black w-full h-full overflow-scroll">
      <Navbar />
      <main id="skip">{children}</main>
      <Footer />
    </div>
  );
}
