console.log(fetch('js/objetos.json'))
const contenedorCarr = document.getElementById('carrito-contenedor')
const vaciarcarr = document.getElementById('vaciarCarrito')
const totalapagar = document.getElementById('total')

/*array vacio del carrito de compras */
let carrito = []

/*funcion para imprimir las cartas de productos en el html */

const contenedorObj = document.getElementById('tarjetas')
/*cargo los productos desde un json*/
fetch("js/objetos.json")
.then (res=>res.json())
.then ((objetos)=>{
  objetos.forEach((producto) => {
    const div = document.createElement('div');
    div.classList.add('card')
    div.innerHTML=`
      <div class="card-body">
          <h5>${producto.producto}</h5>
          <p>${producto.precio}</p>
          <button class="btn btn-dark" id="añadir${producto.id}">Comprar</button>
      </div>
      `
  
    contenedorObj.appendChild(div);

  /*para registrar el boton de añadir objeto al carrito */
  const boton = document.getElementById(`añadir${producto.id}`)
  boton.addEventListener('click', () => {
    Toastify({
      text: "Objeto agregado al carrito",
      duration: 2000,
      gravity: 'bottom',
      position: 'right',
      style: {
        background:'#111'
      }

    }).showToast();
    añadirProducto(producto.id)
       
  })

})

/* funcion que agrega el objeto al carrito*/
const añadirProducto = (prodId) => {
  /*para agregar los productos repetidos en un solo elemento en cantidades y no en cascada uno por uno*/
  const acumular = carrito.some (prod => prod.id === prodId)
  if(acumular){
    const prod = carrito.map(prod =>{
      if(prod.id === prodId){
        prod.numerodeprods++
      }
    })
  }else{
    const item = objetos.find((prod) => prod.id === prodId)
    carrito.push(item)
  }
 
  /*llamo la funcion asi puedo ver los objetos en carrito*/
  verCarrito()
  cargarstorage(carrito)
  
}
    
})

/*funcion para visualizar cambios hechos en el carrito*/
const verCarrito = () => {
  
  contenedorCarr.innerHTML = "" //con esto hago que se borre todo el contenido y se cargue el nuevo sino se me empezaban a repetir los items
  carrito.forEach((producto) =>{
    const div = document.createElement('div')
    div.className = ('productoCarr')
    div.innerHTML=`
    <p>${producto.producto}</p>
    <p>Precio:$ ${producto.precio*producto.numerodeprods}</p>
    <p class="units">
                <p class="btn minus" onclick="cambiarnumerodeprods('minus', ${producto.id})">-</p>
                <p class="number">${producto.numerodeprods}</p>
                <p class="btn plus" onclick="cambiarnumerodeprods('plus', ${producto.id})">+</p>           
    </p>
    
    <button onClick="elimcar(${producto.numerodeprods})" class="eliminarit btn-dark">Eliminar</button>
    `
    contenedorCarr.appendChild(div);
   
  })
  
  /*sumo el total de la compra de cada objeto*/
  totalapagar.innerText = carrito.reduce((acc, producto) => acc + producto.precio * producto.numerodeprods ,0)
}


/*almacenando objetos en el local storage*/
const cargarstorage = (carrito) =>{
  localStorage.setItem('carrito',JSON.stringify(carrito))
}
if (localStorage.getItem('carrito')){
  carrito = JSON.parse(localStorage.getItem('carrito'));
  verCarrito()
}

/*funcion para eliminar objetos del carrito */

const elimcar = (prodId) =>{
  const item = carrito.find((prod)=>prod.id===prodId)
  const indice = carrito.indexOf(item)
  carrito.splice(indice, 1)
  verCarrito()
  cargarstorage(carrito)
  Toastify({
    text: "Objeto eliminado del carrito",
    duration: 2000,
    gravity: 'bottom',
    position: 'right',
    style: {
      background:'#111'
    }

  }).showToast();
  
}

/*para vaciar el carrito */
vaciarcarr.addEventListener('click',()=>{
  Swal.fire({
      title: 'Está seguro de eliminar todo el carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, seguro',
      cancelButtonText: 'No, no quiero'
  }).then((result) => {
  verCarrito()
  cargarstorage(carrito)
  if (result.isConfirmed){
    Swal.fire({
    title: 'Has vaciado el carrito!',
    icon: 'success',
  })
    carrito.length = 0
    verCarrito()
    cargarstorage(carrito)  
    }
})

  
})
/*para cambiar cantidad de productos con botones -+*/
function cambiarnumerodeprods(action, id) {
  carrito = carrito.map((prod) => {
    let numerodeprods = prod.numerodeprods;
    if (prod.id === id) {
      if (action === "minus" && numerodeprods > 1) {
        numerodeprods--;
      } else if (action === "plus" && prod.numerodeprods > 0) {
        numerodeprods++;
      }
    }

    return {
      ...prod,
      numerodeprods,
    };
  });

  verCarrito();
  cargarstorage(carrito)
}

class Suscriptor{
  constructor(nombre,correo){
    this.nombre = nombre;
    this.correo = correo;
  }
}
/*boton para suscribirse a novedades*/
const botonsus = document.getElementById('Suscribirse')
botonsus.addEventListener("click",()=>{
  aceptarSus()
})

function aceptarSus(){
  let nombre = document.getElementById("nombre").value;
  let correo = document.getElementById("mail").value;
  let suscriptor1 = new Suscriptor(nombre, correo);
  console.log(suscriptor1)
  mostrarSuscripto(suscriptor1);
}

function mostrarSuscripto(suscriptor){
  let formulario = document.getElementById("nuevosus");
  formulario.innerHTML = "";
  let nuevomensaje = document.createElement("div");
  nuevomensaje.innerHTML = `<h3>Gracias ${suscriptor.nombre} en unos instantes recibiras las novedades</h3>`;
  nuevomensaje.className = "info-sus";
  formulario.appendChild(nuevomensaje)
}