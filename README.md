# API de usuarios con NestJS

Proyecto académico de la asignatura Diseño de Sistemas en Internet. Consiste en una API REST para gestionar usuarios y practicar la conexión a una base de datos, las operaciones CRUD y la autenticación con JWT.

## Funcionalidades

- Endpoints para crear, consultar, actualizar y eliminar usuarios.
- Modelos relacionados de usuarios, tenants y perfiles.
- Inicio de sesión con correo y contraseña mediante `POST /auth/login`.
- Protección de `GET /users` mediante un token JWT.
- Seed con 3 tenants, 12 usuarios y 12 perfiles de prueba, con contraseñas almacenadas como hashes.
- Documentación y pruebas de endpoints desde Swagger en `http://localhost:3000/api`.

## Tecnologías utilizadas

- **Node.js y TypeScript:** entorno de ejecución y lenguaje.
- **NestJS 11:** organización de la API en módulos, controladores y servicios.
- **Prisma ORM 7 y SQLite:** modelos, migraciones y acceso a la base de datos.
- **JWT y Passport:** autenticación y protección de rutas.
- **bcryptjs:** generación de hashes en el seed y comprobación de contraseñas en el login.
- **Swagger:** documentación interactiva de la API.

## Estado del proyecto

Práctica en desarrollo. La eliminación de usuarios con un perfil asociado requiere ajustar el manejo de esa relación. La protección JWT está aplicada actualmente al listado de usuarios.

## Autor

Camilo Javier Mayorga Vivas.
