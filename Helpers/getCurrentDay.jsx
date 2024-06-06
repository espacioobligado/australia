export const getCurrentDay = () => {
    let fechaActual = new Date();
    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    var dia = fechaActual.getDate();
    var mes = meses[fechaActual.getMonth()];
    var fechaFormateada = dia + " de " + mes;

    return fechaFormateada;
};