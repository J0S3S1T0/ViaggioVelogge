'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Componente de ícono personalizado
const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline ml-1">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.3-4.3"/>
  </svg>
);

const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);

export default function CatalogoPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [showFilters, setShowFilters] = useState(false);

  // Datos de los autos
  const cars = [
    {
      id: 1,
      name: "Honda NSX",
      model: "Honda",
      year: 1959,
      description: "Clásico americano con estilo único y elegancia atemporal. Un icono de la industria automotriz que representa la grandeza de los años 50.",
      image: "/catalogo/Honda/hondaNSX/HondaNSX.png",
      views: "Detalles",
      link: "/pages/catalogo/hondaNSX",
      category: "clasico"
    },
    {
      id: 2,
      name: "Ferrari Testarossa",
      model: "Ferrari Testarossa",
      year: 1984,
      description: "Deportivo italiano icónico de los años 80 con diseño aerodinámico y un motor de 12 cilindros que marcó una era en los superdeportivos.",
      image: "/catalogo3D/chevrolet/Ferrari/Testarossa/testarossa.png",
      views: "Detalles",
      link: "/testarossa",
      category: "deportivo"
    },
    {
      id: 3,
      name: "Buick LeSabre 1959",
      model: "Buick LeSabre",
      year: 1959,
      description: "Elegancia americana con detalles cromados y un interior lujoso. Representa el estilo y la comodidad de la época dorada de los automóviles americanos.",
      image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      views: "Detalles",
      link: "/pages/catalogo/buickLeSabre1959",
      category: "clasico"
    },
    {
      id: 4,
      name: "Ferrari 250 GTO",
      model: "Ferrari 250 GTO",
      year: 1962,
      description: "Una de las piezas más codiciadas del mundo automotriz, con solo 36 unidades fabricadas. Considerada la obra maestra de Enzo Ferrari.",
      image: "/catalogo/Ferrari/ferrari250GTO/Ferrari250.png",
      views: "Detalles",
      link: "/pages/catalogo/ferrari250",
      category: "leyenda"
    },
    {
      id: 5,
      name: "Mustang 1967",
      model: "Ford Mustang",
      year: 1967,
      description: "El muscle car americano por excelencia, potente y con actitud. Revolucionó el mercado con su diseño agresivo y accesible.",
      image: "https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      views: "Detalles",
      link: "/mustang",
      category: "muscle"
    },
    {
      id: 6,
      name: "Porsche 911",
      model: "Porsche 911 Carrera",
      year: 1973,
      description: "Deportivo alemán con diseño icónico y rendimiento excepcional. Un legado que perdura por más de cinco décadas con evolución constante.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      views: "Detalles",
      link: "/porsche",
      category: "deportivo"
    },
    {
      id: 7,
      name: "Volkswagen Escarabajo",
      model: "VW Beetle",
      year: 1965,
      description: "El auto del pueblo, con un diseño reconocible en todo el mundo. Símbolo de una era y uno de los automóviles más vendidos de la historia.",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      views: "Detalles",
      link: "/beetle",
      category: "clasico"
    },
    {
      id: 8,
      name: "Jaguar E-Type",
      model: "Jaguar E-Type",
      year: 1961,
      description: "Considerado uno de los autos más bellos jamás fabricados. Enzo Ferrari lo describió como 'el automóvil más bonito del mundo'.",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      views: "Detalles",
      link: "/jaguar",
      category: "leyenda"
    }
  ];

  // Obtener categorías únicas
  const categories = ['todos', ...new Set(cars.map(car => car.category))];

  // Filtrar autos según búsqueda y categoría
  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          car.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todos' || car.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-gray-200 pt-16"> {/* Añadido pt-16 para compensar la altura del navbar fijo */}
      {/* Navbar fijo siempre */}
      <nav className="fixed top-0 left-0 w-full bg-black/95 backdrop-blur-sm text-white z-50 flex justify-between items-center px-8 py-4 shadow-xl">
        <div className="text-2xl font-bold tracking-wider">VIAGGIO VELOGGE</div>
        <ul className="hidden md:flex gap-8 uppercase text-sm tracking-wider">
          <li className="hover:text-blue-400 transition"><Link href="/">INICIO</Link></li>
          <li className="hover:text-blue-400 transition"><Link href="/galeriaAutos">GALERÍA</Link></li>
          <li className="hover:text-blue-400 transition"><Link href="/catalogo3D">CATÁLOGO 3D</Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-12 px-4 md:px-8 text-center"> {/* Cambiado de relative pt-24 a pt-24 solamente */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
          COLECCIÓN CLÁSICA
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
          Descubre nuestra colección de automóviles emblemáticos
        </p>

        {/* Barra de búsqueda y filtros */}
        <div className="max-w-2xl mx-auto">
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Buscar autos por nombre, modelo o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          {/* Botón toggle para filtros en móvil */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-2 bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors mb-4 border border-gray-800"
          >
            <FilterIcon />
            <span>{showFilters ? 'Ocultar' : 'Mostrar'} Filtros</span>
          </button>

          {/* Filtros de categoría */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-700 text-white'
                      : 'bg-gray-900 text-gray-400 hover:bg-gray-800 border border-gray-800'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contador de resultados */}
      <div className="container mx-auto px-4 md:px-8 mb-6">
        <p className="text-gray-500 text-center">
          Mostrando {filteredCars.length} de {cars.length} autos
          {searchTerm && ` para "${searchTerm}"`}
          {selectedCategory !== 'todos' && ` en ${selectedCategory}`}
        </p>
      </div>

      {/* Grid de autos - ESTILO MEJORADO */}
      <div className="container mx-auto px-4 md:px-8 pb-16">
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <div key={car.id} className="group bg-gray-900 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-blue-900/20 transform hover:-translate-y-1 transition-all duration-500">
                {/* Imagen del auto - ESTILO MEJORADO */}
                <div className="relative h-72 w-full overflow-hidden flex justify-center items-center">
                  <div className="relative w-full h-full">
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      className="object-scale-down scale-90 transition-transform duration-700 group-hover:scale-100"
                      quality={90}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {car.views}
                  </div>
                </div>

                {/* Contenido de la tarjeta - ESTILO MEJORADO */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-white">{car.name}</h3>
                  <p className="text-gray-400 text-base mb-3">{car.model} • {car.year}</p>
                  <p className="text-gray-400 text-sm mb-5 line-clamp-2">{car.description}</p>
                  
                  <div className="border-t border-gray-800 pt-4 mt-4">
                    <Link
                      href={car.link}
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors group-hover:gap-3"
                    >
                      Explorar detalles <ArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl text-gray-500 mb-2">No se encontraron autos</h3>
            <p className="text-gray-600">Intenta con otros términos de búsqueda o filtros</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h2 className="text-2xl font-bold tracking-wider text-white">VIAGGIO VELOGGE</h2>
              <p className="text-gray-500 mt-2">Galería de autos clásicos</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-white transition">Instagram</a>
              <a href="#" className="text-gray-500 hover:text-white transition">Facebook</a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-600">
            © {new Date().getFullYear()} Viaggio Velogge. Todos los derechos reservados.
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Scrollbar personalizada */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #111827;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #374151;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #4B5563;
        }
      `}</style>
    </div>
  );
}