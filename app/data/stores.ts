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
              "id": "prod-1-1-6",
              "name": "Tetera de cerámica japonesa",
              "price": 34.99,
              "unitsPerBox": 6,
              "unitsPerPackage": 2,
              "reference": "UTN-014",
              "barcode": "8400000123469",
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=30",
              "image": "https://cataas.com/cat?width=200&height=200&random=30",
              "storeName": "Bazar Oriental",
              "storeId": "1"
            },
            {
              "id": "prod-1-1-7",
              "name": "Juego de palillos de bambú",
              "price": 9.99,
              "unitsPerBox": 20,
              "unitsPerPackage": 10,
              "reference": "UTN-015",
              "barcode": "8400000123470",
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=31",
              "image": "https://cataas.com/cat?width=200&height=200&random=31",
              "storeName": "Bazar Oriental",
              "storeId": "1"
            },
            {
              "id": "prod-1-1-8",
              "name": "Set de tazones de porcelana",
              "price": 24.99,
              "unitsPerBox": 10,
              "unitsPerPackage": 5,
              "reference": "UTN-018",
              "barcode": "8400000123473",
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=39",
              "image": "https://cataas.com/cat?width=200&height=200&random=39",
              "storeName": "Bazar Oriental",
              "storeId": "1"
            },
            {
              "id": "prod-1-1-9",
              "name": "Rallador multifunción japonés",
              "price": 12.99,
              "unitsPerBox": 15,
              "unitsPerPackage": 6,
              "reference": "UTN-019",
              "barcode": "8400000123474",
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=40",
              "image": "https://cataas.com/cat?width=200&height=200&random=40",
              "storeName": "Bazar Oriental",
              "storeId": "1"
            },
            {
              "id": "prod-1-1-10",
              "name": "Cuchara de madera tallada",
              "price": 5.99,
              "unitsPerBox": 30,
              "unitsPerPackage": 15,
              "reference": "UTN-020",
              "barcode": "8400000123475",
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=41",
              "image": "https://cataas.com/cat?width=200&height=200&random=41",
              "storeName": "Bazar Oriental",
              "storeId": "1"
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
              "id": "prod-1-2-6",
              "name": "Guantes de limpieza reutilizables",
              "price": 7.99,
              "unitsPerBox": 72,
              "unitsPerPackage": 12,
              "reference": "UTN-021",
              "barcode": "8400000123476",
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=42",
              "image": "https://cataas.com/cat?width=200&height=200&random=42",
              "storeName": "Bazar Oriental",
              "storeId": "1"
            },
            {
              "id": "prod-1-2-7",
              "name": "Esponja ecológica para vajilla",
              "price": 4.99,
              "unitsPerBox": 24,
              "unitsPerPackage": 12,
              "reference": "UTN-022",
              "barcode": "8400000123477",
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=43",
              "image": "https://cataas.com/cat?width=200&height=200&random=43",
              "storeName": "Bazar Oriental",
              "storeId": "1"
            },
            {
              "id": "prod-1-2-8",
              "name": "Spray anti grasa concentrado",
              "price": 10.99,
              "unitsPerBox": 18,
              "unitsPerPackage": 9,
              "reference": "UTN-023",
              "barcode": "8400000123478",
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=44",
              "image": "https://cataas.com/cat?width=200&height=200&random=44",
              "storeName": "Bazar Oriental",
              "storeId": "1"
            },
            {
              "id": "prod-1-2-9",
              "name": "Trapo multiusos de microfibra",
              "price": 3.99,
              "unitsPerBox": 50,
              "unitsPerPackage": 25,
              "reference": "UTN-024",
              "barcode": "8400000123479",
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=45",
              "image": "https://cataas.com/cat?width=200&height=200&random=45",
              "storeName": "Bazar Oriental",
              "storeId": "1"
            },
            {
              "id": "prod-1-2-10",
              "name": "Bolsas de basura biodegradables",
              "price": 8.99,
              "unitsPerBox": 10,
              "unitsPerPackage": 5,
              "reference": "UTN-025",
              "barcode": "8400000123480",
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=46",
              "image": "https://cataas.com/cat?width=200&height=200&random=46",
              "storeName": "Bazar Oriental",
              "storeId": "1"
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
              "id": "prod-1-3-3",
              "name": "Cojines con motivos orientales",
              "price": 29.99,
              "unitsPerBox": 8,
              "unitsPerPackage": 4,
              "reference": "UTN-026",
              "barcode": "8400000123481",
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=47",
              "image": "https://cataas.com/cat?width=200&height=200&random=47",
              "storeName": "Bazar Oriental",
              "storeId": "1"
            },
            {
              "id": "prod-1-3-4",
              "name": "Reloj de pared minimalista",
              "price": 19.99,
              "unitsPerBox": 10,
              "unitsPerPackage": 5,
              "reference": "UTN-027",
              "barcode": "8400000123482",
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=48",
              "image": "https://cataas.com/cat?width=200&height=200&random=48",
              "storeName": "Bazar Oriental",
              "storeId": "1"
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
              "id": "prod-1-4-2",
              "name": "Zapatos de madera Geta",
              "price": 39.99,
              "unitsPerBox": 6,
              "unitsPerPackage": 3,
              "reference": "UTN-028",
              "barcode": "8400000123483",
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=49",
              "image": "https://cataas.com/cat?width=200&height=200&random=49",
              "storeName": "Bazar Oriental",
              "storeId": "1"
            },
            {
              "id": "prod-1-4-3",
              "name": "Obi para kimono",
              "price": 24.99,
              "unitsPerBox": 8,
              "unitsPerPackage": 4,
              "reference": "UTN-029",
              "barcode": "8400000123484",
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=50",
              "image": "https://cataas.com/cat?width=200&height=200&random=50",
              "storeName": "Bazar Oriental",
              "storeId": "1"
            }
          ]
        }
      ]
    },
    {
      "id": "2",
      "name": "Delicias Mediterráneas",
      "description": "Lo mejor de la dieta mediterránea",
      "subdescription": "Productos frescos y auténticos",
      "imageUrl": "https://cataas.com/cat?width=300&height=200&random=22",
      "bannerImage": "https://images.pexels.com/photos/1239401/pexels-photo-1239401.jpeg",
      "categories": [
        {
          "id": "cat-2-1",
          "name": "Aceites y Vinagres",
          "description": "Calidad gourmet",
          "subdescription": "Perfectos para tus recetas",
          "imageUrl": "https://cataas.com/cat?width=300&height=200&random=24",
          "products": [
            {
              "id": "prod-2-1-1",
              "name": "Aceite de oliva virgen extra",
              "price": 14.99,
              "unitsPerBox": 6,
              "unitsPerPackage": 3,
              "reference": "MED-001",
              "barcode": "8500000123471",
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=34",
              "image": "https://cataas.com/cat?width=200&height=200&random=34",
              "storeName": "Delicias Mediterráneas",
              "storeId": "2"
            },
            {
              "id": "prod-2-1-2",
              "name": "Vinagre balsámico envejecido",
              "price": 11.99,
              "unitsPerBox": 8,
              "unitsPerPackage": 4,
              "reference": "MED-002",
              "barcode": "8500000123472",
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=35",
              "image": "https://cataas.com/cat?width=200&height=200&random=35",
              "storeName": "Delicias Mediterráneas",
              "storeId": "2"
            }
          ]
        },
        {
          "id": "cat-2-2",
          "name": "Quesos Artesanales",
          "description": "De pequeñas granjas locales",
          "subdescription": "Sabores únicos",
          "imageUrl": "https://cataas.com/cat?width=300&height=200&random=25",
          "products": [
            {
              "id": "prod-2-2-1",
              "name": "Queso Manchego curado",
              "price": 19.99,
              "unitsPerBox": 5,
              "unitsPerPackage": 2,
              "reference": "MED-003",
              "barcode": "8500000123473",
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=36",
              "image": "https://cataas.com/cat?width=200&height=200&random=36",
              "storeName": "Delicias Mediterráneas",
              "storeId": "2"
            }
          ]
        }
      ]
    },
    {
      "id": "3",
      "name": "Sabores del Norte",
      "description": "Especialidades del norte de Europa",
      "subdescription": "Productos exclusivos y tradicionales",
      "imageUrl": "https://cataas.com/cat?width=300&height=200&random=23",
      "bannerImage": "https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg",
      "categories": [
        {
          "id": "cat-3-1",
          "name": "Lácteos",
          "description": "Leche y quesos únicos",
          "subdescription": "Directamente de granjas nórdicas",
          "imageUrl": "https://cataas.com/cat?width=300&height=200&random=26",
          "products": [
            {
              "id": "prod-3-1-1",
              "name": "Queso Gouda ahumado",
              "price": 12.99,
              "unitsPerBox": 8,
              "unitsPerPackage": 4,
              "reference": "NORD-001",
              "barcode": "8600000123471",
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=37",
              "image": "https://cataas.com/cat?width=200&height=200&random=37",
              "storeName": "Sabores del Norte",
              "storeId": "3"
            }
          ]
        },
        {
          "id": "cat-3-2",
          "name": "Panadería",
          "description": "Pan y dulces artesanales",
          "subdescription": "Sabores auténticos",
          "imageUrl": "https://cataas.com/cat?width=300&height=200&random=27",
          "products": [
            {
              "id": "prod-3-2-1",
              "name": "Pan de centeno",
              "price": 7.99,
              "unitsPerBox": 10,
              "unitsPerPackage": 5,
              "reference": "NORD-002",
              "barcode": "8600000123472",
              "imageUrl": "https://cataas.com/cat?width=200&height=200&random=38",
              "image": "https://cataas.com/cat?width=200&height=200&random=38",
              "storeName": "Sabores del Norte",
              "storeId": "3"
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
    const products = store?.categories.find(cat => cat.id === categoryId)?.products || []
    console.log('Products from stores.ts:', products)
    return products
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
  