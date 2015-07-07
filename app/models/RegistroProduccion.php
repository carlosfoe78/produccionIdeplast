<?php
/**
 * Created by PhpStorm.
 * User: Carlos
 * Date: 28/02/2015
 * Time: 12:04 PM
 */

class RegistroProduccion extends Eloquent
{
    protected $table = "tbldat_produccion";
    protected $primaryKey = "id_dat";
    public $timestamps = false;
}