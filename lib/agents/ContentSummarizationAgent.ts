// Axolotl – Empowered by satoshiflow
// ContentSummarizationAgent – Creates concise summaries for text segments

import { Logger } from '../utils/logger'
import { AgentError } from '../utils/errorTypes'

export interface SummarizationResult {
  summaries: string[]
}

export class ContentSummarizationAgent {
  private logger: Logger

  constructor(debug = false) {
    this.logger = new Logger({ level: 'INFO', debug })
  }

  public summarize(segments: string[]): SummarizationResult {
    if (!segments || segments.length === 0) {
      throw new AgentError('No segments provided')
    }

    const summaries = segments.map(seg => {
      const words = seg.split(/\s+/).filter(Boolean)
      const summary = words.slice(0, 10).join(' ')
      return words.length > 10 ? summary + '...' : summary
    })

    this.logger.debugLog(`[ContentSummarizationAgent] Summaries: ${summaries.length}`)

    return { summaries }
  }
}
