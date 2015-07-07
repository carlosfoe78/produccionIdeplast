<?php
class RegistroTallerController extends Controller
{
  
  public function postInsert()
  {
    $registro = new RegistroTaller();
    $registro->dtmfecha_dat =  Input::get('fecha');
    $registro->id_hora_dat =  Input::get('hora');
    $registro->id_emp_dat =  Input::get('empleado');
    $registro->id_prod_dat =  Input::get('produccion');
    $registro->id_proc_dat =  Input::get('proceso');
    $registro->inttiempo_dat =  Input::get('tiempo');
    $registro->intcantidad_dat =  Input::get('cantidad'); 
    $registro->save();

    $result = array('success'=>true);
    return Response::json($result);
  }

  public function postUpdate()
  {
    $id= Input::get('id');
    $reg = RegistroTaller::find($id);
    $reg->dtmfecha_dat =  Input::get('fecha');
    $reg->id_hora_dat =  Input::get('hora');
    $reg->id_emp_dat =  Input::get('empleado');
    $reg->id_prod_dat =  Input::get('produccion');
    $reg->id_proc_dat =  Input::get('proceso');
    $reg->inttiempo_dat =  Input::get('tiempo');
    $reg->intcantidad_dat =  Input::get('cantidad'); 
    $reg->save();

    $result = array('success'=>true);
    return Response::json($result);
  }

  public function postDelete()
  {
    $id= Input::get('id');
    $reg = RegistroTaller::find($id);
    $reg->delete();

    $result = array('success'=>true);
    return Response::json($result);
  }

  function postLoadreg()
  {
    $id= Input::get('id');
    $reg = RegistroTaller::find($id);

    $result= array(
      'fecha'=>$reg->dtmfecha_dat,
      'hora'=>$reg->id_hora_dat,
      'empleado'=>$reg->id_emp_dat,
      'produccion'=>$reg->id_prod_dat,
      'proceso'=>$reg->id_proc_dat,
      'tiempo'=>$reg->inttiempo_dat,
      'cantidad'=>$reg->intcantidad_dat
      );
    return Response::json(array('success'=>true,'data'=>$result));
  }

}