const _ = require('lodash');
const exec = require('shell-utils').exec;

const release = _.includes(process.argv, 'release');

function run() {
  exec.execSync(`yarn run uninstall-android`);
  exec.execSync(`yarn run install-android ${release ? '-- release' : ''}`);
  exec.execSync(`cd AndroidE2E && ./gradlew connectedDebugAndroidTest`);
}

run();
