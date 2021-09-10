
exports.up = function(knex) {
    return knex.schema.createTable('book', function (table) {
        table.increments();
        table.string('tittle').notNullable();
        table.string('author').notNullable();
        table.string('publisher').notNullable();
        table.text('description');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('book');
};
