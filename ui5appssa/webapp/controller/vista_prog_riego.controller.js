sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"./funciones"
], function (Controller, funciones) {
	"use strict";

	return Controller.extend("nsa.ui5appssa.controller.vista_prog_riego", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf smartagri.Proyecto_SmartAgri.view.vista_prog_riego
		 */
		 	_file: "",
		 fileGlobal: null,
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("vista_prog_riego").attachMatched(this._onRouteMatched, this);
		},
		getSplitAppObj: function () {

			var result = this.byId("Splitadministrar");
			if (!result) {
				jQuery.sap.log.info("SplitApp object can't be found");
			}
			return result;
		},
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		btnBackMenu: function () {
			this.getRouter().navTo("menu");
		},

		_onRouteMatched: function (oEvent) {
			this.fnllenarList();
			var oModel = this.getView().getModel("oModel");
			console.log(oModel.getProperty("/"));
			var oObject = {};
			oModel.setProperty("/VProg_Detalle", oObject);
			var arTablaF = oModel.getProperty("/tblprogfertilizacion");
			arTablaF.forEach(function (element) {
				element.radiobutton = 1;
				element.estado_lista = "Fertilizaci�n";
				element.icono = "sap-icon://custonfont/fertilizer-1";
			});
			var arTablaR = oModel.getProperty("/tblprogriego");
			arTablaR.forEach(function (element) {
				element.radiobutton = 0;
				element.estado_lista = "Riego";
				element.icono = "sap-icon://custonfont/irrigation-2";
			});
			var aArrayT = arTablaR.concat(arTablaF);
			oModel.setProperty("/tblprog", aArrayT);
		},
		fnllenarList: function () {
			var oModel = this.getView().getModel("oModel");
			var xData = {};
			var url = "/public/aa/smartagri/service/data.xsodata/";
			var oModelData = new sap.ui.model.odata.v2.ODataModel(url, true);

			var texto = "/public/aa/smartagri/service/data.xsodata/prog_fertilizacion";
			$.ajax(texto, {
				type: 'GET',
				async: false,
				dataType: "json",
				beforeSend: function (xhr) {
					xhr.setRequestHeader("X-CSRF-Token", "Fetch");
				},
				complete: function (xhr) {},
				success: function (response) {
					oModel.setProperty("/tblprogfertilizacion", response.d.results);
					// var length = oModel.getProperty("/tblprogfertilizacion/length");
					// for (var i = 0; i < length; i++) {
						
					// }
				},
				error: function (response) {
					console.log(response);
				}
			});
			var texto1 = "/public/aa/smartagri/service/data.xsodata/prog_riego";
			$.ajax(texto1, {
				type: 'GET',
				async: false,
				dataType: "json",
				beforeSend: function (xhr) {
					xhr.setRequestHeader("X-CSRF-Token", "Fetch");
				},
				complete: function (xhr) {},
				success: function (response) {
					oModel.setProperty("/tblprogriego", response.d.results);
					
					// var length = oModel.getProperty("/tblprogriego/length");
					// for (var i = 0; i < length; i++) {
						
					// }
				},
				error: function (response) {
					console.log(response);
				}
			});
		},
		onListItemPress: function (oEvent){
			var oModel = this.getView().getModel("oModel");
			var sToPageId = oEvent.getSource().data("to");
			oModel.setProperty("/key_nro_programacion", oEvent.getSource().data("key"));
			var sPath = oEvent.getSource().getBindingContext("oModel").getPath();
			var nro_prog = oModel.getProperty(sPath + "/NRO_PROG");
			var texto = "/public/aa/smartagri/service/data.xsodata/prog_riego_det?$filter=NRO_PROG eq '" + nro_prog + "'";
			console.log(texto);
			$.ajax(texto, {
				type: 'GET',
				dataType: "json",
				async: false,
				beforeSend: function (xhr) {
					xhr.setRequestHeader("X-CSRF-Token", "Fetch");
				},
				complete: function (xhr) {},
				success: function (response) {
					console.log(response);
					oModel.setProperty("/progriegodet",response.d.results);
				},
				error: function (response) {}
			});
			var zona = oModel.getProperty(sPath + "/ZONA");
			var fundo = oModel.getProperty(sPath + "/FUNDO");
			var modulo = oModel.getProperty(sPath + "/MODULO");
			var cultivo = oModel.getProperty(sPath + "/CULTIVO");
			var semana = oModel.getProperty(sPath + "/SEMANA");
			var labor = oModel.getProperty(sPath + "/LABOR");
			var estacion = oModel.getProperty(sPath + "/ESTACION");
			var radioButton = oModel.getProperty(sPath + "/radiobutton");
			var oObject = {};
			oModel.setProperty("/VProg_Detalle", oObject);
			oModel.setProperty("/VProg_Detalle/NRO_PROG", nro_prog);
			oModel.setProperty("/VProg_Detalle/ZONA", zona);
			oModel.setProperty("/VProg_Detalle/FUNDO", fundo);
			oModel.setProperty("/VProg_Detalle/MODULO", modulo);
			oModel.setProperty("/VProg_Detalle/CULTIVO", cultivo);
			oModel.setProperty("/VProg_Detalle/SEMANA", semana);
			oModel.setProperty("/VProg_Detalle/COD_LABOR", labor);
			oModel.setProperty("/VProg_Detalle/ESTACION", estacion);
			switch(radioButton){
				case 0:
					this.fnTabla_1();
					
					// console.log(texto);
					
						// var aResultado = aResponse.filter(item => item.NRO_PROG == nro_prog);
						
					break;
				case 1:
					this.fnTabla_2();
					break;
			}
			this.getSplitAppObj().to(this.createId("detailDetail"));
			
		},
		change: function(e){
			sap.ui.getCore()._file = e.getParameter("files") && e.getParameter("files")[0];
		},
		fnFile: function (){
			var varNameXML = this.getView().byId("idtxt").getValue();
				var file = sap.ui.getCore()._file;
				var linea = [];
				 var linea2 = [];
				 var strCSV = [];
				 var res=[];
	           if(file && window.FileReader){  
	              var reader = new FileReader();  
	              var that = this;  
	              reader.onload = function(evn) {  
	                strCSV= evn.target.result; //string in CSV 
	                  console.log(strCSV);
	                res = strCSV.split("\n");
	                console.log(res);
	                // console.log(res.length);
	                // for(var i=0;i<res.length;i++){
	                // 	linea = res[i].split("\t");
	                // 	console.log(linea);
	                // 	console.log(linea.length);
	                // 	linea2.push(linea);
	                // 	// var oObject = {};
	                // 	// var objeto = Object.fromEntries(linea);
	                // 	// var objeto = Object.assign({}, linea); 
	                // 		// var objeto =JSON.stringify(linea);
	                // 		// console.log(objeto);
	                // 	// for(var j=0;j<linea.length;j++){
	                // 	// 	var oObject = linea[j];
	                // 	// 	linea2.push(oObject);
	                // 	// }
	                // }
	                	// oModel.setProperty("/tablatxt/",linea2);
	                	// console.log(oModel.getProperty("/tablatxt"));
	                };
	              reader.readAsText(file);  
	            }
	            return res;
		},
		onpressGuardarRiego: function () {
				var oModel = this.getView().getModel("oModel");
				var vthis = this;
				var nro_prog = this.byId("li_prog").getValue();
				var zona = this.byId("id_zona").getSelectedKey();
				var fundo = this.byId("id_fundo").getSelectedKey();
				var modulo = this.byId("id_modulo").getSelectedKey();
				var cultivo = this.byId("id_cultivo").getSelectedKey();
				var semana = this.byId("li_semana").getValue();
				var labor = this.byId("id_labor").getSelectedKey();
				var estacion = this.byId("li_estacion").getValue();
				var Index = this.byId("rbg4").getSelectedIndex();
				var Index2 = this.byId("rbg5").getSelectedIndex();
				console.log(Index);
				var file = sap.ui.getCore()._file;
				var linea = [];
				 var linea2 = [];
				 var linea3 = [];
				 var strCSV = [];
				 var res=[];
				 var oObject = {};
				 oObject.NRO_PROG= nro_prog;
				 oObject.ZONA= zona;
				 oObject.FUNDO= fundo;
				 oObject.MODULO= modulo;
				 oObject.CULTIVO = cultivo;
				 oObject.SEMANA = semana;
				 oObject.COD_LABOR= labor;
				 oObject.ESTACION= estacion;
				 oModel.setProperty("/VProg_Detalle",oObject);
	           if(file && window.FileReader){  
	              var reader = new FileReader();  
	              var that = this;  
	              reader.onload = function(evn) {  
	                strCSV= evn.target.result; //string in CSV 
	                res = strCSV.split("\n");
						// var res1 = res.replace(/X/gi, "0.00");
	                var string = "";
	                var string2 = "";
                	switch(Index){
						case 0:
							// this.fnTabla_1();
							oModel.setProperty("/tblProgTitle","Carga prog. de riego");
							vthis.getView().byId("btnriego").setVisible(true);
						    for(var i=0;i<res.length;i++){
			                	linea = res[i].split("\t");
			                	console.log(linea);
			                	// linea2.push(linea);
			                	// var objeto = Object.fromEntries(linea);
			                	// var objeto = Object.assign({}, linea); 
			                		// var objeto =JSON.stringify(linea);
			                	string = '{"COLUMNA_0":"Sin programar",';
			                	for(var j=0;j<linea.length;j++){
			                		string = string + '"COLUMNA_'+(j+1)+'":"'+linea[j].trim()+'"';
			                		if(j != linea.length-1){
			                			string = string + ',';
			                		}
			                		// aObject = linea[j];
			                		// linea2.push(aObject);
			                	}
			                	if(linea.length == 13){
			                		string = string + ',"COLUMNA_14":"0.00"';
			                	}
			                	string = string + '}';
			                	console.log(string);
			                	string2 = string.replace(/X/gi, "0.00");
			                	console.log(string2);
			                	var obj =JSON.parse(string);
			                	var obj1 =JSON.parse(string2);
			                	linea2.push(obj);
			                	linea3.push(obj1);
			                	
			                }
			                	oModel.setProperty("/tblDetalle2",linea2);
			                	console.log(oModel.getProperty("/tblDetalle2"));
			                	oModel.setProperty("/tblDetalle",linea3);
			                	console.log(oModel.getProperty("/tblDetalle"));
			                	this.fnTextColumntable1();
							break;
						case 1:
							oModel.setProperty("/tblProgTitle","Carga prog. de fertilizaci�n");
							vthis.getView().byId("btnriego").setVisible(false);
							// this.fnTabla_2();
							 for(var i=0;i<res.length;i++){
			                	linea = res[i].split("\t");
			                	console.log(linea);
			                	string = '{"COLUMNA_0":"Sin programar",';
			                	for(var j=0;j<linea.length;j++){
			                		string = string + '"COLUMNA_'+(j+1)+'":"'+linea[j].trim()+'"';
			                		if(j != linea.length-1){
			                			string = string + ',';
			                		}
			                	}
			                	string = string + '}';
			                	console.log(string);
			                	var obj =JSON.parse(string);
			                	linea2.push(obj);
			                }
								oModel.setProperty("/tblDetalle",linea2);
			                	console.log(oModel.getProperty("/tblDetalle"));
			                	this.fnTextColumntable2();
							break;
					}
	                
	                };
	              reader.readAsText(file);  
	            }
				
			
				this.getSplitAppObj().to(this.createId("detailDetail"));
		},
		onpressprogdiaria: function (){
			var oModel = this.getView().getModel("oModel");
			console.log(oModel.getProperty("/tblDetalle2"));
			for(var i=0;i<oModel.getProperty("/tblDetalle2/length");i++){
				var hectarea = parseFloat(oModel.getProperty("/tblDetalle2/" +i + "/COLUMNA_2"));
				var lamina = parseFloat(oModel.getProperty("/tblDetalle2/" +i + "/COLUMNA_7"));
				var result = hectarea * lamina;
				console.log(result);
				for(var c=0;c<15;c++){
					console.log(oModel.getProperty("/tblDetalle2/"+i+"/COLUMNA_"+c+""));
					if(oModel.getProperty("/tblDetalle2/"+i+"/COLUMNA_"+c+"") == 'X'){
        				oModel.setProperty("/tblDetalle2/"+i+"/COLUMNA_"+c+"",result);
        			}
				}
			}
			oModel.setProperty("/tblDetalle",oModel.getProperty("/tblDetalle2"));
			console.log(oModel.getProperty("/tblDetalle2"));
		},
		fnTabla_1: function(){
			var oModel = this.getView().getModel("oModel");
			this.getView().byId("btnriego").setVisible(false);
			oModel.setProperty("/tblProgTitle","Carga prog. de riego");
			var aResultado = [];
			var oObject = {};
			for(var i=0; i<oModel.getProperty("/progriegodet/length"); i++){
				oObject.COLUMNA_0 = oModel.getProperty("/progriegodet/"+i+"/ESTADO");
				oObject.COLUMNA_1 = oModel.getProperty("/progriegodet/"+i+"/TURNO");
				oObject.COLUMNA_2 = oModel.getProperty("/progriegodet/"+i+"/HECTAREA");
				oObject.COLUMNA_3 = oModel.getProperty("/progriegodet/"+i+"/KC");
				oObject.COLUMNA_4 = oModel.getProperty("/progriegodet/"+i+"/ETO");
				oObject.COLUMNA_5 = oModel.getProperty("/progriegodet/"+i+"/EFICIENCIA");
				oObject.COLUMNA_6 = oModel.getProperty("/progriegodet/"+i+"/CONSTANTE");
				oObject.COLUMNA_7 = oModel.getProperty("/progriegodet/"+i+"/LAMINA");
				oObject.COLUMNA_8 = oModel.getProperty("/progriegodet/"+i+"/LUNES");
				oObject.COLUMNA_9 = oModel.getProperty("/progriegodet/"+i+"/MARTES");
				oObject.COLUMNA_10 = oModel.getProperty("/progriegodet/"+i+"/MIERCOLES");
				oObject.COLUMNA_11 = oModel.getProperty("/progriegodet/"+i+"/JUEVES");
				oObject.COLUMNA_12 = oModel.getProperty("/progriegodet/"+i+"/VIERNES");
				oObject.COLUMNA_13 = oModel.getProperty("/progriegodet/"+i+"/SABADO");
				oObject.COLUMNA_14 = oModel.getProperty("/progriegodet/"+i+"/DOMINGO");
			}
			aResultado.push(oObject);
			oModel.setProperty("/tblDetalle", aResultado);
				
			this.fnTextColumntable1(this);
			
		},
		fnTextColumntable1: function (that){
			that.getView().byId("id_field_T1").setText("Estado");
			that.getView().byId("id_field_T2").setText("Turno");
			that.getView().byId("id_field_T3").setText("Hect�reas");
			that.getView().byId("id_field_T4").setText("Kc");
			that.getView().byId("id_field_T5").setText("ETO prom.");
			that.getView().byId("id_field_T6").setText("Eficiencia");
			that.getView().byId("id_field_T7").setText("Constante");
			that.getView().byId("id_field_T8").setText("L�mina");
			that.getView().byId("id_field_T9").setText("Lunes");
			that.getView().byId("id_field_T10").setText("Martes");
			that.getView().byId("id_field_T11").setText("Mi�rcoles");
			that.getView().byId("id_field_T12").setText("Jueves");
			that.getView().byId("id_field_T13").setText("Viernes");
			that.getView().byId("id_field_T14").setText("S�bado");
			that.getView().byId("id_field_T15").setText("Domingo");
			
			for(var k = 1; k <= 15; k++){
				if(k > 15){
					that.getView().byId("id_field_C"+k).setVisible(false);
				}else{
					that.getView().byId("id_field_C"+k).setVisible(true);
				}
			}
		},
		fnTextColumntable2: function (that){
			that.getView().byId("id_field_T1").setText("Estado");
			that.getView().byId("id_field_T2").setText("Turno");
			that.getView().byId("id_field_T3").setText("Hect�reas");
			that.getView().byId("id_field_T4").setText("Almac�n");
			that.getView().byId("id_field_T5").setText("C�digo soluci�n");
			that.getView().byId("id_field_T6").setText("Litros de soluci�n");
			for(var k = 1; k <= 15; k++){
				if(k > 6){
					that.getView().byId("id_field_C"+k).setVisible(false);
				}else{
					that.getView().byId("id_field_C"+k).setVisible(true);
				}
			}
		},
		fnTabla_2: function(){
			var oModel = this.getView().getModel("oModel");
			oModel.setProperty("/tblProgTitle","Carga prog. de fertilizaci�n");
			var aResultado = [];
			var oObject = {};
			// var linea = [];
			
			for(var i=0; i<oModel.getProperty("/tblprogfertilizacion/length"); i++){
				oObject.COLUMNA_0 = oModel.getProperty("/tblprogfertilizacion/"+i+"/ESTADO");
				oObject.COLUMNA_1 = oModel.getProperty("/tblprogfertilizacion/"+i+"/TURNO");
				oObject.COLUMNA_2 = oModel.getProperty("/tblprogfertilizacion/"+i+"/HECTAREA");
				oObject.COLUMNA_3 = oModel.getProperty("/tblprogfertilizacion/"+i+"/ALMACEN");
				oObject.COLUMNA_4 = oModel.getProperty("/tblprogfertilizacion/"+i+"/COD_SOLUCION");
				oObject.COLUMNA_5 = oModel.getProperty("/tblprogfertilizacion/"+i+"/LITRO_SOLUCION");
			}
			aResultado.push(oObject);
			oModel.setProperty("/tblDetalle", aResultado);
			this.fnTextColumntable2(this);
			
		
		},
		onpressagregarprog: function (){
			var vthis = this;
			var oModel = this.getView().getModel("oModel");
			var oObject = {};
			// oObject.NRO_PROG = oModel.getProperty("/VProg_Detalle/NRO_PROG");
			// oObject.ZONA = oModel.getProperty("/VProg_Detalle/ZONA");
			// oObject.FUNDO = oModel.getProperty("/VProg_Detalle/FUNDO");
			// oObject.MODULO = oModel.getProperty("/VProg_Detalle/MODULO");
			// oObject.CULTIVO = oModel.getProperty("/VProg_Detalle/CULTIVO");
			// oObject.SEMANA = oModel.getProperty("/VProg_Detalle/SEMANA");
			// oObject.ANIO = "";
			// oObject.LABOR = oModel.getProperty("/VProg_Detalle/LABOR");
			// oObject.ESTACION = oModel.getProperty("/VProg_Detalle/ESTACION");
			// oObject.RUTA = "";
			oObject.NRO_PROG = "2000000008";
			oObject.ZONA = "U01";
			oObject.FUNDO = "F10";
			oObject.MODULO = "M02";
			oObject.CULTIVO = "MG";
			oObject.SEMANA = "14";
			oObject.ANIO = "";
			oObject.LABOR = "";
			oObject.ESTACION = "ST0006";
			oObject.RUTA = "";
			console.log(oObject);
			var url = "/public/aa/smartagri/service/data.xsodata";
			var oDataModel = new sap.ui.model.odata.v2.ODataModel(url, true);
			// var url1 = "/prog_riego";
			// oDataModel.create(url1,
			// oObject, {
			// 	success: function (data) {
						for(var i=0;i<oModel.getProperty("/tblDetalle/length");i++){
						var oObject1 = {};
						oObject1.NRO_PROG = oModel.getProperty("/VProg_Detalle/NRO_PROG");
						oObject1.PROG_DET = i+1 + '';
						oObject1.ESTADO =  oModel.getProperty("/tblDetalle/"+i+"/COLUMNA_0");
						oObject1.TURNO =  oModel.getProperty("/tblDetalle/"+i+"/COLUMNA_1");
						oObject1.HECTAREA = parseFloat(oModel.getProperty("/tblDetalle/"+i+"/COLUMNA_2")).toFixed(2);
						oObject1.KC = parseFloat(oModel.getProperty("/tblDetalle/"+i+"/COLUMNA_3")).toFixed(2);
						oObject1.ETO = parseFloat(oModel.getProperty("/tblDetalle/"+i+"/COLUMNA_4")).toFixed(2);
						oObject1.EFICIENCIA = parseFloat(oModel.getProperty("/tblDetalle/"+i+"/COLUMNA_5")).toFixed(2);
						oObject1.CONSTANTE = parseInt(oModel.getProperty("/tblDetalle/"+i+"/COLUMNA_6"));
						oObject1.LAMINA =  parseFloat(oModel.getProperty("/tblDetalle/"+i+"/COLUMNA_7")).toFixed(2);
						oObject1.LUNES =  parseFloat(oModel.getProperty("/tblDetalle/"+i+"/COLUMNA_8")).toFixed(2);
						oObject1.MARTES = parseFloat(oModel.getProperty("/tblDetalle/"+i+"/COLUMNA_9")).toFixed(2);
						oObject1.MIERCOLES = parseFloat(oModel.getProperty("/tblDetalle/"+i+"/COLUMNA_10")).toFixed(2);
						oObject1.JUEVES = parseFloat(oModel.getProperty("/tblDetalle/"+i+"/COLUMNA_11")).toFixed(2);
						oObject1.VIERNES = parseFloat(oModel.getProperty("/tblDetalle/"+i+"/COLUMNA_12")).toFixed(2);
						oObject1.SABADO = parseFloat(oModel.getProperty("/tblDetalle/"+i+"/COLUMNA_13")).toFixed(2);
						oObject1.DOMINGO = parseFloat(oModel.getProperty("/tblDetalle/"+i+"/COLUMNA_14")).toFixed(2);
						console.log(oObject1);
						var url2 = "/prog_riego_det";
						oDataModel.create(url2,
						oObject1, {
							success: function (data) {
								
							}.bind(this),
							error: function (oError) {}.bind(this)
						});
					}
					funciones.fnMessageBoxSuccess(vthis, "Registro guardado con �xito.", "Info");
					
			// 	}.bind(this),
			// 	error: function (oError) {}.bind(this)
			// });
		
		},
		onPressAdd: function(){
			this.getSplitAppObj().to(this.createId("detail2"));
		}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf smartagri.Proyecto_SmartAgri.view.vista_prog_riego
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf smartagri.Proyecto_SmartAgri.view.vista_prog_riego
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf smartagri.Proyecto_SmartAgri.view.vista_prog_riego
		 */
		//	onExit: function() {
		//
		//	}

	});

});