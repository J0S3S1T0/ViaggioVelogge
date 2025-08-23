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

  // Calcular el ángulo de rotación para la manecilla (0° a 240°)
  const needleRotation = (speed / 100) * 240 - 120;

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Contenedor del velocímetro */}
      <div className="relative w-64 h-64 mx-auto mb-6">
        {/* Círculo exterior del velocímetro con gradiente */}
        <div className="absolute inset-0 rounded-full bg-gray-900 shadow-xl border-4 border-gray-700 flex items-center justify-center">
          <div className="absolute inset-4 rounded-full border-2 border-gray-600"></div>
          
          {/* Zona de peligro (rojo) para velocidades altas */}
          {speed > 80 && (
            <div 
              className="absolute inset-0 rounded-full bg-red-500 opacity-20"
              style={{
                clipPath: `path('M50,50 L50,10 A40,40 0 0,1 ${50 + 40 * Math.cos((240 * Math.PI)/180)},${50 + 40 * Math.sin((240 * Math.PI)/180)} Z')`
              }}
            ></div>
          )}
        </div>
        
        {/* Marcas del velocímetro */}
        <div className="absolute inset-0">
          {/* Marcas principales cada 20 km/h */}
          {[...Array(7)].map((_, i) => {
            const value = i * 20;
            const angle = i * 40 - 120;
            const radian = angle * (Math.PI / 180);
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
                
                {/* Etiquetas de velocidad */}
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
          
          {/* Marcas menores cada 10 km/h */}
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
        
        {/* Manecilla del velocímetro */}
        <div 
          className="absolute left-1/2 top-1/2 w-1 h-20 bg-red-500 origin-bottom z-10"
          style={{
            transform: `translate(-50%, -100%) rotate(${needleRotation}deg)`,
            transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 0 8px rgba(239, 68, 68, 0.7)',
            borderRadius: '2px'
          }}
        >
          {/* Punto de pivote de la manecilla */}
          <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-red-600 rounded-full -translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        {/* Centro del velocímetro */}
        <div className="absolute left-1/2 top-1/2 w-6 h-6 bg-gray-800 border-2 border-red-500 rounded-full -translate-x-1/2 -translate-y-1/2 z-20"></div>
        
        {/* Display de velocidad numérica */}
        <div className="absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2 text-center bg-gray-800 py-2 px-4 rounded-lg border border-gray-600 shadow-md">
          <div className="text-2xl font-bold text-blue-400">{speed}</div>
          <p className="text-xs text-gray-400 mt-1">km/h</p>
        </div>
      </div>
      
      {/* Botón de control */}
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

export default function Ferrari250GTOPage() {
  return (
    <div className="bg-black text-white min-h-screen px-8 pt-24 pb-8">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-black text-white z-50 flex justify-between items-center px-8 py-4 shadow-md transition-opacity duration-500">
        <div className="text-xl font-bold">VIAGGIO VELOCE</div>
        <ul className="flex gap-6">
          <li>Home</li>
          <li>Fotos</li>
          <li>Acerca de</li>
          <li>Tienda</li>
        </ul>
      </nav>

      {/* Hero con fondo gris */}
      <section className="text-center mb-12 bg-gray-800 py-8 rounded-lg">
        <div className="flex justify-center items-center gap-4 mb-4">
          <h1 className="text-4xl font-bold">FERRARI 250 GTO 1962</h1>
        </div>
        <Image
          src="/Ferrari250.png"
          alt="Ferrari 250 GTO"
          width={800}
          height={500}
          className="mx-auto rounded-lg shadow-lg"
        />
      </section>

      {/* Specs */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
        <div>
          <Image src="/Ferrari250VistaFrotal (2).png" alt="Ferrari side view" width={400} height={250} className="rounded-lg mx-auto" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">280 Km/h</h2>
          <p className="text-gray-400">Velocidad máxima</p>
          <h2 className="text-2xl font-semibold mt-6 mb-2">4s</h2>
          <p className="text-gray-400">Aceleración de 0-100 km/h</p>
        </div>
        <div>
          <AnimatedSpeedometer />
        </div>
      </section>

      {/* Dimensiones */}
      <section className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-6">ESPECIFICACIONES</h2>

        {/* Imagen del auto */}
        <div className="mb-8">
          <Image
            src="/Ferrari250VistaArriba.png"
            alt="Vista lateral del Ferrari 250 GTO"
            width={700}
            height={300}
            className="mx-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Datos técnicos organizados */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-gray-300 max-w-4xl mx-auto">
          <div>
            <p className="text-lg font-semibold">Altura</p>
            <p>1.210 mm</p>
          </div>
          <div>
            <p className="text-lg font-semibold">Batalla</p>
            <p>2.400 mm</p>
            <p className="text-xs text-gray-500">Distancia entre ejes</p>
          </div>
          <div>
            <p className="text-lg font-semibold">Longitud</p>
            <p>4.325 mm</p>
          </div>
          <div>
            <p className="text-lg font-semibold">Ancho</p>
            <p>1.600 mm</p>
          </div>
        </div>
      </section>

      {/* Historia con fondo gris */}
      <section className="mt-20 bg-gray-800 py-8 px-6 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-8">HISTORIA</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Serie I */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <Image src="/Ferrari250Historia1.png" alt="Ferrari GTO Serie I" width={500} height={300} className="rounded-lg mb-4" />
            <h3 className="text-xl font-semibold mb-4">Ferrari GTO 1962–1963</h3>
            <p className="text-gray-300 mb-2">
              Es el diseño más clásico y reconocido del GTO, con las 3 tomas de aire frontales y un perfil más delgado.
            </p>
            <p className="text-gray-400 text-sm">Se fabricaron 33 unidades originales de este modelo.</p>
          </div>

          {/* Serie II */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <Image src="/Ferrari250Historia2.png" alt="Ferrari GTO Serie II" width={500} height={300} className="rounded-lg mb-4" />
            <h3 className="text-xl font-semibold mb-4">Ferrari GTO Serie II 1964</h3>
            <p className="text-gray-300 mb-2">
              Se nota por su parte trasera más alta y redondeada, inspirada en el Ferrari 250 LM.
            </p>
            <p className="text-gray-400 text-sm mb-2">Solo se fabricaron 3 unidades nuevas con esta carrocería.</p>
            <p className="text-gray-500 text-xs">Es más raro aún que el Serie I, y más aerodinámico.</p>
          </div>
        </div>
      </section>

      {/* Motor con fondo gris */}
      <section className="mt-20 bg-gray-800 py-8 px-6 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-8">MOTOR</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <Image src="/MotorFerrari240V8.png" alt="Motor Ferrari GTO" width={500} height={300} className="rounded-lg shadow-lg" />
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-sm text-gray-300">
            <h3 className="text-xl font-semibold mb-4">VIAGGIO VELOCE</h3>
            <ul className="space-y-2">
              <li><span className="font-semibold">Números de cilindros:</span> V12 a 60° delantero longitudinal</li>
              <li><span className="font-semibold">Cilindrada:</span> 2.953 cm³ (3.0 L)</li>
              <li><span className="font-semibold">Velocidad máx. del motor:</span> Aproximadamente 7.500 r/min</li>
              <li><span className="font-semibold">Carrera:</span> 58,8 mm</li>
              <li><span className="font-semibold">Par máximo:</span> Aproximadamente 294 Nm</li>
              <li><span className="font-semibold">Potencia:</span> 300 PS (aproximadamente 296 hp)</li>
              <li><span className="font-semibold">Potencia máx. por litro:</span> 101,4 PS/l</li>
              <li><span className="font-semibold">Calibre:</span> 73,0 mm</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}