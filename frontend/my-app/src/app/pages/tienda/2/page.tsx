'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CartItem, formatPrice, getCartFromStorage, saveCartToStorage } from '@/lib/utils';

const ProductPage = () => {
  const router = useRouter();
  const [quantity, setQuantity] = useState<number>(1);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState<string>('descripcion');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    setCartItems(getCartFromStorage());
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    saveCartToStorage(cartItems);
  }, [cartItems]);

  // Array de imágenes del producto desde diferentes perspectivas
  const productImages = [
    "/tienda/rins/rin.png",
    "/tienda/rins/rin2.png",
    "/tienda/rins/rin3.png"
  ];

  const product: CartItem = {
    id: 2,
    nombre: "Rin de Aleación Deportivo",
    descripcion: "Rines de aleación 17\" Torneos X99121B en color negro mate con diseño de radios deportivos.",
    precio: 85500,
    precioFormateado: "$85.500",
    imagen: productImages[0],
    detalles: "19\" de diámetro (19\" x 8,5\") - Offset: ET35 - Perforación: 5x114.3",
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
      return [...prevItems, { 
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        quantity: quantity,
        imagen: product.imagen,
        precioFormateado: product.precioFormateado
      }];
    });
    setShowCart(true);
  };

  // Función para eliminar todo el carrito
  const clearCart = () => {
    setCartItems([]);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.precio * item.quantity), 0);

  // Funciones para navegar entre imágenes
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
    );
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-gray-900/95 backdrop-blur-sm text-white z-40 flex justify-between items-center px-6 py-4 shadow-lg border-b border-gray-800">
        <div className="flex items-center">
          <button 
            onClick={() => router.back()}
            className="mr-4 p-2 rounded-full hover:bg-gray-800 transition-colors"
            aria-label="Volver atrás"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="text-xl font-bold tracking-wider">VIAGGIO VELOGGE</div>
        </div>
        
        <button 
          onClick={() => setShowCart(true)} 
          className="relative p-2 hover:bg-gray-800 rounded-full transition-colors"
          aria-label="Abrir carrito"
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

      {/* Carrito lateral - CON BOTÓN DE ELIMINAR TODO */}
      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-70" onClick={() => setShowCart(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4 border-b border-gray-800">
                <h2 className="text-xl font-bold">Tu Carrito</h2>
                <div className="flex items-center gap-2">
                  {cartItems.length > 0 && (
                    <button 
                      onClick={clearCart}
                      className="text-red-400 hover:text-red-300 text-sm mr-2"
                      title="Eliminar todo"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                  <button onClick={() => setShowCart(false)} className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="mt-4 text-lg">Tu carrito está vacío</p>
                    <button 
                      onClick={() => setShowCart(false)}
                      className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-md transition-colors"
                    >
                      Seguir comprando
                    </button>
                  </div>
                ) : (
                  cartItems.map(item => (
                    <div key={item.id} className="flex items-center py-4 border-b border-gray-800">
                      <div className="w-16 h-16 bg-gray-800 rounded-md overflow-hidden mr-4 flex-shrink-0">
                        <Image
                          src={item.imagen}
                          alt={item.nombre}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.nombre}</h3>
                        <p className="text-blue-400 text-sm">{formatPrice(item.precio)}</p>
                        <div className="flex items-center mt-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 bg-gray-800 rounded-l hover:bg-gray-700 transition-colors"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 bg-gray-800">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 bg-gray-800 rounded-r hover:bg-gray-700 transition-colors"
                          >
                            +
                          </button>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="ml-4 text-red-400 hover:text-red-300 text-sm transition-colors"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-4 border-t border-gray-800">
                <div className="flex justify-between mb-4">
                  <span>Subtotal ({totalItems} {totalItems === 1 ? 'artículo' : 'artículos'})</span>
                  <span className="font-bold">{formatPrice(totalPrice)}</span>
                </div>
                <button 
                  className={`w-full py-3 rounded-md font-medium transition-colors ${cartItems.length === 0 ? 'bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'}`}
                  disabled={cartItems.length === 0}
                >
                  Proceder al pago
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <main className="pt-24 pb-16 px-4 md:px-8 max-w-6xl mx-auto">
        {/* Ruta de navegación */}
        <div className="text-sm text-gray-400 mb-6 flex items-center">
          <button onClick={() => router.push('/')} className="hover:text-white transition-colors">Inicio</button>
          <span className="mx-2">/</span>
          <button onClick={() => router.push('/pages/tienda')} className="hover:text-white transition-colors">Tienda</button>
          <span className="mx-2">/</span>
          <span className="text-white">Rines</span>
          <span className="mx-2">/</span>
          <span className="text-blue-400">{product.nombre}</span>
        </div>

        {/* Detalles del producto */}
        <div className="bg-gray-800 rounded-xl overflow-hidden md:flex shadow-lg">
          {/* Imagen del producto */}
          <div className="md:w-1/2 bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-8 flex flex-col items-center justify-center">
            <div className="relative w-full h-64 md:h-96 mb-4">
              <Image
                src={productImages[currentImageIndex]}
                alt={`${product.nombre} - Vista ${currentImageIndex + 1}`}
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
              
              {/* Flechas de navegación */}
              {productImages.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    aria-label="Imagen anterior"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    aria-label="Siguiente imagen"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Miniaturas de imágenes */}
            {productImages.length > 1 && (
              <div className="flex justify-center space-x-2 mt-4">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => selectImage(index)}
                    className={`w-16 h-16 border-2 rounded-md overflow-hidden transition-all ${
                      index === currentImageIndex 
                        ? 'border-blue-500 scale-105' 
                        : 'border-gray-700 hover:border-gray-500'
                    }`}
                    aria-label={`Ver imagen ${index + 1}`}
                  >
                    <div className="w-full h-full bg-gray-700 relative">
                      <Image
                        src={image}
                        alt={`Miniatura ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div className="md:w-1/2 p-6 md:p-8">
            <div className="mb-2">
              <span className="inline-block px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-xs font-medium">
                NUEVO
              </span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.nombre}</h1>
            <p className="text-gray-300 mb-6">{product.descripcion}</p>
            
            <div className="mb-6 p-4 bg-gray-900/50 rounded-lg">
              <p className="text-lg font-medium">{product.detalles}</p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-2xl font-bold text-blue-400">{product.precioFormateado}</span>
                <span className="text-gray-400 text-sm">Unidad</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center text-green-400 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Envío gratis - Devolución gratis
              </div>
              <div className="flex items-center text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                </svg>
                En stock - Envío en 24 a 48 horas
              </div>
            </div>

            <div className="flex items-center mb-6">
              <span className="mr-4 font-medium">Cantidad:</span>
              <div className="flex items-center border border-gray-700 rounded-md overflow-hidden">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 bg-gray-800 w-12 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-3 mb-6">
              <button
                onClick={addToCart}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 rounded-md font-medium transition-colors flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                Añadir al carrito
              </button>
              <button className="px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs de información */}
        <div className="mt-8 bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-700">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('descripcion')}
                className={`py-4 px-6 text-center font-medium ${activeTab === 'descripcion' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
              >
                Descripción
              </button>
              <button
                onClick={() => setActiveTab('especificaciones')}
                className={`py-4 px-6 text-center font-medium ${activeTab === 'especificaciones' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
              >
                Especificaciones
              </button>
              <button
                onClick={() => setActiveTab('compatibilidad')}
                className={`py-4 px-6 text-center font-medium ${activeTab === 'compatibilidad' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
              >
                Compatibilidad
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'descripcion' && (
              <div>
                <p className="mb-4">Estos rines deportivos de aleación negra transformarán por completo la apariencia de tu vehículo, dándole un look más agresivo y deportivo.</p>
                <p className="mb-4">Fabricados en aleación de aluminio de alta resistencia, ofrecen una excelente disipación del calor de los frenos y reducen el peso no suspendido, mejorando el rendimiento y la eficiencia de combustible.</p>
                <p>El diseño de radios múltiples no solo es visualmente atractivo, sino que también proporciona una ventilación óptima para el sistema de frenos.</p>
              </div>
            )}
            
            {activeTab === 'especificaciones' && (
              <ul className="space-y-2">
                <li className="flex"><span className="text-blue-400 mr-2">•</span>Material: Aleación de aluminio forjado</li>
                <li className="flex"><span className="text-blue-400 mr-2">•</span>Acabado: Negro mate con detalles maquinados</li>
                <li className="flex"><span className="text-blue-400 mr-2">•</span>Diámetro: 17 pulgadas</li>
                <li className="flex"><span className="text-blue-400 mr-2">•</span>Ancho: 8 pulgadas</li>
                <li className="flex"><span className="text-blue-400 mr-2">•</span>Offset: ET35</li>
                <li className="flex"><span className="text-blue-400 mr-2">•</span>Patrón de pernos: 5x114.3</li>
                <li className="flex"><span className="text-blue-400 mr-2">•</span>Carga máxima: 690 kg</li>
                <li className="flex"><span className="text-blue-400 mr-2">•</span>Peso: 11.2 kg</li>
              </ul>
            )}
            
            {activeTab === 'compatibilidad' && (
              <div>
                <p className="mb-4">Estos rines son compatibles con una amplia gama de vehículos con patrón de pernos 5x114.3:</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span>Honda Civic 2016-2021</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span>Toyota Corolla 2017-2023</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span>Mazda 3 2014-2019</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span>Hyundai Elantra 2016-2020</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span>Kia Forte 2019-2023</li>
                </ul>
                <p className="mt-4 text-sm text-gray-400">* La compatibilidad puede variar según el año exacto y trim del vehículo.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sección de garantía */}
        <div className="mt-8 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Garantía y Soporte
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start">
              <div className="bg-blue-900/20 p-2 rounded-md mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Garantía</h3>
                <p className="text-sm text-gray-400">2 años contra defectos de fabricación</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-900/20 p-2 rounded-md mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Soporte</h3>
                <p className="text-sm text-gray-400">Asesoramiento técnico especializado</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-900/20 p-2 rounded-md mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Devoluciones</h3>
                <p className="text-sm text-gray-400">30 días para cambios o devoluciones</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;