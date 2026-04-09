import Header from "@/components/Header";
import { getTopCoins } from "@/lib/api";

export default async function Home() {
  const coins = await getTopCoins();

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Header />

      <section className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-xl font-semibold mb-6">Market Overview</h2>

        <div className="border border-neutral-800 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-900 text-neutral-400">
              <tr>
                <th className="text-left px-4 py-3">Coin</th>
                <th className="text-left px-4 py-3">Price</th>
                <th className="text-left px-4 py-3">24h</th>
              </tr>
            </thead>

            <tbody>
              {coins.map((coin: any) => (
                <tr
                  key={coin.id}
                  className="border-t border-neutral-800 hover:bg-neutral-900 transition"
                >
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                    <span>{coin.name}</span>
                  </td>

                  <td className="px-4 py-3">${coin.current_price}</td>

                  <td
                    className={`px-4 py-3 ${
                      coin.price_change_percentage_24h > 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
