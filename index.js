document.addEventListener("DOMContentLoaded", cargaInicial)

function cargaInicial(){
    verCarrito()
}
const shop = document.getElementById("tienda")


const productos = [
    {
        id: 1,
        nombre:"Pantalon Jemma",
        precio: 3000,
        img:"https://psychic.com.ar/wp-content/uploads/2023/06/4220.jpg"

    },
    {
        id: 2,
        nombre:"Top Venus",
        precio:1000,
        img: "https://psychic.com.ar/wp-content/uploads/2023/04/p1163-3.jpg",

    },
    {
        id: 3,
        nombre:"Buzo oversize",
        precio:2000,
        img:"https://psychic.com.ar/wp-content/uploads/2023/05/P898.png"

    },
]

let carrito = []

productos.forEach((product)=> {
   let producto = document.createElement("div")
   producto.innerHTML = `
   <div class="card" style="width: 18rem;">
           <img src="${product.img}" class="card-img-top" alt="...">

       <div id=${product.id} class="card-body">
        <h5 class="card-title">${product.nombre}</h5>
        <p class="card-text">$${product.precio}</p>
        
        </div>
        </div>`
      
     shop.append(producto)

   let comprar = document.createElement("button")
    comprar.innerText =  "Agregar al carrito"
    comprar.className= "agregar al carrito"

   producto.append(comprar);

   comprar.addEventListener("click", () =>{
       agregarAlCarrito(product.id);
   })
})


function  agregarAlCarrito(id){
    let producto = productos.find(product => product.id == id)
     
    let productoComprado = carrito.find(producto => producto.id == id)

    if(productoComprado){
        productoComprado.cantidad++

    }else{
        producto.cantidad = 1
        carrito.push(producto)
    }
  
 verCarrito()
 guardarCarrito()
 }
   


function verCarrito(){
    const vercarrito = document.getElementById("carrito")

    vercarrito.innerHTML = ''

    carrito.forEach((product, index)=> {
        let producto = document.createElement("div")

        producto.innerHTML =`
        <div class="card" style="width: 18rem;">
                <img src="${product.img}" class="card-img-top" alt="...">
     
            <div id=${product.id} class="card-body">
             <h5 class="card-title">${product.nombre}</h5>
             <p class="card-text">$${product.precio}</p>
             <p class="card-text">Cantidad: ${product.cantidad}</p>
             <button id="${product.id}"> Eliminar del carrito</button>
             
             </div>
             </div>`

             vercarrito.appendChild(producto)

             producto.querySelector("button").addEventListener("click", ()=>{
              eliminarProductos(index)
             })
        
})
 }

 function eliminarProductos(indice){
   carrito[indice].cantidad--;

   if(carrito[indice].cantidad === 0){
    carrito.splice(indice, 1)
   }


   verCarrito()
   guardarCarrito()
 }

 function guardarCarrito(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
 }

 function cargarCarrito(){

    if(localStorage.getItem('carrito')!== null){
        carrito = JSON.parse(localStorage.getItem('carrito'))
    }else {
        carrito = [];
    }
     }





