//Wiping av lønnsbrevdata + åpning av protokoller og forhandlinger.
// await new globals.db.DbConnection().connectAndQuery(`DELETE FROM dlf.salary_letter_setup_template;`, [], true);
// await new globals.db.DbConnection().connectAndQuery(`DELETE FROM dlf.salary_letter_setup;`, [], true);
// await new globals.db.DbConnection().connectAndQuery(`DELETE FROM dlf.salary_letter_package_signature;`, [], true);
// await new globals.db.DbConnection().connectAndQuery(`DELETE FROM dlf.salary_letter_package;`, [], true);
// await new globals.db.DbConnection().connectAndQuery(`DELETE FROM dlf.object_now_line_detail  WHERE otrans_guid IN (SELECT otrans_guid FROM dlf.object_transaction WHERE main_object_key->>'ObjectType' = 'OT_SALARY_LETTER_PACKAGE');`, [], true);
// await new globals.db.DbConnection().connectAndQuery(`DELETE FROM dlf.object_now_line         WHERE otrans_guid IN (SELECT otrans_guid FROM dlf.object_transaction WHERE main_object_key->>'ObjectType' = 'OT_SALARY_LETTER_PACKAGE');`, [], true);
// await new globals.db.DbConnection().connectAndQuery(`DELETE FROM dlf.object_transaction_line WHERE otrans_guid IN (SELECT otrans_guid FROM dlf.object_transaction WHERE main_object_key->>'ObjectType' = 'OT_SALARY_LETTER_PACKAGE');`, [], true);
// await new globals.db.DbConnection().connectAndQuery(`DELETE FROM dlf.object_transaction      WHERE otrans_guid IN (SELECT otrans_guid FROM dlf.object_transaction WHERE main_object_key->>'ObjectType' = 'OT_SALARY_LETTER_PACKAGE');`, [], true);
// await new globals.db.DbConnection().connectAndQuery(`UPDATE dlf.protocol     SET status = 'Draft', "state" = 'OSM_ST_DRAFT';`, [], true);
// await new globals.db.DbConnection().connectAndQuery(`UPDATE dlf.negotiation  SET status = 'Published';`, [], true);
// //await new globals.db.DbConnection().connectAndQuery(`UPDATE dlf.settlement     SET status = 'Active';`, [], true);
// await new globals.db.DbConnection().connectAndQuery(`
//     UPDATE dlf.fsm_machine SET current_state_code = 'OSM_ST_DRAFT', current_state_name = 'Draft'
//     WHERE machine_id IN (
//         select machine_id from dlf.fsm_machine
//         where 1=1
//         and target_object_key->>'ObjectType' = 'OT_PROTOCOL'
//         and target_object_key->>'ObjectId' in (select protocol_id::TEXT from dlf.protocol)
//         order by machine_id desc
//     );
// `, [], true);
result.data = {
    res: [],
    msg: "Salary letters deleted successfully. Protocol has been set to status: Draft, and negotiation is set to: Published",
    err: false,
};
complete();
