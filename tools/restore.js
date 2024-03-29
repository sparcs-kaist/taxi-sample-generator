const util = require("util");
const path = require("path");
const exec = util.promisify(require("child_process").exec);
const security = require("../security");

const main = async () => {
  const dbName = security.mongo.split("/").pop();
  const { stdout, stderr } = await exec(
    `mongorestore ${security.mongo} ${path.resolve("dump")}`
  );
  console.log(
    "dump 디렉토리로부터 데이터베이스 정보를 성공적으로 복원했습니다."
  );
  process.exit(0);
};

try {
  main();
} catch {
  console.log(
    "DB를 덤프해올 디렉토리가 존재하지 않습니다. 경로를 다시 한 번 확인해주세요."
  );
}
