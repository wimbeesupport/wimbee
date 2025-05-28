import Link from "next/link";

function ContactBtn({ label = "Contact us" }) {
  return (
    <Link
      href="/contactUs"
      className="flex h-[34px] items-center gap-3 rounded-[4px] bg-white px-3 py-[10px] text-lg font-medium text-primary-700"
    >
      <span>{label}</span>
      {/* <span className="inline-block h-2 w-2 rounded-full bg-green-500" /> */}
      <span className="pulse"></span>
    </Link>
  );
}

export default ContactBtn;
