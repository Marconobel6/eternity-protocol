import { supabase } from "@/lib/supabase"

export const revalidate = 60

export default async function ShopPage() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("in_stock", true)
    .order("created_at", { ascending: false })

  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-12 md:py-16">
      <h1 className="text-[36px] md:text-[48px] font-normal tracking-[-0.05em] text-[rgba(0,0,0,0.88)] mb-2">Shop</h1>
      <p className="text-[16px] text-[rgba(0,0,0,0.45)] mb-12">Research-grade products for longevity and metabolic health.</p>

      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map(p => (
            <div key={p.id} className="bg-white rounded-[20px] border border-black/[0.04] overflow-hidden hover:shadow-xl transition-all duration-500">
              {p.images?.[0] && (
                <div className="aspect-square bg-sage-bg/30">
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-[17px] font-medium text-[rgba(0,0,0,0.88)] mb-1">{p.name}</h3>
                {p.description && <p className="text-[14px] text-[rgba(0,0,0,0.45)] mb-4 line-clamp-2">{p.description}</p>}
                <div className="flex items-center justify-between">
                  <span className="text-[20px] font-medium text-forest">{p.currency === "EUR" ? "\u20AC" : "$"}{(p.price_cents / 100).toFixed(2)}</span>
                  <button className="px-5 py-2.5 bg-forest text-white text-[13px] font-medium rounded-full hover:bg-forest-light transition-colors">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-sage-bg/50 rounded-[20px]">
          <div className="text-4xl mb-4 opacity-40">🧪</div>
          <h3 className="text-[18px] font-medium text-forest mb-2">Shop launching soon</h3>
          <p className="text-[14px] text-[rgba(0,0,0,0.4)] max-w-md mx-auto">A curated selection of research-grade products. Join our newsletter to get notified.</p>
        </div>
      )}
    </div>
  )
}
