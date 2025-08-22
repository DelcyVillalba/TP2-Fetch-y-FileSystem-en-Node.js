/**
 * TP 2 - Programación III
 * 👉 Tema: Fetch + FileSystem en Node.js
 * 📌 Grupo: BB
 * 👥 Integrantes
 * * Sanchez, David
 * * Ovejero, Yamila Mailen
 * * Medina, Ricardo Daniel
 * * Conte Garcia, Emanuel
 * * Pereyra Diaz, Ezequiel
 * * Villalba Olmedo, Delcy Adalis
 **/

// Importamos los módulos necesarios para trabajar con APIs y archivos.
import fetch from "node-fetch";
import fs from "fs";

// Definimos la URL de la API y el nombre del archivo local.
const URL_API = "https://fakestoreapi.com/products";
const FILENAME = "productos.json";

// Función auxiliar para manejar las respuestas de la API.
async function handleResponse(response) {
    if (!response.ok) {
        throw new Error(
            `Error en la solicitud: ${response.status} ${response.statusText}`
        );
    }
    return response.json();
}

// ======= CONSIGNAS DEL TP =======

// 1) Se pidió: Recuperar la información de todos los productos (GET).
async function obtenerTodosLosProductos() {
    try {
        const response = await fetch(URL_API);
        const productos = await handleResponse(response);
        console.log("--- PRODUCTOS OBTENIDOS DESDE LA API ---");
        console.table(
            productos.map((p) => ({
                ID: p.id,
                Título: p.title.substring(0, 40) + "...", // Truncamos el título
                Precio: `$${p.price}`,
                Categoría: p.category,
                Calificación: p.rating.rate,
            }))
        );
        return productos;
    } catch (error) {
        console.error("❌ Error al obtener todos los productos:", error.message);
    }
}

// 2) Se pidió: Recuperar la información de un número limitado de productos (GET).
async function obtenerProductosLimitados(limite = 5) {
    try {
        const response = await fetch(`${URL_API}?limit=${limite}`);
        const productos = await handleResponse(response);
        console.log(`\nSe obtuvieron ${productos.length} productos`);
        return productos;
    } catch (error) {
        console.error("❌ Error al obtener productos limitados:", error.message);
    }
}

// 3) Se pidió: Persistir los datos de la consulta anterior en un archivo local JSON.
function guardarProductosLocal(productos) {
    try {
        fs.writeFileSync(FILENAME, JSON.stringify(productos, null, 2));
        console.log("Productos guardados en archivo local");
    } catch (error) {
        console.error(
            `❌ Error al guardar los productos en ${FILENAME}:`,
            error.message
        );
    }
}

// 4) Se pidió: Buscar la información de un determinado producto por "id" (GET).
async function obtenerProductoPorId(id) {
    try {
        const response = await fetch(`${URL_API}/${id}`);
        const producto = await handleResponse(response);
        console.log(`\n--- Producto encontrado por ID: ${id} ---`);
        console.log(`ID: ${producto.id}`);
        console.log(`Título: ${producto.title}`);
        console.log(`Precio: $${producto.price}`);
        console.log(`Descripción: ${producto.description.substring(0, 50)}...`);
        console.log(`Categoría: ${producto.category}`);
        console.log(
            `Calificación: ${producto.rating.rate} (${producto.rating.count} votos)`
        );
        return producto;
    } catch (error) {
        console.error(
            `❌ Error al buscar el producto con ID ${id}:`,
            error.message
        );
    }
}

// 5) Se pidió: Agregar un nuevo producto (POST).
async function agregarProductoAPI() {
    try {
        const nuevoProductoData = {
            title: "Smartphone de última generación",
            price: 699.99,
            description:
                "Un teléfono móvil con pantalla OLED, 256GB de almacenamiento y cámara profesional.",
            category: "electronics",
            rating: { rate: 4.8, count: 150 },
        };
        const response = await fetch(URL_API, {
            method: "POST",
            body: JSON.stringify(nuevoProductoData),
            headers: { "Content-Type": "application/json" },
        });
        const productoRetornado = await handleResponse(response);
        console.log("\n--- Producto agregado via POST ---");
        // La API solo devuelve el ID y los datos que enviamos, pero no la calificación.
        console.log(`ID: ${productoRetornado.id}`);
        console.log(`Título: ${nuevoProductoData.title}`);
        console.log(`Precio: $${nuevoProductoData.price}`);
        console.log(`Categoría: ${nuevoProductoData.category}`);
        return nuevoProductoData; // Y devolvemos el objeto completo para que el guardado local no falle
    } catch (error) {
        console.error("❌ Error al agregar un producto:", error.message);
    }
}

