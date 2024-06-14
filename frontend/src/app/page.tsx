import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Effortless Web Application Deployment
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Effortlessly deploy your web applications with our powerful,
                    enterprise-grade platform. Integrate with Git, leverage AWS
                    services, and scale dynamically to handle any traffic.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    prefetch={false}
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/deploy"
                    className="inline-flex h-10 items-center justify-center rounded-md border bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                  >
                    Try it Free
                  </Link>
                </div>
              </div>
              <Image
                src="/cloud.png"
                width="400"
                height="300"
                alt="Hero"
                className="hidden md:block"
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Powerful Deployment Capabilities
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our platform offers a comprehensive set of features to
                  streamline your web application deployment process.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Dynamic Deployment</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Scale your application up or down with a single click,
                  ensuring optimal performance and cost-efficiency.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Git Integration</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Seamlessly integrate your Git repository and automate
                  deployments with our continuous integration and delivery
                  tools.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">AWS Integration</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Leverage the power of AWS services like ECS, S3, and Redis to
                  build a scalable, reliable, and secure infrastructure.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Monitoring & Insights</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Gain real-time visibility into your application's performance
                  and resource utilization with our advanced monitoring and
                  analytics tools.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Automated Scaling</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Our platform automatically scales your infrastructure to
                  handle sudden traffic spikes, ensuring your application
                  remains responsive and available.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Secure by Design</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Benefit from our robust security measures, including
                  end-to-end encryption, access controls, and compliance with
                  industry standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Trusted by Developers for developers
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our platform is relied upon by teams of all sizes, from startups
                to enterprises, to power their mission-critical web
                applications.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
                <Image
                alt=""
                src="/trusted.png"
                width="300"
                height="200"
                />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
