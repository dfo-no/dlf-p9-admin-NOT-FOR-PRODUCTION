

if (!req.query.settlementId) throw Error("Parameter settlementId is missing. You need to specify a settlement for deletion. ie. add ?settlementId=123 to the URL");
if (req.query.settlementId?.length < 1) throw Error("Invalid settlement");

let dbResScenario = await new globals.db.DbConnection().connectAndQuery(`delete from dlf.scenario where sim_id in (select sim_id from dlf.simulation where neg_id = (select neg_id from dlf.negotiation where settl_id = $1)) RETURNING *`, [req.query.settlementIdId ], true);
let dbResSim = await new globals.db.DbConnection().connectAndQuery(`delete from dlf.simulation where neg_id = (select neg_id from dlf.negotiation where settl_id = $1) RETURNING *`, [req.query.settlementId ], true);
let dbResNegRes = await new globals.db.DbConnection().connectAndQuery(`delete from dlf.negotiation_result where settl_id = $1 RETURNING *`, [req.query.settlementId ], true);
let dbResNegResFuture = await new globals.db.DbConnection().connectAndQuery(`delete from dlf.negotiation_result_future where settl_id = $1 RETURNING *`, [req.query.settlementId ], true);
let dbResNegResProtocol = await new globals.db.DbConnection().connectAndQuery(`delete from dlf.negotiation_result_protocol where settl_id = $1 RETURNING *`, [req.query.settlementId ], true);
let dbResNegResProtocolEmpl = await new globals.db.DbConnection().connectAndQuery(`delete from dlf.negotiation_result_protocol_employee where settl_id =$1 RETURNING *`, [req.query.settlementId ], true);
let dbResProtocol = await new globals.db.DbConnection().connectAndQuery(`delete from dlf.protocol where settl_id = $1 RETURNING *`, [req.query.settlementId ], true);
let dbResProtocolLatest = await new globals.db.DbConnection().connectAndQuery(`delete from dlf.protocol_latest_offer where settl_id = $1 RETURNING *`, [req.query.settlementId ], true);
let dbResProtocolMem = await new globals.db.DbConnection().connectAndQuery(`delete from dlf.protocol_membership where settl_id = $1 RETURNING *`, [req.query.settlementId ], true);
let dbResProtocolMemPres = await new globals.db.DbConnection().connectAndQuery(`delete from dlf.protocol_membership_presence where settl_id = $1 RETURNING *`, [req.query.settlementId ], true);
let dbResProtocolRemark = await new globals.db.DbConnection().connectAndQuery(`delete from dlf.protocol_remark where settl_id = $1 RETURNING *`, [req.query.settlementId ], true);
let dbResSalLetterSetup = await new globals.db.DbConnection().connectAndQuery(`delete from dlf.salary_letter_setup where sl_setup_id in (select sl_setup_id from dlf.salary_letter_package where settl_id = $1) RETURNING *`, [req.query.settlementId ], true);
let dbResSalLetterTemplates = await new globals.db.DbConnection().connectAndQuery(`delete from dlf.salary_letter_setup_template where sl_setup_id in (select sl_setup_id from dlf.salary_letter_package where settl_id = $1) RETURNING *`, [req.query.settlementId ], true);
let dbResSalLetter = await new globals.db.DbConnection().connectAndQuery(`delete from dlf.salary_letter_package where settl_id = $1 RETURNING *`, [req.query.settlementId ], true);
let dbResSalLetterRec = await new globals.db.DbConnection().connectAndQuery(`delete from dlf.salary_letter_package_receiver where settl_id = $1 RETURNING *`, [req.query.settlementId ], true);
let dbResSalLetterSign = await new globals.db.DbConnection().connectAndQuery(`delete from dlf.salary_letter_package_signature where settl_id = $1 RETURNING *`, [req.query.settlementId ], true);
let dbResNegotiation = await new globals.db.DbConnection().connectAndQuery(`delete from dlf.negotiation where settl_id = $1 RETURNING *`, [req.query.settlementId ], true);
let dbResSettlement = await new globals.db.DbConnection().connectAndQuery(`delete from dlf.settlement where settl_id = $1 RETURNING *`, [req.query.settlementId ], true);


result.data = {
    res: [{
        "Deleted Settlements": dbResSettlement.length,
        "Deleted Negotiations": dbResNegotiation.length,
        "Deleted Salary claims": dbResSim.filter(x => x.sim_type == "OT_SALARY_CLAIM").length,
        "Deleted Priority lists": dbResSim.filter(x => x.sim_type == "OT_PRIORITY_LIST").length,
        "Total simulations deleted": dbResSim.length,
        "Deleted scenarios": dbResScenario.length,
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
        
    }],
    msg: `Settlement with ID: ${req.query.settlementId} and related data is deleted and gone for ever (unless Arne magically brings it back with a backup)`,
    err: false,
}
complete();