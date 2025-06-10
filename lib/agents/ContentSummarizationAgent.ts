// Axolotl – Empowered by satoshiflow
// ContentSummarizationAgent – Creates concise summaries for text segments

/**
 * @file ContentSummarizationAgent.ts
 * @description
 * Fasst einzelne Textsegmente oder ganze Dokumente sinnvoll zusammen und liefert eine kompakte Darstellung.
 * Nutzt ggf. ein LLM (z. B. GPT oder Ollama) für kontextabhängige Zusammenfassungen.
 *
 * @example
 * const agent = new ContentSummarizationAgent()
 * const result = await agent.summarize("Langer Artikeltext...", { maxLength: 200 })
 *
 * @usage
 * Wird direkt nach der Segmentierung eingesetzt, um den Inhalt für nachfolgende Agenten effizient vorzubereiten.
 */

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
