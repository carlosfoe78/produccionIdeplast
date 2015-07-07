$(document).ready(function() {

	console.log('ok3');
});


// $(document).ready(function() {

// 	$('#txtTiempo').on('input', function() {
// 		var input=$(this);
// 		var is_tiempo=input.val();
// 		//REQUERIDO
// 		if(is_tiempo){
// 			input.removeClass("invalid").addClass("valid");
// 		}
// 		else{
// 			input.removeClass("valid").addClass("invalid");
// 		}
// 		//NUEMERICO
// 		var re = /(^(?:\+|-)?\d+$)/;
// 		var is_numeric=re.test(input.val());
// 		if(is_numeric){
// 			input.removeClass("invalid").addClass("valid");
// 		}
// 		else{
// 			input.removeClass("valid").addClass("invalid");
// 		}

// 		// min
// 		var min = 1;
// 		if(is_tiempo>=min1){
// 			input.removeClass("invalid").addClass("valid");
// 		}
// 		else{
// 			input.removeClass("valid").addClass("invalid");	
// 		}

// 		// max1
// 		if(min)
// 		{	
// 			if(is_tiempo<=60 && is_tiempo>=min){
// 				input.removeClass("invalid").addClass("valid");
// 			}
// 			else{
// 				input.removeClass("valid").addClass("invalid");	
// 			}	
// 		}else{
// 			if(is_tiempo<=60){
// 				input.removeClass("invalid").addClass("valid");
// 			}
// 			else{
// 				input.removeClass("valid").addClass("invalid");	
// 			}
// 		}
// 	});

// 	$('#txtCantidad').on('input', function(){
// 		var input=$(this);
// 		var is_cantidad=input.val();
// 		if(is_cantidad){
// 			input.removeClass("invalid").addClass("valid");	
// 		}else{
// 			input.removeClass("valid").addClass("invalid");	
// 		}

// 		//NUEMERICO
// 		var re = /(^(?:\+|-)?\d+$)/;
// 		var is_numeric=re.test(input.val());
// 		if(is_numeric){
// 			input.removeClass("invalid").addClass("valid");}
// 		else{
// 			input.removeClass("valid").addClass("invalid");
// 		}

// 		// min
// 		var min = 0;
// 		if(is_tiempo>=min){
// 			input.removeClass("invalid").addClass("valid");
// 		}
// 		else{
// 			input.removeClass("valid").addClass("invalid");	
// 		}

// 	});
// 	$('#ddlEmpleados').change(function(event) {
// 		var ddl=$(this);
// 		if(ddl.val()!=0){
// 			ddl.removeClass("invalid").addClass("valid");
// 		}else{
// 			ddl.removeClass("valid").addClass("invalid");
// 		}
// 	});
// 	$("#ddlProduccion").change(function(event) {
// 		var ddl=$(this);
// 		if(ddl.val()!=0){
// 			ddl.removeClass("invalid").addClass("valid");
// 		}else{
// 			ddl.removeClass("valid").addClass("invalid");
// 		}
// 	});
// 	$('#ddlProcesos').change(function(event) {
// 		var ddl=$(this);
// 		if(ddl.val()!=0){
// 			ddl.removeClass("invalid").addClass("valid");
// 		}else{
// 			ddl.removeClass("valid").addClass("invalid");
// 		}
// 	});
// });
