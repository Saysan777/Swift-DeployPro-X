"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

const DeployAppSchema = z.object({
  gitUrl: z.string().url(),
  slug: z.string().min(4),
});

export default function DeployApp() {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [data, setData] = useState<z.infer<typeof DeployAppSchema> | null>(
    null
  );

  useEffect(() => {
    async function buildProjectFromGitUrl() {}
  }, []);

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

                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </div>
            <div>
              <ScrollArea className="rounded-md border border-gray-200 min-h-[450px]">
                <div className="p-4 text-sm">
                  <h4 className="mb-4 text-lg font-medium leading-none">
                    Build Logs
                  </h4>
                  <pre className="whitespace-pre-wrap break-words">
                    Cloning repository...
                    <br />
                    Installed dependencies...
                    <br />
                    Building project...
                    <br />
                    Deployed successfully!
                  </pre>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
