var dbperros = localStorage.getItem("dbperros");
var operacion = "A";
dbperros = JSON.parse(dbperros);
if (dbperros === null)
  dbperros = [];

function Mensaje(t) {
  switch (t) {
    case 1:
      $(".mensaje-alerta").append(
        "<div class='alert alert-success' role='alert'>Se agrego con exito la vaca</div>"
      );
      break;
    case 2:
      $(".mensaje-alerta").append(
        "<div class='alert alert-danger' role='alert'>Se elimino la vaca</div>"
      );
      break;
    default:
  }
}

function Agregarperro() {
  var datos_cliente = JSON.stringify({
    Nombre: $("#nombre").val(),
    Correo: $("#correo").val(),
    Peso: $("#peso").val(),
    Fecha_nacimiento: $("#fecha_nacimiento").val(),
    Raza: $("#raza").val(),
    Numero_arete: $("#numero_arete").val(),
    // Campos Modificados:
    Litros_leche_mes: $("#litros_leche_mes").val(),         // Campo para la producción de leche de la vaca en litros al mes
    Precio: $("#precio").val()          // Campo para el precio de la vaca
  });

  dbperros.push(datos_cliente);
  localStorage.setItem("dbperros", JSON.stringify(dbperros));
  Listarperros();
  return Mensaje(1);
}

function Listarperros() {
  $("#dbperros-list").html(
    "<thead>" +
      "<tr>" +
        "<th> ID </th>" +
        "<th> Nombre </th>" +
        "<th> Correo </th>" +
        "<th> Peso </th>" +
        "<th> fecha_nacimiento </th>" +
        "<th> Raza </th>" +
        "<th> Número de Arete </th>" +
        "<th> Litros de Leche al Mes </th>" +       // Nueva columna para Producción de Leche
        "<th> Precio </th>" +      // Nueva columna para Precio
        "<th> </th>" +
        "<th> </th>" +
      "</tr>" +
    "</thead>" +
    "<tbody>" +
    "</tbody>"
  );

  for (var i in dbperros) {
    var d = JSON.parse(dbperros[i]);
    $("#dbperros-list").append(
      "<tr>" +
        "<td>" + i + "</td>" +
        "<td>" + d.Nombre + "</td>" +
        "<td>" + d.Correo + "</td>" +
        "<td>" + d.Peso + "</td>" +
        "<td>" + d.Fecha_nacimiento + "</td>" +
        "<td>" + d.Raza + "</td>" +
        "<td>" + d.Numero_arete + "</td>" +
        "<td>" + d.Litros_leche_mes + "</td>" +     // Se muestra la producción de leche
        "<td>" + d.Precio + "</td>" +    // Se muestra el precio
        "<td> <a id='"+ i +"' class='btnEditar' href='#'> <span class='glyphicon glyphicon-pencil'> </span>  </a> </td>" +
        "<td> <a id='" + i + "' class='btnEliminar' href='#'> <span class='glyphicon glyphicon-trash'> </span> </a> </td>" +
      "</tr>"
    );
  }
}

if (dbperros.length !== 0) {
  Listarperros();
} else {
  $("#dbperros-list").append("<h2> No tienes perros </h2>");
}

function contarperros() {
  var perros = dbperros;
  nperros = perros.length;
  $("#numeroperros").append(
    "<a>Tienes actualmente<br><span class='badge'>" + nperros + "</span></a> perros"
  );
  return nperros;
}

function Eliminar(e) {
  dbperros.splice(e, 1);
  localStorage.setItem("dbperros", JSON.stringify(dbperros));
  return Mensaje(2);
}

function Editar() {
  dbperros[indice_selecionado] = JSON.stringify({
    Nombre: $("#nombre").val(),
    Correo: $("#correo").val(),
    Peso: $("#peso").val(),
    Fecha_nacimiento: $("#fecha_nacimiento").val(),
    Raza: $("#raza").val(),
    Numero_arete: $("#numero_arete").val(),
    Litros_leche_mes: $("#litros_leche_mes").val(),    // Se guarda la producción de leche editada
    Precio: $("#precio").val()     // Se guarda el precio editado
  });
  localStorage.setItem("dbperros", JSON.stringify(dbperros));
  operacion = "A";
  return true;
}

$(".btnEliminar").bind("click", function() {
  alert("¿ Me quieres eliminar ?");
  indice_selecionado = $(this).attr("id");
  Eliminar(indice_selecionado);
  Listarperros();
});

$(".btnEditar").bind("click", function() {
  alert("¿ Me quieres editar ?");
  $(".modo").html("<span class='glyphicon glyphicon-pencil'> </span> Modo edición");
  operacion = "E";
  indice_selecionado = $(this).attr("id");

  var perroItem = JSON.parse(dbperros[indice_selecionado]);
  $("#nombre").val(perroItem.Nombre);
  $("#correo").val(perroItem.Correo);
  $("#peso").val(perroItem.Peso);
  $("#fecha_nacimiento").val(perroItem.Fecha_nacimiento);
  $("#raza").val(perroItem.Raza);
  $("#numero_arete").val(perroItem.Numero_arete);
  $("#litros_leche_mes").val(perroItem.Litros_leche_mes);    // Se carga la producción de leche en el formulario
  $("#precio").val(perroItem.Precio);   // Se carga el precio en el formulario
  $("#nombre").focus();
});

contarperros();

$("#perros-form").bind("submit", function() {
  if (operacion == "A")
    return AgregarVaca();
  else {
    return Editar();
  }
});
