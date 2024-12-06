import { StoreCard } from "@/app/components/store-card"

export default function StoresPage() {
  const stores = [
    {
      name: "NEWKYLIE LTDA",
      phone: "+56 999999816",
      description: "提供一站式采购 化妆品，护肤品，指甲油，化妆工具等 地址位于GRAJALES 3053",
      imageUrl: "/stores/newkylie.jpg"
    },
    {
      name: "Shopping Hogar Spa",
      phone: "988558855/微信luna966556655",
      description: "地址：COMFERENCIA 430 SANTIAGO 仓库地址: Santa Bernardita 12005 Bodega F28-F31 Comuna San Bernardo",
      imageUrl: "/stores/shopping-hogar.jpg"
    },
    {
      name: "Beauty Store",
      phone: "+56 912345678",
      description: "Tu tienda de belleza y cosmética preferida. Productos importados de las mejores marcas.",
      imageUrl: "/stores/beauty-store.jpg"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Tiendas</h1>
      <div className="max-w-3xl mx-auto">
        {stores.map((store, index) => (
          <StoreCard
            key={index}
            name={store.name}
            phone={store.phone}
            description={store.description}
            imageUrl={store.imageUrl}
          />
        ))}
      </div>
    </div>
  )
} 