
exports.up = function(knex) {
    return knex.schema.createTable('test', function (table) {
        table.string('test').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('test');
};
