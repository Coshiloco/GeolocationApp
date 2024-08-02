# Geolocation App

Esta es una aplicación de geolocalización de escritorio construida con React, que integra mapas y funcionalidades de geolocalización.

## Configuración

1. Clona este repositorio
2. Navega al directorio del proyecto: `cd geolocation-app`
3. Instala las dependencias: `npm install`

## Ejecución

Para iniciar el servidor de desarrollo:

```
npm start
```

La aplicación estará disponible en `http://localhost:3000`.

## Características

- Visualización de mapa con Leaflet
- Añadir pines haciendo clic en el mapa
- Ver información de pines en una barra lateral
- Diseño responsive

## Decisiones de diseño

- Se utilizó Bootstrap 5 para un diseño responsive base.
- La aplicación está optimizada para resoluciones de escritorio, pero también es funcional en dispositivos móviles.
- Se implementó una API simulada para demostrar cómo se integraría con un backend real.

## Estructura del proyecto

- `src/components`: Componentes React
- `src/services`: Servicios de API simulada
- `src/styles`: Estilos CSS
- `public`: Archivos estáticos

## Mejoras futuras

- Implementar autenticación de usuarios
- Añadir funcionalidad para editar y eliminar pines
- Integrar con un backend real