'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

// Iconos personalizados
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

const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

export default function GaleriaAutosModificados() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [activeFilter, setActiveFilter] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Datos de los autos con información más detallada
  const cars = [
    { 
      id: 1,
      src: "/galeria/toyotaMK4/carGrey.jpg", 
      alt: "Toyota Supra MK4", 
      title: "Toyota Supra MK4", 
      subtitle: "Legendary 2JZ Power", 
      description: "Modificación completa con motor 2JZ-GTE, turbo grande y carrocería ampliada. Potencia estimada: 800HP.",
      specs: ["2JZ-GTE Engine", "Garrett Turbo", "Widebody Kit", "800HP"],
      link: "/supra-mk4",
      category: "jdm",
      year: "1998",
      tags: ["jdm", "supra", "2jz", "turbo"]
    },
    { 
      id: 2,
      src: "/galeria/mazdaRX-7/carMazdaRX-7.jpg", 
      alt: "Mazda RX-7 FD", 
      title: "Mazda RX-7 FD", 
      subtitle: "Rotary Revolution", 
      description: "RX-7 con motor rotativo 13B-REW twin turbo, kit de carrocería RE Amemiya y suspensión ajustable.",
      specs: ["13B-REW Engine", "Twin Turbo", "RE Amemiya Kit", "350HP"],
      link: "/rx7-fd",
      category: "jdm",
      year: "1995",
      tags: ["jdm", "rx7", "rotary", "jdm"]
    },
    { 
      id: 3,
      src: "/galeria/civic/carCivic.jpg", 
      alt: "Honda Civic Type R", 
      title: "Honda Civic Type R", 
      subtitle: "Track Ready", 
      description: "Civic Type R con ajustes de motor, suspensión coilover y aerodinámica mejorada para pista.",
      specs: ["K20C1 Engine", "Coilover Suspension", "Aero Kit", "350HP"],
      link: "/civic-type-r",
      category: "jdm",
      year: "2020",
      tags: ["jdm", "honda", "fwd", "track"]
    },
    { 
      id: 4,
      src: "/galeria/corvetteC5/carCorvetteC5.jpg", 
      alt: "Chevrolet Corvette C5", 
      title: "Chevrolet Corvette C5", 
      subtitle: "American Muscle", 
      description: "Corvette C5 con motor LS3 swap, supercargador y llantas personalizadas. Potencia: 650HP.",
      specs: ["LS3 Engine", "Supercharger", "Custom Wheels", "650HP"],
      link: "/corvette-c5",
      category: "muscle",
      year: "2002",
      tags: ["american", "corvette", "v8", "muscle"]
    },
    { 
      id: 5,
      src: "/galeria/NissanSkilineGTR34/carNissanSkilineGtR34.jpg", 
      alt: "Nissan Skyline GT-R R34", 
      title: "Nissan Skyline GT-R R34", 
      subtitle: "Godzilla", 
      description: "Skyline GT-R R34 con motor RB26DETT mejorado, turbo twins actualizados y sistema AWD perfeccionado.",
      specs: ["RB26DETT Engine", "Twin Turbo", "AWD System", "600HP"],
      link: "/pages/galeriaAutos/GTR34",
      category: "jdm",
      year: "2000",
      tags: ["jdm", "skyline", "gtr", "awd"]
    },
    { 
      id: 6,
      src: "/galeria/NSX/carNSX.jpg", 
      alt: "Acura NSX", 
      title: "Acura NSX", 
      subtitle: "Japanese Supercar", 
      description: "NSX primera generación con motor V6 biturbo, carrocería reducida y suspensión de carreras.",
      specs: ["C30A Engine", "Twin Turbo", "Race Suspension", "450HP"],
      link: "/nsx",
      category: "jdm",
      year: "1995",
      tags: ["jdm", "nsx", "supercar", "mid-engine"]
    },
    { 
      id: 7,
      src: "/galeria/NSX/carNSXPink.jpg", 
      alt: "Acura NSX Pink", 
      title: "Acura NSX", 
      subtitle: "Pink Edition", 
      description: "NSX con wrap rosa, alerón voladizo y motor VTEC mejorado. Un tributo a la cultura japonesa.",
      specs: ["C30A Engine", "VTEC System", "Big Wing", "400HP"],
      link: "/nsx-pink",
      category: "jdm",
      year: "1993",
      tags: ["jdm", "nsx", "vtec", "showcar"]
    },
    { 
      id: 8,
      src: "/galeria/silvia/carSilvia.jpg", 
      alt: "Nissan Silvia S15", 
      title: "Nissan Silvia S15", 
      subtitle: "Drift Machine", 
      description: "Silvia S15 preparada para drift con motor SR20DET, diferencial autoblocante y jaula de seguridad.",
      specs: ["SR20DET Engine", "Welded Diff", "Roll Cage", "350HP"],
      link: "/silvia-s15",
      category: "drift",
      year: "2000",
      tags: ["jdm", "silvia", "drift", "sr20"]
    }
  ];

  // Categorías para filtrado
  const categories = [
    { id: 'todos', name: 'Todos los autos' },
    { id: 'jdm', name: 'JDM' },
    { id: 'muscle', name: 'Muscle Cars' },
    { id: 'drift', name: 'Drift' }
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
  const navigateImage = useCallback((direction) => {
    const currentIndex = cars.findIndex(car => car.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % cars.length;
    } else {
      newIndex = (currentIndex - 1 + cars.length) % cars.length;
    }
    
    setSelectedImage(cars[newIndex]);
  }, [selectedImage, cars]);

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
  }, [selectedImage, navigateImage]);

  // Filtrar autos según categoría y búsqueda
  const filteredCars = cars.filter(car => {
    const matchesCategory = activeFilter === 'todos' || car.category === activeFilter;
    const matchesSearch = searchQuery === '' || 
      car.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
        {/* Hero Section con parallax */}
        <div className="relative w-full h-screen overflow-hidden">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-fixed scale-110"
            style={{ backgroundImage: "url('/otros/inicioGaleria.png')" }}
          />
          <div className="absolute inset-0 bg-black/60 z-1" />
          <div className="relative z-2 h-full flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-wider animate-fade-in">
                VIAGGIO VELOCCE
              </h1>
              <p className="text-xl md:text-2xl uppercase tracking-widest mb-8 animate-fade-in-up">
                GALERÍA DE AUTOS MODIFICADOS
              </p>
              <div className="animate-fade-in-up delay-300">
                <button 
                  onClick={() => document.getElementById('gallery-grid').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  Explorar Galería
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Imagen destacada de Viaggio Velogge */}
        <div className="container mx-auto max-w-6xl px-4 mb-12 mt-8">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
            <img
              src="/otros/inicioGaleria4.png" // Ruta de la imagen de Viaggio Velogge
              alt="Viaggio Velogge - Auto destacado"
              className="w-full h-80 md:h-[32rem] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-8">
              <div className="text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">VIAGGIO VELOCCE</h2>
                <p className="text-gray-300 max-w-2xl text-lg md:text-xl">
                  Descubre el arte de la modificación automotriz con nuestros proyectos más exclusivos. 
                  Cada auto es una obra de velocidad y estilo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navbar */}
        {showNav && (
          <nav className="fixed top-0 left-0 w-full bg-black/90 backdrop-blur-sm text-white z-50 flex justify-between items-center px-8 py-4 shadow-lg transition-all duration-500">
            <div className="text-2xl font-bold tracking-wider">VIAGGIO VELOCCE</div>
            <ul className="hidden md:flex gap-8 uppercase text-sm tracking-wider">
              <li className="hover:text-gray-300 transition"><a href="/">INICIO</a></li>
              <li className="hover:text-gray-300 transition"><a href="/#3d-gallery">3D GALLERY</a></li>
              <li className="hover:text-gray-300 transition"><a href="/#classic-cars">CLASSIC CARS</a></li>
              <li className="hover:text-gray-300 transition"><a href="/galeriaAutos">TUNED CARS</a></li>
            </ul>
          </nav>
        )}

        {/* Filtros y búsqueda */}
        <section className="py-12 bg-gray-800/50 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
              <h2 className="text-3xl font-bold">Explora Nuestra Galería</h2>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Buscar autos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute left-3 top-2.5 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                
                <div className="relative">
                  <select
                    value={activeFilter}
                    onChange={(e) => setActiveFilter(e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-2.5 pointer-events-none text-gray-400">
                    <FilterIcon />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Etiquetas de filtros activos */}
            {(activeFilter !== 'todos' || searchQuery) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {activeFilter !== 'todos' && (
                  <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full flex items-center">
                    {categories.find(c => c.id === activeFilter)?.name}
                    <button 
                      onClick={() => setActiveFilter('todos')}
                      className="ml-2 text-xs rounded-full hover:bg-blue-700 p-1"
                    >
                      <XIcon className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="bg-purple-600 text-white text-sm px-3 py-1 rounded-full flex items-center">
                    Búsqueda: {searchQuery}
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="ml-2 text-xs rounded-full hover:bg-purple-700 p-1"
                    >
                      <XIcon className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Galería estilo Pinterest */}
        <main id="gallery-grid" className="container mx-auto max-w-7xl px-4 md:px-8 py-12">
          {filteredCars.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No se encontraron resultados</h3>
              <p className="text-gray-400">Intenta con otros términos de búsqueda o categorías</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <p className="text-lg text-gray-300">
                  Mostrando {filteredCars.length} de {cars.length} autos
                </p>
              </div>

              <div className={`columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6 transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
                {filteredCars.map((car, index) => (
                  <div 
                    key={car.id} 
                    className="break-inside-avoid group relative overflow-hidden rounded-xl bg-gray-800 border border-gray-700 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 mb-6 cursor-pointer transform hover:-translate-y-1"
                    onClick={() => openModal(car)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative w-full h-80">
                      {/* Usamos img normal en lugar de Next/Image */}
                      <img
                        src={car.src}
                        alt={car.alt}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* Badge de categoría */}
                      <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-2 py-1 rounded-full uppercase tracking-wider">
                        {car.category}
                      </div>
                      
                      {/* Overlay con información */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
                        <h3 className="text-white font-bold text-xl mb-1">{car.title}</h3>
                        <p className="text-gray-300 text-md mb-2">{car.subtitle}</p>
                        <div className="text-xs text-gray-400 mb-3">{car.year}</div>
                        
                        <div className="flex flex-wrap gap-1 mb-4">
                          {car.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="inline-flex items-center text-white text-md group-hover:text-blue-300 transition-all group-hover:translate-x-1">
                          Ver detalles <ArrowRight />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>

        {/* Modal para imagen seleccionada */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={closeModal}>
            <div className="relative max-w-6xl w-full max-h-full" onClick={(e) => e.stopPropagation()}>
              {/* Botón cerrar */}
              <button 
                className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-red-500 rounded-full p-3 transition-colors"
                onClick={closeModal}
                aria-label="Cerrar modal"
              >
                <XIcon />
              </button>
              
              {/* Botones de navegación */}
              <button 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/70 hover:bg-blue-600 rounded-full p-3 transition-colors"
                onClick={() => navigateImage('prev')}
                aria-label="Imagen anterior"
              >
                <ChevronLeft />
              </button>
              
              <button 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/70 hover:bg-blue-600 rounded-full p-3 transition-colors"
                onClick={() => navigateImage('next')}
                aria-label="Siguiente imagen"
              >
                <ChevronRight />
              </button>
              
              {/* Contenido del modal */}
              <div className="bg-gray-900 rounded-xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row">
                <div className="relative w-full md:w-1/2 h-96 md:h-auto">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="object-cover w-full h-full"
                  />
                </div>
                
                <div className="w-full md:w-1/2 p-6 overflow-y-auto">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full uppercase">
                      {selectedImage.category}
                    </span>
                    <span className="text-gray-400 text-sm">{selectedImage.year}</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h2>
                  <p className="text-gray-300 text-lg mb-4">{selectedImage.subtitle}</p>
                  
                  <p className="text-gray-400 mb-6">{selectedImage.description}</p>
                  
                  <div className="mb-6">
                    <h3 className="text-white font-semibold mb-2">Especificaciones:</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedImage.specs.map((spec, i) => (
                        <div key={i} className="bg-gray-800 text-gray-300 text-sm px-3 py-2 rounded">
                          {spec}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-white font-semibold mb-2">Etiquetas:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedImage.tags.map((tag, i) => (
                        <span key={i} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
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
                <h2 className="text-3xl font-bold tracking-wider">VIAGGIO VELOCCE</h2>
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
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
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