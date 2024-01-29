var _a;
if (!req.query.negotiationId)
    throw Error("Parameter negotiationId is missing. You need to specify a negotiation to update it. ie. add ?negotiationId=123 to the URL");
if (((_a = req.query.negotiationId) === null || _a === void 0 ? void 0 : _a.length) < 1)
    throw Error("Invalid negotiation");
var dbRes = await new globals.db.DbConnection().connectAndQuery("\n    UPDATE dlf.negotiation set status = 'Active' WHERE neg_id = $1 RETURNING *\n    ", [req.query.negotiationId], true);
result.data = {
    res: [{
            "Number of negotaitons set active": +dbRes.length,
        }],
    msg: "Negotiation with ID: ".concat(req.query.negotiationId, " has been set active"),
    err: false,
};
complete();
