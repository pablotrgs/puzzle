var dificultad = 1;
var imagen;
var imgData;
var color;
var piezasPuzzle;
var numPieza;
var piezaSeleccionada=-1;
var piezaAcambiar;
var w;
var imagenpuesta = false;
var iniciado = false;
var movs = 0;
var colMarcada;
var filaMarcada;
var col1;
var fil1 ;
var aciertos;
var cuantosFaltan;
var counter;
var n = 0;
var bolayuda = false;


function inicializarPiezasPuzzle() {


	if (dificultad ==1) {
		piezasPuzzle = new Array(6);
			for(var i=0;i<6;i++){
				piezasPuzzle[i] = new Array(4);
			}
		for(var i=0;i<6;i++){
			for(var j=0;j<4;j++){
				piezasPuzzle[i][j]=-1;
			}
		}
	}else if (dificultad == 2){
				piezasPuzzle = new Array(9);
			for(var i=0;i<9;i++){
				piezasPuzzle[i] = new Array(6);
			}
		for(var i=0;i<9;i++){
			for(var j=0;j<6;j++){
				piezasPuzzle[i][j]=-1;
			}
		}
	}else if (dificultad == 3){
				piezasPuzzle = new Array(12);
			for(var i=0;i<12;i++){
				piezasPuzzle[i] = new Array(8);
			}
		for(var i=0;i<12;i++){
			for(var j=0;j<8;j++){
				piezasPuzzle[i][j]=-1;
			}
		}
	}
}

function movimientoraton() {

	canvas = document.getElementById("my-canvas2"),
	context2 = canvas.getContext("2d"),
	canvas.onmousemove = function(e) {
	if(bolayuda == true){
		dibujaCuadricula();
		bolayuda = false;
	}

	  	// important: correct mouse position:
	  	var rect = this.getBoundingClientRect(),
			x = e.clientX - rect.left,
			y = e.clientY - rect.top,
			i = 0, r;
		var tam;

		if(dificultad == 1){
			tam = 60;
			var fila = Math.trunc(y/60);
			var col = Math.trunc(x/60);
		}
		else if (dificultad == 2) {
			tam = 40;
			var fila = Math.trunc(y/40);
			var col = Math.trunc(x/40);
		}
		else if (dificultad == 3) {
			tam = 30;
			var fila = Math.trunc(y/30);
			var col = Math.trunc(x/30);
		}

		if(col != col1  || fila != fil1){
			if(col1==colMarcada && fil1 ==filaMarcada){
				context2.strokeStyle = 'red';
				context2.strokeRect(colMarcada*tam+1, filaMarcada*tam+1, tam, tam);
			}else {

				context2.strokeStyle = color;
				context2.strokeRect(col1*tam+1, fil1*tam+1, tam, tam);

				if (colMarcada == col1+1 && filaMarcada == fil1) {
					context2.strokeStyle = 'red';
					context2.strokeRect(colMarcada*tam+1, filaMarcada*tam, 0, tam+2);
				}

				if (colMarcada == col1-1 && filaMarcada == fil1) {
					context2.strokeStyle = 'red';
					context2.strokeRect((colMarcada*tam+1)+tam, filaMarcada*tam, 0, tam+2);
				}

				if (colMarcada == col1 && filaMarcada == fil1+1) {
					context2.strokeStyle = 'red';
					context2.strokeRect(colMarcada*tam, (filaMarcada*tam+1), tam+2, 0);

				}

				if (colMarcada == col1 && filaMarcada == fil1-1) {
					context2.strokeStyle = 'red';
					context2.strokeRect(colMarcada*tam, (filaMarcada*tam+1)+tam, tam+2, 0 );

				}

			}


	}
	context2.strokeStyle = 'green';
	context2.strokeRect(col*tam+1, fila*tam+1, tam, tam);
	col1= col;
	 fil1 = fila;
	};

}

