<?php
class RegistroProduccionController extends Controller
{
  public function getIndex()
  {
    $listHoras = $this->formatlist( DB::select('call usp_llenarComboHoras()'));
    $listEmpleados = $this->formatlist( DB::select('call usp_llenarComboEmpleadosProduccion()'),true);
    $listProduccion = $this->formatlist( DB::select('call usp_llenarComboProduccionActivas()'),true);
    $listProcesos = $this->formatlist( DB::select('call usp_llenarComboProcesos()'),true);

    return View::make('produccion.index',
        array('listHoras'=>$listHoras,
            'listEmpleados'=>$listEmpleados,
            'listProduccion' => $listProduccion,
            'listProcesos'=>$listProcesos
        )
    );
  }

  public function postInsert()
  {

    $fecha =  Input::get('fecha');
    $idHora = Input::get('hora');
    $idEmpleado = Input::get('empleado');
    $tiempo = Input::get('tiempo');

    $validarTiempo =$this->validarTiempo($idEmpleado,$idHora,$fecha,$tiempo);
    if(!$validarTiempo['success'])
    {
      return Response::json($validarTiempo);
    }

    $registro = new RegistroProduccion();
    $registro->dtmfecha_dat =  $fecha;
    $registro->id_hora_dat =  $idHora;
    $registro->id_emp_dat =  $idEmpleado;
    $registro->id_prod_dat =  Input::get('produccion');
    $registro->id_proc_dat =  Input::get('proceso');
    $registro->inttiempo_dat =  $tiempo;
    $registro->intcantidad_dat =  Input::get('cantidad'); 
    $registro->save();

    $result = array('success'=>true);
    return Response::json($result);
  }

  public function postUpdate()
  {
    $fecha =  Input::get('fecha');
    $idHora = Input::get('hora');
    $idEmpleado = Input::get('empleado');
    $tiempo = Input::get('tiempo');

    $validarTiempo =$this->validarTiempo($idEmpleado,$idHora,$fecha,$tiempo);
    if(!$validarTiempo['success'])
    {
      return Response::json($validarTiempo);
    }

    $id= Input::get('id');
    $reg = RegistroProduccion::find($id);
    $reg->dtmfecha_dat =  $fecha;
    $reg->id_hora_dat =  $idHora;
    $reg->id_emp_dat =  $idEmpleado;
    $reg->id_prod_dat =  Input::get('produccion');
    $reg->id_proc_dat =  Input::get('proceso');
    $reg->inttiempo_dat = $tiempo;
    $reg->intcantidad_dat =  Input::get('cantidad'); 
    $reg->save();

    $result = array('success'=>true);
    return Response::json($result);
  }

  public function postDelete()
  {
    $id= Input::get('id');
    $reg = RegistroProduccion::find($id);
    $reg->delete();

    $result = array('success'=>true);
    return Response::json($result);
  }

  public function getListbyhour($id_hour)
  {
        //$list = RegistroProduccion::where('id_hora_dat','=', $id_hour)->get();
        //$list = RegistroProduccion::whereid_hora_datAndDtmfecha_dat($id_hour,'2014-11-18');
    $fecha = date('Y-m-d');
    $result= array();
        //$reg = new stdClass();
        //$Rows = RegistroProduccion::whereRaw("id_hora_dat = ".$id_hour." and dtmfecha_dat = '2014-11-18'")->get();
    $Rows = DB::select("select * from (select
      id_dat,
      dtmfecha_dat,
      strNombre_hora as id_hora_dat,
      concat(strnombres_emp, ' ', strape1_emp,' ',strape2_emp) as id_emp_dat,
      if(id_prod_dat = 0,'',concat(id_prod_dat , ' ',strnombre_art)) as id_prod_dat,
      strnombre_proc as id_proc_dat,
      inttiempo_dat,
      intcantidad_dat,
      1 as ident
      from `tbldat_produccion` 
      inner join bdideplast.`dbo.tblhoras` on id_hora= id_hora_dat
      inner join bdideplast.`dbo.tblempleado` on id_emp_dat= id_emp
      inner join bdideplast.`dbo.tblproduccion` on id_prod=id_prod_dat
      inner join bdideplast.`dbo.tblarticulo` on id_art_prod=id_art
      inner join bdideplast.`dbo.tblprocesos` on id_proc = id_proc_dat
      where id_hora_dat = ? and dtmfecha_dat = ?
      union
      select
      id_dat,
      dtmfecha_dat,
      strNombre_hora as id_hora_dat,
      concat(strnombres_emp, ' ', strape1_emp,' ',strape2_emp) as id_emp_dat,
      id_prod_dat,
      id_proc_dat,
      inttiempo_dat,
      intcantidad_dat,
      0 as ident
      from tbltaller_reg
      inner join bdideplast.`dbo.tblhoras` on id_hora= id_hora_dat
      inner join bdideplast.`dbo.tblempleado` on id_emp_dat= id_emp
      where id_hora_dat = ? and dtmfecha_dat = ?) a order by ident,id_dat
      ;",[$id_hour, $fecha, $id_hour, $fecha]);
    foreach ($Rows as $row) {
      $reg =
      (object) [
      'id_dat'=>$row->id_dat,
      'dtmfecha_dat'=>$row->dtmfecha_dat,
      'id_hora_dat'=>$row->id_hora_dat,
      'id_emp_dat'=>$row->id_emp_dat,
      'id_prod_dat'=>$row->id_prod_dat,
      'id_proc_dat'=>$row->id_proc_dat,
      'inttiempo_dat'=>$row->inttiempo_dat,
      'intcantidad_dat'=>$row->intcantidad_dat,
      'ident'=>$row->ident
      ];
      array_push($result, $reg);
    }
    return Response::json($result);
  }

