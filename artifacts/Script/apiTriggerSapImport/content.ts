if (!req.query.settlementId) throw Error("Parameter settlementId is missing. You need to specify a negotiation to update it. ie. add ?settlementId=123 to the URL");
if (req.query.settlementId?.length < 1) throw Error("Invalid negotiation");

let dbConn = await new globals.db.DbConnection().connect();

let datasetGuids = await dbConn.query(`SELECT dataset as guid FROM dlf.negotiation WHERE settl_id = $1`, [req.query.settlementId], false);

let totalAmountOfTimeSleeping = 0;
function sleep(ms) {
  totalAmountOfTimeSleeping += ms;
  return new Promise(resolve => setTimeout(resolve, ms));
}

let messages = {};
for (const dataset of datasetGuids) {
    await dbConn.query(`UPDATE dlf.dataset SET status = 'PENDING' WHERE guid = $1`, [dataset.guid], false);
    await dbConn.query(`NOTIFY sap_import_request, 'manually triggering sap import ${dataset.guid}'`, [], false);

    while ( (await dbConn.query(`SELECT status FROM dlf.dataset WHERE guid = $1`, [dataset.guid], false))[0].status !== 'ACTIVE' ) {
        await sleep(1000);

        if (totalAmountOfTimeSleeping > 30000) {
            throw Error('sap import is still running, but I have been waiting too long so this API call returns');
            await dbConn.disconnect();
        }
    }

    messages[dataset.guid] = await dbConn.query(`SELECT import_messages FROM staging.import WHERE id = (SELECT last_import_id FROM dlf.dataset WHERE guid = $1)`, [dataset.guid], false);
}


await dbConn.disconnect();
result.data = {
    res: [messages],
    msg: `Import is done`,
    err: false,
}
complete();



