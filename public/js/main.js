$(document).ready(function() {

	load();//inicar la tabla

	//simulacion de envio de formulario
	$('.add').click(function() {
		//document.forms["formProd"].submit();
		//add();
		//$('btnAdd').click();
		document.getElementById("btnAdd").click();
	});

	//agregar un regsitro de produccion
	$('#formProd').submit(function(event) {
		event.preventDefault();
		if (!validateProdInput()){
			add();
		}
	});

	//agregar un registro de taller
	$('.btnGuardarTaller').click(function() {
		//alert('clic guardar taller');
		if(!validateTallerInput()){
			addTaller();
			$('#modalTaller').modal('hide');
			cleanTaller();
		}
	});

	//editar un registro de produccion
	$('.btnEdit').click(function(event) {
		if(!validateProdEdit()){
			saveEdit();
			$('#modalEdit').modal('hide');
		}
	});

	//limpiar formulario de produccion al cerrar
	$('.btn-prod-close').click(function (){
		cleanProdEdit();
	});

	//limpiar formulario de produccion al cerrar
	$('.btn-taller-close').click(function (){
		cleanTaller();	
	});

	//guardar cambio en un registro editato taller
	$('.btnGuardarTallerEdit').click(function(event) {
		if(!validateTallerEdit()){
			saveEditTaller();
			$('#modalTallerEdit').modal('hide');
			cleanTaller();
		}
	});

	$('#calendaro').datepicker({
		dateFormat:'yy-mm-dd',
		defaultDate: Date.now()
	});

	$('#ddlHorasP').change(function(event) {
		idHora = $(this).val();
		load();
		$('#ddlHoras').val(idHora);
	});

	$('#ddlProcesos').change(function(event) {
		var idProceso = $(this).val();
		var idProduccion = $('#ddlProduccion').val();
		getEsperadoProceso(idProduccion,idProceso);
	});	
	$('#ddlProduccion').change(function(){
		var idProceso = $('#ddlProcesos').val();
		var idProduccion = $(this).val();
		getEsperadoProceso(idProduccion,idProceso);
	});

	$('.btnTaller').click(function(event) {
		$('#ddlHorasTaller').val($('#ddlHorasP').val());
		$('#modalTaller').modal('show');
	});
});


function validateProdInput(){
 	
 	var error = false;	
	var invalid = false;
	
	
	invalid = validateField(
		'ddlEmpleados',
		[fieldCondition("required",true,"Debe seleccionar un empleado")]
		);
	
	if(invalid && !error){error=true;}
	
	invalid = validateField(
		'ddlProcesos',
		[fieldCondition("required",true,"* Debe seleccionar un proceso")]
	);
	
	if(invalid && !error){error=true;}
	
	invalid = validateField(
		'txtTiempo',
		[
			fieldCondition("required",true,"* Campo requerido"),
			fieldCondition("numeric", 1,"El valor debe ser un número"),
			fieldCondition("min", 1,"El tiempo debe ser mayor que 0 min"),
			fieldCondition("max", 60,"El tiempo no puede ser superior a 60 min")
		]
	);
	if(invalid && !error){error=true;}
	
	invalid = validateField(
		'txtCantidad',
		[
			fieldCondition("required",true,"* Campo requerido"),
			fieldCondition("numeric", 1,"El valor debe ser un número"),
			fieldCondition("min", 0,"la cantidad no puede ser inferio a 0"),
		]
	);
	if(invalid && !error){error=true;}

	return error;
}

function validateProdEdit(){
 	
 	var error = false;	
	var invalid = false;
	
	
	invalid = validateField(
		'ddlEmpleadosEdit',
		[fieldCondition("required",true,"Debe seleccionar un empleado")]
		);
	
	if(invalid && !error){error=true;}
	
	invalid = validateField(
		'ddlProcesosEdit',
		[fieldCondition("required",true,"* Debe seleccionar un proceso")]
	);
	
	if(invalid && !error){error=true;}
	
	invalid = validateField(
		'txtTiempoEdit',
		[
			fieldCondition("required",true,"* Campo requerido"),
			fieldCondition("numeric", 1,"El valor debe ser un número"),
			fieldCondition("min", 1,"El tiempo debe ser mayor que 0 min"),
			fieldCondition("max", 60,"El tiempo no puede ser superior a 60 min")
		]
	);
	if(invalid && !error){error=true;}
	
	invalid = validateField(
		'txtCantidadEdit',
		[
			fieldCondition("required",true,"* Campo requerido"),
			fieldCondition("numeric", 1,"El valor debe ser un número"),
			fieldCondition("min", 0,"la cantidad no puede ser inferio a 0"),
		]
	);
	if(invalid && !error){error=true;}

	return error;
}

