import { promises as fs } from "fs"

class ProductManager {
    constructor() {
        this.path = "./productos.txt"
        this.products = []
    }
    static id = 0

    addProduct = async (title, description, price, thumbnail, code, stock) => {

        ProductManager.id++

        let newProduct = {
            id: ProductManager.id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.products.push(newProduct)

        await fs.writeFile(this.path, JSON.stringify(this.products))
    }

    readProducts = async () => {
        let respuesta = await fs.readFile(this.path, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    }
    
    // Para encontrar el producto mediante el ID

    getProductsById = async (id) => {
        try {
            let respuesta3 = await this.readProducts();
            const product = respuesta3.find((product) => product.id === id);
            if (!product) {
                console.log(`Producto con el ID ${id} No Encontrado`);
            } else {
                console.log(`Se encontro el ID ${id}`);
            }
        } catch (error) {
            console.log(`Error al obtener el producto por ID: ${id}`);
        }
    }
    
    // Para borrar el producto del archivo txt
    
    deleteProductsById = async (id) => {
        try {
            let respuesta3 = await this.readProducts();
            let productFilter = respuesta3.filter((product) => product.id != id);
            await fs.writeFile(this.path, JSON.stringify(productFilter));
            console.log(`Producto con el ID número ${id} eliminado`);
        } catch (error) {
            console.log(`Error al eliminar el producto por ID: ${error}`);
        }
    }

    // Para modificar o actualizar alguno de los productos (en este caso se cambio el price del producto 3)
    
    updateProducts = async ({id, ...producto}) => {
        await this.deleteProductsById(id)
        let productOld = await this.readProducts()
        let productoModificado = [{...producto, id}, ...productOld]
        await fs.writeFile(this.path, JSON.stringify(productoModificado))
    }
}

const productos = new ProductManager();

//productos.addProduct("Titulo1", "Description1", 1000, "Imagen1", "abc123", 5)
//productos.addProduct("Titulo2", "Description2", 5000, "Imagen2", "abc124", 10)
//productos.addProduct("Titulo3", "Description3", 2000, "Imagen3", "abc125", 4)

productos.getProducts() // ------> Añade los productos al archivo txt

//productos.getProductsById(2) // -----> Busca producto por el ID

//productos.deleteProductsById(1) // ------> Para borrar el producto del archivo txt

/*productos.updateProducts({
    id: 3,
    title: 'Titulo3',
    description: 'Description3',
    price: 8000,
    thumbnail: 'Imagen3',
    code: 'abc125',
    stock: 4
})*/