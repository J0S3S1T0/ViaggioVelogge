'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ArrowRight = () => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor"
    className="inline ml-1"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2" 
      d="M9 5l7 7-7 7"
    />
  </svg>
);

export default function Home() {
  const [showNav, setShowNav] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Datos para el carrusel 3D
  const carouselItems = [
    {
      src: "/catalogo3D/chevrolet/Impala/impala.png",
      alt: "Chevrolet Impala 1959",
      title: "Chevrolet Impala 1959",
      subtitle: "Clásico Americano en 3D",
      link: "/impala",
    },
    {
      src: "/testarossa.png",
      alt: "Ferrari Testarossa",
      title: "Ferrari Testarossa",
      subtitle: "Leyenda Italiana en 3D", 
      link: "/pages/catalogo/ferrari250",
    }
  ];

  // Efecto para el navbar al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY > window.innerHeight - 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efecto para el carrusel automático
  useEffect(() => {
    if (carouselItems.length <= 1) return;
    
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentSlide(prev => (prev === carouselItems.length - 1 ? 0 : prev + 1));
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [isHovered, carouselItems.length]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev === carouselItems.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? carouselItems.length - 1 : prev - 1));
  };

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <div className="relative w-screen h-screen">
        <Image
          src="/otros/InicioCar.jpg"
          alt="Inicio Car"
          fill
          priority
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center z-10">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-wider">VIAGGIO VELOGGE</h1>
            <p className="text-xl md:text-2xl uppercase tracking-widest">PORTAFOLIO DE AUTOS</p>
          </div>
        </div>
      </div>

      {/* Navbar */}
      {showNav && (
        <nav className="fixed top-0 left-0 w-full bg-black/90 backdrop-blur-sm text-white z-50 flex justify-between items-center px-8 py-4 shadow-lg transition-all duration-500">
          <div className="text-2xl font-bold tracking-wider">VIAGGIO VELOGGE</div>
          <ul className="hidden md:flex gap-8 uppercase text-sm tracking-wider">
            <li className="hover:text-gray-300 transition"><a href="#inicio">INICIO</a></li>
            <li className="hover:text-gray-300 transition"><a href="/pages/catalogo3D">3D GALLERY</a></li>
            <li className="hover:text-gray-300 transition"><a href="/pages/catalogo">CLASSIC CARS</a></li>
            <li className="hover:text-gray-300 transition"><a href="/pages/galeriaAutos">TUNED CARS</a></li>
            <li className="hover:text-gray-300 transition"><a href="/pages/tienda">Tienda</a></li>
          </ul>
        </nav>
      )}

      {/* Sección 3D Gallery con Carrusel Automático */}
      <section id="3d-gallery" className="py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Encabezado */}
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wider">3D GALLERY</h2>
            <a href="/pages/catalogo3D" className="flex items-center text-lg hover:text-blue-400 transition">
              VER TODOS <ArrowRight />
            </a>
          </div>

          {/* Contenedor del carrusel */}
          <div 
            className="relative bg-gray-900/30 border border-gray-600 rounded-xl p-6"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Carrusel con margen interno */}
            <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden rounded-lg">
              <div 
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {carouselItems.map((item, index) => (
                  <div key={index} className="w-full flex-shrink-0 relative">
                    {/* Contenedor de la imagen con mejor ajuste */}
                    <div className="absolute inset-0 flex justify-center items-center p-4 md:p-8">
                      <div className="relative w-full h-full max-w-4xl"> {/* Reducido de max-w-5xl a max-w-4xl */}
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          className="object-scale-down scale-90" /* Añadido scale-90 para hacer más pequeña */
                          priority
                          quality={90}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                        />
                      </div>
                    </div>
                    
                    {/* Botón "Explorar modelo 3D" en la parte superior derecha */}
                    <div className="absolute top-6 right-6 z-10">
                      <a
                        href={item.link}
                        className="inline-flex items-center bg-black/80 hover:bg-black text-white px-5 py-3 rounded-full border border-gray-500 transition-all hover:scale-105"
                      >
                        Explorar modelo 3D <ArrowRight />
                      </a>
                    </div>

                    {/* Texto superpuesto en la parte inferior */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-black/95 via-black/60 to-transparent">
                      <h3 className="text-3xl md:text-5xl font-bold mb-3">{item.title}</h3>
                      <p className="text-gray-300 text-xl md:text-2xl mb-6">{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Controles del carrusel (solo si hay más de un slide) */}
              {carouselItems.length > 1 && (
                <>
                  <button 
                    onClick={prevSlide}
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black text-white p-3 rounded-full transition-all hover:scale-110"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                    </svg>
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black text-white p-3 rounded-full transition-all hover:scale-110"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>

                  {/* Indicadores de posición */}
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
                    {carouselItems.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-4 h-4 rounded-full transition-all ${currentSlide === index ? 'bg-white scale-110' : 'bg-gray-500 hover:bg-gray-300'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo de autos clásicos - MEJORADO */}
      <section id="classic-cars" className="py-20 px-4 md:px-8 bg-gray-900/40">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-wider uppercase">Colección Clásica</h2>
            <a
              href="/pages/catalogo"
              className="flex items-center text-md md:text-lg uppercase tracking-wider hover:text-blue-400 transition"
            >
              VER TODOS <ArrowRight className="ml-1" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              {
                src: "/catalogo/Chevrolet/BuickLeSabre1959/BuickLeSabre1959.png",
                alt: "Buick LeSabre 1959",
                title: "Buick LeSabre 1959",
                subtitle: "Elegancia Americana",
                link: "/pages/catalogo/buickLeSabre1959",
              },
              {
                src: "/catalogo/Ferrari/ferrari250GTO/Ferrari250.png",
                alt: "Ferrari 250 GTO",
                title: "Ferrari 250 GTO",
                subtitle: "Pura Sangre Italiana",
                link: "/pages/catalogo/ferrari250",
              }
            ].map((car, index) => (
              <div key={index} className="group relative h-[370px] md:h-[500px] w-full overflow-hidden rounded-2xl border border-gray-700 hover:border-gray-400 transition-all duration-500 hover:shadow-2xl">
                <div className="relative w-full h-full">
                  <Image
                    src={car.src}
                    alt={car.alt}
                    fill
                    className="object-scale-down scale-90 transition-transform duration-700 group-hover:scale-100" /* scale-90 hace la imagen más pequeña */
                    quality={90}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-10">
                  <h3 className="text-3xl md:text-4xl font-bold mb-3">{car.title}</h3>
                  <p className="text-gray-300 text-xl mb-6">{car.subtitle}</p>
                  <a
                    href={car.link}
                    className="inline-flex items-center text-white text-lg hover:text-blue-400 transition-all hover:translate-x-2"
                  >
                    Ver detalles
                    <ArrowRight className="ml-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-black border-t border-gray-700 py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h2 className="text-3xl font-bold tracking-wider">VIAGGIO VELOGGE</h2>
              <p className="text-gray-400 text-lg mt-3">Portafolio de autos clásicos y modificados</p>
            </div>
            <div className="flex space-x-8 text-lg">
              <a href="#" className="text-gray-400 hover:text-white transition">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Twitter</a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-500 text-md">
            © {new Date().getFullYear()} Viaggio Velogge. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}