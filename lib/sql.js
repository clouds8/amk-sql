
const knex = require('./knex');

const PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR = 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR';

let db = knex();

const listener = (err) => {
	if (err.code === PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR) {
		console.log('reconnecting to db . . .');
		db = knex();
		db.on('query-error', listener);
	}
};

class SQL {

	constructor(table, alias) {
		this.TABLE = table;
		this.JOIN_TABLE = table + ' as ' + alias;
		db.on('query-error', listener);
	}



	/**
	* Simple query with filters
	* @param {string} param1 - can be an object to filter
	* @param {string} param2 - can be ('param', 'value')
	* @param {string} param3 - can be ('param', 'in', 'value')
	* @returns {object} query object
	*/
	find(param1, param2, param3) {
		const query = db(this.TABLE);
		switch(arguments.length) {
		case 1: {
			query.where(param1);
			break;
		}
		case 2: {
			query.where(param1, param2);
			break;
		}
		case 3: {
			query.where(param1, param2, param3);
			break;
		}
		default: {
			break;
		}
		}
		return query;
	}

	/**
	* Querying dataset with pagination
	* @param {string} param - query parameter
	* @param {string} limit - limit
	* @param {string} offset - offset
	* @param {string} groupBy - group by statement
	* @param {string} orderBy - order by statement
	* @returns {object} query object
	*/
	get(params, { limit, offset, groupBy, orderBy}) {

		const query = db(this.TABLE);

		if (params) query.where(params);
		if (limit) query.limit(limit);
		if (offset) query.offset(offset);
		if (groupBy) query.groupBy(groupBy);
		if (orderBy) query.orderBy(orderBy);

		return query;
	}

	/**
	* Count the number of entry in a table
	* @param {string} param - query parameter
	* @param {string} limit - limit
	* @param {string} offset - offset
	* @param {string} groupBy - group by statement
	* @param {string} orderBy - order by statement
	* @returns {object} returns an array
	* better to catch the return value a [count] = model.count()
	*/
	count(params, { limit, offset, groupBy, orderBy}) {
		const query = db(this.TABLE);

		if (params) query.where(params);
		if (limit) query.limit(limit);
		if (offset) query.offset(offset);
		if (groupBy) query.groupBy(groupBy);
		if (orderBy) query.orderBy(orderBy);

		query.count('* as count');

		return query;
	}

	ins(params, returning) {
		return db(this.TABLE).insert(params, returning);
	}

	upd(updateValue, params, returning) {
		return db(this.TABLE).update(updateValue, returning).where(params);
	}

	del(params) {
		return db(this.TABLE).delete().where(params);
	}

	getDB() {
		return db(this.TABLE);
	}

	getJoinDB() {
		return db(this.JOIN_TABLE);
	}

	getConn() {
		return db;
	}

}

module.exports = SQL;
