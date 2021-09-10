
exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
        table.string('username').notNullable();
        table.string('password', [60]).notNullable();
        table.string('email').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
