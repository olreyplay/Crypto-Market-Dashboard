import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Header />

      <section className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-xl font-semibold mb-4">Market Overview</h2>

        <div className="border border-neutral-800 rounded-lg p-6 text-neutral-400">
          Data will appear here
        </div>
      </section>
    </main>
  );
}