function validateTallerInput(){
 	
 	var error = false;	
	var invalid = false;
	
	
	invalid = validateField(
		'ddlEmpleadosTaller',
		[fieldCondition("required",true,"Debe seleccionar un empleado")]
		);
	
	if(invalid && !error){error=true;}
	
	invalid = validateField(
		'txtProcesoTaller',
		[fieldCondition("required",true,"* Debe indicar al menos un proceso")]
	);
	
	if(invalid && !error){error=true;}
	
	invalid = validateField(
		'txtTiempoTaller',
		[
			fieldCondition("required",true,"* Campo requerido"),
			fieldCondition("numeric", 1,"El valor debe ser un número"),
			fieldCondition("min", 1,"El tiempo debe ser mayor que 0 min"),
			fieldCondition("max", 60,"El tiempo no puede ser superior a 60 min")
		]
	);
	if(invalid && !error){error=true;}
	
	invalid = validateField(
		'txtCantidadTaller',
		[
			fieldCondition("required",true,"* Campo requerido"),
			fieldCondition("numeric", 1,"El valor debe ser un número"),
			fieldCondition("min", 0,"la cantidad no puede ser inferio a 0"),
		]
	);
	if(invalid && !error){error=true;}

	return error;
}

function validateTallerEdit(){
 	
 	var error = false;	
	var invalid = false;
	
	
	invalid = validateField(
		'ddlEmpleadosTallerEdit',
		[fieldCondition("required",true,"Debe seleccionar un empleado")]
		);
	
	if(invalid && !error){error=true;}
	
	invalid = validateField(
		'txtProcesoTallerEdit',
		[fieldCondition("required",true,"* Debe indicar al menos un proceso")]
	);
	
	if(invalid && !error){error=true;}
	
	invalid = validateField(
		'txtTiempoTallerEdit',
		[
			fieldCondition("required",true,"* Campo requerido"),
			fieldCondition("numeric", 1,"El valor debe ser un número"),
			fieldCondition("min", 1,"El tiempo debe ser mayor que 0 min"),
			fieldCondition("max", 60,"El tiempo no puede ser superior a 60 min")
		]
	);
	if(invalid && !error){error=true;}
	
	invalid = validateField(
		'txtCantidadTallerEdit',
		[
			fieldCondition("required",true,"* Campo requerido"),
			fieldCondition("numeric", 1,"El valor debe ser un número"),
			fieldCondition("min", 0,"la cantidad no puede ser inferio a 0"),
		]
	);
	if(invalid && !error){error=true;}

	return error;
}

/**
* metodo para cargar la tabla de registros
*/
function load()
{
	idHora = $('#ddlHorasP').val();

	$.ajax({
		async: true,
		url: 'prod/listbyhour/'+idHora,
		type: 'GET',
		dataType: 'json',
	})
	.done(function(data) {
		makeTable(data);
		cleanProdInput();
	});
	
}

/**
* metodo la construccion de la tabla de registros
* @param object  data
* @return void
*/

function makeTable(data)
{
	clearTable();
	
	$('#tbldata tbody').append('<tr><td>Fecha</td><td>Hora</td><td>Empleado</td><td>Producción</td><td>Proceso</td><td>Tiempo</td><td>Cantidad</td><td>Acción</td></tr>');
	for (i in data){

		row ='<tr><td>'+data[i].dtmfecha_dat+'</td><td>'
			+data[i].id_hora_dat+'</td><td>'
			+data[i].id_emp_dat+'</td><td>'
			+data[i].id_prod_dat+'</td><td>'
			+data[i].id_proc_dat+'</td><td>'
			+data[i].inttiempo_dat+'</td><td>'
			+data[i].intcantidad_dat+'</td>';
		if(data[i].ident==1){
			row+='<td><div class="action">'
					+'<a href="" id='+data[i].id_dat+' class="edit"><img src="images/edit-icon.png" class="icon"></a>'
					+'<a href="" id="'+data[i].id_dat+'" class="delete"><img src="images/delete-icon.png" class="icon"></a>'
					+'</div></td></tr>';
		}else
		{
			row+='<td><a href="" id='+data[i].id_dat+' class="editTaller"><img src="images/edit-icon.png" class="icon"></a>'
			+'<a href="" id="'+data[i].id_dat+'" class="deleteTaller"><img src="images/delete-icon.png" class="icon"></a></td></tr>';
		}
		$('#tbldata').append(row);
	}

	$('.edit').click(function(event) {
		event.preventDefault();
		$('#modalEdit').modal('show');
		id= $(this).attr('id');
		loadDataEdit(id);
	});

	$('.delete').click(function(event) {
		event.preventDefault();
		id= $(this).attr('id');

		alertify.confirm('¿Seguro desea borrar este registro?', function (e) {
    if (e) {
        deleteReg(id);
    	}
		});
	});

	$('.editTaller').click(function(event) {
		event.preventDefault();
		$('#modalTallerEdit').modal('show');
		id= $(this).attr('id');
		loadDataEditTaller(id);
	});
	$('.deleteTaller').click(function(event) {
		event.preventDefault();
		id= $(this).attr('id');
		alertify.confirm('¿Seguro desea borrar este registro?', function (e) {
    if (e) {
        deleteReg(id);
    	}
		});
	});
}

