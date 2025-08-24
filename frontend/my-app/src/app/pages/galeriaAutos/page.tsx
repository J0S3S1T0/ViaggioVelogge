'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Simulamos los íconos de Lucide React para evitar dependencias
const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/>
    <path d="m6 6 12 12"/>
  </svg>
);

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6"/>
  </svg>
);

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

export default function GaleriaPinterest() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [showNav, setShowNav] = useState(false);
  
  // Datos de los autos - usando imágenes de placeholder para evitar errores
  const cars = [
    { src: "/galeria/toyotaMK4/carGrey.jpg", alt: "NSX Pink", title: "Acura NSX", subtitle: "Tuned Edition", link: "/nsx-pink", width: 400, height: 600 },
    { src: "/galeria/mazdaRX-7/carMazdaRX-7.jpg", alt: "NSX Purple", title: "Acura NSX", subtitle: "Purple Beast", link: "/nsx-purple", width: 400, height: 500 },
    { src: "/galeria/civic/carCivic.jpg", alt: "Nissan Silvia", title: "Nissan Silvia", subtitle: "Drift Machine", link: "/silvia", width: 400, height: 700 },
    { src: "/galeria/corvetteC5/carCorvetteC5.jpg", alt: "Toyota Supra", title: "Toyota Supra", subtitle: "MK4 Legend", link: "/supra", width: 400, height: 550 },
    { src: "/galeria/NissanSkilineGTR34/carNissanSkilineGtR34.jpg", alt: "Honda Civic", title: "Honda Civic", subtitle: "Street Racer", link: "/GTR34", width: 400, height: 650 },
    { src: "/galeria/NSX/carNSX.jpg", alt: "Corvette C5", title: "Corvette C5", subtitle: "American Muscle", link: "/corvette", width: 400, height: 500 },
    { src: "/galeria/NSX/carNSXPink.jpg", alt: "Mazda RX-7", title: "Mazda RX-7", subtitle: "Rotary Power", link: "/rx7", width: 400, height: 750 },
    { src: "/galeria/silvia/carSilvia.jpg", alt: "Skyline GTR R34", title: "Skyline GTR R34", subtitle: "Godzilla", link: "/GTR34", width: 400, height: 600 },
    { src: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=400&h=550&fit=crop", alt: "NSX Pink 2", title: "Acura NSX", subtitle: "Tuned Edition", link: "/nsx-pink", width: 400, height: 550 },
    { src: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=400&h=700&fit=crop", alt: "NSX Purple 2", title: "Acura NSX", subtitle: "Purple Beast", link: "/nsx-purple", width: 400, height: 700 },
    { src: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=400&h=500&fit=crop", alt: "Nissan Silvia 2", title: "Nissan Silvia", subtitle: "Drift Machine", link: "/silvia", width: 400, height: 500 },
    { src: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=650&fit=crop", alt: "Toyota Supra 2", title: "Toyota Supra", subtitle: "MK4 Legend", link: "/supra", width: 400, height: 650 },
  ];

  // Efecto para animación de entrada
  useEffect(() => {
    setLoaded(true);
  }, []);

  // Efecto para el navbar al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para abrir el modal
  const openModal = (car) => {
    setSelectedImage(car);
    document.body.style.overflow = 'hidden';
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  // Navegar entre imágenes en el modal
  const navigateImage = (direction) => {
    const currentIndex = cars.findIndex(car => car.src === selectedImage.src);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % cars.length;
    } else {
      newIndex = (currentIndex - 1 + cars.length) % cars.length;
    }
    
    setSelectedImage(cars[newIndex]);
  };

  // Manejar teclas en el modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage) {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') navigateImage('next');
        if (e.key === 'ArrowLeft') navigateImage('prev');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
        {/* Hero Section */}
        <div className="relative w-screen h-screen">
          <img
            src="/otros/inicioGaleria.png"
            alt="Inicio Car"
            className="object-cover opacity-90 w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center z-10">
              <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-wider">VIAGGIO VELOCE</h1>
              <p className="text-xl md:text-2xl uppercase tracking-widest">GALERÍA DE AUTOS MODIFICADOS</p>
            </div>
          </div>
        </div>

        {/* Navbar */}
        {showNav && (
          <nav className="fixed top-0 left-0 w-full bg-black/90 backdrop-blur-sm text-white z-50 flex justify-between items-center px-8 py-4 shadow-lg transition-all duration-500">
            <div className="text-2xl font-bold tracking-wider">VIAGGIO VELOCE</div>
            <ul className="hidden md:flex gap-8 uppercase text-sm tracking-wider">
              <li className="hover:text-gray-300 transition"><a href="/">INICIO</a></li>
              <li className="hover:text-gray-300 transition"><a href="/#3d-gallery">3D GALLERY</a></li>
              <li className="hover:text-gray-300 transition"><a href="/#classic-cars">CLASSIC CARS</a></li>
              <li className="hover:text-gray-300 transition"><a href="/galeriaAutos">TUNED CARS</a></li>
            </ul>
          </nav>
        )}

        {/* Galería estilo Pinterest */}
        <main className="container mx-auto max-w-7xl px-4 md:px-8 py-12">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-wider uppercase">AUTOS MODIFICADOS</h2>
            <div className="text-md md:text-lg uppercase tracking-wider">
              Total: {cars.length} autos
            </div>
          </div>

          <div className={`columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6 transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            {cars.map((car, index) => (
              <div 
                key={index} 
                className="break-inside-avoid group relative overflow-hidden rounded-xl bg-gray-800 border border-gray-700 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 mb-6 cursor-pointer transform hover:-translate-y-1"
                onClick={() => openModal(car)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative w-full" style={{ height: `${car.height}px` }}>
                  {/* Usamos img normal en lugar de Next/Image */}
                  <img
                    src={car.src}
                    alt={car.alt}
                    width={car.width}
                    height={car.height}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Overlay con información */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
                    <h3 className="text-white font-bold text-xl mb-1">{car.title}</h3>
                    <p className="text-gray-300 text-md mb-4">{car.subtitle}</p>
                    <div className="inline-flex items-center text-white text-md group-hover:text-blue-300 transition-all group-hover:translate-x-1">
                      Ver más <ArrowRight />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Modal para imagen seleccionada */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={closeModal}>
            <div className="relative max-w-6xl w-full max-h-full" onClick={(e) => e.stopPropagation()}>
              {/* Botón cerrar */}
              <button 
                className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-red-500 rounded-full p-2 transition-colors"
                onClick={closeModal}
                aria-label="Cerrar modal"
              >
                <XIcon />
              </button>
              
              {/* Botones de navegación */}
              <button 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/70 hover:bg-blue-600 rounded-full p-2 transition-colors"
                onClick={() => navigateImage('prev')}
                aria-label="Imagen anterior"
              >
                <ChevronLeft />
              </button>
              
              <button 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/70 hover:bg-blue-600 rounded-full p-2 transition-colors"
                onClick={() => navigateImage('next')}
                aria-label="Siguiente imagen"
              >
                <ChevronRight />
              </button>
              
              {/* Contenido del modal */}
              <div className="bg-gray-900 rounded-xl overflow-hidden">
                <div className="relative h-[70vh] flex items-center justify-center">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="object-contain max-w-full max-h-full"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h2>
                  <p className="text-gray-300 text-lg mb-4">{selectedImage.subtitle}</p>
                  <Link 
                    href={selectedImage.link}
                    className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Ver detalles completos <ArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-black border-t border-gray-700 py-16 px-4 md:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-8 md:mb-0">
                <h2 className="text-3xl font-bold tracking-wider">VIAGGIO VELOCE</h2>
                <p className="text-gray-400 text-lg mt-3">Portafolio de autos clásicos y modificados</p>
              </div>
              <div className="flex space-x-8 text-lg">
                <a href="#" className="text-gray-400 hover:text-white transition">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white transition">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white transition">Twitter</a>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-500 text-md">
              © {new Date().getFullYear()} Viaggio Veloce. Todos los derechos reservados.
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .break-inside-avoid {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        /* Scrollbar personalizada */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1f2937;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </>
  );
}