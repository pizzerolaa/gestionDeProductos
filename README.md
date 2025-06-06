# Gestión de Productos

## Requisitos previos

- Node.js (v14 o superior)
- Java JDK 11 o superior
- Maven
- Cuenta en Firebase con Firestore habilitado

## Estructura del proyecto

```
gestionDeProductos/
├── frontend/         # Aplicación React
├── backend/          # API REST con Spring Boot
└── README.md         # Este archivo
```

## Configuración de Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Configura Firestore Database
3. Descarga el archivo de credenciales de servicio y guárdalo como `firebase-service-account.json` en `backend/src/main/resources/`
4. Actualiza la configuración de Firebase en el frontend (`frontend/src/firebase.jsx`)

## Instalación y ejecución del Frontend

```bash
cd frontend
npm install
npm run dev
```

La aplicación estará disponible en: http://localhost:5173

## Instalación y ejecución del Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

El servidor estará disponible en: http://localhost:8080

## Funcionalidades

### Frontend (React)
- Tabla de productos con operaciones CRUD
- Navegación con React Router
- Integración con Firebase
- Interfaz de usuario con React Bootstrap

### Backend (Spring Boot)
- API REST para productos
- Integración con Firebase Firestore
- Operaciones CRUD completas

## Endpoints de la API

- `GET /api/products` - Obtener todos los productos
- `GET /api/products/{id}` - Obtener un producto por ID
- `POST /api/products` - Crear un nuevo producto
- `PUT /api/products/{id}` - Actualizar un producto existente
- `DELETE /api/products/{id}` - Eliminar un producto

## Solución de problemas comunes

### El frontend no muestra nada
- Verifica que el backend esté en ejecución
- Comprueba la configuración de Firebase en `firebase.jsx`
- Revisa la consola del navegador para ver errores específicos

### Errores de exportación en componentes React
- Asegúrate de que todos los componentes tengan `export default` al final
- Verifica la consistencia en las importaciones

### Problemas de conexión con Firebase
- Verifica que las credenciales de Firebase sean correctas
- Asegúrate de que Firestore esté habilitado en tu proyecto de Firebase