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

            var oModel = new sap.ui.model.odata.v2.ODataModel("https://services.odata.org/TripPinRESTierService/(S(id))/");
            var oMetaModel = oModel.getMetaModel();
            var aEntitySets = oMetaModel.getEntitySetNames();
            console.log(aEntitySets);
        },
        goBack: function () {
            this.onNavBack();
        }
    });
})