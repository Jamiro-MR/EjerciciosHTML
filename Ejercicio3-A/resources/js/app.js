const app = {
	
	routes : {
		inisession : "/resources/views/auth/login.php",
		endsession : "/app/app.php?_logout",
		login : "/app/app.php",
		prevposts : "/app/app.php?_pp",
		lastpost : "/app/app.php?_lp",
	},
	pp : $(#prev-post),
	views : function(route){
		location.replace(this.routes[route]);
	},
	previousPosts : function(){
		let html = `<b>Aun no hay publicaciones en este blog</b>`
		this.pp.html("");
		fetch(this.routes.prevposts)
			.then( resp => resp.json() )
			.then( ppresp => {
				if( ppresp.lenght > 0 ){
					html = "";
					let primera = true;
					for( let post of ppresp ){
						html += `
							<a href="#" onclick="app.openPost(event, ${post.id}, this)" class="list-group-item list-group-item-action ${ primera ? `active`:``} pplg">
								<div class="w-100 border-bottom">
									<h5 class="mb-1">
										${ post.title }
									</h5>
									<small class="text-${ primera ? `light` : `muted` }">
										<i class="bi bi-calendar4-week"></i> ${ post.fecha }
									</small>
								</div>
								<small>
									<i class="bi bi-person-rolodex"></i> <b>${ post.name }</b>
								</small>
							</a>
						`;
						primera = false;
					}
					this.pp.html(html);
				}
			} ).catch( err => console.error( err ) );
	},
	lastPost : function(limit){
		let html = "<h2>Ninguna publicación que mostrar</h2>"
		this.lp.html("");

		fetch(this.routes.lastpost + "&limit=" + limit)
			.then( response => response.json())
			.then( lpresp => {
				if( lpresp.lenght > 0 ){
					html = `
						<div class="w-100 border-bottom">
							<h5 class="mb-1"> ${ lpresp[0].title } </h5>
							<small class="text-muted">
								<i class="bi bi-calendar-week"></i> ${lpresp[0].fecha} |
								<i class="bi bi-person-circle"></i> ${lpresp[0].name}
							</small>
							<p class="mb-1 border-bottom">${lpresp[0].body}</p>
						</div>
					`
				}
				this.lp.html(html);
			}).catch( err => console.error( err ));
	}
}