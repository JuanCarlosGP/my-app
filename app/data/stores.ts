export interface Product {
    id: string
    name: string
    price: number
    unitsPerBox: number
    unitsPerPackage: number
    reference: string
    barcode: string
    imageUrl: string
    image: string
    storeName: string
    storeId: string
    note?: string
}
  
  export interface Category {
    id: string
    name: string
    description: string
    subdescription: string
    imageUrl: string
    products: Product[]
  }
  
  export interface Store {
    id: string
    name: string
    description: string
    subdescription: string
    imageUrl: string
    bannerImage: string
    categories: Category[]
  }
  
  export const stores: Store[] = [
    {
      id: "1",
      name: "Comercial Gutierrez Productos SL",
      description: "Importación y venta al por mayor.",
      subdescription: "Artículos del hogar de calidad con los precios más competitivos.",
      imageUrl: "https://cdn.discordapp.com/attachments/1033095213255770244/1315571875258306601/Diseno_sin_titulo.jpg?ex=675936c9&is=6757e549&hm=7c951f16f9d5310a4a706ff1e8e92dc526e47ac16efc28491093ac14b270417a&",
      bannerImage: "https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg",
      categories: [
        {
          id: "cat-1-1",
          name: "Menaje",
          description: "Fabricación en China",
          subdescription: "Utensilios de cocina para tu catálogo.",
          imageUrl: "https://cataas.com/cat?width=300&height=200&random=1",
          products: [
            {
              id: "prod-1-1-1",
              name: "Tetera de cerámica japonesa",
              price: 34.99,
              unitsPerBox: 6,
              unitsPerPackage: 2,
              reference: "UTN-014",
              barcode: "8400000123469",
              imageUrl: "https://cataas.com/cat?width=200&height=200&random=30",
              image: "https://cataas.com/cat?width=200&height=200&random=30",
              storeName: "Comercial Gutierrez Productos SL",
              storeId: "1"
            }
          ]
        },
        {
          id: "cat-1-2",
          name: "Perchas",
          description: "Fabricación en Italia",
          subdescription: "Lo mejor para tu hogar",
          imageUrl: "https://cataas.com/cat?width=300&height=200&random=2",
          products: [
            {
              id: "prod-1-2-1",
              name: "Guantes de limpieza reutilizables",
              price: 7.99,
              unitsPerBox: 72,
              unitsPerPackage: 12,
              reference: "UTN-021",
              barcode: "8400000123476",
              imageUrl: "https://cataas.com/cat?width=200&height=200&random=421",
              image: "https://cataas.com/cat?width=200&height=200&random=42",
              storeName: "Comercial Gutierrez Productos SL",
              storeId: "1"
            }
          ]
        },
        {
          id: "cat-1-3",
          name: "Perchitas adh y fieltros",
          description: "Fabricación en China",
          subdescription: "Elementos decorativos únicos",
          imageUrl: "https://cataas.com/cat?width=300&height=200&random=18",
          products: [
            {
              id: "prod-1-3-1",
              name: "Cojines con motivos orientales",
              price: 29.99,
              unitsPerBox: 8,
              unitsPerPackage: 4,
              reference: "UTN-026",
              barcode: "8400000123481",
              imageUrl: "https://cataas.com/cat?width=200&height=200&random=47",
              image: "https://cataas.com/cat?width=200&height=200&random=47",
              storeName: "Comercial Gutierrez Productos SL",
              storeId: "1"
            }
          ]
        },
        {
          id: "cat-1-4",
          name: "Kit cuidados personales",
          description: "Cuidado personal y belleza",
          subdescription: "Productos para el bienestar y la salud",
          imageUrl: "https://cataas.com/cat?width=300&height=200&random=19",
          products: [
            {
              id: "prod-1-4-1",
              name: "Set de cuidado facial",
              price: 14.99,
              unitsPerBox: 8,
              unitsPerPackage: 4,
              reference: "UTN-029",
              barcode: "8400000123484",
              imageUrl: "https://cataas.com/cat?width=200&height=200&random=50",
              image: "https://cataas.com/cat?width=200&height=200&random=50",
              storeName: "Comercial Gutierrez Productos SL",
              storeId: "1"
            }
          ]
        },
        {
          id: "cat-1-5",
          name: "Fregonas, Mopas y Bayetas",
          description: "Artículos de limpieza",
          subdescription: "Fregonas, Mopas y Bayetas para la limpieza del hogar",
          imageUrl: "https://cataas.com/cat?width=300&height=200&random=19",
          products: [
            {
              id: "prod-1-5-1",
              name: "Mopa de microfibra",
              price: 9.99,
              unitsPerBox: 12,
              unitsPerPackage: 6,
              reference: "UTN-030",
              barcode: "8400000123485",
              imageUrl: "https://cataas.com/cat?width=200&height=200&random=51",
              image: "https://cataas.com/cat?width=200&height=200&random=51",
              storeName: "Comercial Gutierrez Productos SL",
              storeId: "1"
            }
          ]
        }
      ]
    },
    {
      id: "2",
      name: "Delicias Mediterráneas",
      description: "Lo mejor de la dieta mediterránea",
      subdescription: "Productos frescos y auténticos",
      imageUrl: "https://cataas.com/cat?width=300&height=200&random=22",
      bannerImage: "https://images.pexels.com/photos/1239401/pexels-photo-1239401.jpeg",
      categories: [
        {
          id: "cat-2-1",
          name: "Aceites y Vinagres",
          description: "Calidad gourmet",
          subdescription: "Perfectos para tus recetas",
          imageUrl: "https://cataas.com/cat?width=300&height=200&random=24",
          products: [
            {
              id: "prod-2-1-1",
              name: "Aceite de oliva virgen extra",
              price: 14.99,
              unitsPerBox: 6,
              unitsPerPackage: 3,
              reference: "MED-001",
              barcode: "8500000123471",
              imageUrl: "https://cataas.com/cat?width=200&height=200&random=34",
              image: "https://cataas.com/cat?width=200&height=200&random=34",
              storeName: "Delicias Mediterráneas",
              storeId: "2"
            }
          ]
        },
        {
          id: "cat-2-2",
          name: "Quesos Artesanales",
          description: "De pequeñas granjas locales",
          subdescription: "Sabores únicos",
          imageUrl: "https://cataas.com/cat?width=300&height=200&random=25",
          products: [
            {
              id: "prod-2-2-1",
              name: "Queso Manchego curado",
              price: 19.99,
              unitsPerBox: 5,
              unitsPerPackage: 2,
              reference: "MED-003",
              barcode: "8500000123473",
              imageUrl: "https://cataas.com/cat?width=200&height=200&random=36",
              image: "https://cataas.com/cat?width=200&height=200&random=36",
              storeName: "Delicias Mediterráneas",
              storeId: "2"
            }
          ]
        }
      ]
    },
    {
      id: "3",
      name: "Sabores del Norte",
      description: "Especialidades del norte de Europa",
      subdescription: "Productos exclusivos y tradicionales",
      imageUrl: "https://cataas.com/cat?width=300&height=200&random=23",
      bannerImage: "https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg",
      categories: [
        {
          id: "cat-3-1",
          name: "Lácteos",
          description: "Leche y quesos únicos",
          subdescription: "Directamente de granjas nórdicas",
          imageUrl: "https://cataas.com/cat?width=300&height=200&random=26",
          products: [
            {
              id: "prod-3-1-1",
              name: "Queso Gouda ahumado",
              price: 12.99,
              unitsPerBox: 8,
              unitsPerPackage: 4,
              reference: "NORD-001",
              barcode: "8600000123471",
              imageUrl: "https://cataas.com/cat?width=200&height=200&random=37",
              image: "https://cataas.com/cat?width=200&height=200&random=37",
              storeName: "Sabores del Norte",
              storeId: "3"
            }
          ]
        },
        {
          id: "cat-3-2",
          name: "Panadería",
          description: "Pan y dulces artesanales",
          subdescription: "Sabores auténticos",
          imageUrl: "https://cataas.com/cat?width=300&height=200&random=27",
          products: [
            {
              id: "prod-3-2-1",
              name: "Pan de centeno",
              price: 7.99,
              unitsPerBox: 10,
              unitsPerPackage: 5,
              reference: "NORD-002",
              barcode: "8600000123472",
              imageUrl: "https://cataas.com/cat?width=200&height=200&random=38",
              image: "https://cataas.com/cat?width=200&height=200&random=38",
              storeName: "Sabores del Norte",
              storeId: "3"
            }
          ]
        }
      ]
    }
  ];
  
  
  
  
  export const getStoreById = (storeId: string) => {
    return stores.find(store => store.id === storeId)
  }
  
  export const getCategoryProducts = (storeId: string, categoryId: string) => {
    const store = getStoreById(storeId)
    const products = store?.categories.find(cat => cat.id === categoryId)?.products || []
    return products
  }
  
  export function getAllProducts(storeId: string): Product[] {
    const store = getStoreById(storeId);
    if (!store) return [];
    
    return store.categories.reduce((allProducts: Product[], category) => {
      const categoryProducts = getCategoryProducts(storeId, category.id);
      return [...allProducts, ...categoryProducts];
    }, []);
  }
  