function iniciar(){

	document.getElementById('botoniniciar').disabled= true;
	color = 'black';

	var canvas = document.getElementById("my-canvas"),
		context = canvas.getContext("2d"),
		canvas2 = document.getElementById("my-canvas2"),
		context2 = canvas2.getContext("2d"),
		img = document.createElement("img"),
			//mouseDown = false,
			//brushColor = "rgb(0, 0, 0)",
			hasText = true,
			clearCanvas = function () {
				if (hasText) {
					context.clearRect(0, 0, canvas.width, canvas.height);
					hasText = false;
				}
			};

	//Instrucciones
	context.fillText("Haz click en Seleccionar archivo o arrastra una imagen aquí", 40, 120);

	// Imagen desde explorador de archivos
	img.addEventListener("load", function () {
		document.getElementById('botoniniciar').disabled= false;

		imagenpuesta = true;
		context.drawImage(img, 0, 0, 360, 240);
		dibujaCuadricula();
	}, false);


	// Habilitar drag and drop
	canvas.addEventListener("dragover", function (evt) {
		evt.preventDefault();
	}, false);

	// guardo la imagen para que al salir del canvas arrastrando una imagen se borre el resalte de bordes
 	var imgData2=context.getImageData(0,0,360,240);
 	// Resaltar bordes cuando la imagen arrastrada entra al canvas imagen
 	canvas.addEventListener("dragenter", function(evt){
	 context.lineWidth=20;
	 context.strokeStyle="#7FFF00";
	 context.strokeRect(0,0,360,240);

 	}, false);

 	canvas.addEventListener("dragleave", function(evt){
		 context.putImageData(imgData2,0,0);

 	}, false);


	// Handle dropped image file - only Firefox and Google Chrome
	canvas.addEventListener("drop", function (evt) {
		var files = evt.dataTransfer.files;
		if (files.length > 0) {
			var file = files[0];
			if (typeof FileReader !== "undefined" && file.type.indexOf("image") != -1) {
				var reader = new FileReader();
				// Note: addEventListener doesn't work in Google Chrome for this event
				reader.onload = function (evt) {
					img.src = evt.target.result;
				};
				reader.readAsDataURL(file);
			}
		}
		evt.preventDefault();
	}, false);

	// Seleccionar archivo a cargar de nuestro ordenador(llama a la funcion handleFiles)
	var input = document.getElementById('input');
	input.addEventListener('change', handleFiles, false);
}

// función que permite cargar el archivo en el canvas desde el explorador de archivos
function handleFiles(e) {
    var ctx = document.getElementById('my-canvas').getContext('2d');
    var ctx2 = document.getElementById('my-canvas2').getContext('2d');
    var canvas = document.getElementById("my-canvas");

    var reader  = new FileReader();
    var file = e.target.files[0];
    // load to image to get it's width/height
    var img = new Image();
    img.onload = function() {
			document.getElementById('botoniniciar').disabled= false;

				imagenpuesta = true;
        ctx.drawImage(img, 0, 0, 360, 240);
				dibujaCuadricula();
    }
    // this is to setup loading the image
    reader.onloadend = function () {
        img.src = reader.result;
    }
    // this is to read the file
    reader.readAsDataURL(file);
}

