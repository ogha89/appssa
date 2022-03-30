sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	'./funciones'
], function (Controller, MessageToast,funciones) {
	"use strict";

	return Controller.extend("nsa.ui5appssa.controller.vista_nueva_labor", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf smartagri.Proyecto_SmartAgri.view.vista_nueva_labor
		 */
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("vista_nueva_labor").attachMatched(this._onRouteMatched, this);
		},
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		_onRouteMatched: function (oEvent) {
				var vthis = this;
				var oModel = this.getView().getModel();
				oModel = this.getOwnerComponent().getModel();
				oModel.read("/modulo", {
					success: function (Odata, response) {
						console.log(response.data.results);
						var oModelJSON = new sap.ui.model.json.JSONModel(response.data.results);
						oModelJSON.getProperty("/");
						// console.log(oModelJSON.getProperty("/"));
						vthis.byId("id_modulo").setModel(oModelJSON);
						vthis.byId("id_modulo").bindItems("/", vthis.byId("itemModulo"));
					},
					error: function (oError) {}
				});
				
				
				oModel.read("/cultivo", {
					success: function (Odata, response) {
						console.log(response.data.results);
						var oModelJSON = new sap.ui.model.json.JSONModel(response.data.results);
						oModelJSON.getProperty("/");
						// console.log(oModelJSON.getProperty("/"));
						vthis.byId("id_cultivo").setModel(oModelJSON);
						vthis.byId("id_cultivo").bindItems("/", vthis.byId("itemCultivo"));
					},
					error: function (oError) {}
				});
				oModel.read("/etapa", {
					success: function (Odata, response) {
						console.log(response.data.results);
						var oModelJSON = new sap.ui.model.json.JSONModel(response.data.results);
						oModelJSON.getProperty("/");
						// console.log(oModelJSON.getProperty("/"));
						vthis.byId("id_etapa").setModel(oModelJSON);
						vthis.byId("id_etapa").bindItems("/", vthis.byId("itemEtapa"));
					},
					error: function (oError) {}
				});
				oModel.read("/turno", {
					success: function (Odata, response) {
						console.log(response.data.results);
						var oModelJSON = new sap.ui.model.json.JSONModel(response.data.results);
						oModelJSON.getProperty("/");
						// console.log(oModelJSON.getProperty("/"));
						vthis.byId("id_turno").setModel(oModelJSON);
						vthis.byId("id_turno").bindItems("/", vthis.byId("itemTurno"));
					},
					error: function (oError) {}
				});
				oModel.read("/labor", {
					success: function (Odata, response) {
						console.log(response.data.results);
						var oModelJSON = new sap.ui.model.json.JSONModel(response.data.results);
						oModelJSON.getProperty("/");
						// console.log(oModelJSON.getProperty("/"));
						vthis.byId("id_labor").setModel(oModelJSON);
						vthis.byId("id_labor").bindItems("/", vthis.byId("itemLabor"));
					},
					error: function (oError) {}
				});


			},
			btnvistamenu: function(){
				this.getRouter().navTo("menu");
			},
			fnvariedad: function (oEvent) {
				var vthis=this;
				var key = oEvent.getSource().getSelectedItem().getKey();
				console.log(key);
				var oModel1 = this.getView().getModel();
			oModel1 = this.getOwnerComponent().getModel();
				oModel1.read("/variedad", {
								success: function (Odata1, response1) {
									console.log(response1);
									var oModelJSON = new sap.ui.model.json.JSONModel(response1.data.results);
									oModelJSON.getProperty("/");
									// var oModelGlobalData = vthis.getView().getModel("oModel");
									// oModelGlobalData.setProperty("/oVariedad",oModelJSON.getProperty("/"));
									vthis.byId("id_variedad").setModel(oModelJSON);
									vthis.byId("id_variedad").bindItems("/", vthis.byId("itemVariedad"));
									var oFilter = new sap.ui.model.Filter("CULTIVO_FK", sap.ui.model.FilterOperator.EQ, key);
									var cbxmodulo = vthis.getView().byId("id_variedad");
									var oBinding = cbxmodulo.getBinding("items");
									oBinding.filter(oFilter);
								},
								error: function (oError) {}
							});
			},
			
			fnCalcularFechaActual: function () {
				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth() + 1;
				var yyyy = today.getFullYear();
				dd = (dd < 10 ? '0' : '') + dd;
				mm = (mm < 10 ? '0' : '') + mm;
				var FECHA = dd + "/" + mm + "/" + yyyy;
				return FECHA;
			},
			
			fnAgregarNuevaLabor:function(){
				var vthis=this;
				var oModelGlobalData = this.getView().getModel("oModel");
			var oModelmax = this.getOwnerComponent().getModel();
				oModelmax.read("/maxprogParam(ID_PROG=1)/Results?$format=json", {
				success: function (Odata, response) {
					console.log(response.data.results);
					var MAXIMO = response.data.results[0].ID_PROG;
					console.log(MAXIMO);
					var IdProg = MAXIMO + 1;
					console.log(IdProg);
					
					var nroprog = vthis.getView().byId("li_prog").getValue();
					console.log(nroprog);
					var modulo = vthis.getView().byId("id_modulo").getSelectedKey();
					var cultivo = vthis.getView().byId("id_cultivo").getSelectedKey();
					var variedad = vthis.getView().byId("id_variedad").getSelectedKey();
					var etapa = vthis.getView().byId("id_etapa").getSelectedKey();
					var labor = vthis.getView().byId("id_labor").getSelectedKey();
					var turno = vthis.getView().byId("id_turno").getSelectedKey();
					console.log(modulo);
					var fechaini = vthis.getView().byId("id_fechaini").getValue();
					var fecI = new Date(fechaini.substring(6, 10), fechaini.substring(3, 5), fechaini.substring(0, 2));
					var fechafin = vthis.getView().byId("id_fechafin").getValue();
					var fecF = new Date(fechafin.substring(6, 10), fechafin.substring(3, 5), fechafin.substring(0, 2));
					
					var Fecha = vthis.fnCalcularFechaActual();
					var fechaAus = new Date(Fecha.substring(6, 10), Fecha.substring(3, 5), Fecha.substring(0, 2));
					// var fecF = new Date(fechafin.substring(6, 10), fechafin.substring(3, 5), fechafin.substring(0, 2));
					// console.log(fecF);
					var centro = vthis.getView().byId("li_centro").getValue();
					var oObject = {
						"ID_PROG": IdProg,
						"NRO_PROG": nroprog,
						"FECHA_INICIO": fecI,
						"FECHA_FIN": fecI,
						"CULTIVO_FK": cultivo,
						"MODULO_FK": modulo,
						"ETAPA_FK": etapa,
						"VARIEDAD_FK": variedad,
						"LABOR_FK": labor,
						"CENTRO": centro,
						"TURNO_FK": turno
					};
				
					console.log(oObject);
					oModelmax.create("/prog_labor", oObject, {
						success: function (oCreatedEntry) {
							// MessageToast.show("ENTRADA INGRESADA");
							funciones.fnMessageBoxSuccess(vthis, "Se agreg� correctamente.", "Registro de Labor");
						},
						error: function (oError) {}
					});
				},
				error: function (oError) {}
				});
			},
			btncancelar: function(){
				this.getRouter().navTo("menu");
			}
			
			
			
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf smartagri.Proyecto_SmartAgri.view.vista_nueva_labor
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf smartagri.Proyecto_SmartAgri.view.vista_nueva_labor
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf smartagri.Proyecto_SmartAgri.view.vista_nueva_labor
		 */
		//	onExit: function() {
		//
		//	}

	});

});