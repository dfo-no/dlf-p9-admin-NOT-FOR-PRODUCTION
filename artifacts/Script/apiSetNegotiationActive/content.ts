

if (!req.query.settlementId) throw Error("Parameter settlementId is missing. You need to specify a negotiation to update it. ie. add ?settlementId=123 to the URL");
if (req.query.settlementId?.length < 1) throw Error("Invalid negotiation");

let dbRes = await new globals.db.DbConnection().connectAndQuery(`
    UPDATE dlf.negotiation set status = 'Active' WHERE settl_id = $1 RETURNING *
    `, 
    [req.query.settlementId ], true
);

result.data = {
    res: [{
        "Number of negotaitons set active": + dbRes.length,
    }],
    msg: `Negotiation with ID: ${req.query.settlementId} has been set active`,
    err: false,
}
complete();