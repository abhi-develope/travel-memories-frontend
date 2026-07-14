import UploadForm from "@/components/UploadForm";

export default function UploadPage() {
  return (
    <div className="px-6 py-12">
      <div className="mx-auto mb-8 max-w-xl text-center">
        <h1 className="font-display text-4xl italic text-ink">Add to the Scrapbook</h1>
        <p className="mt-3 text-ink-soft">
          New city, new dish, new view from a train window — drop it here.
        </p>
      </div>
      <UploadForm />
    </div>
  );
}
