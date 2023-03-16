<?php
	namespace views;
	//require "autoloader.php";
	include "../layouts/main.php";
	//use Controllers\auth\LoginController as LoginController;

	head();
?>

<div class="container">
	<div class="card mt-5 w-50 mx-auto">
		<div class="card-body">
			<form action="" id="login-form">
				<div class="form-group">
					<label for="username">Usuario</label>
					<input type="text" 
					       id="username"
					       class="form-control"
					       name="username"
					       placeholder="Nombre de usuario"
					       required>
				</div>
				<div class="form-group">
					<label for="passwd">Contraseña</label>
					<input type="password"
					       class="form-control"
					       id="passwd"
					       name="passwd"
					       required>
				</div>
				<small class="form-text text-danger d-none mb-2">
					Los datos ingresados en el inicio de sesión son incorrectos.
				</small>
				<button class="btn btn-primary" type="submit">
					Iniciar Sesion
				</button>
			</form>
		</div>
	</div>
</div>