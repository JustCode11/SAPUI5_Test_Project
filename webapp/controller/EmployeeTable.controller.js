sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";
    return Controller.extend("sap.ui.test.controller.EmployeeList", {
        onDelete: function () {
            var oTable = this.getView().byId("employeeTable");
            var aSelectedItems = oTable.getSelectedItems();
            oTable.removeItem(aSelectedItems[0]);
        }
    });
});