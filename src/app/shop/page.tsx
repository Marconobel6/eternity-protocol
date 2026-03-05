import { supabase } from '@/lib/supabase'

export const revalidate = 60

export default async function ShopPage() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('in_stock', true)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2">Shop</h1>
      <p className="text-gray-500 mb-10">Research-grade products for longevity and metabolic health.</p>

      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(p => (
            <div key={p.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
              {p.images?.[0] && (
                <div className="aspect-square bg-gray-50">
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-5">
                <h3 className="font-semibold text-navy mb-1">{p.name}</h3>
                {p.description && <p className="text-sm text-gray-500 mb-3 line-clamp-2">{p.description}</p>}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-navy">{p.currency === 'EUR' ? '€' : '$'}{(p.price_cents / 100).toFixed(2)}</span>
                  <button className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <div className="text-4xl mb-4">🧪</div>
          <h3 className="text-lg font-semibold text-navy mb-2">Shop launching soon</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto">We are preparing a curated selection of research-grade products. Join our newsletter to get notified when we launch.</p>
        </div>
      )}
    </div>
  )
}
