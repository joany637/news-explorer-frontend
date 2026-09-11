# News Explorer

News Explorer es una aplicación web que permite buscar noticias de los últimos 7 días sobre cualquier tema, y guardar los artículos que más te interesen en tu cuenta personal.
🔗 [Ver la app desplegada](https://news-explorer-beryl-phi.vercel.app)

## ¿Qué hace la app?

- Buscá noticias por palabra clave usando [News API](https://newsapi.org).
- Mirá los resultados en tarjetas con imagen, título, descripción, fuente y fecha.
- Creá una cuenta y guardá los artículos que quieras conservar.
- Consultá tus artículos guardados agrupados por palabra clave en la sección "Artículos guardados".
- Diseño responsive, sin scroll horizontal desde 320px de ancho.

## Tecnologías utilizadas

- React
- React Router
- Vite
- CSS (BEM)
- News API (API de terceros)
- Fetch API para las solicitudes HTTP
- JWT para la autenticación con el back-end propio

## Backend del proyecto

Este front-end se conecta a un backend propio hecho con Node.js y Express:
[news-explorer-backend](https://github.com/joany637/news-explorer-backend)

## Cómo correr el proyecto localmente

```bash
npm install
npm run dev
```

Necesitás un archivo `.env` en la raíz con tu propia clave de News API: