'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="inline ml-1">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
  </svg>
);

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

export default function TiendaAccesorios() {
  const [showNav, setShowNav] = useState(false);
  const [filters, setFilters] = useState({
    año: '',
    marca: '',
    modelo: '',
    categoria: ''
  });
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const accesorios = [
    {
      id: 1,
      nombre: "Punta de escape tipo Burnt titanium look",
      año: "2015-2023",
      marca: "Universal",
      modelo: "Todos",
      categoria: "Escape",
      precio: 149990,
      precioFormateado: "$149.990",
      imagen: "/TuboEscape.jpg"
    },
    {
      id: 2,
      nombre: "Rin 17 de acero negro",
      año: "2018-2023",
      marca: "AlloyTech",
      modelo: "Deportivos",
      categoria: "Rines",
      precio: 85500,
      precioFormateado: "$85.500",
      imagen: "/rin.png",
      link: "/pages/tienda/2"
    },
    {
      id: 3,
      nombre: "Amortiguador tipo coillover",
      año: "2010-2023",
      marca: "SpeedFlow",
      modelo: "Varios",
      categoria: "Escape",
      precio: 499990,
      precioFormateado: "$499.990",
      imagen: "/Suspension.jpg"
    },
    {
      id: 4,
      nombre: "Turbo univertsal, marca Harrett",
      año: "2015-2023",
      marca: "Harrett",
      modelo: "Coupe/Sedán",
      categoria: "Aerodinámica",
      precio: 299990,
      precioFormateado: "$299.990",
      imagen: "/Turbo.jpg"
    },
    {
      id: 5,
      nombre: "Focos LED diurnos",
      año: "2018-2023",
      marca: "LumaTech",
      modelo: "Universal",
      categoria: "Iluminación",
      precio: 89990,
      precioFormateado: "$89.990",
      imagen: "/LuzTrasera.png"
    },
    {
      id: 6,
      nombre: "Remplazo de Luz trasera",
      año: "2015-2023",
      marca: "DriveStyle",
      modelo: "Universal",
      categoria: "Interior",
      precio: 249990,
      precioFormateado: "$249.990",
      imagen: "/LuzTrasera2.jpg"
    }
  ];

  const [filteredAccesorios, setFilteredAccesorios] = useState(accesorios);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const filtered = accesorios.filter(item => {
      return (
        (filters.año === '' || item.año.includes(filters.año)) &&
        (filters.marca === '' || item.marca.toLowerCase().includes(filters.marca.toLowerCase())) &&
        (filters.modelo === '' || item.modelo.toLowerCase().includes(filters.modelo.toLowerCase())) &&
        (filters.categoria === '' || item.categoria.toLowerCase().includes(filters.categoria.toLowerCase()))
      );
    });
    setFilteredAccesorios(filtered);
  };

  const clearFilters = () => {
    setFilters({ año: '', marca: '', modelo: '', categoria: '' });
    setFilteredAccesorios(accesorios);
  };

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price).replace('COP', '$').trim();
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar */}
      {showNav && (
        <nav className="fixed top-0 left-0 w-full bg-black/90 backdrop-blur-sm text-white z-50 flex justify-between items-center px-8 py-4 shadow-lg transition-all duration-500">
          <div className="text-2xl font-bold tracking-wider">VIAGGIO VELOCE</div>
          <ul className="hidden md:flex gap-8 uppercase text-sm tracking-wider">
            <li className="hover:text-gray-300 transition"><a href="/">INICIO</a></li>
            <li className="hover:text-gray-300 transition"><a href="/pages/tienda">TIENDA</a></li>
            <li className="hover:text-gray-300 transition"><a href="/pages/galeriaAutos">GALERÍA</a></li>
            <li className="hover:text-gray-300 transition"><a href="#contacto">CONTACTO</a></li>
          </ul>
          <button 
            onClick={() => setShowCart(!showCart)} 
            className="relative p-2 hover:bg-gray-700 rounded-full"
          >
            <CartIcon />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </nav>
      )}

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
                  <>
                    {cartItems.map(item => (
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
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 bg-gray-700 rounded-l"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 bg-gray-800">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 bg-gray-700 rounded-r"
                            >
                              +
                            </button>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="ml-4 text-red-400 hover:text-red-300 text-sm"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
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

      {/* Sección Tienda */}
      <section id="tienda" className="pt-24 pb-16 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Tienda de Accesorios</h1>
          
          {/* Filtros de búsqueda */}
          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Año</label>
                <input
                  type="text"
                  name="año"
                  value={filters.año}
                  onChange={handleFilterChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white"
                  placeholder="Ej: 2020"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Marca</label>
                <input
                  type="text"
                  name="marca"
                  value={filters.marca}
                  onChange={handleFilterChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white"
                  placeholder="Ej: Universal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Modelo</label>
                <input
                  type="text"
                  name="modelo"
                  value={filters.modelo}
                  onChange={handleFilterChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white"
                  placeholder="Ej: Sedán"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Categoría</label>
                <input
                  type="text"
                  name="categoria"
                  value={filters.categoria}
                  onChange={handleFilterChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white"
                  placeholder="Ej: Escape"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center md:justify-end">
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition"
              >
                Limpiar Filtros
              </button>
              <button
                onClick={applyFilters}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition"
              >
                Aplicar Filtros
              </button>
              <button
                onClick={applyFilters}
                className="px-4 py-2 bg-gray-700 border border-blue-500 hover:bg-gray-600 text-white rounded-md transition"
              >
                Buscar
              </button>
            </div>
          </div>

          {/* Cards de accesorios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAccesorios.map(accesorio => (
              <div key={accesorio.id} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300">
                <Link href={`/tienda/${accesorio.id}`} className="block">
                  <div className="h-48 bg-gray-700 relative">
                    <Image
                      src={accesorio.imagen}
                      alt={accesorio.nombre}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{accesorio.nombre}</h3>
                    <div className="space-y-2 text-sm text-gray-300 mb-4">
                      <div><span className="font-medium">Año:</span> {accesorio.año}</div>
                      <div><span className="font-medium">Marca:</span> {accesorio.marca}</div>
                      <div><span className="font-medium">Modelo:</span> {accesorio.modelo}</div>
                      <div><span className="font-medium">Categoría:</span> {accesorio.categoria}</div>
                    </div>
                  </div>
                </Link>
                <div className="p-4 pt-0">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-400">{accesorio.precioFormateado}</span>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(accesorio);
                      }}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition"
                    >
                      Añadir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredAccesorios.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">No se encontraron accesorios con los filtros seleccionados</p>
              <button
                onClick={clearFilters}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition"
              >
                Mostrar todos
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}