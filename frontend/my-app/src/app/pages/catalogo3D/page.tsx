'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function GaleriaPage() {
  const [showNav, setShowNav] = useState(false);
  
  const autos = [
    {
      id: 1,
      nombre: "Chevrolet Impala",
      año: "1959",
      descripcion: "Calle 30 Avance 2020",
      imagen: "/catalogo3D/chevrolet/Impala/impala.png",
      detallesLink: "/impala",
      vista3D: true,
      categoria: "Clásico Americano"
    },
    {
      id: 2,
      nombre: "Ferrari",
      modelo: "Testarossa",
      descripcion: "Leyes del Italiano",
      imagen: "/testarossa.png",
      detallesLink: "/testarossa",
      vista3D: true,
      categoria: "Superdeportivo"
    },
    {
      id: 3,
      nombre: "Buick LeSabre",
      año: "1959",
      descripcion: "Kate Hano",
      imagen: "/catalogo/Chevrolet/BuickLeSabre1959/BuickLeSabre1959.png",
      detallesLink: "/buick-lesabre",
      vista3D: true,
      categoria: "Clásico Americano"
    },
    {
      id: 4,
      nombre: "Ferrari 250 GTO",
      descripcion: "Elegancia Clásica",
      imagen: "/catalogo/Ferrari/ferrari250GTO/Ferrari250.png",
      detallesLink: "/ferrari-250",
      vista3D: false,
      categoria: "Leyenda Italiana"
    }
  ];

  // Efecto para el navbar al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Navbar de Viaggio Veloce */}
      {showNav && (
        <nav className="fixed top-0 left-0 w-full bg-black/95 backdrop-blur-md text-white z-50 flex justify-between items-center px-8 py-4 shadow-xl transition-all duration-500 border-b border-gray-800">
          <Link href="/" className="text-2xl font-bold tracking-wider">VIAGGIO VELOGGE</Link>
          <ul className="hidden md:flex gap-8 uppercase text-sm tracking-wider">
            <li className="hover:text-blue-400 transition"><Link href="/">INICIO</Link></li>
            <li className="text-blue-400 border-b-2 border-blue-400 pb-1"><Link href="/catalogo3D">3D GALLERY</Link></li>
            <li className="hover:text-blue-400 transition"><Link href="/catalogo">CLASSIC CARS</Link></li>
            <li className="hover:text-blue-400 transition"><Link href="/galeria">TUNED CARS</Link></li>
          </ul>
        </nav>
      )}

      {/* Header con efecto parallax */}
      <header className="relative h-96 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/otros/InicioCar.jpg"
            alt="Galería de autos"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-wide">GALERÍA 3D</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-6">
            Descubre nuestros autos clásicos en experiencia 3D inmersiva
          </p>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>
      </header>

      {/* Filtros de categoría */}
      <section className="py-8 bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium transition-all hover:bg-blue-500">
              Todos
            </button>
            <button className="px-6 py-2 bg-gray-800 text-gray-300 rounded-full font-medium transition-all hover:bg-gray-700 hover:text-white">
              Clásicos Americanos
            </button>
            <button className="px-6 py-2 bg-gray-800 text-gray-300 rounded-full font-medium transition-all hover:bg-gray-700 hover:text-white">
              Leyendas Italianas
            </button>
            <button className="px-6 py-2 bg-gray-800 text-gray-300 rounded-full font-medium transition-all hover:bg-gray-700 hover:text-white">
              Superdeportivos
            </button>
          </div>
        </div>
      </section>

      {/* Grid de autos */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10">
          {autos.map((auto) => (
            <div key={auto.id} className="group bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-800 hover:border-blue-500/30 transition-all duration-500 hover:scale-[1.02]">
              {/* Badge de categoría */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-blue-600/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                  {auto.categoria}
                </span>
              </div>

              {/* Imagen con efecto de zoom sutil */}
              <div className="relative h-80 w-full p-6">
                <div className="relative h-full w-full transform transition-transform duration-700 group-hover:scale-105">
                  <Image
                    src={auto.imagen}
                    alt={`${auto.nombre} ${auto.modelo || ''}`}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
                
                {/* Efecto de luz sutil */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none"></div>
              </div>

              {/* Información del auto */}
              <div className="p-8">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold text-white">{auto.nombre}</h2>
                    {auto.año && (
                      <span className="text-blue-400 font-mono bg-blue-900/30 px-3 py-1 rounded-full">
                        {auto.año}
                      </span>
                    )}
                  </div>
                  
                  {auto.modelo && (
                    <p className="text-lg text-gray-300 font-light mb-3">{auto.modelo}</p>
                  )}
                  
                  <p className="text-gray-400 italic mb-4 border-l-4 border-blue-500 pl-4">
                    {auto.descripcion}
                  </p>
                  
                  {/* Indicador 3D */}
                  <div className="flex items-center mb-4">
                    <div className={`w-3 h-3 rounded-full mr-2 ${auto.vista3D ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`}></div>
                    <span className={`text-sm ${auto.vista3D ? 'text-green-400' : 'text-gray-500'}`}>
                      {auto.vista3D ? '3D Disponible' : '3D Próximamente'}
                    </span>
                  </div>
                </div>

                {/* Botones */}
                <div className="flex justify-between items-center">
                  <Link
                    href={auto.detallesLink}
                    className="text-white hover:text-blue-300 font-medium flex items-center transition-all group/details"
                  >
                    <span className="mr-2">Más detalles</span>
                    <svg className="w-4 h-4 transform group-hover/details:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                  
                  {auto.vista3D ? (
                    <Link
                      href={`/3d-viewer?id=${auto.id}`}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full flex items-center transition-all group/3d shadow-lg hover:shadow-blue-500/20"
                    >
                      <svg className="w-5 h-5 mr-2 group-hover/3d:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      Ver en 3D
                    </Link>
                  ) : (
                    <button className="bg-gray-800 text-gray-500 px-6 py-3 rounded-full cursor-not-allowed" disabled>
                      3D no disponible
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sección de contacto mejorada */}
      <div className="bg-gradient-to-br from-gray-900 to-black py-20 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <div className="w-16 h-1 bg-blue-500 mx-auto mb-4"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">¿Buscas algo específico?</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Nuestros expertos en autos clásicos pueden ayudarte a encontrar el vehículo perfecto o accesorios personalizados.
            </p>
          </div>
          <Link
            href="/contacto"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/30"
          >
            Contactar a un experto
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">VIAGGIO VELOGGE</h3>
            <p className="text-gray-400">Galería de autos clásicos y modificados</p>
          </div>
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="text-gray-400 hover:text-white transition">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-white transition">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-white transition">Twitter</a>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Viaggio Velogge. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}