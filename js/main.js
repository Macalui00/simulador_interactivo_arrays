
class LibroDiario{

    //Metodo Constructor
    constructor(mes, ingresos, egresos){
        this.mes = mes;
        this.ingresos = ingresos;
        this.egresos = egresos;
    }

    calcularBalance(){
        this.balance = this.ingresos.total - this.egresos.total;
    }

    analisisBalance(analisisOK, analisisNOTOK){
        return (this.balance < 0) ? analisisNOTOK : analisisOK; 
    }
    
}

function calcularBalance(){

    //Definimos las variables para los resultados del analisis
    let analisisOK = "¡Felicidades! Usted esta manejando bien sus finanzas.",
    analisisNOTOK = "¡Ups! Usted esta gastando más de lo que percibe, tiene que empezar a cuidar sus gastos.";

    const mesesAnio = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

    //Definimos ingresos, egresos y el balance
    const lD = new LibroDiario(calcularMes(mesesAnio), obtenerIngresos(), obtenerEgresos());
    lD.calcularBalance();

    //Armamos los listados finales de ingresos y egresos
    const listadoIngresos = armarListado(lD.ingresos.listadoDsp, lD.ingresos.listadoMontos);
    const listadoEgresos = armarListado(lD.egresos.listadoDsp, lD.egresos.listadoMontos);

    //Retornamos resultados por pantalla
    alert("Ingresos "+lD.mes+": " + lD.ingresos.total + ".\nEgresos "+lD.mes+": " + lD.egresos.total + '.');
    alert("Listado Ingresos "+lD.mes+":\n" + listadoIngresos.join("\n"));
    alert("Listado Egresos "+lD.mes+":\n" + listadoEgresos.join("\n"));
    alert("El balance final es: " + lD.balance + "\n" + analisisBalance(analisisOK, analisisNOTOK));

}

function calcularMes(mesesAnio){
    let mes = prompt("Por favor ingrese el mes a analizar.");
    while(!mesesAnio.includes(mes.toLowerCase())){
        mes = prompt("Valor Erroneo. Por favor ingrese el mes a analizar.");
    }
    return mes;
}

function armarListado(listadoDsp, listadoMontos){
    const listado = [];

    if (listadoDsp.length == listadoMontos.length){
        for(let i = 0; i < listadoMontos.length; i++){
            listado.push(listadoDsp[i] + ": "+ listadoMontos[i]);
        }        
    }

    return listado;
}

function obtenerIngresos(){

    //Declaramos las variables a utilizar dentro de la función
    let continuar = 'S', ingreso = 0, descripcion = "", total = 0;
    const listadoIng = [], listadoDsp = [];

    //Mientras el usuario quiera continuar introduciendo ingresos:
    while(continuar.toUpperCase() == "S"){

        //Solicitamos nombre o descripción del ingreso, y el monto del mismo.
        descripcion = prompt("Ingrese nombre/descripción del ingreso. Ej: Salario, Plus Feriado, Vacaciones, etc.");
        ingreso = parseFloat(prompt("Ingrese el monto del ingreso en cuestión como valor positivo (>0)."));
        //El ingreso debe ser positivo (mayor a 0).
        ingreso = chequeoErroresMonto(ingreso, "Ingreso Incorrecto. El ingreso debe ser mayor a 0.");

        //Insertamos los elementos en las listas
        listadoDsp.push(descripcion);
        listadoIng.push(ingreso);

        //chequeamos que el usuario quiera seguir introduciendo ingresos
        continuar = chequeoErroresCont(continuar,"¿Desea continuar ingresando Ingresos? S/N");

    }

    //Calculamos el total
    total = calcularTotal(listadoIng);

    //Retornamos un objeto con el listado de ingresos y el total
    return {listadoDsp: listadoDsp, listadoMontos: listadoIng, total: total};

}

function obtenerEgresos(){
    
    //Declaramos las variables a utilizar dentro de la función
    let continuar = 'S', egreso = 0, descripcion = "", total = 0;
    const listadoEgr = [], listadoDsp = [];
    
    //Mientras el usuario quiera continuar introduciendo egresos:
    while(continuar.toUpperCase() == "S"){
        
        //Solicitamos nombre o descripción del egreso, y el monto del mismo.
        descripcion = prompt("Ingrese nombre/descripción del egreso. Ej: Compras, Regalo, Comidas, etc.");
        egreso = parseFloat(prompt("Ingrese el monto del egreso en cuestión como valor positivo (>0)."));
        //Se chequea que el egreso sea mayor a cero
        egreso = chequeoErroresMonto(egreso, "Egreso Incorrecto. El egreso debe ser mayor a 0."); 

        //Calculamos el total y el listado de egresos.
        listadoDsp.push(descripcion)
        listadoEgr.push(egreso);

        //chequeamos que el usuario quiera seguir introduciendo egresos
        continuar = chequeoErroresCont(continuar,"¿Desea continuar ingresando Egresos? S/N");

    }

    //Calcular total de egresos
    total = calcularTotal(listadoEgr);

    //Retornamos un objeto con el listado de egresis y el total
    return {listadoDsp: listadoDsp,listadoMontos: listadoEgr, total: total};

}

function calcularTotal(listado){
    let total = 0;
    //Calculamos el total
    for(let i = 0; i < listado.length; i++){
        total = total + listado[i];
    }
    return total
}

function chequeoErroresMonto(valor, mensajePrompt){
    
    // Chequea si el valor ingresado por el usuario es mayor a cero
    while(valor < 0){

        valor =  parseFloat(prompt(mensajePrompt));

    }

    return valor;
}

function chequeoErroresCont(continuar,  mensajePrompt){

    continuar = prompt(mensajePrompt);

    // Chequea si el valor ingresado por el usuario es correcto
    while((continuar.toUpperCase() != "S") && (continuar.toUpperCase() != "N")){

        continuar = prompt("Respuesta incorrecta " + mensajePrompt);

    }

    return continuar;
}


//Ahora vamos a la ejecución de todo:
let continuar = 'S';

alert("Bienvenido al calculador de balances para cuidar tu salud financiera. A continuación se le solicitaran sus ingresos y luego sus egresos.");

//Mientras el usuario quiera continuar:
while(continuar.toUpperCase() == "S"){

    calcularBalance();

    //chequeamos que el usuario quiera seguir calculando balances
    continuar = chequeoErroresCont(continuar,"¿Desea calcular otro balance? S/N");

}

// Agregado simplemente como un saludo final
if(continuar.toUpperCase() == "N"){

    alert("¡Muchas gracias! ¡Hasta Luego!");

}