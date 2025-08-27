'use client';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

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

const CloseIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// Componente para ítems de especificación con información
const SpecItem = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-800 pb-6 mb-6 last:border-0 last:pb-0 last:mb-0">
      <div className="flex justify-between items-center">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex-1 flex justify-between items-center text-left group"
        >
          <h3 className="text-xl md:text-2xl font-bold tracking-wider group-hover:text-purple-400 transition-colors">
            {title}
          </h3>
          <span className="text-2xl text-gray-400 group-hover:text-purple-400 transition-colors">
            {isOpen ? '−' : '+'}
          </span>
        </button>
      </div>
      
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'mt-4' : 'h-0'}`}>
        {children}
      </div>
    </div>
  );
};

// Componente para elementos de lista con información
const SpecDetail = ({ title, value }: { title: string; value: string }) => {
  return (
    <li className="flex items-start">
      <span className="text-purple-400 font-medium w-32 flex-shrink-0">{title}:</span>
      <div className="flex-1">
        <span>{value}</span>
      </div>
    </li>
  );
};

export default function SkylineR34() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh]">
        <Image
          src="/carNissanSkilineGTR34.jpg"
          alt="Nissan Skyline GT-R R34"
          fill
          priority
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end pb-16">
          <div className="container mx-auto px-4 md:px-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-2">Nissan Skyline GT-R R34</h1>
            <p className="text-xl md:text-2xl text-purple-400 uppercase tracking-widest">Godzilla Modificado</p>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="container mx-auto px-4 md:px-8 pt-6">
        <Link 
          href="/pages/galeriaAutos" 
          className="inline-flex items-center text-gray-400 hover:text-white transition"
        >
          ← Volver a la galería
        </Link>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Car Images */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
              <Image
                src="/carNissanSkilineGTR34.jpg"
                alt="Skyline GT-R R34 Front"
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-2">
                <Image
                  src="/carNissanSkilineGTR34Interior.jpg"
                  alt="Skyline Engine"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-2">
                <Image
                  src="/carNissanSkilineGTR34Motor.jpg"
                  alt="Skyline Interior"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Specifications */}
          <div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 sticky top-6">
              <h2 className="text-2xl md:text-3xl font-bold tracking-wider mb-6 border-b border-gray-800 pb-4">
                ESPECIFICACIONES
              </h2>

              <SpecItem title="Carrocería y Diseño">
                <ul className="space-y-3 text-gray-300">
                  <SpecDetail title="Kit" value="C-West completo" />
                  <SpecDetail title="Parachoques" value="Fibra de carbono con entradas ampliadas" />
                  <SpecDetail title="Faldones" value="Extensión de 5 cm" />
                  <SpecDetail title="Guardabarros" value="Ensanchados 30 mm" />
                  <SpecDetail title="Pintura" value="Púrpura metálico (LV4) con barniz anti-UV" />
                </ul>
              </SpecItem>

              <SpecItem title="Motor y Rendimiento">
                <ul className="space-y-3 text-gray-300">
                  <SpecDetail title="Motor" value="RB26DETT 2.8L Stroker" />
                  <SpecDetail title="Turbo" value="Garrett G30-770 twin-turbo" />
                  <SpecDetail title="Potencia" value="720 HP @ 7,200 rpm" />
                  <SpecDetail title="Par" value="780 Nm @ 4,000 rpm" />
                  <SpecDetail title="Transmisión" value="Getrag 6-speed + OS Giken" />
                </ul>
              </SpecItem>

              <SpecItem title="Suspensión y Frenos">
                <ul className="space-y-3 text-gray-300">
                  <SpecDetail title="Suspensión" value="Öhlins DFV ajustable" />
                  <SpecDetail title="Frenos" value="Brembo GT 380mm/355mm" />
                  <SpecDetail title="Llantas" value="Volk TE37 Ultra 19" />
                  <SpecDetail title="Neumáticos" value="Michelin Pilot Sport 4S" />
                </ul>
              </SpecItem>

              <SpecItem title="Aerodinámica">
                <ul className="space-y-3 text-gray-300">
                  <SpecDetail title="Alerón" value="C-West GT ajustable" />
                  <SpecDetail title="Splitter" value="Fibra de carbono 150mm" />
                  <SpecDetail title="Difusor" value="Canales verticales" />
                  <SpecDetail title="Downforce" value="+120kg @ 200km/h" />
                </ul>
              </SpecItem>

              <div className="mt-8 pt-6 border-t border-gray-800">
                <Link 
                  href="/modelo3d/skyline-r34" 
                  className="inline-flex items-center justify-center w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg transition-colors"
                >
                  Ver modelo 3D interactivo <ArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nueva sección de componentes y motores */}
      <div className="bg-gray-900/50 border-t border-gray-800 py-12 px-4 md:px-8">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-wider mb-8 text-center">EXPLORA MÁS COMPONENTES</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Componentes */}
            <div className="bg-gray-800 rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold mb-4 text-purple-400">Componentes de Auto</h3>
              <p className="text-gray-300 mb-4">
                Descubre cómo cada pieza contribuye a la transformación de este Skyline GT-R R34 en una verdadera obra de arte automotriz.
              </p>
              
              <Link 
                href="/pages/galeriaAutos/componentes"
                className="inline-flex items-center justify-center w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-6 rounded-lg transition-all transform hover:scale-105 duration-300"
              >
                Descubre los secretos de las modificaciones <ArrowRight />
              </Link>
            </div>
            
            {/* Motores */}
            <div className="bg-gray-800 rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold mb-4 text-purple-400">Motores</h3>
              <p className="text-gray-300 mb-4">
                Sumérgete en el mundo de la ingeniería de alto rendimiento y descubre qué hace latir el corazón de estas máquinas.
              </p>
              
              <Link 
                href="/pages/galeriaAutos/motores"
                className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-lg transition-all transform hover:scale-105 duration-300"
              >
                Explora el poder detrás del rendimiento <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related Cars */}
      <div className="bg-gray-900/50 border-t border-gray-800 py-12 px-4 md:px-8">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-wider mb-8">OTROS AUTOS MODIFICADOS</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: "/carNSXPink.jpg", alt: "NSX Pink", title: "Acura NSX", link: "/nsx-pink" },
              { src: "/carSilvia.jpg", alt: "Nissan Silvia", title: "Nissan Silvia", link: "/silvia" },
              { src: "/carGrey.jpg", alt: "Toyota Supra", title: "Toyota Supra", link: "/supra" },
              { src: "/carMazdaRX-7.jpg", alt: "Mazda RX-7", title: "Mazda RX-7", link: "/rx7" },
            ].map((car, index) => (
              <Link key={index} href={car.link} className="group relative overflow-hidden rounded-lg aspect-square">
                <Image
                  src={car.src}
                  alt={car.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <h3 className="text-white font-semibold text-xl">{car.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}