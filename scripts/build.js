const rimraf = require("rimraf");
const shell = require("shelljs");

const start = () => {
  // 清除.next 文件夹
  rimraf.sync("./.next");

  // next build
  if (shell.exec("next build").code !== 0) {
    shell.echo("Error: next build failed");
    shell.exit(1);
  }
};

start();
