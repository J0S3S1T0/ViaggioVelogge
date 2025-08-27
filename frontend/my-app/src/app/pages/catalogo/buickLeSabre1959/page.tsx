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
          if (prev >= 120) {
            clearInterval(intervalRef.current!);
            return 120;
          }
          return prev + 1;
        });
      }, 60);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (speed >= 120) setSpeed(0);
    setIsPlaying((prev) => !prev);
  };

  const needleRotation = (speed / 120) * 240 - 120;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-64 h-64 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full bg-gray-900 shadow-xl border-4 border-gray-700 flex items-center justify-center">
          <div className="absolute inset-4 rounded-full border-2 border-gray-600"></div>
          
          {speed > 90 && (
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
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 0 8px rgba(239, 68, 68, 0.7)',
            borderRadius: '2px'
          }}
        >
          <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-red-600 rounded-full -translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="absolute left-1/2 top-1/2 w-6 h-6 bg-gray-800 border-2 border-red-500 rounded-full -translate-x-1/2 -translate-y-1/2 z-20"></div>
        
        <div className="absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2 text-center bg-gray-800 py-2 px-4 rounded-lg border border-gray-600 shadow-md">
          <div className="text-2xl font-bold text-blue-400">{speed}</div>
          <p className="text-xs text-gray-400 mt-1">mph</p>
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

