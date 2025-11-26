import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function MobileMenuItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);

  if (item.items) {
    return (
      <div
        className="rounded-custom bg-white px-3 py-2 text-primary-800"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between py-1"
        >
          <p className="text-xs font-medium">{item.title}</p>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
              }`}
          />
        </button>

        <div
          className={`grid transition-all duration-200 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
        >
          <ul className="overflow-hidden">
            {item.items.map((link, index) => (
              <li key={index} className="border-b border-primary-800/20 py-3 last:border-0">
                <Link
                  href={link.href || "/"}
                  className="group flex items-center justify-between pl-2"
                >
                  <span className="text-xs opacity-90">{link.label}</span>
                  <span
                    className="size-3 rounded-full bg-primary-800 opacity-0 transition-all group-hover:opacity-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-custom bg-white px-3 py-2 text-primary-800">
      <Link
        href={item.href || "/"}
        className="group flex items-center justify-between py-1"
      >
        <span className="text-xs font-medium">{item.title}</span>
        <span className="hidden size-3 rounded-full bg-primary-800 group-hover:inline-block" />
      </Link>
    </div>
  );
}
