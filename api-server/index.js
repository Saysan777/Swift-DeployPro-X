const express = require("express");
const { generateSlug } = require("random-word-slugs");
const { ECSClient, RunTaskCommand } = require("@aws-sdk/client-ecs");
const http = require("http");
const { Server } = require("socket.io");
const Redis = require("ioredis");
const cors = require("cors");

const app = express();
const port = 9000;

app.use(express.json());

const subscriber = new Redis(
  "rediss://default:AVNS_b9zoikU3vmlEqClRGoE@redis-vercel-clone-saysanaryal1-e050.d.aivencloud.com:18235"
);

app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST"], // Allow specific methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (client) => {
  console.log("client connected");
  client.on("subscribe", (channel) => {
    // channel is the redis channel name which is project_name/Id we set when we publishLog
    const message = { message: `subscribed to channel ${channel}` };

    client.join(channel);
    client.emit("message", message);
  });
});

io.listen(9001, () => {
  console.log("socket server listening on port 9001");
});

// const ecsClient = new ECSClient({
//   region: "ap-south-1",
//   credentials: {
//     accessKeyId: "",
//     secretAccessKey: "",
//   },
// });
const ecsClient = new ECSClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
});

app.post("/projects", async (req, res) => {
  try {
    const { gitUrl, slug } = req.body;
    const projectSlug = slug ? slug : generateSlug();

    // spin the container
    const command = new RunTaskCommand({
      cluster:
        "arn:aws:ecs:ap-south-1:487761994266:cluster/vercel-clone-cluster",
      taskDefinition:
        "arn:aws:ecs:ap-south-1:487761994266:task-definition/builder-task:1",
      launchType: "FARGATE",
      count: 1,
      networkConfiguration: {
        awsvpcConfiguration: {
          subnets: [
            "subnet-0436d10a22379857c",
            "subnet-064de809aebb944ea",
            "subnet-0c44ec853dbad17ea",
          ],
          securityGroups: ["sg-08de1f0fd74566606"],
          assignPublicIp: "ENABLED",
        },
      },
      overrides: {
        containerOverrides: [
          {
            name: "build-server",
            environment: [
              { name: "GIT_REPOSITORY__URL", value: gitUrl },
              { name: "PROJECT_ID", value: projectSlug },
            ],
          },
        ],
      },
    });

    await ecsClient.send(command);

    return res.json({
      status: "queued",
      data: { projectSlug, url: `http://${projectSlug}.localhost:8000` },
    });
  } catch (err) {
    console.log("Error while spinning up container in aws", err);
  }
});

async function initRedisSubscribe() {
  subscriber.psubscribe("logs:*");

  // logs our build steps to the console.
  subscriber.on("pmessage", (pattern, channel, message) => {
    // Broadcasts the received message to all clients subscribed to the specified channel
    io.to(channel).emit("message", message);
  });
}

initRedisSubscribe();

app.listen(port, () => {
  console.log("server listening on port", port);
});
