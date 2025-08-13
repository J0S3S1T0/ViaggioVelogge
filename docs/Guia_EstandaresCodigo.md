# Guía de Estándares de Codificación

Este documento define las convenciones y buenas prácticas para el desarrollo del proyecto usando React.js, Node.js, MongoDB y MySQL. Su objetivo es mantener la coherencia, legibilidad y calidad del código en todo el equipo.


# Nomenclatura

- **Variables**: camelCase → `carModel`, `userId`
- **Funciones**: camelCase → `getCarData()`
- **Componentes React**: PascalCase → `CarViewer`
- **Archivos**: kebab-case → `car-gallery.jsx`
- **Bases de datos**:
  - MongoDB: nombres en inglés, plural → `cars`, `users`
  - MySQL: snake_case → `car_models`, `user_profiles`


# Buenas prácticas
- Código limpio y legible
- Reutilización de componentes
- Validación de datos en backend
- Manejo de errores con try/catch
- Separación clara entre lógica de negocio y presentación

# Herramientas de estilo
- ESLint: para detectar errores de estilo
- Prettier: para formatear automáticamente
- EditorConfig: para mantener consistencia entre editores

#  Comentarios

- Usa `//` para comentarios breves
- Usa `/** ... */` para documentar funciones
- Evita comentarios innecesarios o redundantes

# Estándares para commits
- feat: nueva funcionalidad
- fix: corrección de errores
- docs: cambios en documentación
- style: cambios de formato (sin lógica)
- refactor: mejora de código sin cambiar funcionalidad
- test: pruebas añadidas o modificadas


```js
// Carga el modelo 3D del auto
function loadCarModel(id) {
  ...
}
