


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

export function successfulCartAdditionToast(toast: any) {
  successToastFactory(toast, "Product has been added to Cart")
}

export function successToast(toast: any, source: string, action: string) {
  successToastFactory(toast, `${source} has been ${action} successfully`)
}

export function dangerToast(toast: any, source: string, action: string) {
  dangerToastFactory(toast, `${source} was not ${action} successfully`)
}


