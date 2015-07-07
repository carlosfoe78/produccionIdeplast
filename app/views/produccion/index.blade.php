@extends('master')

@section('script')
    {{HTML::script('js/main.js')}}
    {{HTML::script('js/mainValidate.js')}}
@stop
@section('content')
<div class="header">
    @if(false)
    {{Form::text('fecha', date('Y-m-d'), array('id'=>'calendaro'))}}
    @endif
    <span>Seleccione hora:  </span> {{Form::select('ddlHoras', $listHoras,null ,array('id'=>'ddlHorasP'))}}
</div>
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

<button type="button" class="btn btn-primary btnTaller">Taller</button>

<div class="modal fade" id="modalEdit" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>
            <h4 class="modal-title" id="myModalLabel">Editar registro de producción</h4>
            </div>
            <div class="modal-body">
                <table class="editTable">
                    {{Form::hidden('txtId',null, array('id'=>'txtId'))}}
                    <tr>
                        <td>Fecha</td>
                        <td>{{Form::label('lblFecha', null, array('id'=>'lblFechaEdit'))}}</td>
                    </tr>
                    <tr>
                        <td>Hora</td>
                        <td>{{Form::select('ddlHoras', $listHoras,null ,array('id'=>'ddlHorasEdit'))}}</td>
                    </tr>
                    <tr>
                        <td>Empleado</td>
                        <td>{{Form::select('ddlEmpleados', $listEmpleados,null, array('id'=>'ddlEmpleadosEdit'))}}</td>
                    </tr>
                    <tr>
                        <td>Producción</td>
                        <td>{{Form::select('ddlProduccion', $listProduccion,null, array('id'=>'ddlProduccionEdit'))}}</td>
                    </tr>
                    <tr>
                        <td>Proceso</td>
                        <td>{{Form::select('ddlProcesos', $listProcesos,null, array('id'=>'ddlProcesosEdit'))}}</td>
                    </tr>
                    <tr>
                        <td>Tiempo</td>
                        <td>{{Form::text('txtTiempo',null, array('id'=>'txtTiempoEdit'))}}</td>
                    </tr>
                    <tr>
                        <td>Cantidad</td>
                        <td>{{Form::text('txtCantidad', null, array('id'=>'txtCantidadEdit'))}}</td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary btnEdit">Guardar</button>
        </div>
    </div>
  </div>
</div>


<div class="modal fade" id="modalTaller" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>
            <h4 class="modal-title" id="myModalLabel">Producción Taller</h4>
            </div>
            <div class="modal-body">
                <table class="editTable">
                    <tr>
                        <td>Fecha</td>
                        <td>{{Form::label('lblFecha', date('Y-m-d'), array('id'=>'lblFechaTaller'))}}</td>
                    </tr>
                    <tr>
                        <td>Hora</td>
                        <td>{{Form::select('ddlHoras', $listHoras,null ,array('id'=>'ddlHorasTaller'))}}</td>
                    </tr>
                    <tr>
                        <td>Empleado</td>
                        <td>{{Form::select('ddlEmpleados', 
                            array('5'=>'MARTIN LEONCIO RAMIREZ', '23' => 'NELSON DE JESUS VELEZ'),null, 
                            array('id'=>'ddlEmpleadosTaller'))}}
                        </td>
                    </tr>
                    <tr>
                        <td>Producción</td>
                        <td>{{Form::text('txtProduccionTaller', null, array('id'=>'txtProduccionTaller'))}}</td>
                    </tr>
                    <tr>
                        <td>Proceso</td>
                        <td>{{Form::textarea('txtProcesoTaller', null, array('id'=>'txtProcesoTaller'))}}</td>
                    </tr>
                    <tr>
                        <td>Tiempo</td>
                        <td>{{Form::text('txtTiempoTaller',null, array('id'=>'txtTiempoTaller'))}}</td>
                    </tr>
                    <tr>
                        <td>Cantidad</td>
                        <td>{{Form::text('txtCantidadTaller', '0', array('id'=>'txtCantidadTaller'))}}</td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary btnGuardarTaller">Guardar</button>
        </div>
    </div>
  </div>
</div>


<div class="modal fade" id="modalTallerEdit" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>
            <h4 class="modal-title" id="myModalLabel">Editar producción Taller</h4>
            </div>
            <div class="modal-body">
                <table class="editTable">
                    {{Form::hidden('txtIdTaller',null, array('id'=>'txtIdTaller'))}}
                    <tr>
                        <td>Fecha</td>
                        <td>{{Form::label('lblFecha', date('Y-m-d'), array('id'=>'lblFechaTallerEdit'))}}</td>
                    </tr>
                    <tr>
                        <td>Hora</td>
                        <td>{{Form::select('ddlHoras', $listHoras,null ,array('id'=>'ddlHorasTallerEdit'))}}</td>
                    </tr>
                    <tr>
                        <td>Empleado</td>
                        <td>{{Form::select('ddlEmpleados', 
                            array('5'=>'MARTIN LEONCIO RAMIREZ', '23' => 'NELSON DE JESUS VELEZ'),null, 
                            array('id'=>'ddlEmpleadosTallerEdit'))}}
                        </td>
                    </tr>
                    <tr>
                        <td>Producción</td>
                        <td>{{Form::text('txtProduccionTaller', null, array('id'=>'txtProduccionTallerEdit'))}}</td>
                    </tr>
                    <tr>
                        <td>Proceso</td>
                        <td>{{Form::textarea('txtProcesoTaller', null, array('id'=>'txtProcesoTallerEdit'))}}</td>
                    </tr>
                    <tr>
                        <td>Tiempo</td>
                        <td>{{Form::text('txtTiempoTaller',null, array('id'=>'txtTiempoTallerEdit'))}}</td>
                    </tr>
                    <tr>
                        <td>Cantidad</td>
                        <td>{{Form::text('txtCantidadTaller', '0', array('id'=>'txtCantidadTallerEdit'))}}</td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary btnGuardarTallerEdit">Guardar</button>
        </div>
    </div>
  </div>
</div>
@stop