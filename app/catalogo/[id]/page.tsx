"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  image: string;
}

interface Catalog {
  storeId: string;
  storeName: string;
  products: Product[];
}

export default function CatalogoPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [catalog, setCatalog] = useState<Catalog | null>(null);

  useEffect(() => {
    // Simulamos obtener datos de la tienda
    const catalogData: Catalog = {
      storeId: params.id,
      storeName: `Tienda ${params.id}`,
      products: [
        { id: 1, name: 'Producto 1', image: '/placeholder.svg' },
        { id: 2, name: 'Producto 2', image: '/placeholder.svg' },
        // Aquí irían tus productos reales
      ]
    };
    
    // Guardamos en el estado y en localStorage
    setCatalog(catalogData);
    localStorage.setItem('lastViewedCatalog', JSON.stringify(catalogData));
  }, [params.id]);

  if (!catalog) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold">Catálogo de {catalog.storeName}</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {catalog.products.map((product) => (
          <div key={product.id} className="border rounded p-2">
            <p className="mt-2 text-center">{product.name}</p>
          </div>
        ))}
      </div>
      <Button onClick={() => router.back()} className="mt-4">
        Volver
      </Button>
    </div>
  );
}
