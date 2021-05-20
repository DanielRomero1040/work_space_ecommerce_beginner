//import ManagerDom from './ManagerDom.js';
//import agregarAlCarrito from './functions.js';

let contenedorDeProductos = document.getElementById('productos'), 
    
    
    acumuladorIndicadorCarrito = 0,
    acumuladorItemsCarrito = ``,
    acumuladorTotal = 0,
    acumuladorCuotas = 0,
    cantidadDeCuotas,
    cuotaMensual,
    carritoEnLocalStorage = [],
    carrito = [];


  class ManagerDom{
      static crearCard(objeto){
          objeto.forEach( element => {
              const div = document.createElement('div');
              div.classList.add('col-lg-4','col-md-6','mb-4')
              div.innerHTML = `
                <div class="card h-100">
                  <a href="#"><img height="250" width="400" class="card-img-top" src=${element.thumbnail} alt=""></a>
                  <div class="card-body">
                    <h4 class="card-title">
                    <a href="#">${element.title}</a>
                    </h4>
                    <h5> $${element.price}</h5>
                  </div>
                  <div class="card-footer d-flex flex-column">
                    <div clas="d-flex flex-row justify-content-center align-items-center">
                      <small class="text-muted col-1">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                      <button class=" col-6 btn btn-primary ml-1 mb-1" onClick='agregarAlCarrito(${JSON.stringify(element)})'>Add Cart</button>
                    </div>
                         
                  </div>
                </div>
            `
            document.getElementById('productos').appendChild(div);
          });
      }
  
      static crearCategorias(categorias){
        let select = document.getElementById('categorias');
        let options = ``;
          categorias.forEach( (element) => {options += `<option value="${element.id}">${element.name}</option>`
          });
        select.innerHTML = options;
      }
  
      static crearBanner(){
          let banner = ['banner1','banner2','banner3'];
          let acumuladorBanners = ``;
          let acumuladorCarruselItem = ``;
  
          for (let i = 0; i < banner.length; i++) {
            if (i === 0 ){
              acumuladorBanners += `<li data-target="#carouselExampleIndicators" data-slide-to="${i}" class="active"></li>`;    
            }else{
              acumuladorBanners += `<li data-target="#carouselExampleIndicators" data-slide-to="${i}"></li>`;
              };  
          };
          
          for (let i = 0; i < banner.length; i++) {
            if (i === 0 ){
              acumuladorCarruselItem += `<div class="carousel-item active">
              <img class="d-block img-fluid" height="250" src="imagenes/${banner[i]}.jpg" alt="${i} slide">
            </div>`;
            }else{
              acumuladorCarruselItem += `<div class="carousel-item">
              <img class="d-block img-fluid" height="250" src="imagenes/${banner[i]}.jpg" alt="${i} slide">
            </div>`;
            }  
          };
  
          document.getElementById("indicadores").innerHTML = acumuladorBanners;
          document.getElementById("carrusel").innerHTML = acumuladorCarruselItem;
        }
  
        static filtrarCategoria(){
          console.log('probando')
        }
        static seleccionCategoria(id){
            let URLProductoFiltrado = 'https://api.mercadolibre.com/sites/MLA/search?category=' + id;
            return URLProductoFiltrado;
        }
  }

// Desafio de jQuery - 12 y 13 - registro de usuarios

let desafioNombre = $('#desafioNombre');
let desafioApellido = $('#desafioApellido');
let desafioTelefono = $('#desafioTelefono');
let botonRegistro = $('#registro');
let botonCerrar = $('#cerrar');


// $(document).ready(function (){
//   $('#modal').addClass('modal-active');
//   $('#historial-contenedor').append(`<p id="animacion" class=""></p>`);
//   setInterval(function(){ $('#animacion').animate({left:'450px'}, 1000, function(){
//     $(this).animate({left:'0px'}, 1000, function(){});
//   }); }, 300);
  
  
// });

$('#otroUsuario').on('click', function (){
  $('#modal').addClass('modal-active');
  $('#animacion').remove();
  $('#historial-contenedor').append(`<p id="animacion" class=""></p>`);
  setInterval(function(){ $('#animacion').animate({left:'450px'}, 1000, function(){
    $(this).animate({left:'0px'}, 1000, function(){});
  }); }, 300);
              
});
botonCerrar.on('click', function (){
  $('#modal').removeClass('modal-active');
});


botonRegistro.on('click', function(){
    if(desafioNombre.val().trim() != 0){
      if(desafioApellido.val().trim() != 0){
        if(desafioTelefono.val().trim() != 0){
          let dia =  new Date();
          console.log(`${desafioNombre.val()}${desafioApellido.val()}${desafioTelefono.val()}`)
          $('#modal').removeClass('modal-active');
          $('#registroDeUsuarios').append(`
          <li class="m-2" style="display: none">
          <p class="m-0 list-group-item"><span class="font-weight-bold">Nombre:</span> ${desafioNombre.val()} ${desafioApellido.val()}</p>   
          <p class="m-0 list-group-item"><span class="font-weight-bold">Telefono:</span> ${desafioTelefono.val()}</p>
          <p class="m-0 list-group-item"><span class="font-weight-bold">Fecha conexion:</span> ${dia.getDate()}/${dia.getMonth()+1}/${dia.getFullYear()} ${dia.getHours()}:${dia.getMinutes()}:${dia.getSeconds()} hs</p>
          </li>
          `);
        }

        $('li').slideDown(500);
      }
    }else{
      $('#alerta').remove();

      $('#historial-contenedor').append(`<p id="alerta" style="display: none" class="bg-danger">Llene todos los campos por favor</p>`);
      $('#alerta').slideDown(500);

    }
});
// fin de desafio jquery



