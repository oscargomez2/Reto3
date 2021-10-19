let urlConexion = "http://129.151.119.82:8080/api";
let moduloCategory = "/Category";
let moduloRoom = "/Room";
let moduloClient = "/Client";
let moduloMessage = "/Message";
let moduloReservation = "/Reservation";
let opcionGetAll = "/all";
let opcionSave = "/save";
let mail_format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Consultar datos de API
function consultarCategorias() {
    $.ajax({
        url: urlConexion + moduloCategory + opcionGetAll,
        type: 'GET',
        dataType: 'json',
        error: crearLista("Category", []),
        success: function (json) { crearLista("Category", json); }
    });
}

function consultarHabitaciones() {
    $.ajax({
        url: urlConexion + moduloRoom + opcionGetAll,
        type: 'GET',
        dataType: 'json',
        error: crearLista("Room", []),
        success: function (json) { crearLista("Room", json); }
    });
}

function consultarClientes() {
    $.ajax({
        url: urlConexion + moduloClient + opcionGetAll,
        type: 'GET',
        dataType: 'json',
        error: crearLista("Client", []),
        success: function (json) { crearLista("Client", json); }
    });
}

function consultarMensajes() {
    $.ajax({
        url: urlConexion + moduloMessage + opcionGetAll,
        type: 'GET',
        dataType: 'json',
        error: crearLista("Messages", []),
        success: function (json) { crearLista("Messages", json); }
    });
}

function consultarReservas() {
    $.ajax({
        url: urlConexion + moduloReservation + opcionGetAll,
        type: 'GET',
        dataType: 'json',
        error: crearLista("Reservation", []),
        success: function (json) { crearLista("Reservation", json); }
    });
}

function crearLista(panel, registros) {
    $("#pnlLista" + panel).empty();
    let tblRegistros = "<table id='tblRegistros' width='100%' border='1'>";
    if (typeof registros === 'undefined' || (typeof registros != 'undefined' && registros.length === 0)) {
        tblRegistros += "<tr>";
        tblRegistros += "<td colspan='5'><center><strong>No existen registros.</strong></center></td>";
        tblRegistros += "</tr>";
    } else {
        tblRegistros += crearHeaders(panel);
        tblRegistros += crearDatos(panel, registros);
    }
    tblRegistros += "</table>";
    $("#pnlLista" + panel).append(tblRegistros);
    $(':input').val('');
}

function crearHeaders(tabla) {
    let headers = "<tr>";
    if (tabla === "Category") {
        headers += "<td width='100%'><strong>Nombre</strong></td>";
        headers += "<td width='100%'><strong>Descripción</strong></td>";
    } else if (tabla === "Room") {
        headers += "<td width='20%'><strong>Nombre</strong></td>";
        headers += "<td width='20%'><strong>Hotel</strong></td>";
        headers += "<td width='20%'><strong>Estrellas</strong></td>";
        headers += "<td width='20%'><strong>Descripción</strong></td>";
        headers += "<td width='20%'><strong>Categoría</strong></td>";
    } else if (tabla === "Client") {
        headers += "<td width='25%'><strong>E-mail</strong></td>";
        headers += "<td width='25%'><strong>Contraseña</strong></td>";
        headers += "<td width='25%'><strong>Nombre</strong></td>";
        headers += "<td width='25%'><strong>Edad</strong></td>";
    } else if (tabla === "Messages") {
        headers += "<td width='34%'><strong>Mensaje</strong></td>";
        headers += "<td width='33%'><strong>Cliente</strong></td>";
        headers += "<td width='33%'><strong>Habitación</strong></td>";
    } else if (tabla === "Reservation") {
        headers += "<td width='25%'><strong>Fecha inicio</strong></td>";
        headers += "<td width='25%'><strong>Fecha devolución</strong></td>";
        headers += "<td width='25%'><strong>Cliente</strong></td>";
        headers += "<td width='25%'><strong>Habitación</strong></td>";
    }
    headers += "</tr>";
    return headers;
}

