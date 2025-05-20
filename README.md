# Koywe Challenge – API NestJS

Este proyecto es una API construida con **NestJS**, **Node.js** y **TypeScript**, como parte del desafío técnico de Koywe. Implementa un sistema de autenticación (login y registro) y una funcionalidad relacionada con cryptomonedas y fiat (quotes), usando principios de Clean Architecture y patrones de diseño como **Facade** y **casos de uso**.

---

## Tecnologías principales

- [NestJS](https://nestjs.com/)
- TypeScript
- Node.js
- MongoDB 
- JWT (para autenticación)

---

### 🧑‍💻 Autenticación

- **Registro de usuario**
- **Login con credenciales**
- Generación de token JWT

### Quotes

- Uso del patrón **Facade** para centralizar la lógica de acceso

#### Clases principales

- **`CryptoQuoteCreator`**:  
  Caso de uso encargado de crear y validar una quote relacionada con criptomonedas. Recibe los datos de entrada, aplica la lógica de negocio.

- **`CryptoQuoteGetter`**:  
  Caso de uso enfocado en la recuperación de una quote específico. Se comunica con el repositorio para obtener los datos almacenados.

- **`CryptoQuotePersister`**:  
   Guardar en BD. Abstrae la lógica de guardado y recuperación de datos.

- **`CryptoQuoteFacade`**:  
  Orquesta las operaciones entre los diferentes casos de uso (`Creator`, `Getter`, `Persister` .) 

---

## 🔐 Autenticación

La autenticación se maneja con JWT:

- Al registrarse o iniciar sesión exitosamente, se devuelve un token JWT.
- Este token debe incluirse en el header `Authorization` para acceder a rutas protegidas.


## ▶️ Cómo ejecutar

```bash
# Clona el repositorio
git clone https://github.com/AVARGASR/koywe.git
cd koywe

# Instala dependencias
npm install

# Ejecuta en desarrollo
npm run start:dev