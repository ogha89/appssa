/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"nsa/ui5appssa/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
