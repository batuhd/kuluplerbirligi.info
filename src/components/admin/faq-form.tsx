import { saveFaq } from "@/lib/actions/admin";
import type { FaqItem } from "@/lib/types";
import { Checkbox, Field, TextArea } from "@/components/admin/ui";
import { SubmitButton } from "@/components/admin/buttons";

export function FaqForm({ faq }: { faq?: FaqItem }) {
  return (
    <form action={saveFaq} className="space-y-6">
      {faq && <input type="hidden" name="id" value={faq.id} />}

      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Soru (TR)"
          name="question_tr"
          defaultValue={faq?.question_tr}
          placeholder="Örn. Kulübe nasıl üye olurum?"
          required
        />
        <Field
          label="Soru (EN)"
          name="question_en"
          defaultValue={faq?.question_en}
          placeholder="e.g. How do I join a club?"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <TextArea
          label="Cevap (TR)"
          name="answer_tr"
          defaultValue={faq?.answer_tr}
          rows={5}
          placeholder="Cevap metni"
        />
        <TextArea
          label="Cevap (EN)"
          name="answer_en"
          defaultValue={faq?.answer_en}
          rows={5}
          placeholder="Answer text"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">
            Hedef Kitle
          </span>
          <select
            name="audience"
            defaultValue={faq?.audience ?? "students"}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          >
            <option value="students">Öğrenciler</option>
            <option value="clubs">Kulüpler</option>
          </select>
        </label>
        <Field
          label="Sıralama"
          name="sort_order"
          type="number"
          defaultValue={faq?.sort_order ?? 0}
        />
        <div className="flex items-end pb-2">
          <Checkbox
            label="Aktif (sitede görünür)"
            name="is_active"
            defaultChecked={faq?.is_active ?? true}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
        <SubmitButton />
      </div>
    </form>
  );
}
