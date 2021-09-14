
exports.up = function(knex) {
    return knex.schema.createTable('bek', function (table) {
        table.string('cobaDuloBooss').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('bek');
};
