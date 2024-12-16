"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HeaderCatalogo } from "@/app/catalogo/components/header-catalogo";
import { CategoryCard } from "@/app/components/category-card";
import { NewProductsSheet } from "../components/new-products-sheet";
import { SearchSheet } from "../components/search-sheet";
import { PromotionsSheet } from "../components/promotions-sheet";
import { CategorySheet } from "../components/category-sheet";
import { getStoreById, type Store } from "@/app/lib/db";
import { SearchProvider } from '@/app/context/search-context'
import { supabase } from '@/app/lib/supabase'
import { useAuth } from '@/app/providers/auth-provider'
import { toast } from "react-hot-toast"
import { LoadingSpinner } from '@/app/components/loading'

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
      <div>
        <div className="sticky top-0 z-10 bg-white/70 backdrop-blur-md">
          <HeaderCatalogo title={store.name} />
        </div>

        {/* Banner publicitario */}
        <div className="px-4 mx-auto max-w-5xl">
          <img
            src={store.banner_image || ''}
            alt="Banner publicitario"
            className="w-full h-[48vw] md:h-60 object-cover rounded-lg mb-6"
          />

          {/* Iconos de categorías */}
          <div className="grid grid-cols-3 gap-3 mb-6 px-1">
            <NewProductsSheet />
            <SearchSheet variant="card" />
            <PromotionsSheet />
          </div>
        </div>
        
        {/* Categorías */}
        <div className="max-w-3xl mx-auto pb-20">
          {store.categories?.map((category) => (
            <CategorySheet
              key={category.id}
              id={category.id}
              name={category.name}
              description={category.description || ''}
              subdescription={category.subdescription || ''}
              imageUrl={category.image_url || ''}
            />
          ))}
        </div>
      </div>
    </SearchProvider>
  );
}
