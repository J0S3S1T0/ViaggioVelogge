'use client';
import Image from 'next/image';  // 'image' en minúscula
import { useEffect, useState } from 'react';  // Corregido 'userFret'

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
      d="M9 5l7 7-7 7"  // Corregido el path
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
    src: "/impala.png",
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
    link: "/ferrari250",
  }
];  // Corregido el cierre del array

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
          src="/InicioCar.jpg"
          alt="Inicio Car"
          fill
          priority
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center z-10">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-wider">VIAGGIO VELOCE</h1>
            <p className="text-xl md:text-2xl uppercase tracking-widest">PORTAFOLIO DE AUTOS</p>
          </div>
        </div>
      </div>

      {/* Navbar */}
      {showNav && (
        <nav className="fixed top-0 left-0 w-full bg-black/90 backdrop-blur-sm text-white z-50 flex justify-between items-center px-8 py-4 shadow-lg transition-all duration-500">
          <div className="text-2xl font-bold tracking-wider">VIAGGIO VELOCE</div>
          <ul className="hidden md:flex gap-8 uppercase text-sm tracking-wider">
            <li className="hover:text-gray-300 transition"><a href="#inicio">INICIO</a></li>
            <li className="hover:text-gray-300 transition"><a href="#3d-gallery">3D GALLERY</a></li>
            <li className="hover:text-gray-300 transition"><a href="#classic-cars">CLASSIC CARS</a></li>
            <li className="hover:text-gray-300 transition"><a href="#tuned-cars">TUNED CARS</a></li>
          </ul>
        </nav>
      )}

      {/* Sección 3D Gallery con Carrusel Automático */}
      <section id="3d-gallery" className="py-12 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Encabezado */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider">3D GALLERY</h2>
            <a href="/catalogo3D" className="flex items-center text-lg hover:text-blue-400 transition">
              VER TODOS <ArrowRight />
            </a>
          </div>

          {/* Contenedor del carrusel */}
          <div 
            className="relative bg-gray-900/50 border border-gray-700 rounded-xl p-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Carrusel con margen interno */}
            <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-lg">
              <div 
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {carouselItems.map((item, index) => (
                  <div key={index} className="w-full flex-shrink-0 relative">
                    {/* Contenedor de la imagen con margen */}
                    <div className="absolute inset-4 md:inset-8 flex justify-center items-center">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                    
                    {/* Botón "Explorar modelo 3D" en la parte superior derecha */}
                    <div className="absolute top-4 right-4 z-10">
                      <a
                        href={item.link}
                        className="inline-flex items-center bg-black/70 hover:bg-black/90 text-white px-4 py-2 rounded-full border border-gray-600 transition"
                      >
                        Explorar modelo 3D <ArrowRight />
                      </a>
                    </div>

                    {/* Texto superpuesto en la parte inferior */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-black/90 to-transparent">
                      <h3 className="text-2xl md:text-4xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-300 text-lg md:text-xl mb-6">{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Controles del carrusel (solo si hay más de un slide) */}
              {carouselItems.length > 1 && (
                <>
                  <button 
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                    </svg>
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>

                  {/* Indicadores de posición */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {carouselItems.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition ${currentSlide === index ? 'bg-white' : 'bg-gray-500'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Resto de las secciones (se mantienen igual) */}
      {/* Catálogo de autos clásicos */}
      <section id="classic-cars" className="py-16 px-4 md:px-8 bg-gray-900">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-wider uppercase">Colección Clásica</h2>
            <a
              href="/catalogo"
              className="flex items-center text-sm md:text-base uppercase tracking-wider hover:text-blue-400 transition"
            >
              VER TODOS <ArrowRight className="ml-1" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                src: "/BuickLeSabre1959.png",
                alt: "Buick LeSabre 1959",
                title: "Buick LeSabre 1959",
                subtitle: "Elegancia Americana",
                link: "/buick",
              },
              {
                src: "/Ferrari250.png",
                alt: "Ferrari 250 GTO",
                title: "Ferrari 250 GTO",
                subtitle: "Pura Sangre Italiana",
                link: "/ferrari250",
              }
            ].map((car, index) => (
              <div key={index} className="group relative h-[400px] overflow-hidden rounded-xl border border-gray-800 hover:border-gray-600 transition-all duration-300">
                <Image
                  src={car.src}
                  alt={car.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-2xl md:text-3xl font-bold">{car.title}</h3>
                  <p className="text-gray-300 mb-4">{car.subtitle}</p>
                  <a
                    href={car.link}
                    className="inline-flex items-center text-white hover:text-blue-400 transition"
                  >
                    Ver detalles
                    <ArrowRight className="ml-2" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galería de autos modificados */}
      <section id="tuned-cars" className="py-16 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-wider uppercase">AUTOS MODIFICADOS</h2>
            <a
              href="/galeria"
              className="flex items-center text-sm md:text-base uppercase tracking-wider hover:text-blue-400 transition"
            >
              VER TODOS <ArrowRight className="ml-1" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: "/carNSXPink.jpg", alt: "NSX Pink", title: "Acura NSX", subtitle: "Tuned Edition", link: "/nsx-pink" },
              { src: "/CarNSX.jpg", alt: "NSX Purple", title: "Acura NSX", subtitle: "Purple Beast", link: "/nsx-purple" },
              { src: "/carSilvia.jpg", alt: "Nissan Silvia", title: "Nissan Silvia", subtitle: "Drift Machine", link: "/silvia" },
              { src: "/carGrey.jpg", alt: "Toyota Supra", title: "Toyota Supra", subtitle: "MK4 Legend", link: "/supra" },
              { src: "/carCivic.jpg", alt: "Honda Civic", title: "Honda Civic", subtitle: "Street Racer", link: "/civic" },
              { src: "/carCorvetteC5.jpg", alt: "Corvette C5", title: "Corvette C5", subtitle: "American Muscle", link: "/corvette" },
              { src: "/carMazdaRX-7.jpg", alt: "Mazda RX-7", title: "Mazda RX-7", subtitle: "Rotary Power", link: "/rx7" },
              { src: "/carNissanSkilineGTR34.jpg", alt: "Skyline GTR R34", title: "Skyline GTR R34", subtitle: "Godzilla", link: "/GTR34" },
            ].map((car, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg aspect-square">
                <Image
                  src={car.src}
                  alt={car.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white font-semibold">{car.title}</h3>
                  <p className="text-gray-300 text-sm">{car.subtitle}</p>
                  <a 
                    href={car.link} 
                    className="mt-2 inline-block text-white text-sm hover:text-blue-300 transition"
                  >
                    Ver más →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold tracking-wider">VIAGGIO VELOCE</h2>
              <p className="text-gray-400 text-sm mt-2">Portafolio de autos clásicos y modificados</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Twitter</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Viaggio Veloce. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}