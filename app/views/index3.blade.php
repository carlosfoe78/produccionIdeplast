<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title></title>
	<link rel="stylesheet" href="">
	{{HTML::script('js/jquery.js')}}
	{{HTML::script('js/jquery.validate.js')}}
</head>
<body>
	<h1>HOLA</h1>
	
	<form id="frmEnviar" method="post" action="">
		<label>Nombres</label>
		<input type="text" name="nombre"><br>
		<label>Apellidos</label>
		<input type="text" name="apellido" ><br>
		<label>Telefono</label>
		<input type="text" name="telefono" ><br>
		<label>Email</label>
		<input type="email" name="correo" ><br>
		<input type="submit" name="enviar" value="Enviar"></input>
	</form>

	<script type="text/javascript">

		$().ready(function (){
			//alert('listo');
			$("#frmEnviar").validate({
				rules: {
					correo: {
						required: true,
      					email: true
					},
					nombre: {
						required: true,
						minlength: 2
					}

				}
			});
		})
	</script>
</body>
</html>