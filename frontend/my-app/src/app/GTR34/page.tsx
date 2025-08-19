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

const SpecItem = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-800 pb-6 mb-6 last:border-0 last:pb-0 last:mb-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left group"
      >
        <h3 className="text-xl md:text-2xl font-bold tracking-wider group-hover:text-purple-400 transition-colors">
          {title}
        </h3>
        <span className="text-2xl text-gray-400 group-hover:text-purple-400 transition-colors">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'mt-4' : 'h-0'}`}>
        {children}
      </div>
    </div>
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
          href="/galeria" 
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
                src="/skyline-detail-1.jpg"
                alt="Skyline GT-R R34 Front"
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-2">
                <Image
                  src="/skyline-detail-2.jpg"
                  alt="Skyline Engine"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-2">
                <Image
                  src="/skyline-detail-3.jpg"
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
                  <li className="flex">
                    <span className="text-purple-400 font-medium w-32 flex-shrink-0">Kit:</span>
                    <span>C-West completo</span>
                  </li>
                  <li className="flex">
                    <span className="text-purple-400 font-medium w-32 flex-shrink-0">Parachoques:</span>
                    <span>Fibra de carbono con entradas ampliadas</span>
                  </li>
                  <li className="flex">
                    <span className="text-purple-400 font-medium w-32 flex-shrink-0">Faldones:</span>
                    <span>Extensión de 5 cm</span>
                  </li>
                  <li className="flex">
                    <span className="text-purple-400 font-medium w-32 flex-shrink-0">Guardabarros:</span>
                    <span>Ensanchados 30 mm</span>
                  </li>
                  <li className="flex">
                    <span className="text-purple-400 font-medium w-32 flex-shrink-0">Pintura:</span>
                    <span>Púrpura metálico (LV4) con barniz anti-UV</span>
                  </li>
                </ul>
              </SpecItem>

              <SpecItem title="Motor y Rendimiento">
                <ul className="space-y-3 text-gray-300">
                  <li className="flex">
                    <span className="text-purple-400 font-medium w-32 flex-shrink-0">Motor:</span>
                    <span>RB26DETT 2.8L Stroker</span>
                  </li>
                  <li className="flex">
                    <span className="text-purple-400 font-medium w-32 flex-shrink-0">Turbo:</span>
                    <span>Garrett G30-770 twin-turbo</span>
                  </li>
                  <li className="flex">
                    <span className="text-purple-400 font-medium w-32 flex-shrink-0">Potencia:</span>
                    <span>720 HP @ 7,200 rpm</span>
                  </li>
                  <li className="flex">
                    <span className="text-purple-400 font-medium w-32 flex-shrink-0">Par:</span>
                    <span>780 Nm @ 4,000 rpm</span>
                  </li>
                  <li className="flex">
                    <span className="text-purple-400 font-medium w-32 flex-shrink-0">Transmisión:</span>
                    <span>Getrag 6-speed + OS Giken</span>
                  </li>
                </ul>
              </SpecItem>

              <SpecItem title="Suspensión y Frenos">
                <ul className="space-y-3 text-gray-300">
                  <li className="flex">
                    <span className="text-purple-400 font-medium w-32 flex-shrink-0">Suspensión:</span>
                    <span>Öhlins DFV ajustable</span>
                  </li>
                  <li className="flex">
                    <span className="text-purple-400 font-medium w-32 flex-shrink-0">Frenos:</span>
                    <span>Brembo GT 380mm/355mm</span>
                  </li>
                  <li className="flex">
                    <span className="text-purple-400 font-medium w-32 flex-shrink-0">Llantas:</span>
                    <span>Volk TE37 Ultra 19"</span>
                  </li>
                  <li className="flex">
                    <span className="text-purple-400 font-medium w-32 flex-shrink-0">Neumáticos:</span>
                    <span>Michelin Pilot Sport 4S</span>
                  </li>
                </ul>
              </SpecItem>

              <SpecItem title="Aerodinámica">
                <ul className="space-y-3 text-gray-300">
                  <li className="flex">
                    <span className="text-purple-400 font-medium w-32 flex-shrink-0">Alerón:</span>
                    <span>C-West GT ajustable</span>
                  </li>
                  <li className="flex">
                    <span className="text-purple-400 font-medium w-32 flex-shrink-0">Splitter:</span>
                    <span>Fibra de carbono 150mm</span>
                  </li>
                  <li className="flex">
                    <span className="text-purple-400 font-medium w-32 flex-shrink-0">Difusor:</span>
                    <span>Canales verticales</span>
                  </li>
                  <li className="flex">
                    <span className="text-purple-400 font-medium w-32 flex-shrink-0">Downforce:</span>
                    <span>+120kg @ 200km/h</span>
                  </li>
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