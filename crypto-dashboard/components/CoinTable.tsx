"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";
import { formatCurrency, formatLargeNumber } from "@/lib/format";

export default function CoinTable({ coins }: { coins: any[] }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const filtered = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(query.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(query.toLowerCase()),
  );

  function handleRowClick(id: string) {
    router.push(`/coin/${id}`);
  }

  function handleRowKeyDown(
    event: React.KeyboardEvent<HTMLTableRowElement>,
    id: string,
  ) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      router.push(`/coin/${id}`);
    }
  }

  return (
    <div>
      <div className="mb-6">
        <SearchBar onSearch={setQuery} />
      </div>

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
            {filtered.length > 0 ? (
              filtered.map((coin) => (
                <tr
                  key={coin.id}
                  tabIndex={0}
                  role="button"
                  onClick={() => handleRowClick(coin.id)}
                  onKeyDown={(event) => handleRowKeyDown(event, coin.id)}
                  className="cursor-pointer border-t border-neutral-800 transition hover:bg-neutral-900 focus:outline-none focus:bg-neutral-900"
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
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-10 text-center text-neutral-400"
                >
                  <p className="mb-1 text-base text-white">No coins found</p>
                  <p className="text-sm text-neutral-400">
                    Try a different name or symbol.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
