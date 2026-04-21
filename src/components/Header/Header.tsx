import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg";

export function Header() {
  return (
    <header className="sticky h-14 top-0 z-50 w-full bg-[#121212] border-b border-[#1f1f1f]">
      <div className="flex justify-center p-4">
        <Link href="/">
          <Image src={logo} width={120} loading="eager" alt="Go Home" />
        </Link>
      </div>
    </header>
  );
}
