import Header from "@/components/Header";
import { getCoinDetails } from "@/lib/api";
import { formatCurrency, formatLargeNumber } from "@/lib/format";

export default async function CoinPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const coin = await getCoinDetails(id);

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Header />

      <section className="mx-auto max-w-4xl px-6 py-8">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
          <div className="mb-6 flex items-center gap-4">
            <img src={coin.image.large} alt={coin.name} className="h-16 w-16" />

            <div>
              <h2 className="text-2xl font-semibold">{coin.name}</h2>
              <p className="text-sm uppercase text-neutral-400">
                {coin.symbol}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
              <p className="mb-1 text-sm text-neutral-400">Current Price</p>
              <p className="text-lg font-semibold">
                {formatCurrency(coin.market_data.current_price.usd)}
              </p>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
              <p className="mb-1 text-sm text-neutral-400">Market Cap</p>
              <p className="text-lg font-semibold">
                {formatLargeNumber(coin.market_data.market_cap.usd)}
              </p>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
              <p className="mb-1 text-sm text-neutral-400">24h Change</p>
              <p
                className={`text-lg font-semibold ${
                  coin.market_data.price_change_percentage_24h >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {coin.market_data.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
              <p className="mb-1 text-sm text-neutral-400">24h High</p>
              <p className="text-lg font-semibold">
                {formatCurrency(coin.market_data.high_24h.usd)}
              </p>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
              <p className="mb-1 text-sm text-neutral-400">24h Low</p>
              <p className="text-lg font-semibold">
                {formatCurrency(coin.market_data.low_24h.usd)}
              </p>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
              <p className="mb-1 text-sm text-neutral-400">Total Volume</p>
              <p className="text-lg font-semibold">
                {formatLargeNumber(coin.market_data.total_volume.usd)}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-neutral-800 bg-neutral-950 p-4">
            <h3 className="mb-2 text-lg font-semibold">About</h3>
            <p className="text-sm leading-7 text-neutral-300">
              {coin.description.en
                ? coin.description.en.split(". ")[0] + "."
                : "No description available."}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
