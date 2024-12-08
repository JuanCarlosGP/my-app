'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CatalogoPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedCatalog = localStorage.getItem('lastViewedCatalog');
      
      if (savedCatalog) {
        const parsedCatalog = JSON.parse(savedCatalog);
        router.push(`/catalogo/${parsedCatalog.storeId}`);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error al cargar el último catálogo:', error);
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <p className="text-gray-600 text-lg">
        Aquí se mostrarán las categorías de tus tiendas guardadas.
      </p>
      <p className="text-gray-500 mt-2">
        Guarda algunas tiendas para empezar a ver sus categorías.
      </p>
    </div>
  );
}