//   Incorporacion al DOM
const URLCATEGORIAS = 'https://api.mercadolibre.com/sites/MLA/categories';
const URLPRODUCTOS = 'https://api.mercadolibre.com/sites/MLA/search?category=';

document.addEventListener('DOMContentLoaded', function(){
  fetch(URLCATEGORIAS)
    .then(respuesta => {
      console.log(respuesta);
      return respuesta.json();
    })
    .then( categorias => {
      let urlProducto = URLPRODUCTOS + 'MLA1051'; // seccion de celulares..
      fetchProductos(urlProducto);
      ManagerDom.crearCategorias(categorias)      
      
    })
    .catch(e => console.log(e));
})

function fetchProductos(url){
  fetch(url)
    .then(respuesta => {
      console.log(respuesta);
      return respuesta.json();
    })
    .then( articulos => ManagerDom.crearCard(articulos.results))
    .catch(e => console.log(e));
}


ManagerDom.crearBanner();



//  declaracion de funcionalidades

let agregarAlCarrito = (producto) => {  
  console.log(carrito)
  if (carrito) {
    let itemEnCarrito = carrito.find(el => el.id == producto.id);
      if (itemEnCarrito) {
        itemEnCarrito.cantidad += 1;    
      }else{
        producto.cantidad = 1;   
        carrito.push(producto);
      }
  } else {
      console.log(producto)
      producto.cantidad = 1;   
      carrito.push(producto);
  }
  localStorage.setItem('carrito', JSON.stringify(carrito)); 
  actualizarCarrito();
  indicadorCarrito();
};

let indicadorCarrito = () => {
  carritoEnLocalStorage = JSON.parse(localStorage.getItem('carrito'));
  acumuladorIndicadorCarrito = carritoEnLocalStorage.reduce( (acum , el) => acum += el.cantidad, 0);
  localStorage.setItem('acumuladorIndicadorCarrito', acumuladorIndicadorCarrito)
  document.getElementById("acumuladorCarrito").innerHTML = acumuladorIndicadorCarrito;  
};

let actualizarCarrito = () => {  
  document.getElementById("carrito").innerHTML = ``;
  carritoEnLocalStorage = JSON.parse(localStorage.getItem('carrito'));
  carritoEnLocalStorage.forEach( (element) => { 
    const li = document.createElement('li')
    li.classList.add('list-group-item','text-right', 'mx-2')
    li.innerHTML = `
    ${element.cantidad} unidades x "${element.title}" - ${element.price} $/unidad  <span>-    Subtotal = ${element.cantidad * element.price} $ </span>
    <button class="btn btn-danger mx-5" style="margin-left:1rem" onClick='eliminarItem("${element.id}")'>X</button>
    </li>`;
  document.getElementById("carrito").appendChild(li)
  });
  acumuladorTotal = carritoEnLocalStorage.reduce( (acumu , el) => acumu += el.price * el.cantidad, 0);
  document.getElementById("total").innerHTML = acumuladorTotal;  
};

let iniciarCarrito = () => {
  let rndCol = localStorage.getItem('colorDeFondo');
  carritoEnLocalStorage = JSON.parse(localStorage.getItem('carrito'));
  carrito = carritoEnLocalStorage;  
  if (carritoEnLocalStorage){           
    actualizarCarrito();
    document.body.style.backgroundColor = rndCol;
    indicadorCarrito();
  }else{
    localStorage.removeItem('carrito');
    localStorage.removeItem('acumuladorIndicadorCarrito');
    localStorage.removeItem('colorDeFondo');
    carritoEnLocalStorage = [];
    carrito = []; 
  }
    
};

let vaciarCarrito = () => {
  localStorage.removeItem('carrito');
  localStorage.removeItem('acumuladorIndicadorCarrito');
  acumuladorItemsCarrito = ``;
  acumuladorIndicadorCarrito = 0;
  acumuladorTotal = 0;
  acumuladorCuotas = ``;
  carritoEnLocalStorage = [];
  carrito = [];
  document.getElementById("carrito").innerHTML = acumuladorItemsCarrito;
  document.getElementById("acumuladorCarrito").innerHTML = acumuladorIndicadorCarrito;
  document.getElementById("total").innerHTML = acumuladorTotal;
  document.getElementById("cuotas").innerHTML = acumuladorCuotas; 
};

let eliminarItem = (id) => {
  carrito = carritoEnLocalStorage;
  let productoAEliminar = carrito.find( el => el.id == id )

  productoAEliminar.cantidad--

  if (productoAEliminar.cantidad == 0) {
      let indice = carrito.indexOf(productoAEliminar)
      carrito.splice(indice, 1)
  }

  localStorage.setItem('carrito' ,JSON.stringify(carrito));
  console.log(carrito)
  actualizarCarrito()
  indicadorCarrito()  
};

