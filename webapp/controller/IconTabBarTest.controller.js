sap.ui.define([
    "./BaseController",
    "sap/m/Text"
], function (BaseController, Text) {
    "use strict";

    return BaseController.extend("sap.ui.test.controller.IconTabBarTest", {
        onInit: function () {
            var IconTabHeader = this.getView().byId("IconTabBarTestPage");
            var oText = new Text;
            oText.setText("Text Control created in the controller");
            IconTabHeader.addContent(oText);
        },
        goBack: function () {
            this.onNavBack();
        },
        onSelect: async function (oEvent) {
            if (!this._oTableFragment) {
                this._oTableFragment = await this.loadFragment({
                    name: "sap.ui.test.fragment.PositionTable",
                    controller: this
                });
            }
            var oPage = this.getView().byId("IconTabBarTestPage");
            oPage.addContent(this._oTableFragment);
            var oIconTabHeader = this.getView().byId("iconTabHeader");
            var sKey = oIconTabHeader.getSelectedKey();
            var sPath = `/Data/Category('${sKey}')/ToPosition`;
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
        },
        onSort: function(oEvent) {
            var oTable = this.getView().byId("posTable");
            console.log(oTable);
        }
    });
})