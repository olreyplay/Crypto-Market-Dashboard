import Header from "@/components/Header";
import { getTopCoins } from "@/lib/api";
import CoinTable from "@/components/CoinTable";

export default async function Home() {
  const coins = await getTopCoins();

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Header />

      <section className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-xl font-semibold mb-6">Market Overview</h2>

        <CoinTable coins={coins} />
      </section>
    </main>
  );
}
