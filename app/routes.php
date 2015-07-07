<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	return View::make('hello');
});

Route::controller('prod', 'RegistroProduccionController');
Route::controller('taller', 'RegistroTallerController');

Route::get('index', function()
{
	return View::make('index3');
});

Route::get('test', function(){
	print_r (date('Y-m-d'));
});
