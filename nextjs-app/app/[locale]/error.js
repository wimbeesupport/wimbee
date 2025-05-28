"use client";

export default function Error({ error, reset }) {
  return (
    <main className="flex h-screen flex-col items-center gap-6 text-primary-800">
      <div className="mx-auto max-w-[1200px] py-72 text-center">
        <h1 className="mb-24 flex flex-col items-center gap-2 text-3xl font-semibold">
          <span className="text-6xl">404</span>
          <span>Something went wrong!</span>
        </h1>

        <button
          className="inline-block w-fit rounded-md bg-primary-800 px-6 py-3 text-lg text-primary-400 transition-all duration-300 hover:bg-primary-800/95"
          onClick={reset}
        >
          Try again
        </button>
      </div>
    </main>
  );
}
