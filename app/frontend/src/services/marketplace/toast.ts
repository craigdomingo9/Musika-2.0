


export function successfulCartAdditionToast(toast: any) {
  toast({
    variant: "success",
    description: "Product has been added to Cart",
    duration: 1500,
  })
}

export function successToast(toast: any, source: string, action: string) {
  toast({
    variant: "success",
    description: `${source} has been ${action} successfully`,
    duration: 1500,
  })
}


