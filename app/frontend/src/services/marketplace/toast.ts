


export function successfulCartAdditionToast(toast: any) {
  toast({
    variant: "success",
    description: "Product has been added to Cart",
    duration: 2500,
  })
}

export function successToast(toast: any, source: string, action: string) {
  toast({
    variant: "success",
    description: `${source} has been ${action} successfully`,
    duration: 2500,
  })
}

export function dangerToast(toast: any, source: string, action: string) {
  toast({
    variant: "destructive",
    description: `${source} was not ${action} successfully`,
    duration: 2500,
  })
}

export function successToastFactory(toast: any, message: string) {
  toast({
    variant: "success",
    description: message,
    duration: 2500,
  })
}

export function dangerToastFactory(toast: any, message: string) {
  toast({
    variant: "destructive",
    description: message,
    duration: 2500,
  })
}


