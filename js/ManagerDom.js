let productosEnPantalla = [];
let estaFiltrado = ``;

class ManagerDom{
  static crearCard(objeto){
    productosEnPantalla = [];    
    document.getElementById('productos').innerHTML = ``;
      objeto.forEach( element => {
          const div = document.createElement('div');
          div.classList.add('col-lg-3','col-md-4','mb-4', 'tarjeta')
          div.innerHTML = `
            <div class="card h-90">
              <a href="#"><img height="200" width="410" class="card-img-top" src=${element.thumbnail} alt=""></a>
              <div class="card-body">
                <h4 class="card-title">
                <a href="#" class="titulo">${element.title}</a>
                </h4>
                <h5> $${element.price}</h5>
              </div>
              <div class="card-footer d-flex flex-column">
                <div clas="d-flex flex-row justify-content-center align-items-center">
                  <button class=" col-lg-6 btn btn-primary ml-1 mb-1" onClick='agregarAlCarrito(${JSON.stringify(element)})'>Add Cart</button>
                </div>
                     
              </div>
            </div>
        `
        if (estaFiltrado != `si`){
          productosEnPantalla.push(element);
          localStorage.setItem('productosEnPantalla', JSON.stringify(productosEnPantalla));
          console.log('no ha sido filtrado')
        }
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

  static actualizarCard(){
    let select  = document.getElementById('seccionProductos');
    let myInner = '';
    data.forEach(element => { myInner += this.crearCard(element) });
    select.innerHTML = myInner;
  }

  static filtrarCategoria(id, event, handler){
    document.getElementById(id).addEventListener(event, handler);
  }
  static seleccionCategoria(){
    let urlProductos = URLPRODUCTOS+ this.value;
    fetchProductos(urlProductos);
  }

  static traerBusqueda = () => {
    let palabra = document.getElementById('busqueda').value;
    const URLBUSCADOR = `https://api.mercadolibre.com/sites/MLA/search?q=${encodeURI(palabra)}`;
    fetchProductos(URLBUSCADOR);      
  }

  static buscarPalabra(id, event, handler){
    document.getElementById(id).addEventListener(event, handler);
  }

  static filtrarPorPrecio() {
    let cardsEnLocalStorage = JSON.parse(localStorage.getItem('productosEnPantalla'));
    let cardsEnPantalla = cardsEnLocalStorage;  
    let valorFiltroPrecios = selectPrecios.value;
    let arrayFiltrado = [];
    estaFiltrado = `si`;
  
    
    if (valorFiltroPrecios == 1) {
      arrayFiltrado = cardsEnPantalla.filter( el => el.price <= 5000)
    } else if (valorFiltroPrecios == 2) {
      arrayFiltrado = cardsEnPantalla.filter( el => el.price >= 5000)
    } else if (valorFiltroPrecios == 0) {
      arrayFiltrado = cardsEnPantalla;
    }
    this.crearCard(arrayFiltrado);
    
  }

  static filtrarPorPrecioDesdeHasta() {
    let cardsEnLocalStorage = JSON.parse(localStorage.getItem('productosEnPantalla'));
    let cardsEnPantalla = cardsEnLocalStorage;  
    let valorInicial = document.getElementById('inicial').value;
    let valorFinal = document.getElementById('final').value;  
    let arrayPreFiltrado = [];
    let arrayFiltrado = [];
    estaFiltrado = `si`;

    if ((valorInicial) && (valorFinal)){
      arrayPreFiltrado = cardsEnPantalla.filter( el => el.price <= valorFinal);
      arrayFiltrado = arrayPreFiltrado.filter( el => el.price >= valorInicial);
    } 
    else if((valorInicial != null) && (valorFinal)){
      valorInicial = 0;
      arrayPreFiltrado = cardsEnPantalla.filter( el => el.price <= valorFinal);
      arrayFiltrado = arrayPreFiltrado.filter( el => el.price >= valorInicial);
    } 
    else if((valorInicial) && (valorFinal != null)){
      valorFinal = 0;
      arrayFiltrado = cardsEnPantalla.filter( el => el.price >= valorInicial);
    }
    else if((valorInicial != null) && (valorFinal != null)){
      arrayFiltrado = cardsEnPantalla;
    }
    ManagerDom.crearCard(arrayFiltrado);       
    }
}