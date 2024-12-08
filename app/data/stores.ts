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
    categories: Category[]
  }
  
  export const stores: Store[] = [
    {
      id: "1",
      name: "Bazar Oriental",
      description: "Tu tienda de productos asiáticos de confianza",
      subdescription: "Importados directamente desde Asia para tu hogar.",
      imageUrl: "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg",
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
    },
    {
      id: "2",
      name: "Ferretería Moderna",
      description: "Todo para el bricolaje y el hogar",
      subdescription: "Soluciones completas para bricolaje y organización.",
      imageUrl: "https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg",
      categories: [
        {
          id: "cat-2-1",
          name: "Herramientas",
          description: "Herramientas profesionales",
          subdescription: "Para trabajos exigentes",
          imageUrl: "https://cataas.com/cat?width=300&height=200&random=5",
          products: [
            {
              id: "prod-2-1-1",
              name: "Set de destornilladores",
              price: 24.99,
              unitsPerBox: 12,
              imageUrl: "https://cataas.com/cat?width=200&height=200&random=5"
            },
            {
              id: "prod-2-1-2",
              name: "Martillo profesional",
              price: 19.99,
              unitsPerBox: 6,
              imageUrl: "https://cataas.com/cat?width=200&height=200&random=6"
            }
          ]
        },
        {
          id: "cat-2-2",
          name: "Organización",
          description: "Soluciones de almacenaje",
          subdescription: "Mantén todo en orden",
          imageUrl: "https://cataas.com/cat?width=300&height=200&random=6",
          products: [
            {
              id: "prod-2-2-1",
              name: "Caja organizadora",
              price: 14.99,
              unitsPerBox: 12,
              imageUrl: "https://cataas.com/cat?width=200&height=200&random=7"
            },
            {
              id: "prod-2-2-2",
              name: "Set de ganchos",
              price: 9.99,
              unitsPerBox: 24,
              imageUrl: "https://cataas.com/cat?width=200&height=200&random=8"
            }
          ]
        }
      ]
    },
    {
        id: "3",
        name: "La Casa del Regalo",
        description: "912 345 678", // Número de teléfono
        subdescription: "Encuentra el detalle perfecto para cada ocasión.",
        imageUrl: "https://images.pexels.com/photos/3184192/pexels-photo-3184192.jpeg",
        categories: [
          {
            id: "cat-3-1",
            name: "Decoración",
            description: "Detalles únicos para tu hogar",
            subdescription: "Desde cuadros hasta lámparas modernas.",
            imageUrl: "https://cataas.com/cat?width=300&height=200&random=7",
            products: [
              {
                id: "prod-3-1-1",
                name: "Portarretratos de madera",
                price: 12.99,
                unitsPerBox: 10,
                imageUrl: "https://cataas.com/cat?width=200&height=200&random=9"
              },
              {
                id: "prod-3-1-2",
                name: "Lámpara LED decorativa",
                price: 25.99,
                unitsPerBox: 6,
                imageUrl: "https://cataas.com/cat?width=200&height=200&random=10"
              }
            ]
          },
          {
            id: "cat-3-2",
            name: "Papelería y Manualidades",
            description: "Material creativo",
            subdescription: "Todo lo que necesitas para tus proyectos DIY.",
            imageUrl: "https://cataas.com/cat?width=300&height=200&random=8",
            products: [
              {
                id: "prod-3-2-1",
                name: "Set de pinturas acrílicas",
                price: 14.99,
                unitsPerBox: 8,
                imageUrl: "https://cataas.com/cat?width=200&height=200&random=11"
              },
              {
                id: "prod-3-2-2",
                name: "Cuaderno de diseño premium",
                price: 7.99,
                unitsPerBox: 20,
                imageUrl: "https://cataas.com/cat?width=200&height=200&random=12"
              }
            ]
          }
        ]
      },
      {
        id: "4",
        name: "Supermercado Verde",
        description: "913 456 789", // Número de teléfono
        subdescription: "Tu mercado ecológico con productos frescos.",
        imageUrl: "https://images.pexels.com/photos/3671135/pexels-photo-3671135.jpeg",
        categories: [
          {
            id: "cat-4-1",
            name: "Frutas y Verduras",
            description: "Frescura garantizada",
            subdescription: "Productos ecológicos directamente del campo.",
            imageUrl: "https://cataas.com/cat?width=300&height=200&random=9",
            products: [
              {
                id: "prod-4-1-1",
                name: "Cesta de frutas variadas",
                price: 19.99,
                unitsPerBox: 5,
                imageUrl: "https://cataas.com/cat?width=200&height=200&random=13"
              },
              {
                id: "prod-4-1-2",
                name: "Verduras ecológicas",
                price: 12.99,
                unitsPerBox: 6,
                imageUrl: "https://cataas.com/cat?width=200&height=200&random=14"
              }
            ]
          },
          {
            id: "cat-4-2",
            name: "Productos Veganos",
            description: "Alimentación sana",
            subdescription: "Alternativas vegetales para tu día a día.",
            imageUrl: "https://cataas.com/cat?width=300&height=200&random=10",
            products: [
              {
                id: "prod-4-2-1",
                name: "Hamburguesas de lentejas",
                price: 8.99,
                unitsPerBox: 8,
                imageUrl: "https://cataas.com/cat?width=200&height=200&random=15"
              },
              {
                id: "prod-4-2-2",
                name: "Leche de almendras",
                price: 3.99,
                unitsPerBox: 12,
                imageUrl: "https://cataas.com/cat?width=200&height=200&random=16"
              }
            ]
          }
        ]
      },
      {
        id: "5",
        name: "El Rincón del Gamer",
        description: "914 567 890", // Número de teléfono
        subdescription: "Todo lo que necesitas para tu setup.",
        imageUrl: "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg",
        categories: [
          {
            id: "cat-5-1",
            name: "Accesorios de PC",
            description: "Calidad gamer",
            subdescription: "Complementa tu estación de juego.",
            imageUrl: "https://cataas.com/cat?width=300&height=200&random=11",
            products: [
              {
                id: "prod-5-1-1",
                name: "Ratón gaming RGB",
                price: 29.99,
                unitsPerBox: 8,
                imageUrl: "https://cataas.com/cat?width=200&height=200&random=17"
              },
              {
                id: "prod-5-1-2",
                name: "Teclado mecánico",
                price: 49.99,
                unitsPerBox: 5,
                imageUrl: "https://cataas.com/cat?width=200&height=200&random=18"
              }
            ]
          },
          {
            id: "cat-5-2",
            name: "Consolas y Videojuegos",
            description: "Entretenimiento asegurado",
            subdescription: "Consolas de última generación y sus accesorios.",
            imageUrl: "https://cataas.com/cat?width=300&height=200&random=12",
            products: [
              {
                id: "prod-5-2-1",
                name: "Mando inalámbrico",
                price: 39.99,
                unitsPerBox: 10,
                imageUrl: "https://cataas.com/cat?width=200&height=200&random=19"
              },
              {
                id: "prod-5-2-2",
                name: "Videojuego AAA",
                price: 59.99,
                unitsPerBox: 8,
                imageUrl: "https://cataas.com/cat?width=200&height=200&random=20"
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
  