function desordenarArray(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function colocarClick(event){

	var canvas = document.getElementById("my-canvas2");
	var ctx = canvas.getContext('2d');
	var rect = canvas.getBoundingClientRect();
	var x =event.clientX - rect.left;
	var y = event.clientY - rect.top;

	if (dificultad == 1) {
		var fila = Math.trunc(y/60);
		var col = Math.trunc(x/60);

		if(piezaSeleccionada!=-1){
				var dentro =false;
				var pieza2 =-1;
				var k =0;
				var r =0;
				var pieza = numPieza[piezaSeleccionada];
				if(piezasPuzzle[col][fila]!=-1)	{
					pieza2 = piezasPuzzle[col][fila];
				}
				for(var i =0; i<piezasPuzzle.length;i++){
					for(var j =0; j<piezasPuzzle[i].length;j++){
						if(pieza == piezasPuzzle[i][j] && piezasPuzzle[i][j]!=-1){
							k=i;
							r=j;
							if(pieza2==-1){
								var iaux = ctx.createImageData(60,60);
								ctx.putImageData(iaux,i*60,j*60);
								piezasPuzzle[col][fila]= piezasPuzzle[i][j];
								piezasPuzzle[i][j]=-1;
							}
							dibujaCuadricula();
							dentro = true;
						}
					}
				}
			if(piezasPuzzle[col][fila]==-1 || dentro){
				if(dentro){
					var cambios = ctx.getImageData(col*60,fila*60,60,60);
					ctx.putImageData(ctx.getImageData(colMarcada*60,filaMarcada*60,60,60),col*60,fila*60);
					if(pieza2!=-1){
						ctx.putImageData(cambios,colMarcada*60,filaMarcada*60);
						piezasPuzzle[col][fila] = pieza;
						piezasPuzzle[k][r] = pieza2;
					}
					piezasPuzzle[col][fila] = pieza;
				}
				piezaSeleccionada=-1;
				movs++;
				document.getElementById("movs").innerHTML =movs;
				colMarcada = null;
				filaMarcada = null;
			}
			else {
				console.log(window.innerWidth);
				var ancho = (window.innerWidth/2)-90;
				console.log(ancho);
				document.getElementById("centrar").style.pointerEvents = "none";
				document.getElementById("ocupado").style.pointerEvents = "auto";
				document.getElementById("ocupado").style.left =ancho + 'px';
			}
		}
		else {
				if(piezasPuzzle[col][fila]!=-1){
					marcarPieza(piezasPuzzle[col][fila]);
					colMarcada = col;
					filaMarcada = fila;
					var marcada = piezasPuzzle[col][fila];
					ctx.lineWidth = 3;
					ctx.strokeStyle = "red";
					ctx.strokeRect(col*60+1, fila*60+1, 60, 60);
				}
			}
	}else if (dificultad == 2){
		var fila = Math.trunc(y/40);
		var col = Math.trunc(x/40);

		if(piezaSeleccionada!=-1){
				var dentro =false;
				var pieza2 =-1;
				var k =0;
				var r =0;
				var pieza = numPieza[piezaSeleccionada];
				if(piezasPuzzle[col][fila]!=-1)	{
					pieza2 = piezasPuzzle[col][fila];
				}
				for(var i =0; i<piezasPuzzle.length;i++){
					for(var j =0; j<piezasPuzzle[i].length;j++){
						if(pieza == piezasPuzzle[i][j] && piezasPuzzle[i][j]!=-1){
							k=i;
							r=j;
							if(pieza2==-1){
								var iaux = ctx.createImageData(40,40);
								ctx.putImageData(iaux,i*40,j*40);
								piezasPuzzle[col][fila]= piezasPuzzle[i][j];
								piezasPuzzle[i][j]=-1;
							}
							dibujaCuadricula();
							dentro = true;
						}
					}
				}
			if(piezasPuzzle[col][fila]==-1 || dentro){
				if(dentro){
					var cambios = ctx.getImageData(col*40,fila*40,40,40);
					ctx.putImageData(ctx.getImageData(colMarcada*40,filaMarcada*40,40,40),col*40,fila*40);
					if(pieza2!=-1){
						ctx.putImageData(cambios,colMarcada*40,filaMarcada*40);
						piezasPuzzle[col][fila] = pieza;
						piezasPuzzle[k][r] = pieza2;
					}
					piezasPuzzle[col][fila] = pieza;
				}
				piezaSeleccionada=-1;
				movs++;
				document.getElementById("movs").innerHTML =movs;
				colMarcada = null;
				filaMarcada = null;
			}
			else {
				console.log(window.innerWidth);
				var ancho = (window.innerWidth/2)-90;
				console.log(ancho);
				document.getElementById("centrar").style.pointerEvents = "none";
				document.getElementById("ocupado").style.pointerEvents = "auto";
				document.getElementById("ocupado").style.left =ancho + 'px';
			}
		}
		else {
				if(piezasPuzzle[col][fila]!=-1){
					marcarPieza(piezasPuzzle[col][fila]);
					colMarcada = col;
					filaMarcada = fila;
					var marcada = piezasPuzzle[col][fila];
					ctx.lineWidth = 3;
					ctx.strokeStyle = "red";
					ctx.strokeRect(col*40+1, fila*40+1, 40, 40);
				}
			}
	}else if (dificultad == 3){
		var fila = Math.trunc(y/30);
		var col = Math.trunc(x/30);

		if(piezaSeleccionada!=-1){
				var dentro =false;
				var pieza2 =-1;
				var k =0;
				var r =0;
				var pieza = numPieza[piezaSeleccionada];
				if(piezasPuzzle[col][fila]!=-1)	{
					pieza2 = piezasPuzzle[col][fila];
				}
				for(var i =0; i<piezasPuzzle.length;i++){
					for(var j =0; j<piezasPuzzle[i].length;j++){
						if(pieza == piezasPuzzle[i][j] && piezasPuzzle[i][j]!=-1){
							k=i;
							r=j;
							if(pieza2==-1){
								var iaux = ctx.createImageData(30,30);
								ctx.putImageData(iaux,i*30,j*30);
								piezasPuzzle[col][fila]= piezasPuzzle[i][j];
								piezasPuzzle[i][j]=-1;
							}
							dibujaCuadricula();
							dentro = true;
						}
					}
				}
			if(piezasPuzzle[col][fila]==-1 || dentro){
				if(dentro){
					var cambios = ctx.getImageData(col*30,fila*30,30,30);
					ctx.putImageData(ctx.getImageData(colMarcada*30,filaMarcada*30,30,30),col*30,fila*30);
					if(pieza2!=-1){
						ctx.putImageData(cambios,colMarcada*30,filaMarcada*30);
						piezasPuzzle[col][fila] = pieza;
						piezasPuzzle[k][r] = pieza2;
					}
					piezasPuzzle[col][fila] = pieza;
				}
				piezaSeleccionada=-1;
				movs++;
				document.getElementById("movs").innerHTML =movs;
				colMarcada = null;
				filaMarcada = null;
			}
			else {
				console.log(window.innerWidth);
				var ancho = (window.innerWidth/2)-90;
				console.log(ancho);
				document.getElementById("centrar").style.pointerEvents = "none";
				document.getElementById("ocupado").style.pointerEvents = "auto";
				document.getElementById("ocupado").style.left =ancho + 'px';
			}
		}
		else {
				if(piezasPuzzle[col][fila]!=-1){
					marcarPieza(piezasPuzzle[col][fila]);
					colMarcada = col;
					filaMarcada = fila;
					var marcada = piezasPuzzle[col][fila];
					ctx.lineWidth = 3;
					ctx.strokeStyle = "red";
					ctx.strokeRect(col*30+1, fila*30+1, 30, 30);
				}
			}
	}

	aciertos = 0;
	cuantosFaltan = 0;
		for(var i =0; i<piezasPuzzle.length;i++){
			for(var j =0; j<piezasPuzzle[i].length;j++){
					if (piezasPuzzle [i] [j] == document.getElementById( i + ',' + j)){
							aciertos++;
					}
					else {
						cuantosFaltan++;
					}
				}
		}


	var ancho = (window.innerWidth/2)-133;


	if (aciertos == 24 && dificultad == 1){
				document.getElementById("centrar").style.pointerEvents = "none";
				document.getElementById("fin").style.pointerEvents = "auto";
				document.getElementById("fin").style.left =ancho + 'px';
	} else if (aciertos == 54 && dificultad == 2){
				document.getElementById("centrar").style.pointerEvents = "none";
				document.getElementById("fin").style.pointerEvents = "auto";
				document.getElementById("fin").style.left =ancho + 'px';
	} else if (aciertos == 96 && dificultad == 3){
				document.getElementById("centrar").style.pointerEvents = "none";
				document.getElementById("fin").style.pointerEvents = "auto";
				document.getElementById("fin").style.left =ancho + 'px';
	}
}

function marcarPieza(pieza){

	if (dificultad ==1) {
		for(var i=0;i<24;i++){
			if(pieza==numPieza[i]){
				if(piezaSeleccionada == i){
					piezaSeleccionada =-1; //deja de seleccionar
				}
				else {
					piezaSeleccionada = i; //selecciona
				}
			}
			else{
				numPieza[i].classList.remove("bordeRojo"); //quita borde a todas
			}
		}
	}else  if (dificultad == 2){
		for(var i=0;i<54;i++){
			if(pieza==numPieza[i]){
				if(piezaSeleccionada == i){
					piezaSeleccionada =-1; //deja de seleccionar
				}
				else {
					piezaSeleccionada = i; //selecciona
				}
			}
			else{
				numPieza[i].classList.remove("bordeRojo"); //quita borde a todas
			}
		}
	}else if (dificultad == 3){
		for(var i=0;i<96;i++){
			if(pieza==numPieza[i]){
				if(piezaSeleccionada == i){
					piezaSeleccionada =-1; //deja de seleccionar
				}
				else {
					piezaSeleccionada = i; //selecciona
				}
			}
			else{
				numPieza[i].classList.remove("bordeRojo"); //quita borde a todas
			}
		}
	}
	pieza.classList.toggle('bordeRojo');
}

function comprobarAcertadas(){
	document.getElementById("my-canvas2").style.pointerEvents = "none"; //impide reaccionar al click

		aciertos = 0;
		cuantosFaltan = 0;
		for(var i =0; i<piezasPuzzle.length;i++){
			for(var j =0; j<piezasPuzzle[i].length;j++){
					if (piezasPuzzle [i] [j] == document.getElementById( i + ',' + j)){
							aciertos++;
					}
					else {
						cuantosFaltan++;
					}
				}
		}

		document.getElementById("acertos").innerHTML = aciertos;
		document.getElementById("falos").innerHTML = cuantosFaltan;
		var ancho = (window.innerWidth/2)-133;

		if (dificultad == 1) {

			if (aciertos == 24) {
				document.getElementById("centrar").style.pointerEvents = "none";
				document.getElementById("fin").style.pointerEvents = "auto";
				document.getElementById("fin").style.left =ancho + 'px';
			}
			else {

				if (aciertos <=8) {
					document.getElementById("mensaje").innerHTML = "Todavia falta!";
				}
				else if (aciertos <= 16) {
					document.getElementById("mensaje").innerHTML = "Casi lo tienes!";
				} else {
					document.getElementById("mensaje").innerHTML = "Falta muy poco!";
				}
				document.getElementById("centrar").style.pointerEvents = "none";
				document.getElementById("comprobar").style.pointerEvents = "auto";
				document.getElementById("comprobar").style.left =ancho + 'px';

			}
		} else if (dificultad == 2) {

			if (aciertos == 54) {
				document.getElementById("centrar").style.pointerEvents = "none";
				document.getElementById("fin").style.pointerEvents = "auto";
				document.getElementById("fin").style.left =ancho + 'px';
			}
			else {

				if (aciertos <=18) {
					document.getElementById("mensaje").innerHTML = "Todavia falta!";
				}
				else if (aciertos <= 36) {
					document.getElementById("mensaje").innerHTML = "Casi lo tienes!";
				} else {
					document.getElementById("mensaje").innerHTML = "Falta muy poco!";
				}
				document.getElementById("centrar").style.pointerEvents = "none";
				document.getElementById("comprobar").style.pointerEvents = "auto";
				document.getElementById("comprobar").style.left =ancho + 'px';

			}
		} else if (dificultad == 3){

			if (aciertos == 96) {
				document.getElementById("centrar").style.pointerEvents = "none";
				document.getElementById("fin").style.pointerEvents = "auto";
				document.getElementById("fin").style.left =ancho + 'px';
			}
			else {

				if (aciertos <=32) {
					document.getElementById("mensaje").innerHTML = "Todavia falta!";
				}
				else if (aciertos <= 64) {
					document.getElementById("mensaje").innerHTML = "Casi lo tienes!";
				} else {
					document.getElementById("mensaje").innerHTML = "Falta muy poco!";
				}
				document.getElementById("centrar").style.pointerEvents = "none";
				document.getElementById("comprobar").style.pointerEvents = "auto";
				document.getElementById("comprobar").style.left =ancho + 'px';

			}
		}

}

function crearArrayPiezas(){
	var canvas1 = document.getElementById("my-canvas");
  	var context1 = canvas1.getContext('2d');

	if (dificultad == 1){
		var section = document.getElementById('piezas');

		for(var i=0; i<6; i++)
		{
			for(var j=0; j<4; j++)
			{
				var canvasAux = document.createElement("div");
				canvasAux.setAttribute("id",i + ',' + j);
				numPieza.push(canvasAux);
			}
		}
		desordenarArray(numPieza);
		for(var i=0;i<24;i++){
			section.appendChild(numPieza[i]);
		}
	} else if (dificultad == 2) {
		var section = document.getElementById('piezas');

		for(var i=0; i<9; i++)
		{
			for(var j=0; j<6; j++)
			{
				var canvasAux = document.createElement("div");
				canvasAux.setAttribute("id",i + ',' + j);
				numPieza.push(canvasAux);
			}
		}
		desordenarArray(numPieza);
		for(var i=0;i<54;i++){
			section.appendChild(numPieza[i]);
		}
	} else if (dificultad == 3) {
		var section = document.getElementById('piezas');

		for(var i=0; i<12; i++)
		{
			for(var j=0; j<8; j++)
			{
				var canvasAux = document.createElement("div");
				canvasAux.setAttribute("id",i + ',' + j);
				numPieza.push(canvasAux);
			}
		}
		desordenarArray(numPieza);
		for(var i=0;i<96;i++){
			section.appendChild(numPieza[i]);
		}
	}
}

function rellenarPiezas(){
	var colpuz = 0;
	var filpuz = 0;
	numPieza = new Array();

  	var canvas1 = document.getElementById("my-canvas");
  	var context1 = canvas1.getContext('2d');

	var canvas = document.getElementById("my-canvas2");
	var context = canvas.getContext('2d');

  	imgData=context1.getImageData(0,0,360,240);

	var parteImagen;
	var section = document.getElementById('piezas');
	crearArrayPiezas();

	if (dificultad == 1) {
		var numeroPieza = 0;
		for(var i=0; i<6; i++)
		{
			for(var j=0; j<4; j++)
			{
				for(var r=0; r<6; r++)
				{
					for(var s=0; s<4; s++)
					{
						if (numPieza[numeroPieza] == document.getElementById( r + ',' + s)) {
							colpuz = r
							filpuz = s;
						}
					}
				}

				context.putImageData(context1.getImageData(colpuz*60,filpuz*60,60,60),i*60,j*60);

				piezasPuzzle[i][j] = numPieza[numeroPieza];
				numeroPieza ++;
			}
		}

	}else if (dificultad == 2){
		var numeroPieza = 0;
		for(var i=0; i<9; i++)
		{
			for(var j=0; j<6; j++)
			{
				for(var r=0; r<9; r++)
				{
					for(var s=0; s<6; s++)
					{
						if (numPieza[numeroPieza] == document.getElementById( r + ',' + s)) {
							colpuz = r;
							filpuz = s;
						}
					}
				}

				context.putImageData(context1.getImageData(colpuz*40,filpuz*40,40,40),i*40,j*40);

				piezasPuzzle[i][j] = numPieza[numeroPieza];
				numeroPieza ++;
			}
		}
	}else if (dificultad == 3){
		var numeroPieza = 0;
		for(var i=0; i<12; i++)
		{
			for(var j=0; j<8; j++)
			{
				for(var r=0; r<12; r++)
				{
					for(var s=0; s<8; s++)
					{
						if (numPieza[numeroPieza] == document.getElementById( r + ',' + s)) {
							colpuz = r
							filpuz = s;
						}
					}
				}

				context.putImageData(context1.getImageData(colpuz*30,filpuz*30,30,30),i*30,j*30);

				piezasPuzzle[i][j] = numPieza[numeroPieza];
				numeroPieza ++;
			}
		}
	}
	dibujaCuadricula();
}

function iniciarJuego(){
	 inicializarPiezasPuzzle();

	if (imagenpuesta == true) {
		document.getElementById('botoniniciar').disabled= true;
		document.getElementById('facil').disabled= true;
		document.getElementById('medio').disabled= true;
		document.getElementById('dificil').disabled= true;
		document.getElementById('botonlineas').disabled= true;
		document.getElementById('colorLineas').disabled= true;
		document.getElementById('comprueba').disabled= false;
		document.getElementById('botonfinalizar').disabled = false;
		document.getElementById('ayuda').disabled= false;

		var canvasAux = document.getElementById("my-canvas2");
		canvasAux.style.pointerEvents = "auto";

		canvasAux.setAttribute("onmousemove","movimientoraton()");

		iniciado = true;
		borracuadricula();
	  rellenarPiezas();
	}
	//iniciar contador
	n = 0;
	var l = document.getElementById("contador");
	counter = setInterval(function(){
	  l.innerHTML = n;
	  n++;
	},1000);
}

function setDificultad(num) {
  dificultad = num;
  dibujaCuadricula();
}

function setColor(){
  color = document.getElementById("colorLineas").value;
	dibujaCuadricula();
}

function borracuadricula(){
  var canvas = document.getElementById("my-canvas2");
  var context = canvas.getContext('2d');
  context.clearRect(0,0,360,240);
}
function borracuadricula2(){
  var canvas = document.getElementById("my-canvas");
  var context = canvas.getContext('2d');
  context.clearRect(0,0,360,240);
}

function dibujaCuadricula(num){
  	//document.getElementById('medio').disabled= true;
  	var canvas1 = document.getElementById("my-canvas");
  	var context1 = canvas1.getContext('2d');

	var canvas = document.getElementById("my-canvas2");
	var context = canvas.getContext('2d');
	context.lineWidth = 4;
  	imgData=context1.getImageData(0,0,360,240);


 	if (iniciado == false) {
	 borracuadricula();
	 context.putImageData(imgData,0,0);
 	}
	if (imagenpuesta == false) {
	borracuadricula();

	}

  	context.beginPath();
	context.strokeStyle = color;

	if (dificultad == 1) {
			for(i=2; i<360; i=i+60)
			{
				context.moveTo(i,0);
				context.lineTo(i,240);
			}

			for(i=2; i<240; i=i+60)
			{
				context.moveTo(0,i);
				context.lineTo(360,i);
			}

	}
	else if (dificultad == 2){
			for(i=2; i<360; i=i+40)
			{
				context.moveTo(i,0);
				context.lineTo(i,240);
			}
			for(i=2; i<240; i=i+40)
			{
				context.moveTo(0,i);
				context.lineTo(360,i);
			}
	} else if (dificultad == 3){
			for(i=2; i<360; i=i+30)
			{
				context.moveTo(i,0);
				context.lineTo(i,240);
			}
			for(i=2; i<240; i=i+30)
			{
				context.moveTo(0,i);
				context.lineTo(360,i);
			}
	}

	//Esto es para dibujar la última linea que no se dibuja con el for
	context.moveTo(358,0);
	context.lineTo(358,240);

	//Esto es para dibujar la última linea que no se dibuja con el for
	context.moveTo(0,238);
	context.lineTo(360,238);
  	context.closePath();


	context.stroke();
}


function comprobar(){
		var canvasAux = document.getElementById("my-canvas2");
		canvasAux.style.pointerEvents = "auto";

		canvasAux.setAttribute("onmousemove","movimientoraton()");
		document.getElementById("comprobar").style.left ="-1500px";
		document.getElementById("centrar").style.pointerEvents = "auto";
}

function ayuda(){
	var canvas = document.getElementById("my-canvas2");
	var context = canvas.getContext('2d');

	context.lineWidth = 2;
	context.strokeStyle = "blue";
	for(var i =0; i<piezasPuzzle.length;i++){
		for(var j =0; j<piezasPuzzle[i].length;j++){
			if (piezasPuzzle [i] [j] != document.getElementById( i + ',' + j)){
				if(dificultad == 1){
					context.strokeRect(i*60+1, j*60+1, 60, 60);
				}
				else if (dificultad == 2) {
					context.strokeRect(i*40+1, j*40+1, 40, 40);

				}
				else if (dificultad == 3) {
					context.strokeRect(i*30+1, j*30+1, 30, 30);

				}
			}
		}
	}
	bolayuda = true;
}

function reiniciar() {
	borracuadricula();
	borracuadricula2();
	iniciar();
	document.getElementById("fin").style.left ="-1500px";
	document.getElementById("finjuego").style.left = "-1500px";
	document.getElementById("centrar").style.pointerEvents = "auto";
	document.getElementById("comprueba").disabled = true;
	document.getElementById("ayuda").disabled = true;
	iniciado = false;
	borrarArrayPiezas();
		imagenpuesta = false;



	//iniciar contador
	n = 0;
	var l = document.getElementById("contador");
	counter = setInterval(function(){
	  l.innerHTML = n;
	  n++;
	},1000);

}


//finalizar partida
function finalizar(){
	document.getElementById("my-canvas2").style.pointerEvents = "none"; //impide reaccionar al click

	//usado el codigo de comprobarAcertadas()
	aciertos = 0;
	cuantosFaltan = 0;
	for(var i =0; i<piezasPuzzle.length;i++){
		for(var j =0; j<piezasPuzzle[i].length;j++){
			if (piezasPuzzle [i] [j] == document.getElementById( i + ',' + j)){
					aciertos++;
			}
			else {
				cuantosFaltan++;
			}
		}
	}

	document.getElementById("acertos").innerHTML = aciertos;
	document.getElementById("falos").innerHTML = cuantosFaltan;
	var ancho = (window.innerWidth/2)-133;

	document.getElementById("centrar").style.pointerEvents = "none";
	document.getElementById("finjuego").style.pointerEvents = "auto";
	document.getElementById("finjuego").style.left =ancho + 'px';
	document.getElementById("mensaje2").innerHTML = "Faltan "+ cuantosFaltan + " piezas por colocar y has empleado " + n + " segundos";

	//detener contador
	clearInterval(counter);
}
function borrarArrayPiezas(){

		var section = document.getElementById('piezas');

		if (dificultad == 1) {
			for(var i=0;i<24;i++){
				section.removeChild(numPieza[i]);
			}

			for(var i=0; i<6; i++)
			{
				for(var j=0; j<4; j++)
				{
					document.getElementById("id",i + ',' + j).remove();

				}
			}
		} else if (dificultad == 2) {
			for(var i=0;i<54;i++){
				section.removeChild(numPieza[i]);
			}

			for(var i=0; i<9; i++)
			{
				for(var j=0; j<6; j++)
				{
					document.getElementById("id",i + ',' + j).remove();

				}
			}
		} else if (dificultad == 3) {
			for(var i=0;i<96;i++){
				section.removeChild(numPieza[i]);
			}

			for(var i=0; i<12; i++)
			{
				for(var j=0; j<8; j++)
				{
					document.getElementById("id",i + ',' + j).remove();

				}
			}
		}

}