// Axolotl – Empowered by satoshiflow
// QualityValidationAgent – Evaluates triple quality based on heuristics and metrics (Score-based)

import { Logger } from '../utils/logger'
import { AgentError } from '../utils/errorTypes'

export interface SemanticTriple {
  subject: string
  predicate: string
  object: string
  confidence: number
}

export interface QualityMetrics {
  confidence: number
  clarity: number
  relevance: number
  score: number
  passed: boolean
}

export class QualityValidationAgent {
  private logger: Logger

  constructor(debug = false) {
    this.logger = new Logger({ level: 'INFO', debug })
  }

  /**
   * Hauptbewertungsmethode: Berechnet Score und Rückgabeobjekt
   */
  public scoreTriple(triple: SemanticTriple): QualityMetrics {
    const clarity = this.estimateClarity(triple)
    const relevance = this.estimateRelevance(triple)
    const { confidence } = triple

    // Gewichtete Gesamtbewertung (Score-Formel)
    const score = 0.5 * confidence + 0.3 * clarity + 0.2 * relevance
    const passed = score >= 0.7

    // Debug-Ausgabe
    this.logger.debugLog(
      `[QualityValidationAgent] Triple: (<${triple.subject}>, <${triple.predicate}>, <${triple.object}>)\n` +
      `→ Confidence: ${confidence.toFixed(2)}, Clarity: ${clarity.toFixed(2)}, Relevance: ${relevance.toFixed(2)}\n` +
      `→ Score: ${score.toFixed(2)} → Passed: ${passed}`
    )

    return {
      confidence,
      clarity,
      relevance,
      score,
      passed
    }
  }

  /**
   * Schätzung der Klarheit anhand der Länge des Objekts (kürzer = klarer)
   */
  private estimateClarity(triple: SemanticTriple): number {
    const len = triple.object.split(' ').length
    return Math.max(0.4, 1.1 - 0.1 * len) // min clarity 0.4
  }

  /**
   * Schätzung der Relevanz anhand von Wortüberlappung zwischen Subject und Object
   */
  private estimateRelevance(triple: SemanticTriple): number {
    const overlap = triple.subject
      .toLowerCase()
      .split(' ')
      .filter(word => triple.object.toLowerCase().includes(word)).length
    return Math.min(1.0, 0.5 + 0.1 * overlap) // max 1.0
  }
}
/**
 * Beispielaufruf:
 * const agent = new QualityValidationAgent(true)
 * const triple: SemanticTriple = { subject: 'Berlin', predicate: 'is', object: 'the capital of Germany', confidence: 0.9 }
 * const metrics = agent.scoreTriple(triple)
 * console.log(metrics)
 */