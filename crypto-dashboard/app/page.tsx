import Header from "@/components/Header";
import { getTopCoins } from "@/lib/api";
import { formatCurrency, formatLargeNumber } from "@/lib/format";

export default async function Home() {
  const coins = await getTopCoins();

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Header />

      <section className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-xl font-semibold mb-6">Market Overview</h2>

        <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/40">
          <table className="w-full text-sm">
            <thead className="bg-neutral-900 text-neutral-400">
              <tr>
                <th className="px-4 py-3 text-left">Coin</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">24h</th>
                <th className="px-4 py-3 text-left">Market Cap</th>
              </tr>
            </thead>

            <tbody>
              {coins.map((coin: any) => (
                <tr
                  key={coin.id}
                  className="border-t border-neutral-800 transition hover:bg-neutral-900"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="h-8 w-8"
                      />

                      <div>
                        <p className="font-medium text-white">{coin.name}</p>
                        <p className="text-xs uppercase text-neutral-400">
                          {coin.symbol}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    {formatCurrency(coin.current_price)}
                  </td>

                  <td
                    className={`px-4 py-4 font-medium ${
                      coin.price_change_percentage_24h >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>

                  <td className="px-4 py-4 text-neutral-300">
                    {formatLargeNumber(coin.market_cap)}
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
