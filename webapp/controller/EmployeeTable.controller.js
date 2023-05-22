sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Sorter",
    "sap/ui/table/library",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Text",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, Dialog, Button, Text, library, Sorter, Fragment, Filter, FilterOperator) {
    "use strict";
    var SortOrder = library.SortOrder;
    return Controller.extend("sap.ui.test.controller.EmployeeList", {
        onDelete: function () {
            if (!this.oConfirmDialog) {
                this.oConfirmDialog = new Dialog({
                    type: "Message",
                    title: "Confirm",
                    content: new Text({ text: "Do you want to delete this employee?" }),
                    beginButton: new Button({
                        type: "Emphasized",
                        text: "Submit",
                        press: function () {
                            this._confirmDelete();
                            this.oConfirmDialog.close();
                        }.bind(this)
                    }),
                    endButton: new Button({
                        text: "Close",
                        press: function () {
                            this.oConfirmDialog.close();
                        }.bind(this)
                    })
                });
            }
            this.oConfirmDialog.open();
        },
        _confirmDelete: function () {
            console.log("closed");
            /*var oTable = this.getView().byId("employeeTable");
            var aSelectedItems = oTable.getSelectedItems();
            oTable.removeItem(aSelectedItems[0]);*/
        },
        onSort: async function () {
            /*if (!this.pDialog) {
                this.pDialog = await Fragment.load({
                    name: "sap.ui.test.fragment.SortDialog",
                    controller: this
                });
            }
            this.pDialog.open();*/
            // get current view
            var oView = this.getView();

            // load the fragment file
            // if abfrage verhindert duplicate id fehler
            /*if (!this.byId("sortDialog")) {
                Fragment.load({
                    id: oView.getId(),
                    name: "sap.ui.test.fragment.SortDialog",
                    controller: this
                }).then(function (oDialog) {
                    // open Dialog
                    // connect dialog to the root view of component (models, lifecycle)
                    oView.addDependent(oDialog);
                    oDialog.open();
                });
            } else {
                this.byId("sortDialog").open();
            }*/
            if (!this._oSortDialog) {
                this._oSortDialog = await this.loadFragment({
                    name: "sap.ui.test.fragment.SortDialog"
                });
            }
            this._oSortDialog.open();
        },
        handleSortDialogConfirm: function (oEvent) {
            /*var oTable = this.byId("employeeTable"),
                mParams = oEvent.getParameters(),
                oBinding = oTable.getBinding("items"),
                sPath,
                bDescending,
                aSorters = [];

            sPath = mParams.sortItem.getKey();
            bDescending = mParams.sortDescending;
            aSorters.push(new Sorter(sPath, bDescending));

            oBinding.sort(aSorters);*/
            //debugger;
            var oSortItem = oEvent.getParameter("sortItem");
            var sColumnPath = "id";
            var bDescending = oEvent.getParameter("sortDescending");
            var aSorters = [];

            if (oSortItem) {
                sColumnPath = oSortItem.getKey();
            }
            aSorters.push(new sap.ui.model.Sorter(sColumnPath, bDescending));

            var oTable = this.byId("employeeTable");
            var oBinding = oTable.getBinding("items");

            oBinding.sort(aSorters);
        },
        onSearch: function (oEvent) {
            var aFilters = [];
            var sQuery = oEvent.getParameter("query");

            if (sQuery) {
                aFilters.push(new sap.ui.model.Filter("last_name", FilterOperator.Contains, sQuery));
            }

            var oTable = this.byId("employeeTable");
            var oBinding = oTable.getBinding("items");

            oBinding.filter(aFilters);
        },
        onGroup: async function () {
            if (!this._oGroupDialog) {
                this._oGroupDialog = await this.loadFragment({
                    name: "sap.ui.test.fragment.GroupDialog"
                });
            }
            this._oGroupDialog.open();
        },
        onGroupDialogConfirm: function (oEvent) {
            var oSortItem = oEvent.getParameter("groupItem");
            var sColumnPath = "id";
            var bDescending = oEvent.getParameter("groupDescending");
            var aSorters = [];
            var bGroupEnabled = false;

            if (oSortItem) {
                sColumnPath = oSortItem.getKey();
                bGroupEnabled = true;
            }
            aSorters.push(new sap.ui.model.Sorter(sColumnPath, bDescending, bGroupEnabled));

            var oTable = this.byId("employeeTable");
            var oBinding = oTable.getBinding("items");

            oBinding.sort(aSorters);
        },
        onItemPress: function (oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var oItem = oEvent.getSource();
            //debugger;
            /*oRouter.navTo("detail", {
                id: oItem.getBindingContext("employee").getObject().id
            });*/ // der erste Parameter soll dem namen im manifest unter routes entsprechen

            oRouter.navTo("detail", {
                last_name: oItem.getBindingContext("employee").getObject().last_name
            });

        }
    });
});