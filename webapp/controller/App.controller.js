sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";
    return Controller.extend("sap.ui.test.controller.App", {
        onShowHello: function () {
            // show a native JavaScript alert
            alert("Hello World");
        },
        onOpenEmployeeForm: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("employeeForm", true);
        }
    });
});