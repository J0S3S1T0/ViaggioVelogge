'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Definición de tipos TypeScript
type ComponentPart = {
  id: string;
  name: string;
  description: string;
  image: string;
  features: string[];
  category: 'front' | 'sides' | 'rear';
};

type CarImage = {
  id: number;
  src: string;
  alt: string;
  section: 'bodykit' | 'paint' | 'wheels';
};

type PaintOption = {
  id: string;
  name: string;
  type: string;
  description: string;
  image: string;
  features: string[];
  examples: string[];
  category: 'basic' | 'special' | 'advanced';
};

type WheelOption = {
  id: string;
  name: string;
  brand: string;
  description: string;
  image: string;
  features: string[];
  sizes: string[];
};

const ComponentGallery = () => {
  const [selectedPart, setSelectedPart] = useState<ComponentPart | null>(null);
  const [selectedPaint, setSelectedPaint] = useState<PaintOption | null>(null);
  const [selectedWheel, setSelectedWheel] = useState<WheelOption | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeSection, setActiveSection] = useState<'bodykit' | 'paint' | 'wheels'>('bodykit');
  const [activeBodyKitCategory, setActiveBodyKitCategory] = useState<'front' | 'sides' | 'rear'>('front');
  const [activePaintCategory, setActivePaintCategory] = useState<'basic' | 'special' | 'advanced'>('basic');

  // Datos de las partes del body kit organizados por categorías
  const componentParts: ComponentPart[] = [
    // Componentes Delanteros (front)
    {
      id: 'front-bumper',
      name: 'Parachoques Delantero',
      description: 'Parachoques delantero deportivo con diseño agresivo y mejor flujo de aire para intercooler y radiador.',
      image: 'https://images.unsplash.com/photo-1629203850882-2a64e5a6f71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Material: Poliuretano flexible o fibra de vidrio',
        'Diseño: Más aerodinámico y agresivo que el original',
        'Funcionalidad: Mejora el flujo de aire al radiador y frenos',
        'Beneficios: Mejora enfriamiento y aspecto deportivo'
      ],
      category: 'front'
    },
    {
      id: 'splitter',
      name: 'Splitter Delantero',
      description: 'El splitter delantero es un componente aerodinámico que se instala en la parte baja del parachoques delantero para generar downforce y mejorar la estabilidad a altas velocidades.',
      image: 'https://images.unsplash.com/photo-1629203850883-7c2a8cbb6b71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Material: Fibra de carbono, ABS o poliuretano',
        'Función: Genera downforce en el eje delantero',
        'Diseño: Perfil aerodinámico para dirigir el flujo de aire',
        'Beneficios: Mejora la tracción y estabilidad'
      ],
      category: 'front'
    },
    {
      id: 'canards',
      name: 'Canards (Aletas Frontales)',
      description: 'Aletas frontales que mejoran la aerodinámica direccionando el flujo de aire y generando downforce adicional en el eje delantero.',
      image: 'https://images.unsplash.com/photo-1626668893638-1f7bb7f6e3c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Material: Fibra de carbono o ABS',
        'Función: Mejora la dirección del flujo de aire',
        'Instalación: Se montan en las esquinas del parachoques',
        'Beneficios: Mayor estabilidad a alta velocidad'
      ],
      category: 'front'
    },
    {
      id: 'hood',
      name: 'Capó',
      description: 'El capó es la cubierta exterior visible que regularmente está hecha de fibra de carbono o plástico, recubre el motor y mejora la aerodinámica del vehículo.',
      image: 'https://images.unsplash.com/photo-1626668893630-1f7bb7f6e3c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Material: Fibra de carbono o composites ligeros',
        'Peso: Reducido entre 30-50% respecto al original',
        'Diseño: Incluye ventilaciones para mejorar el flujo de aire',
        'Beneficios: Mejora la refrigeración del motor y reduce peso'
      ],
      category: 'front'
    },
    {
      id: 'front-vents',
      name: 'Tomas de Aire Frontales',
      description: 'Aberturas estratégicamente ubicadas que permiten el paso de aire para refrigeración de frenos, motor o intercooler.',
      image: 'https://images.unsplash.com/photo-1629203850886-2a64e5a6f71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Función: Mejora el flujo de aire para refrigeración',
        'Material: Integradas en paragolpes o capó',
        'Diseño: Optimizadas para máximo flujo de aire',
        'Beneficios: Mejor refrigeración de componentes críticos'
      ],
      category: 'front'
    },

    // Componentes Laterales (sides)
    {
      id: 'side-skirts',
      name: 'Faldones Laterales',
      description: 'Faldones que se instalan en la parte inferior de las puertas para mejorar la aerodinámica y el aspecto visual del vehículo.',
      image: 'https://images.unsplash.com/photo-1629203850887-2a64e5a6f71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Material: Poliuretano, fibra de vidrio o carbono',
        'Función: Reducen la turbulencia bajo el vehículo',
        'Diseño: Continuación de la línea del splitter delantero',
        'Beneficios: Mejor aerodinámica y apariencia agresiva'
      ],
      category: 'sides'
    },
    {
      id: 'fenders',
      name: 'Salpicaderas Ensanchadas',
      description: 'Las salpicaderas ensanchadas permiten instalar llantas de mayor tamaño y offset más agresivo, mejorando la estabilidad y el aspecto del vehículo.',
      image: 'https://images.unsplash.com/photo-1629203850888-2a64e5a6f71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Material: Fibra de vidrio, poliuretano o fibra de carbono',
        'Función: Permite llantas más anchas y neumáticos de mayor tamaño',
        'Diseño: Integrado con la línea original del vehículo',
        'Beneficios: Mayor estabilidad y aspecto agresivo'
      ],
      category: 'sides'
    },
    {
      id: 'overfenders',
      name: 'Cubre Guardabarros (Overfenders)',
      description: 'Extensiones que se instalan sobre los guardabarros originales para permitir el uso de neumáticos más anchos y dar un aspecto más musculoso al vehículo.',
      image: 'https://images.unsplash.com/photo-1629203850889-2a64e5a6f71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Material: Fibra de vidrio, plástico o carbono',
        'Función: Permite llantas extremadamente anchas',
        'Instalación: Atornillados o pegados sobre guardabarros originales',
        'Beneficios: Aspecto agresivo y mayor espacio para llantas'
      ],
      category: 'sides'
    },

    // Componentes Traseros (rear)
    {
      id: 'rear-bumper',
      name: 'Parachoques Trasero',
      description: 'Parachoques trasero deportivo con integración para difusor y salidas de escape, mejorando la aerodinámica y el aspecto visual trasero.',
      image: 'https://images.unsplash.com/photo-1629203850890-2a64e5a6f71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Material: Poliuretano o fibra de vidrio',
        'Diseño: Integración para difusor y escapes',
        'Funcionalidad: Mejora la salida del flujo de aire',
        'Beneficios: Aspecto deportivo y mejor aerodinámica trasera'
      ],
      category: 'rear'
    },
    {
      id: 'diffuser',
      name: 'Difusor Trasero',
      description: 'El difusor trasero acelera el aire que fluye debajo del vehículo, reduciendo la presión en la parte trasera y creando downforce adicional para mejorar la tracción.',
      image: 'https://images.unsplash.com/photo-1626668893639-1f7bb7f6e3c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Material: Fibra de carbono o ABS',
        'Función: Mejora la salida de aire debajo del vehículo',
        'Diseño: Canales verticales para dirigir el flujo de aire',
        'Beneficios: Genera downforce y reduce la resistencia aerodinámica'
      ],
      category: 'rear'
    },
    {
      id: 'wing',
      name: 'Alerón Trasero',
      description: 'El alerón trasero es un elemento aerodinámico que genera downforce en el eje trasero del vehículo, mejorando la tracción y estabilidad a altas velocidades.',
      image: 'https://images.unsplash.com/photo-1626668893638-1f7bb7f6e3c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Material: Fibra de carbono, ABS o aleación de aluminio',
        'Diseño: Perfil aerodinámico ajustable en muchos modelos',
        'Función: Genera downforce para mejor tracción trasera',
        'Beneficios: Reduce levantamiento trasero a alta velocidad'
      ],
      category: 'rear'
    },
    {
      id: 'rear-vents',
      name: 'Tomas de Aire Traseras',
      description: 'Aberturas traseras que permiten la salida de aire caliente del compartimento del motor o mejoran la aerodinámica trasera.',
      image: 'https://images.unsplash.com/photo-1629203850891-2a64e5a6f71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Función: Mejora la salida de aire caliente',
        'Ubicación: En el capó trasero o paragolpes',
        'Diseño: Optimizado para reducir resistencia',
        'Beneficios: Mejor refrigeración y aerodinámica'
      ],
      category: 'rear'
    }
  ];

  // Datos de opciones de pintura organizados por categorías
  const paintOptions: PaintOption[] = [
    // Acabados básicos
    {
      id: 'solid',
      name: 'Pintura Sólida',
      type: 'Acabado básico',
      description: 'Color plano sin efectos especiales, ofrece un aspecto uniforme y limpio con alto poder de cobertura.',
      image: 'https://images.unsplash.com/photo-15772299003719-08d70f9ec0c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Acabado: Color uniforme sin partículas reflectantes',
        'Durabilidad: Buena resistencia a los rayos UV',
        'Mantenimiento: Fácil de retocar y reparar',
        'Aplicación: Generalmente requiere menos capas que otros tipos'
      ],
      examples: [
        'Rojo sólido',
        'Azul sólido',
        'Negro sólido',
        'Blanco sólido'
      ],
      category: 'basic'
    },
    {
      id: 'metallic',
      name: 'Pintura Metálica',
      type: 'Acabado básico',
      description: 'La pintura metálica contiene pequeñas partículas de metal que reflejan la luz, creando un efecto de profundidad y brillo que cambia según el ángulo de visión.',
      image: 'https://images.unsplash.com/photo-15772299003719-08d70f9ec0c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Efecto: Profundidad visual y reflejos metálicos',
        'Durabilidad: Alta resistencia a los rayos UV',
        'Mantenimiento: Requiere lavados cuidadosos para evitar marcas',
        'Aplicación: Capa base con partículas metálicas + capa transparente'
      ],
      examples: [
        'Azul metálico',
        'Rojo metálico',
        'Plateado metálico',
        'Gris metálico oscuro'
      ],
      category: 'basic'
    },
    {
      id: 'pearl',
      name: 'Pintura Perlada',
      type: 'Acabado básico',
      description: 'La pintura con efecto perla utiliza partículas de nácar o mica que crean un efecto iridiscente, cambiando de color según la luz y el ángulo de visión.',
      image: 'https://images.unsplash.com/photo-1556906781-2f0520405b71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Efecto: Cambio de color según ángulo de visión (iridiscencia)',
        'Complejidad: Múltiples capas para lograr el efecto deseado',
        'Costo: Generalmente más costosa que la pintura metálica estándar',
        'Exclusividad: Aspecto premium y distintivo'
      ],
      examples: [
        'Blanco perla',
        'Negro con efecto perla azul',
        'Rojo con efecto perla naranja',
        'Verde perla'
      ],
      category: 'basic'
    },
    {
      id: 'matte',
      name: 'Pintura Mate',
      type: 'Acabado básico',
      description: 'La pintura mate ofrece un aspecto moderno y elegante sin reflejos. Es ideal para quienes buscan un look discreto pero sofisticado.',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Apariencia: Superficie no reflectante y uniforme',
        'Mantenimiento: Requiere productos especializados para limpieza',
        'Ventaja: Oculta mejor pequeños arañazos y imperfecciones',
        'Consideración: Más difícil de reparar que pinturas con brillo'
      ],
      examples: [
        'Negro mate',
        'Gris mate',
        'Azul mate',
        'Verde mate militar'
      ],
      category: 'basic'
    },
    {
      id: 'satin',
      name: 'Pintura Satinada',
      type: 'Acabado básico',
      description: 'Acabado intermedio entre mate y brillante, con un ligero brillo suave que proporciona elegancia sin ser demasiado reflectante.',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Apariencia: Brillo suave y sedoso',
        'Mantenimiento: Más fácil de limpiar que el acabado mate',
        'Ventaja: Aspecto premium y elegante',
        'Resistencia: Mejor que el mate ante manchas leves'
      ],
      examples: [
        'Gris satinado',
        'Azul satinado',
        'Blanco satinado',
        'Negro satinado'
      ],
      category: 'basic'
    },

    // Acabados especiales
    {
      id: 'chameleon',
      name: 'Pintura Camaleón',
      type: 'Acabado especial',
      description: 'Pintura que cambia de color según el ángulo de visión y las condiciones de luz, creando un efecto dinámico y llamativo.',
      image: 'https://images.unsplash.com/photo-1533472758585-6e0e4d5e8f51?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Efecto: Cambio de color según ángulo e iluminación',
        'Complejidad: Aplicación especializada requerida',
        'Impacto visual: Extremadamente llamativo y único',
        'Costo: Entre las opciones más costosas'
      ],
      examples: [
        'Púrpura-azul-verde',
        'Rosa-dorado-naranja',
        'Azul-verde-oro',
        'Rojo-naranja-amarillo'
      ],
      category: 'special'
    },
    {
      id: 'chrome',
      name: 'Pintura Cromada',
      type: 'Acabado especial',
      description: 'El efecto cromado crea una superficie altamente reflectante que simula el aspecto del cromo pulido, ofreciendo un look extremadamente llamativo y futurista.',
      image: 'https://images.unsplash.com/photo-1533472758585-6e0e4d5e8f51?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Impacto visual: Extremadamente llamativo y reflectante',
        'Aplicación: Técnica compleja que requiere especialistas',
        'Mantenimiento: Necesita limpieza frecuente para mantener el brillo',
        'Costo: Entre las opciones más costosas de personalización'
      ],
      examples: [
        'Cromo completo',
        'Cromo negro (black chrome)',
        'Cromo azul',
        'Cromo rojo'
      ],
      category: 'special'
    },
    {
      id: 'candy',
      name: 'Pintura Candy',
      type: 'Acabado especial',
      description: 'Acabado translúcido que se aplica sobre una base metálica, creando colores profundos y vibrantes con efecto tridimensional.',
      image: 'https://images.unsplash.com/photo-1556906781-2f0520405b71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Apariencia: Color profundo y translúcido',
        'Aplicación: Múltiples capas sobre base metálica',
        'Efecto: Profundidad visual y tonos ricos',
        'Usos: Popular en customización y hot rods'
      ],
      examples: [
        'Rojo candy',
        'Azul candy',
        'Verde candy',
        'Púrpura candy'
      ],
      category: 'special'
    },
    {
      id: 'iridescent',
      name: 'Pintura Iridiscente',
      type: 'Acabado especial',
      description: 'Efecto similar al camaleón pero más suave, con reflejos de arcoíris que cambian sutilmente según el ángulo de visión.',
      image: 'https://images.unsplash.com/photo-1556906781-2f0520405b71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Efecto: Reflejos de arcoíris suaves',
        'Aplicación: Menos compleja que el efecto camaleón',
        'Resultado: Aspecto etéreo y mágico',
        'Versatilidad: Funciona bien sobre colores oscuros'
      ],
      examples: [
        'Negro iridiscente',
        'Azul iridiscente',
        'Blanco iridiscente',
        'Gris iridiscente'
      ],
      category: 'special'
    },
    {
      id: 'glow',
      name: 'Pintura Glow-in-the-Dark',
      type: 'Acabado especial',
      description: 'Pintura que absorbe la luz durante el día y brilla en la oscuridad, creando un efecto sorprendente durante la noche.',
      image: 'https://images.unsplash.com/photo-1556906781-2f0520405b71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Efecto: Brilla en la oscuridad después de cargarse con luz',
        'Duración: Varias horas de luminiscencia',
        'Aplicación: Puede ser total o en detalles/accentos',
        'Usos: Efectos especiales y personalización extrema'
      ],
      examples: [
        'Verde fluorescente',
        'Azul luminiscente',
        'Naranja brillante',
        'Amarillo fosforescente'
      ],
      category: 'special'
    },
    {
      id: 'fluorescent',
      name: 'Pintura Fluorescente',
      type: 'Acabado especial',
      description: 'Colores extremadamente vivos que resaltan intensamente bajo luz UV, ideal para crear efectos llamativos y visibilidad.',
      image: 'https://images.unsplash.com/photo-1556906781-2f0520405b71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Efecto: Colores ultra vibrantes bajo luz normal y UV',
        'Visibilidad: Máxima atención y contraste',
        'Aplicación: Frecuentemente usada en detalles y gráficos',
        'Resistencia: Puede requerir capa transparente protectora'
      ],
      examples: [
        'Naranja fluorescente',
        'Verde fluorescente',
        'Rosa fluorescente',
        'Amarillo fluorescente'
      ],
      category: 'special'
    },
    {
      id: 'textured',
      name: 'Pintura Texturizada',
      type: 'Acabado especial',
      description: 'Acabado con superficie rugosa o con patrón visual que añade dimensión táctil y visual al vehículo.',
      image: 'https://images.unsplash.com/photo-1556906781-2f0520405b71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Textura: Superficie rugosa al tacto',
        'Efecto: Oculta imperfecciones y arañazos leves',
        'Aplicación: Técnicas especializadas para diferentes patrones',
        'Usos: Popular en vehículos todo terreno y personalizados'
      ],
      examples: [
        'Textura de arena',
        'Efecto martillado',
        'Textura de piel de naranja',
        'Patrón geométrico'
      ],
      category: 'special'
    },

    // Técnicas avanzadas
    {
      id: 'hydro',
      name: 'Hydro Dipping',
      type: 'Técnica avanzada',
      description: 'Técnica de transferencia de patrones sobre piezas mediante agua, permitiendo diseños complejos y personalizados.',
      image: 'https://images.unsplash.com/photo-1556906781-2f0520405b71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Versatilidad: Casi cualquier patrón o diseño posible',
        'Aplicación: Se sumerge la pieza en agua con película de diseño',
        'Durabilidad: Requiere capa transparente protectora',
        'Usos: Carbon look, camuflaje, diseños personalizados'
      ],
      examples: [
        'Fibra de carbono',
        'Camuflaje digital',
        'Patrones geométricos',
        'Diseños abstractos personalizados'
      ],
      category: 'advanced'
    },
    {
      id: 'wrap',
      name: 'Wrap Vinílico',
      type: 'Técnica avanzada',
      description: 'No es pintura, pero permite acabados temporales o personalizados mediante láminas adhesivas de vinilo de alta calidad.',
      image: 'https://images.unsplash.com/photo-1556906781-2f0520405b71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Reversibilidad: Se puede remover sin dañar la pintura original',
        'Variedad: Amplia gama de colores y efectos disponibles',
        'Protección: Protege la pintura original de rayones leves y UV',
        'Duración: Dura entre 3-7 años según calidad y mantenimiento'
      ],
      examples: [
        'Colores sólidos',
        'Efectos metálicos y perlados',
        'Texturas y patrones',
        'Diseños personalizados y gráficos'
      ],
      category: 'advanced'
    },
    {
      id: 'airbrush',
      name: 'Pintura con Aerógrafo',
      type: 'Técnica avanzada',
      description: 'Técnica artística que utiliza un aerógrafo para crear ilustraciones, degradados o efectos personalizados con precisión.',
      image: 'https://images.unsplash.com/photo-1556906781-2f0520405b71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Precisión: Detalles artísticos y complejos',
        'Personalización: Diseños completamente únicos',
        'Técnica: Requiere artista especializado',
        'Aplicación: Desde pequeños detalles hasta obras completas'
      ],
      examples: [
        'Ilustraciones realistas',
        'Degradados complejos',
        'Efectos de llamas o rayos',
        'Retratos y escenas detalladas'
      ],
      category: 'advanced'
    }
  ];

  // Datos de opciones de llantas
  const wheelOptions: WheelOption[] = [
    {
      id: 'forged',
      name: 'Llantas Forjadas',
      brand: 'Variadas',
      description: 'Las llantas forjadas se fabrican mediante un proceso de prensado en caliente que alinea las moléculas del aluminio, resultando en una llanta más fuerte y ligera.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Peso: Hasta un 25% más ligeras que las llantas fundidas',
        'Resistencia: Mayor resistencia estructural y a impactos',
        'Rendimiento: Mejor respuesta de suspensión y manejo',
        'Personalización: Amplias opciones de diseño y acabados'
      ],
      sizes: [
        '17" - 22" diámetro',
        'Anchos desde 8" hasta 12"',
        'Offsets desde +15 hasta +45'
      ]
    },
    {
      id: 'multispoke',
      name: 'Diseño Multirazos',
      brand: 'BBS, Volk, Enkei',
      description: 'Las llantas de múltiples rayos ofrecen un clásico look deportivo con una excelente disipación de calor para los frenos y una apariencia elegante.',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Ventilación: Excellent flujo de aire para refrigeración de frenos',
        'Estilo: Apariencia deportiva y clásica',
        'Ligereza: Diseños optimizados para reducir peso',
        'Compatibilidad: Adecuadas para la mayoría de vehículos deportivos'
      ],
      sizes: [
        '16" - 20" diámetro',
        'Anchos desde 7" hasta 11"',
        'Offsets desde +20 hasta +50'
      ]
    },
    {
      id: 'concave',
      name: 'Diseño Cóncavo',
      brand: 'Vossen, HRE, Rotiform',
      description: 'Las llantas cóncavas presentan una profundidad pronunciada entre el centro y el borde, creando un aspecto agresivo y moderno muy valorado en el tuning.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Apariencia: Look agresivo y deportivo',
        'Rigidez: Mayor resistencia estructural',
        'Personalización: Múltiples opciones de profundidad y acabado',
        'Ajuste: Ideal para vehículos con guardabarros ensanchados'
      ],
      sizes: [
        '18" - 22" diámetro',
        'Anchos desde 9" hasta 13"',
        'Offsets desde +15 hasta +35'
      ]
    },
    {
      id: 'deepdish',
      name: 'Estilo Deep Dish',
      brand: 'BBS, ATS, Schmidt',
      description: 'Las llantas estilo "deep dish" (plato profundo) presentan un borde externo muy pronunciado, creando un look clásico y agresivo popular en diferentes estilos de tuning.',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Estilo: Look clásico y llamativo',
        'Personalización: Permite combinaciones de colores en cara y borde',
        'Resistencia: Construcción robusta para soportar el diseño',
        'Ajuste: Requiere modificaciones en muchos vehículos'
      ],
      sizes: [
        '15" - 20" diámetro',
        'Anchos desde 8" hasta 10"',
        'Offsets desde 0 hasta +25'
      ]
    }
  ];

  // Imágenes para el carrusel por sección
  const carImages: CarImage[] = [
    // Imágenes para Body Kit
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1601268859287-9cec8a74e9f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      alt: 'Auto con Body Kit - Vista frontal',
      section: 'bodykit'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1629203850882-2a64e5a6f71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      alt: 'Auto con Body Kit - Vista lateral',
      section: 'bodykit'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1626668893630-1f7bb7f6e3c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Detalle de body kit - Capó',
      section: 'bodykit'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1629203850883-7c2a8cbb6b71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Detalle de body kit - Splitter',
      section: 'bodykit'
    },
    
    // Imágenes para Pintura
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-15772299003719-08d70f9ec0c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Pintura metálica azul',
      section: 'paint'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1556906781-2f0520405b71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Pintura efecto perla',
      section: 'paint'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Pintura mate negra',
      section: 'paint'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1533472758585-6e0e4d5e8f51?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Efecto cromado en auto',
      section: 'paint'
    },
    
    // Imágenes para Llantas
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Llantas forjadas deportivas',
      section: 'wheels'
    },
    {
      id: 10,
      src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Llantas multirazos',
      section: 'wheels'
    },
    {
      id: 11,
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Llantas diseño cóncavo',
      section: 'wheels'
    },
    {
      id: 12,
      src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Llantas estilo deep dish',
      section: 'wheels'
    }
  ];

  // Filtrar imágenes según la sección activa
  const filteredImages = carImages.filter(image => image.section === activeSection);

  // Filtrar componentes de body kit por categoría activa
  const filteredBodyKitParts = componentParts.filter(part => part.category === activeBodyKitCategory);

  // Filtrar opciones de pintura por categoría activa
  const filteredPaintOptions = paintOptions.filter(paint => paint.category === activePaintCategory);

  // Cambiar la sección activa y resetear el índice de la imagen
  const handleSectionChange = (section: 'bodykit' | 'paint' | 'wheels') => {
    setActiveSection(section);
    setCurrentImageIndex(0);
  };

  // Manejar la selección de una parte
  const handlePartSelect = (part: ComponentPart) => {
    setSelectedPart(part);
    setSelectedPaint(null);
    setSelectedWheel(null);
  };

  // Manejar la selección de una pintura
  const handlePaintSelect = (paint: PaintOption) => {
    setSelectedPaint(paint);
    setSelectedPart(null);
    setSelectedWheel(null);
  };

  // Manejar la selección de una llanta
  const handleWheelSelect = (wheel: WheelOption) => {
    setSelectedWheel(wheel);
    setSelectedPart(null);
    setSelectedPaint(null);
  };

  // Cambiar imagen en el carrusel
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === filteredImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? filteredImages.length - 1 : prevIndex - 1
    );
  };

  // Efecto para resetear el índice cuando cambia la sección activa
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="container mx-auto py-6 px-4">
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Componentes de Autos Modificados</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Explora las diferentes partes de un auto modificado: body kits, pintura, llantas, y descubre sus funciones y características
          </p>
        </div>

        <nav className="flex justify-between items-center py-4 border-b border-gray-700">
          <Link href="/pages/galeriaAutos" className="text-purple-400 hover:text-purple-300 transition-colors">
            ← Volver a la Galería
          </Link>
          <div className="flex space-x-4">
            <button 
              onClick={() => handleSectionChange('bodykit')} 
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeSection === 'bodykit' ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              Body Kits
            </button>
            <button 
              onClick={() => handleSectionChange('paint')} 
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeSection === 'paint' ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              Pinturas
            </button>
            <button 
              onClick={() => handleSectionChange('wheels')} 
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeSection === 'wheels' ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              Llantas
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Carrusel de imágenes */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {activeSection === 'bodykit' && 'Partes del Body Kit'}
              {activeSection === 'paint' && 'Tipos de Pintura'}
              {activeSection === 'wheels' && 'Estilos de Llantas'}
            </h2>
            
            <div className="relative h-96 rounded-lg overflow-hidden mb-4">
              <Image
                src={filteredImages[currentImageIndex]?.src || carImages[0].src}
                alt={filteredImages[currentImageIndex]?.alt || "Imagen de componente"}
                fill
                className="object-cover"
              />
              
              {/* Botones de navegación del carrusel */}
              <button 
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-900/70 text-white p-2 rounded-full hover:bg-gray-900 transition-colors"
              >
                ←
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-900/70 text-white p-2 rounded-full hover:bg-gray-900 transition-colors"
              >
                →
              </button>
            </div>

            <div className="text-center">
              <p className="text-gray-400">
                Imagen {currentImageIndex + 1} de {filteredImages.length}
              </p>
            </div>
          </div>

          {/* Lista de componentes según la sección activa */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Selecciona un Componente</h2>
            
            {/* Selectores de categoría para Body Kit */}
            {activeSection === 'bodykit' && (
              <div className="mb-6">
                <div className="flex space-x-2 mb-4">
                  <button
                    onClick={() => setActiveBodyKitCategory('front')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeBodyKitCategory === 'front' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    Delanteros
                  </button>
                  <button
                    onClick={() => setActiveBodyKitCategory('sides')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeBodyKitCategory === 'sides' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    Laterales
                  </button>
                  <button
                    onClick={() => setActiveBodyKitCategory('rear')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeBodyKitCategory === 'rear' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    Traseros
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {filteredBodyKitParts.map((part, index) => (
                    <button
                      key={part.id}
                      onClick={() => handlePartSelect(part)}
                      className={`p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-left ${
                        index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                      } flex items-center`}
                    >
                      <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 mx-4">
                        <Image
                          src={part.image}
                          alt={part.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{part.name}</h3>
                        <p className="text-sm text-gray-300 mt-1 line-clamp-2">{part.description}</p>
                        <span className="inline-block mt-2 text-purple-400 text-sm">
                          Haz clic para más información →
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selectores de categoría para Pintura */}
            {activeSection === 'paint' && (
              <div className="mb-6">
                <div className="flex space-x-2 mb-4">
                  <button
                    onClick={() => setActivePaintCategory('basic')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activePaintCategory === 'basic' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    Acabados Básicos
                  </button>
                  <button
                    onClick={() => setActivePaintCategory('special')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activePaintCategory === 'special' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    Acabados Especiales
                  </button>
                  <button
                    onClick={() => setActivePaintCategory('advanced')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activePaintCategory === 'advanced' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    Técnicas Avanzadas
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {filteredPaintOptions.map((paint, index) => (
                    <button
                      key={paint.id}
                      onClick={() => handlePaintSelect(paint)}
                      className={`p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-left ${
                        index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                      } flex items-center`}
                    >
                      <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 mx-4">
                        <Image
                          src={paint.image}
                          alt={paint.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{paint.name}</h3>
                        <p className="text-sm text-gray-300 mt-1">{paint.type}</p>
                        <p className="text-sm text-gray-300 mt-1 line-clamp-2">{paint.description}</p>
                        <span className="inline-block mt-2 text-purple-400 text-sm">
                          Haz clic para más información →
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'wheels' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wheelOptions.map((wheel) => (
                  <button
                    key={wheel.id}
                    onClick={() => handleWheelSelect(wheel)}
                    className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-left"
                  >
                    <h3 className="font-semibold text-lg">{wheel.name}</h3>
                    <p className="text-sm text-gray-300 mt-1">{wheel.brand}</p>
                    <p className="text-sm text-gray-300 mt-1 line-clamp-2">{wheel.description}</p>
                    <span className="inline-block mt-2 text-purple-400 text-sm">
                      Haz clic para más información →
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal de información del componente de body kit */}
        {selectedPart && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-purple-400">{selectedPart.name}</h2>
                  <button 
                    onClick={() => setSelectedPart(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                    <Image
                      src={selectedPart.image}
                      alt={selectedPart.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Descripción</h3>
                    <p className="text-gray-300 mb-4">{selectedPart.description}</p>
                    
                    <h3 className="text-lg font-semibold mb-2">Características</h3>
                    <ul className="space-y-2">
                      {selectedPart.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-purple-400 mr-2">•</span>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={() => setSelectedPart(null)}
                    className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de información de pintura */}
        {selectedPaint && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-purple-400">{selectedPaint.name}</h2>
                    <p className="text-gray-400">{selectedPaint.type}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedPaint(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                    <Image
                      src={selectedPaint.image}
                      alt={selectedPaint.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Descripción</h3>
                    <p className="text-gray-300 mb-4">{selectedPaint.description}</p>
                    
                    <h3 className="text-lg font-semibold mb-2">Características</h3>
                    <ul className="space-y-2 mb-4">
                      {selectedPaint.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-purple-400 mr-2">•</span>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <h3 className="text-lg font-semibold mb-2">Ejemplos</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPaint.examples.map((example, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300">
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={() => setSelectedPaint(null)}
                    className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de información de llantas */}
        {selectedWheel && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-purple-400">{selectedWheel.name}</h2>
                    <p className="text-gray-400">{selectedWheel.brand}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedWheel(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                    <Image
                      src={selectedWheel.image}
                      alt={selectedWheel.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Descripción</h3>
                    <p className="text-gray-300 mb-4">{selectedWheel.description}</p>
                    
                    <h3 className="text-lg font-semibold mb-2">Características</h3>
                    <ul className="space-y-2 mb-4">
                      {selectedWheel.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-purple-400 mr-2">•</span>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <h3 className="text-lg font-semibold mb-2">Tamaños Disponibles</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedWheel.sizes.map((size, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300">
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={() => setSelectedWheel(null)}
                    className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-12 border-t border-gray-700">
        <div className="text-center text-gray-400">
          <p>Galería de Componentes de Autos Modificados • {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default ComponentGallery;