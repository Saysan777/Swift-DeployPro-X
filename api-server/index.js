const express = require("express");
const { generateSlug } = require("random-word-slugs");
const { ECSClient, RunTaskCommand } = require("@aws-sdk/client-ecs");
const { Server } = require("socket.io");
const Redis = require("ioredis");

const app = express();
const port = 9000;

const subscriber = new Redis(
  "rediss://default:AVNS_b9zoikU3vmlEqClRGoE@redis-vercel-clone-saysanaryal1-e050.d.aivencloud.com:18235"
);

const io = new Server({ cors: "*" });

//used for sending the subscribed to a channel message to client.
io.on("connection", (socket) => {
  socket.on("subscribe", (channel) => {
    const message = { message: `subscribed to channel ${channel}` };

    socket.join(channel);
    socket.emit("message", message);
  });
});

io.listen(9001, () => {
  console.log("socket server listening on port 9001");
});

const ecsClient = new ECSClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIAXDEHBMINNKNQJPMI",
    secretAccessKey: "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",
  },
});

app.use(express.json());

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
