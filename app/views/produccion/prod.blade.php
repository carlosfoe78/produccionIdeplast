@extends('master')

@section('content')

<table id="tbldata" class="">
    <tbody>
    </tbody>
    <tfoot>
    	<form method= "POST" action="" id="formProd">
    		<tr>
    			<td>{{Form::label('lblFecha', date('Y-m-d'), array('id'=>'lblFecha'))}}</td>
    			<td>{{Form::select('ddlHoras', $listHoras,null ,array('id'=>'ddlHoras'))}}</td>
    			<td>{{Form::select('ddlEmpleados', $listEmpleados,null, array('id'=>'ddlEmpleados'))}}</td>
    			<td>{{Form::select('ddlProduccion', $listProduccion,null, array('id'=>'ddlProduccion'))}}</td>
    			<td>{{Form::select('ddlProcesos', $listProcesos,null, array('id'=>'ddlProcesos'))}}</td>
    			<td>{{Form::text('txtTiempo',null, array('id'=>'txtTiempo'))}}</td>
    			<td>{{Form::text('txtCantidad', null, array('id'=>'txtCantidad'))}}</td>
                <td><a href="#" class="add"><img src="images/add-icon.png" class="icon"></a>
                    {{Form::submit('Agregar', array('id'=>"btnAdd"))}}
                </td>
    		</tr>
    	{{Form::close()}}
    </tfoot>
</table>

<script type="text/javascript">
	$(document).ready(function (){
		console.log('ok');
		$("#formProd").validate({
			rules: {
				txtTiempo: {
					required: true,
      				minlength: 2
				}
			}
		});
	})
</script>
@endsection