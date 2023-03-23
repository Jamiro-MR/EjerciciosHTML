<?php

	namespace app;
	require_once Controllers\auth\;

	use Models\user;

	class LoginController {
		public $sv; //Sesión válida
		public $name;
		public $id;
		public function __construct(){
			$this -> sv = false;
		}
		public function UserAuth($datos){
			$user = new user();

			$result = $user->where([
				["username", $datos["username"]], 
				["passwd", $datos["passwd"]],
			])->get();
			if( count(json_decode($result)) > 0 ){
				//Se registra la sesión del usuario
				return $this->sessionRegister($datos);
			}else{
				//Destruir todo alv
				echo json_decode(["r" => false]);
			}
		}

		private function sessionRegister($datos){
			session_start();
			$_SESSION['IP'] = $_SERVER['REMOTE_ADDR'];
			$_SESSION['username'] = $datos['username'];
			$_SESSION['passwd'] = $datos['passwd'];
			session_write_close();
			return json_encode(["r" => true]);
		}

		private function session_destroy(){
			session_start();
			$_SESSION = [];
			session_destroy();
			session_write_close();
			$this->sv = false;
			$this->name = "";
			$this->id = "";
			return;	
		}
	}