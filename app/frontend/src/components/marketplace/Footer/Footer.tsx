import { contactNumber } from "@/lib/constants"

function Footer() {
  return (
    <div className="flex flex-col justify-center">
      <hr />
      <p className="text-xs my-3 text-center text-opacity">Contact <strong>{contactNumber}</strong> on Whatsapp to register your business.</p>
    </div>
  )
}

export default Footer