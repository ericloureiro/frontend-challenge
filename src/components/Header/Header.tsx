import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg";

export function Header() {
  return (
    <header className="fixed h-[60px] w-full top-0 z-50 content-center bg-[#121212] border-b border-[#1F1F1F]">
      <div className="flex justify-center p-4">
        <Link href="/">
          <Image src={logo} width={120} loading="eager" alt="Go Home" />
        </Link>
      </div>
    </header>
  );
}