  public function getListbyhour2($id_hour1, $id_hour2, $fecha1, $fecha2)
  {

        //$list = RegistroProduccion::where('id_hora_dat','=', $id_hour)->get();
        //$list = RegistroProduccion::whereid_hora_datAndDtmfecha_dat($id_hour,'2014-11-18');
    $fecha = date('Y-m-d');
    $result= array();
        //$reg = new stdClass();
        //$Rows = RegistroProduccion::whereRaw("id_hora_dat = ".$id_hour." and dtmfecha_dat = '2014-11-18'")->get();
    $Rows = DB::select("      
      select
        id_dat,
        dtmfecha_dat,
        strNombre_hora as id_hora_dat,
        concat(strnombres_emp, ' ', strape1_emp,' ',strape2_emp) as id_emp_dat,
        if(id_prod_dat = 0,'',concat(id_prod_dat , ' ',strnombre_art)) as id_prod_dat,
        strnombre_proc as id_proc_dat,
        inttiempo_dat,
        intcantidad_dat,
        1 as ident
        from `tbldat_produccion` 
        inner join bdideplast.`dbo.tblhoras` on id_hora= id_hora_dat
        inner join bdideplast.`dbo.tblempleado` on id_emp_dat= id_emp
        inner join bdideplast.`dbo.tblproduccion` on id_prod=id_prod_dat
        inner join bdideplast.`dbo.tblarticulo` on id_art_prod=id_art
        inner join bdideplast.`dbo.tblprocesos` on id_proc = id_proc_dat
        where id_hora_dat between ? and ? and dtmfecha_dat between ? and ?
        union
        select
          id_dat,
          dtmfecha_dat,
          strNombre_hora as id_hora_dat,
          concat(strnombres_emp, ' ', strape1_emp,' ',strape2_emp) as id_emp_dat,
          id_prod_dat,
          id_proc_dat,
          inttiempo_dat,
          intcantidad_dat,
          0 as ident
        from tbltaller_reg
        inner join bdideplast.`dbo.tblhoras` on id_hora= id_hora_dat
        inner join bdideplast.`dbo.tblempleado` on id_emp_dat= id_emp
        where id_hora_dat between ? and ? and dtmfecha_dat between ? and ? order by id_emp_dat;",
        array($id_hour1,$id_hour2,$fecha1,$fecha2,$id_hour1,$id_hour2,$fecha1,$fecha2));
    foreach ($Rows as $row) {
      $reg =
      (object) [
      'id_dat'=>$row->id_dat,
      'dtmfecha_dat'=>$row->dtmfecha_dat,
      'id_hora_dat'=>$row->id_hora_dat,
      'id_emp_dat'=>$row->id_emp_dat,
      'id_prod_dat'=>$row->id_prod_dat,
      'id_proc_dat'=>$row->id_proc_dat,
      'inttiempo_dat'=>$row->inttiempo_dat,
      'intcantidad_dat'=>$row->intcantidad_dat,
      'ident'=>$row->ident
      ];
      array_push($result, $reg);
    }
    return Response::json($result);

  }

  function postLoadreg()
  {
    $id= Input::get('id');
    $reg = RegistroProduccion::find($id);

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

  function postEsperado()
  {
    $idProduccion = Input::get('idProduccion');
    $idProceso = Input::get('idProceso');

    $result = DB::select('call ups_buscarRendimientoProcesoXProd(?,?)',array($idProduccion,$idProceso));
    //$result = DB::select('call ups_buscarRendimientoProcesoXProd(4293,2)');
    if(isset($result[0]))
    {
      $esperado=$result[0]->esperado;
      return Response::json(array('success'=>true,'esperado'=> $esperado));
    }
    return Response::json(array('success'=>false));
  }

  function validarTiempo($idEmpleado, $idHora, $fecha, $tiempo, $update = false)
  {
    $result = DB::select('call usp_verificarTiempoHoraXEmp(?,?,?)',array($idEmpleado , $idHora,$fecha));
    $totalMin = $result[0]->tiempo;
    
    if($totalMin+$tiempo>60){
      return array('success'=>false,
              'error'=> array('mensaje' => 'Está tratando de asignar un tiempo superior al permitido para la hora', 'total'=> $totalMin+$tiempo ));
    }
    return array('success'=>true);
  }

  function formatlist($listConsut, $addDefault=false)
  {
    if($addDefault)
    {
      $list ['0'] = '-Seleccione-';
    }
    foreach ($listConsut as $element) 
    {
      $list [$element->Codigo] = $element->Nombre;
    }
    return  $list;
  }
}