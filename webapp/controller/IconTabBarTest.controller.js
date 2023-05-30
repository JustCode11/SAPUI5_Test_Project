sap.ui.define([
    "./BaseController",
    "sap/m/Text"
], function (BaseController, Text) {
    "use strict";

    return BaseController.extend("sap.ui.test.controller.IconTabBarTest", {
        onInit: async function () {
            /*var IconTabHeader = this.getView().byId("IconTabBarTestPage");
            var oText = new Text;
            oText.setText("Text Control created in the controller");
            IconTabHeader.addContent(oText);*/
            /*var oIconTabHeader = this.getView().byId("iconTabHeader");
            var sKey = oIconTabHeader.getSelectedKey();
            debugger;
            this._loadFragment(sKey);*/
            /*var oIconTabHeader = this.getView().byId("iconTabHeader");
            oIconTabHeader.attachEventOnce("select", (oEvent) => {
                var sKey = oEvent.getParameter("key");
                this._loadFragment(sKey);
            });*/
        },
        goBack: function () {
            this.onNavBack();
        },
        onSelect: async function (oEvent) {

            var oPage = this.getView().byId("IconTabBarTestPage");
            oPage.addContent(this._oTableFragment);
            var oIconTabHeader = this.getView().byId("iconTabHeader");
            var sKey = oIconTabHeader.getSelectedKey();
            this._loadFragment(sKey);
        },
        onSort: function (oEvent) {
            var oTable = this.getView().byId("posTable");
            console.log(oTable);
        },
        onDelete: function (oEvent) {
            var oTable = this.getView().byId("posTable");
            var aSelectedItems = oTable.getSelectedItems();
            var oContext = oTable.getBinding("");
            console.log(oContext);
            for (let i = 0; i < aSelectedItems.length; i++) {
                oTable.removeItem(aSelectedItems[i]);
            }

            /*var oTable = this.getView().byId("employeeTable");
            var aSelectedItems = oTable.getSelectedItems();
            oTable.removeItem(aSelectedItems[0]);*/
        },
        _loadFragment: async function (key) {
            if (!this._oTableFragment) {
                this._oTableFragment = await this.loadFragment({
                    name: "sap.ui.test.fragment.PositionTable",
                });
            }
            var sPath = `/Data/Category('${key}')/ToPosition`;
            var oTable = this.getView().byId("posTable");
            oTable.bindItems({
                path: sPath,
                template: new sap.m.ColumnListItem({
                    cells: [
                        new sap.m.Text({
                            text: "{Name}"
                        }),
                        new sap.m.Text({
                            text: "{Age}"
                        }),
                        new sap.m.Text({
                            text: "{Gender}"
                        })
                    ]
                })
            })
        }
    });
})