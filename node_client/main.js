import { resolve } from "path"
import { loadPackageDefinition, credentials } from "@grpc/grpc-js"
import protoLoader from "@grpc/proto-loader"

const PROTO_PATH = resolve('../hello.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})

const hello = loadPackageDefinition(packageDefinition).hello

function main() {

  const client = new hello.Hello('localhost:50051', credentials.createInsecure())

  client.sayHello({ name: "user" }, function (_err, response) {
    console.log('Greeting:', response.message);
  });
}

main()
