sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"./funciones"
], function (Controller, funciones) {
	"use strict";

	return Controller.extend("nsa.ui5appssa.controller.vista_maquinaria_prog", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf smartagri.Proyecto_SmartAgri.view.vista_maquinaria_prog
		 */
		onInit: function () {

			this.getRouter().getRoute("vista_maquinaria_prog").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function (oEvent) {
			var oModel = this.getView().getModel("oModel");
			var vthis = this;
			if (!this.pressDialog) {
				this.pressDialog = new sap.m.Dialog({
					title: "Filtro",
					type: "Message",
					contentWidth: "auto",
					content: [
						new sap.m.VBox({
							width: "100%",
							items: [
								new sap.m.Toolbar({
									content: [
										new sap.m.Label({
											width: "200px",
											textAlign: "Left",
											text: "Disponible: "
										}),
										new sap.m.CheckBox({
											id: "cx_disponible"
										})
									]
								}),
								new sap.m.Toolbar({
									content: [
										new sap.m.Label({
											width: "200px",
											textAlign: "Left",
											text: "Programados:"
										}),
										new sap.m.CheckBox({
											id: "cx_programado"
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
											id: "id_vdfechai",
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
											id: "id_vdfechaf",
											valueFormat: "dd/MM/yyyy",
											displayFormat: "dd/MM/yyyy"
										})
									]
								}),
							]
						})
					],

					beginButton: new sap.m.Button({
						text: 'Aplicar',
						icon: "sap-icon://save",
						press: function () {
							vthis.fnaplicarfiltro();
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
			}
			var fechaactual = funciones.fnCalcularFechaActual();
			sap.ui.getCore().byId("id_vdfechai").setValue(fechaactual);
			sap.ui.getCore().byId("id_vdfechaf").setValue(fechaactual);
			sap.ui.getCore().byId("cx_disponible").setSelected(true);
			sap.ui.getCore().byId("cx_programado").setSelected(true);
			this.getView().addDependent(this.pressDialog);
			this.pressDialog.addStyleClass("style_dialog");
			
			var arMaquinaria = oModel.getProperty("/DM_PROG_MAQUINARIA");
			var arEquipo = oModel.getProperty("/DM_PT_EQUIPOS");
			var fecha_actual = funciones.fnCalcularFechaActual2();
			var resultado = arMaquinaria.filter(a => funciones.fnConvertirFechaSubToOb(a.FECHA_INICIO).getTime() <= fecha_actual.getTime() &&
				funciones.fnConvertirFechaSubToOb(a.FECHA_FIN).getTime() >= fecha_actual.getTime());
			oModel.setProperty("/ResultadoMaq", resultado);
			let uEquipo = [...new Set(resultado.map(item => item.ID_EQUIPO))];
			var aREquipoFiltroP = arEquipo.filter(arEquipo => uEquipo.includes(arEquipo.ID_EQUIPO));
			var aREquipoFiltroD = arEquipo.filter(arEquipo => !uEquipo.includes(arEquipo.ID_EQUIPO));
			console.log(aREquipoFiltroP);
			aREquipoFiltroD.forEach(function (element) {
			  element.texto_lista = "Disponible";
			  element.estado_lista = "Success";
			});
			aREquipoFiltroP.forEach(function (element) {
			  element.texto_lista = "Programado";
			  element.estado_lista = "Warning";
			});
			oModel.setProperty("/tblprogmaquinariaD", aREquipoFiltroD);
			oModel.setProperty("/tblprogmaquinariaP", aREquipoFiltroP);
			var aArrayT = aREquipoFiltroD.concat(aREquipoFiltroP);
			oModel.setProperty("/tblprogmaquinaria", aArrayT);
				
		},
		fnaplicarfiltro: function(){
			var oModel = this.getView().getModel("oModel");
			// var Vacio = {};
			// oModel.setProperty("/VMaq_Detalle", Vacio);
			var arMaquinaria = oModel.getProperty("/DM_PROG_MAQUINARIA");
			var arEquipo = oModel.getProperty("/DM_PT_EQUIPOS");
			var fecha_inicio = sap.ui.getCore().byId("id_vdfechai")._lastValue;
			var fecha_fin = sap.ui.getCore().byId("id_vdfechaf")._lastValue;
			fecha_inicio = funciones.fnConvertirStringtoDate(fecha_inicio);
			fecha_fin = funciones.fnConvertirStringtoDate(fecha_fin);
			var resultado = arMaquinaria.filter(a => funciones.fnConvertirFechaSubToOb(a.FECHA_INICIO).getTime() <= fecha_fin.getTime() &&
				funciones.fnConvertirFechaSubToOb(a.FECHA_FIN).getTime() >= fecha_inicio.getTime());
			let uEquipo = [...new Set(resultado.map(item => item.ID_EQUIPO))];
			var aREquipoFiltroP = arEquipo.filter(arEquipo => uEquipo.includes(arEquipo.ID_EQUIPO));
			var aREquipoFiltroD = arEquipo.filter(arEquipo => !uEquipo.includes(arEquipo.ID_EQUIPO));
			console.log(aREquipoFiltroP);
			aREquipoFiltroD.forEach(function (element) {
			  element.texto_lista = "Disponible";
			  element.estado_lista = "Success";
			});
			aREquipoFiltroP.forEach(function (element) {
			  element.texto_lista = "Programado";
			  element.estado_lista = "Warning";
			});
			var aArrayT = [] ;
			if(sap.ui.getCore().byId("cx_disponible").getSelected() == true ){
				aArrayT = aArrayT.concat(aREquipoFiltroD);
			}
			if(sap.ui.getCore().byId("cx_programado").getSelected() == true ){
				aArrayT = aArrayT.concat(aREquipoFiltroP);
			}
			oModel.setProperty("/tblprogmaquinariaD", aREquipoFiltroD);
			oModel.setProperty("/tblprogmaquinariaP", aREquipoFiltroP);
			oModel.setProperty("/tblprogmaquinaria", aArrayT);
			// if(oModel.getProperty(sPath + "/ID_EQUIPO") != ""){
			// 	var arResultado = resultado.filter(a => a.ID_EQUIPO == oModel.getProperty(sPath + "/ID_EQUIPO"));
			// 	oModel.setProperty("/tblregprogmaq", arResultado);
			// }
		},
		onListItemPress: function(oEvent){
			var oModel = this.getView().getModel("oModel");
			var sPath = oEvent.getSource().getBindingContext("oModel").getPath();
			var oObject = {};
			oModel.setProperty("/VMaq_Detalle", oObject);
			var filtro = oModel.getProperty("/DM_ETAPA").filter(a => a.COD_ETAPA == oModel.getProperty(sPath + "/ETAPA"));
			oModel.setProperty("/VMaq_Detalle/ETAPA", oModel.getProperty(sPath + "/ETAPA"));
			oModel.setProperty("/VMaq_Detalle/DES_ETAPA", filtro[0].NOMB_ETAPA);
			oModel.setProperty("/VMaq_Detalle/ID_EQUIPO", oModel.getProperty(sPath + "/ID_EQUIPO"));
			oModel.setProperty("/VMaq_Detalle/EQUIPO", oModel.getProperty(sPath + "/EQUIPO"));
			oModel.setProperty("/VMaq_Detalle/CENTRO", oModel.getProperty(sPath + "/CENTRO"));
			oModel.setProperty("/VMaq_Detalle/PUESTO", oModel.getProperty(sPath + "/PUESTO"));
			oModel.setProperty("/VMaq_Detalle/texto_lista", oModel.getProperty(sPath + "/texto_lista"));
			oModel.setProperty("/VMaq_Detalle/estado_lista", oModel.getProperty(sPath + "/estado_lista"));
			var arResultado = oModel.getProperty("/ResultadoMaq");
			var arResultado = arResultado.filter(a => a.ID_EQUIPO == oModel.getProperty(sPath + "/ID_EQUIPO"));
			console.log(arResultado);
			oModel.setProperty("/tblregprogmaq", arResultado);
			
		},
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		getSplitAppObj: function () {
			var result = this.byId("SplitAppDemo");
			if (!result) {
				Log.info("SplitApp object can't be found");
			}
			return result;
		},
		pressDialog: null,
		btnFiltro: function () {
		
			this.pressDialog.open();
		},
		onPressGoToMaster: function (oEvent) {
			var oModel = this.getView().getModel("oModel");
			var aArray = [];
			oModel.setProperty("/tblSeleccionado", aArray);
			var url = "/public/aa/smartagri/service/data.xsodata/";
			var aFilter = [],
				oFilter = {};
			var oDataModel = new sap.ui.model.odata.v2.ODataModel(url, true, {
				useBatch: false,
				sequentializeRequests: true
			});

			var key = oEvent.getSource().data("key");
			switch (key) {
			case "op_1":
				var texto = "/public/aa/smartagri/service/data.xsodata/pt_equipos";
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
						oModel.setProperty("/tblmaquinariadisp", response.d.results);
						var equipo, des_equipo;
						for (var i = 0; i < oModel.getProperty("/tblmaquinariadisp/length"); i++) {
							equipo = oModel.getProperty("/tblmaquinariadisp/" + i + "/ID_EQUIPO");
							des_equipo = oModel.getProperty("/tblmaquinariadisp/" + i + "/EQUIPO");
							var texto1 = "/public/aa/smartagri/service/data.xsodata/prog_maquinaria";
							$.ajax(texto1, {
								type: 'GET',
								async: false,
								dataType: "json",
								beforeSend: function (xhr) {
									xhr.setRequestHeader("X-CSRF-Token", "Fetch");
								},
								complete: function (xhr) {},
								success: function (response) {
									console.log(response);
									oModel.setProperty("/tblmaquinariap", response.d.results);
									var aFiltro = []
									for (var j = 0; j < oModel.getProperty("/tblmaquinariap/length"); j++) {
										aFiltro[j] = oModel.getProperty("/tblmaquinariap/" + j + "/ID_EQUIPO");
									}
									let unique = [...new Set(aFiltro)];
									// oModel.setProperty("/cbxFiltro_anios", unique);
									// console.log(oModel.getProperty("/cbxFiltro_anios"));
									console.log(unique);

									// for(j=0; oModel.getProperty("/tblmaquinariap/length");i++){
									// 	console.log(response.d.results[j].ID_EQUIPO);

									// }
									// if(response.d.results[i].ID_EQUIPO === equipo){
									// 	console.log("son iguales");
									// }
									// else{
									// 	console.log("no son iguales");
									// 	oModel.setProperty("/tblmaquinariadisp/"+i+"/DESCRIP_EQUIPO", des_equipo);

									// }
								}
							});
						}

					}
				});

				oModel.setProperty("/tblSeleccionado", oModel.getProperty("/tblmaquinariadisp"));
				console.log(oModel.getProperty("/tblSeleccionado"));

				break;
			case "op_2":
				oDataModel.read("/prog_maquinaria", {
					success: function (response) {
						console.log(response);
						oModel.setProperty("/tblprogmaq", response.results);
						console.log(oModel.getProperty("/tblprogmaq"));
						var material;
						for (var i = 0; i < oModel.getProperty("/tblprogmaq/length"); i++) {
							material = oModel.getProperty("/tblprogmaq/" + i + "/ID_EQUIPO");
							oModel.setProperty("/tblprogmaq/" + i + "/PUESTO", response.results[0].PUESTO);

							oFilter = new sap.ui.model.Filter("ID_EQUIPO", sap.ui.model.FilterOperator.EQ, material);
							aFilter.push(oFilter);
							console.log(aFilter);

							var texto = "/public/aa/smartagri/service/data.xsodata/equipo?$filter=ID_EQUIPO eq " + material + "";
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
									oModel.setProperty("/tblprogmaq/" + i + "/DESCRIP_EQUIPO", response.d.results[0].DESCRIP_EQUIPO);
									oModel.setProperty("/tblSeleccionado", oModel.getProperty("/tblprogmaq"));
								}
							});

						}
					}
				});
				break;
			}
			this.getSplitAppObj().toMaster(this.createId("master2"));
		},
		btnRegresarMenu: function () {

		},
		onPressMasterBack: function () {
			this.getSplitAppObj().backMaster();
		},
		btnBack: function () {
			this.getRouter().navTo("menu");
		},
		btnItemMaquinaria: function (oEvent) {
			var oModel = this.getView().getModel("oModel");
			var url = "/public/aa/smartagri/service/data.xsodata/";
			var sPath = oEvent.getSource().getBindingContext("oModel").getPath();
			var oDataModel = new sap.ui.model.odata.v2.ODataModel(url, true, {
				useBatch: false,
				sequentializeRequests: true
			});
			var valorid = oModel.getProperty(sPath + "/NRO_PROG");
			oDataModel.read("/T_PT_EQUIPOS", {
				success: function (response) {
					console.log(response);
					oModel.setProperty("/ItemSeleccionado_equipo", response.results[0].EQUIPO);
				}
			});
		},
		onListItemPress1: function (oEvent) {
				console.log(oEvent.getSource().getBindingContext("oModel"));
				var oModelG = this.getView().getModel("oModel");
				var sPath = oEvent.getSource().getBindingContext("oModel").getPath();
				oModelG.setProperty("/ItemSeleccionado_idprog", oModelG.getProperty(sPath + "/NRO_PROG"));
				// var key = oEvent.getSource().data("key");
				// switch(key){
				// 	case "op_1":
				// 		break;
				// 	case "op_2":
				// 		break;
				// }
				console.log(oModelG.getProperty("/"));
			}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf smartagri.Proyecto_SmartAgri.view.vista_maquinaria_prog
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf smartagri.Proyecto_SmartAgri.view.vista_maquinaria_prog
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf smartagri.Proyecto_SmartAgri.view.vista_maquinaria_prog
		 */
		//	onExit: function() {
		//
		//	}

	});

});