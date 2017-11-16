# AMK-SQL

AMK-SQL is a plugin for express to simplify the usage of MySQL database

## Usage
Set the following environment variables
- MYSQL_USERNAME
- MYSQL_PASSWORD
- MYSQL_HOST
- MYSQL_DATABASE
- MYSQL_POOL_MIN (connection pool, default = 2)
- MYSQL_POOL_MAX (connection pool, default = 10)

you can do this by issuing the command ``` export MYSQL_USERNAME=username ``` or putting it on the ``` .bashrc ``` or ```.bash_profile``` file

After setting up environment variables, inherit from this class.
