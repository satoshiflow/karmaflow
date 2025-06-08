// Axolotl – Empowered by satoshiflow
// ConflictResolutionAgent – Resolves conflicting triples and maintains graph consistency

import { Logger } from '../utils/logger'
import { AgentError } from '../utils/errorTypes'

export interface SemanticTriple {
  subject: string
  predicate: string
  object: string
  confidence: number
}

export interface ConflictResolutionInput {
  triples: SemanticTriple[]
  strategy?: 'majority' | 'highest-confidence'
}

export interface ConflictResolutionResult {
  resolvedTriples: SemanticTriple[]
  conflictsResolved: number
}

export class ConflictResolutionAgent {
  private logger: Logger

  constructor(debug = false) {
    this.logger = new Logger({ level: 'INFO', debug })
  }

  public resolveConflicts(input: ConflictResolutionInput): ConflictResolutionResult {
    const { triples, strategy = 'highest-confidence' } = input
    const grouped: Record<string, SemanticTriple[]> = {}

    // Gruppiere nach (subject + predicate)
    for (const triple of triples) {
      const key = `${triple.subject}::${triple.predicate}`
      if (!grouped[key]) grouped[key] = []
      grouped[key].push(triple)
    }

    const resolvedTriples: SemanticTriple[] = []
    let conflictCount = 0

    for (const [key, group] of Object.entries(grouped)) {
      if (group.length === 1) {
        resolvedTriples.push(group[0])
        continue
      }

      conflictCount++
      let selected: SemanticTriple | null = null

      if (strategy === 'highest-confidence') {
        selected = group.reduce((prev, curr) => (curr.confidence > prev.confidence ? curr : prev))
      } else if (strategy === 'majority') {
        const freqMap: Record<string, { triple: SemanticTriple, count: number }> = {}
        for (const triple of group) {
          const obj = triple.object
          if (!freqMap[obj]) freqMap[obj] = { triple, count: 0 }
          freqMap[obj].count++
        }
        const majority = Object.values(freqMap).sort((a, b) => b.count - a.count)[0]
        selected = majority.triple
      }

      if (!selected) throw new AgentError('Unable to resolve conflict for triple group: ' + key)

      this.logger.debugLog(`[ConflictResolutionAgent] Conflict resolved for ${key} → ${selected.object}`)
      resolvedTriples.push(selected)
    }

    return {
      resolvedTriples,
      conflictsResolved: conflictCount
    }
  }
}