/**
* metodo para borrar todo el contenido de la tabla de registros
* @return void
*/
function clearTable()
{
	$('#tbldata tbody').empty();	
}

/**
* Consulta ajax para ingreso de un registro de produccion
* @return void
*/

function add()
{

	fecha = $('#lblFecha').html();
	hora = $('#ddlHoras').val();
	empleado = $('#ddlEmpleados').val();
	produccion = $('#ddlProduccion').val();
	proceso = $('#ddlProcesos').val();
	tiempo = $('#txtTiempo').val();
	cantidad =$('#txtCantidad').val();

	$.ajax({
		url: 'prod/insert',
		type: 'POST',
		dataType: 'json',
		data: {fecha: fecha, hora: hora, empleado: empleado, produccion: produccion, proceso: proceso, tiempo: tiempo, cantidad: cantidad},
	})
	.done(function(data) {
		if(!data.success)
		{
			alertify.alert(data.error.mensaje+'<br>'+'El número total de minutos seria de '+data.error.total);
		}
		load();
	})
	.fail(function() {
		alert('Ocurrio un error al transmitir los datos, verifique la conexión');
	});
	
}

/**
* funcion ajax para recuperar el contenido de un registro a ser editado
* @param int id
* @retrun void
*/
function loadDataEdit(id)
{
	$.ajax({
	url: 'prod/loadreg',
	type: 'POST',
	dataType: 'json',
	data: {id: id},
	})
	.done(function(data) {

		$('#lblFechaEdit').html(data.data.fecha);
		$('#ddlHorasEdit').val(data.data.hora);
		$('#ddlEmpleadosEdit').val(data.data.empleado);
		$('#ddlProduccionEdit').val(data.data.produccion);
		$('#ddlProcesosEdit').val(data.data.proceso);
		$('#txtTiempoEdit').val(data.data.tiempo);
		$('#txtCantidadEdit').val(data.data.cantidad);
		//$('input[type=hidden]').val(id);
		$('#txtId').val(id);		
	})
	.fail(function() {
		alert('Ocurrio un error al intentrar traer los datos a modificar, verifique la conexión');
	});

}
/**
* consulta ajax para guardar un registro editado
* @return void
*/
function saveEdit()
{
	$.ajax({
		url: 'prod/update',
		type: 'POST',
		data: {
			fecha: $("#lblFechaEdit").html(), 
			hora: $('#ddlHorasEdit').val(), 
			empleado: $('#ddlEmpleadosEdit').val(), 
			produccion: $('#ddlProduccionEdit').val(), 
			proceso: $('#ddlProcesosEdit').val(), 
			tiempo: $('#txtTiempoEdit').val(), 
			cantidad: $('#txtCantidadEdit').val(),
			id: $('#modalEdit input[type=hidden]').val()
		},
	})
	.done(function(data) {
		if(!data.success)
		{
			alertify.alert(data.error.mensaje+'<br>'+'El número total de minutos seria de '+data.error.total);
		}
		load();
	})
	.fail(function() {
		//console.log("error");
		alert('Ocurrio un error al transmitir los datos, verifique la conexión')
	});	
}


/**
* funcion para borrar un registo de producción
* @param int id
* @return void
*/
function deleteReg(id)
{
	$.ajax({
		url: 'prod/delete',
		type: 'POST',
		dataType: 'json',
		data: {id: id},
	})
	.done(function(data) {
		load();
	})
	.fail(function() {
		//console.log("error");
		alert('Ocurrio al intentar borrar el registro, verifique la conexión')
	});
}

/**
* funcion para limpar el formulario de recoleccion de datos de produccion
*/
function cleanProdInput()
{

	$('#ddlEmpleados').focus();
	$('#txtTiempo').val('');
	$('#txtCantidad').val('');
	$('#txtTiempo').val('');
	$('#txtCantidad').val('');

	cleanAllErrors();
}

function cleanProdEdit()
{

	$('#ddlEmpleadosEdit').focus();
	$('#txtTiempoEdit').val('');
	$('#txtCantidadEdit').val('');
	$('#txtTiempoEdit').val('');
	$('#txtCantidadEdit').val('');

	cleanAllErrors();
}

