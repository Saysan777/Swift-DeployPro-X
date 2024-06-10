const express = require("express");
const { generateSlug } = require("random-word-slugs");
const { ECSClient, RunTaskCommand } = require("@aws-sdk/client-ecs");

const app = express();
const port = 9000;

const ecsClient = new ECSClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIAXDEHBMINNKNQJPMI",
    secretAccessKey: "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",
  },
});

app.use(express.json());

app.post("/projects", async (req, res) => {
  const { gitUrl } = req.body;
  const projectSlug = generateSlug();

  // spin the container
  const command = new RunTaskCommand({
    cluster: "arn:aws:ecs:ap-south-1:487761994266:cluster/vercel-clone-cluster",
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
          name: "build-server:latest",
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
});

app.listen(port, () => {
  console.log("server listening on port", port);
});
