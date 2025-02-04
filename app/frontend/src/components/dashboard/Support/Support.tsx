"use client";
import useDashboardConfigStore from "@/store/dashboard/DashboardConfig";
import SectionHeader from "../SectionHeader";
import useFetchConversations from "@/services/api/dashboard/hooks/useFetchConversations";
import CreateSupportButton from "./Buttons/CreateSupportButton";
import Chat from "../../universal/Chat/Chat";
import createEntityStore from "@/store/dashboard/EntityStore";
import Loading from "@/app/dashboard/loading";
import useUserProfile from "@/services/api/marketplace/hooks/useUserProfile";



export const useSupportAction = createEntityStore(false);

function Support() {
  const { config: { mode } } = useDashboardConfigStore();
  const { entities: action } = useSupportAction();
  
  const { data: supportChats, isLoading } = useFetchConversations({
    type: "business_agent_platform",
    role: String(mode).toLowerCase() || "",
  }, `${action}${mode}`)

  const supportChat = supportChats?.[0];

  return (
    <div className="page-width">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {supportChat && ( 
            <div className="mt-8">
              <Chat id={supportChat.uuid} mode={mode} />
            </div>
          )}

          {!supportChat && (
            <div>
              <SectionHeader 
                HeaderTitle="Contact Support"
                SubText="Submit all your queries in the chat"
                Action={<CreateSupportButton mode={mode} />}
              />
              <div className="text-center mt-64 text-sm text-opacity">
                <p>No active support chat found.</p>
              </div>
            </div>
          )}
        </>
      )}
      

    </div>
  )
}

export default Support