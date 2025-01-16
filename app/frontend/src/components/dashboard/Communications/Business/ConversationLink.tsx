import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  partner: Participant;
};

function ConversationLink({ partner }: Props) {
  const initials = partner.user.agent_profile?.full_name
    ?.split(" ")
    .map((str) => str.charAt(0).toUpperCase())
    .join("");

  return (
    <div
      className="flex justify-between items-center h-20 border-b hover:scale-[1.01] cursor-pointer duration-300"
    >
      <div className="flex items-center gap-x-3">
        <Avatar>
          <AvatarImage
            src={partner?.user.agent_profile?.profile.profile_picture}
            alt={`Logo for ${partner.user.agent_profile?.full_name}`} 
          />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="font-semibold text-opacity-mid text-sm">
          {partner.user.agent_profile?.full_name}
        </div>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6 text-opacity text-[--baseColor]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
        />
      </svg>
    </div>
  );
}

export default ConversationLink;