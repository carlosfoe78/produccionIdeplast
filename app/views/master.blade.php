<!DOCTYPE html>
<html lang= es>
<head>
	<meta charset= "utf-8">
	{{HTML::script('js/jquery-1.11.3.js')}}
	{{HTML::script('js/jquery.dataTables.js')}}
	{{HTML::script('bootstrap-3.3.2/js/bootstrap.min.js')}}
	{{HTML::script('js/jquery-ui.js')}}
	{{HTML::script('js/jquery.validate.js')}}

	{{HTML::style('bootstrap-3.3.2/css/bootstrap.css')}}
	{{HTML::style('css/jquery-ui.css')}}
	{{HTML::style('css/main.css')}}
	@yield('script')
</head>
<body>
	@yield('content')
</body>
</html>