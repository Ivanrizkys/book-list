
exports.up = function(knex) {
    return knex.schema.table('users', function (table) {
        table.increments();
    });
};

exports.down = function(knex) {
    return knex.schema.table('users', function (table) {
        table.dropColumn('id');
    })
};
