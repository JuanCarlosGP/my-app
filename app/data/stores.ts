export interface Product {
    id: string
    name: string
    price: number
    unitsPerBox: number
    imageUrl: string
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
      name: "Bazar Oriental",
      description: "Tu tienda de productos asiáticos de confianza",
      subdescription: "Importados directamente desde Asia para tu hogar.",
      imageUrl: "https://cataas.com/cat?width=300&height=200&random=17",
      bannerImage: "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg",
      categories: [
        {
          id: "cat-1-1",
          name: "Utensilios de Cocina",
          description: "Importados de China",
          subdescription: "Calidad premium para tu cocina",
          imageUrl: "https://cataas.com/cat?width=300&height=200&random=1",
          products: [
            {
              id: "prod-1-1-1",
              name: "Set de utensilios básicos",
              price: 19.99,
              unitsPerBox: 12,
              imageUrl: "https://cataas.com/cat?width=200&height=200&random=1"
            },
            {
              id: "prod-1-1-2",
              name: "Wok tradicional",
              price: 29.99,
              unitsPerBox: 6,
              imageUrl: "https://cataas.com/cat?width=200&height=200&random=2"
            }
          ]
        },
        {
          id: "cat-1-2",
          name: "Productos de Limpieza",
          description: "Calidad japonesa",
          subdescription: "Lo mejor para tu hogar",
          imageUrl: "https://cataas.com/cat?width=300&height=200&random=2",
          products: [
            {
              id: "prod-1-2-1",
              name: "Pack de bayetas premium",
              price: 9.99,
              unitsPerBox: 24,
              imageUrl: "https://cataas.com/cat?width=200&height=200&random=3"
            },
            {
              id: "prod-1-2-2",
              name: "Escoba multisuperficie",
              price: 15.99,
              unitsPerBox: 12,
              imageUrl: "https://cataas.com/cat?width=200&height=200&random=4"
            }
          ]
        }
      ]
    }
  ]
  
  export const getStoreById = (storeId: string) => {
    return stores.find(store => store.id === storeId)
  }
  
  export const getCategoryProducts = (storeId: string, categoryId: string) => {
    const store = getStoreById(storeId)
    return store?.categories.find(cat => cat.id === categoryId)?.products || []
  }
  
  export function getAllProducts(storeId: string): Product[] {
    const store = getStoreById(storeId);
    if (!store) return [];
    
    // Obtener todos los productos de todas las categorías
    return store.categories.reduce((allProducts: Product[], category) => {
      const categoryProducts = getCategoryProducts(storeId, category.id);
      return [...allProducts, ...categoryProducts];
    }, []);
  }
  