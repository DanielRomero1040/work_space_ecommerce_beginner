let productosEnPantalla = [];

class ManagerDom{
  static crearCard(objeto){    
    document.getElementById('productos').innerHTML = ``;
      objeto.forEach( element => {
          const div = document.createElement('div');
          div.classList.add('col-lg-3','col-md-4','mb-4')
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
        productosEnPantalla.push(element);
        console.log([productosEnPantalla])
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
    data.forEach(element => { myInner += ManagerDom.crearCard(element) });
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
    console.log(URLBUSCADOR)
    fetchProductos(URLBUSCADOR);      
  }

  static buscarPalabra(id, event, handler){
    document.getElementById(id).addEventListener(event, handler);
  }

  static filtrarPorPrecio() {
    let valorFiltroPrecios = selectPrecios.value;
  
    let arrayFiltrado = [];
    
    if (valorFiltroPrecios == 1) {
      arrayFiltrado = productosEnPantalla.filter( el => el.price <= 5000)
    } else if (valorFiltroPrecios == 2) {
      arrayFiltrado = productosEnPantalla.filter( el => el.price >= 5000)
    } else if (valorFiltroPrecios == 0) {
      arrayFiltrado = productosEnPantalla;
    }
    
    ManagerDom.crearCard(arrayFiltrado);
    
  }
}