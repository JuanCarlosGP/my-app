"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HeaderCatalogo } from "@/app/catalogo/components/header-catalogo";
import { NewProductsSheet } from "../components/new-products-sheet";
import { SearchSheet } from "../components/search-sheet";
import { PromotionsSheet } from "../components/promotions-sheet";
import { CategorySheet } from "../components/category-sheet";
import { getStoreById, type Store } from "@/app/lib/db";
import { SearchProvider } from '@/app/context/search-context';
import { supabase } from '@/app/lib/supabase';
import { useAuth } from '@/app/providers/auth-provider';
import { LoadingSpinner } from '@/app/components/loading';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CatalogoPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { session } = useAuth();
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAccess() {
      if (!session?.user?.id) {
        router.push('/login')
        return
      }

      try {
        // Verificar si el usuario tiene acceso a la tienda
        const { data: access, error: accessError } = await supabase
          .from('profile_stores')
          .select('store_id')
          .eq('profile_id', session.user.id)
          .eq('store_id', params.id)
          .single()

        if (accessError || !access) {
          router.push('/')
          return
        }

        // Si tiene acceso, cargar los datos de la tienda
        const storeData = await getStoreById(params.id)
        if (storeData) {
          setStore(storeData)
        } else {
          router.push('/')
        }
      } catch (error) {
        console.error('Error loading store:', error)
        router.push('/')
      } finally {
        setLoading(false)
      }
    }

    checkAccess()
  }, [params.id, router, session?.user?.id])

  if (loading) return <LoadingSpinner />
  if (!store) return null

  return (
    <SearchProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="sticky top-0 z-10 bg-white/70 backdrop-blur-xl border-b border-gray-200/50">
          <HeaderCatalogo title={store.name} />
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Banner */}
          <div className="p-4">
            <div className="relative rounded-lg overflow-hidden border border-gray-200/50">
              <img
                src={store.banner_image || ''}
                alt="Banner publicitario"
                className="w-full h-[48vw] md:h-60 object-cover"
              />
            </div>
          </div>

          <div className="space-y-6 px-4 pb-20">
            {/* Accesos rápidos */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-3 divide-x divide-gray-100">
                  <NewProductsSheet />
                  <SearchSheet variant="card" />
                  <PromotionsSheet />
                </div>
              </CardContent>
            </Card>

            {/* Categorías */}
            <Card>
              <CardContent className="p-0">
                <div className="py-2">
                  {store.categories?.map((category, index) => (
                    <div key={category.id}>
                      <CategorySheet
                        id={category.id}
                        name={category.name}
                        description={category.description || ''}
                        subdescription={category.subdescription || ''}
                        imageUrl={category.image_url || ''}
                      />
                      {index < (store.categories?.length ?? 0) - 1 && <Separator className="my-2" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SearchProvider>
  );
}
