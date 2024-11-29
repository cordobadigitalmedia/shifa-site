import Image from "next/image"
import Link from "next/link"

interface SiteCreditProps {
  text: string
  link: string
  className?: string
}

export function SiteCredit({ text, link, className = "" }: SiteCreditProps) {
  return (
    <Link
      href={link}
      target="_blank"
      className={`fixed bottom-2 right-2 z-50 flex items-center rounded-full bg-gray-600 px-3 py-1 text-xs text-white opacity-50 transition-opacity hover:opacity-100 ${className}`}
    >
      {text}{" "}
      <Image src="/lawh-icon.png" width={20} height={20} alt="CordobaDM" />
    </Link>
  )
}
