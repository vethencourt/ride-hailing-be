# Ride Hailing - Backend

## Prerrequisitos

- [Node.js](https://nodejs.org/) (v24)
- [pnpm](https://www.pnpm.io/)
- MongoDB: una instancia local (recomiendo MongoDB Compass como manejador) o un URI de MongoDB Atlas

## Instalación

1. **Clonar el repositorio**

```sh
git clone <url-del-repositorio>
cd ride-hailing-be
```

2. **Instalar dependencias**

```sh
pnpm i
```

3. **Configurar entorno** Crea un archivo .env en el directorio raíz basado en .env.example

```sh
cp .env.example .env.local
```

PORT: Puerto del servidor. Recomendado 8000
SALT_ROUNDS: costo computacional de la encriptacion. Recomendado 10
MONGODB_URI: la dirección de tu base de datos
JWT_SECRET: string usado para encriptar
JWT_EXPIRES_IN: tiempo de expiracion del token. Recomendado "8h"

Para generar un secreto (JWT secret) usando node:

```sh
node -e "console.log(require('crypto').randomBytes(64).toString('hex'));"
```

## Desarrollo

### Ejecutar en modo desarrollo

`tsx` se encarga de auto recargar.

```sh
pnpm run dev
```

### Compilar para producción

```sh
pnpm run build
```

## API

La API es accesible bajo el prefijo `/api`. Consulta la colección dentro de `/docs` para conocer los endpoints. Todas las rutas de vehículos requieren un Token de Portador (Bearer Token) en el encabezado de autorización (Authorization header).
