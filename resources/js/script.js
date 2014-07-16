//Carga notas al cargar la pagina
window.onload = shownotes;


/*
trigger newnote : boton para agregar tarea nueva
trigger addnote : boton para enviar nota
trigger delall : boton para eliminar todas
*/
window.onhashchange = function () {
   if(location.hash == "#newnote")
   		document.getElementById("taskcreator").style.display = "block";
   else if(location.hash == "#addnote")
   		addnote();
   else if(location.hash == "#delall")
   		delall();

   location.hash = "";
};


//Declaracion del objeto Tarea
var tarea = function (titulo,descripcion,done) {
	this.titulo = titulo;
	this.descripcion = descripcion;
	this.done = done;
};

// arreglo para almacenar la lista de tareas
var tareas = [];

//init instructions!
tareas.push(new tarea("agregar tarea","Para agregar tarea click el boton de arriba", false));
tareas.push(new tarea("Marcar como listo","Para marcar la tarea como realizado, dale click a una tarea incompleta", false));
tareas.push(new tarea("Tarea realizada","ejemplo de tarea realizada", true));
tareas.push(new tarea("Eliminar tarea","Para eliminar una tarea, dale click a una tarea realizada (subrayada)", false));
tareas.push(new tarea("Desarrollado por:","Gerard Enrique <br>ZerK(ElPlayer)", false));

//function addnote()
/*
-selecciona el titulo y la descripcion
-verifica que los campos no esten vacios
-crea el objeto tarea
-lo agrega a la lista tareas
-oculta el agregador de tareas
-borra los campos
*/
function addnote() {
	var titulo = document.getElementById('titulo');
	var desc = document.getElementById('desc');

	if(titulo.value != "" || desc.value != "") {
	   tareas.push(new tarea(titulo.value, desc.value, false));

	   shownotes();

	   document.getElementById("taskcreator").style.display = "none";

	   titulo.value = "";
	   desc.value = "";
	} else
		alert("debe ingresar titulo y descripcion de la tarea");
}

//function delnote()
/*
elimina o marca como realizada una nota utilizando el elemento y el index de la nota 
*/
function delnote(e, note){
	if(tareas[note].done){
		if(confirm("Deseas eliminar esta tarea?")){
		   e.parentNode.parentNode.removeChild(e.parentNode);
			tareas.splice(note, 1);
			shownotes();
		}
	} else{
		if(confirm("Deseas marcar esta tarea como realizada?")){
			tareas[note].done = true;
			shownotes();
		}
	}
}

//function delall()
/*
elimina todas las tareas 
*/
function delall(){
	if(confirm("Deseas borrar todas las tareas?")) {
		tareas = [];
		shownotes();
	}
}

//agregar tareas al DOM 
function shownotes() {
	var results = "";

	for(var i in tareas)
		results += " <li><a href=\"#\" onclick=\"delnote(this,"+i+");\"><h2 "+(tareas[i].done ? "class=\"sub\"" : "")+">"+ tareas[i].titulo+"</h2><p "+(tareas[i].done ? "class=\"sub\"" : "")+">"+ tareas[i].descripcion+ "</p></a></li>";

		document.getElementById('taskcontainer').innerHTML = results;
}
