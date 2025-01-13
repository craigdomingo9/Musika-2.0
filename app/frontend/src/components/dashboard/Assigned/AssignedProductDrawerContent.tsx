import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'
import { useAssignedProductMutation } from './AssignedProduct';
import CreateLinksButton from './Buttons/CreateLinksButton';



function AvatarComponent({product}: {product: Product | undefined}) {
  return (
    <Avatar className="size-24 rounded-sm sm:size-40">
      <AvatarImage
        src={product?.variants[0].image.image} alt="@shadcn" />
      <AvatarFallback>{product?.name.split(" ").map(str => str.charAt(0))}</AvatarFallback>
    </Avatar>
  )
}

function AssignedProductDrawerContent() {
  const { entities: {object: assigned} } = useAssignedProductMutation();

  return (
    <div className="flex flex-col w-full justify-center items-center my-5">

      <div>
        <AvatarComponent product={assigned?.product} />
        <p className="py-2 font-semibold text-opacity text-md mb-4 text-center">{assigned?.product.name}</p>
      </div>
      <CreateLinksButton />
    </div>
  )
}

export default AssignedProductDrawerContent