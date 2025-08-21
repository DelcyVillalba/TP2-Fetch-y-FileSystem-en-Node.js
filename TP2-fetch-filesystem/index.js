/**
 *  TP 2 - Programación III
 *  👉 Tema: Fetch + FileSystem en Node.js
 *  📌 Grupo: BB
 *  👥 Integrantes 
 *     * Sanchez, David
 *     * Ovejero, Yamila Mailen
 *     * Medina, Ricardo Daniel
 *     * Conte Garcia, Emanuel
 *     * Pereyra Diaz, Ezequiel
 *     * Villalba Olmedo, Delcy Adalis
**/

import fetch from "node-fetch";
import fs from "fs";

const URL_API = "https://fakestoreapi.com/products";

// ======= PARTE API =======

// 1) Obtener todos los productos
async function obtenerTodosLosProductos() {
    const respuesta = await fetch(URL_API);
    const productos = await respuesta.json();
    console.log("👉 Total de productos en la API:", productos.length);
}

// 2) Obtener productos limitados y guardarlos
async function obtenerProductosLimitados(limite = 5) {
    const respuesta = await fetch(`${URL_API}?limit=${limite}`);
    const productos = await respuesta.json();
    console.log(`👉 Primeros ${limite} productos obtenidos`);

    // Guardar en archivo local
    fs.writeFileSync("productos.json", JSON.stringify(productos, null, 2));
    console.log("✅ Productos guardados en productos.json");
}

// 3) Buscar producto por ID
async function obtenerProductoPorId(id) {
    const respuesta = await fetch(`${URL_API}/${id}`);
    const producto = await respuesta.json();
    console.log("🔎 Producto encontrado:", producto);
}

// 4) Agregar producto (POST)
async function agregarProductoAPI() {
    const respuesta = await fetch(URL_API, {
        method: "POST",
        body: JSON.stringify({
            title: "Producto de prueba",
            price: 150,
            description: "Un producto de ejemplo",
            image: "https://i.pravatar.cc",
            category: "tecnologia"
        }),
        headers: { "Content-Type": "application/json" }
    });
    const nuevoProducto = await respuesta.json();
    console.log("✅ Producto agregado a la API:", nuevoProducto);
}

// 5) Modificar producto (PUT)
async function modificarProductoAPI(id) {
    const respuesta = await fetch(`${URL_API}/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            title: "Producto actualizado",
            price: 75
        }),
        headers: { "Content-Type": "application/json" }
    });
    const productoActualizado = await respuesta.json();
    console.log("✏️ Producto modificado:", productoActualizado);
}

// 6) Eliminar producto (DELETE)
async function eliminarProductoAPI(id) {
    const respuesta = await fetch(`${URL_API}/${id}`, { method: "DELETE" });
    const productoEliminado = await respuesta.json();
    console.log("🗑️ Producto eliminado de la API:", productoEliminado);
}

// ======= PARTE FILESYSTEM =======

// Agregar producto al archivo local
function agregarProductoLocal() {
    const listaProductos = JSON.parse(fs.readFileSync("productos.json"));
    listaProductos.push({ id: 999, title: "Producto local", price: 25 });
    fs.writeFileSync("productos.json", JSON.stringify(listaProductos, null, 2));
    console.log("📂 Producto agregado en productos.json (local)");
}

// Eliminar productos con precio mayor a cierto valor
function eliminarProductosCaros(precioMaximo) {
    let listaProductos = JSON.parse(fs.readFileSync("productos.json"));
    listaProductos = listaProductos.filter(p => p.price <= precioMaximo);
    fs.writeFileSync("productos.json", JSON.stringify(listaProductos, null, 2));
    console.log(`📂 Eliminados productos con precio mayor a ${precioMaximo}`);
}

// ======= EJECUCIÓN SECUENCIAL =======
(async () => {
    await obtenerTodosLosProductos();
    await obtenerProductosLimitados(3);
    await obtenerProductoPorId(2);
    await agregarProductoAPI();
    await modificarProductoAPI(1);
    await eliminarProductoAPI(1);

    agregarProductoLocal();
    eliminarProductosCaros(100);
})();