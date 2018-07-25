/* eslint no-process-env: "off" */

const knex = require('knex');

const conn = {
	host: process.env.AMK_SQL_HOST || 'localhost',
	user: process.env.AMK_SQL_USERNAME || root,
	password: process.env.AMK_SQL_PASSWORD || '',
	database: process.env.AMK_SQL_DATABASE || 'default'
};

function connect() {
	return knex({
		client: process.env.AMK_SQL_DIALECT || 'mysql',
		connection: conn,
		pool: {
			min: +process.env.AMK_SQL_POOL_MIN || 2,
			max: +process.env.AMK_SQL_POOL_MAX || 10
		}
	});
}

module.exports = connect;
