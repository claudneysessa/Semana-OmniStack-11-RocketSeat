exports.up = (knex) => {
	return knex.schema.createTable(
		"incidents",
		(table) => (
			table.increments("id"),
			table.string("title").notNullable(),
			table.string("description").notNullable(),
			table.string("value").notNullable(),
			table.string("ong_id").notNullable(),
			table.foreign("ong_id").references("id").inTable("ongs")
		)
	);
};

exports.down = (knex) => {
	return knex.schema.dropTable("incidents");
};
