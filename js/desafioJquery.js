// Desafio de jQuery - 12 y 13 - registro de usuarios

let desafioNombre = $('#desafioNombre');
let desafioApellido = $('#desafioApellido');
let desafioTelefono = $('#desafioTelefono');
let botonRegistro = $('#registro');
let botonCerrar = $('#cerrar');


$(document).ready(function (){
  $('#modal').addClass('modal-active');
  $('#historial-contenedor').append(`<p id="animacion" class=""></p>`);
  setInterval(function(){ $('#animacion').animate({left:'450px'}, 1000, function(){
    $(this).animate({left:'0px'}, 1000, function(){});
  }); }, 300);
  
  
});

$('#otroUsuario').on('click', function (){
  $('#modal').addClass('modal-active');
  $('#animacion').remove();
  $('#historial-contenedor').append(`<p id="animacion" class=""></p>`);
  setInterval(function(){ $('#animacion').animate({left:'450px'}, 1000, function(){
    $(this).animate({left:'0px'}, 1000, function(){});
  }); }, 300);
              
});
botonCerrar.on('click', function (){
  $('#modal').removeClass('modal-active');
});


botonRegistro.on('click', function(){
    if(desafioNombre.val().trim() != 0){
      if(desafioApellido.val().trim() != 0){
        if(desafioTelefono.val().trim() != 0){
          let dia =  new Date();
          console.log(`${desafioNombre.val()}${desafioApellido.val()}${desafioTelefono.val()}`)
          $('#modal').removeClass('modal-active');
          $('#registroDeUsuarios').append(`
          <li class="m-2" style="display: none">
          <p class="m-0 list-group-item"><span class="font-weight-bold">Nombre:</span> ${desafioNombre.val()} ${desafioApellido.val()}</p>   
          <p class="m-0 list-group-item"><span class="font-weight-bold">Telefono:</span> ${desafioTelefono.val()}</p>
          <p class="m-0 list-group-item"><span class="font-weight-bold">Fecha conexion:</span> ${dia.getDate()}/${dia.getMonth()+1}/${dia.getFullYear()} ${dia.getHours()}:${dia.getMinutes()}:${dia.getSeconds()} hs</p>
          </li>
          `);
        }

        $('li').slideDown(500);
      }
    }else{
      $('#alerta').remove();

      $('#historial-contenedor').append(`<p id="alerta" style="display: none" class="bg-danger">Llene todos los campos por favor</p>`);
      $('#alerta').slideDown(500);

    }
});
// fin de desafio jquery