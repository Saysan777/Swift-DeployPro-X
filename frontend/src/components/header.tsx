import Link from "next/link";

export default function Header() {
  return (
    <header className="text-white bg-gray-900 shadow">
      <div className="container mx-auto py-4 px-4 md:px-6">
        <Link
          href={"/"}
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 cursor-pointer"
        >
          DeployPro X
        </Link>
      </div>
    </header>
  );
}
