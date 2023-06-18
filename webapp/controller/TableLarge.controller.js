sap.ui.define([
    "sap/ui/test/controller/BaseController"
], function (
    BaseController
) {
    "use strict";

    return BaseController.extend("sap.ui.test.controller.TableLarge", {
        goBack: function () {
            this.onNavBack();
        }
    });
});