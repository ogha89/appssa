sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"./funciones"
], function (Controller, funciones) {
	"use strict";

	return Controller.extend("nsa.ui5appssa.controller.menu", {
		onInit: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("menu").attachMatched(this._onRouteMatched, this);

			this.getRouter().getRoute("menu").attachMatched(this._onRouteMatched, this);
			// this.getRouter().getRoute("menu").attachMatched(this._onRouteMatched, this);
			// this.getView().byId("ObjectPageLayout").addStyleClass("miVistaMenuFondo");
			// this.getView().byId("ObjectPageLayout").addStyleClass("miVistaMenuCabecera");
			// this.getView().byId("ObjectPageLayout").addStyleClass("miPagina");
			// this.getView().byId("ObjectPageLayout").addStyleClass("miSubTitulo");
			this.getView().byId("image_bg").addStyleClass("image_bg_menu");
			funciones.fnCarga(this);
		},

		onAfterRendering: function () {

		},

		_onRouteMatched: function () {
			//funciones.fnCarga(this);
			var oModel = this.getView().getModel("myParam");
			console.log(oModel.getProperty("/check"));
			if (oModel.getProperty("/check") == 1) {
				console.log("Section2");
				this.getView().byId("ObjectPageLayout").setSelectedSection(this.getView().byId("idpartediario").getId());
			}
			if (oModel.getProperty("/check") == 2) {
				console.log("Section2");
				this.getView().byId("ObjectPageLayout").setSelectedSection(this.getView().byId("idprogramacion").getId());
			}
			if (oModel.getProperty("/check") == 3) {
				console.log("Section2");
				this.getView().byId("ObjectPageLayout").setSelectedSection(this.getView().byId("idmaquinaria").getId());
			}
			if (oModel.getProperty("/check") == 4) {
				console.log("Section2");
				this.getView().byId("ObjectPageLayout").setSelectedSection(this.getView().byId("idreporte").getId());
			}
			if (oModel.getProperty("/check") == 5) {
				console.log("Section2");
				this.getView().byId("ObjectPageLayout").setSelectedSection(this.getView().byId("idgeneracion").getId());
			}
			var arProgLabor = oModel.getProperty("/DM_PROG_LABOR");
			var fechaactual = new Date();
			var resultado = arProgLabor.filter(array => funciones.fnConvertirFechaSubToOb(array.FECHA_INICIO).getTime() <= fechaactual.getTime() &&
				funciones.fnConvertirFechaSubToOb(array.FECHA_FIN).getTime() >= fechaactual.getTime());
			var oObject = {};
			var aObject = [];
			oObject.value = resultado.length;
			oObject.color = "Good";
			aObject.push(oObject);
			oModel.setProperty("/Tiles", aObject);

			var fecha = funciones.fnCalcularFechaActual();
			var date = new Date();
			const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
				"Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
			];
			var Anio = date.getFullYear();
			var Mes = date.getMonth();
			const options = {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			};
			var fecha = date.toLocaleDateString('es-ES', options);
			fecha = fecha.substring(0, 1).toUpperCase() + fecha.substring(1, fecha.length);
			oModel.setProperty("/FechaActualES", fecha);
		},

		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		// btnRegistroLabor: function () {
		// 	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		// 	oRouter.navTo("vista_nueva_labor");
		// },
		pressProgMaquinaria: function () {
			window.open("https://proyectosmartagri-p2001103231trial.dispatcher.hanatrial.ondemand.com/index.html?hc_reset#/vista_prog_riego",
				"_self");

		},
		pressControlMaquinaria: function () {
			this.getRouter().navTo("vista_control_maq");
		},
		btnRegistrarProgramacion2: function () {
			window.open("https://proyectosmartagri-p2001103231trial.dispatcher.hanatrial.ondemand.com/index.html?hc_reset#/vista_programacion",
				"_self");
		},
		btnRegistrarProgramacion3: function () {
			window.open("https://proyectosmartagri-p2001103231trial.dispatcher.hanatrial.ondemand.com/index.html?hc_reset#/vista_control",
				"_self");
		},

		btnRegistrarProgramacion: function () {
			this.getRouter().navTo("vista_programacion");
		},
		btnControlporgramacion: function () {
			this.getRouter().navTo("vista_plaguicidas");
		},
		pressRiego: function () {
			this.getRouter().navTo("vista_prog_riego");
		},
		pressSanidad: function () {
			window.open("https://proyectosmartagri-p2001103231trial.dispatcher.hanatrial.ondemand.com/index.html?hc_reset#/vista_sanidad",
				"_self");

		},
		pressReporteplaguicidas: function () {
			this.getRouter().navTo("vista_plaguicidas");
		},
		pressRiegoFertirriego: function () {
			this.getRouter().navTo("vista_Rep_Riego_Fertirriego");
		},
		pressSanidad3: function () {
			this.getRouter().navTo("vista_sanidad");
		},
		LaborPress: function () {
			this.getRouter().navTo("v_adm_labo");
			console.log("hola");
		},
		pressSanidad2: function () {
			this.getRouter().navTo("vista_Rep_Sanidad");
		},
		logUserOut: function () {
				sap.m.URLHelper.redirect("logout.html", false);
			}
			// btnRegistrarProgramacion: function () {
			// 	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// 	oRouter.navTo("vista_programacion");
			// }

	});
});