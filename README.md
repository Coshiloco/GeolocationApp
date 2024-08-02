# Geolocation App

Esta es una aplicación de geolocalización de escritorio construida con React, que integra mapas y funcionalidades de geolocalización.

## Descripción

La aplicación permite a los usuarios visualizar un mapa, añadir pines haciendo clic en él, y ver información sobre esos pines en una barra lateral. Además, cuenta con un diseño responsive que se adapta a diferentes tamaños de pantalla.

## Funcionalidades

- **Visualización de mapa con Leaflet**: Utiliza la biblioteca Leaflet para mostrar un mapa interactivo.
- **Añadir pines**: Los usuarios pueden añadir pines al mapa haciendo clic en la ubicación deseada.
- **Ver información de pines**: Al hacer clic en un pin, se muestra información detallada en una barra lateral.
- **Diseño responsive**: La aplicación se adapta a diferentes dispositivos, incluyendo móviles y tabletas.
- **Autenticación de usuarios** (futuro): Se planea implementar un sistema de autenticación para gestionar usuarios.
- **Edición y eliminación de pines** (futuro): Se añadirá la funcionalidad para editar y eliminar pines existentes.
- **Integración con un backend real** (futuro): La aplicación se conectará a un backend para almacenar y gestionar datos de pines.

## Configuración

Para instalar y ejecutar la aplicación, sigue estos pasos:

1. **Clona este repositorio**:
   ```bash
   git clone https://github.com/tu_usuario/geolocation-app.git
   ```

2. **Navega al directorio del proyecto**:
   ```bash
   cd geolocation-app
   ```

3. **Instala las dependencias del frontend**:
   ```bash
   npm install
   ```

4. **Navega al directorio del backend**:
   ```bash
   cd backend
   ```

5. **Instala las dependencias del backend**:
   ```bash
   npm install
   ```

6. **Configura la base de datos**: Asegúrate de tener una base de datos MongoDB configurada y actualiza el archivo `config.js` con tu URL de conexión.

7. **Ejecuta el servidor de desarrollo del backend**:
   ```bash
   npm start
   ```

8. **En otra terminal, navega al directorio del frontend**:
   ```bash
   cd ../
   ```

9. **Inicia el servidor de desarrollo del frontend**:
   ```bash
   npm start
   ```

La aplicación estará disponible en `http://localhost:3000`.

## Estructura del proyecto

- `src/components`: Componentes React
- `src/services`: Servicios de API simulada
- `src/styles`: Estilos CSS
- `public`: Archivos estáticos

## Mejoras futuras

- Implementar autenticación de usuarios
- Añadir funcionalidad para editar y eliminar pines
- Integrar con un backend real