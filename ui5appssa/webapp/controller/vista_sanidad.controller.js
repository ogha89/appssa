sap.ui.define([
  "sap/ui/vbm/AnalyticMap",
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/Device",
  "sap/m/MessageToast",
  "sap/ui/core/Fragment",
], function (AnalyticMap, Controller, JSONModel, Device, MessageToast, Fragment) {
  "use strict";
  AnalyticMap.GeoJSONURL = "test-resources/sap/ui/vbm/demokit/media/analyticmap/L1_US.json";
  return Controller.extend("nsa.ui5appssa.controller.vista_sanidad", {

    /**
     * Called when a controller is instantiated and its View controls (if available) are already created.
     * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
     * @memberOf smartagri.Proyecto_SmartAgri.view.vista_sanidad
     */
    onInit: function () {

      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("vista_sanidad").attachMatched(this._onRouteMatched, this);
      this.getView().byId("image_bg").addStyleClass("image_bg_menu");
      this.getView().byId("id1").addStyleClass("nuevo3");

    },
    pressFerti: function () {
      this.getRouter().navTo("vista_Rep_Riego_Fertirriego");
    },
    pressSanidadrep: function () {
      this.getRouter().navTo("vista_Rep_Sanidad");
    },
    onGuardardatos: function () {
      sap.m.MessageToast.show("N° de Item Guardado");
      this.byId("Detalleanadir").close();
    },
    onCloseDialog: function () {
      this.byId("Detalleanadir").close();
    },
    btnRegresarMenu: function () {
        this.getRouter().navTo("vMain");
      },
    btnRegresar: function () {
      var vthis = this;
      var oModelG = this.getView().getModel("myParam");
      if (oModelG.getProperty("/IndicadorModificacion") == 1) {
        var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
        MessageBox.confirm(
          "¿Esta seguro que desea volver al Menu? Se perderán sus datos.", {
            styleClass: bCompact ? "sapUiSizeCompact" : "",
            title: "ALERTA",
            actions: [MessageBox.Action.OK, MessageBox.Action.NO],
            onClose: function (oAction) {
              if (oAction == 'OK') {
                vthis.getRouter().navTo("vMain");
              } else {
                return 0;
              }
            }
          }
        );
      } else {
        vthis.getRouter().navTo("vMain");
      }
    },
    pressReportes: function () {
      var oModelG = this.getView().getModel("myParam");
      oModelG.setProperty("/check", 1);
      this.getRouter().navTo("vMain");
    },
    pressPlan: function () {
      var oModelG = this.getView().getModel("myParam");
      oModelG.setProperty("/check", 2);
      this.getRouter().navTo("vMain");
    },
    pressRiego: function () {
      var oModelG = this.getView().getModel("myParam");
      oModelG.setProperty("/check", 3);
      this.getRouter().navTo("vMain");
    },
    pressSanidad: function () {
      var oModelG = this.getView().getModel("myParam");
      oModelG.setProperty("/check", 4);
      this.getRouter().navTo("vMain");
    },
    pressAdministracion: function () {
      var oModelG = this.getView().getModel("myParam");
      oModelG.setProperty("/check", 5);
      this.getRouter().navTo("vMain");
    },
    onBookPress: function () {
      /*  this.getView().setBusy(true);*/

      var oModel = this.getView().getModel("myParam");
      var proy = this.getView().byId("cboproy").getSelectedKey();
      var fundo = this.getView().byId("labelfundo").getSelectedKey();
      var lote = this.getView().byId("labellote").getSelectedKey();
      var cultivo = this.getView().byId("labelcultivo").getSelectedKey();
      var campana = this.getView().byId("labelcampana").getSelectedKey();
      oModel.setProperty("/tblcosto", []);
      oModel.setProperty("/tblcosto2", []);   
      this.getView().byId("content1").setValue("0");
      this.getView().byId("content2").setValue("0");
      this.getView().byId("content3").setValue("0");      
      this.getView().byId("content4").setValue("0");
      this.getView().byId("content5").setValue("0");
      this.getView().byId("content6").setValue("0");       
      console.log(fundo);

      switch (fundo) {
      case '0001':
       /* this.getView().byId("char1").setValue(14);
        this.getView().byId("char2").setValue(34);
        this.getView().byId("char3").setValue(53);
        this.getView().byId("char4").setValue(23);
        this.getView().byId("char5").setValue(22);
        this.getView().byId("char6").setValue(11);*/
        /*this.getView().byId("data1").setValue(14);
        this.getView().byId("data2").setValue(34);
        this.getView().byId("data3").setValue(53);
        this.getView().byId("data4").setValue(23);
        this.getView().byId("data5").setValue(22);
        this.getView().byId("data6").setValue(11);*/
        this.getView().byId("content1").setValue(1400);
        this.getView().byId("content2").setValue(1000);
        this.getView().byId("content3").setValue(10);
        this.getView().byId("content4").setValue(80);
        this.getView().byId("content5").setValue(200);
        this.getView().byId("content6").setValue(2.4);
        /*this.getView().byId("card1").setState("Loading");
        this.getView().byId("card1").setState("Loaded");*/
        break;
      case '0002': // foo es 0, por lo tanto se cumple la condici�n y se ejecutara el siguiente bloque
        /*this.getView().byId("char1").setValue(11);
        this.getView().byId("char2").setValue(40);
        this.getView().byId("char3").setValue(34);
        this.getView().byId("char4").setValue(43);
        this.getView().byId("char5").setValue(52);
        this.getView().byId("char6").setValue(63);*/
        /*this.getView().byId("data1").setValue(14);
        this.getView().byId("data2").setValue(34);
        this.getView().byId("data3").setValue(33);
        this.getView().byId("data4").setValue(53);
        this.getView().byId("data5").setValue(45);
        this.getView().byId("data6").setValue(13);*/
        this.getView().byId("content1").setValue(1000);
        this.getView().byId("content2").setValue(900);
        this.getView().byId("content3").setValue(6);
        this.getView().byId("content4").setValue(34);
        this.getView().byId("content5").setValue(20);
        this.getView().byId("content4").setValueColor("Critical");
        this.getView().byId("content6").setValue(6);
        break;
      case '0003': // No hay sentencia "break" en el 'case 0:', por lo tanto este caso tambi�n ser� ejecutado
       /* this.getView().byId("char1").setValue(11);
        this.getView().byId("char2").setValue(22);
        this.getView().byId("char3").setValue(33);
        this.getView().byId("char4").setValue(43);
        this.getView().byId("char5").setValue(52);
        this.getView().byId("char6").setValue(61);*/
        /*this.getView().byId("data1").setValue(14);
        this.getView().byId("data2").setValue(67);
        this.getView().byId("data3").setValue(53);
        this.getView().byId("data4").setValue(73);
        this.getView().byId("data5").setValue(23);
        this.getView().byId("data6").setValue(80);*/
        this.getView().byId("content1").setValue(760);
        this.getView().byId("content2").setValue(10);
        this.getView().byId("content3").setValue(2);
        this.getView().byId("content4").setValue(800);
        this.getView().byId("content4").setValueColor("Good");
        this.getView().byId("content5").setValue(2000);
        this.getView().byId("content5").setValueColor("Good");
        this.getView().byId("content6").setValue(3.5);
        break;
      default:
        console.log('default');
      }
      console.log(oModel);
      var oView = this.getView();
      var texto = "s4h/sap/bc/zsagw_smart/Dash/DASH/"+proy+"/"+fundo+"/"+lote+"/"+cultivo+"/"+campana;
      console.log(texto);
      $.ajax(texto, {
      type: 'GET',
      async: false,
      beforeSend: function (xhr) {
      xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        success: function (response) {
           console.log(response);
           var oModel = this.getView().getModel("myParam");
           var oModelJSON = new sap.ui.model.json.JSONModel(response);
           console.log(oModelJSON);  
           var varT_DETALLE = oModelJSON.getProperty("/ITAB/0/T_COSTO");
           console.log(varT_DETALLE);  
           var llave={};
           var vector=[];
           var llave2={};
           var vector2=[];           
           if(varT_DETALLE.length>0){

                for (var i = 0; i < parseInt(Object.values(varT_DETALLE[0]).length/2); i++) {
                    llave = {};
                    llave.tittle = Object.getOwnPropertyNames(varT_DETALLE[0])[i];
                    llave.value = Object.values(varT_DETALLE[0])[i];               
                    vector.push(llave);
                }
                console.log(vector)
                
                for (var i = parseInt(Object.values(varT_DETALLE[0]).length/2); i < Object.values(varT_DETALLE[0]).length; i++) {
                    llave2 = {};
                    llave2.tittle = Object.getOwnPropertyNames(varT_DETALLE[0])[i];
                    llave2.value = Object.values(varT_DETALLE[0])[i];               
                    vector2.push(llave2);
                }
                console.log(vector2)                
           };

           oModel.setProperty("/tblcosto", vector);
           oModel.setProperty("/tblcosto2", vector2);
           var varT_DETALLE1 = oModelJSON.getProperty("/ITAB/0/T_IND");   
           oModel.setProperty("/tblindicador", varT_DETALLE1);
           this.getView().byId("content1").setValueColor("Good");
           this.getView().byId("content2").setValueColor("Good");
           this.getView().byId("content3").setValueColor("Good");
           this.getView().byId("content1").setValue(varT_DETALLE1[0].CANTKG.toString());
           this.getView().byId("content2").setValue(varT_DETALLE1[0].M3AGUA.toString());
           this.getView().byId("content3").setValue(varT_DETALLE1[0].NUM_AP.toString());

           var varT_DETALLE2 = oModelJSON.getProperty("/ITAB/0/T_NPK");
           var llave={};
           var vector=[];
           if(varT_DETALLE.length>0){
            for (var i = 0; i < varT_DETALLE2.length; i++) {
                llave = {};
                llave.tittle = varT_DETALLE2[i].ZDESC.toString(); 
                llave.value = varT_DETALLE2[i].ZVAL;       
                vector.push(llave);
            }
           }
           oModel.setProperty("/tblnpk", vector);     
           console.log(oModel);     
        }.bind(this),
        error: function (response) {
          console.log(response);
        }.bind(this)
      });     
      /*this.getView().setBusy(false);*/
    },
    numberWithchar: function (number) {
        var number0 = parseInt(number);
        return number0.toString();
    },
    changecultivo: function (evt){
        console.log("FILTRANDO CAMPO");
        var oModel = this.getView().getModel("myParam");
        var usuarioRuc = "";
        var usuarioRucDes = "";
        var item = evt.getSource().getSelectedItem();
        if (item !== null && item !== undefined) {
          usuarioRuc = item.getKey();
          var oproy =  this.getView().byId("cboproy").getSelectedItem().getKey();
          var ofun =  this.getView().byId("labelfundo").getSelectedItem().getKey();
          var ozturno =  this.getView().byId("labellote").getSelectedItem().getKey();
          var expresion = /(\d+)-(\d+)/;
          var ozturnov=ozturno.replace(expresion, "$2-$1");
          console.log(ozturnov);
          var aFilter = [];
          var olist= this.listCampanaglobal;
          var listzona = olist.filter(e => e.PROY == oproy &&  e.ZFUN == ofun &&  e.ZTURNO == ozturnov&&  e.ZCUL == usuarioRuc);
          oModel.setProperty("/CAMPANA", listzona);
  
              var sQuery = evt.getParameter("query");
              console.log(sQuery);
              if (sQuery) {
                  aFilter.push(new Filter(usuarioRuc, FilterOperator.Contains, sQuery));
              }
              // filter binding
              var oList = this.getView().byId("labelfundo");
              var oBinding = oList.getBinding("items");
              oBinding.filter(aFilter);
              console.log(oList);
          }
      },
    changezona: function (evt){
      console.log("FILTRANDO CAMPO");
      var oModel = this.getView().getModel("myParam");
      var usuarioRuc = "";
      var usuarioRucDes = "";
      var item = evt.getSource().getSelectedItem();
 
      this.getView().byId("labellote").setValue("");
      this.getView().byId("labelcultivo").setValue("");

      this.getView().byId("labelcampana").setValue("");
      this.getView().byId("labelcampana").setSelectedItem(null);
   
      oModel.setProperty("/tblturno", []);
      //oModel.setProperty("/CULTIVO", []);
      oModel.setProperty("/CAMPANA", []);
      if (item !== null && item !== undefined) {
        usuarioRuc = item.getKey();
        var oproy =  this.getView().byId("cboproy").getSelectedItem().getKey();
        var aFilter = [];
        var olist= this.listCampoglobal;
        var listzona = olist.filter(e => e.PROY == oproy &&  e.ZFUN == usuarioRuc);
        oModel.setProperty("/tblturno", listzona);

            var sQuery = evt.getParameter("query");
            console.log(sQuery);
            if (sQuery) {
                aFilter.push(new Filter(usuarioRuc, FilterOperator.Contains, sQuery));
            }
            // filter binding
            var oList = this.getView().byId("labelfundo");
            var oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
            console.log(oList);
        }
    },
    changecampo:function(evt){
        var oModel = this.getView().getModel("myParam");
        this.getView().byId("labelcampana").setValue("");        
        oModel.setProperty("/CAMPANA", []);
    },
    changeRucEvt: function (evt) {
    console.log("FILTRANDO ZONA");
      var oModel = this.getView().getModel("myParam");
      var usuarioRuc = "";
      var usuarioRucDes = "";
      var item = evt.getSource().getSelectedItem();     
      this.getView().byId("labelfundo").setValue("");
      this.getView().byId("labellote").setValue("");
      this.getView().byId("labelcultivo").setValue("");
      this.getView().byId("labelcampana").setValue("");
      this.getView().byId("labelcampana").setSelectedItem(null);
      oModel.setProperty("/tblfundo", []);
      oModel.setProperty("/tblturno", []);
      //oModel.setProperty("/CULTIVO", []);
      oModel.setProperty("/CAMPANA", []);

      if (item !== null && item !== undefined) {
        usuarioRuc = item.getKey();
        usuarioRucDes = item.getBindingContext("myParam").getObject();

          var olist= this.listzonaglobal;
          var listzona = olist.filter(e => e.PROY == usuarioRuc);
          oModel.setProperty("/tblfundo", listzona);
          var aFilter = [];
          var sQuery = evt.getParameter("query");
          console.log(sQuery);
          if (sQuery) {
            aFilter.push(new Filter(usuarioRuc, FilterOperator.Contains, sQuery));
          }
          // filter binding
          var oList = this.getView().byId("labelfundo");
          var oBinding = oList.getBinding("items");
          oBinding.filter(aFilter);
        oModel.setProperty("/usuarioRuc", usuarioRuc);
        oModel.setProperty("/usuarioRucDes", usuarioRucDes.descripcion);
        sap.m.MessageToast.show("Se seleccionó el RUC de la empresa : " + usuarioRuc);
        evt.getSource().setValueState("None");
        this.getView().byId("lblEst236").setText(usuarioRuc);
        switch (usuarioRuc) {
        case '20332907990':
          this.getView().byId("logo").setSrc("./img/plant.png");
          break;
        case '20100136237':
          this.getView().byId("logo").setSrc("./img/SAP.png");
          break;
        case '20101009255':
          this.getView().byId("logo").setSrc("./img/fondo.jpg");
          break;
        case '20524489300':
          this.getView().byId("logo").setSrc("./img/paramong.png");
          break;

        };
      } else {
        usuarioRuc = "";
        oModel.setProperty("/usuarioRuc", usuarioRuc);
        oModel.setProperty("/usuarioRucDes", usuarioRucDes);
        sap.m.MessageToast.show("No ha seleccionado ningún RUC de la empresa.");
        evt.getSource().setValueState("Error");
      }


    },
    getSplitAppObj: function () {

      var result = this.byId("Splitadministrar");
      if (!result) {
        jQuery.sap.log.info("SplitApp object can't be found");
      }
      return result;
    },
    _onRouteMatched: function (oEvent) {

      var oView = this.getView();
      var oModel = oView.getModel("myParam");
      oView.setModel(oModel);
      var oDeviceModel = new JSONModel(Device);
      oDeviceModel.setDefaultBindingMode("OneWay");
      this.getView().setModel(oDeviceModel, "device");

      console.log(oModel);
      var oView = this.getView();
      var texto = "s4h/sap/bc/ZSAGW_SMART/Para/DSMA/0/0/0/0";
      console.log(texto);
      $.ajax(texto, {
      type: 'GET',
      async: false,
      beforeSend: function (xhr) {
      xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        success: function (response) {
          console.log(response);
           var oModelJSON = new sap.ui.model.json.JSONModel(response);
           console.log(oModelJSON);
           var varT_DETALLE = oModelJSON.getProperty("/ITAB/0/T_SOC");
           oModel.setProperty("/tblsociedades", varT_DETALLE);
           var varT_DETALLE1 = oModelJSON.getProperty("/ITAB/0/T_FUN");
           this.listzonaglobal=varT_DETALLE1;
          // oModel.setProperty("/tblfundo", varT_DETALLE1);
           var varT_DETALLE2 = oModelJSON.getProperty("/ITAB/0/T_TUR");
          // oModel.setProperty("/tblturno", varT_DETALLE2);
           this.listCampoglobal=varT_DETALLE2;
           var varT_DETALLE4 = oModelJSON.getProperty("/ITAB/0/T_CUL");
           oModel.setProperty("/CULTIVO", varT_DETALLE4);  
           var varT_DETALLE5 = oModelJSON.getProperty("/ITAB/0/T_CAMP");   
           this.listCampanaglobal=varT_DETALLE5;      
           console.log(oModel);
        }.bind(this),
        error: function (response) {
          console.log(response);
        }.bind(this)
      });
    },
    fnllenarList: function () {
      var oModelG = this.getView().getModel("oModel");
      var url = "s4h/public/aa/smartagri/service/data.xsodata/";
      var oModel = new sap.ui.model.odata.v2.ODataModel(url, true);
      var texto = "s4h/public/aa/smartagri/service/data.xsodata/prog_labor?$filter=COD_LABOR eq 4001";
      //this.getView().byId("idvalor1").setValue(oModel.getProperty("/usuarioRuc/0/valor1"));
      //var texto = "/public/aa/smartagri/service/data.xsodata/prog_labor?$filter=COD_LABOR eq " + this.getView().byId("idmodulo").getText();
      console.log(texto);
      $.ajax(texto, {
        type: 'GET',
        async: false,
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        complete: function (xhr) {},
        success: function (response) {
          console.log(response);
          var oModelprog = new sap.ui.model.json.JSONModel(response.d.results);
          oModelG.setProperty("/tblproglabor", oModelprog.getProperty("/"));
          var length = oModelG.getProperty("/tblproglabor/length");
          var llave1 = {};
          var llave2 = {};
          var seen = {};
          var ret_arr = [];

          var filters = [];
          var filter;

          for (var i = 0; i < length; i++) {
            llave2 = {};
            if (!(oModelG.getProperty("/tblproglabor/" + i + "/CULTIVO") in seen)) {
              llave2.keyCULTIVO = oModelG.getProperty("/tblproglabor/" + i + "/CULTIVO");
              ret_arr.push(llave2);
              seen[oModelG.getProperty("/tblproglabor/" + i + "/CULTIVO")] = true;

              filter = new sap.ui.model.Filter("CULTIVO", sap.ui.model.FilterOperator.EQ, llave2.keyCULTIVO);
              filters.push(filter);

            }
          }
          var llave2v = {};
          var seen1 = {};
          var ret_arr1 = [];

          var filtersv = [];
          var filterv;

          for (i = 0; i < length; i++) {
            llave2v = {};
            if (!(oModelG.getProperty("/tblproglabor/" + i + "/VARIEDAD") in seen1)) {
              llave2v.keyVARIEDAD = oModelG.getProperty("/tblproglabor/" + i + "/VARIEDAD");
              ret_arr1.push(llave2v);
              seen1[oModelG.getProperty("/tblproglabor/" + i + "/VARIEDAD")] = true;

              filterv = new sap.ui.model.Filter("VARIEDAD", sap.ui.model.FilterOperator.EQ, llave2v.keyVARIEDAD);
              filtersv.push(filterv);

            }
          }

          oModel.read("/cultivo", {
            async: false,
            filters: filters,
            success: function (response) {
              // var oModelR2 = new sap.ui.model.json.JSONModel(response.results);
              oModelG.setProperty("/dmT_CULTIVOSelected", response.results);
              var length2 = oModelG.getProperty("/dmT_CULTIVOSelected/length");
              for (var i = 0; i < length; i++) {
                for (var j = 0; j < length2; j++) {
                  if (oModelG.getProperty("/tblproglabor/" + i + "/CULTIVO") == oModelG.getProperty("/dmT_CULTIVOSelected/" + j +
                      "/CULTIVO")) {
                    oModelG.setProperty("/tblproglabor/" + i + "/DESCRIPCION", oModelG.getProperty("/dmT_CULTIVOSelected/" + j +
                      "/DESCRIPCION"));

                  }
                }
              }
            },
            error: function (oError) {}
          });
          oModel.read("/variedad", {
            async: false,
            filters: filtersv,
            success: function (response) {
              // var oModelR2 = new sap.ui.model.json.JSONModel(response.results);
              oModelG.setProperty("/dmT_VARIEDADSelected", response.results);
              var length2 = oModelG.getProperty("/dmT_VARIEDADSelected/length");
              for (var i = 0; i < length; i++) {
                for (var j = 0; j < length2; j++) {
                  if (oModelG.getProperty("/tblproglabor/" + i + "/VARIEDAD") == oModelG.getProperty("/dmT_VARIEDADSelected/" + j +
                      "/VARIEDAD")) {
                    oModelG.setProperty("/tblproglabor/" + i + "/DESCRIP_VAR", oModelG.getProperty("/dmT_VARIEDADSelected/" + j +
                      "/DESCRIPCION"));

                  }
                }
              }
            },
            error: function (oError) {}
          });
        },
        error: function (response) {
          console.log(response);

        }
      });
    },
    onListItemPress: function (oEvent) {
      var oModel = this.getView().getModel("oModel");
      var descripcion;
      // var sToPageId = oEvent.getSource().data("to");
      var oObject = {};
      oModel.setProperty("/VProg_Detalle", oObject);
      oModel.setProperty("/key_nro_programacion", oEvent.getSource().data("key"));
      var sPath = oEvent.getSource().getBindingContext("oModel").getPath();
      var nro_prog = oModel.getProperty(sPath + "/NRO_PROG");
      oModel.setProperty("/VProg_Detalle/NRO_PROG", nro_prog);
      var campana = oModel.getProperty(sPath + "/CAMPANA");
      descripcion = funciones.fnObtenerDescripcion_Campana(campana);
      oModel.setProperty("/VProg_Detalle/CAMPANA", descripcion);
      var zona = oModel.getProperty(sPath + "/ZONA");
      descripcion = funciones.fnObtenerDescripcion_Zona(zona);
      oModel.setProperty("/VProg_Detalle/ZONA", descripcion);
      var fundo = oModel.getProperty(sPath + "/FUNDO");
      descripcion = funciones.fnObtenerDescripcion_Fundo(fundo);
      oModel.setProperty("/VProg_Detalle/FUNDO", fundo);
      var modulo = oModel.getProperty(sPath + "/MODULO");
      descripcion = funciones.fnObtenerDescripcion_Modulo(modulo);
      oModel.setProperty("/VProg_Detalle/MODULO", descripcion);
      var cultivo = oModel.getProperty(sPath + "/CULTIVO");
      descripcion = funciones.fnObtenerDescripcion_Cultivo(cultivo);
      oModel.setProperty("/VProg_Detalle/CULTIVO", descripcion);
      var variedad = oModel.getProperty(sPath + "/VARIEDAD");
      descripcion = funciones.fnObtenerDescripcion_Variedad(variedad);
      oModel.setProperty("/VProg_Detalle/VARIEDAD", descripcion);
      var etapa = oModel.getProperty(sPath + "/ETAPA");
      descripcion = funciones.fnObtenerDescripcion_etapa(etapa);
      oModel.setProperty("/VProg_Detalle/ETAPA", descripcion);
      var labor = oModel.getProperty(sPath + "/COD_LABOR");
      descripcion = funciones.fnObtenerDescripcion_labor(labor);
      oModel.setProperty("/VProg_Detalle/LABOR", descripcion);
      var texto = "s4h/public/aa/smartagri/service/data.xsodata/prog_material?$filter=NRO_PROG eq '" + nro_prog + "'";
      var resultado = funciones.fnAjaxGet(texto);
      oModel.setProperty("/tblDetallesanidad", resultado);
      for (var i = 0; i < oModel.getProperty("/tblDetallesanidad/length"); i++) {
        var material = oModel.getProperty("/tblDetallesanidad/" + i + "/COD_MATERIAL");
        if (material === null || material === "") {
          oModel.setProperty("/tblDetallesanidad/" + i + "/DESCRIPCION_MATERIAL", "");
        } else {
          descripcion = funciones.fnObtenerDescripcion_Material(material);
          oModel.setProperty("/tblDetallesanidad/" + i + "/DESCRIPCION_MATERIAL", descripcion);
        }
        var FECHA_INICIO = funciones.fnConvertirFecha(parseInt((oModel.getProperty("/tblDetallesanidad/" + i + "/FECHA_INICIO")).substring(
          6, (oModel.getProperty("/tblDetallesanidad/" + i + "/FECHA_INICIO")).length - 2)));
        var FECHA_FIN = funciones.fnConvertirFecha(parseInt((oModel.getProperty("/tblDetallesanidad/" + i + "/FECHA_FIN")).substring(6, (
          oModel.getProperty("/tblDetallesanidad/" + i + "/FECHA_FIN")).length - 2)));
        oModel.setProperty("/tblDetallesanidad/" + i + "/FECHA_INICIO", FECHA_INICIO);
        oModel.setProperty("/tblDetallesanidad/" + i + "/FECHA_FIN", FECHA_FIN);

      }
    },
    onpressdistribucion: function (oEvent) {
      var vthis = this;
      var oModel = this.getView().getModel("oModel");
      var sPath = oEvent.getSource().getBindingContext("oModel").getPath();
      console.log(sPath);
      console.log(oModel.getProperty(sPath));
      console.log(oModel.getProperty("/tblDetalle2/length"));
      var aArray = [];
      var aArray1 = [];
      if (oModel.getProperty("/tblDetalle2/length") == undefined) {
        console.log("vacio");
      } else {
        aArray1 = oModel.getProperty("/tblDetalle2");
        // aArray.push(oModel.getProperty("/tblDetalle2"));
        console.log(aArray);
      }

      aArray1.push(oModel.getProperty(sPath));
      oModel.setProperty("/tblDetalle2", aArray1);
      console.log(oModel.getProperty("/tblDetalle2"));
      // var fechai = oModel.getProperty(sPath + "/FECHA_INICIO");
      // var fechaf = oModel.getProperty(sPath + "/FECHA_FIN");
      // var codigo = oModel.getProperty(sPath + "/COD_MATERIAL");
      // var descripcion = oModel.getProperty(sPath + "/DESCRIPCION_MATERIAL");
      // oModel.setProperty("/tblDetalle2/0/FECHA_INICIO",fechai);
      // console.log(oModel.getProperty("/tblDetalle2"));
      var texto = "s4h/public/aa/smartagri/service/data.xsodata/lote";
      var resultado = funciones.fnAjaxGet(texto);
      console.log(resultado);
      oModel.setProperty("/tbllote", resultado);
      console.log(oModel.getProperty("/tbllote"));
      var oTable = new sap.ui.table.Table({
        id: "iddistribucion",
        visibleRowCount: 7,
        alternateRowColors: true,
        selectionMode: "MultiToggle",
        width: "100%",
        rows: "{oModel>/tbllote}"
      });

      oTable.addColumn(new sap.ui.table.Column({
        hAlign: "Left",
        label: new sap.m.Text({
          text: "Lote"
        }),
        template: new sap.m.Text({
          text: "{oModel>LOTE}"
        })
      }));
      oTable.addColumn(new sap.ui.table.Column({
        hAlign: "Left",
        label: new sap.m.Text({
          text: "Descripción"
        }),
        template: new sap.m.Text({
          text: "{oModel>DESCRIPCION}"
        })
      }));
      oTable.addColumn(new sap.ui.table.Column({
        hAlign: "Left",
        label: new sap.m.Text({
          text: "área"
        }),
        template: new sap.m.Text({
          text: "{oModel>AREA}"
        })
      }));

      var pressDialog = new sap.m.Dialog({
        title: "Distribución lotes",
        type: "Message",
        contentWidth: "20rem",
        content: [
          new sap.m.VBox({
            items: [
              oTable
            ]
          })
        ],
        beginButton: new sap.m.Button({
          text: 'Aceptar',
          icon: "sap-icon://accept",
          press: function () {
            var index = oTable.getSelectedIndices();
            var suma = 0;
            for (var i = 0; i < index.length; i++) {
              suma = suma + parseFloat(oModel.getProperty("/tbllote/" + index[i] + "/AREA"));
            }
            oModel.setProperty(sPath + "/HECTAREAS", suma);
            vthis.byId("idicontabbar").setSelectedKey("Ok2");
            vthis.byId("idnapp").getValue();
            vthis.byId("idcodplaga").getValue();
            vthis.byId("iddescplaga").getValue();
            pressDialog.close();
          }.bind(this)
        }),
        endButton: new sap.m.Button({
          text: "Cancelar",
          icon: "sap-icon://sys-cancel",
          press: function () {
            pressDialog.close();
          }
        }),
        afterClose: function () {
          pressDialog.destroy();
        }
      });
      this.getView().addDependent(pressDialog);
      pressDialog.addStyleClass("style_dialog");

      pressDialog.open();
    },
    onSelectionChange: function (evt) {
      var oPlugin = evt.getSource();
      console.log(oPlugin);
    },
    getRouter: function () {
      return sap.ui.core.UIComponent.getRouterFor(this);
    },
 
    onPressLegend: function () {
      if (this.byId("vbi").getLegendVisible() == true) {
        this.byId("vbi").setLegendVisible(false);
        this.byId("btnLegend").setTooltip("Show legend");
      } else {
        this.byId("vbi").setLegendVisible(true);
        this.byId("btnLegend").setTooltip("Hide legend");
      }
    },

    onPressResize: function () {
      /*if (this.byId("btnResize").getTooltip() == "Minimize") {
        if (Device.system.phone) {
          this.byId("vbi").minimize(132, 56, 1320, 560); //Height: 3,5 rem; Width: 8,25 rem
        } else {
          this.byId("vbi").minimize(168, 72, 1680, 720); //Height: 4,5 rem; Width: 10,5 rem
        }
        this.byId("btnResize").setTooltip("Maximize");
      } else {
        this.byId("vbi").maximize();
        this.byId("btnResize").setTooltip("Minimize");
      }*/
    },
    onRegionClick2: function (e) {
      MessageToast.show(e.getParameter("code"));
    },
    onRegionClick: function (e) {
      var oView = this.getView();
      if (!this.byId("Detalleanadir")) {

        Fragment.load({
          id: oView.getId(),
          name: "smartagri.Proyecto_SmartAgri.view.Agregarparte",
          controller: this
        }).then(function (oDialog) {

          oView.addDependent(oDialog);
          oDialog.open();
        });
      } else {
        this.byId("Detalleanadir").open();
      }
    },

    onRegionContextMenu: function (e) {
      MessageToast.show(e.getParameter("code"));
    },

    onClickItem: function (evt) {
      MessageToast.show("onClick");
    },

    onContextMenuItem: function (evt) {
        MessageToast.show("onContextMenu");
      }
      /**
       * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
       * (NOT before the first rendering! onInit() is used for that one!).
       * @memberOf smartagri.Proyecto_SmartAgri.view.vista_sanidad
       
      //  onBeforeRendering: function() {
      //
      //  },

    /**
     * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
     * This hook is the same one that SAPUI5 controls get after being rendered.
     * @memberOf smartagri.Proyecto_SmartAgri.view.vista_sanidad
     */
      //  onAfterRendering: function() {
      //
      //  },

    /**
     * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
     * @memberOf smartagri.Proyecto_SmartAgri.view.vista_sanidad
     */
    //  onExit: function() {
    //
    //  }

  });

});