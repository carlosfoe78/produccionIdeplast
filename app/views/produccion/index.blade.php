@extends('master')

@section('script')
    {{HTML::script('js/main.js')}}
    {{HTML::script('js/validate.js')}}
    {{HTML::script('js/alertify.js')}}
@stop
@section('style')
    {{HTML::style('css/alertify-bootstrap-3.css')}}
@stop
@section('content')
<div class="header">
    <div class="form-inline">
        @if(false)
        <div class="form-group">
        
        <span class="form-control">Fecha Inicial</span>
        {{Form::text('fecha1', date('Y-m-d'), array('id'=>'calendaro1','class'=>'form-control'))}}    
        </div>
        <div class="form-group">
        <span class="form-control">Fecha Final</span>
        {{Form::text('fecha2', date('Y-m-d'), array('id'=>'calendaro2', 'class'=>'form-control'))}}
        </div>
        <span class="form-control">Seleccione hora:  </span> {{Form::select('ddlHoras2', $listHoras,null ,array('id'=>'ddlHorasP2','class'=>'form-control'))}}
        @endif
        <span  class="form-control">Seleccione hora:  </span> {{Form::select('ddlHoras', $listHoras,null ,array('id'=>'ddlHorasP','class'=>'form-control'))}}
    </div>
</div>
<table id="tbldata" class="table table-hover table-condensed table-responsive">
    <tbody>
    </tbody>
    <tfoot>
    	<form method= "POST" action="" id="formProd">
    		<tr>
    			<td>{{Form::label('lblFecha', date('Y-m-d'), array('id'=>'lblFecha', 'class'=>'form-control'))}}</td>
    			<td>{{Form::select('ddlHoras', $listHoras,null ,array('id'=>'ddlHoras', 'class'=>'form-control', ' disabled'=>true))}}</td>
    			<td>{{Form::select('ddlEmpleados', $listEmpleados,null, array('id'=>'ddlEmpleados', 'class'=>'form-control'))}}</td>
    			<td>{{Form::select('ddlProduccion', $listProduccion,null, array('id'=>'ddlProduccion', 'class'=>'form-control'))}}</td>
    			<td>{{Form::select('ddlProcesos', $listProcesos,null, array('id'=>'ddlProcesos', 'class'=>'form-control'))}}</td>
    			<td>{{Form::text('txtTiempo',null, array('id'=>'txtTiempo' , 'class'=>'form-control'))}}</td>
    			<td>{{Form::text('txtCantidad', null, array('id'=>'txtCantidad', 'class'=>'form-control'))}}</td>
                <td><a href="#" class="add"><img src="images/add-icon.png" class="icon"></a>
                    {{Form::submit('Agregar', array('id'=>"btnAdd", 'style'=>"display: none;"))}}
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
                    {{Form::hidden('txtId',null, array('id'=>'txtId', 'class'=>'form-group'))}}
                    <tr>
                        <td><label class="form-control">Fecha</label></td>
                        <td>{{Form::label('lblFecha', null, array('id'=>'lblFechaEdit', 'class'=>'form-control'))}}</td>
                    </tr>
                    <tr>
                        <td><label class="form-control">Hora</label></td>
                        <td>{{Form::select('ddlHoras', $listHoras,null ,array('id'=>'ddlHorasEdit', 'class'=>'form-control'))}}</td>
                    </tr>
                    <tr>
                        <td><label class="form-control">Empleado</label></td>
                        <td>{{Form::select('ddlEmpleados', $listEmpleados,null, array('id'=>'ddlEmpleadosEdit', 'class'=>'form-control'))}}</td>
                    </tr>
                    <tr>
                        <td><label class="form-control">Producción</label></td>
                        <td>{{Form::select('ddlProduccion', $listProduccion,null, array('id'=>'ddlProduccionEdit', 'class'=>'form-control'))}}</td>
                    </tr>
                    <tr>
                        <td><label class="form-control">Proceso</label></td>
                        <td>{{Form::select('ddlProcesos', $listProcesos,null, array('id'=>'ddlProcesosEdit','class'=>'form-control'))}}</td>
                    </tr>
                    <tr>
                        <td><label class="form-control">Tiempo<label></td>
                        <td>{{Form::text('txtTiempo',null, array('id'=>'txtTiempoEdit', 'class'=>'form-control'))}}</td>
                    </tr>
                    <tr>
                        <td><label class="form-control">Cantidad</label></td>
                        <td>{{Form::text('txtCantidad', null, array('id'=>'txtCantidadEdit', 'class'=>'form-control'))}}</td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-prod-close" data-dismiss="modal">Cerrar</button>
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
                        <td><label class="form-control">Fecha</label> </td>
                        <td>{{Form::label('lblFecha', date('Y-m-d'), array('id'=>'lblFechaTaller', 'class'=>'form-control'))}}</td>
                    </tr>
                    <tr>
                        <td><label class="form-control">Hora</label></td>
                        <td>{{Form::select('ddlHoras', $listHoras,null ,array('id'=>'ddlHorasTaller','class'=>'form-control'))}}</td>
                    </tr>
                    <tr>
                        <td><label class="form-control">Empleado</label></td>
                        <td>{{Form::select('ddlEmpleados', 
                            array('5'=>'MARTIN LEONCIO RAMIREZ', '23' => 'NELSON DE JESUS VELEZ'),null, 
                            array('id'=>'ddlEmpleadosTaller', 'class'=>'form-control'))}}
                        </td>
                    </tr>
                    <tr>
                        <td><label class="form-control"> Producción</label> </td>
                        <td>{{Form::text('txtProduccionTaller', null, array('id'=>'txtProduccionTaller', 'class'=>'form-control'))}}</td>
                    </tr>
                    <tr>
                        <td><label class="form-control">Proceso</label></td>
                        <td>{{Form::textarea('txtProcesoTaller', null, array('id'=>'txtProcesoTaller', 'class'=>'form-control'))}}</td>
                    </tr>
                    <tr>
                        <td><label class="form-control">Tiempo</label></td>
                        <td>{{Form::text('txtTiempoTaller','60', array('id'=>'txtTiempoTaller', 'class'=>'form-control'))}}</td>
                    </tr>
                    <tr>
                        <td><label class="form-control">Cantidad</label></td>
                        <td>{{Form::text('txtCantidadTaller', '0', array('id'=>'txtCantidadTaller', 'class'=>'form-control'))}}</td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-taller-close" data-dismiss="modal">Cerrar</button>
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
                    {{Form::hidden('txtIdTaller',null, array('id'=>'txtIdTaller', 'class'=>'form-control'))}}
                    <tr>
                        <td><label class="form-control">Fecha</label></td>
                        <td>{{Form::label('lblFecha', date('Y-m-d'), array('id'=>'lblFechaTallerEdit', 'class'=>'form-control'))}}</td>
                    </tr>
                    <tr>
                        <td><label class="form-control">Hora</label></td>
                        <td>{{Form::select('ddlHoras', $listHoras,null ,array('id'=>'ddlHorasTallerEdit', 'class'=>'form-control'))}}</td>
                    </tr>
                    <tr>
                        <td><label class="form-control">Empleado<label></td>
                        <td>{{Form::select('ddlEmpleados', 
                            array('5'=>'MARTIN LEONCIO RAMIREZ', '23' => 'NELSON DE JESUS VELEZ'),null, 
                            array('id'=>'ddlEmpleadosTallerEdit', 'class'=>'form-control'))}}
                        </td>
                    </tr>
                    <tr>
                        <td><label class="form-control">Producción</label></td>
                        <td>{{Form::text('txtProduccionTaller', null, array('id'=>'txtProduccionTallerEdit', 'class'=>'form-control'))}}</td>
                    </tr>
                    <tr>
                        <td><label class="form-control">Proceso<label></td>
                        <td>{{Form::textarea('txtProcesoTaller', null, array('id'=>'txtProcesoTallerEdit', 'class'=>'form-control'))}}</td>
                    </tr>
                    <tr>
                        <td><label class="form-control">Tiempo</label></td>
                        <td>{{Form::text('txtTiempoTaller',null, array('id'=>'txtTiempoTallerEdit', 'class'=>'form-control'))}}</td>
                    </tr>
                    <tr>
                        <td><label class="form-control">Cantidad</label></td>
                        <td>{{Form::text('txtCantidadTaller', '0', array('id'=>'txtCantidadTallerEdit', 'class'=>'form-control'))}}</td>
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