<?php

namespace app;

require_once 'autoloader.php';
//use controllers\auth\LoginController as LoginController;

if(!empty($_POST)){
	//*******************Login */
	$login = in_array('_login', array_keys(filter_input_array(INPUT_POST)));
	if($login){
		
	}
}