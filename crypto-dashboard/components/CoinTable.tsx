"use client";

import { useEffect, useMemo, useState } from "react";
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
  const [favorites, setFavorites] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("favoriteCoins");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  function toggleFavorite(id: string) {
    const updated = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];

    setFavorites(updated);
    localStorage.setItem("favoriteCoins", JSON.stringify(updated));
  }

  const filtered = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(query.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(query.toLowerCase()),
  );

  const sorted = useMemo(() => {
    const list = [...filtered];

    switch (sortBy) {
      case "price_desc":
        return list.sort((a, b) => b.current_price - a.current_price);
      case "price_asc":
        return list.sort((a, b) => a.current_price - b.current_price);
      case "change_desc":
        return list.sort(
          (a, b) =>
            b.price_change_percentage_24h - a.price_change_percentage_24h,
        );
      case "change_asc":
        return list.sort(
          (a, b) =>
            a.price_change_percentage_24h - b.price_change_percentage_24h,
        );
      default:
        return list.sort((a, b) => b.market_cap - a.market_cap);
    }
  }, [filtered, sortBy]);

  function goToCoin(id: string) {
    router.push(`/coin/${id}`);
  }

  return (
    <div>
      <div className="mb-6 flex justify-between gap-4">
        <SearchBar onSearch={setQuery} />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="border border-neutral-800 bg-neutral-900 px-4 py-2 text-white"
        >
          <option value="market_cap_desc">Market cap</option>
          <option value="price_desc">Price high</option>
          <option value="price_asc">Price low</option>
          <option value="change_desc">Gainers</option>
          <option value="change_asc">Losers</option>
        </select>
      </div>

      <div className="border border-neutral-800">
        <table className="w-full">
          <thead className="text-neutral-400">
            <tr>
              <th className="px-4 py-3 text-left">★</th>
              <th className="px-4 py-3 text-left">Coin</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">24h</th>
              <th className="px-4 py-3 text-left">Market Cap</th>
            </tr>
          </thead>

          <tbody>
            {sorted.map((coin) => (
              <tr
                key={coin.id}
                onClick={() => goToCoin(coin.id)}
                className="cursor-pointer border-t border-neutral-800 hover:bg-neutral-900"
              >
                <td className="px-4 py-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(coin.id);
                    }}
                  >
                    {favorites.includes(coin.id) ? "★" : "☆"}
                  </button>
                </td>

                <td className="px-4 py-4 flex items-center gap-3">
                  <img src={coin.image} className="w-8 h-8" />

                  <div>
                    <p>{coin.name}</p>
                    <p className="text-xs text-neutral-400">{coin.symbol}</p>
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

                <td className="px-4 py-4">
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
