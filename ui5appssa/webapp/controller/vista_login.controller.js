sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("nsa.ui5appssa.controller.vista_login", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf smartagri.Proyecto_SmartAgri.view.vista_login
		 */
		onInit: function () {
			this.getView().byId("T_Smartagri").addStyleClass("T_Smartagri");
			this.getView().byId("VBox_1").addStyleClass("VBox_1");
			// this.getView().byId("VBox_Link").addStyleClass("VBox_Link");
			this.getView().byId("id_btnIngresar").addStyleClass("id_btnIngresar");
			// this.getView().byId("bg-imagen").addStyleClass("bg-imagen");
			this.getView().byId("image_bg").addStyleClass("image_bg_menu");
			this.getView().byId("bg-imagen-sap").addStyleClass("bg-imagen-sap");
			this.getView().byId("VBox_3").addStyleClass("VBox_3");
			this.getView().byId("id_VerticalP").addStyleClass("id_VerticalP");
			this.getView().byId("id_Usuario").addStyleClass("id_Usuario");
			this.getView().byId("image_smartgri").addStyleClass("image_smartgri");
		
		var oModel = new sap.ui.model.json.JSONModel();
			var sHeaders = {
				"Content-Type": "application/json",
				"Accept": "application/json",
			};
			oModel.loadData("/sf-dest/odata/v2/FOLegalEntityLocalUSA", null, true, "GET", null, false, sHeaders);
			oModel.attachRequestCompleted(function(oEvent){
			    var oData = oEvent.getSource().oData;
			    console.log(oData);
			});
			var oModel1 = new sap.ui.model.json.JSONModel({
					HTML : "<div class=\"container\">"+
					"<h2>Google Material Design in CSS3<small>Inputs</small></h2>"+
					"</div>"
				});
				this.getView().setModel(oModel1);
				
				
				
		// var url = "/public/aa/smartagri/data.xsodata/";
		// 	 var oModelp = new sap.ui.model.odata.v2.ODataModel(url, true);
		//          oModelp.read("/USUARIOS",{
  //        				success:function(Odata,response){
  //        					console.log(response);
  //        				},
  //        				error:function(oError){
          					
  //        				}
  //        			});

			
	
				
				
		},
		btnIngresar:function(){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("menu");
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf smartagri.Proyecto_SmartAgri.view.vista_login
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf smartagri.Proyecto_SmartAgri.view.vista_login
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf smartagri.Proyecto_SmartAgri.view.vista_login
		 */
		//	onExit: function() {
		//
		//	}

	});

});