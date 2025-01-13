import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import DeassignButton from "./Buttons/DeassignButton";
import { useAssignmentMutation } from "./AgentAssignment";


function AvatarComponent({product}: {product: Product | undefined}) {
  return (
    <Avatar className="size-24 rounded-sm sm:size-40">
      <AvatarImage 
        src={product?.variants[0].image.image} alt="@shadcn" />
      <AvatarFallback>{product?.name.split(" ").map(str => str.charAt(0))}</AvatarFallback>
    </Avatar>
  )
}


function AssignmentDrawerContent() {
  const { entities: {object: assignment} } = useAssignmentMutation();

  return (
    <div className="flex flex-col w-full justify-center items-center my-5">

      <div>
        <AvatarComponent product={assignment?.product} />
        <p className="py-2 font-semibold text-opacity text-md mb-4 text-center">{assignment?.product.name}</p>
      </div>
      <DeassignButton />
    </div>
  )
}

export default AssignmentDrawerContent