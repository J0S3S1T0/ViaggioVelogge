'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="inline ml-1">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
  </svg>
);

export default function SkylineR34() {
  const [showNav, setShowNav] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Efecto para el navbar al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY > window.innerHeight - 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleModal = (modalName: string) => {
    setActiveModal(activeModal === modalName ? null : modalName);
  };

  const Modal = ({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-4 flex justify-between items-center">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );

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
      <div className="relative w-full h-[60vh]" id="inicio">
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

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Car Images */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
              <Image
                src="/skyline-exterior.jpg"
                alt="Skyline GT-R R34 Exterior"
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>

          {/* Right Column - Specifications */}
          <div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 sticky top-6">
              <h2 className="text-2xl md:text-3xl font-bold tracking-wider mb-6 border-b border-gray-800 pb-4">
                ESPECIFICACIONES
              </h2>

              {/* Carrocería y Diseño */}
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">Carrocería y Diseño</h3>
                  <button 
                    onClick={() => toggleModal('body')}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded text-sm transition"
                  >
                    Info
                  </button>
                </div>
                <p className="text-gray-400 mt-2">Kit C-West completo en púrpura metálico</p>
              </div>

              {/* Motor y Rendimiento */}
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">Motor y Rendimiento</h3>
                  <button 
                    onClick={() => toggleModal('engine')}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded text-sm transition"
                  >
                    Info
                  </button>
                </div>
                <p className="text-gray-400 mt-2">RB26DETT 2.8L - 720HP</p>
              </div>

              {/* Suspensión y Frenos */}
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">Suspensión y Frenos</h3>
                  <button 
                    onClick={() => toggleModal('suspension')}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded text-sm transition"
                  >
                    Info
                  </button>
                </div>
                <p className="text-gray-400 mt-2">Öhlins DFV + Brembo GT</p>
              </div>

              {/* Aerodinámica */}
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">Aerodinámica</h3>
                  <button 
                    onClick={() => toggleModal('aero')}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded text-sm transition"
                  >
                    Info
                  </button>
                </div>
                <p className="text-gray-400 mt-2">Alerón ajustable + difusor</p>
              </div>

              <Link 
                href="/modelo3d/skyline-r34" 
                className="inline-flex items-center justify-center w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg transition-colors mt-4"
              >
                Ver modelo 3D interactivo <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'body' && (
        <Modal title="Carrocería y Diseño" onClose={() => setActiveModal(null)}>
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-purple-400">Kit C-West Completo</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Parachoques delantero:</strong> Diseño agresivo con entradas de aire ampliadas (fibra de carbono)</li>
              <li><strong>Parachoques trasero:</strong> Difusor de 4 salidas + soporte para alerón</li>
              <li><strong>Faldones laterales:</strong> Extensión de 5 cm para flujo de aire</li>
              <li><strong>Guardabarros:</strong> Ensanchados 30 mm para llantas grandes</li>
              <li><strong>Capó:</strong> Doble ventilación en aluminio</li>
            </ul>
            
            <div className="pt-4 border-t border-gray-800">
              <h4 className="text-lg font-bold text-purple-400">Pintura</h4>
              <p>Púrpura metálico (código LV4) con 3 capas de barniz anti-UV</p>
            </div>
          </div>
        </Modal>
      )}

      {activeModal === 'engine' && (
        <Modal title="Motor y Rendimiento" onClose={() => setActiveModal(null)}>
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-purple-400">RB26DETT Modificado</h4>
            <div className="grid grid-cols-2 gap-4">
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Cilindrada:</strong> 2.8L (kit stroker HKS)</li>
                <li><strong>Turbo:</strong> Twin Garrett G30-770</li>
              </ul>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Potencia:</strong> 720 HP @ 7,200 rpm</li>
                <li><strong>Par motor:</strong> 780 Nm @ 4,000 rpm</li>
              </ul>
            </div>
            <p className="pt-4 border-t border-gray-800"><strong>Transmisión:</strong> Getrag 6-speed + embrague OS Giken</p>
          </div>
        </Modal>
      )}

      {activeModal === 'suspension' && (
        <Modal title="Suspensión y Frenos" onClose={() => setActiveModal(null)}>
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-purple-400">Suspensión</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Sistema:</strong> Ohlins DFV ajustable electrónicamente</li>
              <li><strong>Altura:</strong> Rebajado 40 mm (modo calle/pista)</li>
              <li><strong>Barras estabilizadoras:</strong> C-West 25mm (del.) / 22mm (tras.)</li>
            </ul>
            
            <div className="pt-4 border-t border-gray-800">
              <h4 className="text-lg font-bold text-purple-400">Frenos y Ruedas</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Frenos:</strong> Discos Brembo GT 380mm/355mm</li>
                <li><strong>Llantas:</strong> Volk Racing TE37 Ultra 19"</li>
                <li><strong>Neumáticos:</strong> Michelin Pilot Sport 4S</li>
              </ul>
            </div>
          </div>
        </Modal>
      )}

      {activeModal === 'aero' && (
        <Modal title="Aerodinámica" onClose={() => setActiveModal(null)}>
          <div className="space-y-4">
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Alerón:</strong> C-West GT perfil ajustable (ángulo de 15° en pista)</li>
              <li><strong>Splitter delantero:</strong> Fibra de carbono, 150 mm de profundidad</li>
              <li><strong>Difusor trasero:</strong> Canales verticales para reducir turbulencias</li>
              <li><strong>Downforce:</strong> +120 kg a 200 km/h</li>
            </ul>
          </div>
        </Modal>
      )}
    </div>
  );
}