let grpc = require("grpc");
let protoLoader = require("@grpc/proto-loader");

let readline = require("readline");
let reader = readline.createInterface({
input: process.stdin,
output: process.stdout
});
var proto = grpc.loadPackageDefinition(
protoLoader.loadSync("../proto/welcome-world.proto", {
keepCase: true,
longs: String,
enums: String,
defaults: true,
oneofs: true
})
);
const REMOTE_URL = "0.0.0.0:2022";
let client = new proto.welcome.WelcomeService(REMOTE_URL,
grpc.credentials.createInsecure());
reader.question("Please enter your name: ", answer => {
client.greetUser({name: answer}, (err, res) =>{ console.log(res.message); } );
});