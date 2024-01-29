

if (!req.query.negotiationId) throw Error("Parameter negotiationId is missing. You need to specify a negotiation to update it. ie. add ?negotiationId=123 to the URL");
if (req.query.negotiationId?.length < 1) throw Error("Invalid negotiation");

let dbRes = await new globals.db.DbConnection().connectAndQuery(`
    UPDATE dlf.negotiation set status = 'Active' WHERE neg_id = $1 RETURNING *
    `, 
    [req.query.negotiationId ], true
);

result.data = {
    res: [{
        "Number of negotaitons set active": + dbRes.length,
    }],
    msg: `Negotiation with ID: ${req.query.negotiationId} has been set active`,
    err: false,
}
complete();