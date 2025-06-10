// lib/agents/SummarizationAgent.ts
// Axolotl – Empowered by satoshiflow
// Agent #2: Content Summarization Agent

/*
 * File: SummarizationAgent.ts
 * Description: Agent #2 – Responsible for generating context-aware summaries from segmented content.
 * Usage: Used after content segmentation to reduce content length and improve understanding.
 * Dependencies: None (LLM integration optional)
 * Example:
 *   const agent = new SummarizationAgent(true);
 *   const result = agent.summarize("Marie Curie war eine berühmte Wissenschaftlerin...");
 *   console.log(result.summary);
 */

import { Logger } from '../utils/logger'
import { AgentError } from '../utils/errorTypes'

export interface SummarizationResult {
  original: string
  summary: string
}

export class SummarizationAgent {
  private logger: Logger
  private model: 'openai' | 'ollama'

  constructor(debug = false, model: 'openai' | 'ollama' = 'openai') {
    this.logger = new Logger({ level: 'INFO', debug })
    this.model = model
  }

  async summarizeText(text: string): Promise<SummarizationResult> {
    try {
      this.logger.info(`[SummarizationAgent] Summarizing input (${this.model})`)

      const prompt = `Fasse folgenden Text sachlich und klar in wenigen Sätzen zusammen:
\n---\n${text.trim()}\n---`

      const summary = await this.callLLM(prompt)

      return {
        original: text,
        summary: summary.trim()
      }
    } catch (err) {
      this.logger.error(`[SummarizationAgent] Fehler bei der Zusammenfassung: ${err}`)
      throw new AgentError('Summarization failed')
    }
  }

  private async callLLM(prompt: string): Promise<string> {
    // Mock / Platzhalter
    if (this.model === 'ollama') {
      // Beispiel für Ollama
      return `⟪Zusammenfassung durch Ollama:⟫ ${prompt.slice(0, 64)}...`
    } else {
      // Beispiel für OpenAI (realer Aufruf folgt später)
      return `⟪Zusammenfassung durch OpenAI:⟫ ${prompt.slice(0, 64)}...`
    }
  }
}
// Exportieren der Klasse für die Verwendung in anderen Modulen
export default SummarizationAgent   