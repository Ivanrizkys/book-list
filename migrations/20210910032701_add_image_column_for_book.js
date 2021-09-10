exports.up = function(knex) {
    return knex.schema.table('book', function (table) {
        table.string('image');
    });
};

exports.down = function(knex) {
    return knex.schema.table('book', function (table) {
        table.dropColumn('image');
    })
};
