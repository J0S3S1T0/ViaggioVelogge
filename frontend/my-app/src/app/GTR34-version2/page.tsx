'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="inline ml-1">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
  </svg>
);

export default function CarDetailPage() {
  const [showNav, setShowNav] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Datos del carro (ejemplo Skyline R34)
  const carData = {
    name: "Nissan Skyline GT-R R34",
    color: "Púrpura Metálico",
    images: [
      "/skyline-exterior-1.jpg",
      "/skyline-exterior-2.jpg"
    ],
    specs: {
      body: {
        title: "Carrocería C-West",
        description: "Kit completo con parachoques, faldones y guardabarros personalizados",
        details: [
          "Parachoques delantero con entradas de aire ampliadas",
          "Faldones laterales extendidos 5cm",
          "Guardabarros ensanchados 30mm",
          "Capó con ventilaciones adicionales"
        ]
      },
      engine: {
        title: "Motor RB26DETT",
        description: "2.8L Twin-Turbo con 720HP",
        details: [
          "Cilindrada aumentada a 2.8L",
          "Turbos Garrett G30-770",
          "Intercooler más grande",
          "Sistema de escape completo"
        ]
      }
    }
  };

  // Efecto para el navbar
  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cambiar imágenes automáticamente
  useEffect(() => {
    if (carData.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImage(prev => (prev === carData.images.length - 1 ? 0 : prev + 1));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [carData.images.length]);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar */}
      {showNav && (
        <nav className="fixed top-0 left-0 w-full bg-black/90 backdrop-blur-sm text-white z-50 flex justify-between items-center px-8 py-4 shadow-lg transition-all duration-500">
          <Link href="/" className="text-2xl font-bold tracking-wider">VIAGGIO VELOCE</Link>
          <ul className="hidden md:flex gap-8 uppercase text-sm tracking-wider">
            <li className="hover:text-gray-300 transition"><Link href="#inicio">INICIO</Link></li>
            <li className="hover:text-gray-300 transition"><Link href="#3d-gallery">3D GALLERY</Link></li>
            <li className="hover:text-gray-300 transition"><Link href="#classic-cars">CLASSIC CARS</Link></li>
            <li className="hover:text-gray-300 transition"><Link href="#tuned-cars">TUNED CARS</Link></li>
          </ul>
        </nav>
      )}

      {/* Hero Section */}
      <div className="relative w-full h-screen" id="inicio">
        <Image
          src={carData.images[currentImage]}
          alt={carData.name}
          fill
          priority
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end pb-16">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-2">{carData.name}</h1>
            <p className="text-xl md:text-2xl text-purple-400 uppercase tracking-widest">{carData.color}</p>
          </div>
        </div>

        {/* Indicadores del carrusel */}
        {carData.images.length > 1 && (
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
            {carData.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-3 h-3 rounded-full transition ${currentImage === index ? 'bg-white' : 'bg-gray-500'}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Sección de Especificaciones */}
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Carrocería */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-purple-400">{carData.specs.body.title}</h2>
                <p className="text-gray-300">{carData.specs.body.description}</p>
              </div>
              <button 
                onClick={() => setActiveModal('body')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded text-sm"
              >
                Info
              </button>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="/skyline-body-detail.jpg"
                alt="Detalle carrocería"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Motor */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-purple-400">{carData.specs.engine.title}</h2>
                <p className="text-gray-300">{carData.specs.engine.description}</p>
              </div>
              <button 
                onClick={() => setActiveModal('engine')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded text-sm"
              >
                Info
              </button>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="/skyline-engine-detail.jpg"
                alt="Detalle motor"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modales */}
      {activeModal === 'body' && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-md w-full">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h3 className="text-xl font-bold">Detalles de Carrocería</h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-white">
                ✕
              </button>
            </div>
            <div className="p-6">
              <ul className="list-disc pl-5 space-y-2">
                {carData.specs.body.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'engine' && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-md w-full">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h3 className="text-xl font-bold">Detalles de Motor</h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-white">
                ✕
              </button>
            </div>
            <div className="p-6">
              <ul className="list-disc pl-5 space-y-2">
                {carData.specs.engine.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}