export default function BuickLeSabre1959Page() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar siempre fijo */}
      <nav className="fixed top-0 left-0 w-full bg-black/90 backdrop-blur-sm text-white z-50 flex justify-between items-center px-8 py-4 shadow-lg">
        <div className="text-2xl font-bold tracking-wider">VIAGGIO VELOGGE</div>
        <ul className="hidden md:flex gap-8 uppercase text-sm tracking-wider">
          <li className="hover:text-gray-300 transition"><a href="#inicio">INICIO</a></li>
          <li className="hover:text-gray-300 transition"><a href="/pages/catalogo3D">3D GALLERY</a></li>
          <li className="hover:text-gray-300 transition"><a href="/pages/catalogo">CLASSIC CARS</a></li>
          <li className="hover:text-gray-300 transition"><a href="/pages/galeriaAutos">TUNED CARS</a></li>
          <li className="hover:text-gray-300 transition"><a href="/pages/tienda">Tienda</a></li>
        </ul>
      </nav>

      <div className="px-8 pt-32 pb-8">
        {/* Hero con fondo gris */}
        <section className="text-center mb-12 bg-gray-800 py-8 rounded-lg">
          <div className="flex justify-center items-center gap-4 mb-4">
            <h1 className="text-4xl font-bold">BUICK LeSABRE 1959</h1>
          </div>
          <Image
            src="/catalogo/Chevrolet/BuickLeSabre1959/BuickLeSabre1959.png"
            alt="Buick LeSabre 1959"
            width={800}
            height={500}
            className="mx-auto rounded-lg shadow-lg"
          />
        </section>

        {/* Specs */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
          <div>
            <Image src="/BuickLeSabreSideView.png" alt="Buick LeSabre side view" width={400} height={250} className="rounded-lg mx-auto" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">115 mph</h2>
            <p className="text-gray-400">Velocidad máxima</p>
            <h2 className="text-2xl font-semibold mt-6 mb-2">12.5s</h2>
            <p className="text-gray-400">Aceleración de 0-60 mph</p>
          </div>
          <div>
            <AnimatedSpeedometer />
          </div>
        </section>

        {/* Dimensiones */}
        <section className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-6">ESPECIFICACIONES</h2>

          <div className="mb-8">
            <Image
              src="/BuickLeSabreTopView.png"
              alt="Vista superior del Buick LeSabre 1959"
              width={700}
              height={300}
              className="mx-auto rounded-lg shadow-lg"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-gray-300 max-w-4xl mx-auto">
            <div>
              <p className="text-lg font-semibold">Altura</p>
              <p>1.420 mm</p>
            </div>
            <div>
              <p className="text-lg font-semibold">Batalla</p>
              <p>3.200 mm</p>
              <p className="text-xs text-gray-500">Distancia entre ejes</p>
            </div>
            <div>
              <p className="text-lg font-semibold">Longitud</p>
              <p>5.500 mm</p>
            </div>
            <div>
              <p className="text-lg font-semibold">Ancho</p>
              <p>2.020 mm</p>
            </div>
          </div>
        </section>

        {/* Historia con fondo gris */}
        <section className="mt-20 bg-gray-800 py-8 px-6 rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-8">HISTORIA</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <Image src="/BuickLeSabreDesign.png" alt="Diseño Buick LeSabre" width={500} height={300} className="rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-4">Diseño icónico de 1959</h3>
              <p className="text-gray-300 mb-2">
                El Buick LeSabre 1959 es famoso por sus aletas traseras extravagantes y su parrilla cromada distintiva,
                representando la cúspide del diseño automotriz de la era espacial.
              </p>
              <p className="text-gray-400 text-sm">Un símbolo del optimismo y la prosperidad de la América de posguerra.</p>
            </div>

            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <Image src="/BuickLeSabreLegacy.png" alt="Legado Buick LeSabre" width={500} height={300} className="rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-4">Legado duradero</h3>
              <p className="text-gray-300 mb-2">
                El LeSabre 1959 se convirtió en un ícono cultural, apareciendo en numerosas películas y representando
                la esencia de la era dorada de los automóviles americanos.
              </p>
              <p className="text-gray-400 text-sm mb-2">Hoy es muy valorado por coleccionistas y entusiastas.</p>
              <p className="text-gray-500 text-xs">Su diseño influenció a toda una generación de automóviles.</p>
            </div>
          </div>
        </section>

        {/* Motor con fondo gris */}
        <section className="mt-20 bg-gray-800 py-8 px-6 rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-8">MOTOR</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <Image src="/BuickLeSabreEngine.png" alt="Motor Buick LeSabre" width={500} height={300} className="rounded-lg shadow-lg" />
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-sm text-gray-300">
              <h3 className="text-xl font-semibold mb-4">Especificaciones del motor</h3>
              <ul className="space-y-2">
                <li><span className="font-semibold">Configuración:</span> V8 a 90° delantero longitudinal</li>
                <li><span className="font-semibold">Cilindrada:</span> 6.0 L (364 pulgadas cúbicas)</li>
                <li><span className="font-semibold">Potencia:</span> 250 HP</li>
                <li><span className="font-semibold">Par máximo:</span> 515 Nm</li>
                <li><span className="font-semibold">Alimentación:</span> Carburador de 4 cuerpos</li>
                <li><span className="font-semibold">Transmisión:</span> Turbine Drive automática de 2 velocidades</li>
                <li><span className="font-semibold">Relación de compresión:</span> 10.25:1</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Sección de contacto con asesores - Color menos llamativo pero atractivo */}
        <section className="mt-20 bg-gradient-to-r from-gray-800 to-gray-900 py-12 px-6 rounded-lg text-center border border-gray-700">
          <h2 className="text-3xl font-bold mb-4">¿Necesitas más información?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Nuestros asesores especializados están disponibles para responder todas tus preguntas sobre este clásico automóvil y otros modelos.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <a
              href="/pages/contacto"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition flex items-center justify-center gap-2"
            >
              Contactar a un asesor <ArrowRight />
            </a>
            <a
              href="/pages/catalogo"
              className="border border-gray-400 text-gray-300 hover:bg-gray-700 hover:text-white font-semibold px-8 py-3 rounded-full transition flex items-center justify-center gap-2"
            >
              Ver otros modelos <ArrowRight />
            </a>
          </div>
        </section>
      </div>

      {/* Footer */}
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
    </div>
  );
}