let cuotas = () => {
  cantidadDeCuotas = parseInt(document.getElementById('cuotasIngresadas').value);
  cuotaMensual = acumuladorTotal / cantidadDeCuotas;
  acumuladorCuotas = `Pagarás ${cuotaMensual}$ mensuales, durante ${cantidadDeCuotas} meses, Sin Intereses!! `
  document.getElementById("cuotas").innerHTML = acumuladorCuotas;
};

let ordenarCarrito = () => {  
  acumuladorItemsCarrito = ``;
  carritoEnLocalStorage.sort( (a , b) => a.price - b.price);  
  carritoEnLocalStorage.forEach(element => { acumuladorItemsCarrito +=`<li class="list-group-item text-right mx-2">
    ${element.cantidad} unidades x "${element.title}" - ${element.price} $/unidad  <span>-    Subtotal = ${element.cantidad * element.price} $ </span>
    <button class="btn btn-danger mx-5" style="margin-left:1rem"onClick='eliminarItem(${element.id})'>X</button>
    </li>`;      
    });
  document.getElementById("carrito").innerHTML = acumuladorItemsCarrito;
};

let ingresarNombre = () => {
  nombre = document.getElementById("input").value
  elementoNombre = `<p class="bg-success p-2 m-2 text-white rounded-lg shadow" > Bienvenido/a ${nombre} a tu tienda online! los mejores precios solo para vos! </p>`;
  document.getElementById("nombre").innerHTML = elementoNombre;
};

function random(number) {
  return Math.floor(Math.random() * (number+1));
};

function bgChange() {
  let rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  console.log(rndCol)
  localStorage.setItem('colorDeFondo', rndCol);
  document.body.style.backgroundColor = rndCol;
};

//  Eventos

let cargarPagina = document.body;
cargarPagina.onload = iniciarCarrito;

let botonCuotas = document.getElementById('boton-financiar');
botonCuotas.onclick = cuotas;

let botonOrdenar = document.getElementById('boton-ordenar');
botonOrdenar.onclick = ordenarCarrito;

let usuario = document.getElementById('usuario');
usuario.addEventListener('click', ingresarNombre);

let btnColor = document.getElementById('color');
btnColor.onclick = bgChange;

// revisar
let selectPrecios = document.getElementById('precios');
function filtrar() {
  let valorFiltroPrecios = selectPrecios.value;

  let arrayFiltrado = [];
  
  if (valorFiltroPrecios == 1) {
    arrayFiltrado = stockProductos.filter( el => el.precio <= 5000)
  } else if (valorFiltroPrecios == 2) {
    arrayFiltrado = stockProductos.filter( el => el.precio >= 5000)
  } else if (valorFiltroPrecios == 0) {
    arrayFiltrado = stockProductos;
  }
  
  document.getElementById('productos').innerHTML = ``;
  arrayFiltrado.forEach( (element) => { 
    const div = document.createElement('div');
    div.classList.add('col-lg-4','col-md-6','mb-4')
    div.innerHTML = `
      <div class="card h-100">
        <a href="#"><img height="250" width="400" class="card-img-top" src=${element.thumbnail} alt=""></a>
        <div class="card-body">
          <h4 class="card-title">
          <a href="#">${element.title}</a>
          </h4>
          <h5> $${element.price}</h5>
        </div>
        <div class="card-footer d-flex flex-column">
          <div clas="d-flex flex-row justify-content-center align-items-center">
            <small class="text-muted col-1">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
            <button class=" col-6 btn btn-primary ml-1 mb-1" onClick='agregarAlCarrito(${JSON.stringify(element)})'>Add Cart</button>
          </div>
              
        </div>
      </div>
  `
  contenedorDeProductos.appendChild(div);
  });
}

selectPrecios.addEventListener('change', ()=>{
  filtrar()
})


document.getElementById("acumuladorCarrito").innerHTML = acumuladorIndicadorCarrito;
document.getElementById("carrito").innerHTML = acumuladorItemsCarrito;
document.getElementById("total").innerHTML = acumuladorTotal;
document.getElementById("cuotas").innerHTML = acumuladorCuotas;



// async function generarLinkDePago() {
//   const productsToMP = carrito.map((element) => {
//     let nuevoElemento = {
//       title: element.title,
//       description: "",
//       picture_url: "",
//       category_id: element.id,
//       quantity: Number(element.cantidad),
//       currency_id: "ARS",
//       unit_price: Number(element.precio),
//     };
//     return nuevoElemento;
//   });
//   console.log(productsToMP);
//   const response = await fetch(
//     "https://api.mercadopago.com/checkout/preferences",
//     {
//       method: "POST",
//       headers: {
//         Authorization:
//           "Bearer ACA VA TU TOKEN",
//       },
//       body: JSON.stringify({
//         items: productsToMP,
//       }),
//     }
//   );
//   const data = await response.json();
//   window.open(data.init_point, "_blank");
// }