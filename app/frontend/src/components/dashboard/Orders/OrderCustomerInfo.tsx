
type Props = {
  order: Order,
}

function OrderCustomerInfo({order}: Props) {
  return (
    <div className="rounded-b-lg shadow text-opacity text-xs w-full m-1 h-12 px-2 flex items-center">
      <p>{order.customer.full_name}'s phone number: +{order.customer.country_code} {order.customer.phone_number}</p>
    </div>
  ) 
}

export default OrderCustomerInfo