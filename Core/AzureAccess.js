"use strict";
var azure = require("azure-storage");
var AzureSecrets = require("../Library/Secrets/Azure").Secrets()
const tableService = azure.createTableServiceWithSas(
    AzureSecrets.URL,
    AzureSecrets.SAS
    );

function AzureAccess(){
    return tableService;
}
exports.AzureAccess = AzureAccess;