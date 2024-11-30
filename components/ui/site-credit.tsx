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
      className={`group fixed bottom-3 right-3 z-50 flex items-center rounded-full bg-white p-1 text-xs shadow transition-opacity hover:opacity-100 ${className}`}
    >
      <span className="text-primary hidden px-1 opacity-0 transition-all duration-300 group-hover:block group-hover:opacity-100">
        {text}{" "}
      </span>
      <Image
        src="/lawh-icon.png"
        width={25}
        height={25}
        alt="Built by CordobaDM"
      />
    </Link>
  )
}
