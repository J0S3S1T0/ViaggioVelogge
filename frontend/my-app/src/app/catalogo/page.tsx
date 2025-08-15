'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function CatalogoPage() {
  const [activeTab, setActiveTab] = useState('3d');
  const [hoveredCar, setHoveredCar] = useState(null);

  const cars = [
    {
      id: 1,
      name: "Buick LeSabre 1959",
      model: "Clásico Americano",
      image: "/BuickLeSabre1959.png",
      view3D: true,
      link: "/buick-lesabre"
    },
    {
      id: 2,
      name: "Ferrari 250 GT",
      model: "Leyenda Italiana",
      image: "/Ferrari250.png",
      view3D: false,
      link: "/ferrari-250"
    },
    {
      id: 3,
      name: "Chevrolet Impala 1959",
      model: "Icono Americano",
      image: "/Impala.png",
      view3D: true,
      link: "/impala"
    },
    {
      id: 4,
      name: "Ferrari Testarossa",
      model: "Supercar años 80",
      image: "/testarossa.png",
      view3D: true,
      link: "/testarossa"
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-black text-white z-50 flex justify-between items-center px-8 py-4 shadow-md">
        <div className="text-xl font-bold">VIAGGIO VELOCE</div>
        <ul className="flex gap-6">
          <li className="hover:text-blue-400 transition cursor-pointer">Home</li>
          <li className="hover:text-blue-400 transition cursor-pointer">Fotos</li>
          <li className="hover:text-blue-400 transition cursor-pointer">Acerca de</li>
          <li className="hover:text-blue-400 transition cursor-pointer">Tienda</li>
        </ul>
      </nav>

      {/* Contenido principal */}
      <div className="pt-24 pb-16 px-8">
        {/* Encabezado y tabs */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Nuestro Catálogo</h1>
          
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-900 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('3d')}
                className={`px-6 py-2 rounded-md ${activeTab === '3d' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Vista 3D
              </button>
              <button
                onClick={() => setActiveTab('clasicos')}
                className={`px-6 py-2 rounded-md ${activeTab === 'clasicos' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Clásicos
              </button>
              <button
                onClick={() => setActiveTab('deportivos')}
                className={`px-6 py-2 rounded-md ${activeTab === 'deportivos' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Deportivos
              </button>
            </div>
          </div>
        </div>

        {/* Grid de autos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cars.map((car) => (
            <div 
              key={car.id}
              className="bg-neutral-900 border border-neutral-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              onMouseEnter={() => setHoveredCar(car.id)}
              onMouseLeave={() => setHoveredCar(null)}
            >
              <div className="relative h-64">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className={`object-cover transition-opacity duration-300 ${hoveredCar === car.id ? 'opacity-80' : 'opacity-100'}`}
                />
                {hoveredCar === car.id && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-4">
                    <div>
                      <h3 className="text-xl font-bold">{car.name}</h3>
                      <p className="text-gray-300">{car.model}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{car.name}</h3>
                    <p className="text-sm text-gray-400">{car.model}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${car.view3D ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}`}>
                    {car.view3D ? '3D Disponible' : 'Próximamente'}
                  </span>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <a
                    href={car.link}
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                  >
                    Ver detalles →
                  </a>
                  <button className="text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded transition">
                    {car.view3D ? 'Ver en 3D' : 'Ver fotos'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">¿No encuentras lo que buscas?</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Contáctanos para ayudarte a encontrar el auto de tus sueños o accesorios personalizados.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition">
            Contactar a un asesor
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 px-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-bold">VIAGGIO VELOCE</span>
            <p className="text-gray-400 mt-1">Pasión por los autos desde 2010</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-white transition">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-white transition">YouTube</a>
          </div>
        </div>
      </footer>
    </div>
  );
}