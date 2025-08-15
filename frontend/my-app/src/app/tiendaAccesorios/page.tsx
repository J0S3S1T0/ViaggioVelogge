'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function WheelStore() {
  // Estado para los filtros
  const [filters, setFilters] = useState({
    year: '',
    brand: '',
    model: '',
    accessory: ''
  });

  // Estado para el carrito
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Productos de ejemplo
  const products = [
    {
      id: 1,
      name: "Rin de acero negro",
      model: "17\" Torneos X99121B Negra",
      price: 85500,
      kitPrice: 350500,
      description: "Rines de acero negro de alta resistencia con acabado premium.",
      shipping: {
        free: true,
        return: true,
        stock: "En stock",
        delivery: "Envío en 24 a 48 horas"
      },
      specs: [
        "Diámetro: 17 pulgadas",
        "Ancho: 7.5 pulgadas",
        "Material: Acero al carbono",
        "Color: Negro mate",
        "Peso: 11.2 kg por unidad"
      ],
      image: "/black-wheel.jpg"
    },
    {
      id: 2,
      name: "Rin deportivo aluminio",
      model: "18\" Racing Pro",
      price: 120000,
      kitPrice: 450000,
      description: "Rines deportivos de aleación de aluminio forjado.",
      shipping: {
        free: true,
        return: true,
        stock: "En stock",
        delivery: "Envío en 24 a 48 horas"
      },
      specs: [
        "Diámetro: 18 pulgadas",
        "Ancho: 8 pulgadas",
        "Material: Aleación de aluminio",
        "Color: Plata brillante",
        "Peso: 9.8 kg por unidad"
      ],
      image: "/sport-wheel.jpg"
    }
  ];

  // Manejar cambio de filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Añadir al carrito
  const addToCart = (product, isKit = false) => {
    const quantity = isKit ? 4 : 1;
    const price = isKit ? product.kitPrice : product.price;
    
    const existingItem = cart.find(item => item.id === product.id && item.isKit === isKit);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id && item.isKit === isKit
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, {
        id: product.id,
        name: product.name,
        model: product.model,
        price: price,
        quantity: quantity,
        isKit: isKit,
        image: product.image
      }]);
    }
    
    setShowCart(true);
  };

  // Eliminar del carrito
  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  // Calcular total
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Tienda de Accesorios</h1>
          <button 
            onClick={() => setShowCart(!showCart)}
            className="relative p-2 text-gray-700 hover:text-gray-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Filtros */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Año</label>
              <select
                name="year"
                value={filters.year}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Todos</option>
                <option>2020</option>
                <option>2021</option>
                <option>2022</option>
                <option>2023</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
              <select
                name="brand"
                value={filters.brand}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Todas</option>
                <option>Porsche</option>
                <option>BMW</option>
                <option>Mercedes</option>
                <option>Audi</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
              <select
                name="model"
                value={filters.model}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Todos</option>
                <option>911 GT3</option>
                <option>M3</option>
                <option>C63 AMG</option>
                <option>RS5</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Accesorio</label>
              <select
                name="accessory"
                value={filters.accessory}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Todos</option>
                <option>Rines</option>
                <option>Llantas</option>
                <option>Suspensión</option>
                <option>Escape</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lista de productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
                <p className="text-sm text-gray-600 mb-2">{product.model}</p>
                <p className="text-gray-700 mb-4">{product.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-lg font-bold">{product.price.toLocaleString()} / Unidad</span>
                    <span className="block text-sm text-gray-600">{product.kitPrice.toLocaleString()} Kit completo (4)</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  {product.shipping.free && (
                    <span className="inline-flex items-center px-2 py-1 mr-2 mb-2 text-xs font-medium text-green-800 bg-green-100 rounded">
                      Envío gratis
                    </span>
                  )}
                  {product.shipping.return && (
                    <span className="inline-flex items-center px-2 py-1 mr-2 mb-2 text-xs font-medium text-blue-800 bg-blue-100 rounded">
                      Devolución gratis
                    </span>
                  )}
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded">
                    {product.shipping.stock} - {product.shipping.delivery}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => addToCart(product, false)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
                  >
                    Añadir unidad
                  </button>
                  <button
                    onClick={() => addToCart(product, true)}
                    className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded transition"
                  >
                    Kit completo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carrito flotante */}
      {showCart && (
        <div className="fixed inset-0 overflow-hidden z-50">
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              onClick={() => setShowCart(false)}
            ></div>
            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium text-gray-900">Carrito de compras</h2>
                      <button
                        type="button"
                        className="-mr-2 p-2 text-gray-400 hover:text-gray-500"
                        onClick={() => setShowCart(false)}
                      >
                        <span className="sr-only">Cerrar</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul className="-my-6 divide-y divide-gray-200">
                          {cart.length === 0 ? (
                            <li className="py-6 flex">
                              <p className="text-gray-500">Tu carrito está vacío</p>
                            </li>
                          ) : (
                            cart.map((item, index) => (
                              <li key={index} className="py-6 flex">
                                <div className="relative flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>

                                <div className="ml-4 flex-1 flex flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>{item.name}</h3>
                                      <p className="ml-4">${(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{item.model}</p>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {item.isKit ? 'Kit completo (4)' : 'Unidad'} x {item.quantity}
                                    </p>
                                  </div>
                                  <div className="flex-1 flex items-end justify-between text-sm">
                                    <p className="text-gray-500">${item.price.toLocaleString()} c/u</p>
                                    <button
                                      type="button"
                                      className="font-medium text-red-600 hover:text-red-500"
                                      onClick={() => removeFromCart(index)}
                                    >
                                      Eliminar
                                    </button>
                                  </div>
                                </div>
                              </li>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>${cartTotal.toLocaleString()}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Envío e impuestos calculados al finalizar</p>
                    <div className="mt-6">
                      <button
                        className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Realizar pago
                      </button>
                    </div>
                    <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                      <p>
                        o{' '}
                        <button
                          type="button"
                          className="text-blue-600 font-medium hover:text-blue-500"
                          onClick={() => setShowCart(false)}
                        >
                          Continuar comprando<span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}