sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/formatter"
], function (Controller, formatter) {
    "use strict";
    return Controller.extend("sap.ui.test.controller.EmployeeList", {
        formatter: formatter,

        onPress: function (oEvent) {
            console.log(test);
            var oItem = oEvent.getSource();
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("detail", {
                employeePath: window.encodeURIComponent(oItem.getBindingContext("employee").getPath().substr(1))
            });
        }
    });
});