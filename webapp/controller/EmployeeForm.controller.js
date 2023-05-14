sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel"
], function (Controller, History, JSONModel) {
    "use strict";

    return Controller.extend("sap.ui.test.controller.EmployeeForm", {
        onInit: function () {
            var model = this.getOwnerComponent().getModel("employee");
            var modelLength = model.oData.Employees.length + 1;
            var oModel = new JSONModel({
                id: modelLength,
                first_name: "John",
                last_name: "",
                email: "",
                gender: "",
                ip_address: "",
                status: "work"
            });
            this.getView().setModel(oModel);
        },
        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("overview", {}, true);
            }
        },
        onSaveEmployee: function () {
            var newItem = this.getView().getModel().oData;
            console.log(newItem);
            var oModel = this.getOwnerComponent().getModel("employee");
            console.log(oModel);
            oModel.setProperty("/Employees", oModel.getProperty("/Employees").concat(newItem));
        }
    });
});