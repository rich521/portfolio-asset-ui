# portfolio-asset-ui

## Instuctions

#### MongoDB
This project requires MongoDB.

1. [Install Mongodb](http://mongodb.github.io/nomde-mongodb-native/2.2/installation-guide/)
	- Brew intall mongodb for terminal commands. Alternatively download files directly and run from there.
2. rOpen Terminal. Go to project folder or another folder you wish to put MongoData files in.
3. Run "mkdir data"
	- May need to use sudo
4. Run "mongod --dbpath='/specifiedProjectFolderDirectory/data'"
	- Have MongoDB server run before running project file gulp server.
	- Terminal should be running on port 27017 (default, or config to run own specified port).
5. Open a seperate terminal (Create a new database and add  a collection for initial data)
	- run "mongo"
	- run "use portfolios"
	- run "db.createCollection('userData')"
	- Exit server. type "cmd c or ctrl c" (mac, windows)
	- run "mongoimport --db portfolios --collection userData --type json --file 'path/to/portfolio-asset-ui/dist/data/user-data.json' --jsonArray"

#### Project file
portfolio-asset-ui

1. Open a seperate terminal. Go into project file directory.
2. Run 'npm install'
3. Run 'gulp'