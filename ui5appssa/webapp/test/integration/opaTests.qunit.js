/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require(["nsa/ui5appssa/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});