// 6) Se pidió: Modificar los datos de un producto (UPDATE/PUT).
async function modificarProductoAPI(id) {
    try {
        const datosActualizados = {
            title: "Producto modificado",
            price: 99.99,
        };
        const response = await fetch(`${URL_API}/${id}`, {
            method: "PUT",
            body: JSON.stringify(datosActualizados),
            headers: { "Content-Type": "application/json" },
        });
        const productoActualizado = await handleResponse(response);
        console.log("\n--- Producto modificado por ID ---");
        console.log(`ID: ${productoActualizado.id}`);
        console.log(`Nuevo precio: $${productoActualizado.price}`);
        return productoActualizado;
    } catch (error) {
        console.error(
            `❌ Error al modificar el producto con ID ${id}:`,
            error.message
        );
    }
}

// 7) Se pidió: Eliminar un producto (DELETE).
async function eliminarProductoAPI(id) {
    try {
        const response = await fetch(`${URL_API}/${id}`, { method: "DELETE" });
        const productoEliminado = await handleResponse(response);
        console.log("\n--- Producto eliminado por ID ---");
        console.log(`ID: ${productoEliminado.id}`);
        console.log(`Título eliminado: ${productoEliminado.title}`);
        return productoEliminado;
    } catch (error) {
        console.error(
            `❌ Error al eliminar el producto con ID ${id}:`,
            error.message
        );
    }
}

// 8) Se pidió: Agregar producto al archivo local.
function agregarProductoLocal(nuevoProducto) {
    try {
        const listaProductos = JSON.parse(fs.readFileSync(FILENAME));
        listaProductos.push(nuevoProducto);
        fs.writeFileSync(FILENAME, JSON.stringify(listaProductos, null, 2));
        console.log("\n--- Producto agregado al archivo local ---");
        console.log(`Título: ${nuevoProducto.title}`);
        console.log(`Precio: $${nuevoProducto.price}`);
    } catch (error) {
        console.error("❌ Error al agregar producto local:", error.message);
    }
}

// 9) Se pidió: Eliminar los productos superiores a un valor determinado.
function eliminarProductosCaros(precioMaximo) {
    try {
        let listaProductos = JSON.parse(fs.readFileSync(FILENAME));
        const productosAntes = listaProductos.length;
        const productosAEliminar = listaProductos.filter(
            (p) => p.price > precioMaximo
        );
        listaProductos = listaProductos.filter((p) => p.price <= precioMaximo);
        fs.writeFileSync(FILENAME, JSON.stringify(listaProductos, null, 2));
        console.log(
            `\n--- Eliminados ${productosAntes - listaProductos.length} productos ---`
        );
        console.table(
            productosAEliminar.map((p) => ({
                ID: p.id,
                Título: p.title,
                Precio: `$${p.price}`,
            }))
        );
    } catch (error) {
        console.error("❌ Error al eliminar productos locales:", error.message);
    }
}

// ======= EJECUCIÓN SECUENCIAL DE LAS CONSIGNAS =======
(async () => {
    console.log("### INICIO DE EJECUCIÓN ###");
    console.log("\n--- INFORMACIÓN DEL GRUPO ---");
    console.log("Grupo: BB");
    console.log("Integrantes:");
    console.log(
        " * Sanchez, David\n * Ovejero, Yamila Mailen\n * Medina, Ricardo Daniel\n * Conte Garcia, Emanuel\n * Pereyra Diaz, Ezequiel\n * Villalba Olmedo, Delcy Adalis"
    );

    console.log("\n--- PRUEBAS DE LA API ---");

    await obtenerTodosLosProductos();

    const productosLimitados = await obtenerProductosLimitados(5);
    if (productosLimitados) {
        guardarProductosLocal(productosLimitados);
    }

    await obtenerProductoPorId(2);

    const nuevoProducto = await agregarProductoAPI();

    // Verificamos que nuevoProducto no sea undefined antes de agregarlo localmente
    if (nuevoProducto) {
        await modificarProductoAPI(1);
        await eliminarProductoAPI(1);
    }

    console.log("\n--- PRUEBAS DE FILESYSTEM ---");

    if (nuevoProducto) {
        agregarProductoLocal(nuevoProducto);
    }

    eliminarProductosCaros(100);

    console.log("\n### FIN DE LA EJECUCIÓN ###");
})();
