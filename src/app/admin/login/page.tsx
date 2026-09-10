import Link from "next/link";
import Image from "next/image";
import { LoginForm } from "@/components/admin/login-form";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Yönetim Girişi",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-900 via-brand-900 to-brand-800 p-5">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center gap-3 text-white">
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white">
            <Image
              src="/logo-mark.png"
              alt="Kulüpler Birliği"
              width={40}
              height={40}
              className="h-9 w-9 object-contain"
            />
          </span>
          <div>
            <p className="font-semibold">Kulüpler Birliği</p>
            <p className="text-xs text-slate-400">Yönetim Paneli</p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-7 shadow-2xl">
          <h1 className="text-xl font-bold text-slate-900">Giriş Yap</h1>
          <p className="mt-1 text-sm text-slate-500">
            Yönetim paneline erişmek için hesabınızla giriş yapın.
          </p>

          {!isSupabaseConfigured && (
            <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Supabase ortam değişkenleri tanımlı değil. Lütfen{" "}
              <code className="font-mono">.env.local</code> dosyasını
              doldurun.
            </p>
          )}

          <div className="mt-6">
            <LoginForm next={next} />
          </div>

          <Link
            href="/"
            className="mt-5 inline-block text-sm text-slate-500 transition-colors hover:text-brand-600"
          >
            ← Siteye dön
          </Link>
        </div>
      </div>
    </div>
  );
}
