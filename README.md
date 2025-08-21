 # Facultad de Ciencias de la Administración – UNER  
## Tecnicatura Universitaria en Desarrollo Web
**TP 2 - Programación III** 
**2do Cuatrimestre 2025** 
---

## 📖 Información
👉 **Tema:** Fetch + FileSystem en Node.js  
📌 **Grupo:** BB 
👥 **Integrantes:**
  - Sanchez, David 
  - Ovejero, Yamila Mailen  
  - Medina, Ricardo Daniel  
  - Conte Garcia, Emanuel  
  - Pereyra Diaz, Ezequiel  
  - Villalba Olmedo, Delcy Adalis

---

### 📝 Consigna
El objetivo de este trabajo práctico es practicar el uso de **Fetch API** y **FileSystem** en Node.js con la API pública [FakeStore](https://fakestoreapi.com/).  

Es para aprender a:
1. Consumir una API externa usando **fetch**.  
2. Ejecutar diferentes operaciones de tipo **GET, POST, PUT y DELETE**.
3. Guardar datos obtenidos de la API en un archivo local (`productos.json`) usando **FileSystem**. 
4. Realizar operaciones de lectura, agregado y filtrado sobre ese archivo local. 

---

### ⚙️ Requisitos previos
- Tener instalado **Node.js** (versión 18 o superior).  
- Tener instalado la librería `node-fetch` para poder usar `fetch` en Node.js
- Instalar las dependencias necesarias con el siguiente comando:
` npm install `

---

### 📂 Estructura del proyecto
tp2-fetch-filesystem/
│── index.js --------------------# Script principal con todas las funciones
│── productos.json ----------# Archivo generado con los productos obtenidos
│── package.json -----------# Configuración del proyecto (dependencias y scripts)
│── README.md-----------# Explicación del trabajo

---

### ▶️ Ejecución del programa
Para correr el proyecto escribier en consola o terminal:

`node index.js`

Este script ejecuta secuencialmente todas las funciones pedidas en la consigna y al finalizar, se genera o actualiza el archivo productos.json.

---

### 🔎 Funcionalidades implementadas
#### 📌 Parte API

- Obtener todos los productos (GET).
- Obtener productos limitados según un número definido (GET).
- Buscar producto por ID (GET).
- Agregar un producto nuevo (POST).
- Modificar un producto existente (PUT).
- Eliminar un producto existente (DELETE).

#### 📌 Parte FileSystem

- Guardar productos en un archivo local (productos.json).
- Agregar un producto nuevo al archivo local.
- Eliminar productos con precio mayor a un valor dado.

---

### ✅ Conclusión
- Este nos trabajo permitió:
  - Practicar el uso de fetch en Node.js para trabajar con APIs externas.
  - Aprender cómo guardar y manipular archivos locales con FileSystem.
  - Integrar conceptos de asíncronía (promesas y async/await).

De esta forma se cumple con todos los puntos solicitados por la consigna.

---

### 📅 Fecha de Entrega:
Viernes 22 de Agosto de 2025

### 🙌 Agradecimientos:
Agradecemos a nuestros docentes y compañeros por su apoyo y colaboración durante el desarrollo de este trabajo práctico.

Fin del README.
