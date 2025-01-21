import { useMutationLog } from "@/app/dashboard/stores";
import FulfillOrderForm from "../Forms/FulfillOrderForm";


function FulfillOrderDrawerContent() {
  const { entities: { object: order } } = useMutationLog();

  return (
    <div className="flex flex-col w-full justify-center items-center my-5">
      <div>
        <p className="py-2 font-semibold text-opacity text-md mb-4 text-center">{order.quantity}
          &nbsp;{order.product.product.name} :
          &nbsp;{order.product.attributes.map((attr: ProductAttribute) => attr.value)}
          &nbsp;{order.product.attributes.map((attr: ProductAttribute) => attr.name)}
        </p>
      </div>
      <div>
        <p className="sub-text"></p>
        <FulfillOrderForm />
      </div>
    </div>
  )
}

export default FulfillOrderDrawerContent