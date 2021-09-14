
exports.up = function(knex) {
    return knex.schema.createTable('admin', function (table) {
        table.increments();
        table.string('username').notNullable();
        table.string('email').notNullable();
        table.string('password', [60]).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('admin')
};
