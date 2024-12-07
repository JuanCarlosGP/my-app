"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "../../components/header";
import { StoreCard } from "@/app/components/store-card";
import { PlusCircle, ThumbsUp, Tag } from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string;
  subdescription: string;
  imageUrl: string;
}

interface Catalog {
  storeId: string;
  storeName: string;
  bannerImage: string;
  categories: Category[];
}

export default function CatalogoPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [catalog, setCatalog] = useState<Catalog | null>(null);


  useEffect(() => {
    // Simulación de datos de la tienda
    const catalogData: Catalog = {
      storeId: params.id,
      storeName: `Tienda ${params.id}`,
      bannerImage: "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg",
      categories: [
        {
          id: "1",
          name: "Cepillos",
          description: "Importados de China",
          subdescription: "Cepillos ergonómicos y de alta calidad para diversas superficies",
          imageUrl: "https://cataas.com/cat?width=300&height=200&random=1",
        },
        {
          id: "2",
          name: "Bayetas",
          description: "Importadas de Italia",
          subdescription: "Bayetas de microfibra muy resistentes y absorbentes",
          imageUrl: "https://cataas.com/cat?width=300&height=200&random=2",
        },
        {
          id: "3",
          name: "Caja de Herramientas",
          description: "Fabricada en acero duradero",
          subdescription: "Caja completa con herramientas esenciales para tus proyectos",
          imageUrl: "https://cataas.com/cat?width=300&height=200&random=3",
        },
        {
          id: "4",
          name: "Perchitas",
          description: "Enganches para pared",
          subdescription: "Perchas adhesivas ideales para colgar objetos sin dañar la pared",
          imageUrl: "https://cataas.com/cat?width=300&height=200&random=4",
        },
        {
          id: "5",
          name: "Perchas de Ropa",
          description: "Paquete de 10 unidades",
          subdescription: "Perchas antideslizantes para mantener tu ropa organizada",
          imageUrl: "https://cataas.com/cat?width=300&height=200&random=5",
        },
      ],      
    };

    setCatalog(catalogData);
    localStorage.setItem("lastViewedCatalog", JSON.stringify(catalogData));
  }, [params.id]);

  if (!catalog) {
    return <div className="text-center py-20">Cargando...</div>;
  }

  return (
    <div>
      <div className="sticky top-0 z-10 bg-white/70 backdrop-blur-md">
        <Header title={`Catálogo de ${catalog.storeName}`} />
      </div>

      {/* Banner publicitario */}
      <div className="px-4 mx-auto max-w-5xl">
        <img
          src={catalog.bannerImage}
          alt="Banner publicitario"
          className="w-full h-[48vw] md:h-60 object-cover rounded-lg mb-6"
        />

        {/* Iconos de categorías */}
        <div className="grid grid-cols-3 gap-4 mb-6 px-4">
          <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm">
            <div className="p-2.5 bg-gray-100 rounded-full mb-2">
              <PlusCircle className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-gray-700">Nuevo</span>
          </div>
          
          <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm">
            <div className="p-2.5 bg-gray-100 rounded-full mb-2">
              <ThumbsUp className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-xs font-medium text-gray-700">Recomendado</span>
          </div>
          
          <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm">
            <div className="p-2.5 bg-gray-100 rounded-full mb-2">
              <Tag className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-xs font-medium text-gray-700">Promoción</span>
          </div>
        </div>
      </div>

      {/* Categorías */}
      <div className="max-w-3xl mx-auto pb-20">
        {catalog.categories.map((category) => (
          <StoreCard
            key={category.id}
            id={category.id}
            name={category.name}
            description={category.description}
            subdescription={category.subdescription}
            imageUrl={category.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
