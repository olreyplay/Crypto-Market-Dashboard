export async function getTopCoins() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1",
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch coins");
  }

  return res.json();
}

export async function getCoinDetails(id: string) {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch coin details");
  }

  return res.json();
}

export async function getCoinChart(id: string) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch chart data");
  }

  const data = await res.json();

  return data.prices.map((item: any) => ({
    date: item[0],
    price: item[1],
  }));
}
