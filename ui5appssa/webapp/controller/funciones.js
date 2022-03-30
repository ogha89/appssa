sap.ui.define([
  'sap/m/MessageBox'
], function (MessageBox) {
  "use strict";

  var Formato = {
    fnAjaxGet: function(texto){
      var resultado;
      $.ajax(texto, {
        type: 'GET',
        dataType: "json",
        async: false,
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        complete: function (xhr) {},
        success: function (response) {
          resultado = response.d.results;
        },
        error: function (response) {
          console.log(response);
        }
      });
      return resultado;
    },
    fnCalcularFechaActual: function () {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      dd = (dd < 10 ? '0' : '') + dd;
      mm = (mm < 10 ? '0' : '') + mm;
      var FECHA = dd + "." + mm + "." + yyyy;
      return FECHA;
    },
     addZero: function(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    },
    fnCalcularHora: function (){
      var d = new Date();
      var h = this.addZero(d.getHours());
      var m = this.addZero(d.getMinutes());
      var s = this.addZero(d.getSeconds());
      return h + ":" + m + ":" + s;
    },
    fnCalcularFechaActual2: function () {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      dd = (dd < 10 ? '0' : '') + dd;
      mm = (mm < 10 ? '0' : '') + mm;
      var f = new Date(yyyy, mm - 1, dd);
      return f;
    },
    fnConvertirStringtoDate: function(sFecha){
      var from = sFecha.split("/");
      var f = new Date(from[2], from[1] - 1, from[0]);
      return f;
    },
    fnCarga: function(that){
      var oModel = that.getView().getModel("oModel");
      var texto = "s4h/public/aa/smartagri/service/data.xsodata/material";
      $.ajax(texto, {
        type: 'GET',
        async: false,
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        complete: function (xhr) {},
        success: function (response) {
          oModel.setProperty("/DM_MATERIAL", response.d.results);
        }
      });
      texto = "s4h/public/aa/smartagri/service/data.xsodata/equipo";
      $.ajax(texto, {
        type: 'GET',
        async: false,
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        complete: function (xhr) {},
        success: function (response) {
          oModel.setProperty("/DM_EQUIPO", response.d.results);
        }
      });
      texto = "s4h/public/aa/smartagri/service/data.xsodata/campana";
      $.ajax(texto, {
        type: 'GET',
        async: false,
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        complete: function (xhr) {},
        success: function (response) {
          oModel.setProperty("/DM_CAMPANA", response.d.results);
        }
      });
      texto = "s4h/public/aa/smartagri/service/data.xsodata/modulo";
      $.ajax(texto, {
        type: 'GET',
        async: false,
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        complete: function (xhr) {},
        success: function (response) {
          oModel.setProperty("/DM_MODULO", response.d.results);
        }
      });
      texto = "s4h/public/aa/smartagri/service/data.xsodata/zona";
      $.ajax(texto, {
        type: 'GET',
        async: false,
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        complete: function (xhr) {},
        success: function (response) {
          oModel.setProperty("/DM_ZONA", response.d.results);
        }
      });
      texto = "s4h/public/aa/smartagri/service/data.xsodata/fundo";
      $.ajax(texto, {
        type: 'GET',
        async: false,
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        complete: function (xhr) {},
        success: function (response) {
          oModel.setProperty("/DM_FUNDO", response.d.results);
        }
      });
      texto = "s4h/public/aa/smartagri/service/data.xsodata/etapa";
      $.ajax(texto, {
        type: 'GET',
        async: false,
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        complete: function (xhr) {},
        success: function (response) {
          oModel.setProperty("/DM_ETAPA", response.d.results);
        }
      });
      texto = "s4h/public/aa/smartagri/service/data.xsodata/cultivo";
      $.ajax(texto, {
        type: 'GET',
        async: false,
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        complete: function (xhr) {},
        success: function (response) {
          oModel.setProperty("/DM_CULTIVO", response.d.results);
        }
      });
      texto = "s4h/public/aa/smartagri/service/data.xsodata/variedad";
      $.ajax(texto, {
        type: 'GET',
        async: false,
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        complete: function (xhr) {},
        success: function (response) {
          oModel.setProperty("/DM_VARIEDAD", response.d.results);
        }
      });
      texto = "s4h/public/aa/smartagri/service/data.xsodata/turno";
      $.ajax(texto, {
        type: 'GET',
        async: false,
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        complete: function (xhr) {},
        success: function (response) {
          oModel.setProperty("/DM_TURNO", response.d.results);
        }
      });
      texto = "s4h/public/aa/smartagri/service/data.xsodata/labor";
      $.ajax(texto, {
        type: 'GET',
        async: false,
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        complete: function (xhr) {},
        success: function (response) {
          oModel.setProperty("/DM_LABOR", response.d.results);
        }
      });
      texto = "s4h/public/aa/smartagri/service/data.xsodata/prog_labor";
      $.ajax(texto, {
        type: 'GET',
        async: false,
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        complete: function (xhr) {},
        success: function (response) {
          oModel.setProperty("/DM_PROG_LABOR", response.d.results);
        }
      });
      texto = "s4h/public/aa/smartagri/service/data.xsodata/pt_equipos";
      $.ajax(texto, {
        type: 'GET',
        async: false,
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        complete: function (xhr) {},
        success: function (response) {
          oModel.setProperty("/DM_PT_EQUIPOS", response.d.results);
        }
      });
      texto = "s4h/public/aa/smartagri/service/data.xsodata/prog_maquinaria";
      $.ajax(texto, {
        type: 'GET',
        async: false,
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        complete: function (xhr) {},
        success: function (response) {
          oModel.setProperty("/DM_PROG_MAQUINARIA", response.d.results);
        }
      });
      texto = "s4h/public/aa/smartagri/service/data.xsodata/puesto_trabajo";
      $.ajax(texto, {
        type: 'GET',
        async: false,
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        complete: function (xhr) {},
        success: function (response) {
          oModel.setProperty("/DM_PUESTO_TRABAJO", response.d.results);
        }
      });
    },
    fnObtenerDescripcion_Zona: function(zona){
       var descripcion;
      var texto = "s4h/public/aa/smartagri/service/data.xsodata/zona?$filter=ZONA eq '"+zona+"'";
      $.ajax(texto, {
        type: 'GET',
        async: false,
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        complete: function (xhr) {},
        success: function (response) {
          descripcion = response.d.results[0].DESCRIPCION;
        }
      });
      return descripcion;
    },
    fnObtenerDescripcion_Fundo: function(fundo){
       var descripcion;
      var texto = "s4h/public/aa/smartagri/service/data.xsodata/fundo?$filter=FUNDO eq '"+fundo+"'";
      $.ajax(texto, {
        type: 'GET',
        async: false,
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        complete: function (xhr) {},
        success: function (response) {
          descripcion = response.d.results[0].DESCRIPCION;
        }
      });
      return descripcion;
    },
    fnObtenerDescripcion_Modulo: function(modulo){
       var descripcion;
      var texto = "s4h/public/aa/smartagri/service/data.xsodata/modulo?$filter=MODULO eq '"+modulo+"'";
      $.ajax(texto, {
        type: 'GET',
        async: false,
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        complete: function (xhr) {},
        success: function (response) {
          descripcion = response.d.results[0].DESCRIPCION;
        }
      });
      return descripcion;
    },
    fnObtenerDescripcion_Material: function(codigo){
       var descripcion;
      var texto = "s4h/public/aa/smartagri/service/data.xsodata/material?$filter=CODIGO eq '"+codigo+"'";
      $.ajax(texto, {
        type: 'GET',
        async: false,
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        complete: function (xhr) {},
        success: function (response) {
          descripcion = response.d.results[0].DESCRIPCION;
        }
      });
      return descripcion;
    },
    fnObtenerDescripcion_Cultivo: function(codigo){
       var descripcion;
      var texto = "s4h/public/aa/smartagri/service/data.xsodata/cultivo?$filter=CULTIVO eq '"+codigo+"'";
      $.ajax(texto, {
        type: 'GET',
        async: false,
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        complete: function (xhr) {},
        success: function (response) {
          descripcion = response.d.results[0].DESCRIPCION;
        }
      });
      return descripcion;
    },
    fnObtenerDescripcion_Variedad: function(codigo){
      var descripcion;
      var texto = "s4h/public/aa/smartagri/service/data.xsodata/variedad?$filter=VARIEDAD eq '"+codigo+"'";
      $.ajax(texto, {
        type: 'GET',
        async: false,
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        complete: function (xhr) {},
        success: function (response) {
          descripcion = response.d.results[0].DESCRIPCION;
        }
      });
      return descripcion;
    },
    fnObtenerDescripcion_labor: function(codigo){
      var descripcion;
      var c = parseInt(codigo);
      var texto = "s4h/public/aa/smartagri/service/data.xsodata/labor?$filter=CODIGO eq "+c+"";
      $.ajax(texto, {
        type: 'GET',
        async: false,
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        complete: function (xhr) {},
        success: function (response) {
          descripcion = response.d.results[0].DESCRIPCION;
        }
      });
      return descripcion;
    },
    fnObtenerDescripcion_etapa: function(codigo){
      var descripcion;
      var texto = "s4h/public/aa/smartagri/service/data.xsodata/etapa?$filter=COD_ETAPA eq '"+codigo+"'";
      $.ajax(texto, {
        type: 'GET',
        async: false,
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        complete: function (xhr) {},
        success: function (response) {
          descripcion = response.d.results[0].NOMB_ETAPA;
        }
      });
      return descripcion;
    },
    fnObtenerDescripcion_Equipo: function(equipo){
       var descripcion;
      var texto = "s4h/public/aa/smartagri/service/data.xsodata/equipo?$filter=ID_EQUIPO eq "+equipo+"";
      $.ajax(texto, {
        type: 'GET',
        async: false,
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        complete: function (xhr) {},
        success: function (response) {
          descripcion = response.d.results[0].DESCRIP_EQUIPO;
        }
      });
      return descripcion;
    },
    fnObtenerDescripcion_Campana: function(campana){
       var descripcion;
      var texto = "s4h/public/aa/smartagri/service/data.xsodata/campana?$filter=CAMPANA eq '"+campana+"'";
      $.ajax(texto, {
        type: 'GET',
        async: false,
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        complete: function (xhr) {},
        success: function (response) {
          descripcion = response.d.results[0].DESCRIPCION;
        }
      });
      return descripcion;
    },

    fnConvertirFechaSubToOb: function(fecha){
      var vfecha = parseInt(fecha.substring(6, fecha.length - 2));
      var fechac = new Date(vfecha);
      var dia = fechac.getUTCDate();
      var mes = fechac.getUTCMonth() + 1;
      var an = fechac.getUTCFullYear();
      var f = new Date(an, mes - 1, dia);
      return f;
    },
    fnConvertirFechaSubToStr: function(fecha){
      if(fecha === null || fecha== "" || fecha == undefined){
        return "";
      }
      var vfecha = parseInt(fecha.substring(6, fecha.length - 2));
      var fechac = new Date(vfecha);
      var dia = fechac.getUTCDate();
      var mes = fechac.getUTCMonth() + 1;
      var an = fechac.getUTCFullYear();
      dia = ("0" + dia).slice(-2);
      mes = ("0" + mes).slice(-2);
      var fechar = dia + '/' + mes + '/' + an;
      return fechar;
    },
    fnConvertirFecha: function(vfecha){
      // var valor;
      // if(vfecha === null || vfecha == ""){return "";}
      // if(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.test(vfecha)){
      //  return vfecha;
      // }
      var fechac = new Date(vfecha);
      var dia = fechac.getUTCDate();
      var mes = fechac.getUTCMonth() + 1;
      var an = fechac.getUTCFullYear();
      dia = ("0" + dia).slice(-2);
      mes = ("0" + mes).slice(-2);
      var fechar = dia + '/' + mes + '/' + an;
      return fechar;
    },

    fnMessageBoxInfo: function (that, StringMessage, StringCabecera) {
      var bCompact = !!that.getView().$().closest(".sapUiSizeCompact").length;
      MessageBox.information(
        StringMessage, {
          title: StringCabecera,
          styleClass: bCompact ? "sapUiSizeCompact" : ""
        }
      );
    },
    fnMessageBoxSuccess: function (that, StringMessage, StringCabecera) {
      var bCompact = !!that.getView().$().closest(".sapUiSizeCompact").length;
      MessageBox.success(
        StringMessage, {
          title: StringCabecera,
          styleClass: bCompact ? "sapUiSizeCompact" : ""
        }
      );
    },
  };

  return Formato;

}, /* bExport= */ true);