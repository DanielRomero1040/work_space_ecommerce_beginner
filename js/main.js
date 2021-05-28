let contenedorDeProductos = document.getElementById('productos'),  
    acumuladorIndicadorCarrito = 0,
    acumuladorItemsCarrito = ``,
    acumuladorTotal = 0,
    acumuladorCuotas = 0,
    cantidadDeCuotas,
    cuotaMensual,
    carritoEnLocalStorage = [],
    carrito = [],
    cargarPagina = document.body,
    botonOrdenar = document.getElementById('boton-ordenar'),
    modalCarrito = document.getElementsByClassName('modal-carrito')[0],
    contenedorModal = document.getElementById('modalCarrito'),
    botonCerrarCarrito = $('#cerrarCarrito'),
    selectPrecios = document.getElementById('precios'),    
    botonPagar = document.getElementById('boton-pagar');

// ---------------  Incorporacion al DOM ----------------------------

const URLCATEGORIAS = 'https://api.mercadolibre.com/sites/MLA/categories';
const URLPRODUCTOS = 'https://api.mercadolibre.com/sites/MLA/search?category=';

document.addEventListener('DOMContentLoaded', function(){
  fetch(URLCATEGORIAS)
    .then(respuesta => {
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
ManagerDom.crearBanner();

//--------------- Eventos ---------------------

cargarPagina.onload = iniciarCarrito;

botonOrdenar.onclick = ordenarCarrito;

//let btnModoOscuro = document.getElementById('modoOscuro');
//btnColor.onclick = bgChange;

document.getElementById('filtrar').addEventListener('click', ManagerDom.filtrarPorPrecioDesdeHasta)

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

//-------------------- Eventos - carrito modal ---------------

$('#changuito').on('click', function (){
  $('#modalCarrito').addClass('modal-active');
  actualizarCarrito();              
});
botonCerrarCarrito.on('click', function (e){
  e.stopPropagation()
  $('#modalCarrito').removeClass('modal-active');
});

// -------------------- Eventos - Filtro de productos por precios ---------------

selectPrecios.addEventListener('change', ()=>{
  ManagerDom.filtrarPorPrecio()
})

document.getElementById("acumuladorCarrito").innerHTML = acumuladorIndicadorCarrito;
document.getElementById("carrito").innerHTML = acumuladorItemsCarrito;
document.getElementById("total").innerHTML = acumuladorTotal;