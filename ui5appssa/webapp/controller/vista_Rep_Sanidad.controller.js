sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/util/Export",
  "sap/ui/core/util/ExportTypeCSV",
  'sap/ui/export/Spreadsheet'
], function (Controller, Export, ExportTypeCSV, Spreadsheet) {
  "use strict";

  return Controller.extend("nsa.ui5appssa.controller.vista_Rep_Sanidad", {

    onInit: function () {

      this.getRouter().getRoute("vista_Rep_Sanidad").attachMatched(this._onRouteMatched, this);
      this.getView().byId("image_bg").addStyleClass("image_bg_menu");
      this.getView().byId("idTableReporte").addStyleClass("cssTableReporte");
    },

    getRouter: function () {
      return sap.ui.core.UIComponent.getRouterFor(this);
    },

    btnRegresar: function () {
      this.getRouter().navTo("menu");
    },

    _onRouteMatched: function () {

      var oView = this.getView();
      var oModel = oView.getModel("myParam");

      this.getData1();
      //this.getData2();
    },

    getData1: function () {

      var oView = this.getView();
      var oModel = oView.getModel("myParam");

      var varT_PLAGUICIDAS = oModel.getProperty("/T_SANIDAD");
      console.log(varT_PLAGUICIDAS);

      oModel.setProperty("/tblSanidad", varT_PLAGUICIDAS);
      console.log(oModel.getProperty("/tblSanidad"));

      var sorters = [];
      var sorter;

      sorter = new sap.ui.model.Sorter("SOCIEDAD", true);
      sorters.push(sorter);
      sorter = new sap.ui.model.Sorter("FUNDO", true);
      sorters.push(sorter);
      sorter = new sap.ui.model.Sorter("MODULO", true);
      sorters.push(sorter);
      sorter = new sap.ui.model.Sorter("CULTIVO", true);
      sorters.push(sorter);
      sorter = new sap.ui.model.Sorter("VARIEDAD", true);
      sorters.push(sorter);
      sorter = new sap.ui.model.Sorter("CAMPANA", true);
      sorters.push(sorter);
      sorter = new sap.ui.model.Sorter("LABOR", true);
      sorters.push(sorter);
      sorter = new sap.ui.model.Sorter("FEC_APLICACION", true);
      sorters.push(sorter);

      // Actualiza la lista
      var list = this.byId("idTableReporte");
      var binding = list.getBinding("rows");
      binding.filter([], "Application");
      binding.sort(sorters);
    },

    pressRefrescarTabla: function () {

      var oView = this.getView();
      var oModel = oView.getModel("myParam");

      var varT_PLAGUICIDAS = oModel.getProperty("/T_SANIDAD");
      console.log(varT_PLAGUICIDAS);

      oModel.setProperty("/tblSanidad", varT_PLAGUICIDAS);
      console.log(oModel.getProperty("/tblSanidad"));

      var sorters = [];
      var sorter;

      sorter = new sap.ui.model.Sorter("SOCIEDAD", true);
      sorters.push(sorter);
      sorter = new sap.ui.model.Sorter("FUNDO", true);
      sorters.push(sorter);
      sorter = new sap.ui.model.Sorter("MODULO", true);
      sorters.push(sorter);
      sorter = new sap.ui.model.Sorter("CULTIVO", true);
      sorters.push(sorter);
      sorter = new sap.ui.model.Sorter("VARIEDAD", true);
      sorters.push(sorter);
      sorter = new sap.ui.model.Sorter("CAMPANA", true);
      sorters.push(sorter);
      sorter = new sap.ui.model.Sorter("LABOR", true);
      sorters.push(sorter);
      sorter = new sap.ui.model.Sorter("FEC_APLICACION", true);
      sorters.push(sorter);

      // Actualiza la lista
      var list = this.byId("idTableReporte");
      var binding = list.getBinding("rows");
      binding.filter([], "Application");
      binding.sort(sorters);
    },

    pressDailogFiltro: function () {

      var oThis = this;
      var oModel = oThis.getView().getModel("myParam");

      var oDialog = new sap.m.Dialog("Dialog2", {
        icon: 'sap-icon://filter',
        title: "Asigne filtros",
        resizable: true,
        draggable: true,
        contentWidth: "600px",
        type: "Message",
        content: [
          new sap.m.Label({
            text: "Par�metros de Selecci�n",
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
              text: "Sociedad: ",
              width: "38%",
              textAlign: "Right",
              required: true
            }), new sap.m.Input({
              id: "idDialogSociedad",
              value: "1100",
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
              text: "Fundo: ",
              width: "38%",
              textAlign: "Right",
              required: true
            }), new sap.m.Input({
              id: "idDialogFundo",
              value: "F20",
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
              text: "M�dulo: ",
              width: "40%",
              textAlign: "Right"
            }), new sap.m.Input({
              id: "idDialogModuloI",
              value: "M01",
              editable: true,
              width: "29%"
            }), new sap.m.Label({
              text: "a",
              width: "2%",
              textAlign: "Center"
            }), new sap.m.Input({
              id: "idDialogModuloF",
              value: "M18",
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
              text: "Variedad: ",
              width: "40%",
              textAlign: "Right"
            }), new sap.m.Input({
              id: "idDialogVariedadI",
              value: "",
              editable: true,
              width: "29%"
            }), new sap.m.Label({
              text: "a",
              width: "2%",
              textAlign: "Center"
            }), new sap.m.Input({
              id: "idDialogVariedadF",
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
              text: "Campa�a: ",
              width: "40%",
              textAlign: "Right"
            }), new sap.m.Input({
              id: "idDialogCampanaI",
              value: "",
              editable: true,
              width: "29%"
            }), new sap.m.Label({
              text: "a",
              width: "2%",
              textAlign: "Center"
            }), new sap.m.Input({
              id: "idDialogCampanaF",
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
              text: "Labor: ",
              width: "40%",
              textAlign: "Right"
            }), new sap.m.Input({
              id: "idDialogLaborI",
              value: "",
              editable: true,
              width: "29%"
            }), new sap.m.Label({
              text: "a",
              width: "2%",
              textAlign: "Center"
            }), new sap.m.Input({
              id: "idDialogLaborF",
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
              text: "Fecha de Aplicaci�n: ",
              width: "40%",
              textAlign: "Right",
              required: true
            }), new sap.m.DatePicker("idDialogFechaApliI", {
              valueFormat: "dd/MM/yyyy",
              displayFormat: "dd/MM/yyyy",
              //dateValue: new Date(),
              value: "01/01/2018",
              width: "29%"
            }), new sap.m.Label({
              text: "a",
              width: "2%",
              textAlign: "Center"
            }), new sap.m.DatePicker("idDialogFechaApliF", {
              valueFormat: "dd/MM/yyyy",
              displayFormat: "dd/MM/yyyy",
              //dateValue: new Date(),
              value: "30/09/2018",
              width: "29%"
            })]
          })
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
              view.byId("idDialogSociedad"),
              view.byId("idDialogFundo"),
              view.byId("idDialogFechaApliI"),
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

              var varDialogSociedad = sap.ui.getCore().byId("idDialogSociedad").getValue();
              var varDialogFundo = sap.ui.getCore().byId("idDialogFundo").getValue();
              var varDialogModuloI = sap.ui.getCore().byId("idDialogModuloI").getValue();
              var varDialogModuloF = sap.ui.getCore().byId("idDialogModuloF").getValue();
              var varDialogCultivoI = sap.ui.getCore().byId("idDialogCultivoI").getValue();
              var varDialogCultivoF = sap.ui.getCore().byId("idDialogCultivoF").getValue();
              var varDialogVariedadI = sap.ui.getCore().byId("idDialogVariedadI").getValue();
              var varDialogVariedadF = sap.ui.getCore().byId("idDialogVariedadF").getValue();
              var varDialogCampanaI = sap.ui.getCore().byId("idDialogCampanaI").getValue();
              var varDialogCampanaF = sap.ui.getCore().byId("idDialogCampanaF").getValue();
              var varDialogLaborI = sap.ui.getCore().byId("idDialogLaborI").getValue();
              var varDialogLaborF = sap.ui.getCore().byId("idDialogLaborF").getValue();
              var varDialogFechaApliI = sap.ui.getCore().byId("idDialogFechaApliI").getValue();
              var varDialogFechaApliF = sap.ui.getCore().byId("idDialogFechaApliF").getValue();

              var aFilters = [];
              if (varDialogSociedad !== "") {
                var filter = new sap.ui.model.Filter("SOCIEDAD", sap.ui.model.FilterOperator.Contains, varDialogSociedad);
                aFilters.push(filter);
              }

              if (varDialogFundo !== "") {
                filter = new sap.ui.model.Filter("FUNDO", sap.ui.model.FilterOperator.Contains, varDialogFundo);
                aFilters.push(filter);
              }

              if (varDialogModuloI !== "") {
                if (varDialogModuloF !== "") {
                  filter = new sap.ui.model.Filter("MODULO", sap.ui.model.FilterOperator.BT, varDialogModuloI, varDialogModuloF);
                  aFilters.push(filter);
                } else {
                  filter = new sap.ui.model.Filter("MODULO", sap.ui.model.FilterOperator.Contains, varDialogModuloI);
                  aFilters.push(filter);
                }
              }

              if (varDialogCultivoI !== "") {
                if (varDialogCultivoF !== "") {
                  filter = new sap.ui.model.Filter("CULTIVO", sap.ui.model.FilterOperator.BT, varDialogCultivoI, varDialogCultivoF);
                  aFilters.push(filter);
                } else {
                  filter = new sap.ui.model.Filter("CULTIVO", sap.ui.model.FilterOperator.Contains, varDialogCultivoI);
                  aFilters.push(filter);
                }
              }

              if (varDialogVariedadI !== "") {
                if (varDialogVariedadF !== "") {
                  filter = new sap.ui.model.Filter("VARIEDAD", sap.ui.model.FilterOperator.BT, varDialogVariedadI, varDialogVariedadF);
                  aFilters.push(filter);
                } else {
                  filter = new sap.ui.model.Filter("VARIEDAD", sap.ui.model.FilterOperator.Contains, varDialogVariedadI);
                  aFilters.push(filter);
                }
              }

              if (varDialogCampanaI !== "") {
                if (varDialogCampanaF !== "") {
                  filter = new sap.ui.model.Filter("CAMPANA", sap.ui.model.FilterOperator.BT, varDialogCampanaI, varDialogCampanaF);
                  aFilters.push(filter);
                } else {
                  filter = new sap.ui.model.Filter("CAMPANA", sap.ui.model.FilterOperator.Contains, varDialogCampanaI);
                  aFilters.push(filter);
                }
              }

              if (varDialogLaborI !== "") {
                if (varDialogLaborF !== "") {
                  filter = new sap.ui.model.Filter("LABOR", sap.ui.model.FilterOperator.BT, varDialogLaborI, varDialogLaborF);
                  aFilters.push(filter);
                } else {
                  filter = new sap.ui.model.Filter("LABOR", sap.ui.model.FilterOperator.Contains, varDialogLaborI);
                  aFilters.push(filter);
                }
              }

              if (varDialogFechaApliI !== "") {
                if (varDialogFechaApliF !== "") {
                  filter = new sap.ui.model.Filter("FEC_APLICACION", sap.ui.model.FilterOperator.BT, varDialogFechaApliI,
                    varDialogFechaApliF);
                  aFilters.push(filter);
                } else {
                  filter = new sap.ui.model.Filter("FEC_APLICACION", sap.ui.model.FilterOperator.Contains, varDialogFechaApliI);
                  aFilters.push(filter);
                }
              }

              var sorters = [];
              var sorter;

              sorter = new sap.ui.model.Sorter("SOCIEDAD", true);
              sorters.push(sorter);
              sorter = new sap.ui.model.Sorter("FUNDO", true);
              sorters.push(sorter);
              sorter = new sap.ui.model.Sorter("MODULO", true);
              sorters.push(sorter);
              sorter = new sap.ui.model.Sorter("CULTIVO", true);
              sorters.push(sorter);
              sorter = new sap.ui.model.Sorter("VARIEDAD", true);
              sorters.push(sorter);
              sorter = new sap.ui.model.Sorter("CAMPANA", true);
              sorters.push(sorter);
              sorter = new sap.ui.model.Sorter("LABOR", true);
              sorters.push(sorter);
              sorter = new sap.ui.model.Sorter("FEC_APLICACION", true);
              sorters.push(sorter);

              // Actualiza la lista
              var list = this.byId("idTableReporte");
              var binding = list.getBinding("rows");
              binding.filter(aFilters, "Application");
              binding.sort(sorters);

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

      var varT_PLAGUICIDAS = oModel.getProperty("/T_SANIDAD");
      console.log(varT_PLAGUICIDAS);

      oModel.setProperty("/tblSanidadExcel", varT_PLAGUICIDAS);
      console.log(oModel.getProperty("/tblSanidadExcel"));

      this.onExport();
    },

    onExport: function () {
      var aCols, aProducts, oSettings, oSheet;

      aCols = this.createColumnConfig();
      aProducts = this.getView().getModel("myParam").getProperty('/tblSanidadExcel');

      oSettings = {
        workbook: {
          columns: aCols
        },
        dataSource: aProducts,
        fileName: "RepSanidad.xlsx"
      };

      oSheet = new Spreadsheet(oSettings);
      oSheet.build()
        .then(function () {
          this.getView().setBusy(false);
          sap.m.MessageToast.show("Se realiz� la exportaci�n del reporte con �xito.");
        }.bind(this))
        .finally(function () {
          this.getView().setBusy(false);
          oSheet.destroy();
        }.bind(this));
    },

    createColumnConfig: function () {

      var aCols = [];

      aCols.push({
        label: 'Sociedad',
        property: 'SOCIEDAD',
        type: 'string'
      });
      aCols.push({
        label: 'Desc. Sociedad',
        property: 'DES_SOCIEDAD',
        type: 'string'
      });
      aCols.push({
        label: 'Fundo',
        property: 'FUNDO',
        type: 'string'
      });
      aCols.push({
        label: 'Descripci�n',
        property: 'DESCRIPCION',
        type: 'string'
      });
      aCols.push({
        label: 'Labor',
        property: 'LABOR',
        type: 'string'
      });
      aCols.push({
        label: 'M�dulo',
        property: 'MODULO',
        type: 'string'
      });
      aCols.push({
        label: '�rea(ha)/M�dulo',
        property: 'AREA_MODULO',
        type: 'string'
      });
      aCols.push({
        label: 'LP',
        property: 'LP',
        type: 'string'
      });
      aCols.push({
        label: 'Campa�a',
        property: 'CAMPANA',
        type: 'string'
      });
      aCols.push({
        label: 'Fe. Ini. Campa�a',
        property: 'FEC_INI_CAMP',
        type: 'string'
      });
      aCols.push({
        label: 'Fe. Fin Campa�a',
        property: 'FEC_FIN_CAMP',
        type: 'string'
      });
      aCols.push({
        label: 'Cultivo',
        property: 'CULTIVO',
        type: 'string'
      });
      aCols.push({
        label: 'Variedad',
        property: 'VARIEDAD',
        type: 'string'
      });
      aCols.push({
        label: 'Nro Reserva',
        property: 'NUM_RESERVA',
        type: 'string'
      });
      aCols.push({
        label: 'Doc. Material',
        property: 'DOC_MATERIAL',
        type: 'string'
      });
      aCols.push({
        label: 'Lote Ejecutado',
        property: 'LOTE_EJECUTADO',
        type: 'string'
      });
      aCols.push({
        label: '�rea(ha) lote ejec.',
        property: 'AREA_LOTE_EJEC',
        type: 'string'
      });
      aCols.push({
        label: '�rea (ha)Total ejec/m�d',
        property: 'AREA_TOTAL_EJEC_MOD',
        type: 'string'
      });
      aCols.push({
        label: 'Fecha de Aplicaci�n',
        property: 'FEC_APLICACION',
        type: 'string'
      });
      aCols.push({
        label: 'Fecha Aceptable de Cosecha',
        property: 'FEC_ACEP_COSECHA',
        type: 'string'
      });
      aCols.push({
        label: 'Material',
        property: 'MATERIAL',
        type: 'string'
      });
      aCols.push({
        label: 'Texto breve de Material',
        property: 'TEXT_BREVE_MATERIAL',
        type: 'string'
      });
      aCols.push({
        label: 'UM',
        property: 'UM',
        type: 'string'
      });
      aCols.push({
        label: 'Cant. Total',
        property: 'CANT_TOTAL',
        type: 'string'
      });
      aCols.push({
        label: 'Cant. Lote',
        property: 'CATN_LOTE',
        type: 'string'
      });
      aCols.push({
        label: 'U.A.C (d�as)',
        property: 'UAC_DIAS',
        type: 'string'
      });
      aCols.push({
        label: 'C�d. Plaga',
        property: 'COD_PLAGA',
        type: 'string'
      });
      aCols.push({
        label: 'Desc. Plaga',
        property: 'DESC_PLAGA',
        type: 'string'
      });
      aCols.push({
        label: 'I.A./Agente Biol�gico',
        property: 'IA_AGENTE_BIOLO',
        type: 'string'
      });
      aCols.push({
        label: 'Nro. Aplicaci�n',
        property: 'NUM_APLICACION',
        type: 'string'
      });
      aCols.push({
        label: 'Tipo C�lculo',
        property: 'TIPO_CALCULO',
        type: 'string'
      });
      aCols.push({
        label: 'Dosis',
        property: 'DOSIS',
        type: 'string'
      });

      return aCols;
    }
  });
});