'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CatalogoPage() {
  const router = useRouter();

  useEffect(() => {
    try {
      const savedCatalog = localStorage.getItem('lastViewedCatalog');
      
      if (savedCatalog) {
        const parsedCatalog = JSON.parse(savedCatalog);
        // Redirigimos al catálogo específico usando el storeId guardado
        router.push(`/catalogo/${parsedCatalog.storeId}`);
      } else {
        // Si no hay catálogo guardado, redirigimos a tiendas
        router.push('/tiendas');
      }
    } catch (error) {
      console.error('Error al cargar el último catálogo:', error);
      router.push('/tiendas');
    }
  }, []);

  // Mostramos un loading mientras se realiza la redirección
  return <div className="flex items-center justify-center h-screen">Redirigiendo...</div>;
}

