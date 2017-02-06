var $ = require("jquery");
var moment = require("moment");
moment.locale('es');


var dateManager = {
    segundo: 1000,
    minuto: 60000,
    hora: 3600000,
    dia : 86400000,
    semana : 604800000,
    timeGaps: [
        [30, "s"], 
        [2, "m"], 
        [8, "h"], 
        [4, "d"], 
        [11, "d"], 
        [3, "w"], 
        [5, "w"], 
        [2, "M"], 
        [6, "M"], 
        [2, "Y"]
    ],
    actualizaFechas: function() {

        var elements = $("p.date");
        var now = moment();
        var origin = now.format();
        for (var i=0; i<elements.length; i++) {
            now.subtract(this.timeGaps[i][0], this.timeGaps[i][1]);
            var html = this.comparaFechas(now.format(), origin);
            $(elements[i]).html(html);
        }

    }, 

    comparaFechas: function(fecha, origen) {
        var delta = moment(origen).diff(moment(fecha));        
        if (delta < this.minuto) {
            return moment(delta).format("s")+" seconds Ago";
        } else if (delta < this.hora) {
            return moment(delta).format("m")+ "minutes Ago";
        } else if (delta < this.dia) {
            return moment(delta).format("h")+" hours Ago";
        } else if (delta < this.semana) {
            return "last " + moment(fecha).format("dddd");
        } else {
            return moment(fecha).format("DD/MM/YYYY hh:mm:ss A");
        }
    }
}

module.exports = dateManager;