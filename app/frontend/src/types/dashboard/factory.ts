export const processingState = "processing";
export const completedState = "completed";

export function createEntityAction<T> (
  action: string = "",
  object?: T,
  state: "init" | "processing" | "completed" = "init"
): EntityAction<T> {
  return {
    action: action,
    object: object,
    state: state,
  }
}

export function processingEntityAction<T> (
  action: string,
  object: T,
): EntityAction<T> {
  return {
    action: action,
    object: object,
    state: processingState
  }
}

export function completeEntityAction<T> (): EntityAction<T> {
  return {
    action: "",
    object: {} as T,
    state: completedState
  }
}