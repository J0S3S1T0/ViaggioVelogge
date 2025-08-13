'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY > window.innerHeight - 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative bg-black text-white">
      {/* Imagen de inicio */}
      <div className="relative w-screen h-screen">
        <Image
          src="/InicioCar.jpg"
          alt="Inicio Car"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute top-[60%] left-[55%] z-10 text-white">
          <h1 className="text-[4rem] font-bold leading-none">Viaggio Velogge</h1>
          <p className="text-[1.5rem] mt-2">PORTAFOLIO DE AUTOS</p>
        </div>
      </div>

      {/* Navbar */}
      {showNav && (
        <nav className="fixed top-0 left-0 w-full bg-black text-white z-50 flex justify-between items-center px-8 py-4 shadow-md transition-opacity duration-500">
          <div className="text-xl font-bold">VIAGGIO VELOCE</div>
          <ul className="flex gap-6">
            <li>Home</li>
            <li>Fotos</li>
            <li>Acerca de</li>
            <li>Tienda</li>
          </ul>
        </nav>
      )}

      {/* Catálogo de autos */}
      <section className="py-16 px-8">
        <div className="sticky top-0 bg-black z-40 border-b border-neutral-700 flex justify-between items-center py-4 px-2">
          <h2 className="text-3xl font-bold">Catálogo de Autos en 3D</h2>
          <a
            href="/catalogo3D"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
          >
            Ver más
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
          {[
            {
              src: "/Impala.png",
              alt: "Chevrolet Impala 1959",
              title: "Chevrolet Impala 1959",
              link: "/impala",
            },
            {
              src: "/testarossa.png",
              alt: "Ferrari Testarossa",
              title: "Ferrari Testarossa",
              link: "/testarossa",
            },
            {
              src: "/Impala.png",
              alt: "Chevrolet Impala 1959",
              title: "Chevrolet Impala 1959",
              link: "/cambio",
            },
            {
              src: "/testarossa.png",
              alt: "Ferrari Testarossa",
              title: "Ferrari Testarossa",
              link: "/cambio",
            },
          ].map((car, index) => (
            <div
              key={index}
              className="bg-neutral-900 border border-neutral-700 p-4 shadow-lg rounded-lg hover:shadow-xl transition"
            >
              <a href={car.link}>
                <Image
                  src={car.src}
                  alt={car.alt}
                  width={600}
                  height={400}
                  className="object-cover rounded mb-4"
                />
                <h3 className="text-xl font-semibold">{car.title}</h3>
                <p className="text-sm text-gray-400 mb-4">Vista en 360°</p>
              </a>
              <div className="text-right">
                <a
                  href={car.link}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded transition mb-1"
                >
                  Ver más
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Catálogo de autos */}
      <section className="py-16 px-8">
        <div className="sticky top-0 bg-black z-40 border-b border-neutral-700 flex justify-between items-center py-4 px-2">
          <h2 className="text-3xl font-bold">Catálogo de Autos</h2>
          <a
            href="/catalogo"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
          >
            Ver más
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
          {[
            {
              src: "/BuickLeSabre1959.png",
              alt: "Chevrolet Impala 1959",
              title: "Chevrolet Impala 1959",
              link: "/impala",
            },
            {
              src: "/Ferrari250.png",
              alt: "Ferrari Testarossa",
              title: "Ferrari Testarossa",
              link: "/ferrari250",
            },
            {
              src: "/BiuckLeSabre1959.png",
              alt: "Chevrolet Impala 1959",
              title: "Chevrolet Impala 1959",
              link: "/impala",
            },
            {
              src: "/Ferrari250.png",
              alt: "Ferrari Testarossa",
              title: "Ferrari Testarossa",
              link: "/testarossa",
            }

          ].map((car, index) => (
            <div
              key={index}
              className="bg-neutral-900 border border-neutral-700 p-4 shadow-lg rounded-lg hover:shadow-xl transition"
            >
              <a href={car.link}>
                <Image
                  src={car.src}
                  alt={car.alt}
                  width={600}
                  height={400}
                  className="object-cover rounded mb-4"
                />
                <h3 className="text-xl font-semibold">{car.title}</h3>
                <p className="text-sm text-gray-400 mb-4">Vista en 360°</p>
              </a>
              <div className="text-right">
                <a
                  href={car.link}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded transition mb-1"
                >
                  Ver más
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Galería de autos modificados */}
      <section className="py-16 px-8">
        <div className="sticky top-0 bg-black z-40 border-b border-neutral-700 flex justify-between items-center py-4 px-2">
          <h2 className="text-3xl font-bold">GALERÍA DE AUTOS MODIFICADOS</h2>
          <a
            href="/galeria"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
          >
            Ver más
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {[
            { src: "/carNSXPink.jpg", alt: "Auto modificado 1", title: "NSX Rosa", link: "/auto1" },
            { src: "/CarNSX.jpg", alt: "Auto modificado 2", title: "NSX Púrpura", link: "/auto2" },
            { src: "/carSilvia.jpg", alt: "Auto modificado 3", title: "Nissan Silvia", link: "/auto3" },
            { src: "/carGrey.jpg", alt: "Auto modificado 4", title: "Toyota Supra", link: "/auto4" },
            { src: "/carCivic.jpg", alt: "Auto modificado 5", title: "Honda Civic", link: "/auto5" },
            { src: "/carCorvetteC5.jpg", alt: "Auto modificado 6", title: "Corvette C5", link: "/auto6" },
            { src: "/carMazdaRX-7.jpg", alt: "Auto modificado 7", title: "Mazda RX-7", link: "/auto7" },
            { src: "/carNissanSkilineGTR34.jpg", alt: "Auto modificado 8", title: "Skyline GTR R34", link: "/auto8" },
          ].map((car, index) => (
            <div
              key={index}
              className="bg-neutral-900 border border-neutral-700 p-4 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <a href={car.link}>
                <Image
                  src={car.src}
                  alt={car.alt}
                  width={300}
                  height={200}
                  className="rounded-lg object-cover w-full h-auto mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{car.title}</h3>
                <p className="text-sm text-gray-400 mb-4">Modelos Modificados</p>
              </a>
              <div className="text-right">
                <a
                  href={car.link}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded transition"
                >
                  Ver más
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
