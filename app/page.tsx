import Layout from '@/components/layout';
import Pricing from '@/components/pricing';
import { getActiveProductsWithPrices } from '@/utils/supabase-client';

export const revalidate = 60;

export default async function App() {
  const products = await getActiveProductsWithPrices();
	return (
		<Layout>
			<Pricing products={products} />
		</Layout>
	);
}

