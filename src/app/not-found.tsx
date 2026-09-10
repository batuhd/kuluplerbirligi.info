import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <span className="text-7xl font-black text-brand-600">404</span>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">
        Sayfa bulunamadı
      </h1>
      <p className="mt-2 max-w-md text-sm text-slate-500">
        Aradığınız sayfa taşınmış veya kaldırılmış olabilir.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          <Home className="h-4 w-4" />
          Ana Sayfa
        </Link>
        <Link
          href="/kulupler"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
        >
          <Search className="h-4 w-4" />
          Kulüpleri Keşfet
        </Link>
      </div>
    </div>
  );
}
