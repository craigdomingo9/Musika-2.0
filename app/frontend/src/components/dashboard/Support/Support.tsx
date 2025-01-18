"use client";
import useDashboardConfigStore from "@/store/dashboard/DashboardConfig";
import SectionHeader from "../SectionHeader";
import useFetchConversations from "@/services/api/dashboard/hooks/useFetchConversations";
import { testUuid } from "@/lib/constants";
import Link from "next/link";
import CreateSupportButton from "./Buttons/CreateSupportButton";



function Support() {
  const { config: { mode } } = useDashboardConfigStore();
  const { data: supportChats } = useFetchConversations({
    type: "business_agent_platform",
    role: String(mode).toLowerCase() || "",
    user_uuid: testUuid || "",
  }, mode)

  const supportChat = supportChats?.[0];



  return (
    <div className="page-width">

      <SectionHeader 
        HeaderTitle="Contact Support"
        SubText="Submit all your queries in the chat"
        Action={!supportChat ? <CreateSupportButton /> : <></>}
      />

      {supportChat && ( 
        <Link href={`/dashboard/comms/chat/?id=${supportChat.uuid}&mode=${mode}`}>
          <div className="mt-64">
            <button className="">Go to Support Chat</button>
          </div>
        </Link>
      )}

      {!supportChat && (
        <div className="text-center mt-64 text-sm ">
          <p>No active support chat found.</p>
        </div>
      )}
    </div>
  )
}

export default Support