//--------------------- funciones para la section de Taller ---------------------------

function addTaller()
{
	fecha = $('#lblFechaTaller').html();
	hora = $('#ddlHorasTaller').val();
	empleado = $('#ddlEmpleadosTaller').val();
	produccion = $('#txtProduccionTaller').val();
	proceso = $('#txtProcesoTaller').val();
	proceso = proceso.replace(/(\r\n|\n|\r)/gm,"<br>");
	tiempo = $('#txtTiempoTaller').val();
	cantidad =$('#txtCantidadTaller').val();

	$.ajax({
		url: 'taller/insert',
		type: 'POST',
		dataType: 'json',
		data: {fecha: fecha, hora: hora, empleado: empleado, produccion: produccion, proceso: proceso, tiempo: tiempo, cantidad: cantidad},
	})
	.done(function(data) {
		if(!data.success)
		{
			alertify.alert(data.error.mensaje+'<br>'+'El número total de minutos seria de '+data.error.total);
		}
		load();
	})
	.fail(function() {
		alert('Ocurrio un error al transmitir los datos, verifique la conexión');
	});
	
}
function loadDataEditTaller(id)
{
	$.ajax({
	url: 'taller/loadreg',
	type: 'POST',
	dataType: 'json',
	data: {id: id},
	})
	.done(function(data) {

		var proceso = data.data.proceso;
		//proceso = proceso.replace(/</br>/gi,"\n");
		proceso= proceso.replace(/<br>/gi, "\n");
		$('#lblFechaTallerEdit').html(data.data.fecha);
		$('#ddlHorasTallerEdit').val(data.data.hora);
		$('#ddlEmpleadosTallerEdit').val(data.data.empleado);
		$('#txtProduccionTallerEdit').val(data.data.produccion);
		$('#txtProcesoTallerEdit').val(proceso);
		$('#txtTiempoTallerEdit').val(data.data.tiempo);
		$('#txtCantidadTallerEdit').val(data.data.cantidad);
		$('#txtIdTaller').val(id);
	})
	.fail(function() {
		alert('Ocurrio un error al intentrar traer los datos a modificar, verifique la conexión');
	});

}

function saveEditTaller()
{
	var proceso = $('#txtProcesoTallerEdit').val(), 
	proceso = proceso.replace(/(\r\n|\n|\r)/gm,"<br>");
	$.ajax({
		url: 'taller/update',
		type: 'POST',
		data: {
			fecha: $('#lblFechaTallerEdit').html(), 
			hora: $('#ddlHorasTallerEdit').val(), 
			empleado: $('#ddlEmpleadosTallerEdit').val(), 
			produccion: $('#txtProduccionTallerEdit').val(), 
			proceso: proceso, 
			tiempo: $('#txtTiempoTallerEdit').val(), 
			cantidad: $('#txtCantidadEdit').val(),
			id: $('#modalTallerEdit input[type=hidden]').val()
		},
	})
	.done(function() {
		if(!data.success)
		{
			alertify.alert(data.error.mensaje+'<br>'+'El número total de minutos seria de '+data.error.total);
		}
		load();
	})
	.fail(function() {
		alert('Ocurrio un error al transmitir los datos, verifique la conexión')
	});	
}

function deleteRegTaller(id)
{
	$.ajax({
		url: 'taller/delete',
		type: 'POST',
		dataType: 'json',
		data: {id: id},
	})
	.done(function(data) {
		load();
	})
	.fail(function() {
		alert('Ocurrio al intentar borrar el registro, verifique la conexión')
	});
}

function cleanTaller(){
	$('#txtProduccionTaller').val(''); 
	$('#txtProcesoTaller').val('');
	$('#txtTiempoTaller').val('60');
	$('#txtCantidad').val('0');

	$('#txtProduccionTallerEdit').val('');
	$('#txtProcesoTallerEdit').val('');
	$('#txtTiempoTallerEdit').val('');
	$('#txtCantidadTallerEdit').val('');

	cleanAllErrors();
}

function getEsperadoProceso(idProduccion, idProceso)
{
	var respuesta;
	$.ajax({
		url: 'prod/esperado',
		type: 'POST',
		dataType: 'json',
		data: {idProduccion: idProduccion, idProceso:idProceso},
	})
	.done(function(data) {
		if(data.success)
		{
			$('#txtCantidad').attr("placeholder", data.esperado+" Esperado ");
		}
		else
		{
			$('#txtCantidad').attr("placeholder", "0 Esperado");
		}
	})
	.fail(function() {
		//console.log("error");
		alert('Ocurrio al intentar borrar el registro, verifique la conexión')
	});
}
