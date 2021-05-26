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
    li.classList.add('list-group-item','text-right', 'mx-2', 'd-flex', 'flex-row', 'justify-content-between')
    li.innerHTML = `
    <img src="${element.thumbnail}" alt="" height="50px" width="50px" class="mr-3">
    <div class="text-right">
      <span>${element.cantidad} unds x "${element.title}" - ${element.price} $/unidad  <span>-    Subtotal = ${element.cantidad * element.price} $ </span></span>
      <button id="eliminarItem" class="btn btn-danger" style="margin-left:0" onClick='eliminarItem("${element.id}")'>X</button>
    <div>
    `;
  document.getElementById("carrito").appendChild(li)
  });
  acumuladorTotal = carritoEnLocalStorage.reduce( (acumu , el) => acumu += el.price * el.cantidad, 0);
  document.getElementById("total").innerHTML = acumuladorTotal;  
};

let iniciarCarrito = () => {
  //let rndCol = localStorage.getItem('colorDeFondo');
  carritoEnLocalStorage = JSON.parse(localStorage.getItem('carrito'));
  carrito = carritoEnLocalStorage;  
  if (carritoEnLocalStorage){           
    actualizarCarrito();
    //document.body.style.backgroundColor = rndCol;
    indicadorCarrito();
  }else{
    localStorage.removeItem('carrito');
    localStorage.removeItem('acumuladorIndicadorCarrito');
    //localStorage.removeItem('colorDeFondo');
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
  carritoEnLocalStorage = [];
  carrito = [];
  document.getElementById("carrito").innerHTML = acumuladorItemsCarrito;
  document.getElementById("acumuladorCarrito").innerHTML = acumuladorIndicadorCarrito;
  document.getElementById("total").innerHTML = acumuladorTotal;
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

let ordenarCarrito = () => {  
  acumuladorItemsCarrito = ``;
  carritoEnLocalStorage.sort( (a , b) => a.price - b.price);  
  carritoEnLocalStorage.forEach(element => { acumuladorItemsCarrito +=`
    <li class="list-group-item text-right mx-2 d-flex flex-row justify-content-between">
      <img src="${element.thumbnail}" alt="" height="50px" width="50px" class="mr-3">
      <div class="text-right">
        <span>${element.cantidad} unds x "${element.title}" - ${element.price} $/unidad  <span>-    Subtotal = ${element.cantidad * element.price} $ </span></span>
        <button id="eliminarItem" class="btn btn-danger" style="margin-left:0" onClick='eliminarItem("${element.id}")'>X</button>
      <div>
    </li>`;      
    });
  document.getElementById("carrito").innerHTML = acumuladorItemsCarrito;
};

function fetchProductos(url){
  animacionCarga();
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

let animacionCarga = () => {
  contenedorDeProductos.innerHTML=``;
  const div = document.createElement('div');
          div.classList.add('cont-animacion')
          div.innerHTML = `
          <div class="animacionCarga">
          </div> `
  contenedorDeProductos.appendChild(div);
};

// function random(number) {
//   return Math.floor(Math.random() * (number+1));
// };

// function bgChange() {
//   let fondoOscuro = 'rgb(' 39, 39, 43')';
//   console.log(rndCol)
//   localStorage.setItem('colorDeFondo', rndCol);
//   document.body.style.backgroundColor = rndCol;
// };

// ----------- API MERCADO PAGO --------------

const finalizarCompra = async () => {

  const carritoAPagar = carrito.map(el => ({
          title: el.title,
          description: "",
          picture_url: "",
          category_id: el.id,
          quantity: el.cantidad,
          currency_id: "ARS",
          unit_price: el.price
  }))

  const respuesta = await fetch('https://api.mercadopago.com/checkout/preferences', 
  {
      method: "POST",
      headers: {
          Authorization: "Bearer TEST-6721602929842329-052319-8c08a42d2f2ec374d6fa4d3724067fa0-444025539"
      },
      body: JSON.stringify({
          items: carritoAPagar
      })
  })

  const data = await respuesta.json()

  window.open(data.init_point, "_blank")
}