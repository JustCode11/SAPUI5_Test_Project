sap.ui.define([
    "sap/ui/test/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter"
], function (BaseController,
    JSONModel,
    Filter) {
    "use strict";
    return BaseController.extend("sap.ui.test.controller.TableTest", {
        onInit: function () {
            this._loadLocalModel();
            var oModel = new JSONModel({
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
            var localModel = new JSONModel({
                filteredCities: {
                    City: "London",
                    City: "New York"
                }
            }, "localModel");
            this.getView().setModel(localModel);
        },
        _loadLocalModel: function () {
            var oModel = new JSONModel({
                selectedTabId: "",
                numberOfSelectedItems: 0
            });
            this.getView().setModel(oModel, "LocalModel");
        },
        showPersonsBinding: function () {
            var oBinding = this.getView().byId("employeeTable").getBinding("items");
            console.log(oBinding);
            var oBindingContext = this.getView().byId("employeeTable").getBindingContext("employee");
            console.log(oBindingContext);
            var oGetModel = this.getView().byId("employeeTable").getModel("emp");
            console.log(oGetModel);
        },
        createArray: function () {
            var oTable = this.byId("employeeTable");
            var oModel = oTable.getModel("emp");
            var aTableData = oModel.getProperty("/Employees");
            aTableData = Object.values(aTableData);
            var aDescription = [];
            for (var i = 0; i < aTableData.length; i++) {
                var sDescription = aTableData[i].email;
                console.log(sDescription);
                aDescription.push(sDescription);
            }
            console.log(oTable)
            console.log(oModel)
            console.log(aTableData)
            console.log(aDescription);

            /*
            var myObject = { 
            property1: 'value1',
            property2: 'value2',
            property3: 'value3'
            };

            for (var key in myObject) {
            if (myObject.hasOwnProperty(key)) {
                var value = myObject[key];
                // Do something with the property value
                console.log(value);
            }
            }*/
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
        },
        onSelectionChangeCompany: function (oEvent) {
            debugger;
            var oTable = this.getView().byId("companyTable");
            var localModel = this.getView().getModel("LocalModel");
            var numberOfSelectedItems = localModel.getProperty("/numberOfSelectedItems");
            var aSelectedItems = oTable.getSelectedItems();
            localModel.setProperty("/numberOfSelectedItems", aSelectedItems.length);
            console.log(oTable);
            console.log(localModel);
            var oSource = oEvent.getSource();
            var oBindingContext = oSource.getBindingContext("company");
            var oEntity = oBindingContext.getObject();
            console.log(oEntity);
        },
        confirmMarking: function (oEvent) {
            var oTable = this.getView().byId("companyTable");
            var aSelectedItems = oTable.getSelectedItems();
            aSelectedItems.forEach(item => {
                item.addStyleClass("marked");
            });
            oTable.removeSelections(true);
        },
        onToggle: function (oEvent) {
            var oTable = this.getView().byId("companyTable");
            var aItems = oTable.getItems();
            if (oEvent.getSource().getPressed()) {
                aItems.forEach((item) => {
                    if (item.hasStyleClass("marked")) {

                    }
                })
            } else {
                console.log("unpressed");
            }
        },
        onSuggestionCompanySelected: function (oEvent) {
            var selectedItem = oEvent.getParameter("selectedItem");
            if (selectedItem !== null) {
                var selectedCity = selectedItem.getKey();
                var oTable = this.getView().byId("companyTable");
                var oBinding = oTable.getBinding("items");
                oBinding.filter(new Filter("City", "EQ", selectedCity));
            }
        },
        onSuggestCompany: function (oEvent) {
            var sTerm = oEvent.getParameter("suggestValue");
            var aFilters = [];
            if (sTerm) {
                aFilters.push(new Filter("City", "StartsWith", sTerm));
            }

            oEvent.getSource().getBinding("suggestionItems").filter(aFilters);
        },
        filterCityList: function () {
            var companyModel = this.getView().getModel("company");
            var companyList = companyModel.getProperty("/CompanySet/Companies");
            var uniqueNames = [];
            console.log(companyList);
        },
        onMarkEmployee: function (oEvent) {
            var oTable = this.getView().byId("employeeTable");
            var oItem = oEvent.getParameter("selectedItem");
            var oCtx = oEvent.getSource().getBindingContext("emp");
            var pressedItem = oTable.getModel("emp").getProperty(oCtx.getPath());
            //var oModel = this.getOwnerComponent().getModel("emp");
            console.log(oTable.getItems());
            console.log(oItem);
            console.log(pressedItem);
            //console.log(oModel.getProperty(oCtx.getPath()));
        }
    });
});