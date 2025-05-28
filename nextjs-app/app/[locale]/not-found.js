import Link from "next/link";

function NotFound() {
  return (
    <main className="mt-4 h-screen space-y-6 px-4 py-72 text-center text-primary-800">
      <h1 className="mb-14 text-5xl font-semibold">
        This page could not be found 😓
      </h1>
      <Link
        href="/"
        className="inline-block w-fit rounded-md bg-primary-800 px-6 py-3 text-lg text-primary-400 transition-all duration-300 hover:bg-primary-800/95"
      >
        Go back home
      </Link>
    </main>
  );
}

export default NotFound;
