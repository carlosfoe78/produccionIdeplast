/**
* Agregar mensaje de error a un campo validado
* @param id  string (id del campo a validar) 
* @param msj string (Mensaje a mostrar en caso de error)
* @return void
*/
function msjError(id, msj){
	$("<div class='msjError'>"+msj+"</div>").insertAfter( id );
}

/**
* Condicion de cammpo
* @param name  string (nombre de la condicion) 
* @param val (valor de la condicion)
* @param msj string (Mensaje a mostrar en caso de error)
* @return Object 
*/
function fieldCondition(name,val, mjs){
	return {name: name, val: val, msj: mjs};
}

/**
* Validar todas las condiciones de un campo
* @param string id  (id del campo a validar)
* @param array[object] conditions   (condiciones del campo)
* @return bool error
*/
function validateField(id, conditions){
	var error = false;
	var focus = false;	
	for (condition in conditions){
		
		switch(conditions[condition].name){

			case 'required':

				if($("#"+id).val() == "0" &&  $("#"+id).prop("type")=="select-one"){
					error = true;
					if (typeof $("#"+id).next()[0] == 'undefined'){
						msjError("#"+id,conditions[condition].msj);
						if(!focus){
							$('#'+id).focus();
							focus = true;
						}
					}
				}
				else if ( $("#"+id).val() == "null" || $("#"+id).val() == "" && $("#"+id).prop("type")=="text"){
					error = true;
					if (typeof $("#"+id).next()[0] == 'undefined'){
						msjError("#"+id,conditions[condition].msj);
						if(!focus){
							$('#'+id).focus();
							focus = true;
						}
					}
				}
				else if ( $("#"+id).val() == "null" || $("#"+id).val() == "" && $("#"+id).prop("type")=="textarea"){
					error = true;
					if (typeof $("#"+id).next()[0] == 'undefined'){
						msjError("#"+id,conditions[condition].msj);
						if(!focus){
							$('#'+id).focus();
							focus = true;
						}
					}
				}
			break;

			case "numeric":
				if (!$.isNumeric($("#"+id).val())){
					error = true;
					if (typeof $("#"+id).next()[0] == 'undefined'){
						msjError("#"+id,conditions[condition].msj);
						if(!focus){
							$('#'+id).focus();
							focus = true;
						}
					}
				}
			break;

			case "min":
			if (parseInt($("#"+id).val())< conditions[condition].val){
				error = true;
				if (typeof $("#"+id).next()[0] == 'undefined'){
				msjError("#"+id,conditions[condition].msj);
					if(!focus){
						$('#'+id).focus();
						focus = true;
					}
				}
			}
			break;

			case "max":
			if (parseInt($("#"+id).val()) > conditions[condition].val){
				error = true;
				if (typeof $("#"+id).next()[0] == 'undefined'){
				msjError("#"+id,conditions[condition].msj);
					if(!focus){
						$('#'+id).focus();
						focus = true;
					}
				}
			}
			break;
		}
	}
	return error;
}


//interaccion de elementos del formulario
$(document).ready(function() {

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
});


function cleanAllErrors(){
	$(".msjError").remove();
}