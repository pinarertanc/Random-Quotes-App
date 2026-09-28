import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr"; // Veya kullandığın import yolu

export default function QuoteSuccessPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md p-8 rounded-3xl border bg-white/10 dark:bg-black/20 border-white/20 dark:border-white/10 shadow-2xl backdrop-blur-md text-center space-y-6">
        
        {/* Yeşil İkon Kutusu */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <CheckCircleIcon 
            size={36} 
            weight="fill" 
            className="text-emerald-600 dark:text-emerald-400" 
          />
        </div>

        {/* Başlık ve Açıklama */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Alıntınız Başarıyla Eklendi!
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Yeni alıntınız sistemimize kaydedildi ve ana sayfada yerini aldı.
          </p>
        </div>

        {/* Aksiyon Butonları */}
        <div className="flex flex-col gap-3 pt-2">
          <Link href="/" className="w-full">
            <Button className="w-full rounded-xl py-6 font-medium shadow-lg transition-all">
              Ana Sayfaya Dön
            </Button>
          </Link>
          
          <Link href="/quotes/new" className="w-full">
            <Button 
              variant="outline" 
              className="w-full rounded-xl py-6 font-medium border-border/50 bg-background/50 hover:bg-background/80 transition-all"
            >
              Yeni Bir Alıntı Ekle
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}