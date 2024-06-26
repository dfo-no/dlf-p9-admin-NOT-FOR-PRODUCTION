var _a;
if (!req.query.settlementId)
    throw Error("Parameter settlement is missing. You need to specify a settlement for deletion. ie. add ?settlement=123 to the URL");
if (((_a = req.query.settlementId) === null || _a === void 0 ? void 0 : _a.length) < 1)
    throw Error("Invalid settlement");
var dbResNegRes = await new globals.db.DbConnection().connectAndQuery("delete from dlf.negotiation_result where settl_id = $1 RETURNING *", [req.query.settlementId], true);
var dbResNegResFuture = await new globals.db.DbConnection().connectAndQuery("delete from dlf.negotiation_result_future where settl_id = $1 RETURNING *", [req.query.settlementId], true);
var dbResNegResProtocol = await new globals.db.DbConnection().connectAndQuery("delete from dlf.negotiation_result_protocol where settl_id = $1 RETURNING *", [req.query.settlementId], true);
var dbResNegResProtocolEmpl = await new globals.db.DbConnection().connectAndQuery("delete from dlf.negotiation_result_protocol_employee where settl_id =$1 RETURNING *", [req.query.settlementId], true);
var dbResProtocol = await new globals.db.DbConnection().connectAndQuery("delete from dlf.protocol where settl_id = $1 RETURNING *", [req.query.settlementId], true);
var dbResProtocolLatest = await new globals.db.DbConnection().connectAndQuery("delete from dlf.protocol_latest_offer where settl_id = $1 RETURNING *", [req.query.settlementId], true);
var dbResProtocolMem = await new globals.db.DbConnection().connectAndQuery("delete from dlf.protocol_membership where settl_id = $1 RETURNING *", [req.query.settlementId], true);
var dbResProtocolMemPres = await new globals.db.DbConnection().connectAndQuery("delete from dlf.protocol_membership_presence where settl_id = $1 RETURNING *", [req.query.settlementId], true);
var dbResProtocolRemark = await new globals.db.DbConnection().connectAndQuery("delete from dlf.protocol_remark where settl_id = $1 RETURNING *", [req.query.settlementId], true);
var dbResSalLetterSetup = await new globals.db.DbConnection().connectAndQuery("delete from dlf.salary_letter_setup where sl_setup_id in (select sl_setup_id from dlf.salary_letter_package where settl_id = $1) RETURNING *", [req.query.settlementId], true);
var dbResSalLetterTemplates = await new globals.db.DbConnection().connectAndQuery("delete from dlf.salary_letter_setup_template where sl_setup_id in (select sl_setup_id from dlf.salary_letter_package where settl_id = $1) RETURNING *", [req.query.settlementId], true);
var dbResSalLetter = await new globals.db.DbConnection().connectAndQuery("delete from dlf.salary_letter_package where settl_id = $1 RETURNING *", [req.query.settlementId], true);
var dbResSalLetterRec = await new globals.db.DbConnection().connectAndQuery("delete from dlf.salary_letter_package_receiver where settl_id = $1 RETURNING *", [req.query.settlementId], true);
var dbResSalLetterSign = await new globals.db.DbConnection().connectAndQuery("delete from dlf.salary_letter_package_signature where settl_id = $1 RETURNING *", [req.query.settlementId], true);
var dbResNegStatusUpdate = await new globals.db.DbConnection().connectAndQuery("update dlf.negotiation set status = 'Published' where settl_id = $1 RETURNING *", [req.query.settlementId], true);
var dbResUpdateDataset = await new globals.db.DbConnection().connectAndQuery("update dlf.dataset set status = 'ACTIVE' where guid = (select dataset from dlf.negotiation where settl_id = $1) RETURNING *", [req.query.settlementId], true);
result.data = {
    res: [{
            "Deleted negotiation results": dbResNegRes.length,
            "Deleted negotiation result future": dbResNegResFuture.length,
            "Deleted negotiation result protocol": dbResNegResProtocol.length,
            "Deleted negotiation result protocol employee": dbResNegResProtocolEmpl.length,
            "Deleted Protocol": dbResProtocol.length,
            "Deleted Protocol latest offer": dbResProtocolLatest.length,
            "Deleted Protocol memberships": dbResProtocolMem.length,
            "Deleted Protocol membership presence": dbResProtocolMemPres.length,
            "Deleted Protocol remarks": dbResProtocolRemark.length,
            "Deleted Salary letter packages": dbResSalLetter.length,
            "Deleted Salary letter receivers": dbResSalLetterRec.length,
            "Deleted Salary letter signatures": dbResSalLetterSign.length,
            "Deleted Salary letter setups": dbResSalLetterSetup.length,
            "Deleted Salary letter templates": dbResSalLetterTemplates.length,
            "Updated negotiation status": dbResNegStatusUpdate,
            "Updated dataset status": dbResUpdateDataset,
        }],
    msg: "Protocol related to settlement with ID: ".concat(req.query.settlementId, ", negotiation results and salary letters is deleted and gone for ever (unless Arne magically brings it back with a backup)"),
    err: false,
};
complete();
