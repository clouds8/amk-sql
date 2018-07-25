# AMK-SQL

AMK-SQL is a plugin for express to simplify the usage of SQL databases

## Setup
Set the following environment variables
- AMK_SQL_USERNAME
- AMK_SQL_PASSWORD
- AMK_SQL_HOST
- AMK_SQL_DATABASE
- AMK_SQL_DIALECT
- AMK_SQL_POOL_MIN (connection pool, default = 2)
- AMK_SQL_POOL_MAX (connection pool, default = 10)

you can achieve this by choosing one of the options below:
1. use [dotenv](https://github.com/motdotla/dotenv) to set the variables
2. issue the command ``` export AMK_SQL_USERNAME=username ```
3. put it on the ``` .bashrc ``` or ```.bash_profile``` file

## USAGE

After setting up environment variables, inherit from this class.

`users.js`
```
const SQL = require('amk-sql');

class Users extends SQL {
	constructor() {
		super('users', 'u')
	}
}
module.exports = Users;
```

`on a function`
```
Users = require('./users');

const user = new Users();

const userList = await user.get({active: 1}, { limit=20, orderBy='email'})
// this will give you a list of 20 users that are active
```

For more advance usage, please refer to [this]()

## Documentation

/**
* Simple query with filters
* @param {string} param1 - can be an object to filter
* @param {string} param2 - can be ('param', 'value')
* @param {string} param3 - can be ('param', 'in', 'value')
* @returns {object} query object
*/
find(param1, param2, param3)

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

ins(params, returning) {

upd(updateValue, params, returning) {

del(params) {

getDB() {

getJoinDB() {

getConn() {
