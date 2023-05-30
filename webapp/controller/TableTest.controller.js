sap.ui.define([
    "sap/ui/test/controller/BaseController"
], function (BaseController) {
    "use strict";
    return BaseController.extend("sap.ui.test.controller.TableTest", {
        onInit: function () {
            var oModel = new sap.ui.model.json.JSONModel({
                Employees: {
                    "Employee('01')": {
                        id: "01",
                        first_name: "Jeanette",
                        last_name: "Penddreth",
                        email: "jpenddreth0@census.gov",
                        gender: "Female",
                        ip_address: "26.58.192.2"
                    },
                    "Employee('02')": {
                        id: "02",
                        first_name: "Giavani",
                        last_name: "Frediani",
                        email: "gfrediani1@senate.gov",
                        gender: "Male",
                        ip_address: "229.179.4.212"
                    }
                }
            });
            var oTable = this.getView().byId("employeeTable");
            oTable.setModel(oModel, "emp");
        },
        showPersonsBinding: function () {
            var oBinding = this.getView().byId("employeeTable").getBinding("items");
            console.log(oBinding);
            var oBindingContext = this.getView().byId("employeeTable").getBindingContext("employee");
            console.log(oBindingContext);
            var oGetModel = this.getView().byId("employeeTable").getModel("emp");
            console.log(oGetModel);
        },
        showCompanyBinding: function () {
            console.log("Company");
        },
        showCategoryBinding: function () {
            console.log("Category");
            var oTable = this.getView().byId("categoryTable");
            var oBinding = oTable.getBinding("items");
            console.log(oBinding);
        },
        employeeSelected: function (oEvent) {
            var oTable = this.getView().byId("employeeTable");
            var oItem = oEvent.getSource();
            var oCtx = oItem.getBindingContext("emp");
            var pressedItem = oTable.getModel("emp").getProperty(oCtx.getPath());
            console.log(oItem);
            console.log(oCtx);
            console.log(pressedItem);
        },
        showCompanyItems: function (oEvent) {
            var oTable = this.getView().byId("companyTable");
            //var oItems = oEvent.getSource();
            var aCtx = oTable.getSelectedContexts();
            var aPressedItems = [];
            aCtx.forEach((context) => {
                var pressedItem = oTable.getModel("company").getProperty(context.getPath());
                console.log(pressedItem);
                aPressedItems.push(pressedItem);
            });
            //var pressedItems = oTable.getModel("company").getProperty(oCtx.getPath());
            //console.log(oItems);
            console.log(aCtx);
            console.log(aPressedItems);
        },
        deleteItems: function (oEvent) {
            var oTable = this.getTable("categoryTable");
            var oModel = oTable.getModel();
            var aData = oModel.getProperty("/Data");
            console.log(aData);
            var aCtx = oTable.getSelectedContexts();
            if (aCtx.length !== 0) {
                aCtx.forEach((item) => {
                    var selectedItem = oTable.getModel().getProperty(item.getPath());
                    //oTable.removeItem(selectedItem);
                    var oData = item.getObject;
                    console.log(selectedItem);
                    //var nIndex = aData.toString().indexOf(selectedItem);
                    var IdName = `Category('${selectedItem.Id}')`;
                    //debugger;
                    if (IdName !== undefined) {
                        //aData.splice(nIndex, 1);
                        delete aData[IdName];
                        console.log(aData);
                        oModel.refresh();
                    }
                });
            }
        }
    });
});