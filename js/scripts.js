document.querySelector("#agregar").addEventListener("click",function(e){
e.preventDefault();

let nombre=document.querySelector("#nombre");
let nota=document.querySelector("#nota");

/*lo siguiente es para crear el tr td y el boton para eliminar alumnos en la tabla*/ 

/*tabla de nombre*/

let tr=document.createElement("tr");
let tdNombre=document.createElement("td");
let txt=document.createTextNode(nombre.value);
tdNombre.appendChild(txt);
tdNombre.className="nombre";

/*tabla de nota */

let tdNota=document.createElement("td");
txt=document.createTextNode(nota.value);
tdNota.appendChild(txt);
tdNota.className="right";

/*para agregar el boton de eliminar alumno de la lista*/
let tdRemove=document.createElement("td");
let buttonRemove=document.createElement("input")
buttonRemove.type="button";
buttonRemove.value="Eliminar";
buttonRemove.onclick=function(){
this.parentElement.parentElement.remove();
calculos();
};
tdRemove.appendChild(buttonRemove);
tr.appendChild(tdNombre);
tr.appendChild(tdNota);
tr.appendChild(tdRemove);

let tbody=document.getElementById("listado").querySelector("tbody").appendChild(tr);
document.getElementById("listado").classList.remove("hide");
document.getElementById("calculos").classList.remove("hide");
nota.value="";
nombre.value="";
nombre.focus();
calculos();
});

/*funcion para los calculos usando contenido de la tabla*/
function calculos(){
  /*Array con alumnos de tabla*/
    let alumnosAgregados=document.getElementById("listado").querySelector("tbody").querySelectorAll("tr");
  
  /*array de todos los alumnos aprobados, reprobados, mejor nota y peor nota*/
    let aprobados=[];
    let reprobados=[];
   
    let mejorNota=0;
  
    let peorNotaAlumnos=[];
    let peorNota=10;
  
    let mediaNota=0;
  
  /*bucle por cada uno de los alumnos*/
    for (let i=0;i<alumnosAgregados.length;i++){
  
      let tds=alumnosAgregados[i].getElementsByTagName('td');
  
  /*calculo mejor nota*/
  
      if(tds[1].innerHTML>mejorNota){
        mejorNotaAlumno=[tds[0].innerHTML];
        mejorNota=tds[1].innerHTML;
      }else if(tds[1].innerHTML==mejorNota){
        mejorNotaAlumno.push(tds[0].innerHTML);
      }
  
  /*peor nota*/
      if(tds[1].innerHTML<peorNota) {
        peorNotaAlumnos=[tds[0].innerHTML];
        peorNota=tds[1].innerHTML;
      }else if(tds[1].innerHTML==peorNota){
        peorNotaAlumnos.push(tds[0].innerHTML);
      }
  
  /*aprobados y reprobados*/
      if(tds[1].innerHTML>=4) {
        aprobados.push(tds[0].innerHTML);
      }else{
        reprobados.push(tds[0].innerHTML);
      }
  }
  
  /*resultados*/
  let result="<div>La mejor nota es de: <span> "+mejorNotaAlumno+" ("+mejorNota+")</span></div>";
  result+="<div>La peor nota es de: <span> "+peorNotaAlumnos+" ("+peorNota+")</span></div>";
  result+="<div>Los aprobados son: <span> "+aprobados+"</span></div>";
  result+="<div>Los reprobados son: <span> "+reprobados+"</span></div>";
  result+="<div>El promedio de aprobados es: <span> "+(aprobados.length*100/alumnosAgregados.length)+"%</span></div>";
  document.getElementById("calculos").innerHTML=result;
  
}  