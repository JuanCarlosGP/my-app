"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function CatalogoPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold">Catálogo de la tienda {params.id}</h1>
      <p>Esta es la página del catálogo de la tienda con ID: {params.id}</p>
      <Button onClick={() => router.back()}>
        Volver
      </Button>
    </div>
  );
}
