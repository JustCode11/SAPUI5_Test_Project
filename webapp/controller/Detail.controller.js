sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (Controller, History) {
    "use strict";
    return Controller.extend("sap.ui.test.controller.Detail", {
        onInit: function () {
            //var oRouter = this.getOwnerComponent().getRouter();
            //oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("detail").attachPatternMatched(this.onRouteMatched, this);
        },
        _onObjectMatched: function (oEvent) {
            this.getView().bindElement({
                path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").employeePath),
                model: "employee"
            })
        },
        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                /*var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("overview", {}, true);*/
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("overview", {}, true);
            }
        },
        onRouteMatched: function (oEvent) {
            /*var sId = oEvent.getParameter("arguments").id;
            console.log(sId);*/
            var sLast_name = oEvent.getParameter("arguments").last_name;
            console.log(sLast_name);
            this.getView().bindElement({
                path: "/Employees/" + sLast_name,
                model: "employee"
            });
            //debugger;
            //alert(sId);
            /*var sPath = this.getView().getModel().createKey("id", {
                Id: sId
            });
            console.log(sPath);*/
            /*this.getView().bindElement({
                path: "/Employees/" + sId,
                model: "employee"
            });*/
        }
    })
})