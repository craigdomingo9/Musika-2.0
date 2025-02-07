import { contactEmail } from "@/lib/constants"
import Link from "next/link"

function Footer() {
  return (
    <Link href={`mailto:${contactEmail}`} className="flex flex-col justify-center bg-sidebar-accent">
      <p className="text-xs my-3 text-center text-opacity">Contact <strong className="hover:underline">{contactEmail}</strong> to register your business.</p>
    </Link>
  )
}

export default Footer