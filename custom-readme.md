## Prepare environment for development and dev tests
- mkdir /progs/corepack-archives/
- corepack prepare yarn@3.2.2 --output=/progs/corepack-archives/yarn-3.2.2.tgz
- corepack hydrate --activate /progs/corepack-archives/yarn-3.2.2.tgz
- corepack yarn --version
- corepack yarn@3.2.2 install
- dos2unix /progs/Rocket.Chat/apps/meteor/packages/rocketchat-livechat/plugin/build.sh
- add -x option to execSync(`sh -x ${pluginPath}/build.sh`, options); in /progs/Rocket.Chat/apps/meteor/packages/rocketchat-livechat/plugin/build-livechat.js  
- corepack yarn@3.2.2 build
- corepack yarn@3.2.2 dsv
- git push --force --verbose --no-verify

## Run ready applications
- cd /progs/rocket.chat-6.0.0/bundle/programs/server
- npm install
- docker run --env='MONGODB_REPLICA_SET_MODE=primary' --env='MONGODB_REPLICA_SET_NAME=rs0' --env='MONGODB_PORT_NUMBER: 27017' --env='MONGODB_INITIAL_PRIMARY_HOST=localhost' --env='MONGODB_INITIAL_PRIMARY_PORT_NUMBER=27017' --env='MONGODB_ADVERTISED_HOSTNAME=localhost' --env='ALLOW_EMPTY_PASSWORD=yes' -v /var/mongodb-data:/bitnami/mongodb --name db -p 27017:27017 -d docker.io/bitnami/mongodb:4.4
- if container was already executed then `docker start container_id` 
<!--  - docker run -p 27017:27017 bitnami/mongodb:4.4 -->
- export MONGO_URL='mongodb://localhost:27017/rocketchat'
- run studio 3t MongoDB client
- export MONGO_OPLOG_URL=mongodb://172.17.0.2:27017/local?replicaSet=rs0
- export ROOT_URL='http://127.0.0.1:3000'
- cd /progs/rocket.chat-6.0.0/bundle
- node main.js
- netstat -apn | grep node
- tcp        0      0 0.0.0.0:45653           0.0.0.0:*               LISTEN      14407/node
- in browser: http://127.0.0.1:45653/

## Login
- user admin - 1212:123
- user 2 - 2:123

## Changes in MongoDB
Den ersten Benutzer anlegen als Admin
<!-- select * from rocketchat.rocketchat_settings where _id = 'Cloud_Workspace_Client_Id';
update rocketchat.rocketchat_settings set value = true where _id = 'Cloud_Workspace_Client_Id';
-->

cli `mongo localhost:27017`
- rs0:PRIMARY> show dbs
- rs0:PRIMARY> use rocketchat
- rs0:PRIMARY> `db.getCollection("rocketchat_settings").findAndModify({
    query: {"_id": "Cloud_Workspace_Client_Id"},
    upsert: false,
    update: { $set: { "value": true } }
  })`
- rs0:PRIMARY> db.getCollection("rocketchat_settings").find({     query: {"username": "2"} })
- rs0:PRIMARY> `db.getCollection("users").findAndModify({
    query: {"username": "2"},
    upsert: false,
    update: { $set: { "roles": ["user"] } }
  })`
 

