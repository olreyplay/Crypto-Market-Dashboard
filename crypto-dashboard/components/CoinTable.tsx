"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";
import { formatCurrency, formatLargeNumber } from "@/lib/format";

type SortOption =
  | "market_cap_desc"
  | "price_desc"
  | "price_asc"
  | "change_desc"
  | "change_asc";

export default function CoinTable({ coins }: { coins: any[] }) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("market_cap_desc");
  const router = useRouter();

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(query.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(query.toLowerCase()),
  );

  const filteredAndSortedCoins = useMemo(() => {
    const sortedCoins = [...filteredCoins];

    switch (sortBy) {
      case "price_desc":
        return sortedCoins.sort((a, b) => b.current_price - a.current_price);

      case "price_asc":
        return sortedCoins.sort((a, b) => a.current_price - b.current_price);

      case "change_desc":
        return sortedCoins.sort(
          (a, b) =>
            b.price_change_percentage_24h - a.price_change_percentage_24h,
        );

      case "change_asc":
        return sortedCoins.sort(
          (a, b) =>
            a.price_change_percentage_24h - b.price_change_percentage_24h,
        );

      case "market_cap_desc":
      default:
        return sortedCoins.sort((a, b) => b.market_cap - a.market_cap);
    }
  }, [filteredCoins, sortBy]);

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
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar onSearch={setQuery} />

        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value as SortOption)}
          className="rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm text-white outline-none focus:border-neutral-600"
        >
          <option value="market_cap_desc">Market cap: High to low</option>
          <option value="price_desc">Price: High to low</option>
          <option value="price_asc">Price: Low to high</option>
          <option value="change_desc">24h change: Biggest gainers</option>
          <option value="change_asc">24h change: Biggest losers</option>
        </select>
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
            {filteredAndSortedCoins.length > 0 ? (
              filteredAndSortedCoins.map((coin) => (
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
