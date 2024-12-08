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
      "id": "1",
      "name": "Bazar Oriental",
      "description": "Tu tienda de productos asiáticos de confianza",
      "subdescription": "Importados directamente desde Asia para tu hogar.",
      "imageUrl": "https://cataas.com/cat?width=300&height=200&random=17",
      "bannerImage": "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg",
      "categories": [
        {
          "id": "cat-1-1",
          "name": "Utensilios de Cocina",
          "description": "Importados de China",
          "subdescription": "Calidad premium para tu cocina",
          "imageUrl": "https://cataas.com/cat?width=300&height=200&random=1",
          "products": [
            {
              "id": "prod-1-1-1",
              "name": "Set de utensilios básicos",
              "price": 19.99,
              "unitsPerBox": 12,
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=1"
            },
            {
              "id": "prod-1-1-2",
              "name": "Wok tradicional",
              "price": 29.99,
              "unitsPerBox": 6,
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=2"
            },
            {
              "id": "prod-1-1-3",
              "name": "Cuchillo de chef japonés",
              "price": 39.99,
              "unitsPerBox": 8,
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=21"
            },
            {
              "id": "prod-1-1-4",
              "name": "Tabla de cortar de bambú",
              "price": 14.99,
              "unitsPerBox": 10,
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=22"
            },
            {
              "id": "prod-1-1-5",
              "name": "Set de moldes para sushi",
              "price": 24.99,
              "unitsPerBox": 15,
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=23"
            }
          ]
        },
        {
          "id": "cat-1-2",
          "name": "Productos de Limpieza",
          "description": "Calidad japonesa",
          "subdescription": "Lo mejor para tu hogar",
          "imageUrl": "https://cataas.com/cat?width=300&height=200&random=2",
          "products": [
            {
              "id": "prod-1-2-1",
              "name": "Pack de bayetas premium",
              "price": 9.99,
              "unitsPerBox": 24,
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=3"
            },
            {
              "id": "prod-1-2-2",
              "name": "Escoba multisuperficie",
              "price": 15.99,
              "unitsPerBox": 12,
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=4"
            },
            {
              "id": "prod-1-2-3",
              "name": "Detergente ecológico",
              "price": 12.99,
              "unitsPerBox": 18,
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=24"
            },
            {
              "id": "prod-1-2-4",
              "name": "Limpiador multiusos concentrado",
              "price": 8.99,
              "unitsPerBox": 30,
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=25"
            },
            {
              "id": "prod-1-2-5",
              "name": "Cepillo para limpieza de esquinas",
              "price": 6.99,
              "unitsPerBox": 20,
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=26"
            }
          ]
        },
        {
          "id": "cat-1-3",
          "name": "Decoración",
          "description": "Estilo oriental para tu hogar",
          "subdescription": "Elementos decorativos únicos",
          "imageUrl": "https://cataas.com/cat?width=300&height=200&random=18",
          "products": [
            {
              "id": "prod-1-3-1",
              "name": "Lámpara de papel japonesa",
              "price": 19.99,
              "unitsPerBox": 8,
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=27"
            },
            {
              "id": "prod-1-3-2",
              "name": "Figuritas de porcelana",
              "price": 12.99,
              "unitsPerBox": 12,
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=28"
            }
          ]
        },
        {
          "id": "cat-1-4",
          "name": "Ropa Tradicional",
          "description": "Vestimenta oriental auténtica",
          "subdescription": "Kimono y más",
          "imageUrl": "https://cataas.com/cat?width=300&height=200&random=19",
          "products": [
            {
              "id": "prod-1-4-1",
              "name": "Kimono tradicional",
              "price": 49.99,
              "unitsPerBox": 4,
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=29"
            }
          ]
        }
      ]
    },
    {
      "id": "2",
      "name": "Rincón Mediterráneo",
      "description": "Productos gourmet mediterráneos",
      "subdescription": "Sabores auténticos de la región",
      "imageUrl": "https://cataas.com/cat?width=300&height=200&random=20",
      "bannerImage": "https://images.pexels.com/photos/1239401/pexels-photo-1239401.jpeg",
      "categories": [
        {
          "id": "cat-2-1",
          "name": "Aceites y Vinagres",
          "description": "Variedades de alta calidad",
          "subdescription": "Perfectos para tus ensaladas",
          "imageUrl": "https://cataas.com/cat?width=300&height=200&random=21",
          "products": [
            {
              "id": "prod-2-1-1",
              "name": "Aceite de oliva virgen extra",
              "price": 15.99,
              "unitsPerBox": 6,
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=31"
            }
          ]
        }
      ]
    },
    {
      "id": "3",
      "name": "Delicias del Norte",
      "description": "Lo mejor del norte de Europa",
      "subdescription": "Productos frescos y tradicionales",
      "imageUrl": "https://cataas.com/cat?width=300&height=200&random=22",
      "bannerImage": "https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg",
      "categories": [
        {
          "id": "cat-3-1",
          "name": "Lácteos",
          "description": "Leche, quesos y más",
          "subdescription": "Directamente de granjas nórdicas",
          "imageUrl": "https://cataas.com/cat?width=300&height=200&random=23",
          "products": [
            {
              "id": "prod-3-1-1",
              "name": "Queso Gouda premium",
              "price": 10.99,
              "unitsPerBox": 5,
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=32"
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
  