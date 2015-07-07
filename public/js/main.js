$(document).ready(function() {

	load();//inicar la tabla

	
	$('.add').click(function() {
		//document.forms["formProd"].submit();
		//add();
		//$('btnAdd').click();
		document.getElementById("btnAdd").click();
	});

	$('#formProd').submit(function(event) {
		event.preventDefault();
		//console.log(validate());
		if (validate()){
			//add();
			console.log('enviar');
		}
	});

	{
		$('.btnGuardarTaller').click(function() {
			addTaller();
			$('#modalTaller').modal('hide');
			clearTaller();
		});

		$('.btnEdit').click(function(event) {
			saveEdit();
			$('#modalEdit').modal('hide');
		});
		$('.btnGuardarTallerEdit').click(function(event) {
			saveEditTaller();
			$('#modalTallerEdit').modal('hide');
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

	    $('.btnTaller').click(function(event) {
	     	$('#modalTaller').modal('show');
	    });
	}

	//interaccion de elementos del formulario
	{
		// Quitar mensaje de error cuando las listas desplegables cambien

		$("select").change(function (){
			var obj = $(this).next();
			if (typeof obj[0] != 'undefined'){
				if(obj[0].className=="msjError"){
					$(this).next().remove();
				}
			}		
		});

		//quitar mensaje de error cuando se inserten datos
		$(':text').keyup(function (){
			var obj = $(this).next();
			if (typeof obj[0] != 'undefined'){
				if(obj[0].className=="msjError"){
					$(this).next().remove();
				}
			}		
		});
	}


});


function msjError(id, msj){
	$("<div class='msjError'>"+msj+"</div>").insertAfter( id );
}

function validate() {

	var error = false;
	var focus = false;

	var validate = {};
	validate.empleado  = $("#ddlEmpleados").val();
	validate.produccion = $("#ddlProduccion").val();
	validate.proceso = $("#ddlProcesos").val();
	validate.tiempo = $("#txtTiempo").val();
	validate.cantidad = $("#txtCantidad").val();

	
	//validacion campo empleado
	if(validate.empleado == "0"){
		error = true;
		console.log("debe seleccionar un empleado");
		msjError("#ddlEmpleados","Debe seleccionar un empleado");
		if(!focus){
			$('#ddlEmpleados').focus();
			focus = true;
		}
	}

	//validacion campo proceso
	if(validate.proceso == "0"){
		error = true;
		ddlProcesos
		console.log("debe seleccionar un proceso");
		msjError("#ddlProcesos","debe seleccionar un proceso");
		if(!focus){
			$('#ddlProcesos').focus();
			focus = true;
		}
	}


	//validacion campo de tiempo
	if(validate.tiempo == "null" || validate.tiempo == "") {
		error = true;
		msjError("#txtTiempo","tiempo en blanco");
		console.log('tiempo en blanco');
		if(!focus){
			$('#txtTiempo').focus();
			focus = true;
		}
		
	}else{
		if (parseInt(validate.tiempo)<0 || parseInt(validate.tiempo)>60){
			error = true;
			console.log('tiempo fuera de rango');
			msjError("#txtTiempo","tiempo fuera de rango");
			if(!focus){
				$('#txtTiempo').focus();
				focus = true;
			}
		}
	}

	//validacion campo cantidad
	if(validate.cantidad == "null" || validate.cantidad == ""){
		error = true;
		console.log('');
		msjError("#txtCantidad","cantidad en blanco");
		if(!focus){
			$('#txtCantidad').focus();
			focus = true;
		}
	}else{
		if (parseInt(validate.cantidad)<0){
			error = true;
			console.log('cantidad fuera de rango');
			msjError("#txtCantidad","cantidad fuera de rango");
			if(!focus){
				$('#txtCantidad').focus();
				focus = true;
			}
		}
	}


	if (error){
		return false;
	}
	return true;
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
		clean();
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
			row+='<td><a href="" id='+data[i].id_dat+' class="edit"><img src="images/edit-icon.png" class="icon"></a>'
			+'<a href="" id="'+data[i].id_dat+'" class="delete"><img src="images/delete-icon.png" class="icon"></a></td></tr>';
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
		if(confirm('¿Seguro desea borrar este registro?'))
		{
			deleteReg(id);
		}
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
		if(confirm('¿Seguro desea borrar este registro?'))
		{
			deleteRegTaller(id);
		}
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
function valRequired(field)
{
	var val = $("#".field).val();
	if(val==null || vall==''){
		console.log('El campo es requerido');
		$("#".field).addClass('error');
		return;
	}

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
			fecha: fecha, 
			hora: $('#ddlHorasEdit').val(), 
			empleado: $('#ddlEmpleadosEdit').val(), 
			produccion: $('#ddlProduccionEdit').val(), 
			proceso: $('#ddlProcesosEdit').val(), 
			tiempo: $('#txtTiempoEdit').val(), 
			cantidad: $('#txtCantidadEdit').val(),
			id: $('#modalEdit input[type=hidden]').val()
		},
	})
	.done(function() {
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
function clean()
{
	$('#ddlEmpleados').focus();
	$('#txtTiempoEdit').val('');
	$('#txtCantidadEdit').val('');
	$('#txtTiempo').val('');
	$('#txtCantidad').val('');
}

//--------------------- funciones para la section de Taller ---------------------------

function addTaller()
{
	fecha = $('#lblFechaTaller').html();
	hora = $('#ddlHorasTaller').val();
	empleado = $('#ddlEmpleadosTaller').val();
	produccion = $('#txtProduccionTaller').val();
	proceso = $('#txtProcesoTaller').val();
	tiempo = $('#txtTiempoTaller').val();
	cantidad =$('#txtCantidadTaller').val();

	$.ajax({
		url: 'taller/insert',
		type: 'POST',
		dataType: 'json',
		data: {fecha: fecha, hora: hora, empleado: empleado, produccion: produccion, proceso: proceso, tiempo: tiempo, cantidad: cantidad},
	})
	.done(function(data) {
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

		$('#lblFechaTallerEdit').html(data.data.fecha);
		$('#ddlHorasTallerEdit').val(data.data.hora);
		$('#ddlEmpleadosTallerEdit').val(data.data.empleado);
		$('#txtProduccionTallerEdit').val(data.data.produccion);
		$('#txtProcesoTallerEdit').val(data.data.proceso);
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
	$.ajax({
		url: 'taller/update',
		type: 'POST',
		data: {
			fecha: $('#lblFechaTallerEdit').html(), 
			hora: $('#ddlHorasTallerEdit').val(), 
			empleado: $('#ddlEmpleadosTallerEdit').val(), 
			produccion: $('#txtProduccionTallerEdit').val(), 
			proceso: $('#txtProcesoTallerEdit').val(), 
			tiempo: $('#txtTiempoTallerEdit').val(), 
			cantidad: $('#txtCantidadEdit').val(),
			id: $('#txtCantidadTallerEdit').val()
		},
	})
	.done(function() {
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
	$('#txtTiempoTaller').val('');
	$('#txtCantidad').val('');
}

