export default function agregarAlCarrito(producto){  
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