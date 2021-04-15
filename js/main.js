let acumulador = ``;
let acumulador2 = ``;
let acumulador3 = ``;
let acumulador4 = ``;
let precios = [3000, 4500, 2000, 1500, 3230, 1800];
let nombres = ['Lentes', 'Zapatos', 'Botas', 'Remeras', 'Buzos', 'Medias'];
let descripcion = ['Protección UV', 'Zapatillas Puma Runner', 'Colección Invierno 2021', 'Todas las tallas', 'Gran variedad de diseños', 'Invisibles'];
let imagenes = ['lentes', 'zapatos', 'botas', 'remeras', 'buzos', 'medias'];
let banner = ['banner1','banner2','banner3'];
let categorias = ['Mujer','Hombre','Niños'];

for (let i = 0; i < precios.length; i++) {

  acumulador += `<div class="col-lg-4 col-md-6 mb-4">
    <div class="card h-100">
    <a href="#"><img height="250" width="400" class="card-img-top" src="imagenes/${imagenes[i]}.jpg" alt=""></a>
    <div class="card-body">
    <h4 class="card-title">
    <a href="#">${nombres[i]}</a>
    </h4>
    <h5> $${precios[i]}</h5>
    <p class="card-text">${descripcion[i]}.</p>
    </div>
    <div class="card-footer">
    <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
    </div>
    </div>
    </div>`;
}

for (let i = 0; i < categorias.length; i++) {
  acumulador2 += `<a href="#" class="list-group-item">${categorias[i]}</a>`
}

for (let i = 0; i < banner.length; i++) {
  if (i === 0 ){
    acumulador3 += `<li data-target="#carouselExampleIndicators" data-slide-to="${i}" class="active"></li>`;
    console.log(acumulador3);
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



document.getElementById("productos").innerHTML = acumulador;
document.getElementById("categorias").innerHTML = acumulador2;
document.getElementById("indicadores").innerHTML = acumulador3;
document.getElementById("carrusel").innerHTML = acumulador4;

