let WORK_DIR = "./";

let spawn = require("child_process").spawn;

function server() {
    let cp = spawn("ganache-cli", ["--port=7545"], {cwd: WORK_DIR, shell: true});
    cp.stdout.on("data", function(data) {/*process.stdout.write(data.toString());*/});
    cp.stderr.on("data", function(data) {process.stderr.write(data.toString());});
    cp.on("error", function(error) {process.stderr.write(error.toString());});
    return cp;
}

function client() {
    let cp = spawn("truffle", ["test"], {cwd: WORK_DIR, shell: true});
    cp.stdout.on("data", function(data) {process.stdout.write(data.toString());});
    cp.stderr.on("data", function(data) {process.stderr.write(data.toString());});
    cp.on("error", function(error) {process.stderr.write(error.toString());});
    return cp;
}

function execute() {
    let server_cp = server();
    let client_cp = client();
    client_cp.on("exit", function(code, signal) {server_cp.kill();});
}

execute();