function crearDatos(tabla, datos) {
    let headers = "";
    if (tabla === "Category") {
        for (i = 0; i < datos.length; i++) {
            headers += "<tr>"
            headers += "<td>" + datos[i].name + "</td>";
            headers += "<td>" + datos[i].description + "</td>";
            headers += "</tr>";
        }
    } else if (tabla === "Room") {
        for (i = 0; i < datos.length; i++) {
            headers += "<tr>"
            headers += "<td>" + datos[i].name + "</td>";
            headers += "<td>" + datos[i].hotel + "</td>";
            headers += "<td>" + datos[i].stars + "</td>";
            headers += "<td>" + datos[i].description + "</td>";
            if (datos[i].category != null) {
                headers += "<td>" + datos[i].category.name + "</td>";
            } else {
                headers += "<td><em>Sin Definir</em></td>";
            }
            headers += "</tr>";
        }
    } else if (tabla === "Client") {
        for (i = 0; i < datos.length; i++) {
            headers += "<tr>"
            headers += "<td>" + datos[i].email + "</td>";
            headers += "<td>" + datos[i].password + "</td>";
            headers += "<td>" + datos[i].name + "</td>";
            headers += "<td>" + datos[i].age + "</td>";
            headers += "</tr>";
        }
    } else if (tabla === "Messages") {
        for (i = 0; i < datos.length; i++) {
            headers += "<tr>"
            headers += "<td>" + datos[i].messageText + "</td>";
            if (datos[i].client != null) {
                headers += "<td>" + datos[i].client.name + "</td>";
            } else {
                headers += "<td><em>Sin Definir</em></td>";
            }
            if (datos[i].room != null) {
                headers += "<td>" + datos[i].room.name + "</td>";
            } else {
                headers += "<td><em>Sin Definir</em></td>";
            }
            headers += "</tr>";
        }
    } else if (tabla === "Reservation") {
        for (i = 0; i < datos.length; i++) {
            headers += "<tr>"
            headers += "<td>" + datos[i].startDate + "</td>";
            headers += "<td>" + datos[i].devolutionDate + "</td>";
            if (datos[i].client != null) {
                headers += "<td>" + datos[i].client.name + "</td>";
            } else {
                headers += "<td><em>Sin Definir</em></td>";
            }
            if (datos[i].room != null) {
                headers += "<td>" + datos[i].room.name + "</td>";
            } else {
                headers += "<td><em>Sin Definir</em></td>";
            }
            headers += "</tr>";
        }
    }
    return headers;
}

// Consultar listas desplegables con datos de API
function consultarCategoriasLista() {
    $.ajax({
        url: urlConexion + moduloCategory + opcionGetAll,
        type: 'GET',
        dataType: 'json',
        error: crearLista2("Category", []),
        success: function (json) { crearLista2("Category", json); }
    });
}

function consultarClientesLista() {
    $.ajax({
        url: urlConexion + moduloClient + opcionGetAll,
        type: 'GET',
        dataType: 'json',
        error: crearLista2("Client", []),
        success: function (json) { crearLista2("Client", json); }
    });
}

function consultarHabitacionesLista() {
    $.ajax({
        url: urlConexion + moduloRoom + opcionGetAll,
        type: 'GET',
        dataType: 'json',
        error: crearLista2("Room", []),
        success: function (json) { crearLista2("Room", json); }
    });
}

function crearLista2(panel, registros) {
    $("#pnlSel" + panel).empty();
    let tblRegistros = "<select class='form-control rounded-0 border-top-0 border-right-0 border-left-0' id='sel" + panel + "' name='sel" + panel + "' >";
    tblRegistros += crearItemInicial(panel);
    if (typeof registros != 'undefined' && registros.length != 0) {
        tblRegistros += crearDatosLista(panel, registros);
    }
    tblRegistros += "</select>";
    $("#pnlSel" + panel).append(tblRegistros);
}

function crearItemInicial(tabla) {
    let headers = "";
    if (tabla === "Category") {
        headers += "<option value=''>Categoria...</option>";
    } else if (tabla === "Client") {
        headers += "<option value=''>Cliente...</option>";
    } else if (tabla === "Room") {
        headers += "<option value=''>Habitación...</option>";
    }
    return headers;
}

function crearDatosLista(tabla, datos) {
    let headers = "";
    if (tabla === "Category" || tabla === "Room") {
        for (i = 0; i < datos.length; i++) {
            headers += "<option value=" + datos[i].id + ">" + datos[i].name + "</option>";
        }
    } else if (tabla === "Client") {
        for (i = 0; i < datos.length; i++) {
            headers += "<option value=" + datos[i].idClient + ">" + datos[i].name + "</option>";
        }
    }
    return headers;
}

// Guardar datos en API
function agregarCategoria() {
    event.preventDefault();
    if ($("#txtName").val() === "") {
        alert('Ingrese el Nombre de la Categoría.');
        $("#txtName").focus();
    } else if ($("#txtDescription").val() === "") {
        alert('Ingrese la Descripción de la Categoría.');
        $("#txtDescription").focus();
    } else {
        registrarNuevo("Category");
    }
}

function agregarHabitacion() {
    event.preventDefault();
    if ($("#txtName").val() === "") {
        alert('Ingrese el Nombre de la Habitación.');
        $("#txtName").focus();
    } else if ($("#txtStars").val() === "") {
        alert('Ingrese las Estrellas de la Habitación.');
        $("#txtStars").focus();
    } else if ($("#selCategory").val() === "") {
        alert('Indique la categoría de la Habitación.');
        $("#selCategory").focus();
    } else if ($("#txtHotel").val() === "") {
        alert('Ingrese el Hotel de la Habitación.');
        $("#txtHotel").focus();
    } else if ($("#txtDescription").val() === "") {
        alert('Ingrese la Descripción de la Habitación.');
        $("#txtDescription").focus();
    } else {
        registrarNuevo("Room");
    }
}

