let acumulador = ``;
let acumulador2 = ``;
let acumulador3 = ``;
let acumulador4 = ``;
let acumuladorCarrito = 0;
let acumuladorResumen = ``;
let cantidad;
let nroItemsEnCarrito = 0;
let acumuladorTotal = 0;
let cantidadDeCuotas;
let cuotaMensual;
let banner = ['banner1','banner2','banner3'];
let categorias = ['Mujer','Hombre','Niños'];


//    Productos

class Producto{
  constructor(nombre, precio, imagen, descripcion){
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
    this.descripcion = descripcion;    
  }

  verCuotas () {
    let cuotas = parseInt(prompt("Ingrese la cantidad de cuotas a simular"));
    alert(`El producto ${this.nombre} te saldrá en ${this.precio / cuotas}$ mensuales, durante ${cuotas} meses.`)
  };
}


const Lentes = new Producto("Lentes", 3000, "lentes","Protección UV");
const Zapatos = new Producto("Zapatos", 4500, "zapatos","Zapatillas Puma Runner");
const Botas = new Producto("Botas", 2000, "botas","Colección Invierno 2021");
const Remeras = new Producto("Remeras", 1500, "remeras","Todas las tallas");
const Buzos = new Producto("Buzos", 3230, "buzos","Gran variedad de diseños");
const Medias = new Producto("Medias", 1800, "medias","Invisibles");

let productos = [Lentes, Zapatos, Botas, Remeras, Buzos, Medias];


//    creacion de las cards

for (let i = 0; i < productos.length; i++) {

  acumulador += `<div class="col-lg-4 col-md-6 mb-4">
    <div class="card h-100">
      <a href="#"><img height="250" width="400" class="card-img-top" src="imagenes/${productos[i].imagen}.jpg" alt=""></a>
      <div class="card-body">
        <h4 class="card-title">
        <a href="#">${productos[i].nombre}</a>
        </h4>
        <h5> $${productos[i].precio}</h5>
        <p class="card-text">${productos[i].descripcion}.</p>
      </div>
      <div class="card-footer d-flex flex-column">
        <div clas="d-flex flex-row justify-content-center align-items-center">
          <small class="text-muted col-1">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
          <button class=" col-6 btn btn-primary ml-1 mb-1" onClick="agregarAlCarrito(${productos[i].nombre})">Add Cart</button>
        </div>
          <button class="btn btn-success ml-1" onClick="${productos[i].nombre}.verCuotas()">Simular Cuotas</button>
        </div>
    </div>
  </div>`;

  // acá como parametro de la funcion agregarAlCarrito quería colocar el objeto para que me llevara todas las propiedades
  // a las funciones, pero no pude.
}

//   Creacion de categorias y banners
for (let i = 0; i < categorias.length; i++) {
  acumulador2 += `<a href="#" class="list-group-item">${categorias[i]}</a>`
}

for (let i = 0; i < banner.length; i++) {
  if (i === 0 ){
    acumulador3 += `<li data-target="#carouselExampleIndicators" data-slide-to="${i}" class="active"></li>`;    
  }
    else{
    acumulador3 += `<li data-target="#carouselExampleIndicators" data-slide-to="${i}"></li>`;
    };
  
}

for (let i = 0; i < banner.length; i++) {
  if (i === 0 ){
    acumulador4 += `<div class="carousel-item active">
    <img class="d-block img-fluid" height="250" src="imagenes/${banner[i]}.jpg" alt="${i} slide">
  </div>`;
  }
  else{
    acumulador4 += `<div class="carousel-item">
    <img class="d-block img-fluid" height="250" src="imagenes/${banner[i]}.jpg" alt="${i} slide">
  </div>`;
  }
  
}


//  declaracion de funcionalidades


let agregarAlCarrito = (producto) => {
  nroItemsEnCarrito += 1;
  cantidad = parseInt(prompt(`Ingrese cantidad de ${producto.nombre} que está comprando`));
  indicadorCarrito(cantidad);  
  resumenDeCompra(cantidad, producto);
  calculoSubTotal(cantidad, producto.precio);  
  alert(`Va a comprar la cantidad de ${cantidad} unidades de ${producto.nombre} con precio ${producto.precio} $, el Subtotal a pagar sería ${subTotal} $.`);
}

let indicadorCarrito = (cantidad) => {
  acumuladorCarrito = acumuladorCarrito + cantidad;
  document.getElementById("acumuladorCarrito").innerHTML = acumuladorCarrito;  
  return acumuladorCarrito;
}

let calculoSubTotal = (cantidad, precio) => {
  return subTotal = cantidad * precio;
}

let resumenDeCompra = (cantidad,producto) => {  
  // Notas para Tutor: acá tenía pensado trabajar con un for, trayendo un objeto en cada vuelta y usar sus propiedades,
  // pero no pude hacerlo, no me permite traer un objeto a esta función, trate de varias formas e investigué pero 
  // no hallé algo distinto a JSON, mientras investigaba creo haber entendido que con JSON podemos hacer algo así.

  acumuladorResumen += `<li class="list-group-item text-right mx-2">
  ${cantidad} unidades x "${producto.nombre}" - ${producto.precio} $/unidad  <span>-    Subtotal = ${cantidad * producto.precio} $ </span>
  <button class="btn btn-danger mx-5" style="margin-left:1rem" onClick="vaciarCarrito()">X</button>
  </li>`;

  acumuladorTotal += cantidad * producto.precio;
  document.getElementById("total").innerHTML = acumuladorTotal;
  document.getElementById("carrito").innerHTML = acumuladorResumen;  
  return acumuladorResumen;  
} 

let vaciarCarrito = () => {
  acumuladorResumen = ``;
  acumuladorCarrito = 0;
  acumuladorTotal = 0;
  acumuladorCuotas = ``;
  document.getElementById("carrito").innerHTML = acumuladorResumen;
  document.getElementById("acumuladorCarrito").innerHTML = acumuladorCarrito;
  document.getElementById("total").innerHTML = acumuladorTotal;
  document.getElementById("cuotas").innerHTML = acumuladorCuotas;
  return acumuladorResumen;
}

let cuotas = (acumuladorTotal) => {
  cantidadDeCuotas = prompt("En cuantas cuotas quieres pagar tu compra");
  cuotaMensual = acumuladorTotal / cantidadDeCuotas;
  acumuladorCuotas = `Pagarás ${cuotaMensual}$ mensuales, durante ${cantidadDeCuotas} meses, Sin Intereses!! `
  document.getElementById("cuotas").innerHTML = acumuladorCuotas;
}



document.getElementById("productos").innerHTML = acumulador;
document.getElementById("categorias").innerHTML = acumulador2;
document.getElementById("indicadores").innerHTML = acumulador3;
document.getElementById("carrusel").innerHTML = acumulador4;
document.getElementById("acumuladorCarrito").innerHTML = acumuladorCarrito;
document.getElementById("carrito").innerHTML = acumuladorResumen;
document.getElementById("total").innerHTML = acumuladorTotal;
document.getElementById("cuotas").innerHTML = acumuladorCuotas;





