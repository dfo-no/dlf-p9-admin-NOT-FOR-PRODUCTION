var _a;
if (!req.query.settlementId)
    throw Error("Parameter settlementId is missing. You need to specify a negotiation to update it. ie. add ?settlementId=123 to the URL");
if (((_a = req.query.settlementId) === null || _a === void 0 ? void 0 : _a.length) < 1)
    throw Error("Invalid negotiation");
var dbConn = await new globals.db.DbConnection().connect();
var datasetGuids = await dbConn.query("SELECT dataset as guid FROM dlf.negotiation WHERE settl_id = $1", [req.query.settlementId], false);
var totalAmountOfTimeSleeping = 0;
function sleep(ms) {
    totalAmountOfTimeSleeping += ms;
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
var messages = {};
for (var _i = 0, datasetGuids_1 = datasetGuids; _i < datasetGuids_1.length; _i++) {
    var dataset = datasetGuids_1[_i];
    await dbConn.query("UPDATE dlf.dataset SET status = 'PENDING' WHERE guid = $1", [dataset.guid], false);
    await dbConn.query("NOTIFY sap_import_request, 'manually triggering sap import ".concat(dataset.guid, "'"), [], false);
    while ((await dbConn.query("SELECT status FROM dlf.dataset WHERE guid = $1", [dataset.guid], false))[0].status !== 'ACTIVE') {
        await sleep(1000);
        if (totalAmountOfTimeSleeping > 30000) {
            throw Error('sap import is still running, but I have been waiting too long so this API call returns');
            await dbConn.disconnect();
        }
    }
    messages[dataset.guid] = await dbConn.query("SELECT import_messages FROM staging.import WHERE id = (SELECT last_import_id FROM dlf.dataset WHERE guid = $1)", [dataset.guid], false);
}
await dbConn.disconnect();
result.data = {
    res: [messages],
    msg: "Import is done",
    err: false,
};
complete();
