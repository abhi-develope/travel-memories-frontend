"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { UploadCloud, CheckCircle2, ImagePlus, X } from "lucide-react";
import { createMemory } from "@/lib/api";
import type { MemoryCategory } from "@/types/memory";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function UploadForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState<MemoryCategory>("her");
  const [accessCode, setAccessCode] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [progress, setProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (selected: File | null) => {
    setFile(selected);
    setError(null);
    if (selected) {
      setPreview(URL.createObjectURL(selected));
    } else {
      setPreview(null);
    }
  };

  const resetForm = () => {
    setTitle("");
    setCaption("");
    setLocation("");
    setDate("");
    setCategory("her");
    handleFile(null);
    setProgress(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Give this memory a title.");
      return;
    }
    if (!file) {
      setError("Pick a photo to go with it.");
      return;
    }

    setSubmitting(true);
    setProgress(0);
    try {
      await createMemory(
        { title, caption, location, date, category, image: file, accessCode: accessCode || undefined },
        (percent) => setProgress(percent)
      );
      setSuccess(true);
      resetForm();
      setTimeout(() => setSuccess(false), 3000);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-xl rounded-lg border-2 border-dashed border-kraft bg-card p-6 shadow-postcard sm:p-8"
    >
      <h2 className="font-display text-2xl italic text-ink">Add a new memory</h2>
      <p className="mt-1 text-sm text-ink-soft">
        A photo, a place, a little story — that's all it takes.
      </p>

      {/* Image dropzone */}
      <div className="mt-6">
        <Label>Photo</Label>
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const dropped = e.dataTransfer.files?.[0];
            if (dropped) handleFile(dropped);
          }}
          className="relative flex aspect-video cursor-pointer items-center justify-center overflow-hidden rounded-md border-2 border-dashed border-kraft bg-paper-dark transition-colors hover:border-ink"
        >
          {preview ? (
            <>
              <img src={preview} alt="Preview" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFile(null);
                }}
                className="absolute right-2 top-2 rounded-full bg-ink/70 p-1.5 text-paper hover:bg-ink"
                aria-label="Remove photo"
              >
                <X size={14} />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 text-ink-soft">
              <ImagePlus size={28} />
              <span className="text-sm">Click or drag a photo here</span>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0] || null)}
          />
        </div>
      </div>

      <div className="mt-5">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Sunset over the old town"
          maxLength={80}
        />
      </div>

      <div className="mt-5">
        <Label htmlFor="caption">Caption (optional)</Label>
        <Textarea
          id="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Tell the little story behind this one..."
          maxLength={500}
        />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Lisbon, Portugal"
          />
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
      </div>

      <div className="mt-5">
        <Label>This memory is from</Label>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={category === "her" ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setCategory("her")}
          >
            Other Trip 🌏
          </Button>
          <Button
            type="button"
            variant={category === "us" ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setCategory("us")}
          >
            Our Adventure ✨
          </Button>
        </div>
      </div>

      <div className="mt-5">
        <Label htmlFor="accessCode">Access code </Label>
        <Input
          id="accessCode"
          type="password"
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
          placeholder="Only needed if your backend requires one"
        />
      </div>

      {error && (
        <p className="mt-4 rounded-md bg-rose/10 px-3 py-2 text-sm text-rose">{error}</p>
      )}

      {submitting && (
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-paper-dark">
          <motion.div
            className="h-full bg-mustard"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>
      )}

      <Button type="submit" size="lg" className="mt-6 w-full rounded-full" disabled={submitting}>
        <UploadCloud size={18} />
        {submitting ? `Uploading… ${progress}%` : "Save this memory"}
      </Button>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 flex items-center gap-2 rounded-md bg-sky/10 px-3 py-2 text-sm text-ink"
          >
            <CheckCircle2 size={16} className="text-sky" />
            Saved! Head to the Memories page to see it.
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
