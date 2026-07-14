import MemoryGrid from "@/components/MemoryGrid";

export default function MemoriesPage() {
  return (
    <div className="px-6 pt-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-4xl italic text-ink">Every Stamp in the Passport</h1>
        <p className="mt-3 text-ink-soft">
          All the places we've been, and everywhere you're headed next.
        </p>
      </div>
      <MemoryGrid />
    </div>
  );
}
