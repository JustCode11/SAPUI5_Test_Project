sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, History, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("sap.ui.test.controller.EmployeeForm", {
        onInit: function () {
            var model = this.getOwnerComponent().getModel("employee");
            var modelLength = model.oData.Employees.length + 1;
            var oModel = new JSONModel({
                id: modelLength,
                first_name: "",
                last_name: "",
                email: "",
                gender: "Male",
                ip_address: "",
                status: "work"
            });
            var selectFieldModel = new JSONModel({
                selectedGender: "1",
                genders: [
                    {
                        GenderId: "1",
                        Name: "Male"
                    },
                    {
                        GenderId: "2",
                        Name: "Female"
                    },
                    {
                        GenderId: "3",
                        Name: "Other"
                    }
                ]
            })
            this.getView().setModel(selectFieldModel, "sModel");
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
        onChange: function (oEvent) {
            var newGender = oEvent.getParameters().selectedItem.mProperties.text;
            this.getView().getModel().setProperty("/gender", newGender);
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