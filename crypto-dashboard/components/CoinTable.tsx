"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";
import { formatCurrency, formatLargeNumber } from "@/lib/format";

export default function CoinTable({ coins }: { coins: any[] }) {
  const [query, setQuery] = useState("");

  const filtered = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(query.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(query.toLowerCase()),
  );

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
            {filtered.map((coin) => (
              <tr
                key={coin.id}
                className="border-t border-neutral-800 hover:bg-neutral-900 transition"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <img src={coin.image} className="w-8 h-8" />
                    <div>
                      <p className="text-white font-medium">{coin.name}</p>
                      <p className="text-xs text-neutral-400 uppercase">
                        {coin.symbol}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4">
                  {formatCurrency(coin.current_price)}
                </td>

                <td
                  className={`px-4 py-4 ${
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
    </div>
  );
}
