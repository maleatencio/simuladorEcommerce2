document.addEventListener("DOMContentLoaded", cargaInicial)

function cargaInicial(){
    verCarrito()
}
//const shop = document.getElementById("tienda")




let carrito = []


async function obtenerProductos(){
    const respuesta = await fetch("productos.json")

    const productos = await respuesta.json()
    
    return productos
}

async function mostrarProductos(){
    const productos = await obtenerProductos()

    const contenedor = document.getElementById("tienda")

 

productos.forEach((product)=> {
   let producto = document.createElement("div")
   producto.innerHTML = `
   <div class="card" style="width: 18rem;">
           <img src="${product.img}" class="card-img-top" alt="...">

       <div id=${product.id} class="card-body">
        <h5 class="card-title">${product.nombre}</h5>
        <p class="card-text">$${product.precio}</p>
        <button id="${product.id}">Agregar al carrito</button>
        </div>
        </div>`
      
     contenedor.appendChild(producto)

     const btnComprar = document.getElementById(`${product.id}`)
     btnComprar.addEventListener("click", () =>{
        console.log(product.id)
       

        let producto = productos.find(product => product.id == product.id)
     
                 let productoComprado = carrito.find(producto => producto.id == product.id)

                  if(productoComprado){
             productoComprado.cantidad++
              }else{
                producto.cantidad = 1
               carrito.push(producto)
                }
 })
 verCarrito(producto.id)
    })
    
    
    guardarCarrito()
     }
  
function verCarrito(id){
    console.log(id)

     

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
 guardarCarrito()
  }
 
  

mostrarProductos()

 



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

     

 



