"use client";
import useFetchBusinessConversations from "@/services/api/dashboard/hooks/business/comms/useFetchBusinessConversations";
import SectionHeader from "../../SectionHeader";
import CreateConversationButton from "./Buttons/CreateConversationButton";
import Loading from "@/app/dashboard/loading";
import createEntityStore from "@/store/dashboard/EntityStore";
import ConversationLink, { makeChatLink } from "../ConversationLink";

export const useConversationAction = createEntityStore(false);


function BusinessConversations() {
  const { entities: action } = useConversationAction();
  const { data: conversations, isLoading } = useFetchBusinessConversations(action);

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
                  (participant) => participant.role !== "business"
                );

                if (!partner) return null; // Handle missing partner
                const fullName = partner.user.agent_profile?.full_name
                const initials = partner.user.agent_profile?.full_name
                  ?.split(" ")
                  .map((str) => str.charAt(0).toUpperCase())
                  .join("");
                
                return (
                  <li key={partner.id}>
                    <ConversationLink
                      initials={initials}
                      avatar={partner.user.agent_profile?.profile.profile_picture}
                      fullName={fullName}
                      href={makeChatLink(conversation.uuid, "business", fullName)}
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

export default BusinessConversations