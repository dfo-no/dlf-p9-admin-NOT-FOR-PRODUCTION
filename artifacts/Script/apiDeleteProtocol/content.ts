

if (!req.query.settlementId) throw Error("Parameter settlement is missing. You need to specify a settlement for deletion. ie. add ?settlement=123 to the URL");
if (req.query.settlementId?.length < 1) throw Error("Invalid settlement");

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
        
    }],
    msg: `Protocol related to settlement with ID: ${req.query.settlementId}, negotiation results and salary letters is deleted and gone for ever (unless Arne magically brings it back with a backup)`,
    err: false,
}
complete();