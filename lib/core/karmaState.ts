export interface KarmaState {
  lastResult?: import('../../types/karma').KarmaResult
  logs: string[]
  lastError?: string
  graph: string[]
}

export const karmaState: KarmaState = {
  logs: [],
  graph: []
}
