
// PRIMERA FORMA 

// const getProductos = () => {

//     fetch('productos.json')
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//     })
//     .catch(error =>{
//         console.log(error);
//     })
// }



// SEGUNDA FORMA
 const getProductos = async () => {

 try {
  const resp = await fetch('productos.json')
  const data =  await resp.json()
       cargarProductos(data)
  

 } catch (error){
       console.log(error);
 }
 }


 getProductos()

 const $carrito = document.querySelector('#contador')

 const cargaInicial = () =>{


   cargarCarrito()
  getProductos()
  verCarrito()
 }

 document.addEventListener('DOMContentLoaded', cargaInicial)

let carrito = []


const cargarProductos = (productos) =>{
 const $tienda = document.getElementById('tienda')

 productos.forEach(product => {
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
         
        $tienda.appendChild(producto)
   
        const btnComprar = document.getElementById(`${product.id}`)
        btnComprar.addEventListener("click", () =>{
       agregarAlCarrito (product)

  
})
 })
  }

  const agregarAlCarrito = (product) => {

      const productoEnCarrito = carrito.find(item => item.id === product.id)
     
      if (productoEnCarrito){
            productoEnCarrito.cantidad++
      }else{
            carrito.push({
             id: product.id,
             nombre: product.nombre,
             precio: product.precio,
             img: product.img,
             cantidad: 1
            })
      }

      const totalCantidad = carrito.reduce((total, item) => total + item.cantidad, 0);

   console.log(totalCantidad);

      

      verCarrito()
     guardarCarrito()

  }

const verCarrito = () => {
      const $contenedorModal = document.querySelector('.contenedor_compras');

      $contenedorModal.innerHTML = '';


carrito.forEach(product =>{

      const $div = document.createElement('div')
      $div.classList.add('tbody')

      const $div2 = document.createElement('div')
      $div.classList.add('columna_1')

      const $img = document.createElement('img')
      $img.classList.add('img_cart')      
      $img.src = product.img

      $div2.appendChild($img)

      $div.appendChild($div2)

      //columna 2

      const $div3 = document.createElement('div')
      $div.classList.add('columna_2')
      $div3.textContent = product.nombre

      $div.appendChild($div3)

      //columna 3

      const $div4 = document.createElement('div')
      $div.classList.add('columna_3')

      //input numerico

      const $input = document.createElement('input')
      $input.type = 'number'
      $input.value = product.cantidad

      $div4.appendChild($input)

      $div.appendChild($div4)
       
      const $div5 = document.createElement('div')
      $div5.classList.add('columna_4')
      $div5.textContent = `${product.precio * product.cantidad}`

      $div.appendChild($div5)

      const $div6 = document.createElement('div')
      $div6.classList.add('columna_5')

      const $button = document.createElement('button')
      $button.textContent = 'X'

      $div6.appendChild($button)

      $div.appendChild($div6)

     $contenedorModal.appendChild($div)

      $button.addEventListener('click', () => {
            eliminarProducto(product.id);
            const totalCantidad = carrito.reduce((total, item) => total + item.cantidad, 0);
            $carrito.textContent = totalCantidad
            })
   
      $input.addEventListener('change', () => {
            console.log('Cambiar cantidad');
          cambiarCantidad(product.id, +($input.value));
          totalIndividual(product.id, product.precio, +($input.value));

          const totalCantidad = carrito.reduce((total, item) => total + item.cantidad, 0);
          $carrito.textContent = totalCantidad

      })
       })

      const totalCarrito = carrito.reduce((total, item) => total + item.precio, 0);

      const $totalModal = document.createElement("div")
      $totalModal.className = "total-content"  
      $totalModal.innerHTML = `Total a pagar: $${totalCarrito}`

     
       const $button2 = document.createElement('button')
       $button2.className = "btnPagar"
      $button2.textContent = 'Pagar'

      $contenedorModal.appendChild($button2)
      
     $contenedorModal.appendChild($totalModal)

        console.log(totalCarrito);
      
      
 $button2.addEventListener('click', () => {
     Swal.fire(
           'Compra realizada con exito!',
           'Gracias por tu compra!',
           'success'
          )
     })

      
      
             
 

  
 }





const totalIndividual = (id, precio, cantidad) =>{

 const product = carrito.find(product => product.id !== id)

    if(cantidad > 0){ 
        product.total = precio * cantidad
     }else{ 
    eliminarProducto(id)
   }

    verCarrito()

   guardarCarrito()

}

  const eliminarProducto = (id) =>{

     carrito = carrito.filter(product => product.id !== id)

    verCarrito()
     guardarCarrito()
  }

  
  const cambiarCantidad = (id, cantidad) =>{

      const producto = carrito.find(producto => producto.id === id )

      producto.cantidad = cantidad

      verCarrito()

      guardarCarrito()
 }



 

 const guardarCarrito  = ()  =>{
      localStorage.setItem('carrito', JSON.stringify(carrito))
   }
  
   const cargarCarrito =() => {
  
      if(localStorage.getItem('carrito')!== null){
          carrito = JSON.parse(localStorage.getItem('carrito'))
      }else {
          carrito = [];
      }
       }
  
      
