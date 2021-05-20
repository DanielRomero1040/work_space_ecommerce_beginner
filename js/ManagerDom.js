export default class ManagerDom{
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
                    <button class=" col-6 btn btn-primary ml-1 mb-1" onClick='agregarAlCarrito("1")'>Add Cart</button>
                  </div>
                       
                </div>
              </div>
          `
          document.getElementById('productos').appendChild(div);
        });
    }

    static crearCategorias(categorias){
        categorias.forEach( (element) => {
          const a = document.createElement('a');
          a.classList.add('list-group-item');
          a.innerHTML = `<a id="${element.id}">${element.name}</a>`;  
          document.getElementById("categorias").appendChild(a);
        });
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


      static seleccionCategoria(id){
          let URLProductoFiltrado = 'https://api.mercadolibre.com/sites/MLA/search?category=' + id;
          return URLProductoFiltrado;
      }
}