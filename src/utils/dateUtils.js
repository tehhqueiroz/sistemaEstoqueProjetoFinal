// Função para corrigir a data vinda do banco de dados (no formato 'YYYY-MM-DD')
const parseDateBd = (dataSring) =>{
    let [ano, mes, dia] = dataSring.split('-');
    ano = parseInt(ano);
    mes = parseInt(mes);
    dia = parseInt(dia);

    return new Date(ano, mes - 1, dia + 1);
}

const parseTimeBd = (time) => {
    let horas = parseInt(time.getHours()) + 3;
    let minutos = parseInt(time.getMinutes());
    let segundos = parseInt(time.getSeconds());

    horas = horas < 10 ? '0' + horas : horas;
    minutos = minutos < 10 ? '0' + minutos : minutos;
    segundos = segundos < 10 ? '0' + segundos : segundos;

    return `${horas}:${minutos}:${segundos}`;

}

module.exports = {parseDateBd, parseTimeBd};