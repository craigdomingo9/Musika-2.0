"use client";
import SectionHeader from "../../SectionHeader"
import CreateConversationButton from "./Buttons/CreateConversationButton"
import Loading from "@/app/dashboard/loading";
import useFetchAgentConversations from "@/services/api/dashboard/hooks/agent/comms/useFetchAgentConversations";
import Link from "next/link";
import createEntityStore from "@/store/dashboard/EntityStore";
import ConversationLink from "../ConversationLink";


export const useConversationAction = createEntityStore(false);

function AgentConversations() {
  const { entities: action } = useConversationAction();
  const { data: conversations, isLoading } = useFetchAgentConversations(action);
  
  return (
    <div className="page-width">
      <SectionHeader 
        HeaderTitle="Conversations"
        SubText="Communicate with your partners."
        Action={<CreateConversationButton />}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {!conversations.length && (
            <div className="relative">
              <div className="text-xs font-semibold text-opacity-mid flex justify-center items-center mt-52">You have&nbsp;<strong>0</strong>&nbsp;active conversations. Create some.</div>
            </div>
          )}
          
          {conversations.length > 0 && (
            <ul className="list-none space-y-2">
              {conversations.map((conversation) => {
                const partner = conversation.participants.find(
                  (participant) => participant.role !== "agent"
                );

                if (!partner) return null; // Handle missing partner
                const initials = partner.user.business_profile?.profile.name
                  ?.split(" ")
                  .map((str) => str.charAt(0).toUpperCase())
                  .join("");

                return (
                  <li key={partner.id}>
                    <ConversationLink
                      initials={initials}
                      avatar={partner.user.business_profile?.profile.logo}
                      fullName={partner.user.business_profile?.profile.name}
                      href={`/dashboard/comms/chat/?id=${conversation.uuid}&mode=agent`}
                    />
                  </li>
                );
              })}
          </ul>
          )}
        </>
      )}

    </div>
  )
}

export default AgentConversations