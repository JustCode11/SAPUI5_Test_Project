sap.ui.define(function () {
    "use strict";

    return {
        statusText: function (sStatus) {
            var resourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            switch (sStatus) {
                case "work":
                    return resourceBundle.getText("employeeStatusA");
                case "vacation":
                    return resourceBundle.getText("employeeStatusB");
                case "ill":
                    return resourceBundle.getText("employeeStatusC");
                default:
                    return sStatus;
            }
        }
    }
})