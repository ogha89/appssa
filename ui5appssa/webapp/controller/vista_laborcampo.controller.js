sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/m/Button',
	'sap/m/Dialog',
	'sap/m/Text',
	'sap/ui/layout/VerticalLayout',
	'sap/ui/layout/HorizontalLayout',
	'sap/m/Input',
	'sap/m/DatePicker',
	"sap/m/MessageToast",
	'./funciones'
], function (Controller, Button, Dialog, Text, VerticalLayout, HorizontalLayout, Input, DatePicker, MessageToast, funciones) {
	"use strict";

	return Controller.extend("nsa.ui5appssa.controller.vista_laborcampo", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf smartagri.Proyecto_SmartAgri.view.vista_laborcampo
		 */
		onInit: function () {
			this.getView().byId("Pag_LaborCampo").addStyleClass("classPag_LaborCampo");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("vista_laborcampo").attachMatched(this._onRouteMatched, this);
		this.getView().byId("bg-imagen").addStyleClass("bg_imagen_1");

			// this.getRouter().getRoute("vista_laborcampo").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function () {
			// this.fnlaborparametro();
			this.llenartabla();
			
			var oModelG = this.getView().getModel("oModel");
			var url = "/public/aa/smartagri/service/data.xsodata/";
			var oModel = new sap.ui.model.odata.v2.ODataModel(url, true);
			oModel.read("/campana", {
				success: function (response) {
					var oModelCamp = new sap.ui.model.json.JSONModel(response.results);
					oModelG.setProperty("/cbxCampana", oModelCamp.getProperty("/"));
				}
			});
			oModel.read("/cultivo", {
				success: function (response) {
					console.log(response);
					var oModelCamp = new sap.ui.model.json.JSONModel(response.results);
					oModelG.setProperty("/cbxCultivo", oModelCamp.getProperty("/"));
				}
			});
			oModel.read("/variedad", {
				success: function (response) {
					console.log(response);
					var oModelCamp = new sap.ui.model.json.JSONModel(response.results);
					oModelG.setProperty("/cbxVariedad", oModelCamp.getProperty("/"));
				}
			});
			oModel.read("/etapa", {
				success: function (response) {
					console.log(response);
					var oModelCamp = new sap.ui.model.json.JSONModel(response.results);
					oModelG.setProperty("/cbxEtapa", oModelCamp.getProperty("/"));
				}
			});
			oModel.read("/labor", {
				success: function (response) {
					console.log(response);
					var oModelCamp = new sap.ui.model.json.JSONModel(response.results);
					oModelG.setProperty("/cbxLabor", oModelCamp.getProperty("/"));
				}
			});
			oModel.read("/puesto_trabajo", {
				success: function (response) {
					console.log(response);
					var oModelCamp = new sap.ui.model.json.JSONModel(response.results);
					oModelG.setProperty("/cbxPuestoTrabajo", oModelCamp.getProperty("/"));
				}
			});
			oModel.read("/centro", {
				success: function (response) {
					console.log(response);
					var oModelCamp = new sap.ui.model.json.JSONModel(response.results);
					oModelG.setProperty("/cbxCentro", oModelCamp.getProperty("/"));
				}
			});
			oModel.read("/zona", {
				success: function (response) {
					console.log(response);
					var oModelCamp = new sap.ui.model.json.JSONModel(response.results);
					oModelG.setProperty("/cbxZona", oModelCamp.getProperty("/"));
				}
			});
			oModel.read("/fundo", {
				success: function (response) {
					console.log(response);
					var oModelCamp = new sap.ui.model.json.JSONModel(response.results);
					oModelG.setProperty("/cbxFundo", oModelCamp.getProperty("/"));
				}
			});
			oModel.read("/modulo", {
				success: function (response) {
					console.log(response);
					var oModelCamp = new sap.ui.model.json.JSONModel(response.results);
					oModelG.setProperty("/cbxModulo", oModelCamp.getProperty("/"));
				}
			});
			oModel.read("/almacen", {
				success: function (response) {
					console.log(response);
					var oModelCamp = new sap.ui.model.json.JSONModel(response.results);
					oModelG.setProperty("/cbxAlmacen", oModelCamp.getProperty("/"));
				}
			});
			
		},
		btnBackMenu: function () {
			this.getRouter().navTo("menu");
		},

		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		llenartabla: function () {
			var vthis = this;
			var oModel = this.getView().getModel();
			var oModelData = vthis.getView().getModel("oModel");
			//var oModel = new sap.ui.model.json.JSONModel();
			oModel = this.getOwnerComponent().getModel();
			var oModelJSON;
			oModel.read("/prog_labor", {
				async: false,
				success: function (Odata, response) {
					oModelJSON = new sap.ui.model.json.JSONModel(response.data.results);
					// oModelJSON.getProperty("/");
					console.log(oModelJSON.getProperty("/"));
					oModelData.setProperty("/DataTabla", oModelJSON.getProperty("/"));
					console.log(oModelData.getProperty("/"));
					var oTable = vthis.byId("table1");
					oTable.setModel(oModelJSON);
					oTable.bindRows("/");
				},
				error: function (oError) {}
			});
		},
		_oDialogAdMaquinaria:null,
		btnadicmaquinaria: function () {
			var vthis = this;
			if(!this._oDialogAdMaquinaria){
				this._oDialogAdMaquinaria = new sap.m.Dialog({
					title: "Adicionar maquinaria",
					icon: "sap-icon://add-equipment",
					type: "Message",
					state: "Success",
					draggable: true,
					resizable: true,
					horizontalScrolling: true,
					contentWidth: "auto",
					content: [
						new sap.ui.layout.HorizontalLayout({
							width: "100%",
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
													text: "Fecha Ini. : "
												}),
												new sap.m.DatePicker({
													textAlign: "Left",
													id: "idDAMfechaini",
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
												new sap.m.ComboBox({
													textAlign: "Left",
													id: "idDAMFundo",
													placeholder: "-Seleccione fundo-",
													width: "auto",
													items: {
														path: "oModel>/cbxFundo",
														template: new sap.ui.core.Item({
															key: "{oModel>COD_FUNDO}",
															text: "{oModel>DESCRIP_FUNDO}"
														})
													}
												})
											]
										}),
										new sap.m.Toolbar({
											// height: "auto",
											content: [
												new sap.m.Label({
													width: "31%",
													textAlign: "Left",
													text: "Mdulo : "
												}),
												new sap.m.ComboBox({
													textAlign: "Left",
													id: "idDAMModulo",
													placeholder: "-Seleccione m�dulo-",
													width: "auto",
													items: {
														path: "oModel>/cbxModulo",
														template: new sap.ui.core.Item({
															key: "{oModel>COD_MODULO}",
															text: "{oModel>DESCRIP_MODULO}"
														})
													}
												})
											]
										}),
										new sap.m.Toolbar({
											// height: "auto",
											content: [
												new sap.m.Label({
													width: "31%",
													textAlign: "Left",
													text: "Lote : "
												}),
												new sap.m.Input({
													textAlign: "Left",
													id: "idDAMiLote",
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
													text: "Cultivo : "
												}),
												new sap.m.ComboBox({
													textAlign: "Left",
													id: "idDAMCultivo",
													placeholder: "-Seleccione cultivo-",
													width: "auto",
													items: {
														path: "oModel>/cbxCultivo",
														template: new sap.ui.core.Item({
															key: "{oModel>CULTIVO}",
															text: "{oModel>DESCRIPCION}"
														})
													}
												})
												// new sap.m.Input({
												// 	textAlign: "Left",
												// 	id: "IdCultmaq",
												// 	fieldWidth: "auto"
												// })
											]
										}),
										new sap.m.Toolbar({
											// height: "auto",
											content: [
												new sap.m.Label({
													width: "31%",
													textAlign: "Left",
													text: "Campa�a : "
												}),
												new sap.m.ComboBox({
													textAlign: "Left",
													id: "idDAMCampana",
													placeholder: "Seleccione campa�a ...",
													width: "auto",
													items: {
														path: "oModel>/cbxCampana",
														template: new sap.ui.core.Item({
															key: "{oModel>ID_CAMPANA}",
															text: "{oModel>DESCRIP_CAMPANA}"
														})
													}
												})
												// new sap.m.Input({
												// 	textAlign: "Left",
												// 	id: "IdCammaq",
												// 	fieldWidth: "auto"
												// })
											]
										}),
										new sap.m.Toolbar({
											// height: "auto",
											content: [
												new sap.m.Label({
													width: "31%",
													textAlign: "Left",
													text: "Orden : "
												}),
												new sap.m.Input({
													textAlign: "Left",
													id: "idDAMOrden",
													fieldWidth: "auto"
												})
											]
										})
	
									]
								}),
								new sap.ui.layout.VerticalLayout({
									width: "100%",
									content: [
										new sap.m.Toolbar({
											// height: "auto",
											content: [
												new sap.m.Label({
													width: "31%",
													textAlign: "Left",
													text: "Fecha fin : "
												}),
												new sap.m.DatePicker({
													textAlign: "Left",
													id: "idDAMFechafin",
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
													text: "Etapa : "
												}),
												new sap.m.ComboBox({
													textAlign: "Left",
													id: "idDAMEtapa",
													placeholder: "-Seleccione etapa-",
													width: "auto",
													items: {
														path: "oModel>/cbxEtapa",
														template: new sap.ui.core.Item({
															key: "{oModel>COD_ETAPA}",
															text: "{oModel>NOMB_ETAPA}"
														})
													}
												})
												// new sap.m.Input({
												// 	textAlign: "Left",
												// 	id: "idDAMEtapa",
												// 	fieldWidth: "auto"
												// })
											]
										}),
	
										new sap.m.Toolbar({
											// height: "auto",
											content: [
												new sap.m.Label({
													width: "31%",
													textAlign: "Left",
													text: "Labor : "
												}),
												new sap.m.ComboBox({
													textAlign: "Left",
													id: "idDAMLabor",
													placeholder: "-Seleccione labor-",
													width: "auto",
													items: {
														path: "oModel>/cbxLabor",
														template: new sap.ui.core.Item({
															key: "{oModel>COD_LABOR}",
															text: "{oModel>DESCRIP_LABOR}"
														})
													}
												})
												// new sap.m.Input({
												// 	textAlign: "Left",
												// 	id: "Idlabmaq",
												// 	fieldWidth: "auto"
												// })
											]
										}),
										new sap.m.Toolbar({
											// height: "auto",
											content: [
												new sap.m.Label({
													width: "31%",
													textAlign: "Left",
													text: "Puesto Trab. : "
												}),
												new sap.m.ComboBox({
													textAlign: "Left",
													id: "idDAMPuesto",
													placeholder: "-Seleccione labor-",
													width: "auto",
													items: {
														path: "oModel>/cbxPuestoTrabajo",
														template: new sap.ui.core.Item({
															key: "{oModel>ID_PUESTO}",
															text: "{oModel>CLASE_PT}"
														})
													}
												})
												// new sap.m.Input({
												// 	textAlign: "Left",
												// 	id: "idDAMPuesto",
												// 	fieldWidth: "auto"
												// })
											]
										}),
										new sap.m.Toolbar({
											// height: "auto",
											content: [
												new sap.m.Label({
													width: "31%",
													textAlign: "Left",
													text: "Cantidad : "
												}),
												new sap.m.Input({
													textAlign: "Left",
													id: "idDAMCantidad",
													fieldWidth: "auto"
												})
											]
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
							this._oDialogAdMaquinaria.close();
							// oDialog1.destroy();
						}.bind(this)
					}),
					endButton: new Button({
						text: "Cancelar",
						icon: "sap-icon://decline",
						type: "Emphasized",
						press: function () {
							vthis._oDialogAdMaquinaria.close();
							// oDialog1.destroy();
	
						}.bind(this)
					})
				});
				this.getView().addDependent(this._oDialogAdMaquinaria);
			}
			this._oDialogAdMaquinaria.open();
		},
		
		_oDialogAdMaterial: null,
		btnadiconarmaterial: function () {
			var vthis= this;
			if(!this._oDialogAdMaterial){
			this._oDialogAdMaterial = new sap.m.Dialog({
				title: "Adicionar material",
				icon: "sap-icon://add",
				type: "Message",
				state: "Success",
				draggable: true,
				resizable: true,
				horizontalScrolling: true,
				contentWidth: "auto",
				content: [
					new sap.ui.layout.HorizontalLayout({
						width: "100%",
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
												text: "Fecha Ini. : "
											}),
											new sap.m.DatePicker({
												textAlign: "Left",
												id: "idDAMATFechaIni",
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
											new sap.m.ComboBox({
												textAlign: "Left",
												id: "idDAMATFundo",
												placeholder: "-Seleccione fundo-",
												width: "auto",
												items: {
													path: "oModel>/cbxFundo",
													template: new sap.ui.core.Item({
														key: "{oModel>COD_FUNDO}",
														text: "{oModel>DESCRIP_FUNDO}"
													})
												}
											})
											// new sap.m.Input({
											// 	textAlign: "Left",
											// 	id: "idDAMATFundo",
											// 	fieldWidth: "auto"
											// })
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
											new sap.m.ComboBox({
												textAlign: "Left",
												id: "idDAMATModulo",
												placeholder: "-Seleccione m�dulo-",
												width: "auto",
												items: {
													path: "oModel>/cbxModulo",
													template: new sap.ui.core.Item({
														key: "{oModel>COD_MODULO}",
														text: "{oModel>DESCRIP_MODULO}"
													})
												}
											})
											// new sap.m.Input({
											// 	textAlign: "Left",
											// 	id: "IdModmaq",
											// 	fieldWidth: "auto"
											// })
										]
									}),
									new sap.m.Toolbar({
										// height: "auto",
										content: [
											new sap.m.Label({
												width: "31%",
												textAlign: "Left",
												text: "Lote : "
											}),
											new sap.m.Input({
												textAlign: "Left",
												id: "idDAMATLote",
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
												text: "Cultivo : "
											}),
											new sap.m.ComboBox({
												textAlign: "Left",
												id: "idDAMATCultivo",
												placeholder: "-Seleccione cultivo-",
												width: "auto",
												items: {
													path: "oModel>/cbxCultivo",
													template: new sap.ui.core.Item({
														key: "{oModel>CULTIVO}",
														text: "{oModel>DESCRIPCION}"
													})
												}
											})
											// new sap.m.Input({
											// 	textAlign: "Left",
											// 	id: "IdCultmaq",
											// 	fieldWidth: "auto"
											// })
										]
									}),
									new sap.m.Toolbar({
										// height: "auto",
										content: [
											new sap.m.Label({
												width: "31%",
												textAlign: "Left",
												text: "Variedad : "
											}),
											new sap.m.ComboBox({
												textAlign: "Left",
												id: "idDAMATVariedad",
												placeholder: "-Seleccione variedad-",
												width: "auto",
												items: {
													path: "oModel>/cbxVariedad",
													template: new sap.ui.core.Item({
														key: "{oModel>COD_VARIEDAD}",
														text: "{oModel>DESCRIP_VAR}"
													})
												}
											})
											// new sap.m.Input({
											// 	textAlign: "Left",
											// 	id: "IdVariedad",
											// 	fieldWidth: "auto"
											// })
										]
									}),
									new sap.m.Toolbar({
										// height: "auto",
										content: [
											new sap.m.Label({
												width: "31%",
												textAlign: "Left",
												text: "Campa�a : "
											}),
											new sap.m.ComboBox({
												textAlign: "Left",
												id: "idDAMATCampana",
												placeholder: "Seleccione campa�a ...",
												width: "auto",
												items: {
													path: "oModel>/cbxCampana",
													template: new sap.ui.core.Item({
														key: "{oModel>ID_CAMPANA}",
														text: "{oModel>DESCRIP_CAMPANA}"
													})
												}
											})
											// new sap.m.Input({
											// 	textAlign: "Left",
											// 	id: "IDcampmaterial",
											// 	fieldWidth: "auto"
											// })
										]
									}),
									new sap.m.Toolbar({
										// height: "auto",
										content: [
											new sap.m.Label({
												width: "31%",
												textAlign: "Left",
												text: "Orden CO : "
											}),
											new sap.m.Input({
												textAlign: "Left",
												id: "idDAMATOrden",
												fieldWidth: "auto"
											})
										]
									})

								]
							}),
							new sap.ui.layout.VerticalLayout({
								width: "100%",
								content: [
									new sap.m.Toolbar({
										// height: "auto",
										content: [
											new sap.m.Label({
												width: "31%",
												textAlign: "Left",
												text: "Fecha fin : "
											}),
											new sap.m.DatePicker({
												textAlign: "Left",
												id: "idDAMATFechaFin",
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
												text: "Etapa : "
											}),
											new sap.m.ComboBox({
												textAlign: "Left",
												id: "idDAMATEtapa",
												placeholder: "-Seleccione etapa-",
												width: "auto",
												items: {
													path: "oModel>/cbxEtapa",
													template: new sap.ui.core.Item({
														key: "{oModel>COD_ETAPA}",
														text: "{oModel>NOMB_ETAPA}"
													})
												}
											})
											// new sap.m.Input({
											// 	textAlign: "Left",
											// 	id: "idDAMATEtapa",
											// 	fieldWidth: "auto"
											// })
										]
									}),

									new sap.m.Toolbar({
										// height: "auto",
										content: [
											new sap.m.Label({
												width: "31%",
												textAlign: "Left",
												text: "Labor : "
											}),
											new sap.m.ComboBox({
												textAlign: "Left",
												id: "idDAMATLabor",
												placeholder: "-Seleccione labor-",
												width: "auto",
												items: {
													path: "oModel>/cbxLabor",
													template: new sap.ui.core.Item({
														key: "{oModel>COD_LABOR}",
														text: "{oModel>DESCRIP_LABOR}"
													})
												}
											})
											// new sap.m.Input({
											// 	textAlign: "Left",
											// 	id: "Idlabmaq",
											// 	fieldWidth: "auto"
											// })
										]
									}),
									new sap.m.Toolbar({
										// height: "auto",
										content: [
											new sap.m.Label({
												width: "31%",
												textAlign: "Left",
												text: "C�d. Material : "
											}),
											new sap.m.Input({
												textAlign: "Left",
												id: "idDAMATCodMat",
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
												text: "Cantidad : "
											}),
											new sap.m.Input({
												textAlign: "Left",
												id: "idDAMATCantidad",
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
												text: "Almac�n Rec. : "
											}),
											new sap.m.ComboBox({
												textAlign: "Left",
												id: "idDAMATAlmacen",
												placeholder: "-Seleccione almacen-",
												width: "auto",
												items: {
													path: "oModel>/cbxAlmacen",
													template: new sap.ui.core.Item({
														key: "{oModel>ID_ALMACEN}",
														text: "{oModel>DESCRIP_ALMACEN}"
													})
												}
											})
											// new sap.m.Input({
											// 	textAlign: "Left",
											// 	id: "idDAMATAlmacen",
											// 	fieldWidth: "auto"
											// })
										]
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
						vthis._oDialogAdMaterial.close();
						// oDialog1.destroy();
					}.bind(vthis)
				}),
				endButton: new Button({
					text: "Cancelar",
					icon: "sap-icon://decline",
					type: "Emphasized",
					press: function () {
						vthis._oDialogAdMaterial.close();
						// oDialog1.destroy();

					}.bind(vthis)
				})
			});
				this.getView().addDependent(this._oDialogAdMaterial);
			}
			this._oDialogAdMaterial.open();
		},
		_oDialogAdManoObra: null,
		btnadiconarmanoobra: function (){
			var vthis = this;
			if(!this._oDialogAdManoObra){
				
			}
		},
		
		_oDialogFiltro:null,
		btnfiltro: function () {
			var vthis = this;
			if (!this._oDialogFiltro) {
				this._oDialogFiltro = new sap.m.Dialog({
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
										new sap.m.ComboBox({
											textAlign: "Left",
											id: "idDFZona",
											placeholder: "Seleccione zona ...",
											width: "auto",
											items: {
												path: "oModel>/cbxZona",
												template: new sap.ui.core.Item({
													key: "{oModel>COD_ZONA}",
													text: "{oModel>DESCRIP_ZONA}"
												})
											}
										})
										// new sap.m.Input({
										// 	textAlign: "Left",
										// 	id: "BZona",
										// 	fieldWidth: "auto"
										// })
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
										new sap.m.ComboBox({
											textAlign: "Left",
											id: "idDFFundo",
											placeholder: "-Seleccione fundo-",
											width: "auto",
											items: {
												path: "oModel>/cbxFundo",
												template: new sap.ui.core.Item({
													key: "{oModel>COD_FUNDO}",
													text: "{oModel>DESCRIP_FUNDO}"
												})
											}
										})
										// new sap.m.Input({
										// 	textAlign: "Left",
										// 	id: "BFundo",
										// 	fieldWidth: "auto"
										// })
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
										new sap.m.ComboBox({
											textAlign: "Left",
											id: "idDFModulo",
											placeholder: "-Seleccione m�dulo-",
											width: "auto",
											items: {
												path: "oModel>/cbxModulo",
												template: new sap.ui.core.Item({
													key: "{oModel>COD_MODULO}",
													text: "{oModel>DESCRIP_MODULO}"
												})
											}
										})
										// new sap.m.Input({
										// 	textAlign: "Left",
										// 	id: "BModulo",
										// 	fieldWidth: "auto"
										// })
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
										new sap.m.ComboBox({
											textAlign: "Left",
											id: "idDFLabor",
											placeholder: "-Seleccione labor-",
											width: "auto",
											items: {
												path: "oModel>/cbxLabor",
												template: new sap.ui.core.Item({
													key: "{oModel>COD_LABOR}",
													text: "{oModel>DESCRIP_LABOR}"
												})
											}
										})
										// new sap.m.Input({
										// 	textAlign: "Left",
										// 	id: "IdLabor",
										// 	fieldWidth: "auto"
										// })
									]
								}),
								new sap.m.Toolbar({
									// width: "100%",
									// height: "auto",
									content: [
										new sap.m.Label({
											width: "31%",
											textAlign: "Left",
											text: "Fecha : "
										}),
										new sap.m.DatePicker({
											textAlign: "Left",
											id: "idDFfecha",
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
							vthis._oDialogFiltro.close();
							// oDialog1.destroy();
						}.bind(vthis)
					}),
					endButton: new Button({
						text: "Cancelar",
						icon: "sap-icon://decline",
						type: "Emphasized",
						press: function () {
							vthis._oDialogFiltro.close();
							// oDialog1.destroy();
	
						}.bind(vthis)
					})
				});
				this.getView().addDependent(this._oDialogFiltro);
			}

			this._oDialogFiltro.open();
		},
		btneditproglabor: function (oEvent) {
			var vthis = this;
			var tbl = vthis.getView().byId("table1");
			var oModelData = this.getView().getModel("oModel");
			var idx = tbl.getSelectedIndices();
			console.log("Index" + idx.length);
			// var sPath = tbl.getContextByIndex(idx);
			// var tpath = sPath.toString();

			if (idx.length !== 1) {
				funciones.fnMessageBoxInfo(vthis, "Debe seleccionar un registro.", "Registro de Labor");
			} else {
				console.log(oModelData.getProperty("/DataTabla/" + idx + "/"));
				var ID_PROG = oModelData.getProperty("/DataTabla/" + idx + "/ID_PROG");
				console.log(ID_PROG);
				// var iFechaIni = oModelData.getProperty("/DataTabla/" + idx + "/FECHA_INICIO")
				var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
					pattern: "dd/MM/yyyy"
				});

				var FechaInicio = dateFormat.format(oModelData.getProperty("/DataTabla/" + idx + "/FECHA_INICIO"));
				var FechaFin = dateFormat.format(oModelData.getProperty("/DataTabla/" + idx + "/FECHA_FIN"));
				// console.log(dateFormatted);
				var oDialog1 = new sap.m.Dialog({
					title: "Editar programaci�n labor",
					icon: "sap-icon://edit",
					type: "Message",
					state: "Success",
					draggable: true,
					resizable: true,
					horizontalScrolling: true,
					contentWidth: "auto",
					content: [
						new sap.ui.layout.HorizontalLayout({
							width: "100%",
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
													text: "Fecha Ini. : "
												}),
												new sap.m.DatePicker({
													textAlign: "Left",
													id: "Idfechainip",
													fieldWidth: "auto",
													valueFormat: "dd/MM/yyyy",
													displayFormat: "dd/MM/yyyy",
													value: FechaInicio
												})
											]
										}),

										new sap.m.Toolbar({
											// height: "auto",
											content: [
												new sap.m.Label({
													width: "31%",
													textAlign: "Left",
													text: "Nro Prog : "
												}),
												new sap.m.Input({
													textAlign: "Left",
													id: "IdNroProg",
													fieldWidth: "auto",
													value: oModelData.getProperty("/DataTabla/" + idx + "/NRO_PROG")
												})
											]
										}),
										new sap.m.Toolbar({
											// height: "auto",
											content: [
												new sap.m.Label({
													width: "31%",
													textAlign: "Left",
													text: "Modulo : "
												}),
												new sap.m.Input({
													textAlign: "Left",
													id: "IdModProg",
													fieldWidth: "auto",
													value: oModelData.getProperty("/DataTabla/" + idx + "/MODULO_FK")
												})
											]
										}),
										new sap.m.Toolbar({
											// height: "auto",
											content: [
												new sap.m.Label({
													width: "31%",
													textAlign: "Left",
													text: "Turno : "
												}),
												new sap.m.Input({
													textAlign: "Left",
													id: "IdTurnoP",
													fieldWidth: "auto",
													value: oModelData.getProperty("/DataTabla/" + idx + "/TURNO_FK")
												})
											]
										}),
										new sap.m.Toolbar({
											// height: "auto",
											content: [
												new sap.m.Label({
													width: "31%",
													textAlign: "Left",
													text: "Cultivo : "
												}),
												new sap.m.Input({
													textAlign: "Left",
													id: "IdCultprog",
													fieldWidth: "auto",
													value: oModelData.getProperty("/DataTabla/" + idx + "/CULTIVO_FK")
												})
											]
										}),
										new sap.m.Toolbar({
											// height: "auto",
											content: [
												new sap.m.Label({
													width: "31%",
													textAlign: "Left",
													text: "Variedad : "
												}),
												new sap.m.Input({
													textAlign: "Left",
													id: "IdVariedadprog",
													fieldWidth: "auto",
													value: oModelData.getProperty("/DataTabla/" + idx + "/VARIEDAD_FK")
												})
											]
										}),
										new sap.m.Toolbar({
											// height: "auto",
											content: [
												new sap.m.Label({
													width: "31%",
													textAlign: "Left",
													text: "Centro : "
												}),
												new sap.m.Input({
													textAlign: "Left",
													id: "IdCentroP",
													fieldWidth: "auto",
													value: oModelData.getProperty("/DataTabla/" + idx + "/CENTRO")
												})
											]
										}),
										// new sap.m.Toolbar({
										// 	// height: "auto",
										// 	content: [
										// 		new sap.m.Label({
										// 			width: "31%",
										// 			textAlign: "Left",
										// 			text: "Orden CO : "
										// 		}),
										// 		new sap.m.Input({
										// 			textAlign: "Left",
										// 			id: "IdOrdenmaterial",
										// 			fieldWidth: "auto"
										// 		})
										// 	]
										// })

									]
								}),
								new sap.ui.layout.VerticalLayout({
									width: "100%",
									content: [
										new sap.m.Toolbar({
											// height: "auto",
											content: [
												new sap.m.Label({
													width: "31%",
													textAlign: "Left",
													text: "Fecha fin : "
												}),
												new sap.m.DatePicker({
													textAlign: "Left",
													id: "Idfecfinp",
													fieldWidth: "auto",
													valueFormat: "dd/MM/yyyy",
													displayFormat: "dd/MM/yyyy",
													value: FechaFin
												})
											]
										}),

										new sap.m.Toolbar({
											// height: "auto",
											content: [
												new sap.m.Label({
													width: "31%",
													textAlign: "Left",
													text: "Etapa : "
												}),
												new sap.m.Input({
													textAlign: "Left",
													id: "IdEtapprog",
													fieldWidth: "auto",
													value: oModelData.getProperty("/DataTabla/" + idx + "/ETAPA_FK")
												})
											]
										}),

										new sap.m.Toolbar({
											// height: "auto",
											content: [
												new sap.m.Label({
													width: "31%",
													textAlign: "Left",
													text: "Labor : "
												}),
												new sap.m.Input({
													textAlign: "Left",
													id: "Idlabprog",
													fieldWidth: "auto",
													value: oModelData.getProperty("/DataTabla/" + idx + "/LABOR_FK")
												})
											]
										}),
										// new sap.m.Toolbar({
										// 	// height: "auto",
										// 	content: [
										// 		new sap.m.Label({
										// 			width: "31%",
										// 			textAlign: "Left",
										// 			text: "C�d. Material : "
										// 		}),
										// 		new sap.m.Input({
										// 			textAlign: "Left",
										// 			id: "Idcodmat",
										// 			fieldWidth: "auto"
										// 		})
										// 	]
										// }),
										// new sap.m.Toolbar({
										// 	// height: "auto",
										// 	content: [
										// 		new sap.m.Label({
										// 			width: "31%",
										// 			textAlign: "Left",
										// 			text: "Cantidad : "
										// 		}),
										// 		new sap.m.Input({
										// 			textAlign: "Left",
										// 			id: "Idcantidad",
										// 			fieldWidth: "auto"
										// 		})
										// 	]
										// }),
										// 	new sap.m.Toolbar({
										// 	// height: "auto",
										// 	content: [
										// 		new sap.m.Label({
										// 			width: "31%",
										// 			textAlign: "Left",
										// 			text: "Almac�n Rec. : "
										// 		}),
										// 		new sap.m.Input({
										// 			textAlign: "Left",
										// 			id: "Idalmacen",
										// 			fieldWidth: "auto"
										// 		})
										// 	]
										// })

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

							var oModelProg = this.getView().getModel();
							// var oModelData = this.getView().getModel("oModel");
							//var oModel = new sap.ui.model.json.JSONModel();
							oModelProg = this.getOwnerComponent().getModel();
							var FechaIniP = sap.ui.getCore().byId("Idfechainip").getValue();
							var fecI = new Date(FechaIniP.substring(6, 10), FechaIniP.substring(3, 5), FechaIniP.substring(0, 2));
							var NroProg = sap.ui.getCore().byId("IdNroProg").getValue();
							var Modulo = sap.ui.getCore().byId("IdModProg").getValue();
							var Cultivo = sap.ui.getCore().byId("IdCultprog").getValue();
							var Variedad = sap.ui.getCore().byId("IdVariedadprog").getValue();
							var FechaFinP = sap.ui.getCore().byId("Idfecfinp").getValue();
							var fecP = new Date(FechaFinP.substring(6, 10), FechaFinP.substring(3, 5), FechaFinP.substring(0, 2));
							var Etapa = sap.ui.getCore().byId("IdEtapprog").getValue();
							var Labor = sap.ui.getCore().byId("Idlabprog").getValue();
							var Turno = sap.ui.getCore().byId("IdTurnoP").getValue();
							var Centro = sap.ui.getCore().byId("IdCentroP").getValue();

							var llave = {};
							llave.NRO_PROG = NroProg;
							llave.FECHA_INICIO = fecI;
							llave.FECHA_FIN = fecP;
							llave.CULTIVO_FK = Cultivo;
							llave.MODULO_FK = Modulo;
							llave.ETAPA_FK = Etapa;
							llave.VARIEDAD_FK = Variedad;
							llave.LABOR_FK = Labor;
							llave.CENTRO = Centro;
							llave.TURNO_FK = Turno;
							var url = "/public/aa/smartagri/service/data.xsodata/";
							var oModelProgt = new sap.ui.model.odata.v2.ODataModel(url, true);
							oModelProgt.update("/prog_labor(" + ID_PROG + ")",
								llave, {
									success: function (data) {
										funciones.fnMessageBoxSuccess(vthis, "Se actualiz� correctamente.", "Registro de Labor");
										console.log("EXITO ACTUALIZ� ");
									}.bind(this),
									error: function (oError) {
										console.log("ERROR ACTUALIZ�");
										console.log(oError);
									}.bind(this)

								});

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
			}

		},
		btndeleteLabor: function () {
			var vthis = this;
			var tbl = vthis.getView().byId("table1");
			var oModelData = this.getView().getModel("oModel");
			var idx = tbl.getSelectedIndices();
			console.log("Index" + idx.length);

			if (idx.length !== 1) {
				funciones.fnMessageBoxInfo(vthis, "Debe seleccionar un registro.", "Registro de Labor");
			} else {
				console.log(oModelData.getProperty("/DataTabla/" + idx + "/"));
				var ID_PROG = oModelData.getProperty("/DataTabla/" + idx + "/ID_PROG");
				console.log(ID_PROG);
				// var iFechaIni = oModelData.getProperty("/DataTabla/" + idx + "/FECHA_INICIO")
				var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
					pattern: "dd/MM/yyyy"
				});
				var url = "/public/aa/smartagri/service/data.xsodata/";
				var oModel = new sap.ui.model.odata.v2.ODataModel(url, true);
				oModel.remove("/prog_labor(" + ID_PROG + ")", {
					success: function (data) {
						funciones.fnMessageBoxSuccess(vthis, "Se elimin� correctamente.", "Registro de Labor");
					}.bind(this),
					error: function (data) {
						console.log("ERROR ACTUALIZ�");
						console.log(oError);
					}.bind(this)
				});
			}
		},

		_oDialog: null,
		btnañadirlabor: function () {
			var vthis = this;
			var oModelG = this.getView().getModel("oModel");
			if (!vthis._oDialog) {
				vthis._oDialog = new sap.m.Dialog({
					title: "Adicionar Labor",
					// icon: "sap-icon://add-equipment",
					type: "Message",
					state: "Success",
					draggable: true,
					resizable: true,
					horizontalScrolling: true,
					contentWidth: "auto",
					content: [
						new sap.ui.layout.HorizontalLayout({
							width: "100%",
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
													text: "Nro. Prog. : "
												}),
												new sap.m.Input({
													textAlign: "Left",
													id: "idDALProg",
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
													text: "Campa�a : "
												}),
												new sap.m.ComboBox({
													textAlign: "Left",
													id: "idDALCampana",
													placeholder: "Seleccione campa�a ...",
													width: "auto",
													items: {
														path: "oModel>/cbxCampana",
														template: new sap.ui.core.Item({
															key: "{oModel>ID_CAMPANA}",
															text: "{oModel>DESCRIP_CAMPANA}"
														})
													}
												})
											]
										}),
										new sap.m.Toolbar({
											// height: "auto",
											content: [
												new sap.m.Label({
													width: "31%",
													textAlign: "Left",
													text: "Cultivo : "
												}),
												new sap.m.ComboBox({
													textAlign: "Left",
													id: "idDALCultivo",
													placeholder: "-Seleccione cultivo-",
													width: "auto",
													items: {
														path: "oModel>/cbxCultivo",
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
													width: "31%",
													textAlign: "Left",
													text: "Variedad : "
												}),
												new sap.m.ComboBox({
													textAlign: "Left",
													id: "idDALVariedad",
													placeholder: "-Seleccione variedad-",
													width: "auto",
													items: {
														path: "oModel>/cbxVariedad",
														template: new sap.ui.core.Item({
															key: "{oModel>COD_VARIEDAD}",
															text: "{oModel>DESCRIP_VAR}"
														})
													}
												})
											]
										}),
										new sap.m.Toolbar({
											// height: "auto",
											content: [
												new sap.m.Label({
													width: "31%",
													textAlign: "Left",
													text: "Etapa : "
												}),
												new sap.m.ComboBox({
													textAlign: "Left",
													id: "idDALEtapa",
													placeholder: "-Seleccione etapa-",
													width: "auto",
													items: {
														path: "oModel>/cbxEtapa",
														template: new sap.ui.core.Item({
															key: "{oModel>COD_ETAPA}",
															text: "{oModel>NOMB_ETAPA}"
														})
													}
												})
											]
										}),

										new sap.m.Toolbar({
											// height: "auto",
											content: [
												new sap.m.Label({
													width: "31%",
													textAlign: "Left",
													text: "Labor : "
												}),
												new sap.m.ComboBox({
													textAlign: "Left",
													id: "idDALLabor",
													placeholder: "-Seleccione labor-",
													width: "auto",
													items: {
														path: "oModel>/cbxLabor",
														template: new sap.ui.core.Item({
															key: "{oModel>COD_LABOR}",
															text: "{oModel>DESCRIP_LABOR}"
														})
													}
												})
											]
										}),
										new sap.m.Toolbar({
											// height: "auto",
											content: [
												new sap.m.Label({
													width: "31%",
													textAlign: "Left",
													text: "Avance : "
												}),
												new sap.m.Input({
													textAlign: "Left",
													id: "idDALAvance",
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
													text: "Unidad : "
												}),
												new sap.m.Input({
													textAlign: "Left",
													id: "idDALUnidad",
													fieldWidth: "auto"
												})
											]
										})

									]
								}),
								new sap.ui.layout.VerticalLayout({
									width: "100%",
									content: [
										new sap.m.Toolbar({
											// height: "auto",
											content: [
												new sap.m.Label({
													width: "31%",
													textAlign: "Left",
													text: "Centro : "
												}),
												new sap.m.ComboBox({
													textAlign: "Left",
													id: "idDALCentro",
													placeholder: "-Seleccione centro-",
													width: "auto",
													items: {
														path: "oModel>/cbxCentro",
														template: new sap.ui.core.Item({
															key: "{oModel>COD_CENTRO}",
															text: "{oModel>COD_CENTRO}"
														})
													}
												})
											]
										}),
										new sap.m.Toolbar({
											// height: "auto",
											content: [
												new sap.m.Label({
													width: "31%",
													textAlign: "Left",
													text: "Zona : "
												}),
												new sap.m.ComboBox({
													textAlign: "Left",
													id: "idDALZona",
													placeholder: "-Seleccione zona-",
													width: "auto",
													items: {
														path: "oModel>/cbxZona",
														template: new sap.ui.core.Item({
															key: "{oModel>COD_ZONA}",
															text: "{oModel>DESCRIP_ZONA}"
														})
													}
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
												new sap.m.ComboBox({
													textAlign: "Left",
													id: "idDALFundo",
													placeholder: "-Seleccione fundo-",
													width: "auto",
													items: {
														path: "oModel>/cbxFundo",
														template: new sap.ui.core.Item({
															key: "{oModel>COD_FUNDO}",
															text: "{oModel>DESCRIP_FUNDO}"
														})
													}
												})
											]
										}),
										new sap.m.Toolbar({
											// height: "auto",
											content: [
												new sap.m.Label({
													width: "31%",
													textAlign: "Left",
													text: "Mdulo : "
												}),
												new sap.m.ComboBox({
													textAlign: "Left",
													id: "idDALModulo",
													placeholder: "-Seleccione m�dulo-",
													width: "auto",
													items: {
														path: "oModel>/cbxModulo",
														template: new sap.ui.core.Item({
															key: "{oModel>COD_MODULO}",
															text: "{oModel>DESCRIP_MODULO}"
														})
													}
												})
											]
										}),
										new sap.m.Toolbar({
											// height: "auto",
											content: [
												new sap.m.Label({
													width: "31%",
													textAlign: "Left",
													text: "Fecha Ini. : "
												}),
												new sap.m.DatePicker({
													textAlign: "Left",
													id: "idDALFechaIni",
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
													text: "Fecha fin : "
												}),
												new sap.m.DatePicker({
													textAlign: "Left",
													id: "idDALFechaFin",
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
													text: "Observaciones : "
												}),
												new sap.m.TextArea({
													id: "idDALObservaciones",
													// fieldWidth: "auto"
												})
											]
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
							var vthis = this;
							var oModelGlobalData = this.getView().getModel("oModel");
							var oModelmax = this.getOwnerComponent().getModel();
							oModelmax.read("/maxprogParam(ID_PROG=1)/Results?$format=json", {
								success: function (Odata, response) {
									console.log(response.data.results);
									var MAXIMO = response.data.results[0].ID_PROG;
									var IdProg = MAXIMO + 1;
									var cProgramacion = sap.ui.getCore().byId("idDALProg").getValue();
									var cCampana = sap.ui.getCore().byId("idDALCampana").getSelectedKey();
									var cCultivo = sap.ui.getCore().byId("idDALCultivo").getSelectedKey();
									var cVariedad = sap.ui.getCore().byId("idDALVariedad").getSelectedKey();
									var cEtapa = sap.ui.getCore().byId("idDALEtapa").getSelectedKey();
									var cLabor = sap.ui.getCore().byId("idDALLabor").getSelectedKey();
									var dFechaIni = sap.ui.getCore().byId("idDALFechaIni").getValue();
									dFechaIni = new Date(dFechaIni.substring(6, 10), dFechaIni.substring(3, 5), dFechaIni.substring(0, 2));
									var dFechaFin = sap.ui.getCore().byId("idDALFechaFin").getValue();
									dFechaFin = new Date(dFechaFin.substring(6, 10), dFechaFin.substring(3, 5), dFechaFin.substring(0, 2));
									var cModulo = sap.ui.getCore().byId("idDALModulo").getSelectedKey();
									var cTurno = sap.ui.getCore().byId("idDALTurno").getValue();
									var cAvance = sap.ui.getCore().byId("idDALAvance").getValue();
									var cUnidad = sap.ui.getCore().byId("idDALUnidad").getValue();
									var cObservaciones = sap.ui.getCore().byId("idObservaciones").getValue();
									var oObject = {};
									oObject.ID_PROG = IdProg;
									oObject.NRO_PROG = cProgramacion;
									oObject.CAMAPANA_FK = cCampana;
									oObject.CULTIVO_FK = cCultivo;
									oObject.VARIEDAD_FK = cVariedad;
									oObject.ETAPA_FK = cEtapa;
									oObject.LABOR_FK = cLabor;
									oObject.FECHA_INICIO = dFechaIni;
									oObject.FECHA_FIN = dFechaFin;
									oObject.MODULO_FK = cModulo;
									oObject.TURNO_FK = cTurno;
									oObject.AVANCE = cAvance;
									oObject.UNIDAD = cUnidad;
									oObject.OBSERVACIONES = cObservaciones;
									console.log(oObject);

								},
								error: function (oError) {}
							});

							vthis._oDialog.close();
						}.bind(vthis)
					}),
					endButton: new Button({
						text: "Cancelar",
						icon: "sap-icon://decline",
						type: "Emphasized",
						press: function () {
							vthis._oDialog.close();
						}.bind(vthis)
					})
				});
				vthis.getView().addDependent(vthis._oDialog);
			}
			vthis._oDialog.open();

		}

		// oModel.remove("/prog_labor(" + ID_PROG + ")", {
		// 	success: function (data) {
		// 		funciones.fnMessageBoxSuccess(vthis, "Se elimin� correctamente.", "Registro de Labor");
		// 	},
		// 	error: function (data) {
		// 		console.log("ERROR ACTUALIZ�");
		// 		console.log(oError);
		// 	}
		// });
		//TABLA EVENTO
		// fnSeleccionFila: function(oEvent){
		// 	// console.log(oEvent);	
		// },

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf smartagri.Proyecto_SmartAgri.view.vista_laborcampo
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf smartagri.Proyecto_SmartAgri.view.vista_laborcampo
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf smartagri.Proyecto_SmartAgri.view.vista_laborcampo
		 */
		//	onExit: function() {
		//
		//	}

	});

});