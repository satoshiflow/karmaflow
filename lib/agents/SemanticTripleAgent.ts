// Axolotl – Empowered by satoshiflow
// SemanticTripleAgent – Transforms entities & relations into structured triples

/**
 * @file SemanticTripleAgent.ts
 * @description
 * Formt strukturierte Tripel in der Form (Subjekt, Prädikat, Objekt) basierend auf den vorherigen Agenten.
 * Fügt Konfidenzwerte und weitere Metriken hinzu.
 *
 * @usage
 * Zentraler Schritt zur Erstellung maschinenlesbarer Wissensdarstellungen.
 */

import { Logger } from '../utils/logger'
import { AgentError } from '../utils/errorTypes'

export interface SemanticTriple {
  subject: string
  predicate: string
  object: string
  confidence: number
}

export interface SemanticTripleInput {
  entities: string[]
  relations: string[]
  sentences: string[]
}

export class SemanticTripleAgent {
  private logger: Logger

  constructor(debug = false) {
    this.logger = new Logger({ level: 'INFO', debug })
  }

  public generateTriples(input: SemanticTripleInput): SemanticTriple[] {
    const { entities, relations, sentences } = input
    const triples: SemanticTriple[] = []

    if (!sentences.length || !entities.length || !relations.length) {
      throw new AgentError('Invalid input – missing entities, relations or sentences')
    }

    for (const sentence of sentences) {
      for (const subject of entities) {
        for (const object of entities) {
          if (subject === object) continue
          for (const predicate of relations) {
            const pattern = new RegExp(`${subject}.*${predicate}.*${object}`, 'i')
            if (pattern.test(sentence)) {
              const confidence = Math.min(0.99, 0.6 + Math.random() * 0.4) // Simuliert Bewertung
              triples.push({ subject, predicate, object, confidence })
              this.logger.debugLog(`[SemanticTripleAgent] Triple: (${subject}, ${predicate}, ${object}) → ${confidence.toFixed(2)}`)
            }
          }
        }
      }
    }

    return triples
  }
}
