## Prepare environment
- mkdir /progs/corepack-archives/
- corepack prepare yarn@3.2.2 --output=/progs/corepack-archives/yarn-3.2.2.tgz
- orepack hydrate --activate /progs/corepack-archives/yarn-3.2.2.tgz
- corepack yarn --version
- corepack yarn@3.2.2 install
- dos2unix /progs/Rocket.Chat/apps/meteor/packages/rocketchat-livechat/plugin/build.sh
- add -x option to execSync(`sh -x ${pluginPath}/build.sh`, options); in /progs/Rocket.Chat/apps/meteor/packages/rocketchat-livechat/plugin/build-livechat.js  
- corepack yarn@3.2.2 build
- corepack yarn@3.2.2 dsv
- git push --force --verbose --no-verify

