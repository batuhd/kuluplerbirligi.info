"use client";

import { Loader2, Save, Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function SubmitButton({ label = "Kaydet" }: { label?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Save className="h-4 w-4" />
      )}
      {pending ? "Kaydediliyor..." : label}
    </button>
  );
}

export function DeleteButton({
  action,
  id,
  label = "Sil",
  extraFields,
}: {
  action: (formData: FormData) => void | Promise<void>;
  id: string;
  label?: string;
  extraFields?: Record<string, string>;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!confirm("Bu kaydı silmek istediğinize emin misiniz?")) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      {extraFields &&
        Object.entries(extraFields).map(([name, value]) => (
          <input key={name} type="hidden" name={name} value={value} />
        ))}
      <button
        type="submit"
        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
      >
        <Trash2 className="h-4 w-4" />
        {label}
      </button>
    </form>
  );
}
