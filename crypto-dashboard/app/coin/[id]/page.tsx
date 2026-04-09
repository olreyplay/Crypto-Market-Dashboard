import Header from "@/components/Header";

export default async function CoinPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Header />

      <section className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-xl font-semibold">Coin Details</h2>

        <p className="text-neutral-400 mt-2">Coin id: {id}</p>
      </section>
    </main>
  );
}
