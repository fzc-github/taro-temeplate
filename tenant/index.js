const fs = require('fs');
const shell = require('shelljs');

const ENV = process.argv[process.argv.length-1].split('-')[2];
const CLIENT = process.argv[process.argv.length-2].split('-')[2];
const TENANT = process.argv[process.argv.length-3].split('=')[1];

const projectConfigUrl = './project.config.json';
const tenantUrl = './src/tenant.js';
const tabbarConfigUrl = './src/tabbar.config.js';

function isJson(val) {
  if (typeof val === 'string') {
    try {
      let obj = JSON.parse(val);
      return true
    } catch(e) {
      return false
    }
  } else if (typeof val === 'object') {
    return !Array.isArray(val)
  } else {
    return false
  }
}

function readFile(url) {
  let data = fs.readFileSync(url, 'utf8');
  return isJson(data) ? JSON.parse(data) : data
}

function writeFile(url, data) {
  fs.writeFileSync(
    url, 
    isJson(data) ? JSON.stringify(data) : data
  );
}

// 写入 appid
const projectConfig = readFile(projectConfigUrl);
switch(TENANT) {
  case 'MN': 
    projectConfig.appid = 'wx5fa08556d4cf6348';
    break;
}
writeFile(projectConfigUrl, projectConfig);
console.log(`✅ 写入appid成功`)

// 写入 租户信息
writeFile(tenantUrl, `export const brand = '${TENANT}';`);
console.log(`✅ 写入租户信息成功`)

// 写入 tabbar.config
const tabbarConfig = readFile(`./tenant/${TENANT}/tabbar.config.js`);
writeFile(tabbarConfigUrl, tabbarConfig);
console.log(`✅ 写入tabbar.config成功`)

// 运行项目
switch(ENV) {
  case 'dev': 
    shell.exec(`npm run start:${CLIENT} TENANT=${TENANT}`);
    break;
  case 'build': 
    shell.exec(`npm run build:${CLIENT} TENANT=${TENANT}`);
    break;
}