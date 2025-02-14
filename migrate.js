const db = require('./db');

async function migrate() {
  await db.schema.hasTable('tasks').then(async (exists) => {
    if (!exists) {
      return db.schema.createTable('tasks', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.text('description').notNullable();
      });
    }
  });

  console.log('Tabela "tasks" verificada/criada com sucesso!');
  process.exit();
}

migrate();
