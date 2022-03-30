sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "./funciones",
    "sap/ui/core/util/Export",
    "sap/ui/core/util/ExportTypeCSV",
    'sap/ui/export/Spreadsheet'
  ], function (Controller, funciones, Export, ExportTypeCSV, Spreadsheet) {
    "use strict";
    var FECHAT = new Date();
    var bandera= FECHAT.getDate()+ "."+FECHAT.getMonth()+1+"."+FECHAT.getFullYear();
    return Controller.extend("nsa.ui5appssa.controller.vista_reporte", {
  
      /**
       * Called when a controller is instantiated and its View controls (if available) are already created.
       * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
       * @memberOf smartagri.Proyecto_SmartAgri.view.vista_reporte
       */
      onInit: function () {
        //var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        //oRouter.getRoute("vista_reporte").attachMatched(this._onRouteMatched, this);
        this.getRouter().getRoute("vista_reporte").attachMatched(this._onRouteMatched, this);
        this.getView().byId("image_bg").addStyleClass("image_bg_menu");
        this.getView().byId("idTableReporte").addStyleClass("cssTableReporte");
  
      },
  zero: function(n) {
        return(n>9 ? '' : '0') + n;
      },
      _onRouteMatched: function () {
  
        var oView = this.getView();
        var oModel = oView.getModel("myParam");
  
        this.getData1();
      },
  	btnBuscarItem777: function () {
		
        var texto = "/s4h/sap/bc/zsagw_smart/CO/REP/8410/8410/8413/P01/20210322/20210328/01/0/07/0/1031/0/R";
        
        $.ajax(texto, {
        type: 'GET',
        async: false,
        beforeSend: function (xhr) {
        xhr.setRequestHeader("X-CSRF-Token", "Fetch");
          },
          success: function (response) {
            console.log(response);
            var oView = this.getView();
            var oModel = oView.getModel("myParam");
            var varT_PLAGUICIDAS = response.ITAB;
            oModel.setProperty("/tblPlagRep", varT_PLAGUICIDAS);
    		
          }.bind(this),
          error: function (response) {
  
            console.log(response);
          }.bind(this)
        });
		},
      getData1: function () {
        var oView = this.getView();
        var oModel = oView.getModel("myParam");
        var FECHA = new Date();
        var FECHAA = this.zero(FECHA.getDate())+ ""+this.zero(FECHA.getMonth()+1)+""+FECHA.getFullYear();
        var texto = "/s4h/sap/bc/zsagw_smart/CO/REP/8410/8410/8413/P01/"+FECHAA+"/"+FECHAA+"/01/0/07/0/1031/0/R";
        //var texto = "s4h/sap/bc/ZSAGW_SMART/Para/RP/" + FECHAA + "/PD/PF/mat";
        $.ajax(texto, {
        type: 'GET',
        async: false,
        beforeSend: function (xhr) {
        xhr.setRequestHeader("X-CSRF-Token", "Fetch");
          },
          success: function (response) {
            console.log(response);
             //var oModelJSON = new sap.ui.model.json.JSONModel(response);
             var varT_PLAGUICIDAS = response.ITAB;//oModelJSON.getProperty("/TI_REP_PARTE");
             oModel.setProperty("/tblPlagRep", varT_PLAGUICIDAS);
  
                /*var sorters = [];
                var sorter;
        
                sorter = new sap.ui.model.Sorter("ZNUM_PARTE", true);
                sorters.push(sorter);
                sorter = new sap.ui.model.Sorter("ZITEM", true);
                sorters.push(sorter);
        
                // Actualiza la lista
                var list = this.byId("idTableReporte");
                var binding = list.getBinding("rows");
                binding.filter([], "Application");
                binding.sort(sorters);*/
          }.bind(this),
          error: function (response) {
  
            console.log(response);
          }.bind(this)
        });
  
      },
        getDataplus: function () {
        var oView = this.getView();
        var oModel = oView.getModel("myParam");
        var FECHA = sap.ui.getCore().byId("idDialogFecha").getValue();
        var FECHA2 = sap.ui.getCore().byId("idDialogFecha2").getValue();
        var SCO = (sap.ui.getCore().byId("idDialogNumParteI").getValue().trim().length>0)?sap.ui.getCore().byId("idDialogNumParteI").getValue():"0";//sociedad CO
        var BUK = (sap.ui.getCore().byId("idDialogItemI").getValue().trim().length>0)?sap.ui.getCore().byId("idDialogItemI").getValue():"0"; //sociedad
        var CEN = (sap.ui.getCore().byId("centro").getValue().trim().length>0)?sap.ui.getCore().byId("centro").getValue():"0"; //centro 
        var PRY = (sap.ui.getCore().byId("idDialogProyecto").getValue().trim().length>0)?sap.ui.getCore().byId("idDialogProyecto").getValue():"0"; //centro 
        var ADMD = (sap.ui.getCore().byId("idDialogAdministracionI").getValue().trim().length>0)?sap.ui.getCore().byId("idDialogAdministracionI").getValue():"0"; 
        var ADMH = (sap.ui.getCore().byId("idDialogAdministracionF").getValue().trim().length>0)?sap.ui.getCore().byId("idDialogAdministracionF").getValue():"0";
        var ZOND = (sap.ui.getCore().byId("idDialogZonaI").getValue().trim().length>0)?sap.ui.getCore().byId("idDialogZonaI").getValue():"0"; //centro 
        var ZONH = (sap.ui.getCore().byId("idDialogZonaF").getValue().trim().length>0)?sap.ui.getCore().byId("idDialogZonaF").getValue():"0"; 
        var CAMD = (sap.ui.getCore().byId("idDialogCampoI").getValue().trim().length>0)?sap.ui.getCore().byId("idDialogCampoI").getValue():"0";
        var CAMH = (sap.ui.getCore().byId("idDialogCampoF").getValue().trim().length>0)?sap.ui.getCore().byId("idDialogCampoF").getValue():"0";
        var PLN1 = sap.ui.getCore().byId("option1Real").getSelected();//sociedad CO
        var PLN2 = sap.ui.getCore().byId("option2Plan").getSelected();//sociedad CO
        var PLN = PLN1?"R":"P";
        //var texto = "s4h/sap/bc/ZSAGW_SMART/Para/RP/" + FECHA + "/PD/PF/mat";
        //CO/{ID}/{SCO}/{BUK}/{CEN}/{PRY}/{CEN}/{FECD}/{FECH}/{ADMD}/{ADMH}/{ZOND}/{ZONH}/{CAMD}/{CAMH}/{PLN}
        //CO/{ID}/{SCO}/{BUK}/{CEN}/{PRY}/{FECD}/{FECH}/{ADMD}/{ADMH}/{ZOND}/{ZONH}/{CAMD}/{CAMH}/{PLN}
        //var texto = "/s4h/sap/bc/zsagw_smart/CO/REP/8410/8410/8413/P01/20210322/20210328/01/0/07/0/1031/0/R";
        var texto = "/s4h/sap/bc/zsagw_smart/CO/REP/"+SCO+"/"+BUK+"/"+CEN+"/"+PRY+"/"+FECHA+"/"+FECHA2+"/"+ADMD+"/"+ADMH+"/"+ZOND+"/"+ZONH+"/"+CAMD+"/"+CAMH+"/"+PLN;
        console.log(texto);
        $.ajax(texto, {
        type: 'GET',
        async: false,
        beforeSend: function (xhr) {
        xhr.setRequestHeader("X-CSRF-Token", "Fetch");
          },
          success: function (response) {
            console.log(response);
             //var oModelJSON = new sap.ui.model.json.JSONModel(response);
             var varT_PLAGUICIDAS = response.ITAB;//oModelJSON.getProperty("/TI_REP_PARTE");
             oModel.setProperty("/tblPlagRep", varT_PLAGUICIDAS);
  
                  /*  var sorters = [];
                    var sorter;
            
                    sorter = new sap.ui.model.Sorter("ZNUM_PARTE", true);
                    sorters.push(sorter);
                    sorter = new sap.ui.model.Sorter("ZITEM", true);
                    sorters.push(sorter);
            
                    // Actualiza la lista
                    var list = this.byId("idTableReporte");
                    var binding = list.getBinding("rows");
                    binding.filter([], "Application");
                    binding.sort(sorters);*/
          }.bind(this),
          error: function (response) {
  
            console.log(response);
          }.bind(this)
        });
  
      },
      liveChangeNumParte: function () {
  
        var oView = this.getView();
        var oModel = oView.getModel("myParam");
  
        var varBuscarNumParte = this.getView().byId("idBuscarNumParte").getValue();
        console.log(varBuscarNumParte);
  
        // A�adir los filtros para buscar
        var aFilters = [];
        if (varBuscarNumParte && varBuscarNumParte.length > 0) {
          var filter = new sap.ui.model.Filter("ZNUM_PARTE", sap.ui.model.FilterOperator.Contains, varBuscarNumParte);
          aFilters.push(filter);
        }
  
        var sorters = [];
        var sorter;
  
        sorter = new sap.ui.model.Sorter("ZNUM_PARTE", true);
        sorters.push(sorter);
        sorter = new sap.ui.model.Sorter("ZITEM", true);
        sorters.push(sorter);
        console.log(sorters);
        // Actualiza la lista  
        var list = this.byId("idTableReporte");
        var binding = list.getBinding("rows");
        binding.filter(aFilters, "Application");
        binding.sort(sorters);
      },
  
      pressRefrescarTabla: function () {
  
        var oView = this.getView();
        var oModel = oView.getModel("myParam");
  
        //this.getView().byId("idBuscarNumParte").setValue("");
        oModel.setProperty('/tblPlagRep',[]);
        //this.getData1();
      },
  
      pressDailogFiltro: function () {
  
        var oThis = this;
        var oModel = oThis.getView().getModel("myParam");
        var FECHA = new Date();
        var FECHAA = this.zero(FECHA.getDate())+ "."+this.zero(FECHA.getMonth()+1)+"."+FECHA.getFullYear();
        if(bandera =!FECHAA){
           var FECHAA = bandera;
        }
        var oDialog = new sap.m.Dialog("Dialog2", {
          icon: 'sap-icon://filter',
          title: "Asigne filtros",
          resizable: true,
          draggable: true,
          contentWidth: "600px",
          type: "Message",
          content: [
            new sap.m.Label({
              text: "Datos de organización",
              width: "100%",
              textAlign: "Left",
              design: "Bold"
            }),
            new sap.m.Toolbar({
              height: "auto",
              width: "100%",
              content: [new sap.m.Label({
                text: " ",
                width: "100%",
                design: "Bold"
              })]
            }),
            new sap.m.Toolbar({
              height: "auto",
              width: "100%",
              content: [new sap.m.Label({
                text: "Sociedad CO:",
                width: "40%",
                textAlign: "Right"
              }), new sap.m.Input({
                id: "idDialogNumParteI",
                value: "",
                editable: true,
                width: "29%"
              }), new sap.m.Label({
                text: "a",
                width: "2%",
                visible:false,
                textAlign: "Center"
              }), new sap.m.Input({
                id: "idDialogNumParteF",
                value: "",
                editable: true,
                visible:false,
                width: "29%"
              })]
            }),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.Toolbar({
              height: "auto",
              width: "100%",
              content: [new sap.m.Label({
                text: "Sociedad: ",
                width: "40%",
                textAlign: "Right"
              }), new sap.m.Input({
                id: "idDialogItemI",
                value: "",
                editable: true,
                width: "29%"
              }), new sap.m.Label({
                text: "a",
                width: "2%",
                visible:false,
                textAlign: "Center"
              }), new sap.m.Input({
                id: "idDialogItemF",
                value: "",
                editable: true,
                visible:false,
                width: "29%"
              })]
            }),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.Toolbar({
              height: "auto",
              width: "100%",
              content: [new sap.m.Label({
                text: "Centro: ",
                width: "45%",
                textAlign: "Right"
              }),new sap.m.Input({
                id: "centro",
                value: "",
                editable: true,
                width: "29%"
              }),new sap.m.Label({
                text: " ",
                width: "35%",
                textAlign: "Center"
              })]
            }),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.Label({
              text: "Datos de campo",
              width: "100%",
              textAlign: "Left",
              design: "Bold"
            }),
            new sap.m.Toolbar({
              height: "auto",
              width: "100%",
              content: [new sap.m.Label({
                text: " ",
                width: "100%",
                design: "Bold"
              })]
            }),
            new sap.m.Toolbar({
              height: "auto",
              width: "100%",
              content: [new sap.m.Label({
                text: "Proyecto: ",
                width: "38%",
                textAlign: "Right"
              }), new sap.m.Input({
                id: "idDialogProyecto",
                value: "P01",
                editable: true,
                width: "27%"
              }), new sap.m.Label({
                text: " ",
                width: "35%",
                textAlign: "Center"
              })]
            }),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.Toolbar({
              height: "auto",
              width: "100%",
              content: [new sap.m.Label({
                text: "Administración: ",
                width: "37%",
                textAlign: "Right"
              }), new sap.m.Input({
                id: "idDialogAdministracionI",
                value: "",
                editable: true,
                width: "29%"
              }), new sap.m.Label({
                text: "a",
                width: "2%",
                visible:true,
                textAlign: "Center"
              }), new sap.m.Input({
                id: "idDialogAdministracionF",
                value: "",
                editable: true,
                visible:true,
                width: "29%"
              })]
            }),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.Toolbar({
              height: "auto",
              width: "100%",
              content: [new sap.m.Label({
                text: "Zona: ",
                width: "40%",
                textAlign: "Right"
              }), new sap.m.Input({
                id: "idDialogZonaI",
                value: "",
                editable: true,
                width: "29%"
              }), new sap.m.Label({
                text: "a",
                width: "2%",
                textAlign: "Center"
              }), new sap.m.Input({
                id: "idDialogZonaF",
                value: "",
                editable: true,
                width: "29%"
              })]
            }),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.Toolbar({
              height: "auto",
              width: "100%",
              content: [new sap.m.Label({
                text: "Campo: ",
                width: "40%",
                textAlign: "Right"
              }), new sap.m.Input({
                id: "idDialogCampoI",
                value: "",
                editable: true,
                width: "29%"
              }), new sap.m.Label({
                text: "a",
                width: "2%",
                textAlign: "Center"
              }), new sap.m.Input({
                id: "idDialogCampoF",
                value: "",
                editable: true,
                width: "29%"
              })]
            }),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.Toolbar({
              height: "auto",
              width: "100%",
              content: [new sap.m.Label({
                text: "Código de Labor: ",
                width: "40%",
                visible:false,
                textAlign: "Right"
              }), new sap.m.Input({
                id: "idDialogCodLaborI",
                value: "",
                editable: true,
                visible:false,
                width: "29%"
              }), new sap.m.Label({
                text: "a",
                width: "2%",
                visible:false,
                textAlign: "Center"
              }), new sap.m.Input({
                id: "idDialogCodLaborF",
                value: "",
                editable: true,
                visible:false,
                width: "29%"
              })]
            }),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.Toolbar({
              height: "auto",
              width: "100%",
              content: [new sap.m.Label({
                text: "Cultivo: ",
                width: "40%",
                textAlign: "Right"
              }), new sap.m.Input({
                id: "idDialogCultivoI",
                value: "",
                editable: true,
                width: "29%"
              }), new sap.m.Label({
                text: "a",
                width: "2%",
                textAlign: "Center"
              }), new sap.m.Input({
                id: "idDialogCultivoF",
                value: "",
                editable: true,
                width: "29%"
              })]
            }),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.Toolbar({
              height: "auto",
              width: "100%",
              content: [new sap.m.Label({
                text: "Fecha reporte: ",
                width: "38%",
                textAlign: "Right"
              }), , new sap.m.DatePicker("idDialogFecha", {
                valueFormat: "yyyyMMdd",
                displayFormat: "dd.MM.yyyy",
                //dateValue: new Date(),
                value: FECHAA,
                width: "29%"
              }), new sap.m.Label({
                text: "a",
                width: "2%",
                textAlign: "Center"
              }),new sap.m.DatePicker("idDialogFecha2", {
                valueFormat: "yyyyMMdd",
                displayFormat: "dd.MM.yyyy",
                //dateValue: new Date(),
                value: FECHAA,
                width: "29%"
              }),]
            }),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.Toolbar({
              height: "auto",
              width: "100%",
              content: [new sap.m.Label({
                text: "Orden: ",
                width: "40%",
                visible:false,
                textAlign: "Right"
              }), new sap.m.Input({
                id: "idDialogCodProgramacionI",
                value: "",
                visible:false,
                editable: true,
                width: "29%"
              }), new sap.m.Label({
                text: "a",
                width: "2%",
                visible:false,
                textAlign: "Center"
              }), new sap.m.Input({
                id: "idDialogCodProgramacionF",
                value: "",
                visible:false,
                editable: true,
                width: "29%"
              })]
            }),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.ToolbarSpacer({}),
            new sap.m.Label({
              text: "Tipo de coste",
              width: "100%",
              textAlign: "Left",
              design: "Bold"
            }),
            new sap.m.Toolbar({
              height: "auto",
              width: "100%",
              content: [new sap.m.Label({
                text: " ",
                width: "100%",
                design: "Bold"
              })]
            }),
            new sap.m.Toolbar({
                height: "auto",
                width: "100%",
                content: [
              new sap.m.Label({
                text: "",
                width: "25%",
                textAlign: "Left",
                design: "Bold"
              }),         
                  new sap.m.RadioButtonGroup({                     
                columns:5,
                buttons: [
                    new sap.m.RadioButton({
                    id:"option1Real",
                    text: "Real"
                }),
                    new sap.m.RadioButton({
                    id:"option2Plan",
                    text: "Plan"
                })]
                })]
              }),            
          ],
          afterClose: function () {
            oDialog.destroy();
          },
          afterOpen: function () {
  
          },
          beginButton: new sap.m.Button({
            text: 'Filtrar',
            icon: 'sap-icon://add-filter',
            press: function () {
              var view = sap.ui.getCore();
              var inputs = [
                view.byId("idDialogFecha")
              ];
  
              jQuery.each(inputs, function (i, input) {
                if (!input.getValue()) {
                  input.setValueState("Error");
                  input.setValueStateText("Campo Requerido");
                } else {
                  input.setValueState("None");
                }
              });
  
              var afirmacion = true;
              jQuery.each(inputs, function (i, input) {
                if ("Error" === input.getValueState()) {
                  afirmacion = false;
                  return false;
                }
              });
  
              if (afirmacion) {
  
                var varDialogNumParteI = sap.ui.getCore().byId("idDialogNumParteI").getValue();
                var varDialogNumParteF = sap.ui.getCore().byId("idDialogNumParteF").getValue();
                var varDialogItemI = sap.ui.getCore().byId("idDialogItemI").getValue();
                var varDialogItemF = sap.ui.getCore().byId("idDialogItemF").getValue();
                var varDialogFecha = sap.ui.getCore().byId("idDialogFecha").getValue();
                FECHAT = varDialogFecha;
                console.log(FECHAT);
                var fechanuevaselect= varDialogFecha.split(".");
                var varDialogFecha2=fechanuevaselect[2]+fechanuevaselect[1]+fechanuevaselect[0];
                console.log(varDialogFecha);
                bandera=sap.ui.getCore().byId("idDialogFecha").getValue();
                var varDialogProyecto = sap.ui.getCore().byId("idDialogProyecto").getValue();
                var varDialogAdministracionI = sap.ui.getCore().byId("idDialogAdministracionI").getValue();
                var varDialogAdministracionF = sap.ui.getCore().byId("idDialogAdministracionF").getValue();
                var varDialogZonaI = sap.ui.getCore().byId("idDialogZonaI").getValue();
                var varDialogZonaF = sap.ui.getCore().byId("idDialogZonaF").getValue();
                var varDialogCampoI = sap.ui.getCore().byId("idDialogCampoI").getValue();
                var varDialogCampoF = sap.ui.getCore().byId("idDialogCampoF").getValue();
                var varDialogCodLaborI = sap.ui.getCore().byId("idDialogCodLaborI").getValue();
                var varDialogCodLaborF = sap.ui.getCore().byId("idDialogCodLaborF").getValue();
                var varDialogCultivoI = sap.ui.getCore().byId("idDialogCultivoI").getValue();
                var varDialogCultivoF = sap.ui.getCore().byId("idDialogCultivoF").getValue();
                var varDialogUsuario = "";//sap.ui.getCore().byId("idDialogUsuario").getValue();
                var varDialogCodProgramacionI = sap.ui.getCore().byId("idDialogCodProgramacionI").getValue();
                var varDialogCodProgramacionF = sap.ui.getCore().byId("idDialogCodProgramacionF").getValue();
                this.getDataplus();
                var aFilters = [];
                /*if (varDialogNumParteI !== "") {
                  if (varDialogNumParteF !== "") {
                    var filter = new sap.ui.model.Filter("ZNUM_PARTE", sap.ui.model.FilterOperator.BT, varDialogNumParteI, varDialogNumParteF);
                    aFilters.push(filter);
                  } else {
                    filter = new sap.ui.model.Filter("ZNUM_PARTE", sap.ui.model.FilterOperator.Contains, varDialogNumParteI);
                    aFilters.push(filter);
                  }
                }*/
  
               /* if (varDialogItemI !== "") {
                  if (varDialogItemF !== "") {
                    filter = new sap.ui.model.Filter("ZITEM", sap.ui.model.FilterOperator.BT, varDialogItemI, varDialogItemF);
                    aFilters.push(filter);
                  } else {
                    filter = new sap.ui.model.Filter("ZITEM", sap.ui.model.FilterOperator.Contains, varDialogItemI);
                    aFilters.push(filter);
                  }
                }*/
  
  
  
                /*if (varDialogProyecto !== "") {
                  filter = new sap.ui.model.Filter("ZPROYECTO", sap.ui.model.FilterOperator.Contains, varDialogProyecto);
                  aFilters.push(filter);
                }*/
  
                /*if (varDialogAdministracionI !== "") {
                  if (varDialogAdministracionF !== "") {
                    var filter = new sap.ui.model.Filter("ADMIN", sap.ui.model.FilterOperator.BT, varDialogAdministracionI,
                      varDialogAdministracionF);
                    aFilters.push(filter);
                  } else {
                    var filter = new sap.ui.model.Filter("ADMIN", sap.ui.model.FilterOperator.Contains, varDialogAdministracionI);
                    aFilters.push(filter);
                  }
                }
  
                if (varDialogZonaI !== "") {
                  if (varDialogZonaF !== "") {
                    var filter = new sap.ui.model.Filter("ZONA", sap.ui.model.FilterOperator.BT, varDialogZonaI, varDialogZonaF);
                    aFilters.push(filter);
                  } else {
                    var filter = new sap.ui.model.Filter("ZONA", sap.ui.model.FilterOperator.Contains, varDialogZonaI);
                    aFilters.push(filter);
                  }
                }
  
                if (varDialogCampoI !== "") {
                  if (varDialogCampoF !== "") {
                    var filter = new sap.ui.model.Filter("CAMPO", sap.ui.model.FilterOperator.BT, varDialogCampoI, varDialogCampoF);
                    aFilters.push(filter);
                  } else {
                    var filter = new sap.ui.model.Filter("CAMPO", sap.ui.model.FilterOperator.Contains, varDialogCampoI);
                    aFilters.push(filter);
                  }
                }
  
                /*if (varDialogCodLaborI !== "") {
                  if (varDialogCodLaborF !== "") {
                    filter = new sap.ui.model.Filter("ZCOD_LABOR", sap.ui.model.FilterOperator.BT, varDialogCodLaborI, varDialogCodLaborF);
                    aFilters.push(filter);
                  } else {
                    filter = new sap.ui.model.Filter("ZCOD_LABOR", sap.ui.model.FilterOperator.Contains, varDialogCodLaborI);
                    aFilters.push(filter);
                  }
                }*/
  
                if (varDialogCultivoI !== "") {
                  if (varDialogCultivoF !== "") {
                    var filter = new sap.ui.model.Filter("CULTIVO", sap.ui.model.FilterOperator.BT, varDialogCultivoI, varDialogCultivoF);
                    aFilters.push(filter);
                  } else {
                    var filter = new sap.ui.model.Filter("CULTIVO", sap.ui.model.FilterOperator.Contains, varDialogCultivoI);
                    aFilters.push(filter);
                  }
                }
  
                /*if (varDialogUsuario !== "") {
                  filter = new sap.ui.model.Filter("ZUSUARIO", sap.ui.model.FilterOperator.Contains, varDialogUsuario);
                  aFilters.push(filter);
                }*/
  
                /*if (varDialogCodProgramacionI !== "") {//orden
                  if (varDialogCodProgramacionF !== "") {
                    filter = new sap.ui.model.Filter("ZCOD_PROGRAMACION", sap.ui.model.FilterOperator.BT, varDialogCodProgramacionI,
                      varDialogCodProgramacionF);
                    aFilters.push(filter);
                  } else {
                    filter = new sap.ui.model.Filter("ZCOD_PROGRAMACION", sap.ui.model.FilterOperator.Contains, varDialogCodProgramacionI);
                    aFilters.push(filter);
                  }
                }*/
  
               /* var sorters = [];
                var sorter;
  
                sorter = new sap.ui.model.Sorter("ZNUM_PARTE", true);
                sorters.push(sorter);
                sorter = new sap.ui.model.Sorter("ZITEM", true);
                sorters.push(sorter);*/
  
                // Actualiza la lista
                console.log(aFilters);
                var list = this.byId("idTableReporte");
                var binding = list.getBinding("rows");
                binding.filter(aFilters, "Application");
                //binding.sort(sorters);
  
                oDialog.close();
              } else {
                sap.m.MessageToast.show("Se requiere ingresar todas las fechas.");
              }
            }.bind(this)
          }),
          endButton: new sap.m.Button({
            text: 'Cancelar',
            icon: 'sap-icon://sys-cancel',
            press: function () {
              oDialog.close();
            }.bind(this)
          }),
        });
        oDialog.addStyleClass("sapUiSizeCompact");
        oDialog.open();
  
      },
  
      onPressExcel: function () {
        var oView = this.getView();
        var oModel = oView.getModel("myParam");
        var aProducts = this.getView().getModel("myParam").getProperty('/tblPlagRep');
        if(aProducts.length>0){
            this.onExport();
        }else{
            sap.m.MessageToast.show("Sin datos");
        }
       
      },
  
      onExport: function () {
        var aCols, aProducts, oSettings, oSheet;
  
        aCols = this.createColumnConfig();
        aProducts = this.getView().getModel("myParam").getProperty('/tblPlagRep');
        console.log(aProducts);
  
        oSettings = {
          workbook: {
            columns: aCols
          },
          dataSource: aProducts,
          fileName: "RepParteReporte.xlsx"
        };
  
        oSheet = new Spreadsheet(oSettings);
        oSheet.build()
          .then(function () {
            this.getView().setBusy(false);
            sap.m.MessageToast.show("Se realizó la exportación del reporte con éxito.");
          }.bind(this))
          .finally(function () {
            this.getView().setBusy(false);
            oSheet.destroy();
          }.bind(this));
      },
  
      createColumnConfig: function () {
  
        var aCols = [];
  
        aCols.push({
          label: 'Administración',
          property: 'ADMIN',
          type: 'string'
        });
        aCols.push({
          label: 'ID Puesto de trabajo',
          property: 'ARBID',
          type: 'string'
        });
        aCols.push({
          label: 'Puesto de trabajo',
          property: 'ARBPL',
          type: 'string'
        });
        aCols.push({
          label: 'Clase de orden',
          property: 'AUART',
          type: 'string'
        });
        aCols.push({
          label: 'Nº de orden',
          property: 'AUFNR',
          type: 'string'
        });
        aCols.push({
          label: 'Avance',
          property: 'AVANCE',
          type: 'string'
        });
        aCols.push({
          label: 'Unidades organizativas',
          property: 'AWORG',
          type: 'string'
        });
        aCols.push({
          label: 'Oper. de referencia',
          property: 'AWTYP',
          type: 'string'
        });
        aCols.push({
          label: 'Nº documento',
          property: 'BELNR',
          type: 'string'
        });
        aCols.push({
          label: 'Fec. contabilización',
          property: 'BUDAT',
          type: 'string'
        });
        aCols.push({
          label: 'Apunte contable',
          property: 'BUZEI',
          type: 'string'
        });
        aCols.push({
          label: 'Campaña',
          property: 'CAMPANA',
          type: 'string'
        });
        aCols.push({
          label: 'Campo',
          property: 'CAMPO',
          type: 'string'
        });
        aCols.push({
          label: 'Objetivo',
          property: 'CODPLAGA',
          type: 'string'
        });
        aCols.push({
          label: 'Cultivo',
          property: 'CULTIVO',
          type: 'string'
        }); 
        aCols.push({
          label: 'Desc. Labor',
          property: 'DESCRIP',
          type: 'string'
        });
        aCols.push({
          label: 'Desc. Labor',
          property: 'DESC_LAB',
          type: 'string'
        });
        aCols.push({
          label: 'Doc.Compra',
          property: 'EBELN',
          type: 'string'
        });
        aCols.push({
          label: 'Desc. equipo',
          property: 'EQKTX',
          type: 'string'
        });
        aCols.push({
          label: 'Etapa',
          property: 'ETAPA',
          type: 'string'
        });
        aCols.push({
          label: 'Fe.Ini.agoste',
          property: 'FFINCAM',
          type: 'string'
        });
        aCols.push({
          label: 'Fe.Nacimien',
          property: 'FINICAM',
          type: 'string'
        });
        aCols.push({
          label: 'Fe. Inicio Cosecha',
          property: 'FINICOS',
          type: 'string'
        });
        aCols.push({
          label: 'Ejercicio',
          property: 'GJAHR',
          type: 'string'
        });
        aCols.push({
          label: 'Hectáreas',
          property: 'HECTA',
          type: 'string'
        });
        aCols.push({
          label: 'Horas Totales',
          property: 'HORA_TOT',
          type: 'string'
        });
        aCols.push({
          label: 'Centro coste',
          property: 'KOSTL',
          type: 'string'
        });
        aCols.push({
          label: 'Clase coste',
          property: 'KSTAR',
          type: 'string'
        });
        aCols.push({
          label: 'Denom.breve',
          property: 'KTEXT1',
          type: 'string'
        });
        aCols.push({
          label: 'Desc. Centro coste',
          property: 'KTEXT_CECO',
          type: 'string'
        });
        aCols.push({
            label: 'Desc. clase coste',
            property: 'KTEXT_KSTAR',
            type: 'string'
          });        
        aCols.push({
          label: 'Cód. labor',
          property: 'LABOR',
          type: 'string'
        });
        aCols.push({
          label: 'Desc. Material',
          property: 'MAKTX',
          type: 'string'
        });
        aCols.push({
          label: 'Material',
          property: 'MATNR',
          type: 'string'
        });
        aCols.push({
          label: 'Cant. total registrada',
          property: 'MBGBTR',
          type: 'string'
        });
        aCols.push({
          label: 'UDM',
          property: 'MEINB',
          type: 'string'
        });
        aCols.push({
          label: 'Und',
          property: 'MEINS2',
          type: 'string'
        });
        aCols.push({
          label: 'Nomb. operario',
          property: 'NOMBRE',
          type: 'string'
        });
        aCols.push({
          label: 'Nº objeto',
          property: 'OBJNR',
          type: 'string'
        });
        aCols.push({
          label: 'Moneda',
          property: 'OWAER',
          type: 'string'
        });
        aCols.push({
          label: 'Ejercicio',
          property: 'PABRJ',
          type: 'string'
        });
        aCols.push({
          label: 'Semana',
          property: 'PABRP',
          type: 'string'
        });
        aCols.push({
          label: 'Obj. interlocutor',
          property: 'PAROB',
          type: 'string'
        });
        aCols.push({
          label: 'Período',
          property: 'PERIO',
          type: 'string'
        });
        aCols.push({
          label: 'PEP',
          property: 'POSID',
          type: 'string'
        });
        aCols.push({
          label: 'Desc. PEP',
          property: 'POST1',
          type: 'string'
        });
        aCols.push({
          label: 'Clase proyecto',
          property: 'PRART',
          type: 'string'
        });
        aCols.push({
          label: 'Quiebre Campo',
          property: 'QUIEBRE',
          type: 'string'
        });
        aCols.push({
          label: 'Doc. referencia',
          property: 'REFBN',
          type: 'string'
        });
        aCols.push({
          label: 'Reserva',
          property: 'RSNUM',
          type: 'string'
        });
        aCols.push({
          label: 'Doc. de anulación',
          property: 'STFLG',
          type: 'string'
        });
        aCols.push({
          label: 'Doc. anulado',
          property: 'STOKZ',
          type: 'string'
        });
        aCols.push({
          label: 'TarifMdaCO',
          property: 'TAR_CO',
          type: 'string'
        });
        aCols.push({
          label: 'TarifMdaOB',
          property: 'TAR_OB',
          type: 'string'
        });
        aCols.push({
          label: 'Tp.Campo',
          property: 'TIPCAMPO',
          type: 'string'
        });
        aCols.push({
          label: 'Tmpo Efec.',
          property: 'TPO_EFEC',
          type: 'string'
        });
        aCols.push({
          label: 'Tmpo Mrto',
          property: 'TPO_MRTO',
          type: 'string'
        });
        aCols.push({
          label: 'Texto breve',
          property: 'TXT',
          type: 'string'
        });
        aCols.push({
          label: 'Obj. origen',
          property: 'USPOB',
          type: 'string'
        });
        aCols.push({
          label: 'Equipo',
          property: 'USR00',
          type: 'string'
        });
        aCols.push({
          label: 'Operario',
          property: 'USR01',
          type: 'string'
        });
        aCols.push({
          label: 'Hectáreas',
          property: 'USR04',
          type: 'string'
        });
        aCols.push({
          label: 'Nº operación',
          property: 'VORNR',
          type: 'string'
        });
        aCols.push({
          label: 'Operación CO',
          property: 'VRGNG',
          type: 'string'
        });
        aCols.push({
          label: 'Valor moneda sociedad CO',
          property: 'WKGBTR',
          type: 'string'
        });
        aCols.push({
          label: 'Valor moneda objeto',
          property: 'WOGBTR',
          type: 'string'
        });
        aCols.push({
          label: 'Tipo valor',
          property: 'WRTTP',
          type: 'string'
        });
        aCols.push({
          label: 'Apunte contable doc. Ref.',
          property: 'ZEILE',
          type: 'string'
        });
        aCols.push({
          label: 'Zona',
          property: 'ZONA',
          type: 'string'
        });
    
  
        return aCols;
      },
  
      pressDialog: null,
      fnPopup: function () {
        var oModel = this.getView().getModel("oModel");
        var vthis = this;
        if (!this.pressDialog) {
          this.pressDialog = new sap.m.Dialog({
            title: "Filtro",
            type: "Message",
            contentWidth: "auto",
            content: [
              new sap.ui.layout.VerticalLayout({
                width: "100%",
                content: [
                  new sap.m.Toolbar({
                    content: [
                      new sap.m.Label({
                        width: "120px",
                        textAlign: "Left",
                        text: "N° de Parte: ",
                        required: true
                      }),
                      new sap.m.Input({
                        textAlign: "Left",
                        id: "IdParte",
                        maxLength: 40
                      })
                    ]
                  }),
                  new sap.m.Toolbar({
                    content: [
                      new sap.m.Label({
                        width: "120px",
                        textAlign: "Left",
                        text: "Item: ",
                        required: true
                      }),
                      new sap.m.Input({
                        textAlign: "Left",
                        id: "IdItem",
                        maxLength: 40
                      })
                    ]
                  }),
                  new sap.m.Toolbar({
                    content: [
                      new sap.m.Label({
                        width: "120px",
                        textAlign: "Left",
                        text: "Fecha: ",
                        required: true
                      }),
                      new sap.m.DatePicker({
                        id: "id_fechaf1",
                        valueFormat: "dd/MM/yyyy",
                        displayFormat: "dd/MM/yyyy"
                      })
                    ]
                  }),
                  new sap.m.Toolbar({
                    content: [
                      new sap.m.Label({
                        width: "120px",
                        textAlign: "Left",
                        text: "Proyecto: "
                      }),
                      new sap.m.Input({
                        textAlign: "Left",
                        id: "IdProyecto",
                        width: "40px",
                        maxLength: 3
                      })
                    ]
                  }),
                  new sap.m.Toolbar({
                    content: [
                      new sap.m.Label({
                        width: "120px",
                        textAlign: "Left",
                        text: "Administración: "
                      }),
                      new sap.m.Input({
                        textAlign: "Left",
                        id: "IdAdmi",
                        width: "40px",
                        maxLength: 3
                      })
                    ]
                  }),
                  new sap.m.Toolbar({
                    content: [
                      new sap.m.Label({
                        width: "120px",
                        textAlign: "Left",
                        text: "Zona: "
                      }),
                      new sap.m.Input({
                        textAlign: "Left",
                        id: "IdZona",
                        width: "40px",
                        maxLength: 3
                      })
                    ]
                  }),
                  new sap.m.Toolbar({
                    content: [
                      new sap.m.Label({
                        width: "120px",
                        textAlign: "Left",
                        text: "Campo: "
                      }),
                      new sap.m.Input({
                        textAlign: "Left",
                        id: "IdCampo",
                        width: "70px",
                        maxLength: 9
                      })
                    ]
                  }),
                  new sap.m.Toolbar({
                    content: [
                      new sap.m.Label({
                        width: "120px",
                        textAlign: "Left",
                        text: "Codigo de Labor: "
                      }),
                      new sap.m.Input({
                        textAlign: "Left",
                        id: "IdLabor",
                        width: "80px",
                        maxLength: 8
                      })
                    ]
                  }),
                  new sap.m.Toolbar({
                    content: [
                      new sap.m.Label({
                        width: "120px",
                        textAlign: "Left",
                        text: "Cultivo: "
                      }),
                      new sap.m.Input({
                        textAlign: "Left",
                        id: "IdCultivo",
                        width: "40px",
                        maxLength: 2
                      })
                    ]
                  }),
                  new sap.m.Toolbar({
                    content: [
                      new sap.m.Label({
                        width: "120px",
                        textAlign: "Left",
                        text: "Usuario: "
                      }),
                      new sap.m.Input({
                        textAlign: "Left",
                        id: "IdUsuario",
                        width: "100px",
                        maxLength: 30
                      })
                    ]
                  }),
                  new sap.m.Toolbar({
                    content: [
                      new sap.m.Label({
                        width: "120px",
                        textAlign: "Left",
                        text: "Cod. Prog.: "
                      }),
                      new sap.m.Input({
                        textAlign: "Left",
                        id: "IdCodigo",
                        width: "100px",
                        maxLength: 9
                      })
                    ]
                  })
                ]
              })
            ],
            beginButton: new sap.m.Button({
              text: 'Aplicar',
              icon: "sap-icon://save",
              press: function () {
                var result = oModel.getProperty("/tblPlaguicidas2");
                var keyFundo = sap.ui.getCore().byId("id_fundo1").getSelectedKey();
                var keyModulo = sap.ui.getCore().byId("id_modulo1").getSelectedKeys();
                var keyCultivo = sap.ui.getCore().byId("id_cultivo1").getSelectedKeys();
                var keyVariedad = sap.ui.getCore().byId("id_variedad1").getSelectedKeys();
                var keyCampana = sap.ui.getCore().byId("id_campana1").getSelectedKeys();
                var keyLabor = sap.ui.getCore().byId("id_labor1").getSelectedKeys();
                var fecha_inicio = sap.ui.getCore().byId("id_fechai1")._lastValue;
                var fecha_fin = sap.ui.getCore().byId("id_fechaf1")._lastValue;
                FECHAT = fecha_fin;
                fecha_inicio = funciones.fnConvertirStringtoDate(fecha_inicio);
                fecha_fin = funciones.fnConvertirStringtoDate(fecha_fin);
  
                /*if (keyFundo != "") {
                  result = result.filter(result => result.FUNDO == keyFundo);
                }
                if (keyModulo != "" && keyModulo != "T") {
                  result = result.filter(result => result.MODULO == keyModulo);
                }
                if (keyCultivo != "" && keyCultivo != "T") {
                  result = result.filter(result => result.CULTIVO == keyCultivo);
                }
                if (keyVariedad != "" && keyVariedad != "T") {
                  result = result.filter(result => result.VARIEDAD == keyVariedad);
                }
                if (keyCampana != "" && keyCampana != "T") {
                  result = result.filter(result => result.DES_CAMPANA == keyCampana);
                }
                if (keyLabor != "" && keyLabor != "T") {
                  result = result.filter(result => result.COD_LABOR == keyLabor);
                }
                result = result.filter(a => funciones.fnConvertirStringtoDate(a.FECHAI).getTime() <= fecha_fin.getTime() &&
                  funciones.fnConvertirStringtoDate(a.FECHAF).getTime() >= fecha_inicio.getTime());
                oModel.setProperty("/tblPlaguicidas", result);*/
                this.pressDialog.close();
  
              }.bind(this)
            }),
            endButton: new sap.m.Button({
              text: "Cancelar",
              icon: "sap-icon://sys-cancel",
              press: function () {
                this.pressDialog.close();
              }.bind(this)
            })
  
          });
          this.getView().addDependent(this.pressDialog);
          this.pressDialog.addStyleClass("style_dialog");
          var fechaactual = funciones.fnCalcularFechaActual();
          sap.ui.getCore().byId("id_fechai").setValue(fechaactual);
          sap.ui.getCore().byId("id_fechaf").setValue(fechaactual);
        }
        this.pressDialog.open();
  
        // vthis.getView().addDependent(pressDialog);
        // pressDialog.addStyleClass("style_dialog");
        // pressDialog.open();
      },
      handleSearch: function (oEvent) {
        var vthis = this;
  
        var filters = [];
        var query = oEvent.getSource().getValue();
        if (query && query.length > 0) {
          var filter = new sap.ui.model.Filter("MODULO", sap.ui.model.FilterOperator.Contains, query);
          filters.push(filter);
        }
        console.log(filters);
        var tbl = vthis.getView().byId("idTableReporte");
        var binding = tbl.getBinding("rows");
        console.log(binding);
        binding.filter(filters);
      },
      btnRegresar: function () {
        this.getRouter().navTo("vMain");
      },
      getRouter: function () {
        return sap.ui.core.UIComponent.getRouterFor(this);
      },
      /**
       * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
       * (NOT before the first rendering! onInit() is used for that one!).
       * @memberOf smartagri.Proyecto_SmartAgri.view.vista_plaguicidas
       */
      //  onBeforeRendering: function() {
      //
      //  },
  
      /**
       * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
       * This hook is the same one that SAPUI5 controls get after being rendered.
       * @memberOf smartagri.Proyecto_SmartAgri.view.vista_plaguicidas
       */
      //  onAfterRendering: function() {
      //
      //  },
  
      /**
       * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
       * @memberOf smartagri.Proyecto_SmartAgri.view.vista_plaguicidas
       */
      //  onExit: function() {
      //
      //  }
  
    });
  });