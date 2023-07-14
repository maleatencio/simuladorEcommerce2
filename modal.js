const IconCarrito = document.getElementById('verCarrito')
const modal = document.getElementById('modal-container')
const closeButton = document.getElementsByClassName('close')[0]


IconCarrito.addEventListener("click", () => {
    modal.style.display = "block";
  });
  
  closeButton.addEventListener('click', () => {
    modal.style.display = "none"
  })

  window.addEventListener('click', (event)=>{

    if(event.target === modal){
        modal.style.display = "none"
    }

  })