function agregarCliente() {
    event.preventDefault();
    if ($("#txtName").val() === "") {
        alert('Ingrese el nombre del Cliente.');
        $("#txtName").focus();
    } else if ($("#txtEmail").val() === "") {
        alert('Ingrese el e-mail del Cliente.');
        $("#txtEmail").focus();
    } else if (!mail_format.test(($("#txtEmail").val()))) {
        alert('Ingrese un E-mail de Cliente válido');
        $("#txtEmail").focus();
    } else if ($("#txtPassword").val() === "") {
        alert('Ingrese la contrasña del Cliente.');
        $("#txtPassword").focus();
    } else if ($("#txtAge").val() === "") {
        alert('Ingrese la edad del Cliente.');
        $("#txtAge").focus();
    } else {
        registrarNuevo("Client");
    }
}

function agregarMensaje() {
    event.preventDefault();
    if ($("#txtMessageText").val() === "") {
        alert('Ingrese el texto del Mensaje.');
        $("#txtMessageText").focus();
    } else if ($("#selClient").val() === "") {
        alert('Indique el cliente del Mensaje.');
        $("#selClient").focus();
    } else if ($("#selRoom").val() === "") {
        alert('Indique la habitación del Mensaje.');
        $("#selRoom").focus();
    } else {
        registrarNuevo("Message");
    }
}

function agregarReserva() {
    event.preventDefault();
    if ($("#txtStartDate").val() === "") {
        alert('Ingrese la fecha de inicio de la Reserva.');
        $("#txtStartDate").focus();
    } else if ($("#txtDevolutionDate").val() === "") {
        alert('Ingrese la fecha de devolución de la Reserva.');
        $("#txtDevolutionDate").focus();
    } else if ($("#selClient").val() === "") {
        alert('Indique el cliente de la Reserva.');
        $("#selClient").focus();
    } else if ($("#selRoom").val() === "") {
        alert('Indique la habitación de la Reserva.');
        $("#selRoom").focus();
    } else {
        registrarNuevo("Reservation");
    }
}

function registrarNuevo(modulo) {
    event.preventDefault();
    if (modulo === "Category") {
        $.ajax({
            url: urlConexion + moduloCategory + opcionSave,
            data: JSON.stringify({
                "name": $("#txtName").val(),
                "description": $("#txtDescription").val()
            }),
            type: 'POST',
            contentType: 'application/json',
            dataType: 'text',
            error: function (result) { alert('Error: Ver log para detalles.'); console.log(result); },
            success: function () { alert('Categoría Agregada.'); consultarCategorias(); }
        });
    } else if (modulo === "Room") {
        $.ajax({
            url: urlConexion + moduloRoom + opcionSave,
            data: JSON.stringify({
                "name": $("#txtName").val(),
                "stars": $("#txtStars").val(),
                "category": { "id": $("#selCategory").val() },
                "hotel": $("#txtHotel").val(),
                "description": $("#txtDescription").val()
            }),
            type: 'POST',
            contentType: 'application/json',
            dataType: 'text',
            error: function (result) { alert('Error: Ver log para detalles.'); console.log(result); },
            success: function () { alert('Habitación Agregada.'); consultarHabitaciones(); }
        });
    } else if (modulo === "Client") {
        $.ajax({
            url: urlConexion + moduloClient + opcionSave,
            data: JSON.stringify({
                "name": $("#txtName").val(),
                "email": $("#txtEmail").val(),
                "password": $("#txtPassword").val(),
                "age": $("#txtAge").val()
            }),
            type: 'POST',
            contentType: 'application/json',
            dataType: 'text',
            error: function (result) { alert('Error: Ver log para detalles.'); console.log(result); },
            success: function () { alert('Cliente Agregado.'); consultarClientes(); }
        });
    } else if (modulo === "Message") {
        $.ajax({
            url: urlConexion + moduloMessage + opcionSave,
            data: JSON.stringify({
                "messageText": $("#txtMessageText").val(),
                "client": { "idClient": $("#selClient").val() },
                "room": { "id": $("#selRoom").val() }
            }),
            type: 'POST',
            contentType: 'application/json',
            dataType: 'text',
            error: function (result) { alert('Error: Ver log para detalles.'); console.log(result); },
            success: function () { alert('Mensaje Agregado.'); consultarMensaje(); }
        });
    } else if (modulo === "Reservation") {
        $.ajax({
            url: urlConexion + moduloReservation + opcionSave,
            data: JSON.stringify({
                "startDate": $("#txtStartDate").val(),
                "devolutionDate": $("#txtDevolutionDate").val(),
                "client": { "idClient": $("#selClient").val() },
                "room": { "id": $("#selRoom").val() }
            }),
            type: 'POST',
            contentType: 'application/json',
            dataType: 'text',
            error: function (result) { alert('Error: Ver log para detalles.'); console.log(result); },
            success: function () { alert('Reserva Agregada.'); consultarReservas(); }
        });
    }
}