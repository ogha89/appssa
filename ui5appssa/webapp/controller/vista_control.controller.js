sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"./funciones",
], function (Controller, funciones) {
	"use strict";

	return Controller.extend("nsa.ui5appssa.controller.vista_control", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf smartagri.Proyecto_SmartAgri.view.vista_control
		 */
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("vista_control").attachMatched(this._onRouteMatched, this);
			this.getView().byId("Pag_LaborCampo").addStyleClass("classPag_LaborCampo");
		},
		_onRouteMatched: function (oEvent) {
			this.fnllenarList();
			var oModelG = this.getView().getModel("oModel");
			var oObject = {};
			var fechaactual = funciones.fnCalcularFechaActual();
			// var hora = funciones.fnCalcularHora();
			this.getView().byId("id_fechaini").setValue(fechaactual);
			this.getView().byId("id_fechafin").setValue(fechaactual);
			// this.getView().byId("TP3").setValue(hora);
			// this.getView().byId("TP4").setValue(hora);
			oModelG.setProperty("/VProg_Detalle", oObject);
			oModelG.setProperty("/tblDetalle2",oObject);
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
		fnllenarList: function () {
			var oModelG = this.getView().getModel("oModel");
			var xData = {};
			var idcultivo, idvariedad,idlabor, resultadoc, resultadov, resultadol ;
			oModelG.setProperty("/DATOS_CARGADOS", xData);
			var texto = "/public/aa/smartagri/service/data.xsodata/prog_labor";
			$.ajax(texto, {
				type: 'GET',
				async: false,
				dataType: "json",
				beforeSend: function (xhr) {
					xhr.setRequestHeader("X-CSRF-Token", "Fetch");
				},
				complete: function (xhr) {},
				success: function (response) {
					oModelG.setProperty("/tblproglabor", response.d.results);
					var length = oModelG.getProperty("/tblproglabor/length");
					for (var i = 0; i < length; i++) {
						idcultivo = oModelG.getProperty("/tblproglabor/"+i+"/CULTIVO");
						resultadoc = funciones.fnObtenerDescripcion_Cultivo(idcultivo);       
						oModelG.setProperty("/tblproglabor/"+i+"/DESCRIPCION_CULTIVO", resultadoc);
						idvariedad = oModelG.getProperty("/tblproglabor/"+i+"/VARIEDAD");
						resultadov = funciones.fnObtenerDescripcion_Variedad(idvariedad);       
						oModelG.setProperty("/tblproglabor/"+i+"/DESCRIPCION_VARIEDAD", resultadov);
						idlabor = oModelG.getProperty("/tblproglabor/"+i+"/COD_LABOR");
						resultadol = funciones.fnObtenerDescripcion_labor(idlabor);       
						oModelG.setProperty("/tblproglabor/"+i+"/DESCRIPCION_LABOR", resultadol);
					}
					
				},
				error: function (response) {

				}
			});
		},
		onPressSeleccionarItemLabor: function (oEvent) {
			var oModel = this.getView().getModel("oModel");
			var sPath = oEvent.getSource().getBindingContext("oModel").getPath();
			oModel.setProperty("/ItemSeleccionado_idprog", oModel.getProperty(sPath + "/NRO_PROG"));
			oModel.setProperty("/ItemSeleccionado_modulo", oModel.getProperty(sPath + "/MODULO"));
			var idcultivo = oModel.getProperty(sPath + "/CULTIVO");
			oModel.setProperty("/ItemSeleccionado_Cultivo", funciones.fnObtenerDescripcion_Cultivo(idcultivo));
			var idvariedad = oModel.getProperty(sPath + "/VARIEDAD");
			oModel.setProperty("/ItemSeleccionado_Variedad", funciones.fnObtenerDescripcion_Variedad(idvariedad));
			var idetapa = oModel.getProperty(sPath + "/ETAPA");
			oModel.setProperty("/ItemSeleccionado_Etapa", funciones.fnObtenerDescripcion_etapa(idetapa));
			var idlabor = oModel.getProperty(sPath + "/COD_LABOR");
			oModel.setProperty("/ItemSeleccionado_Labor", funciones.fnObtenerDescripcion_labor(idlabor));
			
			var nro_prog = oModel.getProperty(sPath + "/NRO_PROG");
			var valor = oModel.getProperty(sPath + "/CAMPANA");
			var zona = oModel.getProperty(sPath + "/ZONA");
			var fundo = oModel.getProperty(sPath + "/FUNDO");
			var obs = oModel.getProperty(sPath + "/OBSERVACIONES");
			var oObject = {};
			oModel.setProperty("/VProg_Detalle", oObject);
			oModel.setProperty("/VProg_Detalle/ZONA", zona);
			oModel.setProperty("/VProg_Detalle/FUNDO", fundo);
			oModel.setProperty("/VProg_Detalle/OBSERVACIONES", obs);
			oModel.setProperty("/VProg_Detalle/CAMPANA", valor);
			oModel.setProperty("/VProg_Detalle/NRO_PROG", nro_prog);
			
			var filtro = oModel.getProperty("/DM_CAMPANA").filter(a => a.CAMPANA == oModel.getProperty(sPath + "/CAMPANA"));
			oModel.setProperty("/VProg_Detalle/DES_CAMPANA", filtro[0].DESCRIPCION);
			
			filtro = oModel.getProperty("/DM_CULTIVO").filter(a => a.CULTIVO == oModel.getProperty(sPath + "/CULTIVO"));
			oModel.setProperty("/VProg_Detalle/CULTIVO", oModel.getProperty(sPath + "/CULTIVO"));
			oModel.setProperty("/VProg_Detalle/DES_CULTIVO", filtro[0].DESCRIPCION);
			
			filtro = oModel.getProperty("/DM_LABOR").filter(a => a.CODIGO == oModel.getProperty(sPath + "/COD_LABOR"));
			oModel.setProperty("/VProg_Detalle/LABOR", oModel.getProperty(sPath + "/COD_LABOR"));
			oModel.setProperty("/VProg_Detalle/DES_LABOR", filtro[0].DESCRIPCION);
		
			filtro = oModel.getProperty("/DM_VARIEDAD").filter(a => a.VARIEDAD == oModel.getProperty(sPath + "/VARIEDAD"));
			oModel.setProperty("/VProg_Detalle/VARIEDAD", oModel.getProperty(sPath + "/VARIEDAD"));
			oModel.setProperty("/VProg_Detalle/DES_VARIEDAD", filtro[0].DESCRIPCION);
		
			filtro = oModel.getProperty("/DM_ETAPA").filter(a => a.COD_ETAPA == oModel.getProperty(sPath + "/ETAPA"));
			oModel.setProperty("/VProg_Detalle/ETAPA", oModel.getProperty(sPath + "/ETAPA"));
			oModel.setProperty("/VProg_Detalle/DES_ETAPA", filtro[0].NOMB_ETAPA);

			filtro = oModel.getProperty("/DM_MODULO").filter(a => a.MODULO == oModel.getProperty(sPath + "/MODULO"));
			oModel.setProperty("/VProg_Detalle/MODULO", oModel.getProperty(sPath + "/MODULO"));
			oModel.setProperty("/VProg_Detalle/DES_MODULO", filtro[0].DESCRIPCION);

			filtro = oModel.getProperty("/DM_TURNO").filter(a => a.COD_TURNO == oModel.getProperty(sPath + "/TURNO"));
			oModel.setProperty("/VProg_Detalle/TURNO", oModel.getProperty(sPath + "/TURNO"));
			oModel.setProperty("/VProg_Detalle/DES_TURNO", filtro[0].DESCRIP_TURNO);
			
			var fechai = oModel.getProperty(sPath + "/FECHA_INICIO").substring(6, oModel.getProperty(sPath + "/FECHA_INICIO").length - 2);
			oModel.setProperty("/VProg_Detalle/FEC_INI", funciones.fnConvertirFecha(parseInt(fechai)));
			var fechaf = oModel.getProperty(sPath + "/FECHA_FIN").substring(6, oModel.getProperty(sPath + "/FECHA_FIN").length - 2);
			oModel.setProperty("/VProg_Detalle/FEC_FIN", funciones.fnConvertirFecha(parseInt(fechaf)));
			oModel.setProperty("/VProg_Detalle/AVANCE", oModel.getProperty(sPath + "/AVANCE"));
			oModel.setProperty("/VProg_Detalle/UNIDAD", oModel.getProperty(sPath + "/UNIDAD"));
			this.fnListControl();
		},
		fnListControl: function (){
			var oModel = this.getView().getModel("oModel");
			var nro_prog = oModel.getProperty("/ItemSeleccionado_idprog");
			var texto = "/public/aa/smartagri/service/data.xsodata/prog_control?$filter=NRO_PROG eq '"+nro_prog+"'";
			var result = funciones.fnAjaxGet(texto);
			console.log(result);
			oModel.setProperty("/tblDetalle2", result);
		},
		onPressGoToMaster: function (oEvent) {
			this.getSplitAppObj().toMaster(this.createId("master2"));
			var oModel = this.getView().getModel("oModel");
			// var nro_prog = oEvent.getSource().data("key");
			var sPath = oEvent.getSource().getBindingContext("oModel").getPath()
			var nro_prog = oModel.getProperty(sPath + "/NRO_PROG");
			var url = "/public/aa/smartagri/service/data.xsodata/";
			var aFilter = [];
			// var valor = oModel.getProperty(sPath+"/MODULO_FK");
			var oFilter = new sap.ui.model.Filter("NRO_PROG", sap.ui.model.FilterOperator.EQ, nro_prog);
			aFilter.push(oFilter);
			var oDataModel = new sap.ui.model.odata.v2.ODataModel(url, true, {
				useBatch: false,
				sequentializeRequests: true
			});
			oDataModel.read("/prog_maquinaria", {
				filters: aFilter,
				success: function (response) {
					oModel.setProperty("/tblprogmaq", response.results);
					var material;
					for(var i=0; i<oModel.getProperty("/tblprogmaq/length"); i++){
						material= oModel.getProperty("/tblprogmaq/"+i+"/ID_EQUIPO");
						oModel.setProperty("/tblprogmaq/"+i+"/PUESTO", response.results[0].PUESTO);
						aFilter=[];oFilter={};
						oFilter = new sap.ui.model.Filter("ID_EQUIPO", sap.ui.model.FilterOperator.EQ, material);
						aFilter.push(oFilter);
						
						var texto = "/public/aa/smartagri/service/data.xsodata/equipo?$filter=ID_EQUIPO eq "+material+"";	
						$.ajax(texto, {
							type: 'GET',
							async: false,
							dataType: "json",
							beforeSend: function (xhr) {
								xhr.setRequestHeader("X-CSRF-Token", "Fetch");
							},
							complete: function (xhr) {},
							success: function (response) {
								oModel.setProperty("/tblprogmaq/"+i+"/DESCRIP_EQUIPO", response.d.results[0].DESCRIP_EQUIPO);
							}
						});
						
						
					}
				}
			});
			
			
			
			
			

		},
		onpressSave: function(){
			var vthis=this;
			var oModel = this.getView().getModel("oModel");
			var nroprog = oModel.getProperty("/ItemSeleccionado_idprog");
			var posicion = 0;
			var fechai = this.byId("id_fechaini")._lastValue;
			fechai = funciones.fnConvertirStringtoDate(fechai);
			var fechaf = this.byId("id_fechafin")._lastValue;
			fechaf = funciones.fnConvertirStringtoDate(fechaf);
			var horai = this.byId("TP3")._lastValue;
			var horaf = this.byId("TP4")._lastValue;
			var descripcion = this.byId("id_descripcion")._lastValue;
			var avance = this.byId("id_avance")._lastValue;
			var texto = "/public/aa/smartagri/service/data.xsodata/prog_control?$filter=NRO_PROG eq '"+nroprog+"'";
			var result = funciones.fnAjaxGet(texto);
			if(result.length == 0){
				posicion= posicion + 1;
			}else{
				posicion = result.length + 1;
			}
			if(avance === null || avance =="" || avance==undefined){
				avance="0";
			}
			var llave={};
			llave.NRO_PROG= nroprog;
			llave.POSICION= posicion;
			llave.FECHA_INICIO= fechai;
			llave.FECHA_FIN= fechaf;
			llave.HORA_INICIO= horai;
			llave.HORA_FIN= horaf;
			llave.DESCRIPCION= descripcion;
			llave.AVANCE= avance;
			llave.USUARIO= "";
			llave.NOMBRE_USUARIO= "";
			console.log(llave);
			var url = "/public/aa/smartagri/service/data.xsodata";
			var oDataModel = new sap.ui.model.odata.v2.ODataModel(url, true);
			// var url2 = "/prog_control";
			oDataModel.create("/prog_control",
			llave, {
				success: function (data) {
					funciones.fnMessageBoxSuccess(vthis, "Registro guardado con �xito.", "Info");
					this.fnListControl();
				}.bind(this),
				error: function (oError) {
					console.log(oError);
				}.bind(this)
			});
		},
		pressEditar: function(evt){
			var vthis = this;
			var objeto = evt.getSource().getBindingContext("oModel").getObject();
			console.log(objeto);
			var nro_prog = objeto.NRO_PROG;
			var pos = objeto.POSICION;
			var fechai = funciones.fnConvertirFechaSubToStr(objeto.FECHA_INICIO);
			var fechaf = funciones.fnConvertirFechaSubToStr(objeto.FECHA_FIN);
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
									width: "90px",
									textAlign: "Left",
									text: "Fecha inicio: "
								}),
								new sap.m.DatePicker({
									textAlign: "Left",
									id: "id_vdfechai",
									valueFormat: "dd/MM/yyyy",
									displayFormat: "dd/MM/yyyy",
									value: fechai
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
									id: "id_vdfechaf",
									valueFormat: "dd/MM/yyyy",
									displayFormat: "dd/MM/yyyy",
									value: fechaf
								})
							]
						}),
						new sap.m.Toolbar({
							content: [
								new sap.m.Label({
									width: "90px",
									textAlign: "Left",
									text: "Hora inicio :"
								}),
								new sap.m.TimePicker({
									textAlign: "Left",
									valueFormat: "HH:mm:ss",
									displayFormat: "HH:mm:ss",
									id: "id_vdhorai",
									value: objeto.HORA_INICIO
								})
							]
						}),
						new sap.m.Toolbar({
							content: [
								new sap.m.Label({
									width: "90px",
									textAlign: "Left",
									text: "Hora fin :"
								}),
								new sap.m.TimePicker({
									textAlign: "Left",
									valueFormat: "HH:mm:ss",
									displayFormat: "HH:mm:ss",
									id: "id_vdhoraf",
									value: objeto.HORA_FIN
								})
							]
						}),
						new sap.m.Toolbar({
							content: [
								new sap.m.Label({
									width: "90px",
									textAlign: "Left",
									text: "Avance: "
								}),
								new sap.m.Input({
									textAlign: "Left",
									id: "id_vdavance",
									value: objeto.AVANCE
								})
							]
						}),
						new sap.m.Toolbar({
							content: [
								new sap.m.Label({
									width: "90px",
									textAlign: "Left",
									text: "Descripci�n: "
								}),
								new sap.m.Input({
									textAlign: "Left",
									id: "id_vddescripcion",
									value: objeto.DESCRIPCION
								})
							]
						})
					]
					})	
				],
				beginButton: new sap.m.Button({
					text: 'Guardar',
					icon: "sap-icon://save",
					press: function () {
						var idfechai = sap.ui.getCore().byId("id_vdfechai")._lastValue;
						idfechai = funciones.fnConvertirStringtoDate(idfechai);          
						var idfechaf = sap.ui.getCore().byId("id_vdfechaf")._lastValue;
						idfechaf = funciones.fnConvertirStringtoDate(idfechaf);
						var idhorai = sap.ui.getCore().byId("id_vdhorai")._lastValue;
						var idhoraf = sap.ui.getCore().byId("id_vdhoraf")._lastValue;
						var idavance = sap.ui.getCore().byId("id_vdavance")._lastValue;
						var iddesc = sap.ui.getCore().byId("id_vddescripcion")._lastValue;
						var url = "/public/aa/smartagri/service/data.xsodata";
						var oDataModel = new sap.ui.model.odata.v2.ODataModel(url, true);
						var text = "/prog_control(NRO_PROG='" + nro_prog + "',POSICION=" + pos + ")";
						var llave = {};
						llave.FECHA_INICIO = idfechai;
						llave.FECHA_FIN = idfechaf;
						llave.HORA_INICIO = idhorai;
						llave.HORA_FIN = idhoraf;
						llave.AVANCE = idavance;
						llave.DESCRIPCION = iddesc;
						console.log(llave);
						oDataModel.update(text, llave, {
							success: function (data) {
								funciones.fnMessageBoxSuccess(vthis, "Registro guardado con �xito.", "Info");
								vthis.fnListControl();
							},
							error: function (data){
								var dialogA = new sap.m.Dialog({
									title: "Se ha generado un error",
									type: "Message",
									state: "Error",
									content: new sap.m.Text({
										text: "No se actualiz� correctamente"
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
							}
						});
						dialog2.close();
					}.bind(this),
				}),
				endButton: new sap.m.Button({
					text: 'Cancelar',
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
		pressEliminar: function (evt){
			var vthis = this;
			var objeto = evt.getSource().getBindingContext("oModel").getObject();
			console.log(objeto);
			var dialogD = new sap.m.Dialog({
				title: "Mensaje de confirmaci�n",
				type: "Message",
				state: "Information",
				content: new sap.m.Text({
					text: "�Segur� que desea eliminar el registro?"
				}),
				beginButton: new sap.m.Button({
					text: "S�",
					type: "Accept",
					press: function () {
						dialogD.setBusy(true);
						var url = "/public/aa/smartagri/service/data.xsodata";
						var oModel = new sap.ui.model.odata.v2.ODataModel(url, true);
						oModel.remove("/prog_control(NRO_PROG='" + objeto.NRO_PROG + "',POSICION=" + objeto.POSICION + ")", {
							success: function (data) {
								dialogD.setBusy(false);
								dialogD.close();
								var dialogA = new sap.m.Dialog({
									title: "Se elimin� con �xito",
									type: "Message",
									state: "Success",
									content: new sap.m.Text({
										text: "Se elimino correctamente el registro."
									}),
									beginButton: new sap.m.Button({
										text: "OK",
										type: "Accept",
										press: function () {
											this.fnListControl();
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
										text: "No se elimin� correctamente."
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
		onPressMasterBack: function(){
			this.getSplitAppObj().backMaster();
		},
		btnBack:function(){
			this.getRouter().navTo("menu");
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf smartagri.Proyecto_SmartAgri.view.vista_control
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf smartagri.Proyecto_SmartAgri.view.vista_control
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf smartagri.Proyecto_SmartAgri.view.vista_control
		 */
		//	onExit: function() {
		//
		//	}

	});

});