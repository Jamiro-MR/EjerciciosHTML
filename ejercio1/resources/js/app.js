const app = {
 urlDatos : "/resources/data/data.json",
 filtro : "todos",

 cargarFichas : function() {
  const fichas = document.querySelector("#fichas");
  let html = "";
  fetch(this.urlDatos)
   .then(response => response.json())
   .then(autos => {
    for (auto of autos){
     if(auto.tipo === this.filtro || this.filtro === "todos"){
      html += `
       <div class="ficha">
         <img src="./resources/imgs/${auto.foto}" alt="${auto.marca}">        
         <div class="datos">
         <h3>${auto.marca}</h3>
         <span>${auto.modelo}</span>
         <span>${auto.año}</span>
         <br>
         <small>
          ${auto.motor.potencia}, 
          ${auto.motor.kilometraje}, 
          ${auto.motor.desplazamiento}
         </small>
        </div>
       </div>
      `;
     }
    }
    fichas.innerHTML = html;
   }).catch(err => console.error(err));
  }
}

window.onload = function(){
 app.cargarFichas();
}