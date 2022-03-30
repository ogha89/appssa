sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"./funciones"
], function (Controller, funciones) {
	"use strict";
	return Controller.extend("nsa.ui5appssa.controller.vista_control_maq", {
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("vista_control_maq").attachMatched(this._onRouteMatched, this);
			this.getView().byId("Pag_LaborCampo").addStyleClass("classPag_LaborCampo");
		},
		_onRouteMatched: function (oEvent) {
			this.fnllenarList();
			var oModel = this.getView().getModel("oModel");
			var oObject = {};
			var fechaactual = funciones.fnCalcularFechaActual();
			this.getView().byId("id_fechaini").setValue(fechaactual);
			this.getView().byId("id_fechafin").setValue(fechaactual);
			oModel.setProperty("/VProg_Detalle", oObject);
		},
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		btnBack: function () {
			this.getRouter().navTo("menu");
		},
		fnllenarList: function () {
			var oModel = this.getView().getModel("oModel");
			var xData = {};
			var idcultivo, idvariedad,idlabor, resultadoc, resultadov, resultadol ;
			oModel.setProperty("/DATOS_CARGADOS", xData);
			var texto = "/public/aa/smartagri/service/data.xsodata/prog_maquinaria";
			var resultado = funciones.fnAjaxGet(texto);
			var filtro = [], filtro2 = [];
			oModel.setProperty("/tblprogmaquinaria", resultado);
			var length = oModel.getProperty("/tblprogmaquinaria/length");
			for (var i = 0; i < length; i++) {
				oModel.setProperty("/tblprogmaquinaria/"+i+"/ID_EQUIPO", oModel.getProperty("/tblprogmaquinaria/"+i+"/ID_EQUIPO"));
				oModel.setProperty("/tblprogmaquinaria/"+i+"/FEC_INI", funciones.fnConvertirFechaSubToStr(oModel.getProperty("/tblprogmaquinaria/"+i+"/FECHA_INICIO")));
				oModel.setProperty("/tblprogmaquinaria/"+i+"/FEC_FIN", funciones.fnConvertirFechaSubToStr(oModel.getProperty("/tblprogmaquinaria/"+i+"/FECHA_FIN")));
				filtro = oModel.getProperty("/DM_PT_EQUIPOS").filter(a => a.ID_EQUIPO == oModel.getProperty("/tblprogmaquinaria/"+i+"/ID_EQUIPO"));
				if(filtro.length != 0){
					oModel.setProperty("/tblprogmaquinaria/"+i+"/EQUIPO", filtro[0].EQUIPO);
				}
				filtro = oModel.getProperty("/DM_PROG_LABOR").filter(a => a.NRO_PROG == oModel.getProperty("/tblprogmaquinaria/"+i+"/NRO_PROG"));
				if(filtro.length != 0){
					filtro2 = oModel.getProperty("/DM_CULTIVO").filter(a => a.CULTIVO == filtro[0].CULTIVO);
					oModel.setProperty("/tblprogmaquinaria/"+i+"/DES_CULTIVO", filtro2[0].DESCRIPCION);
					filtro2 = oModel.getProperty("/DM_TURNO").filter(a => a.COD_TURNO == filtro[0].TURNO);
					oModel.setProperty("/tblprogmaquinaria/"+i+"/DES_TURNO", filtro2[0].DESCRIP_TURNO);
					filtro2 = oModel.getProperty("/DM_VARIEDAD").filter(a => a.VARIEDAD == filtro[0].VARIEDAD);
					oModel.setProperty("/tblprogmaquinaria/"+i+"/DES_VARIEDAD", filtro2[0].DESCRIPCION);
					filtro2 = oModel.getProperty("/DM_LABOR").filter(a => a.CODIGO == filtro[0].COD_LABOR);
					oModel.setProperty("/tblprogmaquinaria/"+i+"/DES_LABOR", filtro2[0].DESCRIPCION);
					filtro2 = oModel.getProperty("/DM_MODULO").filter(a => a.MODULO == filtro[0].MODULO);
					oModel.setProperty("/tblprogmaquinaria/"+i+"/DES_MODULO", filtro2[0].DESCRIPCION);
				}
			}
		},
		onPressSeleccionarItemLabor: function (oEvent) {
			var oModel = this.getView().getModel("oModel");
			var sPath = oEvent.getSource().getBindingContext("oModel").getPath();
			oModel.setProperty("/VProgMaq_Detalle", oModel.getProperty(sPath));
		}
	});
});