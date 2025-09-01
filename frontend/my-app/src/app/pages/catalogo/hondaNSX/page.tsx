'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

function AnimatedSpeedometer() {
  const [speed, setSpeed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setSpeed((prev) => {
          if (prev >= 100) {
            clearInterval(intervalRef.current!);
            return 100;
          }
          return prev + 1;
        });
      }, 40);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (speed >= 100) setSpeed(0);
    setIsPlaying((prev) => !prev);
  };

  const needleRotation = (speed / 100) * 240 - 120;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-64 h-64 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full bg-gray-900 shadow-xl border-4 border-gray-700 flex items-center justify-center">
          <div className="absolute inset-4 rounded-full border-2 border-gray-600"></div>
          
          {speed > 80 && (
            <div 
              className="absolute inset-0 rounded-full bg-red-500 opacity-20"
              style={{
                clipPath: `path('M50,50 L50,10 A40,40 0 0,1 ${50 + 40 * Math.cos((240 * Math.PI)/180)},${50 + 40 * Math.sin((240 * Math.PI)/180)} Z')`
              }}
            ></div>
          )}
        </div>
        
        <div className="absolute inset-0">
          {[...Array(7)].map((_, i) => {
            const value = i * 20;
            const angle = i * 40 - 120;
            const isMajor = value % 40 === 0;
            
            return (
              <div key={i} className="absolute left-1/2 top-1/2 origin-bottom">
                <div
                  className="absolute h-0.5 bg-white"
                  style={{
                    width: isMajor ? '24px' : '16px',
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-44px)`,
                    transformOrigin: 'center bottom'
                  }}
                ></div>
                
                {isMajor && (
                  <span
                    className="absolute text-white text-xs font-medium"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-68px)`,
                      transformOrigin: 'center bottom'
                    }}
                  >
                    {value}
                  </span>
                )}
              </div>
            );
          })}
          
          {[...Array(13)].map((_, i) => {
            const angle = i * 20 - 120;
            
            return (
              <div key={i} className="absolute left-1/2 top-1/2 origin-bottom">
                <div
                  className="absolute h-0.5 bg-gray-400"
                  style={{
                    width: '12px',
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-44px)`,
                    transformOrigin: 'center bottom'
                  }}
                ></div>
              </div>
            );
          })}
        </div>
        
        <div 
          className="absolute left-1/2 top-1/2 w-1 h-20 bg-red-500 origin-bottom z-10"
          style={{
            transform: `translate(-50%, -100%) rotate(${needleRotation}deg)`,
            transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 0 8px rgba(239, 68, 68, 0.7)',
            borderRadius: '2px'
          }}
        >
          <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-red-600 rounded-full -translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="absolute left-1/2 top-1/2 w-6 h-6 bg-gray-800 border-2 border-red-500 rounded-full -translate-x-1/2 -translate-y-1/2 z-20"></div>
        
        <div className="absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2 text-center bg-gray-800 py-2 px-4 rounded-lg border border-gray-600 shadow-md">
          <div className="text-2xl font-bold text-blue-400">{speed}</div>
          <p className="text-xs text-gray-400 mt-1">km/h</p>
        </div>
      </div>
      
      <button
        onClick={togglePlay}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-full transition flex items-center gap-2"
      >
        {isPlaying ? (
          <>
            <span>⏸</span> Pausar
          </>
        ) : (
          <>
            <span>▶</span> Reproducir
          </>
        )}
      </button>
    </div>
  );
}

// Componente para tarjetas de historia con efecto flip
interface HistoryCardProps {
  periodo: string;
  titulo: string;
  descripcion: string;
  infoAdicional: string;
  imagenFrente: string;
  imagenReverso: string;
}

function HistoryCard({ periodo, titulo, descripcion, infoAdicional, imagenFrente, imagenReverso }: HistoryCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <div 
      className="history-card"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className={`history-card-inner ${isFlipped ? 'flipped' : ''}`}>
        <div className="history-card-front">
          <div className="image-container">
            <Image 
              src={imagenFrente} 
              alt={titulo} 
              width={500} 
              height={280} 
              className="history-image"
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className="card-content">
            <div className="periodo">{periodo}</div>
            <h3>{titulo}</h3>
            <p>{descripcion}</p>
            <div className="hover-indicator">Pasa el cursor para más información</div>
          </div>
        </div>
        
        <div className="history-card-back">
          <div className="image-container">
            <Image 
              src={imagenReverso} 
              alt={titulo} 
              width={500} 
              height={280} 
              className="history-image"
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className="card-content">
            <div className="periodo">{periodo}</div>
            <h3>{titulo}</h3>
            <p>{infoAdicional}</p>
            <div className="hover-indicator">Pasa el cursor para volver</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .history-card {
          perspective: 1000px;
          height: 500px;
          cursor: pointer;
        }
        
        .history-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }
        
        .history-card-inner.flipped {
          transform: rotateY(180deg);
        }
        
        .history-card-front, .history-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        
        .history-card-front {
          background-color: #1f2937;
          border: 1px solid #374151;
          display: flex;
          flex-direction: column;
        }
        
        .history-card-back {
          background-color: #111827;
          border: 1px solid #1e40af;
          transform: rotateY(180deg);
          display: flex;
          flex-direction: column;
        }
        
        .image-container {
          height: 250px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #0f172a;
        }
        
        .history-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.5s;
        }
        
        .history-card:hover .history-image {
          transform: scale(1.05);
        }
        
        .card-content {
          padding: 20px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        
        .periodo {
          color: #60a5fa;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        h3 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 12px;
          color: white;
        }
        
        p {
          color: #d1d5db;
          flex-grow: 1;
          line-height: 1.5;
        }
        
        .hover-indicator {
          color: #60a5fa;
          font-size: 12px;
          margin-top: 15px;
          text-align: center;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}

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

export default function HondaNSXPage() {
  const [carAnimation, setCarAnimation] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCarAnimation(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <nav className="fixed top-0 left-0 w-full bg-black/90 backdrop-blur-sm text-white z-50 flex justify-between items-center px-8 py-4 shadow-lg">
        <a href="/" className="text-2xl font-bold tracking-wider">VIAGGIO VELOGGE</a>
        
        {/* Menú para desktop */}
        <ul className="hidden md:flex gap-8 uppercase text-sm tracking-wider">
          <li className="hover:text-gray-300 transition"><a href="#inicio">INICIO</a></li>
          <li className="hover:text-gray-300 transition"><a href="/pages/catalogo3D">3D GALLERY</a></li>
          <li className="hover:text-gray-300 transition"><a href="/pages/catalogo">CLASSIC CARS</a></li>
          <li className="hover:text-gray-300 transition"><a href="/pages/galeriaAutos">TUNED CARS</a></li>
          <li className="hover:text-gray-300 transition"><a href="/pages/tienda">Tienda</a></li>
        </ul>
        
        {/* Botón de menú hamburguesa para móvil */}
        <button 
          className="md:hidden flex flex-col justify-center items-center w-10 h-10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${mobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
          <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-1 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
        </button>
      </nav>
      
      {/* Menú móvil desplegable */}
      <div className={`fixed top-16 right-0 w-full bg-black/95 backdrop-blur-sm z-40 transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
        <ul className="flex flex-col items-center py-4 uppercase text-sm tracking-wider">
          <li className="w-full text-center py-3 hover:bg-gray-800 transition"><a href="#inicio" className="block w-full">INICIO</a></li>
          <li className="w-full text-center py-3 hover:bg-gray-800 transition"><a href="/pages/catalogo3D" className="block w-full">3D GALLERY</a></li>
          <li className="w-full text-center py-3 hover:bg-gray-800 transition"><a href="/pages/catalogo" className="block w-full">CLASSIC CARS</a></li>
          <li className="w-full text-center py-3 hover:bg-gray-800 transition"><a href="/pages/galeriaAutos" className="block w-full">TUNED CARS</a></li>
          <li className="w-full text-center py-3 hover:bg-gray-800 transition"><a href="/pages/tienda" className="block w-full">Tienda</a></li>
        </ul>
      </div>

      <div className="px-8 pt-32 pb-8">
        <section className="text-center mb-12 bg-gray-800 py-8 rounded-lg">
          <div className="flex justify-center items-center gap-4 mb-4">
            <h1 className="text-4xl font-bold">HONDA NSX 1990</h1>
          </div>
          <div className="flex justify-center">
            <Image
              src="/catalogo/Honda/hondaNSX/HondaNSX.png"
              alt="Honda NSX 1990"
              width={800}
              height={400}
              className={`rounded-lg shadow-lg transform transition-all duration-1000 ease-out ${carAnimation ? 'translate-x-0 opacity-100 scale-100' : '-translate-x-full opacity-30 scale-90'}`}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </section>

        <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center">
            <Image 
              src="/catalogo/Honda/hondaNSX/HondaNSXVistaFrontal.png" 
              alt="Vista frontal del Honda NSX" 
              width={550} 
              height={350} 
              className="rounded-lg shadow-lg object-contain h-80"
            />
          </div>
          <div className="text-lg text-gray-300 leading-relaxed bg-gray-800 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-5 text-blue-400">REVOLUCIÓN JAPONESA</h2>
            <p className="mb-5">
              El Honda NSX (New Sportscar eXperimental) es un automóvil deportivo que revolucionó la industria automotriz cuando se presentó en 1990. 
              Fue el primer superdeportivo japonés que compitió directamente con marcas europeas establecidas como Ferrari y Porsche.
            </p>
            <p>
              Desarrollado con la participación del piloto de Fórmula 1 Ayrton Senna, el NSX introdujo innovaciones como un chasis de aluminio, 
              motor central trasero y una experiencia de conducción que priorizaba la manejabilidad y confiabilidad sobre los números brutos de rendimiento.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center mb-16">
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-2">270 Km/h</h2>
              <p className="text-gray-400">Velocidad máxima</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-2">5.7s</h2>
              <p className="text-gray-400">Aceleración de 0-100 km/h</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-2">274 HP</h2>
              <p className="text-gray-400">Potencia máxima</p>
            </div>
          </div>
          <div>
            <AnimatedSpeedometer />
          </div>
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-2">280 Nm</h2>
              <p className="text-gray-400">Torque máximo</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-2">3.0 L</h2>
              <p className="text-gray-400">Cilindrada</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-2">1350 kg</h2>
              <p className="text-gray-400">Peso</p>
            </div>
          </div>
        </section>

        <section className="mb-16 bg-gray-800 py-12 px-8 rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-400">MOTOR Y TRANSMISIÓN</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="space-y-6">
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-blue-400">Configuración</h3>
                <p className="text-gray-300">V6 a 90° trasero longitudinal</p>
                <p className="text-gray-400 text-sm mt-2">2.977 cm³ (3.0 L)</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-blue-400">Transmisión</h3>
                <p className="text-gray-300">Manual de 5 velocidades</p>
                <p className="text-gray-400 text-sm mt-2">Tracción trasera</p>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Image 
                src="/catalogo/Honda/hondaNSX/HondaNSXMotor.png" 
                alt="Motor Honda NSX" 
                width={400} 
                height={300} 
                className="rounded-lg shadow-lg object-contain h-64"
                style={{ transform: 'rotate(0deg)' }}
              />
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-blue-400">Rendimiento</h3>
                <p className="text-gray-300">274 CV a 7.300 rpm</p>
                <p className="text-gray-400 text-sm mt-2">280 Nm de par máximo</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-blue-400">Tecnología</h3>
                <p className="text-gray-300">VTEC, DOHC, 4 válvulas por cilindro</p>
                <p className="text-gray-400 text-sm mt-2">Inyección electrónica PGM-FI</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16 text-center bg-gray-800 py-12 px-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-10 text-blue-400">DIMENSIONES</h2>

          <div className="mb-12">
            <Image
              src="/catalogo/Honda/hondaNSX/HondaNSXVistaArriba.png"
              alt="Vista lateral del Honda NSX"
              width={800}
              height={400}
              className="mx-auto rounded-lg shadow-lg object-contain h-64"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-gray-700 p-6 rounded-lg">
              <p className="text-lg font-semibold mb-2">Altura</p>
              <p className="text-xl">1.170 mm</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <p className="text-lg font-semibold mb-2">Batalla</p>
              <p className="text-xl">2.530 mm</p>
              <p className="text-sm text-gray-500 mt-2">Distancia entre ejes</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <p className="text-lg font-semibold mb-2">Longitud</p>
              <p className="text-xl">4.430 mm</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <p className="text-lg font-semibold mb-2">Ancho</p>
              <p className="text-xl">1.810 mm</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <p className="text-lg font-semibold mb-2">Peso</p>
              <p className="text-xl">1.350 kg</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <p className="text-lg font-semibold mb-2">Capacidad</p>
              <p className="text-xl">2 pasajeros</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <p className="text-lg font-semibold mb-2">Consumo ciudad</p>
              <p className="text-xl">12.5 l/100km</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <p className="text-lg font-semibold mb-2">Consumo autopista</p>
              <p className="text-xl">8.5 l/100km</p>
            </div>
          </div>
        </section>

        <section className="mb-16 bg-gray-800 py-12 px-8 rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-400">HISTORIA</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <HistoryCard
              periodo="1990-2005"
              titulo="Honda NSX Primera Generación"
              descripcion="El NSX original, diseñado por Pininfarina, presentaba un revolucionario chasis de aluminio y un motor V6 con tecnología VTEC."
              infoAdicional="El desarrollo del NSX contó con la participación directa del tricampeón de Fórmula 1 Ayrton Senna, quien realizó ajustes en el chasis y la suspensión. Fue el primer automóvil de producción en utilizar un chasis monocasco de aluminio, reduciendo significativamente el peso. Su motor V6 con sistema VTEC ofrecía un rendimiento excepcional con una confiabilidad nunca antes vista en un superdeportivo."
              imagenFrente="/catalogo/Honda/hondaNSX/HondaNSX.png"
              imagenReverso="/catalogo/Honda/hondaNSX/HondaNSX.png"
            />
            <HistoryCard
              periodo="2016-Presente"
              titulo="Honda NSX Segunda Generación"
              descripcion="El NSX de segunda generación presenta un sistema híbrido de tres motores eléctricos y un motor twin-turbo V6."
              infoAdicional="La segunda generación del NSX se presentó en 2016 después de más de una década de ausencia. Este modelo incorpora un sistema híbrido complejo con tres motores eléctricos (dos en el eje delantero y uno integrado con el motor) que combinados con un motor V6 biturbo producen 581 CV. Utiliza una transmisión de doble embrague de 9 velocidades y ofrece tracción integral gracias a su sistema híbrido."
              imagenFrente="/catalogo/Honda/hondaNSX/HondaNSX.png"
              imagenReverso="/catalogo/Honda/hondaNSX/HondaNSX.png"
            />
          </div>
        </section>

        <section className="mt-20 bg-gradient-to-r from-gray-800 to-gray-900 py-16 px-8 rounded-lg text-center border border-gray-700">
          <h2 className="text-3xl font-bold mb-6">¿Necesitas más información?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Nuestros asesores especializados están disponibles para responder todas tus preguntas sobre este revolucionario Honda NSX y otros modelos exclusivos de nuestra colección.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <a
              href="/pages/contacto"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-10 py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 text-lg"
            >
              Contactar a un asesor <ArrowRight />
            </a>
            <a
              href="/pages/catalogo"
              className="border border-gray-400 text-gray-300 hover:bg-gray-700 hover:text-white font-semibold px-10 py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 text-lg"
            >
              Ver otros modelos <ArrowRight />
            </a>
          </div>
        </section>
      </div>

      <footer className="bg-black border-t border-gray-700 py-16 px-4 md:px-8 mt-20">
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

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes carEntry {
          from { transform: translateX(-100%); opacity: 0.3; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease forwards;
        }
        .animate-carEntry {
          animation: carEntry 1.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}