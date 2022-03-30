sap.ui.define([
  'sap/base/util/deepExtend',
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/ValueState",
  'sap/m/Button',
  'sap/m/Dialog',
  "sap/m/DialogType",
  "sap/m/ButtonType",
  'sap/m/Text',
  'sap/ui/layout/VerticalLayout',
  'sap/ui/layout/HorizontalLayout',
  "sap/ui/core/Fragment",

  'sap/m/DatePicker',
  "sap/m/MessageToast",
  'sap/m/ColumnListItem',
  "./funciones",
  'sap/m/MessageBox',
  'sap/ui/model/json/JSONModel',
  'sap/m/Label',
  'sap/m/TimePicker',
  'sap/m/ComboBox',
  'sap/m/Token'
], function (deepExtend, Controller, ValueState, Button, Dialog, DialogType, ButtonType, Text, VerticalLayout, HorizontalLayout, Fragment, Input,
  MessageToast, funciones, DatePicker, ColumnListItem,
  MessageBox, JSONModel, Label, TimePicker, ComboBox, Token ) {
  "use strict";

  var oMessageTemplate = new sap.m.MessagePopoverItem({
    //type: '{type}',
    title: '{title}',
    // description: '{description}',
    subtitle: '{subtitle}',
    counter: '{counter}',
    groupName: '{group}'
      // link: oLink
  });
  return Controller.extend("nsa.ui5appssa.controller.vista_programacion", {

    /**
     * Called when a controller is instantiated and its View controls (if available) are already created.
     * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
     * @memberOf smartagri.Proyecto_SmartAgri.view.vista_programacion
     */
    onInit: function () {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("vista_programacion").attachMatched(this._onRouteMatched, this);
      this.getView().byId("Pag_LaborCampo").addStyleClass("classPag_LaborCampo");
     

    },
    insertRows:function(value,table,model,startRowIndex,startProperty){

        var that = this;
        var rows = value.split(/\n/);
        var cells = table.getBindingInfo('items').template.getCells();
        var templateItem = [];
        var itemsPath = table.getBindingPath('items');
        var itemsArray = table.getModel(model).getProperty(itemsPath);
        var startPropertyIndex = 0;
        var model = table.getModel(model);
        if(startRowIndex === undefined){
            startRowIndex = 0;
        }
        for (var int = 0; int < cells.length; int++) {
            var cell_element = cells[int];
            var path = cell_element.getBindingPath('value');
            templateItem.push(path);
            if(path === startProperty){
                startPropertyIndex = int;
            }
            
        }
    
        for (var int = 0; int < rows.length-1; int++) {
            var rows_element = rows[int];
            var cells = rows_element.split(/\t/);

            
            var originalObject = model.getProperty(itemsPath+"/"+startRowIndex++);
            if(originalObject === undefined){
                originalObject = {};
                for(var k =0; k < templateItem.length; k++){
                    originalObject[templateItem[k]] =undefined;
                }
                itemsArray.push(originalObject);
            }
            
            var lesserLength = Math.min(templateItem.length,(cells.length + startPropertyIndex));
            for(int2 = startPropertyIndex,intValue=0; int2 < lesserLength; int2++,intValue++){
                var name = templateItem[int2];
                originalObject[name] =cells[intValue];
                
            }
            
        }
        model.refresh();
        
        
    
    },
    onHelpMateriales: function(){
      var oModel = this.getView().getModel("myParam");
      var CAMPO = this.getView().byId("inputcampo").getValue();
      var COD_LAB = this.getView().byId("inputlabor").getValue();
      var FECHA = sap.ui.getCore().byId("id_fechaf").getValue();
      var NRO_PROG = this.getView().byId("inputNroProg").getValue();
      var texto = "s4h/sap/bc/ZSAGW_SMART/Para/AYU/"+ FECHA +"/"+ CAMPO +"/MAT/"+COD_LAB+"-"+NRO_PROG;
      console.log(texto);
      $.ajax(texto, {
      type: 'GET',
      async: true,
      beforeSend: function (xhr) {
      xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        success: function (response) {
          console.log(response);
           var oModelJSON = new sap.ui.model.json.JSONModel(response);
           console.log(oModelJSON);
           var varT_DETALLE = oModelJSON.getProperty("/ITAB");
           console.log(varT_DETALLE);
           oModel.setProperty("/tblHelpMateriales", varT_DETALLE);
           console.log(oModel);

        }.bind(this),
        error: function (response) {
          console.log(response);

        }.bind(this)
      });
    },
    onHelpForma: function(){
      var oModel = this.getView().getModel("myParam");
      var texto = "s4h/sap/bc/ZSAGW_SMART/Para/AYU/0/0/FORMA/0";
      console.log(texto);
      $.ajax(texto, {
      type: 'GET',
      async: true,
      beforeSend: function (xhr) {
      xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        success: function (response) {
          console.log(response);
           var oModelJSON = new sap.ui.model.json.JSONModel(response);
           console.log(oModelJSON);
           var varT_DETALLE = oModelJSON.getProperty("/ITAB");
           console.log(varT_DETALLE);
           oModel.setProperty("/tblHelpForma", varT_DETALLE);
           console.log(oModel);

        }.bind(this),
        error: function (response) {
          console.log(response);

        }.bind(this)
      });
    },
    onHelpProveedor: function(){
      var model = this.getView().getModel("myParam");
      var texto = "s4h/sap/bc/ZSAGW_SMART/Para/AYU/0/0/PROV/0";
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
           var varT_DETALLE = oModelJSON.getProperty("/ITAB");
           model.setProperty("/tblHelpProveedor", varT_DETALLE);
           console.log(model);

        }.bind(this),
        error: function (response) {
          console.log(response);

        }.bind(this)
      });
    },
    onChangeFinal: function(){
      console.log("laptop");
      var EFEC
      var INICIAL = this.getView().byId("efectivo8787").getValue();
      var FINAL = this.getView().byId("final").getValue();
      console.log(FINAL);
      if(FINAL!=""){
      EFEC = FINAL-INICIAL;}
      else{
      EFEC=0;
      }
      this.getView().byId("efectivo").setValue(EFEC);
    },
    calculardiferencia: function(){
    var hora_inicio = this.getView().byId("iniciop").getValue();
    var conv_hora_inicio=hora_inicio.split(':');
    var conver_hora_inicio = conv_hora_inicio[0]+":"+conv_hora_inicio[1];
    var hora_final = this.getView().byId("finp").getValue();
    var conv_hora_final=hora_final.split(':');
    var conver_hora_final = conv_hora_final[0]+":"+conv_hora_final[1];
    console.log(conver_hora_inicio);
    console.log(conver_hora_final);
    var minutos_inicio = conver_hora_inicio.split(':').reduce((p, c) => parseInt(p) * 60 + parseInt(c));
    var minutos_final = conver_hora_final.split(':').reduce((p, c) => parseInt(p) * 60 + parseInt(c));
    console.log(minutos_inicio);
    if (minutos_final < minutos_inicio) return;

    // Diferencia de minutos
    var diferencia = minutos_final - minutos_inicio;

    // C�lculo de horas y minutos de la diferencia
    var horas = Math.floor(diferencia / 60);
    var minutos = diferencia % 60;
    console.log(horas);
    console.log(minutos);
    var minutosenteros= minutos/ 60;
    var horariototal=horas + minutosenteros;
    this.getView().byId("clabor").setValue(horariototal.toFixed(3));
    this.getView().byId("hfin2").setValue(horariototal.toFixed(3));
    },
    onHelpFuente: function(){
      var model = this.getView().getModel("myParam");
      var texto = "s4h/sap/bc/ZSAGW_SMART/Para/AYU/0/0/FUENTE/0";
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
           var varT_DETALLE = oModelJSON.getProperty("/ITAB");
           model.setProperty("/tblHelpFuente", varT_DETALLE);
           console.log(model);

        }.bind(this),
        error: function (response) {
          console.log(response);

        }.bind(this)
      });
    },
    onValueHelpLabor: function() {
      var oModel = this.getView().getModel("myParam");
      var prueba = oModel.getData().cols;
      var busy = new sap.m.BusyDialog();
      busy.open();
      console.log(prueba);
      var oView = this.getView();
      var CAMPO = this.getView().byId("inputcampo").getValue();
      var ZQUIEBRE = this.getView().byId("inputQuiebre").getValue();
      var oDate = new Date();
      var months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
      var sCurrentDate = this.addZeroBefore(oDate.getDate()) + "." + months[oDate.getMonth()]+ "." +  oDate.getFullYear();
      var FECHA = (sap.ui.getCore().byId("id_fechaf")!=undefined)?sap.ui.getCore().byId("id_fechaf").getValue():sCurrentDate;     
      //var FECHA = sap.ui.getCore().byId("id_fechaf").getValue();
      var texto = "s4h/sap/bc/ZSAGW_SMART/Para/AYU/"+ FECHA +"/"+ CAMPO +"-"+ZQUIEBRE + "/LABOR/0";
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
           var varT_DETALLE = oModelJSON.getProperty("/ITAB");
           oModel.setProperty("/tblHelpLabor", varT_DETALLE);
           console.log(oModel);


      busy.close();
        }.bind(this),
        error: function (response) {
          console.log(response);
          busy.close();
        }.bind(this)
      });
        if (!this.byId("DetalleLabor")) {

        Fragment.load({
          id: oView.getId(),
          name: "nsa.ui5appssa.view.LaborSelectHelp",
          controller: this
        }).then(function (oDialog) {

          oView.addDependent(oDialog);
          oDialog.open();
        });
      } else {
        this.byId("DetalleLabor").open();
      }
    },
    onValueHelpPueTrab: function() {
      var oModel = this.getView().getModel("myParam");
      var prueba = oModel.getData().cols;
      var busy = new sap.m.BusyDialog();
      busy.open();
      console.log(prueba);
      var oView = this.getView();
      var CAMPO = this.getView().byId("inputcampo").getValue();
      var COD_LAB = this.getView().byId("inputlabor").getValue();
      var oDate = new Date();
      var months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
      var sCurrentDate = this.addZeroBefore(oDate.getDate()) + "." + months[oDate.getMonth()]+ "." +  oDate.getFullYear();
      var FECHA = (sap.ui.getCore().byId("id_fechaf")!=undefined)?sap.ui.getCore().byId("id_fechaf").getValue():sCurrentDate;        
      //var FECHA = sap.ui.getCore().byId("id_fechaf").getValue();
      var NRO_PROG = this.getView().byId("inputNroProg").getValue();
      var texto = "s4h/sap/bc/ZSAGW_SMART/Para/AYU/"+ FECHA +"/"+ CAMPO +"/PT_TRB/"+COD_LAB+"-"+NRO_PROG;
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
           var varT_DETALLE = oModelJSON.getProperty("/ITAB");
           oModel.setProperty("/tblHelpPueTrab", varT_DETALLE);
           console.log(oModel);


      busy.close();
        }.bind(this),
        error: function (response) {
          console.log(response);
          busy.close();
        }.bind(this)
      });
        if (!this.byId("DetallePueTrab")) {

        Fragment.load({
          id: oView.getId(),
          name: "nsa.ui5appssa.view.PuestoTrabSelectHelp",
          controller: this
        }).then(function (oDialog) {

          oView.addDependent(oDialog);
          oDialog.open();
        });
      } else {
        this.byId("DetallePueTrab").open();
      }
      this.onHelpMateriales();
    },
    onSelectionChangePueTrab: function (oEvent) {
          var oModel = this.getView().getModel("myParam");
          var selectionrow = oEvent.getParameter("rowContext").getObject();
          console.log(selectionrow);
          oModel.setProperty("/tblHelpPueTrabSeleccionado", selectionrow);
           var campo1 = oModel.getProperty("/tblHelpPueTrabSeleccionado/ZARBPL");
           var campo2 = oModel.getProperty("/tblHelpPueTrabSeleccionado/DESARBPL");
           console.log(campo2);
           var campo3 = oModel.getProperty("/tblHelpPueTrabSeleccionado/LEINH");
            this._oInput = this.getView().byId("inputPueTrab");
            this._oInput.setValue(campo1);
            this._oInput2 = this.getView().byId("inputDescripPueTrab");
            this._oInput2.setValue(campo2);
            this._oInput3 = this.getView().byId("inputUM");
            this._oInput3.setValue(campo3);
            this.getView().byId("inputCantNot").setValue("0.000");
            this.getView().byId("clabor").setValue("0.000");
          this.byId("DetallePueTrab").close();
          this.byId("DetallePueTrab").destroy();
          this.onHelpMateriales();
    },
    onClosePueTrab: function() {
      console.log("nuevo");
      this.byId("DetallePueTrab").close();
      this.byId("DetallePueTrab").destroy();
    },

    onValueHelpImplementos: function() {
    var oModel = this.getView().getModel("myParam");
      var prueba = oModel.getData().cols;
      var busy = new sap.m.BusyDialog();
      busy.open();
      console.log(prueba);
      var oView = this.getView();
      var CAMPO = this.getView().byId("inputcampo").getValue();
      var NRO_PROG= oModel.getProperty("/tblHelpPueTrabSeleccionado/ZNRO_PROG");
      var FECHA = sap.ui.getCore().byId("id_fechaf").getValue();
      var texto = "s4h/sap/bc/ZSAGW_SMART/Para/AYU/"+ FECHA +"/"+ CAMPO +"/IMPL/"+NRO_PROG;
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
           var varT_DETALLE = oModelJSON.getProperty("/ITAB");
           oModel.setProperty("/tblHelpImplementos", varT_DETALLE);
           console.log(oModel);
if (!this.byId("DetalleImplementos")) {

        Fragment.load({
          id: oView.getId(),
          name: "nsa.ui5appssa.view.ImplSelectHelp",
          controller: this
        }).then(function (oDialog) {

          oView.addDependent(oDialog);
          oDialog.open();
        });
      } else {
        this.byId("DetalleImplementos").open();
      }

      busy.close();
        }.bind(this),
        error: function (response) {
          console.log(response);
          var oModelp = this.getView().getModel("myParam");
              var oMModel = new sap.ui.model.json.JSONModel(response.responseJSON.ITAB);
              oModelp.setProperty("/ErrorMensajes", response.responseJSON.ITAB);
              var errormsg = {};
              var objeto = {};
              var objetoA = [];
              oModelp.setProperty("/mockdata", objetoA);
              console.log(oModelp);
              var verror;
              for (var i = 0; i < 1; i++) {
                if (oMModel.getProperty("/" + i + "/TYPE") == "E") {
                  verror = "Error";
                } else {
                  verror = "Warning";
                }
                errormsg.type = verror;
                errormsg.title = oMModel.getProperty("/" + i + "/ID") + " - NUMBER: " + oMModel.getProperty("/" + i + "/NUMBER");
                errormsg.subtitle = oMModel.getProperty("/" + i + "/MESSAGE");
                errormsg.description = oMModel.getProperty("/" + i + "/MESSAGE");
                errormsg.group = oMModel.getProperty("/" + i + "/TYPE");
                objetoA.push(errormsg);
              }
              oModelp.setProperty("/mockdata", objetoA);
              console.log(oModelp);
              this.handleMessageViewPress();
          busy.close();
        }.bind(this)
      });

    },
    onSaveImplementos: function (oEvent) {
     var oTable = this.getView().byId("idTablaImplementos");
     var index = oTable.getSelectedIndices();
     console.log(index);
     var oModel = this.getView().getModel("myParam");
     var oSelectedItems = [];
     for (var i = 0; i < index.length; i++) {
        oSelectedItems.push(oModel.getProperty("/tblHelpImplementos/" + index[i]));
     }
           console.log(oSelectedItems);
           oModel.setProperty("/tblHelpImplSeleccionado", oSelectedItems);
           var campo1 = oModel.getProperty("/tblHelpImplSeleccionado/length");
           this.getView().byId("ContadorImplementos").setText(campo1);
           this.byId("DetalleImplementos").close();
           //this.byId("DetalleImplementos").destroy();
    },
    onCloseImplementos: function() {
      console.log("nuevo");
      this.byId("DetalleImplementos").close();
      this.byId("DetalleImplementos").destroy();
    },
    onSelectionChangeLabor: function (oEvent) {
          var oModel = this.getView().getModel("myParam");
          var selectionrow = oEvent.getParameter("rowContext").getObject();
          console.log(selectionrow);
          oModel.setProperty("/tblHelpLaborSeleccionado", selectionrow);
           var campo1 = oModel.getProperty("/tblHelpLaborSeleccionado/ZNRO_PROG");
           var campo2 = oModel.getProperty("/tblHelpLaborSeleccionado/LABDESCR");
           var campo3 = oModel.getProperty("/tblHelpLaborSeleccionado/ZCODLAB");
           var campo4 = oModel.getProperty("/tblHelpLaborSeleccionado/ZAVANCE");
           var campo5 = oModel.getProperty("/tblHelpLaborSeleccionado/AVANCE_NOT");
           var campo6 = oModel.getProperty("/tblHelpLaborSeleccionado/AVANCE_TOT");
            this._oInput = this.getView().byId("inputNroProg");
            this._oInput.setValue(campo1);
            this._oInput2 = this.getView().byId("inputDescripLabor");
            this._oInput2.setValue(campo2);
            this._oInput3 = this.getView().byId("inputlabor");
            this._oInput3.setValue(campo3);
            this._oInput4 = this.getView().byId("avesperado");
            this._oInput4.setValue(campo4);
            this._oInput5 = this.getView().byId("avnotificado");
            this._oInput5.setValue(campo5);
            this._oInput6 = this.getView().byId("avpen");
            this._oInput6.setValue(campo6);
            this.getView().byId("inputNroApl").setValue("0");
          this.byId("DetalleLabor").close();
          this.byId("DetalleLabor").destroy();
    },
    onCloseLabor: function() {
      console.log("nuevo");
      this.byId("DetalleLabor").close();
      this.byId("DetalleLabor").destroy();
    },
    handleMessageViewPress: function (oEvent) {
      var that = this;
      // this.oMessageView.navigateBack();
      // this.oDialog.open();
      var oModel = this.getView().getModel("myParam");

      var oBackButton = new sap.m.Button({
        icon: sap.ui.core.IconPool.getIconURI("nav-back"),
        visible: false,
        press: function () {
          that.oMessageView.navigateBack();
          this.setVisible(false);
        }
      });
      //PROBAR
      // console.log(oModel.getData());
      this.oMessageView = new sap.m.MessageView({
        showDetailsPageHeader: false,
        itemSelect: function () {
          oBackButton.setVisible(true);
        },
        items: {
          path: '/mockdata',
          template: oMessageTemplate
        },
        groupItems: true
      });

      this.oMessageView.setModel(oModel);

      this.oDialog = new sap.m.Dialog({
        content: this.oMessageView,
        contentHeight: "440px",
        contentWidth: "640px",
        endButton: new sap.m.Button({
          text: "Close",
          press: function () {
            this.oDialog.close();
          }.bind(this)
        }),
        customHeader: new sap.m.Bar({
          contentMiddle: [
            new sap.m.Text({
              text: "Observaciones"
            })
          ],
          contentLeft: [oBackButton]
        }),
        verticalScrolling: false
      });

      this.oDialog.open();
    },
    handleMessageViewPre2: function () {//GMT 28/03/2022
        var oThis = this;
        var oModel = this.getView().getModel("myParam");
        var oMessageTemplate = new sap.m.MessageItem({
            type: '{type}',
            title: '{title}',
            subtitle: '{subtitle}'
        
        });
        var oMessageView = new sap.m.MessageView({
            showDetailsPageHeader: true,
            items: {
                path: "/ERRORES2",
                template: oMessageTemplate
            }
        });
        console.log(oModel.getProperty("/ERRORES2"));//gmtmm
        //console.log(oModel.getProperty("/oDataInfoconductor"));
        oMessageView.setModel(oModel);
        var dialogError = new sap.m.Dialog({
            title: "Bandeja de mensajes",
            draggable: true,
            resizable: true,
            horizontalScrolling: true,
            content: oMessageView,
            state: 'None',
            beginButton: new sap.m.Button({
                press: function () {
                 
                    console.log("entracambio");
                    dialogError.close();
                }.bind(this),
                text: "Cerrar"
            }),
            afterClose: function () {
                dialogError.destroy();
            },
            contentHeight: "400px",
            contentWidth: "540px",
            verticalScrolling: false
        });
        dialogError.open();
    },
    onValueHelpVehiculo: function() {
      var oModel = this.getView().getModel("myParam");
      var prueba = oModel.getData().cols;
      var busy = new sap.m.BusyDialog();
      busy.open();
      console.log(prueba);
      var oView = this.getView();
      var MOD_EQUI = oModel.getProperty("/tblHelpPueTrabSeleccionado/CODMODE");
      var COD_LAB = this.getView().byId("inputlabor").getValue();
      var FECHA = sap.ui.getCore().byId("id_fechaf").getValue();
      var texto = "s4h/sap/bc/ZSAGW_SMART/Para/AYU/"+ FECHA +"/"+MOD_EQUI+"/VEHI/0";
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
           var varT_DETALLE = oModelJSON.getProperty("/ITAB");
           oModel.setProperty("/tblHelpVehiculo", varT_DETALLE);
           console.log(oModel);
            if (!this.byId("DetalleVehiculo")) {

                    Fragment.load({
                      id: oView.getId(),
                      name: "nsa.ui5appssa.view.VehiSelectHelp",
                      controller: this
                    }).then(function (oDialog) {

                      oView.addDependent(oDialog);
                      oDialog.open();
                    });
                  } else {
                    this.byId("DetalleVehiculo").open();
                  }
      busy.close();
        }.bind(this),
        error: function (response) {
          console.log(response);
          var oModelp = this.getView().getModel("myParam");
              var oMModel = new sap.ui.model.json.JSONModel(response.responseJSON.ITAB);
              oModelp.setProperty("/ErrorMensajes", response.responseJSON.ITAB);
              var errormsg = {};
              var objeto = {};
              var objetoA = [];
              oModelp.setProperty("/mockdata", objetoA);
              console.log(oModelp);
              var verror;
              for (var i = 0; i < 1; i++) {
                if (oMModel.getProperty("/" + i + "/TYPE") == "E") {
                  verror = "Error";
                } else {
                  verror = "Warning";
                }
                errormsg.type = verror;
                errormsg.title = oMModel.getProperty("/" + i + "/ID") + " - NUMBER: " + oMModel.getProperty("/" + i + "/NUMBER");
                errormsg.subtitle = oMModel.getProperty("/" + i + "/MESSAGE");
                errormsg.description = oMModel.getProperty("/" + i + "/MESSAGE");
                errormsg.group = oMModel.getProperty("/" + i + "/TYPE");
                objetoA.push(errormsg);
              }
              oModelp.setProperty("/mockdata", objetoA);
              console.log(oModelp);
              this.handleMessageViewPress();
          busy.close();
        }.bind(this)
      });

    },
     onSelectionChangeVehiculo: function (oEvent) {
          var oModel = this.getView().getModel("myParam");
          var selectionrow = oEvent.getParameter("rowContext").getObject();
          console.log(selectionrow);
          oModel.setProperty("/tblHelpVehiculoSeleccionado", selectionrow);
           var campo1 = oModel.getProperty("/tblHelpVehiculoSeleccionado/NROVE");
           var campo2 = oModel.getProperty("/tblHelpVehiculoSeleccionado/VEHDESCR");
           console.log(campo2);

            this._oInput = this.getView().byId("inputvehiculo");
            this._oInput.setValue(campo1);
            this._oInput2 = this.getView().byId("inputDescripVehiculo");
            this._oInput2.setValue(campo2);


          this.byId("DetalleVehiculo").close();
          this.byId("DetalleVehiculo").destroy();
    },
    onCloseVehiculo: function() {
      console.log("nuevo");
      this.byId("DetalleVehiculo").close();
      this.byId("DetalleVehiculo").destroy();
    },

    onValueHelpRequested: function() {
      var oModel = this.getView().getModel("myParam");
      var prueba = oModel.getData().cols;
      var busy = new sap.m.BusyDialog();
      busy.open();
      console.log(prueba);
      var oView = this.getView();
      var oColModel = oModel.getProperty("/cols");
      console.log(oColModel);
      var texto = "s4h/sap/bc/ZSAGW_SMART/Para/AYU/0/0/CAMPO/0";
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
           var varT_DETALLE = oModelJSON.getProperty("/ITAB");
           oModel.setProperty("/tblHelpCampo", varT_DETALLE);
           console.log(oModel);
          if (!this.byId("Detalleanadir")) {

                  Fragment.load({
                    id: oView.getId(),
                    name: "nsa.ui5appssa.view.CampoSelectHelp",
                    controller: this
                  }).then(function (oDialog) {

                    oView.addDependent(oDialog);
                    oDialog.open();
                  });
                } else {
                  this.byId("Detalleanadir").open();
                }

      busy.close();
        }.bind(this),
        error: function (response) {
          console.log(response);
          var oModelp = this.getView().getModel("myParam");
              var oMModel = new sap.ui.model.json.JSONModel(response.responseJSON.ITAB);
              oModelp.setProperty("/ErrorMensajes", response.responseJSON.ITAB);
              var errormsg = {};
              var objeto = {};
              var objetoA = [];
              oModelp.setProperty("/mockdata", objetoA);
              console.log(oModelp);
              var verror;
              for (var i = 0; i < 1; i++) {
                if (oMModel.getProperty("/" + i + "/TYPE") == "E") {
                  verror = "Error";
                } else {
                  verror = "Warning";
                }
                errormsg.type = verror;
                errormsg.title = oMModel.getProperty("/" + i + "/ID") + " - NUMBER: " + oMModel.getProperty("/" + i + "/NUMBER");
                errormsg.subtitle = oMModel.getProperty("/" + i + "/MESSAGE");
                errormsg.description = oMModel.getProperty("/" + i + "/MESSAGE");
                errormsg.group = oMModel.getProperty("/" + i + "/TYPE");
                objetoA.push(errormsg);
              }
              oModelp.setProperty("/mockdata", objetoA);
              console.log(oModelp);
              this.handleMessageViewPress();
          busy.close();
        }.bind(this)
      });

    },
    onSelectionChange: function (oEvent) {
    var oModel = this.getView().getModel("myParam");
          var selectionrow = oEvent.getParameter("rowContext").getObject();
          console.log(selectionrow);
          oModel.setProperty("/tblHelpCampoSeleccionado", selectionrow);
           var campo = oModel.getProperty("/tblHelpCampoSeleccionado/CAMPO");
           var campo2 = oModel.getProperty("/tblHelpCampoSeleccionado/POST1");
           var campo3 = oModel.getProperty("/tblHelpCampoSeleccionado/QUIEBRE");
           var campo4 = oModel.getProperty("/tblHelpCampoSeleccionado/TIPCAMPO");
            this._oInput = this.getView().byId("inputcampo");
            this._oInput.setValue(campo);
            this._oInput2 = this.getView().byId("inputcampo2");
            this._oInput2.setValue(campo2);
            this._oInput3 = this.getView().byId("inputQuiebre");
            this._oInput3.setValue(campo3);
            this._oInput4 = this.getView().byId("inputTraCamp");
            console.log(campo3, campo4);
            this._oInput4.setValue(campo4);
          this.byId("Detalleanadir").close();
          this.byId("Detalleanadir").destroy();
    },
    onClose: function () {
    console.log("nuevo");
      this.byId("Detalleanadir").close();
      this.byId("Detalleanadir").destroy();
    },
    getSplitAppObj: function () {

      var result = this.byId("Splitadministrar");
      if (!result) {
        jQuery.sap.log.info("SplitApp object can't be found");
      }
      return result;
    },
    onagregarincidencia: function () {
      var model = this.getView().getModel("myParam");
      var pathMoneda = "";
      sap.ui.getCore().setModel(model);
      var texto = "s4h/sap/bc/ZSAGW_SMART/Para/AYU/0/0/INCI/0";
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
           var varT_DETALLE = oModelJSON.getProperty("/ITAB");
           model.setProperty("/tblHelpInci", varT_DETALLE);
           console.log(model);

        }.bind(this),
        error: function (response) {
          console.log(response);

        }.bind(this)
      });
      var conteo= model.getProperty("/tblHelpInciConteo");
      var dialogBandeja = new sap.m.Dialog({
        draggable: true,
        resizable: true,
        icon: "sap-icon://create-form",
        title: "Agregar Nueva Incidencia",
        contentWidth: "700px",
        content: [
          new sap.ui.layout.VerticalLayout({
            width: "100%",
            content: [
              new sap.m.Toolbar({
                width: "100%",
                content: [
                  new sap.m.Label({
                    text: "Nro. :",
                    width: "40%"
                  }),
                  new sap.m.Label({
                    id: "idnroLiquidacion",
                    text: conteo,
                    width: "60%",
                    design: "Bold"
                  })
                ]
              }),
              new sap.m.Toolbar({
                width: "100%",
                content: [
                  new sap.m.Label({
                    text: "Cód. Incidencia :",
                    width: "40%"
                  }),
                  new sap.m.ComboBox({
                    id: "idTextBreve3",
                    placeholder: " ", // string
                    items: {
                      path: "/tblHelpInci",
                      template: new sap.ui.core.Item({
                        key: "{ZCOD_INCID}",
                        text: "{ZCOD_INCID} - {ZDES_INCID}"
                      })
                    },
                    width: "60%"
                  })
                ]
              }),
              new sap.m.Toolbar({
                width: "100%",
                content: [
                  new sap.m.Label({
                    text: "Fecha de Inicio :",
                    width: "40%"
                  }),
                  new sap.m.DatePicker("idFecGasto4", {
                    valueStateText: "El campo fecha de inicio no debe estar vacío.",
                    valueFormat: "dd.MM.yyyy",
                    displayFormat: "dd/MM/yyyy",
                    dateValue: new Date(),
                    required: true,
                    width: "60%"
                  })
                ]
              }),
              new sap.m.Toolbar({
                width: "100%",
                content: [
                  new sap.m.Label({
                    text: "Fecha de Fin :",
                    width: "40%"
                  }),
                  new sap.m.DatePicker("idFecGasto5", {
                    valueStateText: "El campo fecha de fin no debe estar vacío.",
                    valueFormat: "dd.MM.yyyy",
                    displayFormat: "dd/MM/yyyy",
                    dateValue: new Date(),
                    required: true,
                    width: "60%"
                  })
                ]
              }),
              new sap.m.Toolbar({
                width: "100%",
                content: [
                  new sap.m.Label({
                    text: "Hora Inicio :",
                    width: "40%"
                  }),
                  new sap.m.TimePicker({
                    id: "idhorainicio",
                    placeholder: "00:00:00",
                    width: "60%"
                  })
                ]
              }),
              new sap.m.Toolbar({
                width: "100%",
                content: [
                  new sap.m.Label({
                    text: "Hora Fin :",
                    width: "40%"
                  }),
                  new sap.m.TimePicker({
                    id: "idhorafin",
                    placeholder: "00:00:00",
                    width: "60%"
                  })
                ]
              }),
            ]
          })
        ],
        type: "Message",
        state: "Information",
        beginButton: new sap.m.Button({
          id: "idBeginButton",
          text: "Agregar",
          type: "Emphasized",
          icon: "sap-icon://add",
          press: function () {
            dialogBandeja.setBusy(true);
            var canContinue = true;

            if (canContinue) {
              var contador = sap.ui.getCore().byId("idnroLiquidacion").getText();
              contador++;
              model.setProperty("/tblHelpInciConteo", contador);
              console.log(model);
              var llave = {};
              llave.ITEM = sap.ui.getCore().byId("idnroLiquidacion").getText();
              var descrip = sap.ui.getCore().byId("idTextBreve3").getValue().split("-");
              llave.DESCRIP_INCIDENCIA= descrip[1];
              llave.FECHA_INICIO = sap.ui.getCore().byId("idFecGasto4").getValue();
              llave.CODIGO_INCI = sap.ui.getCore().byId("idTextBreve3").getSelectedKey();
              llave.FECHA_FIN = sap.ui.getCore().byId("idFecGasto5").getValue();
              llave.HORA_INICIO = sap.ui.getCore().byId("idhorainicio").getValue();
              llave.HORA_FIN= sap.ui.getCore().byId("idhorafin").getValue();
              var conv_hora_inicio=llave.HORA_INICIO.split(':');
              var conver_hora_inicio = conv_hora_inicio[0]+":"+conv_hora_inicio[1];
              var conv_hora_final=llave.HORA_FIN.split(':');
              var conver_hora_final = conv_hora_final[0]+":"+conv_hora_final[1];
              console.log(conver_hora_inicio);
              console.log(conver_hora_final);
              var minutos_inicio = conver_hora_inicio.split(':').reduce((p, c) => parseInt(p) * 60 + parseInt(c));
              var minutos_final = conver_hora_final.split(':').reduce((p, c) => parseInt(p) * 60 + parseInt(c));
              console.log(minutos_inicio);
              // Diferencia de minutos
              var diferencia = minutos_final - minutos_inicio;
              // C�lculo de horas y minutos de la diferencia
              var horas = Math.floor(diferencia / 60);
              var minutos = diferencia % 60;
              llave.TOTAL = horas + ':'+ (minutos < 10 ? '0' : '') + minutos+':'+'00';
              //llave.TOTAL_HORAS = sap.ui.getCore().byId("idnroLiquidacion").getValue();
              console.log(llave);
              var detalleincidencia = model.getProperty("/T_DETALLE_INCIDENCIA");
              detalleincidencia.push(llave);
              console.log(detalleincidencia);
               model.setProperty("/T_DETALLE_INCIDENCIA",detalleincidencia);
               console.log(model);
               this.getView().byId("tableincidencia").getModel().refresh(true);
              dialogBandeja.setBusy(false);
              dialogBandeja.close();
            } else {
              dialog.open();
              dialogBandeja.setBusy(false);
            }

          }.bind(this)
        }),
        endButton: new sap.m.Button({
          text: "Cerrar",
          type: "Emphasized",
          icon: "sap-icon://decline",
          press: function () {
            dialogBandeja.close();
          }.bind(this)
        }),
        afterClose: function () {
          dialogBandeja.destroy();
        },
        afterOpen: function () {
          console.log("afterOpen");

        }.bind(this),
        verticalScrolling: true
      }).addStyleClass("sapUiSizeCompact");
      dialogBandeja.open();

    },
    onEliminarIncidencia: function(oEvent){
     console.log("entroincidencia");
     this.getView().byId("idFileCSV1").setValue("");
      var k=0;
      var oTable = this.getView().byId("tableincidencia");
      var aSelectedItems = oTable.getSelectedIndices();
      if(aSelectedItems.length > 0){
      console.log(aSelectedItems);
      var oModel = oTable.getModel();
      console.log(oModel);
      var oData = oModel.getProperty("/T_DETALLE_INCIDENCIA");
      var reverse = [].concat(oTable.getSelectedIndices()).reverse();
      reverse.forEach(function(index) {
        oData.splice(index, 1);
      });

      oModel.refresh();
      oTable.setSelectedIndex(-1);
      var numero = oModel.getProperty("/T_DETALLE_INCIDENCIA/length");
      console.log(numero);
      for(var i = 0; i < numero; i++){
      console.log(k);
      k++;
      oModel.setProperty("/T_DETALLE_INCIDENCIA/"+i+"/ITEM",k);
      }
      oModel.setProperty("/tblHelpInciConteo", k+1);
      }
      else{
        sap.m.MessageToast.show("Seleccione una incidencia a eliminar");
      }
    },
    onagregartrabajador: function () {
      var model = this.getView().getModel("myParam");
      var pathMoneda = "";
      var pathConceptoPago = "";
      sap.ui.getCore().setModel(model);
      var texto = "s4h/sap/bc/ZSAGW_SMART/Para/AYU/0/0/TRABAP/0";
      var keyppuestotrab= this.getView().byId("inputPueTrab").getValue(); 
      console.log(texto);//SA_OBR_T
      if(keyppuestotrab!=""){
        if(keyppuestotrab!="SA_OBR_T"){
        var texto = "s4h/sap/bc/ZSAGW_SMART/Para/AYU/0/0/TRABAP/"+keyppuestotrab;
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
                 var varT_DETALLE = oModelJSON.getProperty("/ITAB");
                 model.setProperty("/tblHelpTrabajar", varT_DETALLE);
                 console.log(model);
      
              }.bind(this),
              error: function (response) {
                console.log(response);
      
              }.bind(this)
            });
            model.setSizeLimit(1000);
            var conteo= model.getProperty("/tblHelpTrabajaConteo");
            var dialogBandeja = new sap.m.Dialog({
              draggable: true,
              resizable: true,
              icon: "sap-icon://create-form",
              title: "Agregar Nuevo Trabajador",
              contentWidth: "700px",
              content: [
                new sap.ui.layout.VerticalLayout({
                  width: "100%",
                  content: [
                    new sap.m.Toolbar({
                      width: "100%",
                      content: [
                        new sap.m.Label({
                          text: "Item. :",
                          width: "40%"
                        }),
                        new sap.m.Label({
                          id: "idnroLiquidacion2",
                          text: conteo,
                          width: "60%",
                          design: "Bold"
                        })
                      ]
                    }),
                    new sap.m.Toolbar({
                      width: "100%",
                      content: [
                        new sap.m.Label({
                          text: "Cod. Trabajador :",
                          width: "40%"
                        }),
                        new sap.m.ComboBox({
                          id: "idTextBreve4",
                          placeholder: " ", // string
                          items: {
                            path: "/tblHelpTrabajar",
                            template: new sap.ui.core.Item({
                              key: "{ZCOD_TRAB}",
                              text: "{ZCOD_TRAB} - {NOMBRE}",
                              length: "600"
                            })
                          },
                          width: "60%"
                        })
                      ]
                    }),
                    new sap.m.Toolbar({
                      width: "100%",
                      content: [
                        new sap.m.Label({
                          text: "Nro. Horas :",
                          width: "40%"
                        }),
                        new sap.m.Input({
                          maxLength: 30,
                          id: "idhorafin45",
                          valueStateText: "El campo código no debe estar vacío.",
                          placeholder: "Ingrese Nro. Horas",
                          width: "60%"
                        })
                      ]
                    }),
                  ]
                })
              ],
              type: "Message",
              state: "Information",
              beginButton: new sap.m.Button({
                id: "idBeginButton",
                text: "Agregar",
                type: "Emphasized",
                icon: "sap-icon://add",
                press: function () {
                  dialogBandeja.setBusy(true);
                  var canContinue = true;
                  var valor = sap.ui.getCore().byId("idhorafin45").getValue();
                    
                  if (parseInt(valor)>0&&parseInt(valor)<=24) {
                    var contador = sap.ui.getCore().byId("idnroLiquidacion2").getText();
                    contador++;
                    model.setProperty("/tblHelpTrabajaConteo", contador);
                    console.log(model);
                    var llave = {};
                    llave.ITEM = sap.ui.getCore().byId("idnroLiquidacion2").getText();
                    var descrip = sap.ui.getCore().byId("idTextBreve4").getValue().split("-");
                    llave.NOMBRE = descrip[1];
                    llave.COD_TRABAJADOR = descrip[0];
                    llave.NRO_HORAS = sap.ui.getCore().byId("idhorafin45").getValue();
                    var detalletrabajador = model.getProperty("/T_DETALLE_TRABAJA");
                    detalletrabajador.push(llave);
                    console.log(detalletrabajador);

                    
                    var tothoras =0;
                    for(var i=0;i<detalletrabajador.length;i++){
                        tothoras=tothoras+parseFloat(detalletrabajador[i].NRO_HORAS);
                    }
                    var detalletercero = model.getProperty("/T_DETALLE_TERCEROS");                 
                    console.log(detalletercero);  
                    var tothorastra =0;
                    for(var i=0;i<detalletercero.length;i++){
                        tothorastra=tothorastra+parseFloat(detalletercero[i].NRO_HORAS);
                    }                                    

                    var tipo=this.getView().byId("inputUM").getValue();
                    var tothoras0 = tipo=="TAS"?(tothorastra/8):tothorastra;
                    var tothoraTAS0 = tipo=="TAS"?(tothoras/8):tothoras;
                    var tothoraTAS =parseFloat(tothoraTAS0)+parseFloat(tothoras0);

                    console.log(tipo,tothoras.toFixed(2),tothoraTAS.toFixed(2));
                    this.getView().byId("clabor").setValue(tothoraTAS.toFixed(2));
                    this.getView().byId("inputCantNot").setValue(tothoraTAS.toFixed(2));
                     model.setProperty("/T_DETALLE_TRABAJA",detalletrabajador);
                     console.log(model);
                     this.getView().byId("tabletrabajador").getModel().refresh(true);
                     this.onactualizahoras();
                    dialogBandeja.setBusy(false);
                    dialogBandeja.close();
                  } else {
                    sap.m.MessageToast.show("Nro. Horas debe ser entero y menor a 24 horas");
                    //dialog.open();
                    dialogBandeja.setBusy(false);
                  }
      
                }.bind(this)
              }),
              endButton: new sap.m.Button({
                text: "Cerrar",
                type: "Emphasized",
                icon: "sap-icon://decline",
                press: function () {
                  dialogBandeja.close();
                }.bind(this)
              }),
              afterClose: function () {
                dialogBandeja.destroy();
              },
              afterOpen: function () {
                console.log("afterOpen");
      
              }.bind(this),
              verticalScrolling: true
            }).addStyleClass("sapUiSizeCompact");
            dialogBandeja.open();
        }else{
            sap.m.MessageToast.show("Puesto trabajo no debe ser Tercero");
        }
      }else{
        sap.m.MessageToast.show("Puesto trabajo está vacío");
      }


    },
    onEliminarPersona: function(oEvent){
     console.log("entropersona");
     this.getView().byId("idFile").setValue("");
      var k=0;
      var oTable = this.getView().byId("tableterceros");
      var aSelectedItems = oTable.getSelectedIndices();
      if(aSelectedItems.length > 0){
      console.log(aSelectedItems);
      var oModel = oTable.getModel();
      console.log(oModel);
      var oData = oModel.getProperty("/T_DETALLE_TERCEROS");
      var reverse = [].concat(oTable.getSelectedIndices()).reverse();
      reverse.forEach(function(index) {
        oData.splice(index, 1);
      });

      oModel.refresh();
      oTable.setSelectedIndex(-1);
      var numero = oModel.getProperty("/T_DETALLE_TERCEROS/length");
      console.log(numero);
      for(var i = 0; i < numero; i++){
      console.log(k);
      k++;
      oModel.setProperty("/T_DETALLE_TERCEROS/"+i+"/ITEM",k);
      }
      oModel.setProperty("/tblHelpTerceroConteo", k+1);

      var detalletrabajador = oModel.getProperty("/T_DETALLE_TRABAJA");    
      var detalleterceros = oModel.getProperty("/T_DETALLE_TERCEROS");

      var tothoras =0;
      for(var i=0;i<detalleterceros.length;i++){
          tothoras=tothoras+parseFloat(detalleterceros[i].NRO_HORAS);
      }
      var tothorastra =0;
      for(var i=0;i<detalletrabajador.length;i++){
          tothorastra=tothorastra+parseFloat(detalletrabajador[i].NRO_HORAS);
      }  
      var tipo=this.getView().byId("inputUM").getValue();
      var tothoras0 =tipo=="TAS"?(tothorastra/8):tothorastra;
      var tothoraTAS0 = tipo=="TAS"?(tothoras/8):tothoras;
      var tothoraTAS =parseFloat(tothoraTAS0)+parseFloat(tothoras0);
      this.getView().byId("clabor").setValue(tothoraTAS.toFixed(2));
      this.getView().byId("inputCantNot").setValue(tothoraTAS.toFixed(2));
      }else{
        sap.m.MessageToast.show("Seleccione un Pers.Tercero a eliminar");
      }
    },
    onEliminarTrabajador: function(oEvent){
     console.log("entrotrabajador");
     this.getView().byId("idFileCSV2").setValue("");
      var k=0;
      var oTable = this.getView().byId("tabletrabajador");
      var aSelectedItems = oTable.getSelectedIndices();
      if(aSelectedItems.length > 0){
      console.log(aSelectedItems);
      var oModel = oTable.getModel();
      console.log(oModel);
      var oData = oModel.getProperty("/T_DETALLE_TRABAJA");
      var reverse = [].concat(oTable.getSelectedIndices()).reverse();
      reverse.forEach(function(index) {
        oData.splice(index, 1);
      });

      oModel.refresh();
      oTable.setSelectedIndex(-1);
      var numero = oModel.getProperty("/T_DETALLE_TRABAJA/length");
      console.log(numero);
      for(var i = 0; i < numero; i++){
      console.log(k);
      k++;
      oModel.setProperty("/T_DETALLE_TRABAJA/"+i+"/ITEM",k);
      }
      oModel.setProperty("/tblHelpTrabajaConteo", k+1);
      var detalletrabajador = oModel.getProperty("/T_DETALLE_TRABAJA");    
      var detalleterceros = oModel.getProperty("/T_DETALLE_TERCEROS");

      var tothoras =0;
      for(var i=0;i<detalleterceros.length;i++){
          tothoras=tothoras+parseFloat(detalleterceros[i].NRO_HORAS);
      }
      var tothorastra =0;
      for(var i=0;i<detalletrabajador.length;i++){
          tothorastra=tothorastra+parseFloat(detalletrabajador[i].NRO_HORAS);
      }  
      var tipo=this.getView().byId("inputUM").getValue();
      var tothoras0 =tipo=="TAS"?(tothorastra/8):tothorastra;
      var tothoraTAS0 = tipo=="TAS"?(tothoras/8):tothoras;
      var tothoraTAS =parseFloat(tothoraTAS0)+parseFloat(tothoras0);    
      this.getView().byId("clabor").setValue(tothoraTAS.toFixed(2));
      this.getView().byId("inputCantNot").setValue(tothoraTAS.toFixed(2)); 
      }
      else{
        sap.m.MessageToast.show("Seleccione un trabajador a eliminar");
      }
    },
    onagregarmaterial: function () {
      var model = this.getView().getModel("myParam");
      //var NUMERO_SOL_SELECT = model.getProperty("/NUMERO_SOL_SELECT");
      //var conceptoPago = model.getProperty("/conceptoPago");
      var pathMoneda = "";
      var pathConceptoPago = "";
      //var liquidacion = this.getView().byId("idNroLiquidacion").getValue();
      sap.ui.getCore().setModel(model);
      var dialogBandeja = new sap.m.Dialog({
        draggable: true,
        resizable: true,
        icon: "sap-icon://create-form",
        title: "Agregar Nuevo Material",
        contentWidth: "700px",
        content: [
          new sap.ui.layout.VerticalLayout({
            width: "100%",
            content: [

              new sap.m.Toolbar({
                width: "100%",
                content: [
                  new sap.m.Label({
                    text: "Código Material :",
                    width: "40%"
                  }),
                  new sap.m.Input({
                    maxLength: 30,
                    id: "idTextBreve",
                    valueStateText: "El campo código no debe estar vacío.",
                    placeholder: "Ingrese Código",
                    width: "60%"
                  })
                ]
              }),

              new sap.m.Toolbar({
                width: "100%",
                content: [
                  new sap.m.Label({
                    text: "Material. :",
                    width: "40%"
                  }),
                  new sap.m.Label({
                    id: "idnroLiquidacion3",
                    text: "SULFATO DE AMONIO",
                    width: "60%",
                    design: "Bold"
                  })
                ]
              }),
              new sap.m.Toolbar({
                width: "100%",
                content: [
                  new sap.m.Label({
                    text: "Cantidad :",
                    width: "40%"
                  }),
                  new sap.m.Input({
                    maxLength: 30,
                    id: "idhorafin454",
                    valueStateText: "El campo Cantidad no debe estar vacío.",
                    placeholder: "Ingrese Cantidad",
                    width: "60%"
                  })
                ]
              }),
              new sap.m.Toolbar({
                width: "100%",
                content: [
                  new sap.m.Label({
                    text: "Cantidad :",
                    width: "40%"
                  }),
                  new sap.m.Input({
                    maxLength: 30,
                    id: "idhorafin4546",
                    valueStateText: "El campo Cantidad no debe estar vacío.",
                    placeholder: "Ingrese Cantidad",
                    width: "60%"
                  })
                ]
              }),
              new sap.m.Toolbar({
                width: "100%",
                content: [
                  new sap.m.Label({
                    text: "UMB :",
                    width: "40%"
                  }),
                  new sap.m.Label({
                    id: "idnroLiquidacion34",
                    text: "KG",
                    width: "60%",
                    design: "Bold"
                  })
                ]
              }),
              new sap.m.Toolbar({
                width: "100%",
                content: [
                  new sap.m.Label({
                    text: "Reserva :",
                    width: "40%"
                  }),
                  new sap.m.Input({
                    maxLength: 30,
                    id: "idhorafin45477",
                    valueStateText: "El campo Reserva no debe estar vacío.",
                    placeholder: "Ingrese Reserva",
                    width: "60%"
                  })
                ]
              }),
              new sap.m.Toolbar({
                width: "100%",
                content: [
                  new sap.m.Label({
                    text: "Pos :",
                    width: "40%"
                  }),
                  new sap.m.Label({
                    id: "idnroLiquidacion34465",
                    text: "1",
                    width: "60%",
                    design: "Bold"
                  })
                ]
              }),
              new sap.m.Toolbar({
                width: "100%",
                content: [
                  new sap.m.Label({
                    text: "Lote :",
                    width: "40%"
                  }),
                  new sap.m.Label({
                    id: "idnroLiquidacion3453",
                    text: "12",
                    width: "60%",
                    design: "Bold"
                  })
                ]
              }),
            ]
          })
        ],
        type: "Message",
        state: "Information",
        beginButton: new sap.m.Button({
          id: "idBeginButton",
          text: "Agregar",
          type: "Emphasized",
          icon: "sap-icon://add",
          press: function () {
            dialogBandeja.setBusy(true);
            var canContinue = true;
            var inputs = [
              sap.ui.getCore().byId("idImporte"),
              sap.ui.getCore().byId("idRazNom"),
              sap.ui.getCore().byId("idRucDNI"),
              sap.ui.getCore().byId("idTextBreve")
            ];
            var selects = [
              sap.ui.getCore().byId("idConPago"),
              sap.ui.getCore().byId("idMoneda"),
              sap.ui.getCore().byId("idIndIGV"),
              sap.ui.getCore().byId("idCentroCosto")
            ];
            var msar = sap.ui.getCore().byId("idToolbarMSAR").getVisible();
            if (msar) {
              inputs.push(sap.ui.getCore().byId("idImporteMSAR"));
            }
            var compr = sap.ui.getCore().byId("idToolbarComprobante").getVisible();
            if (compr) {
              selects.push(sap.ui.getCore().byId("idConComprobante"));
              inputs.push(sap.ui.getCore().byId("idComprobante"));
            }
            jQuery.each(inputs, function (i, input) {
              if (!input.getValue() && input.getVisible()) {
                input.setValueState("Error");
                canContinue = false;
              } else {
                input.setValueState("None");
              }
            });
            jQuery.each(selects, function (i, select) {
              if (!select.getSelectedItem() && select.getVisible()) {
                select.setValueState("Error");
                canContinue = false;
              } else {
                select.setValueState("None");
              }
            });

            if (canContinue) {

              var llave = {};

              llave.BELNR = "";
              llave.BUKRS = "1000";
              llave.CECO_GTO = sap.ui.getCore().byId("idCentroCosto").getSelectedItem().getKey().toString();
              llave.CON_GTO = sap.ui.getCore().byId("idConPago").getSelectedItem().getKey().toString();
              llave.EST_LIQD = "C";
              llave.FEC_GTO = sap.ui.getCore().byId("idFecGasto").getValue();
              llave.GJAHR = "";
              var importe = parseFloat(sap.ui.getCore().byId("idImporte").getValue().toString());
              llave.MON_GTO = sap.ui.getCore().byId("idMoneda").getSelectedItem().getKey().toString();
              llave.IMP_GTO = importe.toFixed(2);

              llave.IMP_GTO_MSAR = importe.toFixed(2);
              llave.MON_GTO_MSAR = sap.ui.getCore().byId("idMoneda").getSelectedItem().getKey().toString();

              llave.IMP_GTO_S = "";
              llave.IND_IGV_GTO = sap.ui.getCore().byId("idIndIGV").getSelectedItem().getKey().toString();

              llave.NIF_PROV = sap.ui.getCore().byId("idRucDNI").getValue();
              llave.NIF_PROV_S = "";

              llave.NRO_LIQ = sap.ui.getCore().byId("idnroLiquidacion").getText();
              llave.POS_LIQ = sap.ui.getCore().byId("idnroPosicion").getText();
              llave.RAZ_PROV = sap.ui.getCore().byId("idRazNom").getValue();
              llave.RAZ_PROV_S = "";

              llave.TXT_GTO = sap.ui.getCore().byId("idTextBreve").getValue();
              llave.XBLNR = "";
              var item = sap.ui.getCore().byId("idConPago").getSelectedItem();
              item = item.getKey().charAt(0);
              if (item === "D") {
                llave.NRO_COMP = sap.ui.getCore().byId("idComprobante").getValue();
                llave.TIP_COMP = "";
              } else if (item === "R") {
                llave.NRO_COMP = "";
                llave.TIP_COMP = "";
              } else {
                llave.NRO_COMP = sap.ui.getCore().byId("idComprobante").getValue();
                llave.TIP_COMP = sap.ui.getCore().byId("idConComprobante").getSelectedItem().getKey().toString();
              }
              var url = "/odataent/odata2.svc";
              console.log(llave);
              var oModel = new sap.ui.model.odata.v2.ODataModel(url, true);
              oModel.create("/T_RG_LIQ_DET_QASs", llave, {
                method: "POST",
                success: function (data) {
                  sap.m.MessageToast.show("Se ingresó correctamente la posición " + this.idSolicitud + " en la liquidación " +
                    liquidacion + " .");
                  dialogBandeja.close();
                  dialogBandeja.setBusy(false);
                  //this.onObtenerBandejaLiquidacion();
                }.bind(this),
                error: function (oError) {
                  console.log(oError);
                  this.obtenerErrorOdata(oError, "Erro oData T_RG_LIQ_DETs", "No se pudo registrar la posición " + this.idSolicitud +
                    " en la liquidación " + liquidacion + " .");
                  dialogBandeja.setBusy(false);
                }.bind(this)

              });

            } else {
              var dialog = new sap.m.Dialog({
                title: "Alerta",
                type: "Message",
                state: "Warning",
                content: new sap.m.Text({
                  text: "Se requiere igresar/seleccionar todos los campos."

                }),
                beginButton: new sap.m.Button({
                  text: "Aceptar",
                  type: "Emphasized",
                  press: function () {
                    dialog.close();
                    dialog.destroy();

                  }
                }),
                afterClose: function () {
                  dialog.destroy();
                }
              });

              dialog.open();
              dialogBandeja.setBusy(false);
            }

          }.bind(this)
        }),
        endButton: new sap.m.Button({
          text: "Cerrar",
          type: "Emphasized",
          icon: "sap-icon://decline",
          press: function () {
            dialogBandeja.close();
          }.bind(this)
        }),
        afterClose: function () {
          dialogBandeja.destroy();
        },
        afterOpen: function () {
          console.log("afterOpen");
          console.log(this.monedaGlobal);
          var selects = [
            // sap.ui.getCore().byId("idConPago"),
            sap.ui.getCore().byId("idConComprobante"),
            sap.ui.getCore().byId("idMoneda"),
            sap.ui.getCore().byId("idIndIGV"),
            sap.ui.getCore().byId("idCentroCosto")
          ];
          var firstItem;
          jQuery.each(selects, function (i, select) {
            select.getBinding("items").refresh(true);
            firstItem = select.getItems()[0];
            select.setSelectedItem(firstItem, true);
          });
          //  var selectsMon = [
          //  sap.ui.getCore().byId("idMoneda"),
          //  sap.ui.getCore().byId("idMonedaMSAR")
          // ];
          // jQuery.each(selectsMon, function (i, select) {
          //  select.getBinding("items").refresh(true);
          //  select.setSelectedItemId(this.monedaGlobal);
          // });
          sap.ui.getCore().byId("idMoneda").setSelectedKey(this.monedaGlobal);
          sap.ui.getCore().byId("idMonedaMSAR").setSelectedKey(this.monedaGlobal);
        }.bind(this),
        verticalScrolling: true
      }).addStyleClass("sapUiSizeCompact");
      dialogBandeja.open();

    },
    onagregarpersona: function () {
      var model = this.getView().getModel("myParam");
      sap.ui.getCore().setModel(model);
      var texto = "s4h/sap/bc/ZSAGW_SMART/Para/AYU/0/0/TRABAT/0";
      var keyprovedor= this.getView().byId("country").getSelectedKey();
      var keyppuestotrab= this.getView().byId("inputPueTrab").getValue(); 
      console.log(texto);
      //gm 
      if(keyprovedor!="" && keyprovedor!=undefined){        
        if(keyppuestotrab=="SA_OBR_T"){
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
                     var varT_DETALLE = oModelJSON.getProperty("/ITAB");
                     model.setProperty("/tblHelpTerceros", varT_DETALLE);
                     console.log(model);
          
                  }.bind(this),
                  error: function (response) {
                    console.log(response);
          
                  }.bind(this)
                });
                model.setSizeLimit(1000);
                var conteo= model.getProperty("/tblHelpTerceroConteo");
                var dialogBandeja = new sap.m.Dialog({
                  draggable: true,
                  resizable: true,
                  icon: "sap-icon://create-form",
                  title: "Agregar Nuevo Persona Tercero",
                  contentWidth: "700px",
                  content: [
                    new sap.ui.layout.VerticalLayout({
                      width: "100%",
                      content: [
                        new sap.m.Toolbar({
                          width: "100%",
                          content: [
                            new sap.m.Label({
                              text: "Item. :",
                              width: "40%"
                            }),
                            new sap.m.Label({
                              id: "idnroTerceros",
                              text: conteo,
                              width: "60%",
                              design: "Bold"
                            })
                          ]
                        }),
                        new sap.m.Toolbar({
                          width: "100%",
                          content: [
                            new sap.m.Label({
                              text: "Cod. Trabajador :",
                              width: "40%"
                            }),
                            new sap.m.ComboBox({
                              id: "idTextTerceros",
                              placeholder: " ", // string
                              items: {
                                path: "/tblHelpTerceros",
                                template: new sap.ui.core.Item({
                                  key: "{ZCOD_TRAB}",
                                  text: "{ZCOD_TRAB} - {NOMBRE}",
                                  length: "1000"
                                })
                              },
                              width: "60%"
                            })
                          ]
                        }),
                        new sap.m.Toolbar({
                          width: "100%",
                          content: [
                            new sap.m.Label({
                              text: "Nro. Horas :",
                              width: "40%"
                            }),
                            new sap.m.Input({
                              maxLength: 30,
                              id: "idhorafinTerceros",
                              valueStateText: "El campo código no debe estar vacío.",
                              placeholder: "Ingrese Nro. Horas",
                              width: "60%"
                            })
                          ]
                        }),
                        new sap.m.Toolbar({
                          width: "100%",
                          visible:false,
                          content: [
                            new sap.m.Label({
                              text: "Proveedor :",
                              width: "40%"
                            }),
                            new sap.m.Input({
                              maxLength: 30,
                              id: "idProveedor",
                              valueStateText: "El campo Proveedor no debe estar vacío.",
                              placeholder: "Ingrese Proveedor",
                              width: "60%"
                            })
                          ]
                        }),
                      ]
                    })
                  ],
                  type: "Message",
                  state: "Information",
                  beginButton: new sap.m.Button({
                    id: "idBeginButton",
                    text: "Agregar",
                    type: "Emphasized",
                    icon: "sap-icon://add",
                    press: function () {
                      dialogBandeja.setBusy(true);
                      var canContinue = true;
                      var valor = sap.ui.getCore().byId("idhorafinTerceros").getValue();

                      if (parseInt(valor)>0&&parseInt(valor)<=24) {
                        var contador = sap.ui.getCore().byId("idnroTerceros").getText();
                        contador++;
                        model.setProperty("/tblHelpTerceroConteo", contador);
                        console.log(model);
                        var llave = {};
                        llave.ITEM = sap.ui.getCore().byId("idnroTerceros").getText();
                        var descrip = sap.ui.getCore().byId("idTextTerceros").getValue().split("-");
                        llave.NOMBRE = descrip[1];
                        llave.COD_TRABAJADOR = descrip[0];
                        llave.NRO_HORAS = sap.ui.getCore().byId("idhorafinTerceros").getValue();
                        llave.COD_PROVEEDOR = this.getView().byId("country").getSelectedKey();//country//idProveedor
                        var detalleterceros = model.getProperty("/T_DETALLE_TERCEROS");
                        detalleterceros.push(llave);
    
                        
                        var tothoras =0;
                        for(var i=0;i<detalleterceros.length;i++){
                            tothoras=tothoras+parseFloat(detalleterceros[i].NRO_HORAS);
                        }
                       

                        var detalletrabajador = model.getProperty("/T_DETALLE_TRABAJA");                 
                        console.log(detalletrabajador);  
                        var tothorastra =0;
                        for(var i=0;i<detalletrabajador.length;i++){
                            tothorastra=tothorastra+parseFloat(detalletrabajador[i].NRO_HORAS);
                        }                                    

                        var tipo=this.getView().byId("inputUM").getValue();

                        var tothoras0 =tipo=="TAS"?(tothorastra/8):tothorastra;
                        var tothoraTAS0 = tipo=="TAS"?(tothoras/8):tothoras;
                        var tothoraTAS =parseFloat(tothoraTAS0)+parseFloat(tothoras0);
    
                        console.log(tipo,tothoras.toFixed(2),tothoraTAS.toFixed(2));
                        this.getView().byId("clabor").setValue(tothoraTAS.toFixed(2));
                        this.getView().byId("inputCantNot").setValue(tothoraTAS.toFixed(2));
                        
                        console.log(detalleterceros);
                         model.setProperty("/T_DETALLE_TERCEROS",detalleterceros);
                         console.log(model);
                         this.getView().byId("tableterceros").getModel().refresh(true);
                         this.onactualizahoras()
                        dialogBandeja.setBusy(false);
                        dialogBandeja.close();
                      } else {
                        sap.m.MessageToast.show("Nro. Horas debe ser entero y menor a 24 horas");
                        //dialog.open();
                        dialogBandeja.setBusy(false);
                      }
          
                    }.bind(this)
                  }),
                  endButton: new sap.m.Button({
                    text: "Cerrar",
                    type: "Emphasized",
                    icon: "sap-icon://decline",
                    press: function () {
                      dialogBandeja.close();
                    }.bind(this)
                  }),
                  afterClose: function () {
                    dialogBandeja.destroy();
                  },
                  afterOpen: function () {
                    console.log("afterOpen");
          
                  }.bind(this),
                  verticalScrolling: true
                }).addStyleClass("sapUiSizeCompact");
                dialogBandeja.open();
        }else{
            sap.m.MessageToast.show("Puesto de trabajo debe ser tercero");
        }

      }else{
        sap.m.MessageToast.show("Proveedor está vacía");
      }

    },
    onactualizahoras:function(){
        var model = this.getView().getModel("myParam");
        var detalleterceros = model.getProperty("/T_DETALLE_TERCEROS");
        var tothoras =0;
        var cancontinue=true;
        for(var i=0;i<detalleterceros.length;i++){
            if((parseFloat(detalleterceros[i].NRO_HORAS)).toString()=="NaN"){
                cancontinue=false;
            }else{
                tothoras=tothoras+ parseFloat(detalleterceros[i].NRO_HORAS);
            }
          
        }     
        var detalletrabajador = model.getProperty("/T_DETALLE_TRABAJA");                 
        console.log(detalletrabajador);  
        var tothorastra =0;
        for(var i=0;i<detalletrabajador.length;i++){
            if((parseFloat(detalletrabajador[i].NRO_HORAS)).toString()=="NaN"){
                cancontinue=false;
            }else{
                tothorastra=tothorastra+parseFloat(detalletrabajador[i].NRO_HORAS);
            }
           
        }        
        if(cancontinue){
            var tipo=this.getView().byId("inputUM").getValue();
            var tothoras0 =tipo=="TAS"?(tothorastra/8):tothorastra;
            var tothoraTAS0 = tipo=="TAS"?(tothoras/8):tothoras;
            var tothoraTAS =parseFloat(tothoraTAS0)+parseFloat(tothoras0);       
    
            console.log(tipo,tothoras.toFixed(2),tothoraTAS.toFixed(2));
            this.getView().byId("clabor").setValue(tothoraTAS.toFixed(2));
            this.getView().byId("inputCantNot").setValue(tothoraTAS.toFixed(2));
        }else{
            sap.m.MessageToast.show("Error en la cantidad de horas");
        }

    },
    onGuardardatos: function () {
      sap.m.MessageToast.show("N° de Item Guardado");
      /*this.byId("Detalleanadir").close();*/
    },
    onCloseDialog: function () {
      /*this.byId("Detalleanadir").close();*/
    },
    onEdit: function (oEvent) {
      this.rebindTable(this.oEditableTemplate, "Edit");
    },
    onListItemPress: function (oEvent) {
      var oModel = this.getView().getModel("myParam");
      var oView = this.getView();
      var busy = new sap.m.BusyDialog();
      busy.open();
      oView.byId("Cabecera1").setVisible(true);
      oView.byId("idTablaMaterial").setVisible(true);
      //this.getView().byId("btnAgregarProg").setVisible(true);
      var sToPageId = oEvent.getSource().data("to");
      console.log(sToPageId);
      oModel.setProperty("/ZNUMERO", oEvent.getSource().data("key"));
      var sPath = oEvent.getSource().getBindingContext().getObject();
      console.log(sPath);
      var prueba = oModel.setProperty("/detalle", sPath);
      var material;
      var nro_prog = oModel.getProperty("/ZNUMERO");
      var aFilter = [];
      var codigo = oModel.getProperty("/detalle/ZCODIGO");
      var zona = oModel.getProperty("/detalle/ZZONA");
      var item = oModel.getProperty("/detalle/ZITEM");
      oView.byId("Cabecera1").setTitle("N° de Parte: " + nro_prog);
      console.log(nro_prog, codigo, zona, item);
      var texto = "s4h/sap/bc/ZSAGW_SMART/Para/DET/0/0/"+ nro_prog +"/0";
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
           var varT_DETALLE = oModelJSON.getProperty("/T_NROPARTE");
           var contador = oModelJSON.getProperty("/T_NROPARTE/0/T_ITEMS/length");
           var icon;
           oModel.setProperty("/tblDetalleParte", varT_DETALLE);
           for(var i=0;i<contador;i++){
           var expr=oModel.getProperty("/tblDetalleParte/0/T_ITEMS/"+i+"/ZIND_NOT/");
           switch (expr) {
            case "@4A":
              icon="sap-icon://inventory";
              oModel.setProperty("/tblDetalleParte/0/T_ITEMS/"+i+"/ZIND_NOT/", icon);
              break;
            case "@A6":
              icon="sap-icon://factory";
              oModel.setProperty("/tblDetalleParte/0/T_ITEMS/"+i+"/ZIND_NOT/", icon);
              break;
            case "@CL":
              icon="sap-icon://activity-individual";
              oModel.setProperty("/tblDetalleParte/0/T_ITEMS/"+i+"/ZIND_NOT/", icon);
              break;
            default:
              console.log("hola");
              break;
          }
           };
           console.log(oModel);
           var sorters = [];
      var sorter;

      sorter = new sap.ui.model.Sorter("ZNUMERO", true);
      sorters.push(sorter);
      // Actualiza la lista
      var list = this.byId("idTablaMaterial");
      var binding = list.getBinding("rows");
      binding.filter([], "Application");
      binding.sort(sorters);
      busy.close();
        }.bind(this),
        error: function (response) {
          console.log(response);
          busy.close();
        }.bind(this)
      });


    },
    fnChangezona: function (oEvent) {
      var value = oEvent.getSource().getSelectedKey();
      var seen = [],
        llave = {},
        oFilterComboBox;
      var aFiltersComboBox = [];
      var texto = "s4h/public/aa/smartagri/service/data.xsodata/fundo?$filter=ZONA eq '" + value + "' ";
      $.ajax(texto, {
        type: 'GET',
        async: false,
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        complete: function (xhr) {},
        success: function (response) {
          for (var i = 0; i < response.d.results.length; i++) {
            if (!(response.d.results[i].FUNDO in seen)) {
              oFilterComboBox = new sap.ui.model.Filter("FUNDO", "EQ", response.d.results[i].FUNDO);
              aFiltersComboBox.push(oFilterComboBox);
              seen[response.d.results[i].FUNDO] = true;
            }
          }
        }
      });
      var zona = oEvent.getSource().getId();
      var oComboBoxControl;
      switch (zona) {
      case "id_zona":
        oComboBoxControl = sap.ui.getCore().byId("id_fundo");
        break;
      case "id_vdzona":
        oComboBoxControl = sap.ui.getCore().byId("id_vdfundo");
        break;
      }

      var oBindingComboBox = oComboBoxControl.getBinding("items");
      oComboBoxControl.setEnabled(true);
      oBindingComboBox.filter(aFiltersComboBox);
      oComboBoxControl.setSelectedKey(null);
    },
    fnChangeFundo: function (oEvent) {
      var value = oEvent.getSource().getSelectedKey();
      var seen = [],
        llave = {},
        oFilterComboBox1;
      var aFiltersComboBox1 = [];
      var texto = "s4h/public/aa/smartagri/service/data.xsodata/modulo?$filter=FUNDO eq '" + value + "' ";
      $.ajax(texto, {
        type: 'GET',
        async: false,
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        complete: function (xhr) {},
        success: function (response) {
          if (response.d.results.length == 0) {
            aFiltersComboBox1 = [];
          } else {
            for (var i = 0; i < response.d.results.length; i++) {
              if (!(response.d.results[i].MODULO in seen)) {
                oFilterComboBox1 = new sap.ui.model.Filter("MODULO", "EQ", response.d.results[i].MODULO);
                aFiltersComboBox1.push(oFilterComboBox1);
                seen[response.d.results[i].MODULO] = true;
              }
            }
          }

        }
      });
      var oComboBoxControl1 = sap.ui.getCore().byId("id_vdmodulo");
      if (aFiltersComboBox1.length == 0) {
        oComboBoxControl1.setEnabled(false);
      } else {

        var oBindingComboBox1 = oComboBoxControl1.getBinding("items");
        oComboBoxControl1.setEnabled(true);
        oBindingComboBox1.filter(aFiltersComboBox1);
      }
      oComboBoxControl1.setSelectedKey(null);
    },
    btnagregarprogramacion: function () {
      var oModel = this.getView().getModel("oModel");
      var vthis = this;
      var pressDialog = new sap.m.Dialog({
        title: "Agregar programación",
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
                    text: "Campaña: "
                  }),
                  new sap.m.ComboBox({
                    placeholder: "-Seleccione campaña-",
                    textAlign: "Left",
                    id: "id_vdcampana",
                    items: {
                      path: "oModel>/DM_CAMPANA",
                      template: new sap.ui.core.Item({
                        key: "{oModel>CAMPANA}",
                        text: "{oModel>DESCRIPCION}"
                      })
                    }
                  })
                ]
              }),
              new sap.m.Toolbar({
                content: [
                  new sap.m.Label({
                    width: "120px",
                    textAlign: "Left",
                    text: "Nro. prog.: "
                  }),
                  new sap.m.Input({
                    textAlign: "Left",
                    id: "id_vdnroprog"
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
                  new sap.m.ComboBox({
                    placeholder: "-Seleccione zona-",
                    textAlign: "Left",
                    id: "id_vdzona",
                    change: function (oEvent) {
                      vthis.fnChangezona(oEvent);
                    },
                    items: {
                      path: "oModel>/DM_ZONA",
                      template: new sap.ui.core.Item({
                        key: "{oModel>ZONA}",
                        text: "{oModel>ZONA}"
                      })
                    }
                  })
                ]
              }),
              new sap.m.Toolbar({
                content: [
                  new sap.m.Label({
                    width: "120px",
                    textAlign: "Left",
                    text: "Fundo: "
                  }),
                  new sap.m.ComboBox({
                    placeholder: "-Seleccione fundo-",
                    textAlign: "Left",
                    id: "id_vdfundo",
                    change: function (oEvent) {
                      vthis.fnChangeFundo(oEvent);
                    },
                    enabled: false,
                    items: {
                      path: "oModel>/DM_FUNDO",
                      template: new sap.ui.core.Item({
                        key: "{oModel>FUNDO}",
                        text: "{oModel>DESCRIPCION}"
                      })
                    }
                  })
                ]
              }),
              new sap.m.Toolbar({
                content: [
                  new sap.m.Label({
                    width: "120px",
                    textAlign: "Left",
                    text: "Módulo: "
                  }),
                  new sap.m.ComboBox({
                    textAlign: "Left",
                    placeholder: "-Seleccione módulo-",
                    id: "id_vdmodulo",
                    enabled: false,
                    items: {
                      path: "oModel>/DM_MODULO",
                      template: new sap.ui.core.Item({
                        key: "{oModel>MODULO}",
                        text: "{oModel>DESCRIPCION}"
                      })
                    }
                  })
                ]
              }),
              new sap.m.Toolbar({
                content: [
                  new sap.m.Label({
                    width: "120px",
                    textAlign: "Left",
                    text: "Etapa: "
                  }),
                  new sap.m.ComboBox({
                    placeholder: "-Seleccione etapa-",
                    textAlign: "Left",
                    id: "id_vdetapa",
                    items: {
                      path: "oModel>/DM_ETAPA",
                      template: new sap.ui.core.Item({
                        key: "{oModel>COD_ETAPA}",
                        text: "{oModel>NOMB_ETAPA}"
                      })
                    }
                  })
                ]
              }),
              new sap.m.Toolbar({
                content: [
                  new sap.m.Label({
                    width: "120px",
                    textAlign: "Left",
                    text: "Fecha inicio: "
                  }),
                  new sap.m.DatePicker({
                    textAlign: "Left",
                    id: "id_vdfechai",
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
                    text: "Fecha fin: "
                  }),
                  new sap.m.DatePicker({
                    textAlign: "Left",
                    id: "id_vdfechaf",
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
                    text: "Labor: "
                  }),
                  new sap.m.ComboBox({
                    placeholder: "-Seleccione labor-",
                    textAlign: "Left",
                    id: "id_vdlabor",
                    items: {
                      path: "oModel>/DM_LABOR",
                      template: new sap.ui.core.Item({
                        key: "{oModel>CODIGO}",
                        text: "{oModel>DESCRIPCION}"
                      })
                    }
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
                  new sap.m.ComboBox({
                    placeholder: "-Seleccione cultivo-",
                    textAlign: "Left",
                    id: "id_vdcultivo",
                    change: function (oEvent) {
                      var value = oEvent.getSource().getSelectedKey();
                      var seen = [],
                        llave = {},
                        oFilterComboBox;
                      var aFiltersComboBox = [];
                      var texto = "s4h/public/aa/smartagri/service/data.xsodata/variedad?$filter=CULTIVO eq '" + value + "' ";
                      $.ajax(texto, {
                        type: 'GET',
                        async: false,
                        dataType: "json",
                        beforeSend: function (xhr) {
                          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
                        },
                        complete: function (xhr) {},
                        success: function (response) {
                          for (var i = 0; i < response.d.results.length; i++) {
                            if (!(response.d.results[i].VARIEDAD in seen)) {
                              oFilterComboBox = new sap.ui.model.Filter("VARIEDAD", "EQ", response.d.results[i].VARIEDAD);
                              aFiltersComboBox.push(oFilterComboBox);
                              seen[response.d.results[i].VARIEDAD] = true;
                            }
                          }
                        }
                      });
                      var oComboBoxControl = sap.ui.getCore().byId("id_vdvariedad");
                      var oBindingComboBox = oComboBoxControl.getBinding("items");
                      oComboBoxControl.setEnabled(true);
                      oBindingComboBox.filter(aFiltersComboBox);
                      oComboBoxControl.setSelectedKey(null);
                    },
                    items: {
                      path: "oModel>/DM_CULTIVO",
                      template: new sap.ui.core.Item({
                        key: "{oModel>CULTIVO}",
                        text: "{oModel>DESCRIPCION}"
                      })
                    }
                  })
                ]
              }),
              new sap.m.Toolbar({
                // height: "auto",
                content: [
                  new sap.m.Label({
                    width: "120px",
                    textAlign: "Left",
                    text: "Variedad: "
                  }),
                  new sap.m.ComboBox({
                    placeholder: "-Seleccione variedad-",
                    textAlign: "Left",
                    id: "id_vdvariedad",
                    enabled: false,
                    items: {
                      path: "oModel>/DM_VARIEDAD",
                      template: new sap.ui.core.Item({
                        key: "{oModel>VARIEDAD}",
                        text: "{oModel>DESCRIPCION}"
                      })
                    }
                  })
                ]
              }),
              new sap.m.Toolbar({
                content: [
                  new sap.m.Label({
                    width: "120px",
                    textAlign: "Left",
                    text: "Turno: "
                  }),
                  new sap.m.ComboBox({
                    placeholder: "-Seleccione turno-",
                    textAlign: "Left",
                    id: "id_vdturno",
                    items: {
                      path: "oModel>/DM_TURNO",
                      template: new sap.ui.core.Item({
                        key: "{oModel>COD_TURNO}",
                        text: "{oModel>DESCRIP_TURNO}"
                      })
                    }
                  })
                ]
              }),
              new sap.m.Toolbar({
                // height: "auto",
                content: [
                  new sap.m.Label({
                    width: "120px",
                    textAlign: "Left",
                    text: "Avance: "
                  }),
                  new sap.m.Input({
                    textAlign: "Left",
                    id: "id_vdavance"
                  })
                ]
              }),
              new sap.m.Toolbar({
                // height: "auto",
                content: [
                  new sap.m.Label({
                    width: "120px",
                    textAlign: "Left",
                    text: "Unidad :"
                  }),
                  new sap.m.Input({
                    textAlign: "Left",
                    id: "id_vdunidad"
                  })
                ]
              })
              // new sap.m.Toolbar({
              //  // height: "auto",
              //  content: [
              //    new sap.m.Label({
              //      width: "120px",
              //      textAlign: "Left",
              //      text: "Observaciones :",
              //      wrapping: true
              //    }),
              //    new sap.m.TextArea({
              //      width: "100%",
              //      textAlign: "Left",
              //      id: "id_vdobs"
              //    })
              //  ]
              // })

            ]
          })
        ],

        beginButton: new sap.m.Button({
          text: 'Grabar',
          icon: "sap-icon://save",
          press: function () {
            var canContinue = true;
            // var inputs = [
            //  sap.ui.getCore().byId("Idcodigo"),
            //  sap.ui.getCore().byId("Idfechai"),
            //  sap.ui.getCore().byId("Idfechaf")
            // ];
            // jQuery.each(inputs, function (i, input) {
            //  if (!input.getValue()) {
            //    input.setValueState("Error");
            //    canContinue = false;
            //  } else {
            //    input.setValueState("None");
            //  }
            // });

            if (canContinue) {
              var oObject = {};
              oObject.CAMPANA = sap.ui.getCore().byId("id_vdcampana").getSelectedKey();
              oObject.MODULO = sap.ui.getCore().byId("id_vdmodulo").getSelectedKey();
              oObject.CULTIVO = sap.ui.getCore().byId("id_vdcultivo").getSelectedKey();
              oObject.VARIEDAD = sap.ui.getCore().byId("id_vdvariedad").getSelectedKey();
              oObject.ETAPA = sap.ui.getCore().byId("id_vdetapa").getSelectedKey();
              oObject.COD_LABOR = parseInt(sap.ui.getCore().byId("id_vdlabor").getSelectedKey());
              oObject.TURNO = sap.ui.getCore().byId("id_vdturno").getSelectedKey();
              oObject.FECHA_INICIO = funciones.fnConvertirStringtoDate(sap.ui.getCore().byId("id_vdfechai")._lastValue);
              oObject.FECHA_FIN = funciones.fnConvertirStringtoDate(sap.ui.getCore().byId("id_vdfechaf")._lastValue);
              oObject.AVANCE = parseFloat(sap.ui.getCore().byId("id_vdavance")._lastValue) + "";
              oObject.UNIDAD = sap.ui.getCore().byId("id_vdunidad")._lastValue;
              oObject.ZONA = sap.ui.getCore().byId("id_vdzona").getSelectedKey();
              oObject.FUNDO = sap.ui.getCore().byId("id_vdfundo").getSelectedKey();
              oObject.NRO_PROG = sap.ui.getCore().byId("id_vdnroprog")._lastValue;
              var url = "s4h/public/aa/smartagri/service/data.xsodata";
              var oDataModel = new sap.ui.model.odata.v2.ODataModel(url, true);
              var url2 = "/prog_labor";
              oDataModel.create(url2,
                oObject, {
                  success: function (data) {
                    funciones.fnMessageBoxSuccess(vthis, "Registro guardado con éxito.", "Info");

                  }.bind(this),
                  error: function (oError) {}.bind(this)
                });
              pressDialog.close();

            }

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
      var fechaactual = funciones.fnCalcularFechaActual();
      sap.ui.getCore().byId("id_vdfechai").setValue(fechaactual);
      sap.ui.getCore().byId("id_vdfechaf").setValue(fechaactual);
      vthis.getView().addDependent(pressDialog);
      pressDialog.addStyleClass("style_dialog");
      pressDialog.open();
      if (pressDialog) {
        pressDialog.addStyleClass("class_Manejo");
      }
    },
    zero: function(n) {
      return(n>9 ? '' : '0') + n;
    },
    getData1: function () {
      var oView = this.getView();
      var oModel = oView.getModel("myParam");
      var FECHA = new Date();
      var FECHAA = this.zero(FECHA.getDate())+ "."+this.zero(FECHA.getMonth()+1)+"."+FECHA.getFullYear();
      var texto = "s4h/sap/bc/ZSAGW_SMART/Para/LIST/"+FECHAA+"/PD/PF/mat";
      console.log(texto);
      var busy = new sap.m.BusyDialog();
      busy.open();
      var vthis = this;
      var oMModel = new sap.ui.model.json.JSONModel(texto, false);
      oMModel.attachRequestCompleted(function () {
        try {
          var jsonVAR = oMModel.getJSON();
          console.log(oMModel.getProperty("/TI_LIST_PARTE"));
          var list = vthis.getView().byId("idListlabor");
          var objlist = vthis.getView().byId("idListItemlabor");
          list.setModel(oMModel);
          list.bindItems({
            path: "/TI_LIST_PARTE",
            template: objlist
          });
          busy.close();
          console.log(oModel.getProperty("/T_DETALLE_TRABAJA"));
          console.log(oModel.getProperty("/T_DETALLE_INCIDENCIA"));
          console.log(oModel.getProperty("/T_DETALLE_TERCEROS"));
        } catch (err) {
          console.log("ERROR: ");
          console.log(err);
        }
      });

    },
    _onRouteMatched: function () {

      var oView = this.getView();
      var oModel = oView.getModel("myParam");
      this.getData1();
      oView.byId("Cabecera1").setVisible(false);
      oView.byId("idTablaMaterial").setVisible(false);
      oView.setModel(oModel);
      /*this.fnllenarList();
        var oModelG = this.getView().getModel("oModel");
        var oObject = {};
        oModelG.setProperty("/IndicadorModificacion", 0);
        oModelG.setProperty("/VProg_Detalle", oObject);
        this.getView().byId("btnAgregarProg").setVisible(false);

        var url = "/public/aa/smartagri/service/data.xsodata";
        var oModel = new sap.ui.model.odata.v2.ODataModel(url, true);
        oModel.read("/puesto_trabajo", {
          success: function (response) {
            oModelG.setProperty("/cbxPT", response.results);
          }
        });
        oModel.read("/equipo", {
          success: function (response) {
            oModelG.setProperty("/cbxequipo", response.results);
          }
        });
        var aModulo = oModelG.getProperty("/DM_MODULO");*/
      // console.log(aModulo);
      /*  var oObjecto = {};
        oObjecto.MODULO = "T";
        oObjecto.DESCRIPCION = "Todos";
        aModulo.push(oObjecto);*/
      // console.log(aModulo);
      /*oModelG.setProperty("/cbx_Modulo", aModulo);*/
      // console.log(oModelG.getProperty("/cbx_Modulo"));
      console.log(oModel.getProperty("/T_DETALLE_TRABAJA"));
      console.log(oModel.getProperty("/T_DETALLE_INCIDENCIA"));
      console.log(oModel.getProperty("/T_DETALLE_TERCEROS"));
    },
    getRouter: function () {
      return sap.ui.core.UIComponent.getRouterFor(this);
    },
    btnRegresarMenu: function () {
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
    btnvistamenu: function () {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo("vMain");
    },
    btncancelar: function () {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo("vMain");
    },
    fnllenarList: function () {
      var oModelG = this.getView().getModel("oModel");
      var xData = {};
      oModelG.setProperty("/DATOS_CARGADOS", xData);
      oModelG.setProperty("/tblDetalleMaquinaria", xData);
      oModelG.setProperty("/tblDetalleMaterial", xData);
      oModelG.setProperty("/tblDetalleManoobra", xData);
      oModelG.setProperty("/ItemSeleccionado_Campana", "");
      oModelG.setProperty("/ItemSeleccionado_Cultivo", "");
      oModelG.setProperty("/ItemSeleccionad_Variedad", "");
      oModelG.setProperty("/ItemSeleccionado_Etapa", "");
      oModelG.setProperty("/ItemSeleccionado_FechaInicio", "");
      oModelG.setProperty("/ItemSeleccionado_FechaFin", "");
      oModelG.setProperty("/ItemSeleccionado_Turno", "");
      oModelG.setProperty("/ItemSeleccionado_Avance", "");
      oModelG.setProperty("/ItemSeleccionado_Unidad", "");

      var url = "s4h/public/aa/smartagri/service/data.xsodata/";
      var oModel = new sap.ui.model.odata.v2.ODataModel(url, true);

      var texto = "s4h/public/aa/smartagri/service/data.xsodata/prog_labor";
      $.ajax(texto, {
        type: 'GET',
        async: false,
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        complete: function (xhr) {},
        success: function (response) {
          var oModelprog = new sap.ui.model.json.JSONModel(response.d.results);
          oModelG.setProperty("/tblproglabor", oModelprog.getProperty("/"));
          oModelG.setProperty("/tblproglabor2", response.d.results);
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
    handleDelete: function (oEvent) {
      var vthis=this;
      var that=this;
      var oTable = this.getView().byId("idTablaMaterial");
      var aSelectedItems = oTable.getSelectedIndices();
      console.log(aSelectedItems);
      var oModel = this.getView().getModel("myParam");
      var ESTADO = oModel.getProperty("/detalle/ZESTADO");
      var GUI = oModel.getProperty("/detalle/ZNUMERO");
      console.log(oModel);
      var dialogD = new sap.m.Dialog({
        title: "Mensaje de confirmación",
        type: "Message",
        state: "Information",
        content: new sap.m.Text({
          text: "¿Seguro que desea eliminar los items seleccionados?"
        }),
        beginButton: new sap.m.Button({
          text: "Si",
          type: "Accept",
          press: function () {
               if(aSelectedItems.length > 0)
                     {
                     console.log(aSelectedItems);
                     var oModel = oTable.getModel();
                     console.log(oModel);
                     var oData = oModel.getProperty("/tblDetalleParte/0/T_ITEMS");
                     var vector=[];
                     for ( var i = 0; i<aSelectedItems.length; i++)
                     {
                       var id = aSelectedItems[i];
                       var path = oTable.getContextByIndex(id).sPath;
                       var item=oModel.getProperty(path);
                       vector.push(item);
                     }
                     console.log(vector);
             }
            var content = {};
            var llave = {};
            var llave1 = {};
            var llave2 = {};
            var T_NUMERO_PARTE = [];
            var T_ITEMS = [];
            var T_CARGA = [];
            llave.ZNUMERO_PARTE = "PR0000000019";
            llave.ZCODIGO = "001015";
            llave.ZZONA= "";
            T_NUMERO_PARTE.push(llave);
            llave1.ZNRO_ITEM = "0001";
            content.T_ITEMS = vector;
            T_CARGA.push(content);
            T_CARGA = JSON.stringify(T_CARGA);
            //console.log(T_CARGA);
           // var texto = "s4h/sap/bc/ZSAGW_SMART/Para/DELETE/0/0/"+GUI+"/"+ESTADO;
            var texto = "s4h/sap/bc/ZSAGW_SMART/Para/DELETE/0/0/"+GUI+"/0";
            $.ajax(texto, {
              type: 'GET',
              async: false,
              beforeSend: function (xhr) {
                xhr.setRequestHeader("X-CSRF-Token", "Fetch");
              },
              complete: function (xhr) {
                var token = xhr.getResponseHeader("X-CSRF-Token");
                //console.log("ENTRO");
                $.ajax(texto, {
                  type: 'POST',
                  data: T_CARGA,
                  beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-CSRF-Token', token);
                  },
                  success: function (response) {
                                  var list = that.getView().byId("idListlabor");
                                  var objlist = that.getView().byId("idListItemlabor");
                    var oMModel = new sap.ui.model.json.JSONModel(response);
                           var reverse = [].concat(oTable.getSelectedIndices()).reverse();
                     reverse.forEach(function(index) {
                       oData.splice(index, 1);
                       oModel.setProperty("/tblDetalleEliminarParte",oData);
                     });
                     //console.log(oData);
                     oModel.refresh();
                     oTable.setSelectedIndex(-1);

              //       console.log(oModel);
                       console.log("entroeliminarparte");

                    //CONFIRMACI�N MENSAJE
                    //console.log(response);
                    var errormsg;
                    errormsg = response.ITAB[0].MESSAGE_V2;
                    //console.log(errormsg);
                    if (!this.oSuccessMessageDialog) {
                        this.oSuccessMessageDialog = new Dialog({
                          type: DialogType.Message,
                          title: "Registro Anulado",
                          state: ValueState.Success,
                          content: new Text({ text: errormsg }),
                          beginButton: new Button({
                            type: ButtonType.Emphasized,
                            text: "OK",
                            press: function () {
                              this.oSuccessMessageDialog.close();
                               var FECHA=sap.ui.getCore().byId("id_fechaf").getValue();
                              var texto = "s4h/sap/bc/ZSAGW_SMART/Para/LIST/"+FECHA+"/PD/PF/mat";
                              console.log(texto);
                              var busy = new sap.m.BusyDialog();
                              busy.open();

                              var oMModel = new sap.ui.model.json.JSONModel(texto, false);
                              oMModel.attachRequestCompleted(function () {
                                try {
                                  var jsonVAR = oMModel.getJSON();
                                  console.log(oMModel.getProperty("/TI_LIST_PARTE"));

                                  list.setModel(oMModel);
                                  list.bindItems({
                                    path: "/TI_LIST_PARTE",
                                    template: objlist
                                  });
                                  busy.close();
                                } catch (err) {
                                  console.log("ERROR: ");
                                  console.log(err);
                                }
                              });
                              that.getView().byId("Cabecera1").setVisible(false);
                              that.getView().byId("idTablaMaterial").setVisible(false);
                              console.log("borrado");
                            }.bind(this)
                          })
                        });
                      }

                      this.oSuccessMessageDialog.open();
                  }.bind(this),
                  error: function (response) {
                    console.log(response);
                    var oModelp = vthis.getView().getModel("myParam");
                    var oMModel = new sap.ui.model.json.JSONModel(response.responseJSON.ITAB);
                    oModelp.setProperty("/ErrorMensajes", response.responseJSON.ITAB);
                    var errormsg = {};
                    var objeto = {};
                    var objetoA = [];
                    oModelp.setProperty("/mockdata", objetoA);
                    var verror;
                    for (var i = 0; i < 1; i++) {
                      if (oMModel.getProperty("/" + i + "/TYPE") == "E") {
                        verror = "Error";
                      } else {
                        verror = "Warning";
                      }
                      errormsg.type = verror;
                      errormsg.title = oMModel.getProperty("/" + i + "/ID") + " - NUMBER: " + oMModel.getProperty("/" + i + "/NUMBER");
                      errormsg.subtitle = oMModel.getProperty("/" + i + "/MESSAGE");
                      errormsg.description = oMModel.getProperty("/" + i + "/MESSAGE");
                      errormsg.group = oMModel.getProperty("/" + i + "/TYPE");
                      objetoA.push(errormsg);
                    }
                    oModelp.setProperty("/mockdata", objetoA);
                    sap.ui.core.BusyIndicator.hide();
                  }.bind(this)
                });
              },
              success: function (response) {
                console.log(response);

              },
              error: function (response) {
                vthis.getView().setBusy(false);
                console.log(response);
              }.bind(this)
            });
            dialogD.close();

          }.bind(this)
        }),
        endButton: new sap.m.Button({
          text: "No",
          type: "Reject",
          press: function () {
            dialogD.close();
          }
        }),
        afterClose: function (response) {
          dialogD.destroy();
        }.bind(this)

      });
      dialogD.open();
    },
    fnlistadomaterial: function () {
      var oModel = this.getView().getModel("oModel");
      var nro_prog = oModel.getProperty("/key_nro_programacion");
      var texto = "s4h/public/aa/smartagri/service/data.xsodata/prog_material?$filter=NRO_PROG eq '" + nro_prog + "'";
      var resultado = funciones.fnAjaxGet(texto);
      var material;
      oModel.setProperty("/key_detalle_material_length", resultado.length);
      oModel.setProperty("/tblDetalleMaterial", resultado);
      var resultado_1;
      var arMaterial = oModel.getProperty("/DM_MATERIAL");
      for (var i = 0; i < oModel.getProperty("/tblDetalleMaterial/length"); i++) {
        material = oModel.getProperty("/tblDetalleMaterial/" + i + "/COD_MATERIAL");
        var FECHA_INICIO = funciones.fnConvertirFecha(parseInt((oModel.getProperty("/tblDetalleMaterial/" + i + "/FECHA_INICIO")).substring(
          6, (oModel.getProperty("/tblDetalleMaterial/" + i + "/FECHA_INICIO")).length - 2)));
        var FECHA_FIN = funciones.fnConvertirFecha(parseInt((oModel.getProperty("/tblDetalleMaterial/" + i + "/FECHA_FIN")).substring(6, (
          oModel.getProperty("/tblDetalleMaterial/" + i + "/FECHA_FIN")).length - 2)));
        oModel.setProperty("/tblDetalleMaterial/" + i + "/FECHA_INICIO", FECHA_INICIO);
        oModel.setProperty("/tblDetalleMaterial/" + i + "/FECHA_FIN", FECHA_FIN);
        if (material === null || material === "") {
          oModel.setProperty("/tblDetalleMaterial/" + i + "/DESCRIPCION_MATERIAL", "");
        } else {
          resultado_1 = arMaterial.filter(array => array.CODIGO == material);
          if (resultado_1.length > 0) {
            oModel.setProperty("/tblDetalleMaterial/" + i + "/DESCRIPCION_MATERIAL", resultado_1[0].DESCRIPCION);
          }
        }

      }

    },
    fnlistadomaquinaria: function () {
      var oModel = this.getView().getModel("oModel");
      var nro_prog = oModel.getProperty("/key_nro_programacion");
      var texto = "s4h/public/aa/smartagri/service/data.xsodata/prog_maquinaria?$filter=NRO_PROG eq '" + nro_prog + "'";
      var resultado = funciones.fnAjaxGet(texto);
      oModel.setProperty("/tblDetalleMaquinaria", resultado);
      var resultado_1;
      var arPTequipo = oModel.getProperty("/DM_PT_EQUIPOS");
      for (var i = 0; i < oModel.getProperty("/tblDetalleMaquinaria/length"); i++) {
        //puesto = oModel.getProperty("/tblDetalleMaquinaria/" + i + "/PUESTO");
        var equipo = oModel.getProperty("/tblDetalleMaquinaria/" + i + "/ID_EQUIPO");
        var FECHA_INICIO = funciones.fnConvertirFecha(parseInt((oModel.getProperty("/tblDetalleMaquinaria/" + i + "/FECHA_INICIO")).substring(
          6, (oModel.getProperty("/tblDetalleMaquinaria/" + i + "/FECHA_INICIO")).length - 2)));
        var FECHA_FIN = funciones.fnConvertirFecha(parseInt((oModel.getProperty("/tblDetalleMaquinaria/" + i + "/FECHA_FIN")).substring(6,
          (
            oModel.getProperty("/tblDetalleMaquinaria/" + i + "/FECHA_FIN")).length - 2)));
        oModel.setProperty("/tblDetalleMaquinaria/" + i + "/FECHA_INICIO", FECHA_INICIO);
        oModel.setProperty("/tblDetalleMaquinaria/" + i + "/FECHA_FIN", FECHA_FIN);
        if (equipo === null || equipo === "") {
          oModel.setProperty("/tblDetalleMaquinaria/" + i + "/DESCRIPCION_EQUIPO", "");
        } else {
          resultado_1 = arPTequipo.filter(array => array.ID_EQUIPO == equipo);
          if (resultado_1.length > 0) {
            oModel.setProperty("/tblDetalleMaquinaria/" + i + "/DESCRIPCION_EQUIPO", resultado_1[0].EQUIPO);
          }
        }

      }
    },
    fnllenarlistadomanoobra: function () {
      var oModel = this.getView().getModel("oModel");
      var nro_prog = oModel.getProperty("/key_nro_programacion");
      var texto = "s4h/public/aa/smartagri/service/data.xsodata/prog_manoobra?$filter=NRO_PROG eq '" + nro_prog + "'";
      var resultado = funciones.fnAjaxGet(texto);
      oModel.setProperty("/tblDetalleManoobra", resultado);
      for (var i = 0; i < oModel.getProperty("/tblDetalleManoobra/length"); i++) {
        var FECHA_INICIO = funciones.fnConvertirFecha(parseInt((oModel.getProperty("/tblDetalleManoobra/" + i + "/FECHA_INICIO")).substring(
          6, (oModel.getProperty("/tblDetalleManoobra/" + i + "/FECHA_INICIO")).length - 2)));
        var FECHA_FIN = funciones.fnConvertirFecha(parseInt((oModel.getProperty("/tblDetalleManoobra/" + i + "/FECHA_FIN")).substring(6, (
          oModel.getProperty("/tblDetalleManoobra/" + i + "/FECHA_FIN")).length - 2)));
        oModel.setProperty("/tblDetalleManoobra/" + i + "/FECHA_INICIO", FECHA_INICIO);
        oModel.setProperty("/tblDetalleManoobra/" + i + "/FECHA_FIN", FECHA_FIN);
      }
    },
    onRetorno: function () {
      var dialogMensaje = new sap.m.Dialog({
        draggable: true,
        resizable: true,
        contentWidth: "370px",
        title: "Mensaje de confirmación",
        content: [
          new sap.m.Label({
            text: "¿Está seguro de volver al menú de inicio?",
            wrapping: true,
            design: "Bold",
            width: "100%"
          }),
          new sap.m.Label({
            text: "Todo lo registrado será eliminado.",
            wrapping: true,
            width: "100%"
          })
        ],
        state: "Warning",
        type: "Message",
        beginButton: new sap.m.Button({
          press: function () {
            this.onClear();
            dialogMensaje.close();
            this.varContValidar = 0;
            this.getSplitAppObj().backDetail();
            this.getSplitAppObj().setMode("ShowHideMode");

          }.bind(this),
          text: "Aceptar"
        }),
        endButton: new sap.m.Button({
          press: function () {
            dialogMensaje.close();
          }.bind(this),
          text: "Cancelar"
        }),
        afterClose: function () {
          dialogMensaje.destroy();
        },

        verticalScrolling: false
      });
      dialogMensaje.open();

    },
    onClear:function(){
    console.log("limpia");
      this.getView().byId("forma").setForceSelection(false);
      //this.getView().byId("country").setForceSelection(false);
      this.getView().byId("fuente").setForceSelection(false);
      this.getView().byId("numeroparte").setValue("");
      this.getView().byId("forma").setValue("");
      this.getView().byId("country").setValue("");
      this.getView().byId("fuente").setValue("");
      this.getView().byId("idfechageneral").setValue("");
      this.getView().byId("inputcampo").setValue("");
      this.getView().byId("inputcampo2").setValue("");
      this.getView().byId("inputNroProg").setValue("");
      this.getView().byId("inputlabor").setValue("");
      this.getView().byId("inputQuiebre").setValue("");
      this.getView().byId("inputTraCamp").setValue("");
      this.getView().byId("inputNroApl").setValue("");
      this.getView().byId("inputCantNot").setValue("");
      this.getView().byId("clabor").setValue("");
      this.getView().byId("inputDescripPueTrab").setValue("");
      this.getView().byId("inputUM").setValue("");
      this.getView().byId("hfin2").setValue("");
      this.getView().byId("avesperado").setValue("");
      this.getView().byId("avnotificado").setValue("");
      this.getView().byId("avpen").setValue("");
      this.getView().byId("inputDescripLabor").setValue("");
      this.getView().byId("inputPueTrab").setValue("");
      this.getView().byId("conformidad").setSelectedKey("-");
      this.getView().byId("estado").setSelectedKey("-");
      this.getView().byId("observacion").setValue("");
      this.getView().byId("inputvehiculo").setValue("");
      this.getView().byId("efectivo8787").setValue("");
      this.getView().byId("final").setValue("");
      this.getView().byId("efectivo").setValue("");
      this.getView().byId("iniciop").setValue("");
      this.getView().byId("finp").setValue("");
      this.getView().byId("inputCantNot").setValue("");
      this.getView().byId("clabor").setValue("");
      this.getView().byId("cantavance").setValue("");
      this.getView().byId("hinielev").setValue("");
      this.getView().byId("hfinelev").setValue("");
      var model = this.getView().getModel("myParam");
      var nuevo = [];
      model.setProperty("/T_DETALLE_TRABAJA", []);
      model.setProperty("/T_DETALLE_INCIDENCIA", []);
      model.setProperty("/T_DETALLE_TERCEROS", []);
      model.setProperty("/tblHelpInciConteo", 1);
      model.setProperty("/tblHelpTerceroConteo", 1);
      model.setProperty("/tblHelpTrabajaConteo", 1);
    },
    onGuardarMaterial: function () {
      var model = this.getView().getModel("myParam");
      var vthis = this ;
      var that = this;
      console.log(model);
      var canContinue = true   
      var opcion1 = this.getView().byId("conformidad").getSelectedKey();
      console.log(opcion1);
      var canContinue2 = (opcion1=="-")?false:true;
      var opcion2 = this.getView().byId("estado").getSelectedKey();
      console.log(opcion2);
      var canContinue3 = (opcion2=="-")?false:true;
    
      //canContinue
      if(canContinue2&&canContinue3){

      var content = {};
      var llave = {};
      var llave1 = {};
      var llave2 = {};
      var T_NUMERO_PARTE = [];
      var T_ITEMS = [];
      var T_ZSTSA_TRABA = [];
      var T_ZSTSA_INCID = [];
      var T_ZSTSA_TRABA_TERCERO = [];
      var T_CARGA = [];
      llave.ZNUMERO_PARTE = "PR0000000019";
      llave.ZCODIGO = "001015";
      llave.ZZONA= "";
      T_NUMERO_PARTE.push(llave);
      T_ZSTSA_TRABA = model.getProperty("/T_DETALLE_TRABAJA/");
      T_ZSTSA_INCID = model.getProperty("/T_DETALLE_INCIDENCIA/");
      T_ZSTSA_TRABA_TERCERO = model.getProperty("/T_DETALLE_TERCEROS/");
      llave1.ZNRO_ITEM = "0001";
      llave1.ZCOD_PROG = model.getProperty("/tblItem/0/ZNRO_PARTE");
      llave1.ZDESCRIP = "ADMINISTRACIÓN MILAGRO";
      llave1.ZFECHA = this.getView().byId("idfechageneral").getValue();
      llave1.ZCOD_CAMPO = this.getView().byId("inputcampo").getValue();
      llave1.ZNRO_PROG = this.getView().byId("inputNroProg").getValue();
      llave1.ZCOD_LABOR = this.getView().byId("inputlabor").getValue();
      llave1.ZNRO_APLIC = "0";
      llave1.ZPT_TRABAJO= this.getView().byId("inputPueTrab").getValue();
      llave1.ZCANT_NOT = "0.000";
      llave1.ZUM = "TAS";
      llave1.ZPROVEEDOR = "CODIGO PROVEEDOR 1";
      llave1.ZCONFORMIDAD = this.getView().byId("conformidad").getSelectedKey();
      llave1.ZESTADO = this.getView().byId("estado").getSelectedKey();
      llave1.ZOBSERVACIÓN = this.getView().byId("observacion").getValue();
      llave1.ZVEHICULO = this.getView().byId("inputvehiculo").getValue();
      llave1.ZHRKM_INI = this.getView().byId("efectivo8787").getValue();
      llave1.ZHRKM_FIN = this.getView().byId("final").getValue();
      llave1.ZHRKM_EFEC = this.getView().byId("efectivo").getValue();
      llave1.ZHR_INI = this.getView().byId("iniciop").getValue();
      llave1.ZHR_FIN = this.getView().byId("finp").getValue();
      llave1.ZCANT_LAB = this.getView().byId("clabor").getValue();
      llave1.ZCANT_NET = "0.000";
      llave1.ZCANT_AVANCE = this.getView().byId("cantavance").getValue();
      llave1.ZHORA_INCIDENCIA = "00:00:00";
      llave1.ZHR_INI_ELEV = this.getView().byId("hinielev").getValue();
      llave1.ZHR_FIN_ELEV = this.getView().byId("hfinelev").getValue();
      T_ITEMS.push(llave1);
      content.T_ZSTSA_TRABA = T_ZSTSA_TRABA;
      content.T_ZSTSA_INCID = T_ZSTSA_INCID;
      content.T_NUMERO_PARTE = T_NUMERO_PARTE;
      content.T_ZSTSA_TRABA_TERCERO = T_ZSTSA_TRABA_TERCERO;
      content.T_ITEMS = T_ITEMS;
      T_CARGA.push(content);
      T_CARGA = JSON.stringify(T_CARGA);
      console.log(T_CARGA);

      var GUI = "PR0000000013";
      var texto = "s4h/sap/bc/ZSAGW_SMART/Para/SAVE/"+GUI+"/PD/PF/mat";
      $.ajax(texto, {
        type: 'GET',
        async: false,
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        complete: function (xhr) {
          var token = xhr.getResponseHeader("X-CSRF-Token");
//          console.log("ENTRO");
          $.ajax(texto, {
            type: 'POST',
            data: T_CARGA,
            beforeSend: function (xhr) {
              xhr.setRequestHeader('X-CSRF-Token', token);
            },
            success: function (response) {
              console.log(response);
              var list = that.getView().byId("idListlabor");
              var objlist = that.getView().byId("idListItemlabor");
              var oMModel = new sap.ui.model.json.JSONModel(response);
              //CONFIRMACI�N MENSAJE
              //var bCompact = !!vthis.getView().$().closest(".sapUiSizeCompact").length;
              //MessageBox.success(
              //  "Se guard� con exito el Lote de Recepci�n",
              //  {
              //    styleClass: bCompact ? "sapUiSizeCompact" : ""
              //  }
              //);

                  var errormsg;
                    errormsg = response.ITAB[0].MESSAGE;
                    //console.log(errormsg);
                    if (!this.oSuccessMessageDialog) {
                        this.oSuccessMessageDialog = new Dialog({
                          type: DialogType.Message,
                          title: "Registro Guardado",
                          state: ValueState.Success,
                          content: new Text({ text: errormsg }),
                          beginButton: new Button({
                            type: ButtonType.Emphasized,
                            text: "OK",
                            press: function () {
                              this.oSuccessMessageDialog.close();
                              var FECHA=sap.ui.getCore().byId("id_fechaf").getValue();
                              var texto = "s4h/sap/bc/ZSAGW_SMART/Para/LIST/"+FECHA+"/PD/PF/mat";
                              console.log(texto);
                              var busy = new sap.m.BusyDialog();
                              busy.open();

                              var oMModel = new sap.ui.model.json.JSONModel(texto, false);
                              oMModel.attachRequestCompleted(function () {
                                try {
                                  var jsonVAR = oMModel.getJSON();
                                  console.log(oMModel.getProperty("/TI_LIST_PARTE"));

                                  list.setModel(oMModel);
                                  list.bindItems({
                                    path: "/TI_LIST_PARTE",
                                    template: objlist
                                  });
                                  busy.close();
                                } catch (err) {
                                  console.log("ERROR: ");
                                  console.log(err);
                                }
                              });
                              that.getView().byId("Cabecera1").setVisible(false);
                              that.getView().byId("idTablaMaterial").setVisible(false);
                            }.bind(this)
                          })
                        });
                      }

                      this.oSuccessMessageDialog.open();

             vthis.getSplitAppObj().backDetail();
             sap.m.MessageToast.show("N° de Item Guardado");
             vthis.getSplitAppObj().setMode("ShowHideMode");
             vthis.onClear();
            }.bind(this),
            error: function (response) {
              console.log(response);
              var oModelp = vthis.getView().getModel("myParam");
              var oMModel = new sap.ui.model.json.JSONModel(response.responseJSON.ITAB);
              oModelp.setProperty("/ErrorMensajes", response.responseJSON.ITAB);
              var errormsg = {};
              var objeto = {};
              var objetoA = [];
              oModelp.setProperty("/mockdata", objetoA);
              console.log(oModelp);
              var verror;
              for (var i = 0; i < 1; i++) {
                if (oMModel.getProperty("/" + i + "/TYPE") == "E") {
                  verror = "Error";
                } else {
                  verror = "Warning";
                }
                errormsg.type = verror;
                errormsg.title = oMModel.getProperty("/" + i + "/ID") + " - NUMBER: " + oMModel.getProperty("/" + i + "/NUMBER");
                errormsg.subtitle = oMModel.getProperty("/" + i + "/MESSAGE");
                errormsg.description = oMModel.getProperty("/" + i + "/MESSAGE");
                errormsg.group = oMModel.getProperty("/" + i + "/TYPE");
                objetoA.push(errormsg);
              }
              oModelp.setProperty("/mockdata", objetoA);
              console.log(oModelp);
              vthis.handleMessageViewPress();
            }.bind(this)
          });
        },
        success: function (response) {
          console.log(response);
        },
        error: function (response) {
          vthis.getView().setBusy(false);
          console.log(response);
        }.bind(this)
      });


      }
      else{
        sap.m.MessageToast.show("Datos adicionales: un parámetro esta vacío");
      }


    },
    onGuardarMaterial2:function(){
        var model = this.getView().getModel("myParam");

        var vthis = this ;
        var that = this;
        console.log(model);
        var token = model.getProperty("/varUsuarioPrincipalTokken");
        console.log(token);

        var opcion3 = this.getView().byId("fuente").getSelectedKey();
        console.log(opcion1);
        var canContinue4 = (opcion3=="")?false:true;
        var opcion4 = this.getView().byId("forma").getSelectedKey();
        console.log(opcion1);
        var canContinue5 = (opcion4=="")?false:true;

        var canContinue = true;
        var opcion1 = this.getView().byId("conformidad").getSelectedKey();
        console.log(opcion1);
        var keyppuestotrab= this.getView().byId("inputPueTrab").getValue(); 
        var canContinue2 = (opcion1=="-")?false:true;
        var opcion2 = this.getView().byId("estado").getSelectedKey();
        console.log(opcion2);

        var canContinue3 = (opcion2=="-")?false:true;
        //canContinue
        if(keyppuestotrab!="SA_AGUA"){
            if(canContinue2&&canContinue3){
  
                var content = {};
                var llave = {};
                var llave1 = {};
                var llave2 = {};
                var T_NUMERO_PARTE = [];
                var T_ITEMS = [];
                var T_ZSTSA_TRABA = [];
                var T_ZSTSA_INCID = [];
                var T_ZSTSA_TRABA_TERCERO = [];
                var T_CARGA = [];
                llave.ZNUMERO_PARTE = "PR0000000019";
                llave.ZCODIGO = "001015";
                llave.ZZONA= "";
                T_NUMERO_PARTE.push(llave);
                T_ZSTSA_TRABA = model.getProperty("/T_DETALLE_TRABAJA/");
                T_ZSTSA_INCID = model.getProperty("/T_DETALLE_INCIDENCIA/");
                T_ZSTSA_TRABA_TERCERO = model.getProperty("/T_DETALLE_TERCEROS/");
                llave1.ZNRO_ITEM = "0001";
                llave1.ZCOD_PROG = model.getProperty("/tblItem/0/ZNRO_PARTE");
                llave1.ZDESCRIP = "ADMINISTRACIÓN MILAGRO";
                llave1.ZFECHA = this.getView().byId("idfechageneral").getValue();
                llave1.ZCOD_CAMPO = this.getView().byId("inputcampo").getValue();
                llave1.ZNRO_PROG = this.getView().byId("inputNroProg").getValue();
                llave1.ZCOD_LABOR = this.getView().byId("inputlabor").getValue();
                llave1.ZNRO_APLIC = "0";
                llave1.ZPT_TRABAJO= this.getView().byId("inputPueTrab").getValue();
                llave1.ZCANT_NOT = "0.000";
                llave1.ZUM = "TAS";
                llave1.ZPROVEEDOR = "CODIGO PROVEEDOR 1";
                llave1.ZCONFORMIDAD = this.getView().byId("conformidad").getSelectedKey();
                llave1.ZESTADO = this.getView().byId("estado").getSelectedKey();
                llave1.ZOBSERVACIÓN = this.getView().byId("observacion").getValue();
                llave1.ZVEHICULO = this.getView().byId("inputvehiculo").getValue();
                llave1.ZHRKM_INI = this.getView().byId("efectivo8787").getValue();
                llave1.ZHRKM_FIN = this.getView().byId("final").getValue();
                llave1.ZHRKM_EFEC = this.getView().byId("efectivo").getValue();
                llave1.ZHR_INI = this.getView().byId("iniciop").getValue();
                llave1.ZHR_FIN = this.getView().byId("finp").getValue();
                llave1.ZCANT_LAB = this.getView().byId("clabor").getValue();
                llave1.ZCANT_NET = "0.000";
                llave1.ZCANT_AVANCE = this.getView().byId("cantavance").getValue();
                llave1.ZHORA_INCIDENCIA = "00:00:00";
                llave1.ZHR_INI_ELEV = this.getView().byId("hinielev").getValue();
                llave1.ZHR_FIN_ELEV = this.getView().byId("hfinelev").getValue();
                T_ITEMS.push(llave1);
                content.T_ZSTSA_TRABA = T_ZSTSA_TRABA;
                content.T_ZSTSA_INCID = T_ZSTSA_INCID;
                content.T_NUMERO_PARTE = T_NUMERO_PARTE;
                content.T_ZSTSA_TRABA_TERCERO = T_ZSTSA_TRABA_TERCERO;
                content.T_ITEMS = T_ITEMS;
                T_CARGA.push(content);
                T_CARGA = JSON.stringify(T_CARGA);
                console.log(T_CARGA);
          
                //var GUI = "PR0000000013";
                var oHeaders = { 'X-CSRF-Token': token };
                var GUI = "PR0000001882";
                var texto = "s4h/sap/bc/ZSAGW_SMART/Para/SAVE/"+GUI+"/PD/PF/mat";        
                 
                    console.log("ENTRO");
                    $.ajax(texto, {
                      headers: oHeaders,		
                      method: 'POST',
                      data: T_CARGA,        
                      contentType: "application/json;IEEE754Compatible=true",	 
                      success: function (response) {
                        console.log(response);
                        var list = that.getView().byId("idListlabor");
                        var objlist = that.getView().byId("idListItemlabor");
                        var oMModel = new sap.ui.model.json.JSONModel(response);
                        //CONFIRMACI�N MENSAJE
                        //var bCompact = !!vthis.getView().$().closest(".sapUiSizeCompact").length;
                        //MessageBox.success(
                        //  "Se guard� con exito el Lote de Recepci�n",
                        //  {
                        //    styleClass: bCompact ? "sapUiSizeCompact" : ""
                        //  }
                        //);
          
                           /* var errormsg;//delete gmt 28/03/2022
                              errormsg = response.ITAB[0].MESSAGE;
                              //console.log(errormsg);
                              if (!this.oSuccessMessageDialog) {
                                  this.oSuccessMessageDialog = new Dialog({
                                    type: DialogType.Message,
                                    title: "Registro Guardado",
                                    state: ValueState.Success,
                                    content: new Text({ text: errormsg }),
                                    beginButton: new Button({
                                      type: ButtonType.Emphasized,
                                      text: "OK",
                                      press: function () {
                                        this.oSuccessMessageDialog.close();
                                        var FECHA=sap.ui.getCore().byId("id_fechaf").getValue();
                                        var texto = "s4h/sap/bc/ZSAGW_SMART/Para/LIST/"+FECHA+"/PD/PF/mat";
                                        console.log(texto);//gmt
                                        var busy = new sap.m.BusyDialog();
                                        busy.open();
          
                                        var oMModel = new sap.ui.model.json.JSONModel(texto, false);
                                        oMModel.attachRequestCompleted(function () {
                                          try {
                                            var jsonVAR = oMModel.getJSON();
                                            console.log(oMModel.getProperty("/TI_LIST_PARTE"));
          
                                            list.setModel(oMModel);
                                            list.bindItems({
                                              path: "/TI_LIST_PARTE",
                                              template: objlist
                                            });
                                            busy.close();
                                          } catch (err) {
                                            console.log("ERROR: ");
                                            console.log(err);
                                          }
                                        });
                                        that.getView().byId("Cabecera1").setVisible(false);
                                        that.getView().byId("idTablaMaterial").setVisible(false);
                                      }.bind(this)
                                    })
                                  });
                                }
          
                                this.oSuccessMessageDialog.open();*/
                                var llave = {};
                                var vector = [];
                                for (var r = 0; r < response.ITAB.length; r++) {
                                    llave = {};
                                    if (response.ITAB[r].TYPE === "S") {
                                        llave.type = "Success";
                                        llave.title = "Mensaje de éxito";
                                        llave.subtitle = response.ITAB[r].MESSAGE;
                                        llave.subdetalle = "";
                                        vector.push(llave);
                                    } else if (response.ITAB[r].TYPE === "W") {
        
                                        llave.type = "Warning";
                                        llave.title = "Mensaje de alerta";
                                        llave.subtitle = response.ITAB[r].MESSAGE;
                                        llave.subdetalle = "";
                                        vector.push(llave);
                                    } else if (response.ITAB[r].TYPE === "I") {                                        
                                        llave.type = "Information";
                                        llave.title = "Mensaje informativo";
                                        llave.subtitle = response.ITAB[r].MESSAGE;
                                        llave.subdetalle = "";
                                        vector.push(llave);
                                    }                                    
                                }
                                console.log(vector);
                                model.setProperty("/ERRORES2", vector);
                                vthis.handleMessageViewPre2();
                       vthis.getSplitAppObj().backDetail();
                       sap.m.MessageToast.show("N° de Item Guardado");
                       vthis.getSplitAppObj().setMode("ShowHideMode");
                       vthis.onClear();
                      }.bind(this),
                      error: function (response) {
                        console.log(response);
                        var oModelp = vthis.getView().getModel("myParam");
                        var oMModel = new sap.ui.model.json.JSONModel(response.responseJSON.ITAB);
                        oModelp.setProperty("/ErrorMensajes", response.responseJSON.ITAB);
                        var errormsg = {};
                        var objeto = {};
                        var objetoA = [];
                        oModelp.setProperty("/mockdata", objetoA);
                        console.log(oModelp);
                        var verror;
                        for (var i = 0; i < 1; i++) {
                          if (oMModel.getProperty("/" + i + "/TYPE") == "E") {
                            verror = "Error";
                          } else {
                            verror = "Warning";
                          }
                          errormsg.type = verror;
                          errormsg.title = oMModel.getProperty("/" + i + "/ID") + " - NUMBER: " + oMModel.getProperty("/" + i + "/NUMBER");
                          errormsg.subtitle = oMModel.getProperty("/" + i + "/MESSAGE");
                          errormsg.description = oMModel.getProperty("/" + i + "/MESSAGE");
                          errormsg.group = oMModel.getProperty("/" + i + "/TYPE");
                          objetoA.push(errormsg);
                        }
                        oModelp.setProperty("/mockdata", objetoA);
                        console.log(oModelp);
                        vthis.handleMessageViewPress();
                      }.bind(this)
                    });
                  
          
             
          
          
                }
                else{
                    sap.m.MessageToast.show("Datos adicionales: un parámetro esta vacío");
                }                

        }else{
            if(canContinue4&&canContinue5){
  
                var content = {};
                var llave = {};
                var llave1 = {};
                var llave2 = {};
                var T_NUMERO_PARTE = [];
                var T_ITEMS = [];
                var T_ZSTSA_TRABA = [];
                var T_ZSTSA_INCID = [];
                var T_ZSTSA_TRABA_TERCERO = [];
                var T_CARGA = [];
                llave.ZNUMERO_PARTE = "PR0000000019";
                llave.ZCODIGO = "001015";
                llave.ZZONA= "";
                T_NUMERO_PARTE.push(llave);
                T_ZSTSA_TRABA = model.getProperty("/T_DETALLE_TRABAJA/");
                T_ZSTSA_INCID = model.getProperty("/T_DETALLE_INCIDENCIA/");
                T_ZSTSA_TRABA_TERCERO = model.getProperty("/T_DETALLE_TERCEROS/");
                llave1.ZNRO_ITEM = "0001";
                llave1.ZCOD_PROG = model.getProperty("/tblItem/0/ZNRO_PARTE");
                llave1.ZDESCRIP = "ADMINISTRACIÓN MILAGRO";
                llave1.ZFECHA = this.getView().byId("idfechageneral").getValue();
                llave1.ZCOD_CAMPO = this.getView().byId("inputcampo").getValue();
                llave1.ZNRO_PROG = this.getView().byId("inputNroProg").getValue();
                llave1.ZCOD_LABOR = this.getView().byId("inputlabor").getValue();
                llave1.ZNRO_APLIC = "0";
                llave1.ZPT_TRABAJO= this.getView().byId("inputPueTrab").getValue();
                llave1.ZCANT_NOT = "0.000";
                llave1.ZUM = "TAS";
                llave1.ZPROVEEDOR = "CODIGO PROVEEDOR 1";
                llave1.ZCONFORMIDAD = this.getView().byId("conformidad").getSelectedKey();
                llave1.ZESTADO = this.getView().byId("estado").getSelectedKey();
                llave1.ZOBSERVACIÓN = this.getView().byId("observacion").getValue();
                llave1.ZVEHICULO = this.getView().byId("inputvehiculo").getValue();
                llave1.ZHRKM_INI = this.getView().byId("efectivo8787").getValue();
                llave1.ZHRKM_FIN = this.getView().byId("final").getValue();
                llave1.ZHRKM_EFEC = this.getView().byId("efectivo").getValue();
                llave1.ZHR_INI = this.getView().byId("iniciop").getValue();
                llave1.ZHR_FIN = this.getView().byId("finp").getValue();
                llave1.ZCANT_LAB = this.getView().byId("clabor").getValue();
                llave1.ZCANT_NET = "0.000";
                llave1.ZCANT_AVANCE = this.getView().byId("cantavance").getValue();
                llave1.ZHORA_INCIDENCIA = "00:00:00";
                llave1.ZHR_INI_ELEV = this.getView().byId("hinielev").getValue();
                llave1.ZHR_FIN_ELEV = this.getView().byId("hfinelev").getValue();
                T_ITEMS.push(llave1);
                content.T_ZSTSA_TRABA = T_ZSTSA_TRABA;
                content.T_ZSTSA_INCID = T_ZSTSA_INCID;
                content.T_NUMERO_PARTE = T_NUMERO_PARTE;
                content.T_ZSTSA_TRABA_TERCERO = T_ZSTSA_TRABA_TERCERO;
                content.T_ITEMS = T_ITEMS;
                T_CARGA.push(content);
                T_CARGA = JSON.stringify(T_CARGA);
                console.log(T_CARGA);
          
                //var GUI = "PR0000000013";
                var oHeaders = { 'X-CSRF-Token': token };
                var GUI = "PR0000001882";
                var texto = "s4h/sap/bc/ZSAGW_SMART/Para/SAVE/"+GUI+"/PD/PF/mat";        
                 
                    console.log("ENTRO");
                    $.ajax(texto, {
                      headers: oHeaders,		
                      method: 'POST',
                      data: T_CARGA,        
                      contentType: "application/json;IEEE754Compatible=true",	 
                      success: function (response) {
                        console.log(response);
                        var list = that.getView().byId("idListlabor");
                        var objlist = that.getView().byId("idListItemlabor");
                        var oMModel = new sap.ui.model.json.JSONModel(response);
                        //CONFIRMACI�N MENSAJE
                        //var bCompact = !!vthis.getView().$().closest(".sapUiSizeCompact").length;
                        //MessageBox.success(
                        //  "Se guard� con exito el Lote de Recepci�n",
                        //  {
                        //    styleClass: bCompact ? "sapUiSizeCompact" : ""
                        //  }
                        //);
          /*
                            var errormsg;
                              errormsg = response.ITAB[0].MESSAGE;
                              //console.log(errormsg);
                              if (!this.oSuccessMessageDialog) {
                                  this.oSuccessMessageDialog = new Dialog({
                                    type: DialogType.Message,
                                    title: "Registro Guardado",
                                    state: ValueState.Success,
                                    content: new Text({ text: errormsg }),
                                    beginButton: new Button({
                                      type: ButtonType.Emphasized,
                                      text: "OK",
                                      press: function () {
                                        this.oSuccessMessageDialog.close();
                                        var FECHA=sap.ui.getCore().byId("id_fechaf").getValue();
                                        var texto = "s4h/sap/bc/ZSAGW_SMART/Para/LIST/"+FECHA+"/PD/PF/mat";
                                        console.log(texto);
                                        var busy = new sap.m.BusyDialog();
                                        busy.open();
          
                                        var oMModel = new sap.ui.model.json.JSONModel(texto, false);
                                        oMModel.attachRequestCompleted(function () {
                                          try {
                                            var jsonVAR = oMModel.getJSON();
                                            console.log(oMModel.getProperty("/TI_LIST_PARTE"));
          
                                            list.setModel(oMModel);
                                            list.bindItems({
                                              path: "/TI_LIST_PARTE",
                                              template: objlist
                                            });
                                            busy.close();
                                          } catch (err) {
                                            console.log("ERROR: ");
                                            console.log(err);
                                          }
                                        });
                                        that.getView().byId("Cabecera1").setVisible(false);
                                        that.getView().byId("idTablaMaterial").setVisible(false);
                                      }.bind(this)
                                    })
                                  });
                                }
          
                                this.oSuccessMessageDialog.open();*/
                                var llave = {};
                                var vector = [];
                                for (var r = 0; r < response.ITAB.length; r++) {
                                    llave = {};
                                    if (response.ITAB[r].TYPE === "S") {
                                        llave.type = "Success";
                                        llave.title = "Mensaje de éxito";
                                        llave.subtitle = response.ITAB[r].MESSAGE;
                                        llave.subdetalle = "";
                                        vector.push(llave);
                                    } else if (response.ITAB[r].TYPE === "W") {
        
                                        llave.type = "Warning";
                                        llave.title = "Mensaje de alerta";
                                        llave.subtitle = response.ITAB[r].MESSAGE;
                                        llave.subdetalle = "";
                                        vector.push(llave);
                                    } else if (response.ITAB[r].TYPE === "I") {                                        
                                        llave.type = "Information";
                                        llave.title = "Mensaje informativo";
                                        llave.subtitle = response.ITAB[r].MESSAGE;
                                        llave.subdetalle = "";
                                        vector.push(llave);
                                    }                                    
                                }
                                console.log(vector);
                                model.setProperty("/ERRORES2", vector);
                                vthis.handleMessageViewPre2();
                       vthis.getSplitAppObj().backDetail();
                       sap.m.MessageToast.show("N° de Item Guardado");
                       vthis.getSplitAppObj().setMode("ShowHideMode");
                       vthis.onClear();
                      }.bind(this),
                      error: function (response) {
                        console.log(response);
                        var oModelp = vthis.getView().getModel("myParam");
                        var oMModel = new sap.ui.model.json.JSONModel(response.responseJSON.ITAB);
                        oModelp.setProperty("/ErrorMensajes", response.responseJSON.ITAB);
                        var errormsg = {};
                        var objeto = {};
                        var objetoA = [];
                        oModelp.setProperty("/mockdata", objetoA);
                        console.log(oModelp);
                        var verror;
                        for (var i = 0; i < 1; i++) {
                          if (oMModel.getProperty("/" + i + "/TYPE") == "E") {
                            verror = "Error";
                          } else {
                            verror = "Warning";
                          }
                          errormsg.type = verror;
                          errormsg.title = oMModel.getProperty("/" + i + "/ID") + " - NUMBER: " + oMModel.getProperty("/" + i + "/NUMBER");
                          errormsg.subtitle = oMModel.getProperty("/" + i + "/MESSAGE");
                          errormsg.description = oMModel.getProperty("/" + i + "/MESSAGE");
                          errormsg.group = oMModel.getProperty("/" + i + "/TYPE");
                          objetoA.push(errormsg);
                        }
                        oModelp.setProperty("/mockdata", objetoA);
                        console.log(oModelp);
                        vthis.handleMessageViewPress();
                      }.bind(this)
                    });
                  
          
             
          
          
                }
                else{
                    sap.m.MessageToast.show("Riego: un parámetro esta vacío");
                }    
        }
    
    },
    fnadditem: function () {
      this.getSplitAppObj().to(this.createId("idnuevalabor"));
      var oView = this.getView();
      var oModelG = this.getView().getModel("myParam");
      var busy = new sap.m.BusyDialog();
      busy.open();
      var fechageneral =sap.ui.getCore().byId("id_fechaf").getValue();
      this.getView().byId("idfechageneral").setValue(fechageneral);
      //this.getSplitAppObj().setMode("HideMode");
      this.onHelpForma();
      this.onHelpFuente();
      this.onHelpProveedor();
      var GUI = oModelG.getProperty("/detalle/ZNUMERO");
      var FECHA = sap.ui.getCore().byId("id_fechaf").getValue();
      var NRO_PROG = this.getView().byId("inputNroProg").getValue();
      var texto = "s4h/sap/bc/ZSAGW_SMART/Para/ADIC/"+FECHA+"/0/"+GUI+"/0";
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
           var varT_DETALLE = oModelJSON.getProperty("/ITAB");
           oModelG.setProperty("/tblItem", varT_DETALLE);
           console.log(oModelG);


      busy.close();
        }.bind(this),
        error: function (response) {
          console.log(response);
          busy.close();
        }.bind(this)
      });
      var numparte= oModelG.getProperty("/tblItem/0/ZNRO_PARTE");
      console.log(numparte);
      var item= oModelG.getProperty("/tblItem/0/ZITEM");
      console.log(item);
      this.getView().byId("numeroparte").setValue(numparte);
      /*this.getView().byId("numeroitem").setValue(item);*/
    },
    
    addZeroBefore: function (n) {
        return (n < 10 ? '0' : '') + n;
    },
    fnaddmaterial: function () {
      this.getSplitAppObj().to(this.createId("idnuevalabor"));
      var oView = this.getView();
      var oModelG = this.getView().getModel("myParam");
      var oDate = new Date();
      var months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
      var sCurrentDate = this.addZeroBefore(oDate.getDate()) + "." + months[oDate.getMonth()]+ "." +  oDate.getFullYear();
      var fechageneral = (sap.ui.getCore().byId("id_fechaf")!=undefined)?sap.ui.getCore().byId("id_fechaf").getValue():sCurrentDate;
      this.getView().byId("idfechageneral").setValue(fechageneral);
      //this.getSplitAppObj().setMode("HideMode");
      this.onHelpForma();
      this.onHelpFuente();
      this.onHelpProveedor();

      console.log("entro");
      /*var nro_programacion = oModelG.getProperty("/key_nro_programacion");
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
      }*/

    },
    pressEditarMaterial: function (evt) {
      var vthis = this;
      var oItem = evt.getSource();
      var oContext = oItem.getBindingContext("oModel");
      var objeto = oContext.getObject();
      var oModelG = this.getView().getModel("oModel");

      var dialog2 = new sap.m.Dialog({
        title: 'Editar material ',
        icon: "sap-icon://form",
        type: 'Message',
        contentWidth: "auto",
        content: [
          new sap.ui.layout.VerticalLayout({
            width: "100%",
            content: [
              new sap.m.Toolbar({
                content: [
                  new sap.m.Label({
                    text: "Cod. material : ",
                    textAlign: "Left",
                    width: "30%"
                  }),

                  new sap.m.ComboBox({
                    textAlign: "Left",
                    id: "id_vdcodigo1",
                    selectedKey: objeto.COD_MATERIAL,
                    width: "auto",
                    placeholder: "-Seleccione material-",
                    items: {
                      path: "oModel>/DM_MATERIAL",
                      template: new sap.ui.core.Item({
                        key: "{oModel>CODIGO}",
                        text: "{oModel>DESCRIPCION}"
                      })
                    }
                  })
                ]
              }),
              new sap.m.Toolbar({
                content: [
                  new sap.m.Label({
                    width: "90px",
                    textAlign: "Left",
                    text: "Fecha inicio: "
                  }),
                  new sap.m.DatePicker({
                    textAlign: "Left",
                    id: "id_vdfechai1",
                    valueFormat: "dd/MM/yyyy",
                    displayFormat: "dd/MM/yyyy",
                    value: objeto.FECHA_INICIO
                  })
                ]
              }),
              new sap.m.Toolbar({
                // height: "auto",
                content: [
                  new sap.m.Label({
                    width: "90px",
                    textAlign: "Left",
                    text: "Fecha fin: "
                  }),
                  new sap.m.DatePicker({
                    textAlign: "Left",
                    id: "id_vdfechaf1",
                    valueFormat: "dd/MM/yyyy",
                    displayFormat: "dd/MM/yyyy",
                    value: objeto.FECHA_FIN
                  })
                ]
              }),
              new sap.m.Toolbar({
                // height: "auto",
                content: [
                  new sap.m.Label({
                    width: "90px",
                    textAlign: "Left",
                    text: "Cantidad :"
                  }),
                  new sap.m.Input({
                    textAlign: "Left",
                    id: "id_vdcantidad1",
                    value: objeto.CANTIDAD
                  })
                ]
              })

            ]
          }),

        ],
        beginButton: new sap.m.Button({
          text: 'Guardar',
          type: "Accept",
          icon: "sap-icon://save",
          press: function () {

            dialog2.setBusy(true);
            var llave = {};
            var nroprog = objeto.NRO_PROG;
            var pos = objeto.POSICION;

            llave.COD_MATERIAL = sap.ui.getCore().byId("id_vdcodigo1").getSelectedKey();
            llave.FECHA_INICIO = funciones.fnConvertirStringtoDate(sap.ui.getCore().byId("id_vdfechai1")._lastValue);
            llave.FECHA_FIN = funciones.fnConvertirStringtoDate(sap.ui.getCore().byId("id_vdfechaf1")._lastValue);
            llave.CANTIDAD = parseFloat(sap.ui.getCore().byId("id_vdcantidad1")._lastValue) + "";
            var url = "s4h/public/aa/smartagri/service/data.xsodata";
            var oDataModel = new sap.ui.model.odata.v2.ODataModel(url, true);
            var text = "/prog_material(NRO_PROG='" + nroprog + "',POSICION=" + pos + ")";
            oDataModel.update(text, llave, {
              success: function (data) {
                dialog2.setBusy(false);
                // this.fnllenarmaterial();
                dialog2.close();
                var dialogA = new sap.m.Dialog({
                  title: "Se registró con éxito",
                  type: "Message",
                  state: "Success",
                  content: new sap.m.Text({
                    text: "Se actualizó correctamente el material."
                  }),
                  beginButton: new sap.m.Button({
                    text: "OK",
                    type: "Accept",
                    press: function () {
                      dialogA.close();
                    }.bind(this)
                  }),
                  afterClose: function (response) {
                    dialogA.destroy();
                  }.bind(this)

                });
                dialogA.open();

              }.bind(this),
              error: function (data) {
                dialog2.setBusy(false);
                var dialogA = new sap.m.Dialog({
                  title: "Se ha generado un error",
                  type: "Message",
                  state: "Error",
                  content: new sap.m.Text({
                    text: "No se actualizó correctamente"
                  }),
                  beginButton: new sap.m.Button({
                    text: "OK",
                    type: "Accept",
                    press: function () {
                      dialogA.close();
                    }
                  }),
                  afterClose: function (response) {
                    dialogA.destroy();
                  }.bind(this)
                });
                dialogA.open();
              }.bind(this)

            });

          }.bind(this)

        }),
        endButton: new sap.m.Button({
          text: 'Cancelar',
          type: "Reject",
          icon: "sap-icon://sys-cancel",
          press: function () {
            dialog2.close();
          }.bind(this)
        }),

        afterClose: function () {
          dialog2.destroy();
        }
      });
      vthis.getView().addDependent(dialog2);
      dialog2.addStyleClass("style_dialog");
      dialog2.open();

    },
    pressEliminarMaterial: function (evt) {
      var vthis = this;
      var oItem = evt.getSource();
      var oContext = oItem.getBindingContext("oModel");
      var objeto = oContext.getObject();
      var dialogD = new sap.m.Dialog({
        title: "Mensaje de confirmación",
        type: "Message",
        state: "Information",
        content: new sap.m.Text({
          text: "¿Seguro que desea eliminar material: " + objeto.DESCRIPCION_MATERIAL + "?"
        }),
        beginButton: new sap.m.Button({
          text: "Si",
          type: "Accept",
          press: function () {
            dialogD.setBusy(true);
            var url = "s4h/public/aa/smartagri/service/data.xsodata";
            var oModel = new sap.ui.model.odata.v2.ODataModel(url, true);
            oModel.remove("/prog_material(NRO_PROG='" + objeto.NRO_PROG + "',POSICION=" + objeto.POSICION + ")", {
              success: function (data) {
                dialogD.setBusy(false);
                dialogD.close();
                var dialogA = new sap.m.Dialog({
                  title: "Se eliminó con éxito",
                  type: "Message",
                  state: "Success",
                  content: new sap.m.Text({
                    text: "Se elimino correctamente el material: " + objeto.DESCRIPCION_MATERIAL + "."
                  }),
                  beginButton: new sap.m.Button({
                    text: "OK",
                    type: "Accept",
                    press: function () {
                      vthis.fnllenarmaterial();
                      dialogA.close();
                    }.bind(this)
                  }),
                  afterClose: function (response) {
                    dialogA.destroy();
                  }.bind(this)

                });
                dialogA.open();
              }.bind(this),
              error: function (data) {
                dialogD.setBusy(false);
                var dialogA = new sap.m.Dialog({
                  title: "Se ha generado un error",
                  type: "Message",
                  state: "Error",
                  content: new sap.m.Text({
                    text: "No se eliminó correctamente."
                  }),
                  beginButton: new sap.m.Button({
                    text: "OK",
                    type: "Accept",
                    press: function () {
                      dialogA.close();
                    }
                  }),
                  afterClose: function (response) {
                    dialogA.destroy();
                  }.bind(this)
                });
                dialogA.open();

                dialogD.close();
              }.bind(this)
            });

          }.bind(this)
        }),
        endButton: new sap.m.Button({
          text: "No",
          type: "Reject",
          press: function () {
            dialogD.close();
          }
        }),
        afterClose: function (response) {
          dialogD.destroy();
        }.bind(this)

      });
      dialogD.open();
    },
    onPressAnadirmaquinaria: function () {
      var that = this;
      var oModelG = this.getView().getModel("oModel");
      var texto;
      var texto = "s4h/public/aa/smartagri/service/data.xsodata/pt_equipos";
      var oObject, aArray = [];
      $.ajax(texto, {
        type: 'GET',
        async: false,
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        },
        complete: function (xhr) {},
        success: function (response) {
          for (var j = 0; j < response.d.results.length; j++) {
            if (response.d.results[j].ID_EQUIPO != "") {
              oObject = new sap.ui.model.Filter("PUESTO", "EQ", response.d.results[j].PUESTO);
              aArray.push(oObject);
            }
          }
        }
      });

      var nro_programacion = oModelG.getProperty("/key_nro_programacion");
      var vthis = this;
      var pressDialog = new sap.m.Dialog({
        title: "Añadir maquinaria",
        type: "Message",
        contentWidth: "auto",
        content: [
          new sap.ui.layout.VerticalLayout({
            width: "100%",
            content: [

              new sap.m.Toolbar({
                // height: "auto",
                content: [
                  new sap.m.Label({
                    width: "90px",
                    textAlign: "Left",
                    text: "Pst. trabajo: "
                  }),
                  new sap.m.ComboBox({
                    textAlign: "Left",
                    id: "Idpt",
                    width: "auto",
                    change: function (oEvent) {
                      var value = oEvent.getSource().getSelectedKey();
                      var seen = [],
                        llave = {},
                        oFilterComboBox;
                      var aFiltersComboBox = [];
                      texto = "s4h/public/aa/smartagri/service/data.xsodata/pt_equipos?$filter=PUESTO eq '" + value + "' ";
                      $.ajax(texto, {
                        type: 'GET',
                        async: false,
                        dataType: "json",
                        beforeSend: function (xhr) {
                          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
                        },
                        complete: function (xhr) {},
                        success: function (response) {
                          for (var i = 0; i < response.d.results.length; i++) {
                            if (!(response.d.results[i].ID_EQUIPO in seen)) {
                              oFilterComboBox = new sap.ui.model.Filter("ID_EQUIPO", "EQ", response.d.results[i].ID_EQUIPO);
                              aFiltersComboBox.push(oFilterComboBox);
                              seen[response.d.results[i].ID_EQUIPO] = true;
                            }
                          }
                        }
                      });

                      // oModelG.setProperty("/cbxequipo", oModelG.getProperty("/cbxPt_equipos"));
                      var oComboBoxControl = sap.ui.getCore().byId("Idequipo");
                      var oBindingComboBox = oComboBoxControl.getBinding("items");
                      // var oFilterComboBox = new sap.ui.model.Filter("PUESTO", "EQ", value);
                      oComboBoxControl.setEnabled(true);
                      oBindingComboBox.filter(aFiltersComboBox);
                      oComboBoxControl.setSelectedKey(null);
                    },
                    placeholder: "-Seleccione puesto trabajo-",
                    items: {
                      path: "oModel>/cbxPT",
                      template: new sap.ui.core.Item({
                        key: "{oModel>PUESTO}",
                        text: "{oModel>PUESTO}"
                      })
                    }
                  })
                ]
              }),
              new sap.m.Toolbar({
                // height: "auto",
                content: [
                  new sap.m.Label({
                    width: "90px",
                    textAlign: "Left",
                    text: "Implemento: "
                  }),
                  new sap.m.ComboBox({
                    textAlign: "Left",
                    id: "Idequipo",
                    width: "auto",
                    enabled: false,
                    placeholder: "-Seleccione implemento-",
                    items: {
                      path: "oModel>/cbxequipo",
                      template: new sap.ui.core.Item({
                        key: "{oModel>ID_EQUIPO}",
                        text: "{oModel>DESCRIP_EQUIPO}"
                      })
                    }
                  })
                ]
              }),

              new sap.m.Toolbar({
                // height: "auto",
                content: [
                  new sap.m.Label({
                    width: "90px",
                    textAlign: "Left",
                    text: "Fecha inicio: "
                  }),
                  new sap.m.DatePicker({
                    textAlign: "Left",
                    id: "Idfechai",
                    valueFormat: "dd/MM/yyyy",
                    displayFormat: "dd/MM/yyyy"
                  })
                ]
              }),
              new sap.m.Toolbar({
                // height: "auto",
                content: [
                  new sap.m.Label({
                    width: "90px",
                    textAlign: "Left",
                    text: "Fecha fin: "
                  }),
                  new sap.m.DatePicker({
                    textAlign: "Left",
                    id: "Idfechaf",
                    valueFormat: "dd/MM/yyyy",
                    displayFormat: "dd/MM/yyyy"
                  })
                ]
              }),
              new sap.m.Toolbar({
                // height: "auto",
                content: [
                  new sap.m.Label({
                    width: "90px",
                    textAlign: "Left",
                    text: "Cantidad :"
                  }),
                  new sap.m.Input({
                    textAlign: "Left",
                    id: "Idcantidad",
                    maxLength: 15
                  })
                ]
              })

            ]
          })
        ],

        beginButton: new sap.m.Button({
          text: 'Grabar',
          icon: "sap-icon://save",
          press: function () {

            var canContinue = true;
            var inputs = [
              sap.ui.getCore().byId("Idpt"),
              sap.ui.getCore().byId("Idequipo"),
              sap.ui.getCore().byId("Idfechai"),
              sap.ui.getCore().byId("Idfechaf")
            ];
            jQuery.each(inputs, function (i, input) {
              if (!input.getValue()) {
                input.setValueState("Error");
                canContinue = false;
              } else {
                input.setValueState("None");
              }
            });

            if (canContinue) {
              var posicion = oModelG.getProperty("/tblDetalleMaquinaria/length");
              posicion++;
              var puesto = sap.ui.getCore().byId("Idpt")._lastValue;
              var equipo = sap.ui.getCore().byId("Idequipo").getSelectedKey();
              // var descripcion = sap.ui.getCore().byId("Idequipo")._lastValue;
              var fechai = sap.ui.getCore().byId("Idfechai")._lastValue;
              fechai = funciones.fnConvertirStringtoDate(fechai);
              var fechaf = sap.ui.getCore().byId("Idfechaf")._lastValue;
              fechaf = funciones.fnConvertirStringtoDate(fechaf);
              var cantidad = sap.ui.getCore().byId("Idcantidad")._lastValue;
              if (cantidad == "" || cantidad == undefined) {
                cantidad = "0";
              }
              // var descripcion = funciones.fnObtenerDescripcion_Equipo(equipo);
              var llave = {};
              llave.NRO_PROG = nro_programacion;
              llave.POSICION = posicion;
              llave.PUESTO = puesto;
              llave.ID_EQUIPO = equipo;
              llave.FECHA_INICIO = fechai;
              llave.FECHA_FIN = fechaf;
              llave.CANTIDAD = cantidad;
              console.log(llave);
              // llave.DESCRIPCION_EQUIPO = descripcion;
              // var aArray = oModelG.getProperty("/tblDetalleMaquinaria");
              // aArray.push(llave);
              // oModelG.setProperty("/tblDetalleMaquinaria", aArray)
              var url = "s4h/public/aa/smartagri/service/data.xsodata/";
              var oModel = new sap.ui.model.odata.v2.ODataModel(url, true);

              oModel.create("/prog_maquinaria", llave, {
                method: "POST",
                success: function (data) {
                  pressDialog.setBusy(false);
                  pressDialog.close();
                  var dialogA = new sap.m.Dialog({
                    title: "Se registró con éxito",
                    type: "Message",
                    state: "Success",
                    content: new sap.m.Text({
                      text: "Se ingresó correctamente."
                    }),
                    beginButton: new sap.m.Button({
                      text: "OK",
                      type: "Accept",
                      press: function () {
                        this.fnlistadomaquinaria();
                        dialogA.close();
                      }.bind(this)
                    }),
                    afterClose: function (response) {
                      dialogA.destroy();
                    }.bind(this)

                  });
                  dialogA.open();
                }.bind(this),
                error: function (data) {
                  pressDialog.setBusy(false);
                  var dialogA = new sap.m.Dialog({
                    title: "Se ha generado un error",
                    type: "Message",
                    state: "Error",
                    content: new sap.m.Text({
                      text: "No se registró."
                    }),
                    beginButton: new sap.m.Button({
                      text: "OK",
                      type: "Accept",
                      press: function () {
                        dialogA.close();
                      }
                    }),
                    afterClose: function (response) {
                      dialogA.destroy();
                    }.bind(this)
                  });
                  dialogA.open();
                }.bind(this)
              });
              // dialog2.setBusy(true);
            } else {
              var dialog = new sap.m.Dialog({
                title: "Alerta",
                type: "Message",
                state: "Warning",
                content: new sap.m.Text({
                  text: "Se requiere ingresar todos los campos."

                }),
                beginButton: new sap.m.Button({
                  text: "Aceptar",
                  type: "Emphasized",
                  press: function () {
                    dialog.close();
                    dialog.destroy();

                  }
                }),
                afterClose: function () {
                  dialog.destroy();
                }
              });
              dialog.open();
            }

            pressDialog.close();
          }.bind(this)
        }),
        endButton: new sap.m.Button({
          text: "Cancelar",
          icon: "sap-icon://sys-cancel",
          press: function () {
            pressDialog.close();
            // pressDialog.destroy();

          }
        }),
        afterClose: function () {
          pressDialog.destroy();
        }
      });
      vthis.getView().addDependent(pressDialog);
      pressDialog.addStyleClass("style_dialog");
      pressDialog.open();

      var oComboBoxControl2 = sap.ui.getCore().byId("Idpt");
      var oBindingComboBox2 = oComboBoxControl2.getBinding("items");
      console.log(aArray);
      // var oFilterComboBox = new sap.ui.model.Filter("PUESTO", "EQ", value);
      oBindingComboBox2.filter(aArray);
      console.log(oBindingComboBox2);
      if (pressDialog) {
        pressDialog.addStyleClass("class_Manejo");
      }
    },
    onError: function () {
      this.handleMessageViewPress();
    },
    onPressCrearmanoobra: function () {
      var oModelG = this.getView().getModel("oModel");
      var nro_programacion = oModelG.getProperty("/key_nro_programacion");

      var vthis = this;
      var pressDialog = new sap.m.Dialog({
        title: "Añadir mano de obra",
        type: "Message",
        contentWidth: "auto",
        content: [
          new sap.ui.layout.VerticalLayout({
            width: "100%",
            content: [

              new sap.m.Toolbar({
                content: [
                  new sap.m.Label({
                    width: "90px",
                    textAlign: "Left",
                    text: "Puesto: "
                  }),
                  new sap.m.ComboBox({
                    textAlign: "Left",
                    id: "Idpt",
                    width: "auto",
                    placeholder: "-Seleccione puesto trabajo-",
                    items: {
                      path: "oModel>/DM_PUESTO_TRABAJO",
                      template: new sap.ui.core.Item({
                        key: "{oModel>PUESTO}",
                        text: "{oModel>PUESTO}"
                      })
                    }
                  })
                ]
              }),
              new sap.m.Toolbar({
                content: [
                  new sap.m.Label({
                    width: "90px",
                    textAlign: "Left",
                    text: "Fecha inicio: "
                  }),
                  new sap.m.DatePicker({
                    textAlign: "Left",
                    id: "Idfechai",
                    valueFormat: "dd/MM/yyyy",
                    displayFormat: "dd/MM/yyyy"
                  })
                ]
              }),
              new sap.m.Toolbar({
                content: [
                  new sap.m.Label({
                    width: "90px",
                    textAlign: "Left",
                    text: "Fecha fin: "
                  }),
                  new sap.m.DatePicker({
                    textAlign: "Left",
                    id: "Idfechaf",
                    valueFormat: "dd/MM/yyyy",
                    displayFormat: "dd/MM/yyyy"
                  })
                ]
              }),
              new sap.m.Toolbar({
                content: [
                  new sap.m.Label({
                    width: "90px",
                    textAlign: "Left",
                    text: "Cantidad :"
                  }),
                  new sap.m.Input({
                    textAlign: "Left",
                    id: "Idcantidad",
                    maxLength: 15
                  })
                ]
              })

            ]
          })
        ],

        beginButton: new sap.m.Button({
          text: 'Grabar',
          icon: "sap-icon://save",
          press: function () {

            var canContinue = true;
            var inputs = [
              sap.ui.getCore().byId("Idpt"),
              sap.ui.getCore().byId("Idfechai"),
              sap.ui.getCore().byId("Idfechaf")
            ];
            jQuery.each(inputs, function (i, input) {
              if (!input.getValue()) {
                input.setValueState("Error");
                canContinue = false;
              } else {
                input.setValueState("None");
              }
            });

            if (canContinue) {
              var posicion = oModelG.getProperty("/tblDetalleManoobra/length");
              posicion++;

              var puestot = sap.ui.getCore().byId("Idpt")._lastValue;
              var fechai = sap.ui.getCore().byId("Idfechai")._lastValue;
              fechai = funciones.fnConvertirStringtoDate(fechai);
              var fechaf = sap.ui.getCore().byId("Idfechaf")._lastValue;
              fechaf = funciones.fnConvertirStringtoDate(fechaf);
              var cantidad = sap.ui.getCore().byId("Idcantidad")._lastValue;
              if (cantidad == "" || cantidad == null) {
                cantidad = "0";
              }
              var llave = {};
              llave.NRO_PROG = nro_programacion;
              llave.POSICION = posicion;
              llave.PUESTO = puestot;
              llave.FECHA_INICIO = fechai;
              llave.FECHA_FIN = fechaf;
              llave.CANTIDAD = cantidad;
              console.log(llave);
              var url = "s4h/public/aa/smartagri/service/data.xsodata/";
              var oModel = new sap.ui.model.odata.v2.ODataModel(url, true);
              oModel.create("/prog_manoobra", llave, {
                method: "POST",
                success: function (data) {
                  pressDialog.setBusy(false);
                  pressDialog.close();
                  var dialogA = new sap.m.Dialog({
                    title: "Se registró con éxito",
                    type: "Message",
                    state: "Success",
                    content: new sap.m.Text({
                      text: "Se ingresó correctamente."
                    }),
                    beginButton: new sap.m.Button({
                      text: "OK",
                      type: "Accept",
                      press: function () {
                        this.fnllenarlistadomanoobra();
                        dialogA.close();
                      }.bind(this)
                    }),
                    afterClose: function (response) {
                      dialogA.destroy();
                    }.bind(this)

                  });
                  dialogA.open();
                }.bind(this),
                error: function (data) {
                  pressDialog.setBusy(false);
                  var dialogA = new sap.m.Dialog({
                    title: "Se ha generado un error",
                    type: "Message",
                    state: "Error",
                    content: new sap.m.Text({
                      text: "No se registró."
                    }),
                    beginButton: new sap.m.Button({
                      text: "OK",
                      type: "Accept",
                      press: function () {
                        dialogA.close();
                      }
                    }),
                    afterClose: function (response) {
                      dialogA.destroy();
                    }.bind(this)
                  });
                  dialogA.open();
                }.bind(this)
              });
              // dialog2.setBusy(true);
            } else {
              var dialog = new sap.m.Dialog({
                title: "Alerta",
                type: "Message",
                state: "Warning",
                content: new sap.m.Text({
                  text: "Se requiere ingresar todos los campos."

                }),
                beginButton: new sap.m.Button({
                  text: "Aceptar",
                  type: "Emphasized",
                  press: function () {
                    dialog.close();
                    dialog.destroy();

                  }
                }),
                afterClose: function () {
                  dialog.destroy();
                }
              });
              dialog.open();
            }

            pressDialog.close();
          }.bind(this)
        }),
        endButton: new sap.m.Button({
          text: "Cancelar",
          icon: "sap-icon://sys-cancel",
          press: function () {
            pressDialog.close();
            // pressDialog.destroy();

          }
        }),
        afterClose: function () {
          pressDialog.destroy();
        }
      });
      vthis.getView().addDependent(pressDialog);
      pressDialog.addStyleClass("style_dialog");
      pressDialog.open();
      if (pressDialog) {
        pressDialog.addStyleClass("class_Manejo");
      }
    },
    handleValueChangeCSV1: function (e) {

        this.funImportarExcel(e.getParameter("files") && e.getParameter("files")[0]);
    },
    handleValueChangeCSV2: function (e) {
        var keyppuestotrab= this.getView().byId("inputPueTrab").getValue(); 
        console.log(keyppuestotrab);//SA_OBR_T
        var oThis = this;
        var model = oThis.getView().getModel("myParam");        
        if(keyppuestotrab!=""){
            if(keyppuestotrab!="SA_OBR_T"){
            var texto = "s4h/sap/bc/ZSAGW_SMART/Para/AYU/0/0/TRABAP/"+keyppuestotrab;
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
                    var varT_DETALLE = oModelJSON.getProperty("/ITAB");
                    model.setProperty("/tblHelpTrabajar", varT_DETALLE);
                    console.log(model);
                    this.funImportarExcelTRAB(e.getParameter("files") && e.getParameter("files")[0]);
        
                }.bind(this),
                error: function (response) {
                    console.log(response);
        
                }.bind(this)
                });
                
            }else{
              sap.m.MessageToast.show("Puesto trabajo no debe ser Tercero");
            }
        }else{
          sap.m.MessageToast.show("Puesto trabajo está vacío");
        }
        
    },    
    handleValueChangeCSVPERDS: function (e) {
        var keyprovedor= this.getView().byId("country").getSelectedKey();
        var keyppuestotrab= this.getView().byId("inputPueTrab").getValue(); 
        var oThis = this;
        var model = oThis.getView().getModel("myParam");        	
        if (keyprovedor != "" && keyprovedor != undefined) {
            if (keyppuestotrab == "SA_OBR_T") {
                var texto = "s4h/sap/bc/ZSAGW_SMART/Para/AYU/0/0/TRABAT/0";
                $.ajax(texto, {
                    type: 'GET',
                    async: false,
                    beforeSend: function (xhr) {
                    xhr.setRequestHeader("X-CSRF-Token", "Fetch");
                      },
                      success: function (response) {
                        console.log(response);
                         var oModelJSON = new sap.ui.model.json.JSONModel(response);                       
                         var varT_DETALLE = oModelJSON.getProperty("/ITAB");
                         model.setProperty("/tblHelpTerceros", varT_DETALLE);                        
                         this.funImportarExcelPers(e.getParameter("files") && e.getParameter("files")[0]);
              
                      }.bind(this),
                      error: function (response) {
                        console.log(response);
              
                      }.bind(this)
                    });
               
            } else {
                sap.m.MessageToast.show("Puesto de trabajo debe ser tercero");
                this.getView().byId("idFile").setValue("");
            }
        } else {
            sap.m.MessageToast.show("Proveedor está vacía");
            this.getView().byId("idFile").setValue("");
        }
       
    },
    funImportarExcel: function (file) {

        var oThis = this;
        var oModel = oThis.getView().getModel("myParam");
        
        var that = this;
        var excelData = {};
        var texto = "s4h/sap/bc/ZSAGW_SMART/Para/AYU/0/0/INCI/0";
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
                var varT_DETALLE = oModelJSON.getProperty("/ITAB");
                oModel.setProperty("/tblHelpInci", varT_DETALLE);
                console.log(oModel);
                var list=oModel.getProperty("/tblHelpInci");
                if (file && window.FileReader) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var data = e.target.result;
                        var workbook = XLSX.read(data, {
                            type: 'binary'
                        });
                        workbook.SheetNames.forEach(function (sheetName) {
                            // Here is your object for every sheet in workbook
                            excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        
                        });             
                            var ocodigos = "No se encuentra registrado el código:";      
                            var icon = 0; 
                            var canContinue = true;                     
                            var oMatriz = [];
                            var oVector = {};
                            try {
                                if(excelData.length!=0){
                                   for (var i = 0; i < excelData.length; i++) {
                                    oVector = {};
                                    oVector.ITEM = (icon+1).toString();
                                    oVector.CODIGO_INCI = this.zfill(excelData[i].CODIGO.toString(),4);
                                    oVector.DESCRIP_INCIDENCIA = ((list.filter(x => x.ZCOD_INCID==this.zfill(excelData[i].CODIGO.toString(),4))).length>0)?list.filter(e=>e.ZCOD_INCID == this.zfill(excelData[i].CODIGO.toString(),4))[0].ZDES_INCID:"sin datos";     //excelData[i].DESCRIPCION.toString();
                                    oVector.FECHA_FIN = excelData[i].FECHAFIN.toString();
                                    oVector.FECHA_INICIO = excelData[i].FECHAINICIO.toString();
                                    oVector.HORA_FIN = excelData[i].HORAFIN.toString();
                                    oVector.HORA_INICIO = excelData[i].HORAINICIO.toString();                           
                                    var conv_hora_inicio=(excelData[i].HORAINICIO.toString()).split(':');
                                    var conver_hora_inicio = conv_hora_inicio[0]+":"+conv_hora_inicio[1];
                                    var conv_hora_final=oVector.HORA_FIN.split(':');
                                    var conver_hora_final = conv_hora_final[0]+":"+conv_hora_final[1];
                                    console.log(conver_hora_inicio);
                                    console.log(conver_hora_final);
                                    var minutos_inicio = conver_hora_inicio.split(':').reduce((p, c) => parseInt(p) * 60 + parseInt(c));
                                    var minutos_final = conver_hora_final.split(':').reduce((p, c) => parseInt(p) * 60 + parseInt(c));
                                    console.log(minutos_inicio);
                                    // Diferencia de minutos
                                    var diferencia = minutos_final - minutos_inicio;
                                    // C�lculo de horas y minutos de la diferencia
                                    var horas = Math.floor(diferencia / 60);
                                    var minutos = diferencia % 60;
                                    oVector.TOTAL = horas + ':'+ (minutos < 10 ? '0' : '') + minutos+':'+'00';                          
                                    //oMatriz.push(oVector);
                                    icon=icon+1;
                                    if (oVector.DESCRIP_INCIDENCIA!="sin datos") {                                                  
                                        oMatriz.push(oVector);//GMT                                                  
                                    }else{
                                        icon=icon-1;
                                        ocodigos = ocodigos.concat(" -" + oVector.CODIGO_INCI);
                                        //sap.m.MessageToast.show("No se encuentra teregistrado el código:");
                                    }  
        
                                   
                           
                                    }
                                }else{
                                    canContinue = false;
                                }
                                if (canContinue) {    
                                oModel.setProperty("/T_DETALLE_INCIDENCIA", oMatriz);
                                }
                                if(ocodigos!="No se encuentra registrado el código:"){
                                    sap.m.MessageToast.show(ocodigos);
                                }
        
                            } catch (err) {
                                console.log(err);
                                this.getView().byId("idFileCSV1").setValue("");
                            }
                          
                            console.log(oMatriz);
                        
        
                    }.bind(this);
                    reader.onerror = function (ex) {
                        this.getView().byId("idFileCSV1").setValue("");
                        console.log(ex);
                    };
                    reader.readAsBinaryString(file);
                }
            }.bind(this),
            error: function (response) {
                console.log(response);
    
            }.bind(this)
            });
        
    },
    funImportarExcelTRAB: function (file) {

        var oThis = this;
        var oModel = oThis.getView().getModel("myParam");
        var list=oModel.getProperty("/tblHelpTrabajar");
       

        var that = this;
        var excelData = {};
        if (file && window.FileReader) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                var workbook = XLSX.read(data, {
                    type: 'binary'
                });
                workbook.SheetNames.forEach(function (sheetName) {
                    // Here is your object for every sheet in workbook
                    excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

                });             
                    var ocodigos = "No se encuentra registrado el código:";      
                    var icon = 0;                     
                    var oMatriz = [];
                    var oVector = {};
                    var canContinue = true;
                    try {
                           for (var i = 0; i < excelData.length; i++) {
                            var valor = excelData[i].HORAS.toString();

                            if (parseInt(valor)>0&&parseInt(valor)<=24) {
                                oVector = {};
                                oVector.ITEM = (icon+1).toString();
                                oVector.COD_TRABAJADOR = this.zfill(excelData[i].CODIGO_TRABAJADOR.toString(),8);
                                oVector.NOMBRE = ((list.filter(x => x.ZCOD_TRAB==this.zfill(excelData[i].CODIGO_TRABAJADOR.toString(),8))).length>0)?list.filter(e=>e.ZCOD_TRAB == this.zfill(excelData[i].CODIGO_TRABAJADOR.toString(),8))[0].NOMBRE:"sin datos";                           
                     
                                oVector.NRO_HORAS = excelData[i].HORAS.toString();                                                    
                                //oMatriz.push(oVector);//GMT
                                console.log(oVector.NOMBRE);    
                                icon=icon+1;
                                if (oVector.NOMBRE!="sin datos") {
                                    
                                    oMatriz.push(oVector);//GMT                                                    
                                
                                }else{
                                    icon=icon-1;
                                    ocodigos = ocodigos.concat(" -" + oVector.COD_TRABAJADOR);
                                    //sap.m.MessageToast.show("No se encuentratest registrado el código:");
                                }   
                                
                            }else{
                                canContinue = false;
                              
                                sap.m.MessageToast.show("Nro. Horas debe ser entero y menor a 24 horas");
                            }                            
                           
                   
                        }
                     
                        if (canContinue) {
                            oModel.setProperty("/T_DETALLE_TRABAJA", oMatriz);
                            this.getView().byId("idFileCSV2").setValue("");
                            this.onactualizahoras();
                        }
                        if(ocodigos!="No se encuentra registrado el código:"){
                            sap.m.MessageToast.show(ocodigos);
                        }

                    } catch (err) {
                        console.log(err);
                        this.getView().byId("idFileCSV2").setValue("");
                    }
                  
                    console.log(oMatriz);
                

            }.bind(this);
            reader.onerror = function (ex) {
                this.getView().byId("idFileCSV2").setValue("");
                console.log(ex);
            };
            reader.readAsBinaryString(file);
        }
    },    
    funImportarExcelPers: function (file) {

        var oThis = this;
        var oModel = oThis.getView().getModel("myParam");
        var list=oModel.getProperty("/tblHelpTerceros");
        console.log(list);

        var that = this;
        var excelData = {};
        if (file && window.FileReader) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                var workbook = XLSX.read(data, {
                    type: 'binary'
                });
                workbook.SheetNames.forEach(function (sheetName) {
                    // Here is your object for every sheet in workbook
                    excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

                }); 
                    try {
                    var ocodigos = "No se encuentra registrado el código:";
                    var icon = 0; 
                    var oMatriz = [];
                    var oVector = {};
                    var canContinue = true;
                           for (var i = 0; i < excelData.length; i++) {
                                var valor = excelData[i].HORAS.toString();
                                if (parseInt(valor)>0&&parseInt(valor)<=24) {
                                   
                                    oVector = {};
                                    oVector.ITEM = (icon+1).toString();
                                    oVector.COD_TRABAJADOR = this.zfill(excelData[i].CODIGO_TRABAJADOR.toString(),8);            
                                    oVector.NOMBRE = ((list.filter(x => x.ZCOD_TRAB==this.zfill(excelData[i].CODIGO_TRABAJADOR.toString(),8))).length>0)?list.filter(e=>e.ZCOD_TRAB == this.zfill(excelData[i].CODIGO_TRABAJADOR.toString(),8))[0].NOMBRE:"sin datos";//excelData[i].NOMBRE.toString();
                                    oVector.NRO_HORAS = excelData[i].HORAS.toString();
                                    oVector.COD_PROVEEDOR =  this.getView().byId("country").getSelectedKey();//excelData[i].CODIGO_PROVEEDOR.toString();                                  
                                    //oMatriz.push(oVector);//GMT
                                    icon=icon+1;
                                    if (oVector.NOMBRE!="sin datos") {                                                  
                                        oMatriz.push(oVector);//GMT                                                   
                                    }else{
                                        icon=icon-1;
                                        ocodigos = ocodigos.concat(" -" + oVector.COD_TRABAJADOR);
                                        //sap.m.MessageToast.show("No se encuentratest registrado el código");
                                    }   

                                    
                                }else{
                                    canContinue = false;
                                  
                                    sap.m.MessageToast.show("Nro. Horas debe ser entero y menor a 24 horas");
                                }                       
                            }
                            if (canContinue) {                                
                                oModel.setProperty("/T_DETALLE_TERCEROS", oMatriz);
                                this.getView().byId("idFile").setValue("");
                                this.onactualizahoras();
                            }
                            if(ocodigos!="No se encuentra registrado el código:"){
                                sap.m.MessageToast.show(ocodigos);
                            }
                    } catch (err) {
                        console.log(err);
                        this.getView().byId("idFile").setValue("");
                    }
                    console.log(oMatriz);
                

            }.bind(this);
            reader.onerror = function (ex) {
                console.log(ex);
                this.getView().byId("idFile").setValue("");
            };
            reader.readAsBinaryString(file);
        }
    },
    zfill: function (number, width) {
        var numberOutput = Math.abs(number); /* Valor absoluto del número */
        var length = number.toString().length; /* Largo del número */
        var zero = "0"; /* String de cero */

        if (width <= length) {
            if (number < 0) {
                return ("-" + numberOutput.toString());
            } else {
                return numberOutput.toString();
            }
        } else {
            if (number < 0) {
                return ("-" + (zero.repeat(width - length)) + numberOutput.toString());
            } else {
                return ((zero.repeat(width - length)) + numberOutput.toString());
            }
        }
    },    
    btneditarprog: function () {
      var oModel = this.getView().getModel("oModel");
      var vthis = this;
      var pressDialog = new sap.m.Dialog({
        title: "Editar programación",
        type: "Message",
        contentWidth: "auto",
        content: [
          new sap.ui.layout.VerticalLayout({
            width: "100%",
            content: [

              new sap.m.Toolbar({
                // height: "auto",
                content: [
                  new sap.m.Label({
                    width: "120px",
                    textAlign: "Left",
                    text: "Campaña: "
                  }),
                  new sap.m.ComboBox({
                    textAlign: "Left",
                    id: "id_vdcampana",
                    selectedKey: "{oModel>/VProg_Detalle/CAMPANA}",
                    items: {
                      path: "oModel>/DM_CAMPANA",
                      template: new sap.ui.core.Item({
                        key: "{oModel>CAMPANA}",
                        text: "{oModel>DESCRIPCION}"
                      })
                    }
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
                  new sap.m.ComboBox({
                    textAlign: "Left",
                    id: "id_vdzona",
                    selectedKey: "{oModel>/VProg_Detalle/ZONA}",
                    items: {
                      path: "oModel>/DM_ZONA",
                      template: new sap.ui.core.Item({
                        key: "{oModel>ZONA}",
                        text: "{oModel>ZONA}"
                      })
                    }
                  })
                ]
              }),
              new sap.m.Toolbar({
                content: [
                  new sap.m.Label({
                    width: "120px",
                    textAlign: "Left",
                    text: "Fundo: "
                  }),
                  new sap.m.ComboBox({
                    textAlign: "Left",
                    id: "id_vdfundo",
                    selectedKey: "{oModel>/VProg_Detalle/FUNDO}",
                    items: {
                      path: "oModel>/DM_FUNDO",
                      template: new sap.ui.core.Item({
                        key: "{oModel>FUNDO}",
                        text: "{oModel>DESCRIPCION}"
                      })
                    }
                  })
                ]
              }),
              new sap.m.Toolbar({
                content: [
                  new sap.m.Label({
                    width: "120px",
                    textAlign: "Left",
                    text: "Módulo: "
                  }),
                  new sap.m.ComboBox({
                    textAlign: "Left",
                    id: "id_vdmodulo",
                    selectedKey: "{oModel>/VProg_Detalle/MODULO}",
                    items: {
                      path: "oModel>/DM_MODULO",
                      template: new sap.ui.core.Item({
                        key: "{oModel>MODULO}",
                        text: "{oModel>DESCRIPCION}"
                      })
                    }
                  })
                ]
              }),
              new sap.m.Toolbar({
                // height: "auto",
                content: [
                  new sap.m.Label({
                    width: "120px",
                    textAlign: "Left",
                    text: "Etapa: "
                  }),
                  new sap.m.ComboBox({
                    textAlign: "Left",
                    id: "id_vdetapa",
                    selectedKey: "{oModel>/VProg_Detalle/ETAPA}",
                    items: {
                      path: "oModel>/DM_ETAPA",
                      template: new sap.ui.core.Item({
                        key: "{oModel>COD_ETAPA}",
                        text: "{oModel>NOMB_ETAPA}"
                      })
                    }
                  })
                ]
              }),
              new sap.m.Toolbar({
                content: [
                  new sap.m.Label({
                    width: "120px",
                    textAlign: "Left",
                    text: "Fecha inicio: "
                  }),
                  new sap.m.DatePicker({
                    textAlign: "Left",
                    id: "id_vdfechai",
                    valueFormat: "dd/MM/yyyy",
                    displayFormat: "dd/MM/yyyy",
                    value: "{oModel>/VProg_Detalle/FEC_INI}"
                  })
                ]
              }),
              new sap.m.Toolbar({
                content: [
                  new sap.m.Label({
                    width: "120px",
                    textAlign: "Left",
                    text: "Fecha fin: "
                  }),
                  new sap.m.DatePicker({
                    textAlign: "Left",
                    id: "id_vdfechaf",
                    valueFormat: "dd/MM/yyyy",
                    displayFormat: "dd/MM/yyyy",
                    value: "{oModel>/VProg_Detalle/FEC_FIN}"
                  })
                ]
              }),
              new sap.m.Toolbar({
                // height: "auto",
                content: [
                  new sap.m.Label({
                    width: "120px",
                    textAlign: "Left",
                    text: "Labor: "
                  }),
                  new sap.m.ComboBox({
                    textAlign: "Left",
                    id: "id_vdlabor",
                    selectedKey: "{oModel>/VProg_Detalle/LABOR}",
                    items: {
                      path: "oModel>/DM_LABOR",
                      template: new sap.ui.core.Item({
                        key: "{oModel>CODIGO}",
                        text: "{oModel>DESCRIPCION}"
                      })
                    }
                  })
                ]
              }),
              new sap.m.Toolbar({
                // height: "auto",
                content: [
                  new sap.m.Label({
                    width: "120px",
                    textAlign: "Left",
                    text: "Cultivo: "
                  }),
                  new sap.m.ComboBox({
                    textAlign: "Left",
                    id: "id_vdcultivo",
                    selectedKey: "{oModel>/VProg_Detalle/CULTIVO}",
                    items: {
                      path: "oModel>/DM_CULTIVO",
                      template: new sap.ui.core.Item({
                        key: "{oModel>CULTIVO}",
                        text: "{oModel>DESCRIPCION}"
                      })
                    }
                  })
                ]
              }),
              new sap.m.Toolbar({
                // height: "auto",
                content: [
                  new sap.m.Label({
                    width: "120px",
                    textAlign: "Left",
                    text: "Variedad: "
                  }),
                  new sap.m.ComboBox({
                    textAlign: "Left",
                    id: "id_vdvariedad",
                    selectedKey: "{oModel>/VProg_Detalle/VARIEDAD}",
                    items: {
                      path: "oModel>/DM_VARIEDAD",
                      template: new sap.ui.core.Item({
                        key: "{oModel>VARIEDAD}",
                        text: "{oModel>DESCRIPCION}"
                      })
                    }
                  })
                ]
              }),
              new sap.m.Toolbar({
                content: [
                  new sap.m.Label({
                    width: "120px",
                    textAlign: "Left",
                    text: "Turno: "
                  }),
                  new sap.m.ComboBox({
                    textAlign: "Left",
                    id: "id_vdturno",
                    selectedKey: "{oModel>/VProg_Detalle/TURNO}",
                    items: {
                      path: "oModel>/DM_TURNO",
                      template: new sap.ui.core.Item({
                        key: "{oModel>COD_TURNO}",
                        text: "{oModel>DESCRIP_TURNO}"
                      })
                    }
                  })
                ]
              }),
              new sap.m.Toolbar({
                // height: "auto",
                content: [
                  new sap.m.Label({
                    width: "120px",
                    textAlign: "Left",
                    text: "Avance: "
                  }),
                  new sap.m.Input({
                    textAlign: "Left",
                    id: "id_vdavance",
                    value: "{oModel>/VProg_Detalle/AVANCE}"
                  })
                ]
              }),

              new sap.m.Toolbar({
                // height: "auto",
                content: [
                  new sap.m.Label({
                    width: "120px",
                    textAlign: "Left",
                    text: "Unidad :"
                  }),
                  new sap.m.Input({
                    textAlign: "Left",
                    id: "id_vdunidad",
                    value: "{oModel>/VProg_Detalle/UNIDAD}"
                  })
                ]
              }),
              new sap.m.Toolbar({
                // height: "auto",
                content: [
                  new sap.m.Label({
                    width: "120px",
                    textAlign: "Left",
                    text: "Observaciones :",
                    wrapping: true
                  }),
                  new sap.m.TextArea({
                    width: "100%",
                    textAlign: "Left",
                    id: "id_vdobs",
                    value: "{oModel>/VProg_Detalle/OBSERVACIONES}"
                  })
                ]
              })

            ]
          })
        ],

        beginButton: new sap.m.Button({
          text: 'Grabar',
          icon: "sap-icon://save",
          press: function () {
            var canContinue = true;
            // var inputs = [
            //  sap.ui.getCore().byId("Idcodigo"),
            //  sap.ui.getCore().byId("Idfechai"),
            //  sap.ui.getCore().byId("Idfechaf")
            // ];
            // jQuery.each(inputs, function (i, input) {
            //  if (!input.getValue()) {
            //    input.setValueState("Error");
            //    canContinue = false;
            //  } else {
            //    input.setValueState("None");
            //  }
            // });

            if (canContinue) {
              var oObject = {};
              oObject.CAMPANA = sap.ui.getCore().byId("id_vdcampana").getSelectedKey();
              oObject.MODULO = sap.ui.getCore().byId("id_vdmodulo").getSelectedKey();
              oObject.CULTIVO = sap.ui.getCore().byId("id_vdcultivo").getSelectedKey();
              oObject.VARIEDAD = sap.ui.getCore().byId("id_vdvariedad").getSelectedKey();
              oObject.ETAPA = sap.ui.getCore().byId("id_vdetapa").getSelectedKey();
              oObject.COD_LABOR = sap.ui.getCore().byId("id_vdlabor").getSelectedKey();
              oObject.TURNO = sap.ui.getCore().byId("id_vdturno").getSelectedKey();
              oObject.FECHA_INICIO = funciones.fnConvertirStringtoDate(sap.ui.getCore().byId("id_vdfechai")._lastValue);
              oObject.FECHA_FIN = funciones.fnConvertirStringtoDate(sap.ui.getCore().byId("id_vdfechaf")._lastValue);
              oObject.AVANCE = parseFloat(sap.ui.getCore().byId("id_vdavance")._lastValue) + "";
              oObject.UNIDAD = sap.ui.getCore().byId("id_vdunidad")._lastValue;
              oObject.ZONA = sap.ui.getCore().byId("id_vdzona").getSelectedKey();
              oObject.FUNDO = sap.ui.getCore().byId("id_vdfundo").getSelectedKey();
              var nro_prog = oModel.getProperty("/VProg_Detalle/NRO_PROG");
              var url = "s4h/public/aa/smartagri/service/data.xsodata";
              var oDataModel = new sap.ui.model.odata.v2.ODataModel(url, true);
              var url2 = "/prog_labor('" + nro_prog + "')";
              oDataModel.update(url2,
                oObject, {
                  success: function (data) {}.bind(this),
                  error: function (oError) {}.bind(this)
                });
              funciones.fnMessageBoxSuccess(vthis, "Registro guardado con éxito.", "Info");
              pressDialog.close();

            }

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
      // var fechaactual = funciones.fnCalcularFechaActual();
      // sap.ui.getCore().byId("id_vdfechai").setValue(fechaactual);
      // sap.ui.getCore().byId("id_vdfechaf").setValue(fechaactual);
      vthis.getView().addDependent(pressDialog);
      pressDialog.addStyleClass("style_dialog");

      pressDialog.open();
      if (pressDialog) {
        pressDialog.addStyleClass("class_Manejo");
      }
    },
    pressDialog: null,
    btnFiltro: function () {
      var oModel = this.getView().getModel("myParam");
      var oView = this.getView();
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
                      text: "Fecha: "
                    }),
                    new sap.m.DatePicker({
                      id: "id_fechaf",
                      valueFormat: "dd.MM.yyyy",
                      displayFormat: "dd.MM.yyyy"
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
              var FECHA=sap.ui.getCore().byId("id_fechaf").getValue();
              var texto = "s4h/sap/bc/ZSAGW_SMART/Para/LIST/"+FECHA+"/PD/PF/mat";
              console.log(texto);
              var busy = new sap.m.BusyDialog();
              busy.open();
              var vthis = this;
              var oMModel = new sap.ui.model.json.JSONModel(texto, false);
              oMModel.attachRequestCompleted(function () {
                try {
                  var jsonVAR = oMModel.getJSON();
                  console.log(oMModel.getProperty("/TI_LIST_PARTE"));
                  var list = vthis.getView().byId("idListlabor");
                  var objlist = vthis.getView().byId("idListItemlabor");
                  list.setModel(oMModel);
                  list.bindItems({
                    path: "/TI_LIST_PARTE",
                    template: objlist
                  });
                  busy.close();
                } catch (err) {
                  console.log("ERROR: ");
                  console.log(err);
                }
              });
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
        var FECHA = new Date();
        var FECHAA = this.zero(FECHA.getDate())+ "."+this.zero(FECHA.getMonth()+1)+"."+FECHA.getFullYear();
        sap.ui.getCore().byId("id_fechaf").setValue(FECHAA);
        this.getView().addDependent(this.pressDialog);
        this.pressDialog.addStyleClass("style_dialog");
      }
      this.pressDialog.open();
      if (this.pressDialog) {
        this.pressDialog.addStyleClass("class_Manejo");
      }
    },
    handleSearch: function (oEvent) {
        var vthis = this;
        var filters = [];
        var query = oEvent.getSource().getValue();
        if (query && query.length > 0) {
          var filter = new sap.ui.model.Filter("ZNUMERO", sap.ui.model.FilterOperator.Contains, query);
          filters.push(filter);
        }
        console.log(filters);
        var tbl = vthis.getView().byId("idListlabor");
        var binding = tbl.getBinding("items");
        console.log(binding);
        binding.filter(filters);
      },
      handPastetableterceros: function (e) {
        var that = this;
        var oTable = this.getView().byId("tableterceros"); 
        var oModel = that.getView().getModel("myParam");
        var keyprovedor= this.getView().byId("country").getSelectedKey();
        var keyppuestotrab= this.getView().byId("inputPueTrab").getValue();     
        
        console.log(e);
        if(keyprovedor!="" && keyprovedor!=undefined){        
            if(keyppuestotrab=="SA_OBR_T"){

                var texto = "s4h/sap/bc/ZSAGW_SMART/Para/AYU/0/0/TRABAT/0";
                $.ajax(texto, {
                    type: 'GET',
                    async: false,
                    beforeSend: function (xhr) {
                    xhr.setRequestHeader("X-CSRF-Token", "Fetch");
                      },
                      success: function (response) {
                        console.log(response);
                         var oModelJSON = new sap.ui.model.json.JSONModel(response);                       
                         var varT_DETALLE = oModelJSON.getProperty("/ITAB");
                         oModel.setProperty("/tblHelpTerceros", varT_DETALLE);                        
                         var list=oModel.getProperty("/tblHelpTerceros");
                         try {
                            var ocodigos = "No se encuentra registrado el código:";
                            var icon = 0; 
                            var oMatriz = oModel.getProperty("/T_DETALLE_TERCEROS");
                            var oVector = {};
                            var canContinue = true;
                            var count=oMatriz.length;
                
                                    if(e.mParameters.data.length!=0){
                                    for (var i = 0; i < e.mParameters.data.length; i++) {
                
                                            //for (var j = 0; j < e.mParameters.data[i].length; j++) {
                                        // var valor = excelData[i].HORAS.toString();
                                            //if (parseInt(valor)>0&&parseInt(valor)<=24) {
                                                var cod_tra=(e.mParameters.data[i][0]!=undefined)?e.mParameters.data[i][0].toString():"0";
                                                oVector = {};
                                                oVector.ITEM = (count+icon+1).toString();
                                                oVector.COD_TRABAJADOR = this.zfill(cod_tra,8);
                                                oVector.NOMBRE = ((list.filter(x => x.ZCOD_TRAB==this.zfill(cod_tra,8))).length>0)?list.filter(e=>e.ZCOD_TRAB == this.zfill(cod_tra,8))[0].NOMBRE:"sin datos";//excelData[i].NOMBRE.toString();
                                                oVector.NRO_HORAS =  (e.mParameters.data[i][1]!=undefined)?e.mParameters.data[i][1].toString():"";
                                                oVector.COD_PROVEEDOR =  this.getView().byId("country").getSelectedKey();//excelData[i].CODIGO_PROVEEDOR.toString(); 
                                               
                                                //oMatriz.push(oVector);//GMT
                                                console.log(oVector.NOMBRE);
                                                icon=icon+1;
                                                if (oVector.NOMBRE!="sin datos") {
                                                  
                                                    oMatriz.push(oVector);//GMT                                                    
                                             
                                                }else{
                                                    icon=icon-1;
                                                    ocodigos = ocodigos.concat(" -" + oVector.COD_TRABAJADOR);
                                                    //sap.m.MessageToast.show("No se encuentratest registrado el código");
                                                } 
                                        //  }else{
                                        //      canContinue = false;
                                            
                                        //     sap.m.MessageToast.show("Nro. Horas debe ser entero y menor a 24 horas");
                                        //  }
                                        // }                       
                                        }
                                    }else{
                                        canContinue = false;
                                    }
                                    if (canContinue) {                                       
                                        oModel.setProperty("/T_DETALLE_TERCEROS", oMatriz);
                                        this.onactualizahoras()
                                        //this.getView().byId("idFile").setValue("");
                                    }
                                    if(ocodigos!="No se encuentra registrado el código:"){
                                        sap.m.MessageToast.show(ocodigos);
                                    }
                            } catch (err) {
                                console.log(err);
                                //this.getView().byId("idFile").setValue("");
                            }
                      }.bind(this),
                      error: function (response) {
                        console.log(response);
              
                      }.bind(this)
                    });


            }else{
                sap.m.MessageToast.show("Puesto de trabajo debe ser tercero");
            }
          }else{
            sap.m.MessageToast.show("Proveedor está vacía");
         }
            
          
        
      },
      handPastetabletercerostest: function (e) {
        var that = this;
        var oTable = this.getView().byId("tableterceros"); 
        var oModel = that.getView().getModel("myParam");
        var keyprovedor= this.getView().byId("country").getSelectedKey();
        var keyppuestotrab= this.getView().byId("inputPueTrab").getValue();     
        
        console.log(e);
        if(true){        
            if(true){    
          
               
                         oModel.setProperty("/tblHelpTerceros", []);                        
                         var list=oModel.getProperty("/tblHelpTerceros");
                         try {
                            var oMatriz = oModel.getProperty("/T_DETALLE_TERCEROS");
                            var oVector = {};
                            var canContinue = true;
                            var count=oMatriz.length;
                
                                    if(e.mParameters.data.length!=0){
                                    for (var i = 0; i < e.mParameters.data.length; i++) {
                
                                            //for (var j = 0; j < e.mParameters.data[i].length; j++) {
                                        // var valor = excelData[i].HORAS.toString();
                                            //if (parseInt(valor)>0&&parseInt(valor)<=24) {
                                                var cod_tra=(e.mParameters.data[i][0]!=undefined)?e.mParameters.data[i][0].toString():"0";
                                                oVector = {};
                                                oVector.ITEM = (count+i+1).toString();
                                                oVector.COD_TRABAJADOR = this.zfill(cod_tra,8);
                                                oVector.NOMBRE = ((list.filter(x => x.ZCOD_TRAB==this.zfill(cod_tra,8))).length>0)?list.filter(e=>e.ZCOD_TRAB == this.zfill(cod_tra,8))[0].NOMBRE:"sin datos";//excelData[i].NOMBRE.toString();
                                                oVector.NRO_HORAS =  (e.mParameters.data[i][1]!=undefined)?e.mParameters.data[i][1].toString():"";
                                                oVector.COD_PROVEEDOR =  this.getView().byId("country").getSelectedKey();//excelData[i].CODIGO_PROVEEDOR.toString(); 
                                               
                                           
                                                console.log(oVector);     
                                                console.log(oVector.NOMBRE);        
                                                if (oVector.NOMBRE!="sin datos") {
                                                  
                                                    oMatriz.push(oVector);//GMT                                                    
                                             
                                                }else{
                                                    sap.m.MessageToast.show("No se encuentratst registrado el código");
                                                }   
                                        //  }else{
                                        //      canContinue = false;
                                            
                                        //     sap.m.MessageToast.show("Nro. Horas debe ser entero y menor a 24 horas");
                                        //  }
                                        // }                       
                                        }
                                    }else{
                                        canContinue = false;
                                    }
                                    if (canContinue) {
                                    
                                        oModel.setProperty("/T_DETALLE_TERCEROS", oMatriz);
                                        this.onactualizahoras()
                                        //this.getView().byId("idFile").setValue("");
                                    }
                            } catch (err) {
                                console.log(err);
                                //this.getView().byId("idFile").setValue("");
                            }
            


            }else{
                sap.m.MessageToast.show("Puesto de trabajo debe ser tercero");
            }
          }else{
            sap.m.MessageToast.show("Proveedor está vacía");
         }
            
          
        
      },
      handPastetabletrabaja: function (e) {
        var that = this;
        var oTable = this.getView().byId("tableterceros"); 
        var oModel = that.getView().getModel("myParam");
      
        var keyppuestotrab= this.getView().byId("inputPueTrab").getValue(); 
        console.log(keyppuestotrab);//SA_OBR_T
        if(keyppuestotrab!=""){
          if(keyppuestotrab!="SA_OBR_T"){
                var texto = "s4h/sap/bc/ZSAGW_SMART/Para/AYU/0/0/TRABAP/"+keyppuestotrab;
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
                        var varT_DETALLE = oModelJSON.getProperty("/ITAB");
                        oModel.setProperty("/tblHelpTrabajar", varT_DETALLE);
                        console.log(oModel);
                        var list=oModel.getProperty("/tblHelpTrabajar");
                        try {
                            var ocodigos = "No se encuentra registrado el código:";
                            var icon = 0; 
                            var oMatriz = oModel.getProperty("/T_DETALLE_TRABAJA");
                            var oVector = {};
                            var canContinue = true;
                            var count=oMatriz.length;
                
                                    if(e.mParameters.data.length!=0){
                                    for (var i = 0; i < e.mParameters.data.length; i++) {
                
                                            //for (var j = 0; j < e.mParameters.data[i].length; j++) {
                                        // var valor = excelData[i].HORAS.toString();
                                            //if (parseInt(valor)>0&&parseInt(valor)<=24) {
                                                var cod_tra=(e.mParameters.data[i][0]!=undefined)?e.mParameters.data[i][0].toString():"0";
                                                oVector = {};
                                                oVector.ITEM = (count+icon+1).toString();
                                                oVector.COD_TRABAJADOR = this.zfill(cod_tra,8);
                                                oVector.NOMBRE =  ((list.filter(x => x.ZCOD_TRAB==this.zfill(cod_tra,8))).length>0)?list.filter(e=>e.ZCOD_TRAB == this.zfill(cod_tra,8))[0].NOMBRE:"sin datos";
                                                
                                                //(e.mParameters.data[i][1]!=undefined)?e.mParameters.data[i][1].toString():"";
                                                oVector.NRO_HORAS =  (e.mParameters.data[i][1]!=undefined)?e.mParameters.data[i][1].toString():"";                                                                
                                              
                                               // oVector.NOMBRE = ((list.filter(x => x.ZCOD_TRAB==this.zfill(excelData[i].CODIGO_TRABAJADOR.toString(),8))).length>0)?list.filter(e=>e.ZCOD_TRAB == this.zfill(excelData[i].CODIGO_TRABAJADOR.toString(),8))[0].NOMBRE:"sos";
                            
                                               console.log(oVector);     
                                              // console.log(oVector.DESCRIP_INCIDENCIA);   
                                              icon=icon+1;     
                                               if (oVector.NOMBRE!="sin datos") {                                                  
                                                   oMatriz.push(oVector);//GMT                                                  
                                               }else{
                                                    icon=icon-1;
                                                    ocodigos = ocodigos.concat(" -" + oVector.COD_TRABAJADOR);
                                               }  
                                        //  }else{
                                        //      canContinue = false;
                                            
                                        //     sap.m.MessageToast.show("Nro. Horas debe ser entero y menor a 24 horas");
                                        //  }
                                        // }                       
                                        }
                                    }else{
                                        canContinue = false;
                                    }
                                    if (canContinue) {    

                                        oModel.setProperty("/T_DETALLE_TRABAJA", oMatriz);
                                        this.onactualizahoras()
                                        //this.getView().byId("idFile").setValue("");
                                    }
                                    if(ocodigos!="No se encuentra registrado el código:"){
                                        sap.m.MessageToast.show(ocodigos);
                                    }
                            } catch (err) {
                                console.log(err);
                                //this.getView().byId("idFile").setValue("");
                            }
            
                    }.bind(this),
                    error: function (response) {
                        console.log(response);
            
                    }.bind(this)
                    });
                              

                }else{
                    sap.m.MessageToast.show("Puesto trabajo no debe ser Tercero");
                  }
              }else{
                sap.m.MessageToast.show("Puesto trabajo está vacío");
              }
            
          
        
      },
      handPastetableincidencia: function (e) {
        var that = this;
        var oTable = this.getView().byId("tableterceros"); 
        var oModel = that.getView().getModel("myParam");
      
        var keyppuestotrab= this.getView().byId("inputPueTrab").getValue(); 
        console.log(keyppuestotrab);//SA_OBR_T
   
                var texto = "s4h/sap/bc/ZSAGW_SMART/Para/AYU/0/0/INCI/0";
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
                        var varT_DETALLE = oModelJSON.getProperty("/ITAB");
                        oModel.setProperty("/tblHelpInci", varT_DETALLE);
                        console.log(oModel);
                        var list=oModel.getProperty("/tblHelpInci");
                        try {
                            var ocodigos = "No se encuentra registrado el código:";
                            var icon = 0; 
                            var oMatriz = oModel.getProperty("/T_DETALLE_INCIDENCIA");
                            var oVector = {};
                            var canContinue = true;
                            var count=oMatriz.length;
                
                                    if(e.mParameters.data.length!=0){
                                    for (var i = 0; i < e.mParameters.data.length; i++) {
                                                
                                            //for (var j = 0; j < e.mParameters.data[i].length; j++) {
                                        // var valor = excelData[i].HORAS.toString();
                                            //if (parseInt(valor)>0&&parseInt(valor)<=24) {
                                                var cod_tra=(e.mParameters.data[i][0]!=undefined)?e.mParameters.data[i][0].toString():"0";
                                                oVector = {};
                                                oVector.ITEM = (count+icon+1).toString();
                                                oVector.CODIGO_INCI = this.zfill(cod_tra,4);
                                                oVector.DESCRIP_INCIDENCIA =  ((list.filter(x => x.ZCOD_INCID==this.zfill(cod_tra,4))).length>0)?list.filter(e=>e.ZCOD_INCID == this.zfill(cod_tra,4))[0].ZDES_INCID:"sin datos";                                           
                                                oVector.FECHA_INICIO =  (e.mParameters.data[i][1]!=undefined)?e.mParameters.data[i][1].toString():"";  
                                                oVector.HORA_INICIO =  (e.mParameters.data[i][2]!=undefined)?e.mParameters.data[i][2].toString():""; 
                                                oVector.HORA_FIN =  (e.mParameters.data[i][3]!=undefined)?e.mParameters.data[i][3].toString():""; 
                                                oVector.FECHA_FIN =  (e.mParameters.data[i][4]!=undefined)?e.mParameters.data[i][4].toString():"";    
                                               
                                                    var conv_hora_inicio=oVector.HORA_INICIO.split(':');
                                                    var conver_hora_inicio = conv_hora_inicio[0]+":"+conv_hora_inicio[1];
                                                    var conv_hora_final=oVector.HORA_FIN.split(':');
                                                    var conver_hora_final = conv_hora_final[0]+":"+conv_hora_final[1];
                                                    console.log(conver_hora_inicio);
                                                    console.log(conver_hora_final);
                                                    var minutos_inicio = conver_hora_inicio.split(':').reduce((p, c) => parseInt(p) * 60 + parseInt(c));
                                                    var minutos_final = conver_hora_final.split(':').reduce((p, c) => parseInt(p) * 60 + parseInt(c));
                                                    console.log(minutos_inicio);
                                                    // Diferencia de minutos
                                                    var diferencia = minutos_final - minutos_inicio;
                                                    // C�lculo de horas y minutos de la diferencia
                                                    var horas = Math.floor(diferencia / 60);
                                                    var minutos = diferencia % 60;
                                                oVector.TOTAL = horas + ':'+ (minutos < 10 ? '0' : '') + minutos+':'+'00';
                                                    //llave.TOTAL_HORAS = sap.ui.getCore().byId("idnroLiquidacion").getValue();gmt                                                                                    
                                                //oVector.TOTAL =  (e.mParameters.data[i][6]!=undefined)?e.mParameters.data[i][6].toString():"";         
                                                console.log(oVector);     
                                                console.log(oVector.DESCRIP_INCIDENCIA);        
                                                icon=icon+1;
                                                if (oVector.DESCRIP_INCIDENCIA!="sin datos") {                                                  
                                                    oMatriz.push(oVector);//GMT                                                  
                                                }else{
                                                    icon=icon-1;
                                                    ocodigos = ocodigos.concat(" -" + oVector.CODIGO_INCI);
                                                    //sap.m.MessageToast.show("No se encuenwwtra registrado el código:");
                                                }  
                                               // oVector.NOMBRE = ((list.filter(x => x.ZCOD_TRAB==this.zfill(excelData[i].CODIGO_TRABAJADOR.toString(),8))).length>0)?list.filter(e=>e.ZCOD_TRAB == this.zfill(excelData[i].CODIGO_TRABAJADOR.toString(),8))[0].NOMBR";
                            
                     
                                        //  }else{
                                        //      canContinue = false;
                                            
                                        //     sap.m.MessageToast.show("Nro. Horas debe ser entero y menor a 24 horas");
                                        //  }
                                        // }                       
                                        }
                                    }else{
                                        canContinue = false;
                                    }
                                    if (canContinue) {                                    
                                        oModel.setProperty("/T_DETALLE_INCIDENCIA", oMatriz);                                       
                                        //this.onactualizahoras()
                                        //this.getView().byId("idFile").setValue("");
                                    }
                                    if(ocodigos!="No se encuentra registrado el código:"){
                                        sap.m.MessageToast.show(ocodigos);
                                    }
                            } catch (err) {
                                console.log(err);
                                sap.m.MessageToast.show(err);
                                //this.getView().byId("idFile").setValue("");
                            }
            
                    }.bind(this),
                    error: function (response) {
                        console.log(response);
            
                    }.bind(this)
                    });
                              

               
          
        
      }
      /**
       * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
       * (NOT before the first rendering! onInit() is used for that one!).
       * @memberOf smartagri.Proyecto_SmartAgri.view.vista_programacion
       */
      //  onBeforeRendering: function() {
      //
      //  },

    /**
     * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
     * This hook is the same one that SAPUI5 controls get after being rendered.
     * @memberOf smartagri.Proyecto_SmartAgri.view.vista_programacion
     */
    //  onAfterRendering: function() {
    //
    //  },

    /**
     * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
     * @memberOf smartagri.Proyecto_SmartAgri.view.vista_programacion
     */
    //  onExit: function() {
    //
    //  }

  });

});