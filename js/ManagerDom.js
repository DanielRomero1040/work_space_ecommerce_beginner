export default class ManagerDom{
    static crearCard(objeto){
        objeto.forEach( element => {
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
          console.log(JSON.stringify(element))
          document.getElementById('productos').appendChild(div);
          });
    }
}