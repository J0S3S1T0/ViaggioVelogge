'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface CartItem {
  id: number | string;
  nombre: string;
  precio: number;
  quantity: number;
  imagen: string;
  precioFormateado: string;
  descripcion?: string;
  precioKit?: number;
  precioKitFormateado?: string;
  detalles?: string;
  envio?: string;
  stock?: string;
}

const ProductPage = () => {
  const router = useRouter();
  const [quantity, setQuantity] = useState<number>(1);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const product: CartItem = {
    id: 2,
    nombre: "Rin de acero negro",
    descripcion: "17\" Torneos X99121B Negra",
    precio: 85500,
    precioKit: 350500,
    precioFormateado: "$85.500",
    precioKitFormateado: "$350.500",
    imagen: "/rin.png",
    detalles: "19\" de diámetro (19\" x 8,5\")",
    envio: "Envío gratis - Devolución gratis",
    stock: "En stock - Envío en 24 a 48 horas",
    quantity: 1
  };

  const addToCart = () => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
    setShowCart(true);
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price).replace('COP', '$').trim();
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.precio * item.quantity), 0);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-black/90 backdrop-blur-sm text-white z-40 flex justify-between items-center px-8 py-4 shadow-lg">
        <div className="text-2xl font-bold tracking-wider">VIAGGIO VELOCE</div>
        <button 
          onClick={() => setShowCart(true)} 
          className="relative p-2 hover:bg-gray-700 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </nav>

      {/* Carrito lateral */}
      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowCart(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <h2 className="text-xl font-bold">Tu Carrito</h2>
                <button onClick={() => setShowCart(false)} className="text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <p>Tu carrito está vacío</p>
                  </div>
                ) : (
                  cartItems.map(item => (
                    <div key={item.id} className="flex items-center py-4 border-b border-gray-700">
                      <div className="w-16 h-16 bg-gray-700 rounded-md overflow-hidden mr-4">
                        <Image
                          src={item.imagen}
                          alt={item.nombre}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.nombre}</h3>
                        <p className="text-blue-400">{formatPrice(item.precio)}</p>
                        <div className="flex items-center mt-2">
                          <button 
                            onClick={() => setCartItems(prev => 
                              prev.map(i => i.id === item.id ? {...i, quantity: Math.max(1, i.quantity-1)} : i)
                            )}
                            className="px-2 py-1 bg-gray-700 rounded-l"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 bg-gray-800">{item.quantity}</span>
                          <button 
                            onClick={() => setCartItems(prev => 
                              prev.map(i => i.id === item.id ? {...i, quantity: i.quantity+1} : i)
                            )}
                            className="px-2 py-1 bg-gray-700 rounded-r"
                          >
                            +
                          </button>
                          <button 
                            onClick={() => setCartItems(prev => prev.filter(i => i.id !== item.id))}
                            className="ml-4 text-red-400 hover:text-red-300 text-sm"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-4 border-t border-gray-700">
                <div className="flex justify-between mb-2">
                  <span>Total ({totalItems} {totalItems === 1 ? 'artículo' : 'artículos'})</span>
                  <span className="font-bold">{formatPrice(totalPrice)}</span>
                </div>
                <button 
                  className={`w-full py-3 rounded-md font-medium ${cartItems.length === 0 ? 'bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'}`}
                  disabled={cartItems.length === 0}
                >
                  Realizar pago
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <main className="pt-24 pb-16 px-4 md:px-8 max-w-6xl mx-auto">
        {/* Filtros */}
        <div className="flex flex-wrap gap-4 mb-8 text-sm">
          <div className="flex items-center">
            <span className="text-gray-400 mr-2">Año:</span>
            <select className="bg-gray-800 border border-gray-700 rounded px-3 py-1">
              <option>2018-2023</option>
            </select>
          </div>
          <div className="flex items-center">
            <span className="text-gray-400 mr-2">Marca:</span>
            <select className="bg-gray-800 border border-gray-700 rounded px-3 py-1">
              <option>AlloyTech</option>
            </select>
          </div>
        </div>

        {/* Detalles del producto */}
        <div className="bg-gray-800 rounded-lg overflow-hidden md:flex">
          {/* Imagen del producto */}
          <div className="md:w-1/2 bg-gray-700 p-8 flex items-center justify-center">
            <div className="relative w-full h-64 md:h-96">
              <Image
                src={product.imagen}
                alt={product.nombre}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Información del producto */}
          <div className="md:w-1/2 p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.nombre}</h1>
            <p className="text-gray-300 mb-4">{product.descripcion}</p>
            
            <div className="mb-6">
              <p className="text-lg">{product.detalles}</p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-2xl font-bold text-blue-400">{product.precioFormateado}</span>
                <span className="text-gray-400">Unidad</span>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="text-xl font-bold text-green-400">{product.precioKitFormateado}</span>
                <span className="text-gray-400">Kit completo</span>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-green-400 mb-1">{product.envio}</p>
              <p className="text-gray-300">{product.stock}</p>
            </div>

            <div className="flex items-center mb-6">
              <span className="mr-4">Cantidad:</span>
              <div className="flex items-center">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 bg-gray-700 rounded-l-md"
                >
                  -
                </button>
                <span className="px-4 py-1 bg-gray-800">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 bg-gray-700 rounded-r-md"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={addToCart}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-md font-medium transition"
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;