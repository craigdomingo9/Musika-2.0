"use client";
import useFetchBusinessConversations from "@/services/api/dashboard/hooks/business/comms/useFetchBusinessConversations";
import SectionHeader from "../../SectionHeader";
import CreateConversationButton from "./Buttons/CreateConversationButton";
import Loading from "@/app/dashboard/loading";
import ConversationLink from "./ConversationLink";
import Link from "next/link";
import createEntityStore from "@/store/dashboard/EntityStore";

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
            <ul className="list-none space-y-4">
              {conversations.map((conversation) => {
                const partner = conversation.participants.find(
                  (participant) => participant.role !== "business"
                );

                if (!partner) return null; // Handle missing partner

                return (
                  <li key={partner.id}>
                    <Link
                      href={`/dashboard/comms/chat/?id=${conversation.uuid}&mode=business`}
                    >
                      <ConversationLink partner={partner} />
                    </Link>
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