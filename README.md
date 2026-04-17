# Humath Backend API - Technical Test

Prueba técnica para Junior Backend Developer para Pink Technologies Group.

## Descripción

API REST mínima en Node.js que consume la API externa **JSONPlaceholder** y expone endpoints propios para acceder a posts, usuarios y comentarios. Demuestra conocimientos básicos de backend, manejo de APIs externas y despliegue en Azure.

## Objetivo

Construir una API REST con Node.js que:
- ✅ Consume una API externa (JSONPlaceholder)
- ✅ Expone endpoints propios
- ✅ Implementa manejo de errores
- ✅ Incluye testing
- ✅ Se despliega en Azure
- ✅ Cuenta con documentación clara

## Características

- **Framework**: Express.js
- **Runtime**: Node.js v18+
- **Testing**: Jest + Supertest
- **Containerización**: Docker
- **API Externa**: JSONPlaceholder
- **Deployment**: Azure App Service
- **Async/Await**: Manejo moderno de operaciones asincrónicas
- **Manejo de Errores**: Try/catch y middleware de error

## Estructura del Proyecto

```
humath-backend-api/
├── src/
│   ├── config/
│   │   └── index.js           # Configuración centralizada
│   ├── controllers/
│   │   └── externalDataController.js  # Lógica de endpoints
│   ├── routes/
│   │   └── externalData.js    # Definición de rutas
│   ├── services/
│   │   └── externalDataService.js    # Consumo de API externa
│   ├── app.js                 # Aplicación Express
│   └── index.js               # Punto de entrada
├── test/
│   └── api.test.js            # Tests unitarios
├── .env                       # Variables de entorno
├── .gitignore                 # Git ignore
├── Dockerfile                 # Contenedor Docker
├── jest.config.js             # Configuración Jest
├── package.json               # Dependencias
└── README.md                  # Este archivo
```

## Instalación

### Requisitos previos
- Node.js v18+
- npm o yarn

### Pasos

1. **Clonar o descargar el proyecto**
   ```bash
   git clone <repository-url>
   cd humath-backend-api
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # .env ya está configurado por defecto
   # Puedes modificar los valores si es necesario
   cat .env
   ```

## Cómo ejecutar

### Desarrollo local
```bash
npm run dev
```
La API estará disponible en `http://localhost:3000`

### Producción
```bash
npm start
```

### Testing
```bash
# Ejecutar todos los tests
npm test

# Modo watch
npm run test:watch
```

## Endpoints disponibles

### Health Check
```
GET /health
```
Respuesta:
```json
{
  "status": "OK",
  "message": "API is running",
  "timestamp": "2026-04-16T10:30:00.000Z",
  "environment": "development"
}
```

### Home
```
GET /
```

### Posts
```
GET /external-data/posts              # Obtener todos los posts
GET /external-data/posts?userId=1     # Posts de un usuario específico
GET /external-data/posts/:id          # Post específico por ID
```

Respuesta ejemplo:
```json
{
  "success": true,
  "message": "Posts retrieved successfully",
  "timestamp": "2026-04-16T10:30:00.000Z",
  "data": [
    {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident...",
      "body": "quia et suscipit..."
    }
  ],
  "count": 100
}
```

### Usuarios
```
GET /external-data/users              # Obtener todos los usuarios
GET /external-data/users/:id          # Usuario específico por ID
```

### Comentarios
```
GET /external-data/comments           # Obtener todos los comentarios
GET /external-data/comments?postId=1  # Comentarios de un post específico
```

## Docker

### Construir imagen
```bash
docker build -t humath-backend-api .
```

### Ejecutar contenedor
```bash
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  humath-backend-api
```

## Despliegue en Azure

### Requisitos
- Cuenta de Azure
- Azure CLI instalado
- Repositorio Git (GitHub, Azure Repos, etc.)

### Pasos

1. **Crear App Service**
   ```bash
   az group create --name humath-rg --location eastus
   
   az appservice plan create \
     --name humath-plan \
     --resource-group humath-rg \
     --sku B1 \
     --is-linux
   
   az webapp create \
     --resource-group humath-rg \
     --plan humath-plan \
     --name humath-backend-api \
     --runtime "NODE|18-lts"
   ```

2. **Configurar variables de entorno**
   ```bash
   az webapp config appsettings set \
     --resource-group humath-rg \
     --name humath-backend-api \
     --settings NODE_ENV=production PORT=8080
   ```

3. **Desplegar desde GitHub**
   - Ir a Azure Portal
   - App Service > Deployment Center
   - Seleccionar GitHub
   - Autorizar y seleccionar repositorio
   - Seleccionar rama (main)

4. **Verificar despliegue**
   ```bash
   https://humath-backend-api.azurewebsites.net/health
   ```

## API Externa Consumida

**JSONPlaceholder** - API pública de prueba
- URL: `https://jsonplaceholder.typicode.com`
- Recursos: Posts, Users, Comments, Todos, etc.
- Documentación: https://jsonplaceholder.typicode.com


## Licencia

ISC

## Autor

Jhon Steven González Aricapa

---

**Última actualización**: 16 de Abril de 2026
