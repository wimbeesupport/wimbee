function Tag({ children, bg = "primary" }) {
  return (
    <span
      className={`w-fit rounded-custom p-2 font-mono text-sm uppercase text-light-300 lg:text-xl ${bg === "light" ? "bg-primary-500" : "bg-primary-800"}`}
    >
      {children}
    </span>
  );
}

export default Tag;
