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

export default function CatalogoPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
    async function loadStore() {
      const storeData = await getStoreById(params.id);
      if (storeData) {
        setStore(storeData);
        localStorage.setItem("lastViewedCatalog", JSON.stringify({
          ...storeData,
          storeId: params.id
        }));
      } else {
        router.push('/catalogo');
      }
    }

    loadStore();
  }, [params.id, router]);

  if (!store) {
    return <div className="text-center py-20"></div>;
  }

  return (
    <SearchProvider>
      <div>
        <div className="sticky top-0 z-10 bg-white/70 backdrop-blur-md">
          <HeaderCatalogo title={`${store.name}`} />
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
