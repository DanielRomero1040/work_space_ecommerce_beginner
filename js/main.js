let contenedorDeProductos = document.getElementById('productos'),  
    acumuladorIndicadorCarrito = 0,
    acumuladorItemsCarrito = ``,
    acumuladorTotal = 0,
    acumuladorCuotas = 0,
    cantidadDeCuotas,
    cuotaMensual,
    carritoEnLocalStorage = [],
    carrito = [];
let cargarPagina = document.body;
let botonOrdenar = document.getElementById('boton-ordenar');
let modalCarrito = document.getElementsByClassName('modal-carrito')[0];
let contenedorModal = document.getElementById('modalCarrito');
let botonCerrarCarrito = $('#cerrarCarrito');
let selectPrecios = document.getElementById('precios');    
let botonPagar = document.getElementById('boton-pagar');

// ---------------  Incorporacion al DOM ----------------------------
const URLCATEGORIAS = 'https://api.mercadolibre.com/sites/MLA/categories';
const URLPRODUCTOS = 'https://api.mercadolibre.com/sites/MLA/search?category=';

document.addEventListener('DOMContentLoaded', function(){
  fetch(URLCATEGORIAS)
    .then(respuesta => {
      console.log(respuesta);
      return respuesta.json();
    })
    .then( categorias => {
      let urlProducto = URLPRODUCTOS + 'MLA5725'; 
      fetchProductos(urlProducto);
      ManagerDom.crearCategorias(categorias)     
    })
    .catch(e => console.log(e));
})

ManagerDom.filtrarCategoria('categorias', 'change', ManagerDom.seleccionCategoria);
ManagerDom.buscarPalabra('busqueda', 'change', ManagerDom.traerBusqueda);
ManagerDom.buscarPalabra('buscar', 'click', ManagerDom.traerBusqueda);

function fetchProductos(url){
  fetch(url)
    .then(respuesta => {
      console.log(respuesta);
      return respuesta.json();
    })
    .then( articulos => {
      productosEnPantalla = [];
      ManagerDom.crearCard(articulos.results)})
    .catch(e => console.log(e));
}
    
ManagerDom.crearBanner();

//--------------- Eventos ---------------------


cargarPagina.onload = iniciarCarrito;

// let botonCuotas = document.getElementById('boton-financiar');
// botonCuotas.onclick = cuotas;

botonOrdenar.onclick = ordenarCarrito;

//let btnColor = document.getElementById('color');
//btnColor.onclick = bgChange;

modalCarrito.addEventListener('click', (event)=>{
  event.stopPropagation()
});

contenedorModal.addEventListener('click', (e)=>{
  e.stopPropagation();
  $('#modalCarrito').removeClass('modal-active');
});

botonPagar.addEventListener('click', ()=>{
  finalizarCompra();
  vaciarCarrito();
});


// carrito modal


$('#changuito').on('click', function (){
  $('#modalCarrito').addClass('modal-active');
  actualizarCarrito();              
});
botonCerrarCarrito.on('click', function (e){
  e.stopPropagation()
  $('#modalCarrito').removeClass('modal-active');
});




// revisar



selectPrecios.addEventListener('change', ()=>{
  ManagerDom.filtrarPorPrecio()
})


document.getElementById("acumuladorCarrito").innerHTML = acumuladorIndicadorCarrito;
document.getElementById("carrito").innerHTML = acumuladorItemsCarrito;
document.getElementById("total").innerHTML = acumuladorTotal;
// document.getElementById("cuotas").innerHTML = acumuladorCuotas;

