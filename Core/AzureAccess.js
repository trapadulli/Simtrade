"use strict";
var azure = require("azure-storage");
var AzureSecrets = require("../Library/Secrets/Azure").Secrets()
const tableService = azure.createTableServiceWithSas(
    AzureSecrets.URL,
    AzureSecrets.SAS
    );
const fileService = azure.createFileServiceWithSas(
        AzureSecrets.URL,
        AzureSecrets.SAS
        );
function AzureTableAccess(){
    return tableService;
}
exports.AzureTableAccess = AzureTableAccess;

function AzureFileAccess(){
    return fileService;
}
exports.AzureFileAccess = AzureFileAccess;