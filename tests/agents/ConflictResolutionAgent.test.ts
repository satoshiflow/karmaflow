// tests/agents/ConflictResolutionAgent.test.ts
import { describe, it, expect } from 'vitest'
import { ConflictResolutionAgent, SemanticTriple } from '../../lib/agents/ConflictResolutionAgent'

describe('ConflictResolutionAgent', () => {
  const agent = new ConflictResolutionAgent(true)

  const sampleTriples: SemanticTriple[] = [
    { subject: 'Paris', predicate: 'is capital of', object: 'France', confidence: 0.9 },
    { subject: 'Paris', predicate: 'is capital of', object: 'Germany', confidence: 0.5 },
    { subject: 'Paris', predicate: 'is capital of', object: 'France', confidence: 0.7 },
    { subject: 'Berlin', predicate: 'is capital of', object: 'Germany', confidence: 0.95 }
  ]

  it('should resolve conflicts using highest-confidence strategy', () => {
    const result = agent.resolveConflicts({ triples: sampleTriples, strategy: 'highest-confidence' })
    expect(result.resolvedTriples.length).toBe(2)
    expect(result.conflictsResolved).toBe(1)
    expect(result.resolvedTriples.find(t => t.subject === 'Paris')?.object).toBe('France')
  })

  it('should resolve conflicts using majority strategy', () => {
    const result = agent.resolveConflicts({ triples: sampleTriples, strategy: 'majority' })
    expect(result.resolvedTriples.length).toBe(2)
    expect(result.conflictsResolved).toBe(1)
    expect(result.resolvedTriples.find(t => t.subject === 'Paris')?.object).toBe('France')
  })

  it('should return all unique triples if no conflicts', () => {
    const cleanTriples: SemanticTriple[] = [
      { subject: 'A', predicate: 'has', object: 'X', confidence: 0.8 },
      { subject: 'B', predicate: 'has', object: 'Y', confidence: 0.9 }
    ]
    const result = agent.resolveConflicts({ triples: cleanTriples })
    expect(result.resolvedTriples).toEqual(cleanTriples)
    expect(result.conflictsResolved).toBe(0)
  })
})
