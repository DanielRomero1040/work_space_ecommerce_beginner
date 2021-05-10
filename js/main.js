let contenedorCategorias = document.getElementById("categorias"),
    contenedorDeProductos = document.getElementById('productos'), 
    acumuladorBanners = ``,
    acumuladorCarruselItem = ``,
    acumuladorCarrito = 0,
    acumuladorResumen = ``,
    acumuladorTotal = 0,
    acumuladorCuotas = 0,
    cantidadDeCuotas,
    cuotaMensual;
    carritoEnLocalStorage = [],
    carrito = [],
    banner = ['banner1','banner2','banner3'],
    categorias = ['Mujer','Hombre','Niños'];


//    creacion de las cards

stockProductos.forEach( element => {
  const div = document.createElement('div');
  div.classList.add('col-lg-4','col-md-6','mb-4')
  div.innerHTML = `
    <div class="card h-100">
      <a href="#"><img height="250" width="400" class="card-img-top" src=${element.img} alt=""></a>
      <div class="card-body">
        <h4 class="card-title">
        <a href="#">${element.nombre}</a>
        </h4>
        <h5> $${element.precio}</h5>
        <p class="card-text">${element.desc}.</p>
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


//   Creacion de categorias y banners
categorias.forEach( (element) => {
  const a = document.createElement('a');
  a.classList.add('list-group-item');  
  //a.href.add('#')
  a.innerHTML = `<a>${element}</a>`;  
  contenedorCategorias.appendChild(a);
});

for (let i = 0; i < banner.length; i++) {
  if (i === 0 ){
    acumuladorBanners += `<li data-target="#carouselExampleIndicators" data-slide-to="${i}" class="active"></li>`;    
  }
    else{
    acumuladorBanners += `<li data-target="#carouselExampleIndicators" data-slide-to="${i}"></li>`;
    };
  
}

for (let i = 0; i < banner.length; i++) {
  if (i === 0 ){
    acumuladorCarruselItem += `<div class="carousel-item active">
    <img class="d-block img-fluid" height="250" src="imagenes/${banner[i]}.jpg" alt="${i} slide">
  </div>`;
  }
  else{
    acumuladorCarruselItem += `<div class="carousel-item">
    <img class="d-block img-fluid" height="250" src="imagenes/${banner[i]}.jpg" alt="${i} slide">
  </div>`;
  }
  
}


//  declaracion de funcionalidades

let agregarAlCarrito = (producto) => {

  let itemEnCarrito = carrito.find(el => el.id == producto.id);
    if (itemEnCarrito) {
      itemEnCarrito.cantidad += 1;    
    }else{
      producto.cantidad = 1;   
      carrito.push(producto);
    }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  console.log(carrito)  
  actualizarCarrito();
  indicadorCarrito();
}

let indicadorCarrito = () => {
  carritoEnLocalStorage = JSON.parse(localStorage.getItem('carrito'));
  acumuladorCarrito = carritoEnLocalStorage.reduce( (acum , el) => acum += el.cantidad, 0);
  localStorage.setItem('acumuladorCarrito', acumuladorCarrito)
  document.getElementById("acumuladorCarrito").innerHTML = acumuladorCarrito;  
  return acumuladorCarrito;
}

let actualizarCarrito = () => {  
  document.getElementById("carrito").innerHTML = ``;
  carritoEnLocalStorage = JSON.parse(localStorage.getItem('carrito'));
  carritoEnLocalStorage.forEach( (element) => { 
    const li = document.createElement('li')
    li.classList.add('list-group-item','text-right', 'mx-2')
    li.innerHTML = `
    ${element.cantidad} unidades x "${element.nombre}" - ${element.precio} $/unidad  <span>-    Subtotal = ${element.cantidad * element.precio} $ </span>
    <button class="btn btn-danger mx-5" style="margin-left:1rem" onClick='eliminarItem(${element.id})'>X</button>
    </li>`;
  document.getElementById("carrito").appendChild(li)
  });
  acumuladorTotal = carritoEnLocalStorage.reduce( (acumu , el) => acumu += el.precio * el.cantidad, 0);
  document.getElementById("total").innerHTML = acumuladorTotal;  
} 

let iniciarCarrito = () => {
  let rndCol = localStorage.getItem('colorDeFondo');
  carritoEnLocalStorage = JSON.parse(localStorage.getItem('carrito'));  
  if (carritoEnLocalStorage){
    let continuarCompra = prompt("Desea Continuar la Compra?");
    if (continuarCompra == "si"){        
      carritoEnLocalStorage.forEach(element => { acumuladorResumen +=`<li class="list-group-item text-right mx-2">
      ${element.cantidad} unidades x "${element.nombre}" - ${element.precio} $/unidad  <span>-    Subtotal = ${element.cantidad * element.precio} $ </span>
        <button class="btn btn-danger mx-5" style="margin-left:1rem" onClick='eliminarItem(${element.id})'>X</button>
        </li>`;      
      });
      acumuladorTotal = carritoEnLocalStorage.reduce( (acumu , el) => acumu += el.precio * el.cantidad, 0);
      carrito = carritoEnLocalStorage;
      acumuladorCarrito = parseInt(localStorage.acumuladorCarrito);        
      document.body.style.backgroundColor = rndCol;
      document.getElementById("carrito").innerHTML = acumuladorResumen;
      document.getElementById("total").innerHTML = acumuladorTotal;
      document.getElementById("acumuladorCarrito").innerHTML = acumuladorCarrito;
      }else{
        localStorage.removeItem('carrito');
        localStorage.removeItem('acumuladorCarrito');
        localStorage.removeItem('colorDeFondo');
        carritoEnLocalStorage = [];
      }
    }
}

let cargarPagina = document.body;
cargarPagina.onload = iniciarCarrito;
//iniciarCarrito()


let vaciarCarrito = () => {
  localStorage.removeItem('carrito');
  localStorage.removeItem('acumuladorCarrito');
  acumuladorResumen = ``;
  acumuladorCarrito = 0;
  acumuladorTotal = 0;
  acumuladorCuotas = ``;
  carritoEnLocalStorage = [];
  carrito = [];
  document.getElementById("carrito").innerHTML = acumuladorResumen;
  document.getElementById("acumuladorCarrito").innerHTML = acumuladorCarrito;
  document.getElementById("total").innerHTML = acumuladorTotal;
  document.getElementById("cuotas").innerHTML = acumuladorCuotas; 
}

let eliminarItem = (id) => {
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

let botonCuotas = document.getElementById('boton-financiar');
botonCuotas.onclick = cuotas;

let ordenarCarrito = () => {  
  acumuladorResumen = ``;
  carritoEnLocalStorage.sort( (a , b) => a.precio - b.precio);
  carritoEnLocalStorage.forEach(element => { acumuladorResumen +=`<li class="list-group-item text-right mx-2">
    ${element.cantidad} unidades x "${element.nombre}" - ${element.precio} $/unidad  <span>-    Subtotal = ${element.cantidad * element.precio} $ </span>
    <button class="btn btn-danger mx-5" style="margin-left:1rem" onClick="vaciarCarrito()">X</button>
    </li>`;      
    });
  document.getElementById("carrito").innerHTML = acumuladorResumen;
};

let ingresarNombre = () => {
  nombre = document.getElementById("input").value
  elementoNombre = `<p class="bg-success p-2 m-2 text-white rounded-lg shadow" > Bienvenido/a ${nombre} a tu tienda online! los mejores precios solo para vos! </p>`;
  document.getElementById("nombre").innerHTML = elementoNombre;
  prueba = document.getElementById("nombre");
  prueba.onchange = () => {console.log(prueba.value)}
}

let eventos = document.getElementById("nombre");
let usuario = document.getElementById('usuario');
usuario.addEventListener('click', ingresarNombre)
eventos.onclick = () => console.log("hiciste click");
eventos.onmousemove = () => console.log("te estas moviendo");

function random(number) {
  return Math.floor(Math.random() * (number+1));
}

function bgChange() {
  let rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  console.log(rndCol)
  localStorage.setItem('colorDeFondo', rndCol);
  document.body.style.backgroundColor = rndCol;
}

let btnColor = document.getElementById('color');
btnColor.onclick = bgChange;


document.getElementById("indicadores").innerHTML = acumuladorBanners;
document.getElementById("carrusel").innerHTML = acumuladorCarruselItem;
document.getElementById("acumuladorCarrito").innerHTML = acumuladorCarrito;
document.getElementById("carrito").innerHTML = acumuladorResumen;
document.getElementById("total").innerHTML = acumuladorTotal;
document.getElementById("cuotas").innerHTML = acumuladorCuotas;





