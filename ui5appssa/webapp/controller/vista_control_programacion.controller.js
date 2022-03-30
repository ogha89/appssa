sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/m/Button'
			
], function (Controller, Button) {
	"use strict";

	return Controller.extend("nsa.ui5appssa.controller.vista_control_programacion", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf smartagri.Proyecto_SmartAgri.view.vista_control_programacion
		 */
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.getRoute("vista_control_programacion").attachMatched(this._onRouteMatched, this);
		},
		getRouter: function () {
					return sap.ui.core.UIComponent.getRouterFor(this);
				},
	btnBackMenu: function () {
					this.getRouter().navTo("menu");
				},
				btnfiltro: function () {
					var oDialog1 = new sap.m.Dialog({
						title: "Buscar",
						icon: "sap-icon://detail-view",
						type: "Message",
						state: "Success",
						draggable: true,
						resizable: true,
						horizontalScrolling: true,
						contentWidth: "500px",
						content: [
							new sap.ui.layout.VerticalLayout({
								width: "100%",
								content: [
									

									new sap.m.Toolbar({
										// height: "auto",
										content: [
											new sap.m.Label({
												width: "31%",
												textAlign: "Left",
												text: "Zona : "
											}),
											new sap.m.Input({
												textAlign: "Left",
												id: "BZona",
												fieldWidth: "auto"
											})
										]
									}),
									new sap.m.Toolbar({
										// height: "auto",
										content: [
											new sap.m.Label({
												width: "31%",
												textAlign: "Left",
												text: "Fundo : "
											}),
											new sap.m.Input({
												textAlign: "Left",
												id: "BFundo",
												fieldWidth: "auto"
											})
										]
									}),
									new sap.m.Toolbar({
										// height: "auto",
										content: [
											new sap.m.Label({
												width: "31%",
												textAlign: "Left",
												text: "M�dulo : "
											}),
											new sap.m.Input({
												textAlign: "Left",
												id: "BModulo",
												fieldWidth: "auto"
											})
										]
									}),
									new sap.m.Toolbar({
										// height: "auto",
										content: [
											new sap.m.Label({
												width: "31%",
												textAlign: "Left",
												text: "C�digo labor : "
											}),
											new sap.m.Input({
												textAlign: "Left",
												id: "IdLabor",
												fieldWidth: "auto"
											})
										]
									}),
									new sap.m.Toolbar({
										// height: "auto",
										content: [
											new sap.m.Label({
												width: "31%",
												textAlign: "Left",
												text: "Fecha : "
											}),
											new sap.m.DatePicker({
												textAlign: "Left",
												id: "Idfecha",
												fieldWidth: "auto"
											})
										]
									})

								]
							})
						],
						beginButton: new Button({
							text: 'Ejecutar',
							icon: "sap-icon://complete",
							type: "Emphasized",
							press: function () {
								oDialog1.close();
								oDialog1.destroy();
							}.bind(this)
						}),
						endButton: new Button({
							text: "Cancelar",
							icon: "sap-icon://decline",
							type: "Emphasized",
							press: function () {
								oDialog1.close();
								oDialog1.destroy();

							}
						})
					});

					oDialog1.open();
				},
				btnañadircontrol: function(){
					var oDialog2 = new sap.m.Dialog({
						title: "Control programaci�n",
						icon: "sap-icon://detail-view",
						type: "Message",
						state: "Success",
						draggable: true,
						resizable: true,
						horizontalScrolling: true,
						contentWidth: "500px",
						content: [
							new sap.ui.layout.VerticalLayout({
								width: "100%",
								content: [
									

									new sap.m.Toolbar({
										// height: "auto",
										content: [
											new sap.m.Label({
												width: "31%",
												textAlign: "Left",
												text: "Campa�a : "
											}),
											new sap.m.Input({
												textAlign: "Left",
												id: "Ccamp",
												fieldWidth: "auto"
											})
										]
									}),
									new sap.m.Toolbar({
										// height: "auto",
										content: [
											new sap.m.Label({
												width: "31%",
												textAlign: "Left",
												text: "Programaci�n : "
											}),
											new sap.m.Input({
												textAlign: "Left",
												id: "Cprog",
												fieldWidth: "auto"
											})
										]
									}),
									new sap.m.Toolbar({
										// height: "auto",
										content: [
											new sap.m.Label({
												width: "31%",
												textAlign: "Left",
												text: "Prog. Pst. Trabajo : "
											}),
											new sap.m.Input({
												textAlign: "Left",
												id: "Cprogpt",
												fieldWidth: "auto"
											})
										]
									}),
									new sap.m.Toolbar({
										// height: "auto",
										content: [
											new sap.m.Label({
												width: "31%",
												textAlign: "Left",
												text: "Hora inicio : "
											}),
											new sap.m.Input({
												textAlign: "Left",
												id: "Chorai",
												fieldWidth: "auto"
											})
										]
									}),
									new sap.m.Toolbar({
										// height: "auto",
										content: [
											new sap.m.Label({
												width: "31%",
												textAlign: "Left",
												text: "Hora fin : "
											}),
											new sap.m.Input({
												textAlign: "Left",
												id: "Chorafin",
												fieldWidth: "auto"
											})
										]
									})

								]
							})
						],
						beginButton: new Button({
							text: 'Guardar',
							icon: "sap-icon://complete",
							type: "Emphasized",
							press: function () {
								oDialog2.close();
								oDialog2.destroy();
							}.bind(this)
						}),
						endButton: new Button({
							text: "Cancelar",
							icon: "sap-icon://decline",
							type: "Emphasized",
							press: function () {
								oDialog2.close();
								oDialog2.destroy();

							}
						})
					});

					oDialog2.open();
				}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf smartagri.Proyecto_SmartAgri.view.vista_control_programacion
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf smartagri.Proyecto_SmartAgri.view.vista_control_programacion
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf smartagri.Proyecto_SmartAgri.view.vista_control_programacion
		 */
		//	onExit: function() {
		//
		//	}

	});

});