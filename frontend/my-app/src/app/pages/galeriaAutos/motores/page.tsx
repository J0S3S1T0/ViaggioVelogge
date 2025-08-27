'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Definición de tipos TypeScript
type EngineType = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  characteristics: string[];
  commonApplications: string[];
  advantages: string[];
  disadvantages: string[];
  popularity: 'high' | 'medium' | 'low';
};

type EngineVariant = {
  id: string;
  name: string;
  engineType: string;
  description: string;
  specs: string[];
  typicalUse: string[];
  cars: string[];
  gallery: string[];
};

type Component = {
  id: string;
  name: string;
  description: string;
  mandatory: boolean;
  detailImage?: string; // Imagen adicional para el detalle
};

const MotorsGallery = () => {
  const [selectedEngine, setSelectedEngine] = useState<EngineType | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<EngineVariant | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVariantImage, setSelectedVariantImage] = useState<string | null>(null);

  // Datos de los tipos de motores
  const engineTypes: EngineType[] = [
    {
      id: 'v-type',
      name: 'Motores en V',
      subtitle: 'Configuración compacta y potente',
      description: 'Los motores en V tienen sus cilindros dispuestos en dos bancadas inclinadas en forma de V. Esta configuración permite motores más compactos con mayor número de cilindros, ideal para vehículos de alto rendimiento donde el espacio es limitado.',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      characteristics: [
        'Cilindros dispuestos en dos bancadas en ángulo',
        'Más compacto que los motores en línea con igual número de cilindros',
        'Menos vibraciones que los motores en línea de 4 cilindros',
        'Mayor coste de fabricación y mantenimiento'
      ],
      commonApplications: [
        'Vehículos de alto rendimiento y deportivos',
        'Camionetas y vehículos grandes',
        'Vehículos de lujo'
      ],
      advantages: [
        'Alta potencia y torque',
        'Configuración compacta',
        'Suave funcionamiento',
        'Ideal para tracción trasera o integral'
      ],
      disadvantages: [
        'Complejidad mecánica',
        'Mayor coste de producción',
        'Más difícil de trabajar que los motores en línea'
      ],
      popularity: 'high'
    },
    {
      id: 'inline',
      name: 'Motores en Línea',
      subtitle: 'Configuración simple y eficiente',
      description: 'Los motores en línea tienen todos sus cilindros alineados en una sola fila. Es la configuración más común para motores de 4 cilindros, apreciada por su simplicidad, eficiencia y bajo coste de producción.',
      image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      characteristics: [
        'Todos los cilindros dispuestos en una sola fila',
        'Diseño simple y compacto en longitud',
        'Fácil mantenimiento y reparación',
        'Menos piezas móviles que los motores en V'
      ],
      commonApplications: [
        'Vehículos económicos y compactos',
        'Motores diésel para aplicindustrias diversas',
        'Vehículos con restricciones de espacio en anchura'
      ],
      advantages: [
        'Simplicidad de diseño',
        'Bajo coste de producción y mantenimiento',
        'Fácil de trabajar para modificaciones',
        'Eficiente en términos de espacio'
      ],
      disadvantages: [
        'Limitado en número de cilindros (generalmente hasta 6)',
        'Mayor longitud que configuraciones en V',
        'Más vibraciones en configuraciones de 4 cilindros'
      ],
      popularity: 'high'
    },
    {
      id: 'rotary',
      name: 'Motores Rotativos',
      subtitle: 'El innovador diseño Wankel',
      description: 'Los motores rotativos o Wankel funcionan con un principio completamente diferente a los motores de pistones tradicionales. Utilizan rotores triangulares que giran dentro de una cámara ovalada, proporcionando una relación potencia-peso excepcional y un funcionamiento suave.',
      image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      characteristics: [
        'Funcionamiento mediante rotores en lugar de pistones',
        'Menos partes móviles que los motores tradicionales',
        'Alta relación potencia-peso',
        'Flujo de potencia suave y continuo'
      ],
      commonApplications: [
        'Vehículos deportivos (principalmente Mazda RX)',
        'Aplicaciones aéreas ligeras',
        'Vehículos conceptuales y de competición'
      ],
      advantages: [
        'Compacto y ligero para la potencia que genera',
        'Suave funcionamiento con menos vibraciones',
        'Alto régimen de giro',
        'Potencia continua sin interrupciones'
      ],
      disadvantages: [
        'Mayor consumo de combustible y aceite',
        'Emisiones más difíciles de controlar',
        'Desgaste prematuro de los sellos de los rotores',
        'Menor eficiencia térmica'
      ],
      popularity: 'medium'
    },
    {
      id: 'boxer',
      name: 'Motores Boxer',
      subtitle: 'Diseño horizontal y bajo centro de gravedad',
      description: 'Los motores boxer, también conocidos como motores opuestos o horizontalmente opuestos, tienen cilindros dispuestos en two bancadas opuestas horizontalmente. Esta configuración ofrece un centro de gravedad bajo y reduce las vibraciones.',
      image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      characteristics: [
        'Cilindros opuestos horizontalmente',
        'Centro de gravedad bajo',
        'Excelente balance natural que reduces vibraciones',
        'Mayor anchura que otros diseños'
      ],
      commonApplications: [
        'Vehículos Subaru y Porsche',
        'Vehículos con necesidades de manejo mejorado',
        'Aviación general (motores de avión)'
      ],
      advantages: [
        'Manejo mejorado debido al centro de gravedad bajo',
        'Reducción significativa de vibraciones',
        'Buena accesibilidad para mantenimiento',
        'Diseño robusto y confiable'
      ],
      disadvantages: [
        'Mayor complejidad en algunos diseños',
        'Mayor anchura que limita su uso en algunos vehículos',
        'Coste de producción más elevado'
      ],
      popularity: 'medium'
    }
  ];

  // Datos de variantes específicas de motores
  const engineVariants: EngineVariant[] = [
    // Motores en V
    {
      id: 'v6',
      name: 'V6',
      engineType: 'v-type',
      description: 'Los motores V6 ofrecen un equilibrio perfecto entre potencia, tamaño y eficiencia. Con seis cilindros en configuración V, son populares en una amplia gama de vehículos, desde sedanes familiares hasta deportivos.',
      specs: [
        '6 cilindros en dos bancadas de 3',
        'Desplazamientos típicos: 2.5L - 4.0L',
        'Ángulo común entre bancadas: 60° o 90°',
        'Potencia: 200HP - 450HP (en versiones de producción)',
        'Excelente equilibrio entre potencia y eficiencia'
      ],
      typicalUse: [
        'Sedanes medianos y grandes',
        'SUVs y crossovers',
        'Deportivos de entrada y gama media',
        'Vehículos familiares de prestaciones mejoradas'
      ],
      cars: [
        'Nissan 350Z',
        'Toyota Camry V6',
        'Honda Accord V6',
        'Ford Edge ST',
        'Audi S4',
        'Hyundai Genesis'
      ],
      gallery: [
        'https://images.unsplash.com/photo-1603398938373-e54da0bb5e48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1568454537842-d933259bb258?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'v8',
      name: 'V8',
      engineType: 'v-type',
      description: 'El motor V8 es una de las configuraciones más icónicas en el mundo del automovilismo. Con ocho cilindros dispuestos en dos bancadas de cuatro, ofrece un sonido característico y un rendimiento excepcional.',
      specs: [
        '8 cilindros en dos bancadas de 4',
        'Desplazamientos típicos: 4.0L - 6.2L+',
        'Relación compresión: 9:1 - 12:1+',
        'Potencia: 300HP - 700HP+ (en versiones de producción)',
        'Ángulo común: 90° (a veces 60° o 72°)',
        'Alto torque y sonido característico'
      ],
      typicalUse: [
        'Muscle cars y deportivos americanos',
        'Vehículos de lujo de alto rendimiento',
        'Pickups y SUVs de gama alta',
        'Competición (NASCAR, F1 históricamente)'
      ],
      cars: [
        'Ford Mustang GT',
        'Chevrolet Corvette',
        'Dodge Challenger SRT',
        'BMW M5',
        'Mercedes-AMG C63',
        'Audi RS6',
        'Toyota Tundra',
        'Ford F-150 Raptor'
      ],
      gallery: [
        'https://images.unsplash.com/photo-1603398938373-e54da0bb5e48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1568454537842-d933259bb258?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'v10',
      name: 'V10',
      engineType: 'v-type',
      description: 'Los motores V10 representan la búsqueda de la potencia extrema. Con diez cilindros en configuración V, ofrecen un rendimiento excepcional y un sonido único que los hace populares en superdeportivos y vehículos de alto rendimiento.',
      specs: [
        '10 cilindros en dos bancadas de 5',
        'Desplazamientos típicos: 5.0L - 8.4L',
        'Potencia: 500HP - 1000HP+ (en versiones de producción)',
        'Alto régimen de giro y respuesta rápida',
        'Sonido agresivo y característico'
      ],
      typicalUse: [
        'Superdeportivos y hypercars',
        'Vehículos de competición',
        'Pickups de alto rendimiento',
        'Vehículos de lujo ultra exclusivos'
      ],
      cars: [
        'Lamborghini Huracán',
        'Dodge Viper',
        'Audi R8 V10',
        'Porsche Carrera GT',
        'Lexus LFA',
        'BMW M5 E60'
      ],
      gallery: [
        'https://images.unsplash.com/photo-1603398938373-e54da0bb5e48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1568454537842-d933259bb258?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'v12',
      name: 'V12',
      engineType: 'v-type',
      description: 'El motor V12 es la configuración de mayor prestigio y suavidad de funcionamiento. Con doce cilindros en V, ofrece un equilibrio perfecto y una potencia excepcional, siendo la elección preferida para los vehículos más exclusivos del mundo.',
      specs: [
        '12 cilindros en dos bancadas de 6',
        'Desplazamientos típicos: 5.0L - 8.0L+',
        'Excepcional suavidad de funcionamiento',
        'Potencia: 400HP - 1500HP+ (en versiones de producción y tuning)',
        'Funcionamiento suave y balance perfecto'
      ],
      typicalUse: [
        'Superdeportivos y hypercars',
        'Vehículos de lujo ultra exclusivos',
        'Vehículos históricos de competición',
        'Embarcaciones de alto rendimiento'
      ],
      cars: [
        'Ferrari LaFerrari',
        'Lamborghini Aventador',
        'Aston Martin DBS',
        'Rolls-Royce Phantom',
        'BMW 760Li',
        'Mercedes-Benz S600'
      ],
      gallery: [
        'https://images.unsplash.com/photo-1603398938373-e54da0bb5e48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1568454537842-d933259bb258?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'v4',
      name: 'V4',
      engineType: 'v-type',
      description: 'Los motores V4 son una configuración compacta y poco común en automóviles, pero ampliamente utilizada en motocicletas de alta gama. Ofrecen un buen equilibrio en un paquete pequeño, ideal para aplicaciones donde el espacio es limitado.',
      specs: [
        '4 cilindros en dos bancadas de 2',
        'Desplazamientos típicos: 1.0L - 2.0L',
        'Configuración compacta y liviana',
        'Menos común en automóviles, más en motocicletas',
        'Mejor equilibrio que los motores en línea de 4 cilindros'
      ],
      typicalUse: [
        'Motocicletas de alta gama',
        'Algunos automóviles pequeños históricos',
        'Vehículos de competición específicos',
        'Aplicaciones industriales y marinas'
      ],
      cars: [
        'Ford Taunus V4',
        'SAAB 96',
        'ZAZ Zaporozhets',
        'Moto Honda VFR800',
        'Moto Aprilia RSV4'
      ],
      gallery: [
        'https://images.unsplash.com/photo-1603398938373-e54da0bb5e48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1568454537842-d933259bb258?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'v16',
      name: 'V16',
      engineType: 'v-type',
      description: 'Los motores V16 son una configuración extremadamente rara y exclusiva, reservada para vehículos de exhibición y prototipos de ultra lujo. Representan la máxima expresión de ingeniería y prestigio en el mundo automotriz.',
      specs: [
        '16 cilindros en dos bancadas de 8',
        'Desplazamientos típicos: 8.0L - 12.0L+',
        'Configuración extremadamente larga y compleja',
        'Potencia excepcional: 1000HP - 5000HP+',
        'Reservado para aplicaciones exclusivas y demostraciones técnicas'
      ],
      typicalUse: [
        'Autos de exhibición y concept cars',
        'Prototipos de ultra lujo',
        'Vehículos récord de velocidad',
        'Aplicaciones marinas de alto rendimiento',
        'Vehículos históricos de competición'
      ],
      cars: [
        'Cadillac Sixteen Concept',
        'Marmon Sixteen',
        'Cizeta-Moroder V16T',
        'BRM V16 (Fórmula 1 histórica)',
        'Bugatti Royale (histórico)'
      ],
      gallery: [
        'https://images.unsplash.com/photo-1603398938373-e54da0bb5e48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1568454537842-d933259bb258?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    // Motores en línea
    {
      id: 'l4',
      name: '4 en Línea',
      engineType: 'inline',
      description: 'El motor de 4 cilindros en línea es la configuración más común en los vehículos modernos. Su simplicidad, eficiencia y bajo coste lo han convertido en la opción preferida para la mayoría de los automóviles de pasajeros.',
      specs: [
        '4 cilindros en configuración lineal',
        'Desplazamientos típicos: 1.2L - 2.5L',
        'Configuración más común: transversal',
        'Potencia: 75HP - 350HP (con turbo)'
      ],
      typicalUse: [
        'Vehículos económicos y compactos',
        'Sedanes y hatchbacks medianos',
        'Motores base para tuning y modificaciones',
        'Aplicaciones con turbocompresor para alto rendimiento'
      ],
      cars: [
        'Honda Civic',
        'Toyota Corolla',
        'Volkswagen Golf',
        'Ford Focus',
        'BMW 320i',
        'Hyundai Elantra'
      ],
      gallery: [
        'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1568454537842-d933259bb258?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'l6',
      name: '6 en Línea',
      engineType: 'inline',
      description: 'Los motores de 6 cilindros en línea son conocidos por su suavidad de funcionamiento y balance natural. Aunque más largos que los V6, su diseño simple y equilibrado los hace populares en vehículos premium.',
      specs: [
        '6 cilindros en configuración lineal',
        'Desplazamientos típicos: 2.5L - 4.0L',
        'Balance natural que reduce vibraciones',
        'Potencia: 150HP - 350HP (en versiones de producción)'
      ],
      typicalUse: [
        'Vehículos premium y de lujo',
        'Deportivos clásicos y modernos',
        'Vehículos con configuración longitudinal',
        'Aplicaciones donde la suavidad es prioritaria'
      ],
      cars: [
        'BMW M3 (E46)',
        'Jaguar XJ6',
        'Toyota Supra (2JZ)',
        'Mercedes-Benz E400',
        'Volvo S90'
      ],
      gallery: [
        'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1568454537842-d933259bb258?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    // Motores rotativos
    {
      id: 'wankel',
      name: 'Wankel Rotativo',
      engineType: 'rotary',
      description: 'El motor Wankel es el diseño rotativo más conocido, popularizado por Mazda en sus vehículos RX. A diferencia de los motores alternativos, utiliza rotores triangulares que giran dentro de una cámara ovalada.',
      specs: [
        'Funciona con rotores en lugar de pistones',
        'Desplazamiento típico: 1.3L (pero con potencia equivalente a mayores desplazamientos)',
        'Alto régimen de giro (8000-9000 RPM fácilmente)',
        'Potencia: 200HP - 700HP+ (modificado)'
      ],
      typicalUse: [
        'Deportivos Mazda RX series',
        'Competición y automovilismo',
        'Aplicaciones donde el peso reducido es crítico',
        'Vehículos conceptuales y experimentales'
      ],
      cars: [
        'Mazda RX-7',
        'Mazda RX-8',
        'NSU Spider',
        'Citroën GS Birotor',
        'Mercedes-Benz C111'
      ],
      gallery: [
        'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1568454537842-d933259bb258?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    // Motores boxer
    {
      id: 'boxer4',
      name: 'Boxer 4 cilindros',
      engineType: 'boxer',
      description: 'El motor boxer de 4 cilindros es conocido por su bajo centro de gravedad y su característico sonido. Es la configuración preferida por Subaru para muchos de sus vehículos.',
      specs: [
        '4 cilindros opuestos horizontalmente',
        'Desplazamientos típicos: 1.6L - 2.5L',
        'Bajo centro de gravedad',
        'Potencia: 100HP - 300HP (con turbo)'
      ],
      typicalUse: [
        'Vehículos Subaru (Impreza, WRX, Forester)',
        'Vehículos con tracción total',
        'Rally y competición',
        'Vehículos que priorizan el manejo'
      ],
      cars: [
        'Subaru WRX STI',
        'Subaru BRZ',
        'Subaru Outback',
        'Porsche 718 Boxster (4 cilindros)'
      ],
      gallery: [
        'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1568454537842-d933259bb258?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'boxer6',
      name: 'Boxer 6 cilindros',
      engineType: 'boxer',
      description: 'El motor boxer de 6 cilindros ofrece la suavidad de un seis en línea con las ventajas de un centro de gravedad bajo. Es característico de los Porsche 911.',
      specs: [
        '6 cilindros opuestos horizontalmente',
        'Desplazamientos típicos: 3.0L - 4.0L',
        'Excelente balance и suavidad',
        'Potencia: 250HP - 700HP+ (en versiones de producción y tuning)'
      ],
      typicalUse: [
        'Porsche 911',
        'Vehículos deportivos de alto rendimiento',
        'Vehículos donde el manejo es prioritario',
        'Competición'
      ],
      cars: [
        'Porsche 911 Carrera',
        'Porsche 911 Turbo',
        'Porsche 911 GT3',
        'Subaru SVX (histórico)'
      ],
      gallery: [
        'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1568454537842-d933259bb258?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    }
  ];

  // Componentes de motores
  const engineComponents: Component[] = [
    // Componentes obligatorios
    { 
      id: 'block', 
      name: 'Bloque motor', 
      description: 'Estructura principal que aloja los cilindros y componentes internos del motor.', 
      mandatory: true,
      detailImage: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'crankshaft', 
      name: 'Cigüeñal', 
      description: 'Convierte el movimiento lineal de los pistones en movimiento rotativo.', 
      mandatory: true,
      detailImage: 'https://images.unsplash.com/photo-1568454537842-d933259bb258?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'pistons', 
      name: 'Pistones', 
      description: 'Se mueven dentro de los cilindros comprimiendo la mezcla aire-combustible.', 
      mandatory: true,
      detailImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'rods', 
      name: 'Bielas', 
      description: 'Conectan los pistones al cigüeñal transmitiendo la fuerza de la combustión.', 
      mandatory: true,
      detailImage: 'https://images.unsplash.com/photo-1603398938373-e54da0bb5e48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'head', 
      name: 'Culata (cabeza del motor)', 
      description: 'Sella la parte superior del bloque y aloja las válvulas y bujías.', 
      mandatory: true,
      detailImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'valves', 
      name: 'Válvulas de admisión y escape', 
      description: 'Controlan el flujo de entrada y salida de gases en los cilindros.', 
      mandatory: true,
      detailImage: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'camshaft', 
      name: 'Árbol de levas', 
      description: 'Controla la apertura y cierre de las válvulas según la secuencia adecuada.', 
      mandatory: true,
      detailImage: 'https://images.unsplash.com/photo-1568454537842-d933259bb258?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'oilpan', 
      name: 'Cárter de aceite', 
      description: 'Depósito que almacena el aceite lubricante en la parte inferior del motor.', 
      mandatory: true,
      detailImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'oilpump', 
      name: 'Bomba de aceite', 
      description: 'Circula el aceite a presión por todo el sistema de lubricación.', 
      mandatory: true,
      detailImage: 'https://images.unsplash.com/photo-1603398938373-e54da0bb5e48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'oilfilter', 
      name: 'Filtro de aceite', 
      description: 'Elimina impurezas y partículas metálicas del aceite lubricante.', 
      mandatory: true,
      detailImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'radiator', 
      name: 'Radiador', 
      description: 'Disipa el calor del líquido refrigerante manteniendo la temperatura óptima.', 
      mandatory: true,
      detailImage: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'waterpump', 
      name: 'Bomba de agua', 
      description: 'Circula el líquido refrigerante through del sistema de refrigeración.', 
      mandatory: true,
      detailImage: 'https://images.unsplash.com/photo-1568454537842-d933259bb258?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'thermostat', 
      name: 'Termostato', 
      description: 'Regula el flujo de refrigerante según la temperatura del motor.', 
      mandatory: true,
      detailImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'sparkplugs', 
      name: 'Bujías', 
      description: 'Generan la chispa que enciende la mezcla aire-combustible en los cilindros.', 
      mandatory: true,
      detailImage: 'https://images.unsplash.com/photo-1603398938373-e54da0bb5e48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'coils', 
      name: 'Bobinas de encendido', 
      description: 'Proveen alto voltaje a las bujías para generar la chispa de combustión.', 
      mandatory: true,
      detailImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'injectors', 
      name: 'Inyectores', 
      description: 'Rocían el combustible en la cámara de combustión o múltiple de admisión.', 
      mandatory: true,
      detailImage: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'fuelpump', 
      name: 'Bomba de combustible', 
      description: 'Envía combustible desde el tanque al sistema de inyección.', 
      mandatory: true,
      detailImage: 'https://images.unsplash.com/photo-1568454537842-d933259bb258?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'intake', 
      name: 'Colector de admisión', 
      description: 'Distribuye el aire hacia los diferentes cilindros del motor.', 
      mandatory: true,
      detailImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'exhaust', 
      name: 'Colector de escape', 
      description: 'Recolecta los gases de escape de los cilindros hacia el sistema de escape.', 
      mandatory: true,
      detailImage: 'https://images.unsplash.com/photo-1603398938373-e54da0bb5e48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'sensors', 
      name: 'Sensores de posición', 
      description: 'Monitorizan la posición del cigüeñal y árbol de levas para la sincronización.', 
      mandatory: true,
      detailImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'ecu', 
      name: 'ECU (unidad de control del motor)', 
      description: 'Computadora que gestiona todos los parámetros de funcionamiento del motor.', 
      mandatory: true,
      detailImage: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    
    // Componentes opcionales
    { 
      id: 'turbo', 
      name: 'Turbo o supercargador', 
      description: 'Aumenta la potencia forzando más aire a la cámara de combustión.', 
      mandatory: false,
      detailImage: 'https://images.unsplash.com/photo-1568454537842-d933259bb258?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'intercooler', 
      name: 'Intercooler', 
      description: 'Enfría el aire comprimido por el turbo aumentando su densidad y oxígeno.', 
      mandatory: false,
      detailImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'cai', 
      name: 'Filtro de aire de alto flujo / intake frío', 
      description: 'Mejora el flujo de aire y reduce la temperatura de admisión.', 
      mandatory: false,
      detailImage: 'https://images.unsplash.com/photo-1603398938373-e54da0bb5e48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'exhaustsys', 
      name: 'Sistema de escape deportivo', 
      description: 'Reduce restricciones mejorando el flujo de gases y el sonido.', 
      mandatory: false,
      detailImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'performanceradiator', 
      name: 'Radiador de alto rendimiento', 
      description: 'Mejora la capacidad de refrigeración para uso intensivo.', 
      mandatory: false,
      detailImage: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'fans', 
      name: 'Ventiladores eléctricos adicionales', 
      description: 'Aumentan el flujo de aire through del radiador en condiciones extremas.', 
      mandatory: false,
      detailImage: 'https://images.unsplash.com/photo-1568454537842-d933259bb258?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'iridium', 
      name: 'Bujías de iridio / alto rendimiento', 
      description: 'Ofrecen mejor combustión y mayor durabilidad que las bujías estándar.', 
      mandatory: false,
      detailImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'performancecoils', 
      name: 'Bobinas de encendido mejoradas', 
      description: 'Proveen chispa más potente y consistente para mejor combustión.', 
      mandatory: false,
      detailImage: 'https://images.unsplash.com/photo-1603398938373-e54da0bb5e48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'injectorsupgrade', 
      name: 'Inyectores de mayor caudal', 
      description: 'Permiten mayor flujo de combustible para aplicaciones de alta potencia.', 
      mandatory: false,
      detailImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'tune', 
      name: 'ECU reprogramada o aftermarket', 
      description: 'Optimiza parámetros del motor para mayor rendimiento o eficiencia.', 
      mandatory: false,
      detailImage: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'fuelmanagement', 
      name: 'Sistema de gestión de combustible', 
      description: 'Controla precisamente presión y flujo de combustible para tuning.', 
      mandatory: false,
      detailImage: 'https://images.unsplash.com/photo-1568454537842-d933259bb258?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'catchcan', 
      name: 'Catch can (recuperador de vapores)', 
      description: 'Separa el aceite de los vapores del cárter antes de reintroducirlos.', 
      mandatory: false,
      detailImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'pulleys', 
      name: 'Poleas livianas o ajustables', 
      description: 'Reducen peso rotational o permiten ajustar relación de accesorios.', 
      mandatory: false,
      detailImage: 'https://images.unsplash.com/photo-1603398938373-e54da0bb5e48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'timingkit', 
      name: 'Kit de distribución reforzado', 
      description: 'Mayor durabilidad para aplicaciones de alto rendimiento o régimen.', 
      mandatory: false,
      detailImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'valvecovers', 
      name: 'Tapas de válvulas personalizadas', 
      description: 'Mejoran la apariencia y pueden ofrecer mejor ventilación.', 
      mandatory: false,
      detailImage: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'sparkplugwires', 
      name: 'Cables de bujía de alto rendimiento', 
      description: 'Minimizan pérdidas eléctricas para chispa más consistente.', 
      mandatory: false,
      detailImage: 'https://images.unsplash.com/photo-1568454537842-d933259bb258?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'widesensor', 
      name: 'Sensor de oxígeno de banda ancha', 
      description: 'Permite medición precisa de mezcla aire-combustible para tuning.', 
      mandatory: false,
      detailImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'gauges', 
      name: 'Manómetros (boost, temperatura, presión)', 
      description: 'Monitorean parámetros cruciales del motor para el conductor.', 
      mandatory: false,
      detailImage: 'https://images.unsplash.com/photo-1603398938373-e54da0bb5e48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'nos', 
      name: 'Sistema de óxido nitroso (NOS)', 
      description: 'Inyecta óxido nitroso para aumentar potencia temporalmente.', 
      mandatory: false,
      detailImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'drysumps', 
      name: 'Sistema de lubricación seco (dry sump)', 
      description: 'Elimina el cárter tradicional para mejor lubricación en condiciones extremas.', 
      mandatory: false,
      detailImage: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'oilcooler', 
      name: 'Refrigerador de aceite adicional', 
      description: 'Mantiene temperatura óptima del aceite en uso intensivo.', 
      mandatory: false,
      detailImage: 'https://images.unsplash.com/photo-1568454537842-d933259bb258?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'mounts', 
      name: 'Soportes de motor reforzados', 
      description: 'Reducen movimiento del motor improving respuesta y durabilidad.', 
      mandatory: false,
      detailImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  // Manejar la selección de un tipo de motor
  const handleEngineSelect = (engine: EngineType) => {
    setSelectedEngine(engine);
    setSelectedVariant(null);
  };

  // Manejar la selección de una variante de motor
  const handleVariantSelect = (variant: EngineVariant) => {
    setSelectedVariant(variant);
    setSelectedVariantImage(variant.gallery[0]); // Establecer la primera imagen como principal
  };

  // Manejar la selección de una imagen de la galería
  const handleImageSelect = (image: string) => {
    setSelectedVariantImage(image);
  };

  // Filtrar variantes por tipo de motor
  const getVariantsByType = (typeId: string) => {
    return engineVariants.filter(variant => variant.engineType === typeId);
  };

  // Obtener clase de color según popularidad
  const getColorClass = (popularity: string) => {
    switch(popularity) {
      case 'high': return 'bg-gradient-to-r from-blue-600 to-purple-700';
      case 'medium': return 'bg-gradient-to-r from-green-600 to-teal-700';
      case 'low': return 'bg-gradient-to-r from-gray-600 to-gray-700';
      default: return 'bg-gradient-to-r from-gray-600 to-gray-700';
    }
  };

  // Filtrar componentes por tipo (obligatorios/opcionales)
  const mandatoryComponents = engineComponents.filter(comp => comp.mandatory);
  const optionalComponents = engineComponents.filter(comp => !comp.mandatory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="container mx-auto py-6 px-4">
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tipos de Motores</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Explora los diferentes tipos de motores utilizados en autos modificados y sus características únicas
          </p>
        </div>

        <nav className="flex justify-between items-center py-4 border-b border-gray-700">
          <Link href="/pages/galeriaAutos" className="text-purple-400 hover:text-purple-300 transition-colors">
            ← Volver a la Galeria
          </Link>
          <div className="flex space-x-4">
            <Link href="/galeria" className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              Galería de Autos
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Introducción */}
        <div className="bg-gray-800 rounded-xl p-6 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-purple-400">Introducción a los Motores</h2>
          <p className="text-gray-300 mb-4">
            El motor es el corazón de cualquier vehículo, transformando la energía química del combustible en energía mecánica que impulsa las ruedas. 
            Existen diversas configuraciones de motores, cada una con sus ventajas, desventajas y aplicaciones específicas.
          </p>
          <p className="text-gray-300">
            En esta sección, explorarás los principales tipos de motores, sus variantes específicas y los componentes que los forman. 
            Podrás descubrir qué vehículos utilizan cada tipo de motor y visualizar sus partes fundamentales.
          </p>
        </div>

        {/* Tipos de Motores */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Selecciona un Tipo de Motor</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {engineTypes.map((engine) => (
              <div 
                key={engine.id} 
                className={`rounded-xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 ${getColorClass(engine.popularity)}`}
                onClick={() => handleEngineSelect(engine)}
              >
                <div className="relative h-48">
                  <Image
                    src={engine.image}
                    alt={engine.name}
                    fill
                    className="object-cover opacity-70"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center flex-col p-4">
                    <h3 className="text-xl font-bold text-center">{engine.name}</h3>
                    <p className="text-gray-300 text-center text-sm mt-1">{engine.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detalles del motor seleccionado */}
        {selectedEngine && (
          <div className="bg-gray-800 rounded-xl p-6 mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-purple-400">{selectedEngine.name}</h2>
                <p className="text-gray-400">{selectedEngine.subtitle}</p>
              </div>
              <button 
                onClick={() => setSelectedEngine(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={selectedEngine.image}
                    alt={selectedEngine.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <h3 className="text-xl font-semibold mb-2">Descripción</h3>
                <p className="text-gray-300 mb-6">{selectedEngine.description}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Características Principales</h3>
                <ul className="space-y-2 mb-6">
                  {selectedEngine.characteristics.map((char, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span className="text-gray-300">{char}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-semibold mb-4">Aplicaciones Comunes</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedEngine.commonApplications.map((app, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300">
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-green-400">Ventajas</h3>
                <ul className="space-y-2">
                  {selectedEngine.advantages.map((adv, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span className="text-gray-300">{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-red-400">Desventajas</h3>
                <ul className="space-y-2">
                  {selectedEngine.disadvantages.map((dis, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-400 mr-2">✗</span>
                      <span className="text-gray-300">{dis}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Variantes de este tipo de motor */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6 text-center">Variantes de {selectedEngine.name}</h3>
              <div className="space-y-12">
                {getVariantsByType(selectedEngine.id).map((variant, index) => (
                  <div key={variant.id} className={`bg-gray-700 rounded-xl p-6 ${selectedVariant?.id === variant.id ? 'ring-2 ring-purple-500' : ''}`}>
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${index % 2 === 1 ? 'lg:grid-flow-row-dense' : ''}`}>
                      {/* Imagen principal de la variante */}
                      <div className={`relative h-64 rounded-lg overflow-hidden ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                        <Image
                          src={selectedVariant?.id === variant.id && selectedVariantImage ? selectedVariantImage : variant.gallery[0]}
                          alt={variant.name}
                          fill
                          className="object-cover cursor-pointer"
                          onClick={() => setSelectedImage(selectedVariant?.id === variant.id && selectedVariantImage ? selectedVariantImage : variant.gallery[0])}
                        />
                      </div>
                      
                      <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                        <h4 className="text-xl font-bold mb-2 text-purple-400">{variant.name}</h4>
                        <p className="text-gray-300 mb-4">{variant.description}</p>
                        
                        <h5 className="text-lg font-semibold mb-2">Especificaciones</h5>
                        <ul className="space-y-2 mb-4">
                          {variant.specs.map((spec, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-purple-400 mr-2">•</span>
                              <span className="text-gray-300">{spec}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <h5 className="text-lg font-semibold mb-2">Usos Típicos</h5>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {variant.typicalUse.map((use, i) => (
                            <span key={i} className="px-3 py-1 bg-gray-600 rounded-full text-sm text-gray-300">
                              {use}
                            </span>
                          ))}
                        </div>
                        
                        <button 
                          onClick={() => handleVariantSelect(variant)}
                          className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          {selectedVariant?.id === variant.id ? 'Ocultar detalles' : 'Ver más detalles'}
                        </button>
                      </div>
                    </div>
                    
                    {/* Detalles expandidos de la variante */}
                    {selectedVariant?.id === variant.id && (
                      <div className="mt-6 pt-6 border-t border-gray-600">
                        <h5 className="text-lg font-semibold mb-4">Vehículos con motor {variant.name}</h5>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
                          {variant.cars.map((car, i) => (
                            <div key={i} className="bg-gray-600 rounded-lg p-3 text-center">
                              <span className="text-sm text-gray-300">{car}</span>
                            </div>
                          ))}
                        </div>
                        
                        <h5 className="text-lg font-semibold mb-4">Galería de imágenes</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {variant.gallery.map((img, i) => (
                            <div 
                              key={i} 
                              className={`relative h-40 rounded-lg overflow-hidden cursor-pointer ${selectedVariantImage === img ? 'ring-2 ring-purple-500' : ''}`}
                              onClick={() => handleImageSelect(img)}
                            >
                              <Image
                                src={img}
                                alt={`${variant.name} ${i + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sección de Componentes del Motor */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Componentes del Motor</h2>
          
          {/* Componentes Obligatorios */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-4 text-green-400">Componentes de Serie / Fabrica</h3>
            <p className="text-gray-300 mb-6">
              Estos son esenciales para el funcionamiento básico del motor y todos los motores los incluyen:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mandatoryComponents.map((component) => (
                <div key={component.id} className="bg-gray-700 rounded-lg p-4 relative">
                  <h4 className="font-semibold text-lg mb-2">{component.name}</h4>
                  <p className="text-gray-300 text-sm mb-4">{component.description}</p>
                  <button 
                    onClick={() => setSelectedComponent(component)}
                    className="w-full py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Ver más información
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Componentes Opcionales */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-400">Componentes Opcionales / Modificables</h3>
            <p className="text-gray-300 mb-6">
              Estos se pueden agregar, mejorar o reemplazar para modificar el rendimiento, sonido o estilo del motor:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {optionalComponents.map((component) => (
                <div key={component.id} className="bg-gray-700 rounded-lg p-4 relative">
                  <h4 className="font-semibold text-lg mb-2">{component.name}</h4>
                  <p className="text-gray-300 text-sm mb-4">{component.description}</p>
                  <button 
                    onClick={() => setSelectedComponent(component)}
                    className="w-full py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Ver más información
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-12 border-t border-gray-700">
        <div className="text-center text-gray-400">
          <p>Galería de Tipos de Motores • {new Date().getFullYear()}</p>
        </div>
      </footer>

      {/* Modal para imagen de componente */}
      {selectedComponent && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-purple-400">{selectedComponent.name}</h3>
              <button 
                onClick={() => setSelectedComponent(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-4">
              <Image
                src={selectedComponent.detailImage || selectedComponent.detailImage || 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                alt={selectedComponent.name}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-gray-300">{selectedComponent.description}</p>
          </div>
        </div>
      )}

      {/* Modal para imagen ampliada */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl w-full h-full md:h-auto">
            <button 
              className="absolute top-4 right-4 text-white text-2xl z-10 bg-black bg-opacity-50 rounded-full p-2"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <div className="relative h-full md:h-96 lg:h-[500px] rounded-lg overflow-hidden">
              <Image
                src={selectedImage}
                alt="Imagen ampliada"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MotorsGallery;