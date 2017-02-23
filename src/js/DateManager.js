var $ = require("jquery");
var moment = require("moment");
require('moment/locale/es');
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

        var elements = $("time");
        var now = moment();
        var origin = now.format();
        for (var i=0; i<elements.length; i++) {
            var datePub = moment($(elements[i]).attr("datetime"))
            var html = this.comparaFechas(datePub.format(), origin);
            $(elements[i]).html(html);
        }

    }, 

    comparaFechas: function(fecha, origen) {
        var delta = moment(origen).diff(moment(fecha));
        if (delta < this.minuto) {
            return "Hace " + delta / this.segundo +" seg.";
        } else if (delta < this.hora) {
            var formatDelta = moment(delta);
            return "Hace " + moment(delta).format("m")+ " min.";
        } else if (delta < this.dia) {
            return "Hace " + moment(delta).format("h")+" h.";
        } else if (delta < this.semana) {
            return "El pasado " + moment(fecha).format("dddd");
        } else {
            return moment(fecha).format("DD/MM/YYYY hh:mm:ss A");
        }
    }
}

module.exports = dateManager;