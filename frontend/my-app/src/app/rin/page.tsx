'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function WheelProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState('unidad');

  const product = {
    name: "Rin de acero negro 17\"",
    model: "Torneos X99121B Negra",
    description: "Rines de acero negro de alta resistencia, diseño deportivo y acabado premium. Compatible con múltiples modelos de vehículos.",
    price: {
      unit: 350000,
      kit: 1500000,
      currency: "COP"
    },
    features: [
      "Diámetro: 17 pulgadas",
      "Ancho: 7.5 pulgadas",
      "Material: Acero de alta resistencia",
      "Color: Negro mate",
      "Patrón de tornillos: 5x114.3",
      "Offset: +35mm",
      "Peso: 12.5 kg (por rin)"
    ],
    shipping: {
      free: true,
      return: true,
      stock: "En stock",
      deliveryTime: "Envío en 24 a 48 horas"
    },
    images: [
      "/rin.png",
      "/Rin2.jpg",
      "/Rin3.png",
      "/Rin4.png"
    ]
  };

  const handleAddToCart = () => {
    // Lógica para añadir al carrito
    const item = {
      id: "X99121B",
      name: `${product.name} - ${product.model}`,
      price: selectedOption === 'unidad' ? product.price.unit : product.price.kit,
      quantity: quantity,
      option: selectedOption === 'unidad' ? 'Unidad' : 'Kit completo'
    };
    console.log("Añadido al carrito:", item);
    // Aquí iría la lógica real para añadir al carrito
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="#" className="text-gray-700 hover:text-blue-600 text-sm">Inicio</a>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-3 h-3 mx-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <a href="#" className="text-gray-700 hover:text-blue-600 text-sm">Accesorios</a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-3 h-3 mx-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="text-blue-600 text-sm font-medium">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Gallery */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="relative h-80 mb-4">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-contain rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, index) => (
                <div key={index} className="relative h-20 cursor-pointer border-2 border-transparent hover:border-blue-500 rounded">
                  <Image
                    src={img}
                    alt={`Vista ${index + 1} de ${product.name}`}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-lg text-gray-700 mb-4">{product.model}</p>
            
            <div className="mb-6">
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-3xl font-bold text-gray-900">
                  {selectedOption === 'unidad' 
                    ? `${product.price.currency} ${product.price.unit.toLocaleString()}` 
                    : `${product.price.currency} ${product.price.kit.toLocaleString()}`}
                </span>
                <span className="text-sm text-gray-500">
                  {selectedOption === 'unidad' ? 'por unidad' : 'kit completo (4 rines)'}
                </span>
              </div>
              
              <div className="flex space-x-4 mb-4">
                <button
                  onClick={() => setSelectedOption('unidad')}
                  className={`px-4 py-2 rounded-md ${selectedOption === 'unidad' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  Unidad
                </button>
                <button
                  onClick={() => setSelectedOption('kit')}
                  className={`px-4 py-2 rounded-md ${selectedOption === 'kit' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  Kit completo
                </button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-green-600 font-medium">{product.shipping.stock}</span>
                <span className="text-gray-600">- {product.shipping.deliveryTime}</span>
              </div>
              {product.shipping.free && (
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                  <span className="text-blue-600">Envío gratis</span>
                </div>
              )}
              {product.shipping.return && (
                <div className="flex items-center space-x-2 mt-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  <span className="text-blue-600">Devolución gratis</span>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-black-700 mb-2">Cantidad</label>
              <div className="flex">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-black-200 px-3 py-1 rounded-l-md"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-t border-b border-b-300"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-black-200 px-3 py-1 rounded-r-md"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-300"
            >
              Añadir a la carrito
            </button>

            {/* Features */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Características principales</h3>
              <ul className="list-disc pl-5 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-600">{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Compatibility Section */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Compatibilidad</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marca</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modelo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Años</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notas</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Toyota</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Corolla, Camry, RAV4</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2015-2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Requiere tuercas especiales</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Honda</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Civic, Accord, CR-V</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2016-2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Compatibilidad total</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Nissan</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Sentra, Altima, Rogue</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2017-2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">No compatible con versión NISMO</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}