sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV",
	'sap/ui/export/Spreadsheet'
], function (Controller, Export, ExportTypeCSV, Spreadsheet) {
	"use strict";

	return Controller.extend("nsa.ui5appssa.controller.vista_Rep_Riego_Fertirriego", {

		onInit: function () {

			this.getRouter().getRoute("vista_Rep_Riego_Fertirriego").attachMatched(this._onRouteMatched, this);
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

			var varT_PLAGUICIDAS = oModel.getProperty("/T_REP_RIEGO_FERTIRRIEGO");
			console.log(varT_PLAGUICIDAS);

			oModel.setProperty("/tblRiegoFertirriego", varT_PLAGUICIDAS);
			console.log(oModel.getProperty("/tblRiegoFertirriego"));

			var sorters = [];
			var sorter;

			sorter = new sap.ui.model.Sorter("SOCIEDAD", true);
			sorters.push(sorter);
			sorter = new sap.ui.model.Sorter("FUNDO", true);
			sorters.push(sorter);
			sorter = new sap.ui.model.Sorter("MODULO", true);
			sorters.push(sorter);
			sorter = new sap.ui.model.Sorter("FEC_CONTABILIZACION", true);
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

			var varT_PLAGUICIDAS = oModel.getProperty("/T_REP_RIEGO_FERTIRRIEGO");
			console.log(varT_PLAGUICIDAS);

			oModel.setProperty("/tblRiegoFertirriego", varT_PLAGUICIDAS);
			console.log(oModel.getProperty("/tblRiegoFertirriego"));

			var sorters = [];
			var sorter;

			sorter = new sap.ui.model.Sorter("SOCIEDAD", true);
			sorters.push(sorter);
			sorter = new sap.ui.model.Sorter("FUNDO", true);
			sorters.push(sorter);
			sorter = new sap.ui.model.Sorter("MODULO", true);
			sorters.push(sorter);
			sorter = new sap.ui.model.Sorter("FEC_CONTABILIZACION", true);
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
							value: "2100",
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
							value: "F21",
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
							value: "",
							editable: true,
							width: "29%"
						}), new sap.m.Label({
							text: "a",
							width: "2%",
							textAlign: "Center"
						}), new sap.m.Input({
							id: "idDialogModuloF",
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
							text: "Fecha de Contabilizaci�n: ",
							width: "40%",
							textAlign: "Right"
						}), new sap.m.DatePicker("idDialogFechaContaI", {
							valueFormat: "dd/MM/yyyy",
							displayFormat: "dd/MM/yyyy",
							//dateValue: new Date(),
							value: "01/01/2019",
							width: "29%"
						}), new sap.m.Label({
							text: "a",
							width: "2%",
							textAlign: "Center"
						}), new sap.m.DatePicker("idDialogFechaContaF", {
							valueFormat: "dd/MM/yyyy",
							displayFormat: "dd/MM/yyyy",
							//dateValue: new Date(),
							value: "21/09/2020",
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
							view.byId("idDialogFundo")
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
							var varDialogFechaContaI = sap.ui.getCore().byId("idDialogFechaContaI").getValue();
							var varDialogFechaContaF = sap.ui.getCore().byId("idDialogFechaContaF").getValue();

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

							if (varDialogFechaContaI !== "") {
								if (varDialogFechaContaF !== "") {
									filter = new sap.ui.model.Filter("FEC_CONTABILIZACION", sap.ui.model.FilterOperator.BT, varDialogFechaContaI,
										varDialogFechaContaF);
									aFilters.push(filter);
								} else {
									filter = new sap.ui.model.Filter("FEC_CONTABILIZACION", sap.ui.model.FilterOperator.Contains, varDialogFechaContaI);
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
							sorter = new sap.ui.model.Sorter("FEC_CONTABILIZACION", true);
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

			var varT_PLAGUICIDAS = oModel.getProperty("/T_REP_RIEGO_FERTIRRIEGO");
			console.log(varT_PLAGUICIDAS);

			oModel.setProperty("/tblRiegoFertirriegoExcel", varT_PLAGUICIDAS);
			console.log(oModel.getProperty("/tblRiegoFertirriegoExcel"));

			this.onExport();
		},

		onExport: function () {
			var aCols, aProducts, oSettings, oSheet;

			aCols = this.createColumnConfig();
			aProducts = this.getView().getModel("myParam").getProperty('/tblRiegoFertirriegoExcel');

			oSettings = {
				workbook: {
					columns: aCols
				},
				dataSource: aProducts,
				fileName: "RepRiegoFertirriego.xlsx"
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
				label: 'Ejercicio',
				property: 'EJERCICIO',
				type: 'string'
			});
			aCols.push({
				label: 'Per�odo',
				property: 'PERIODO',
				type: 'string'
			});
			aCols.push({
				label: 'Semana',
				property: 'SEMANA',
				type: 'string'
			});
			aCols.push({
				label: 'Fe.contabilizaci�n',
				property: 'FEC_CONTABILIZACION',
				type: 'string'
			});
			aCols.push({
				label: 'Elemento PEP',
				property: 'ELEMENTO_PEP',
				type: 'string'
			});
			aCols.push({
				label: 'Fundo',
				property: 'FUNDO',
				type: 'string'
			});
			aCols.push({
				label: 'M�dulo',
				property: 'MODULO',
				type: 'string'
			});
			aCols.push({
				label: 'HA.Mod',
				property: 'HA_MOD',
				type: 'string'
			});
			aCols.push({
				label: 'Turno',
				property: 'TURNO',
				type: 'string'
			});
			aCols.push({
				label: 'HA.Turno',
				property: 'HA_TURNO',
				type: 'string'
			});
			aCols.push({
				label: 'Variedad de cultivo',
				property: 'VARIEDAD_CULTIVO',
				type: 'string'
			});
			aCols.push({
				label: 'Clase de coste',
				property: 'CLASE_COSTE',
				type: 'string'
			});
			aCols.push({
				label: 'Denominaci�n',
				property: 'DENOMINACION',
				type: 'string'
			});
			aCols.push({
				label: 'Material',
				property: 'MATERIAL',
				type: 'string'
			});
			aCols.push({
				label: 'Texto breve material',
				property: 'TEXT_BREVE_MATERIAL',
				type: 'string'
			});
			aCols.push({
				label: 'Ud. cantidad contab.',
				property: 'UND_CANT_CONTAB',
				type: 'string'
			});
			aCols.push({
				label: 'Cantidad total reg.',
				property: 'CANT_TOTAL_REG',
				type: 'string'
			});
			aCols.push({
				label: 'Val/Mon.so.CO',
				property: 'VAL_MON_CO',
				type: 'string'
			});
			aCols.push({
				label: 'Valor/Moneda objeto',
				property: 'VALOR_MONEDA',
				type: 'string'
			});
			aCols.push({
				label: 'Texto cab.documento',
				property: 'TEXT_CAB_DOCUMENTO',
				type: 'string'
			});
			aCols.push({
				label: 'Usuario',
				property: 'USUARIO',
				type: 'string'
			});
			aCols.push({
				label: 'Imputaci�n aux._1',
				property: 'IMPUTACION_AUX',
				type: 'string'
			});
			aCols.push({
				label: 'N� docum.refer.',
				property: 'NUM_DOCUMENTO_REFER',
				type: 'string'
			});
			aCols.push({
				label: 'Orden',
				property: 'ORDEN',
				type: 'string'
			});
			aCols.push({
				label: 'C�digo de labor',
				property: 'COD_LABOR',
				type: 'string'
			});
			aCols.push({
				label: 'Descripci�n',
				property: 'DESCRIPCION',
				type: 'string'
			});
			aCols.push({
				label: 'N�mero de documento',
				property: 'NUM_DOCUMENTO',
				type: 'string'
			});
			aCols.push({
				label: 'M3/Ha-Tur',
				property: 'M3_HA_TUR',
				type: 'string'
			});
			aCols.push({
				label: 'M3/Ha-Mod',
				property: 'M3_HA_MOD',
				type: 'string'
			});
			aCols.push({
				label: 'N-Tur',
				property: 'N_TUR',
				type: 'string'
			});
			aCols.push({
				label: 'N-Mod',
				property: 'N_MOD',
				type: 'string'
			});
			aCols.push({
				label: 'P2O5-Tur',
				property: 'P205_TUR',
				type: 'string'
			});
			aCols.push({
				label: 'P2O5-Mod',
				property: 'P205_MOD',
				type: 'string'
			});
			aCols.push({
				label: 'K2O-Tur',
				property: 'K2O_TUR',
				type: 'string'
			});
			aCols.push({
				label: 'K2O-Mod',
				property: 'K2O_MOD',
				type: 'string'
			});
			aCols.push({
				label: 'B-Tur',
				property: 'B_TUR',
				type: 'string'
			});
			aCols.push({
				label: 'B-Mod',
				property: 'B_MOD',
				type: 'string'
			});
			aCols.push({
				label: 'ZN-Tur',
				property: 'ZN_TUR',
				type: 'string'
			});
			aCols.push({
				label: 'ZN-Mod',
				property: 'ZN_MOD',
				type: 'string'
			});
			aCols.push({
				label: 'CAO-Tur',
				property: 'CAO_TUR',
				type: 'string'
			});
			aCols.push({
				label: 'CAO-Mod',
				property: 'CAO_MOD',
				type: 'string'
			});
			aCols.push({
				label: 'MN-Tur',
				property: 'MN_TUR',
				type: 'string'
			});
			aCols.push({
				label: 'MN-Mod',
				property: 'MN_MOD',
				type: 'string'
			});
			aCols.push({
				label: 'FE-Tur',
				property: 'FE_TUR',
				type: 'string'
			});
			aCols.push({
				label: 'FE-Mod',
				property: 'FE_MOD',
				type: 'string'
			});
			aCols.push({
				label: 'MGO-Tur',
				property: 'MGO_TUR',
				type: 'string'
			});
			aCols.push({
				label: 'MGO-Mod',
				property: 'MGO_MOD',
				type: 'string'
			});
			aCols.push({
				label: 'S-Tur',
				property: 'S_TUR',
				type: 'string'
			});
			aCols.push({
				label: 'S-Mod',
				property: 'S_MOD',
				type: 'string'
			});
			aCols.push({
				label: 'MO-Tur',
				property: 'MO_TUR',
				type: 'string'
			});
			aCols.push({
				label: 'MO-Mod',
				property: 'MO_MOD',
				type: 'string'
			});
			aCols.push({
				label: 'CU-Tur',
				property: 'CU_TUR',
				type: 'string'
			});
			aCols.push({
				label: 'CU-Mod',
				property: 'CU_MOD',
				type: 'string'
			});

			return aCols;
		}
	});
});