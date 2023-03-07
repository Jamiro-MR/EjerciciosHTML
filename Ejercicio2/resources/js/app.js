const app = {
	urlPosts : "https://jsonplaceholder.typicode.com/posts",
	urlComments: "https://jsonplaceholder.typicode.com/comments",
	urlUsers : "https://jsonplaceholder.typicode.com/users",

	loadPosts : function() {
		// const cont = document.querySelector("#content");
		const cont = $("#content");
		cont.css("width", "100%");
		cont.addClass("mx-auto mt-5");
		let html = "";
		fetch(this.urlPosts)
			.then( resp => resp.json())
			.then( posts => {
				for ( let post of posts ){
					//let autor
					html+=`			
					<div class="card text mb-3">
						<div class="card-header">
							${ post.title }
						</div>
						<div class="card-body">
							<p class="card-text"> ${ post.body }</p>
						</div>
						<div class="card-footer text-muted">
							<button class="btn btn-primary btn-link" type="button"
								id="btn-ver-comms${ post.id}"
								onclick="app.loadComments(${ post.id})">
								View comments
							</button>
							<button class="btn btn-link d-none" type="button"
								id="btn-cls-com${ post.id }"
								onclick="app.closeComments( ${ post.id })">
								Close Comments
							</button>
							<div class="card d-none" id="card-comments${ post.id}">
								<ul class="list-group list-group-flush" id="comments${ post.id}"
								</ul>
							</div>
						</div>
					</div>
					`;
					cont.html(html);
				}
			} ).catch( err => console.error(err) )
	},
	loadComments : function(postId){
		let html = "";
		const listComms = $("#comments" + postId);
		fetch(this.urlComments + "?postId=" + postId)
			.then( resp => resp.json())
			.then( comments => {
				for( let c of comments ){
					html += `
						<li class="list-group-item">
							De: <b>${ c.email }</b> <br>${ c.body }
						</li>`
				}
				listComms.html(html);
				$("#card-comments" + postId).toggleClass("d-none", false);
				$("#btn-ver-comms" + postId).toggleClass("d-none", true);
				$("#btn-cls-com" + postId).toggleClass("d-none", false);
			}).catch( err => console.error(err));
	},
	closeComments : function( postId ){
		$("#comments" + postId).html("");
		$("#card-comments" + postId).toggleClass("d-none", true);
		$("#btn-ver-comms" + postId).toggleClass("d-none", false);
		$("#btn-cls-com" + postId).toggleClass("d-none", true);
	},
	loadUsers : function(){
		const users = $("#authors");
		let html="";
		users.addClass("mt-5");
		users.html(html);
		fetch(this.urlUsers)
			.then( resp => resp.json() )
			.then( usuarios => {
				for( let u of usuarios ){
					html += `
						<button type="button" class="list-group-item list-group-item-action" aria-current="true"
							id="usp${u.id}"
							onclick="app.userPosts( ${ u.id } )">
						    ${ u.name } <br><small>${ u.email }</small>
						</button>`;
				}
				users.html(html);
			} ).catch( err => console.error( err ) );
	}
}
window.onload = function(){
	app.loadPosts();
	app.loadUsers();
}