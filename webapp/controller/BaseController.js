sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History"
], function (Controller, UIComponent, History) {
    "use strict";

    return Controller.extend("sap.ui.test.controller.BaseController", {
        getRouter: function () {
            return UIComponent.getRouterFor(this);
        },
        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("overview", true);
            }
        },
        getTable: function (id) {
            return this.getView().byId(id);
        }
    })
})