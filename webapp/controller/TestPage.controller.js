sap.ui.define([
    "./BaseController",
    "sap/m/Text"
], function (BaseController, Text) {
    "use strict";

    return BaseController.extend("sap.ui.test.TestPage", {
        onInit: function () {
            var oPage = this.getView().byId("Page");
            var oText = new Text;
            oText.setText("Text Control created in the controller");
            oPage.addContent(oText);
        },
        goBack: function () {
            this.onNavBack();
        }
    });
})