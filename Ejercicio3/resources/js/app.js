const app = {
	routes : {
		initsession : "/resources/views/auth/login.php",
		login : "/app/app.php"
	},
	views : function(route){
		location.replace(this.routes[route]);
	}
}