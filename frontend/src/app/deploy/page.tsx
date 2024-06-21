"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { socket } from "@/socket";

const DeployAppSchema = z.object({
  gitUrl: z.string().url(),
  slug: z.string().min(4),
});

export default function DeployApp() {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [data, setData] = useState<z.infer<typeof DeployAppSchema> | null>(
    null
  );
  const [logs, setLogs] = useState<string[]>([]);
  const [buildCompleted, setBuildCompleted] = useState<boolean>(false);
  const [projectUrl, setProjectUrl] = useState<string | null>(null);
  let response;

  useEffect(() => {
    const handleSocketMessage = (data) => {
      setLogs((prevLogs) => [...prevLogs, data]);

      if (typeof data === "string") {
        const value = JSON.parse(data);

        if (value.log === "Done") setBuildCompleted(true);
      }
    };

    socket.on("message", handleSocketMessage);

    return () => {
      socket.off("message", handleSocketMessage);
    };
  }, []);

  // TODO: Add socket IO to listen for build logs
  async function buildProjectFromGitUrl(data) {
    const buildResponse = await fetch("http://localhost:9000/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    response = await buildResponse.json();
    setProjectUrl(response?.data?.url);
    console.log("response----------", response?.data?.url);
  }

  const form = useForm<z.infer<typeof DeployAppSchema>>({
    resolver: zodResolver(DeployAppSchema),
    defaultValues: {
      gitUrl: "",
      slug: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof DeployAppSchema>) => {
    setSubmitted(true);

    // Call the API to deploy the app
    await buildProjectFromGitUrl(data);
    socket.emit("subscribe", `logs:${response!.data.projectSlug}`);
  };
  return (
    <div className="flex flex-col mt-16">
      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            <div className="space-y-5">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Deploy your project with ease
                </h2>
                <p className="mt-4 text-gray-500 md:text-sm dark:text-gray-400">
                  Simply provide a Git URL and a slug, and we'll handle the
                  rest.
                </p>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-3"
                >
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input placeholder="Add project name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gitUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Github Repo</FormLabel>
                        <FormControl>
                          <Input placeholder="github repo url" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={submitted ? true : false}>
                    Submit
                  </Button>
                </form>
              </Form>
            </div>

            {submitted && !buildCompleted && (
              <div className="rounded-md border border-gray-200 max-h-[450px]  overflow-auto">
                <div className="p-4 text-sm">
                  <h4 className="mb-4 text-lg font-medium leading-none">
                    Build Logs
                  </h4>
                  <pre className="whitespace-pre-wrap break-words">
                    {logs.map((log, index) => (
                      <div key={index}>
                        {typeof log === "string" ? log : JSON.stringify(log)}{" "}
                        <br />
                      </div>
                    ))}
                  </pre>
                </div>
              </div>
            )}
            {buildCompleted && (
              <div className="rounded-md border border-gray-200 p-4">
                <h4 className="mb-4 text-lg font-medium leading-none">
                  Build Completed
                </h4>
                <p>Your project has been successfully deployed!</p>
                {projectUrl && (
                  <p>
                    Project URL:{" "}
                    <a
                      href={projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      {projectUrl}
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
