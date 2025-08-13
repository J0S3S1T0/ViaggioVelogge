'use client';
import Image from 'next/image';

export default function CatalogoPage() {
  return (
    <div className="bg-black text-white min-h-screen px-8 py-16">
      <nav className="fixed top-0 left-0 w-full bg-black text-white z-50 flex justify-between items-center px-8 py-4 shadow-md transition-opacity duration-500">
          <div className="text-xl font-bold">VIAGGIO VELOCE</div>
          <ul className="flex gap-6">
            <li>Home</li>
            <li>Fotos</li>
            <li>Acerca de</li>
            <li>Tienda</li>
          </ul>
        </nav>


      {/* Título */}
      <h2 className="text-4xl font-bold mb-8 text-center">Catálogo de Autos en 3D</h2>

      {/* Cards de autos */}
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4 h-[calc(100vh-6rem)]">
        {/* Impala */}
        <div className="bg-neutral-900 border border-neutral-700 p-4 rounded-lg shadow-lg hover:shadow-xl transition">
          <Image
            src="/BuickLeSabre1959.png"
            alt="Impala 1959"
            width={600}
            height={400}
            className="object-cover rounded mb-4"
          />
          <h3 className="text-xl font-semibold">Impala 1959</h3>
          <p className="text-sm text-gray-400 mb-4">Vista en 360°</p>
          <div className="text-right">
            <a
              href="/impala"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded transition"
            >
              Ver más
            </a>
          </div>
        </div>

        {/* Testarossa */}
        <div className="bg-neutral-900 border border-neutral-700 p-4 rounded-lg shadow-lg hover:shadow-xl transition">
          <Image
            src="/Ferrari250.png"
            alt="Ferrari Testarossa"
            width={550}
            height={350}
            className="object-cover rounded mb-4"
          />
          <h3 className="text-xl font-semibold">Ferrari Testarossa</h3>
          <p className="text-sm text-gray-400 mb-4">Vista en 360°</p>
          <div className="text-right">
            <a
              href="/testarossa"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded transition"
            >
              Ver más
            </a>
          </div>
        </div>

        {/* Impala */}
        <div className="bg-neutral-900 border border-neutral-700 p-4 rounded-lg shadow-lg hover:shadow-xl transition mb-1">
          <Image
            src="/BuickLeSabre1959.png"
            alt="Impala 1959"
            width={600}
            height={400}
            className="object-cover rounded mb-4"
          />
          <h3 className="text-xl font-semibold">Impala 1959</h3>
          <p className="text-sm text-gray-400 mb-4">Vista en 360°</p>
          <div className="text-right">
            <a
              href="/impala"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded transition"
            >
              Ver más
            </a>
          </div>
        </div>

        {/* Testarossa */}
        <div className="bg-neutral-900 border border-neutral-700 p-4 rounded-lg shadow-lg hover:shadow-xl transition mb-1">
          <Image
            src="/Ferrari250.png"
            alt="Ferrari Testarossa"
            width={550}
            height={350}
            className="object-cover rounded mb-1"
          />
          <h3 className="text-xl font-semibold">Ferrari 250</h3>
          <p className="text-sm text-gray-400 mb-4">Sin Vista en 360°</p>
          <div className="text-right">
            <a
              href="/ferrari250"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded transition"
            >
              Ver más
            </a>
          </div>
        </div>

        
      </div>
    </div>
  );
}
