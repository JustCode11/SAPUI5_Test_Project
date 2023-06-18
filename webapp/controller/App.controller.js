sap.ui.define([
    "sap/ui/test/controller/BaseController"
], function (BaseController) {
    "use strict";
    return BaseController.extend("sap.ui.test.controller.App", {
        onShowHello: function () {
            // show a native JavaScript alert
            alert("Hello World");
        },
        onOpenEmployeeForm: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("employeeForm", true);
        },
        goToTestPage: function () {
            var oRouter = this.getRouter();
            oRouter.navTo("testPage", true);
        },
        goToIconTabBarTest: function () {
            var oRouter = this.getRouter();
            oRouter.navTo("iconTabBarTest", true);
        },
        goToTableTest: function () {
            this.getRouter().navTo("tableTest");
        },
        goToLargeTablePage: function () {
            this.getRouter().navTo("largeTable");
        }
    });
});