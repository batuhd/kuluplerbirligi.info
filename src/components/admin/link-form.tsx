import { saveLink } from "@/lib/actions/admin";
import type { LinkItem, LinkSection } from "@/lib/types";
import { Checkbox, Field, TextArea } from "@/components/admin/ui";
import { SubmitButton } from "@/components/admin/buttons";
import { ICON_NAMES } from "@/components/dynamic-icon";

export function LinkForm({
  link,
  section,
}: {
  link?: LinkItem;
  section: LinkSection;
}) {
  return (
    <form action={saveLink} className="space-y-6">
      {link && <input type="hidden" name="id" value={link.id} />}
      <input type="hidden" name="section" value={section} />

      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Başlık (TR)"
          name="title_tr"
          defaultValue={link?.title_tr}
          placeholder="Örn. Kulüp Kurma Talep Formu"
          required
        />
        <Field
          label="Başlık (EN)"
          name="title_en"
          defaultValue={link?.title_en}
          placeholder="e.g. Club Formation Request Form"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <TextArea
          label="Açıklama (TR)"
          name="description_tr"
          defaultValue={link?.description_tr}
          placeholder="Kısa açıklama"
        />
        <TextArea
          label="Açıklama (EN)"
          name="description_en"
          defaultValue={link?.description_en}
          placeholder="Short description"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">
            İkon
          </span>
          <select
            name="icon"
            defaultValue={link?.icon ?? "link"}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          >
            {ICON_NAMES.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <Field
          label="Kategori (TR)"
          name="category_tr"
          defaultValue={link?.category_tr}
          placeholder="Örn. Formlar"
        />
        <Field
          label="Kategori (EN)"
          name="category_en"
          defaultValue={link?.category_en}
          placeholder="e.g. Forms"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="URL"
          name="url"
          defaultValue={link?.url}
          placeholder="https://... veya /iletisim"
          required
        />
        <Field
          label="Sıralama"
          name="sort_order"
          type="number"
          defaultValue={link?.sort_order ?? 0}
          hint="Küçük değer önce görünür"
        />
      </div>

      <div className="flex flex-wrap gap-8">
        <Checkbox
          label="Öne çıkan"
          name="is_featured"
          defaultChecked={link?.is_featured ?? false}
        />
        <Checkbox
          label="Aktif"
          name="is_active"
          defaultChecked={link?.is_active ?? true}
        />
      </div>

      <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
        <SubmitButton />
      </div>
    </form>
  );
}
