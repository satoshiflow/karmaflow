// tests/agents/SemanticTripleAgent.test.ts
import { describe, it, expect } from 'vitest'
import { SemanticTripleAgent } from '../../lib/agents/SemanticTripleAgent'

describe('SemanticTripleAgent', () => {
  const agent = new SemanticTripleAgent(true)

  const input = {
    entities: ['Albert Einstein', 'theoretischer Physiker'],
    relations: ['ist ein'],
    sentences: ['Albert Einstein ist ein theoretischer Physiker.']
  }

  it('should generate valid triples from sentence', () => {
    const result = agent.generateTriples(input)
    expect(result.length).toBeGreaterThan(0)
    const triple = result[0]
    expect(triple.subject).toBe('Albert Einstein')
    expect(triple.predicate).toBe('ist ein')
    expect(triple.object).toBe('theoretischer Physiker')
    expect(triple.confidence).toBeGreaterThan(0.6)
  })

  it('should return no triples for unrelated sentence', () => {
    const result = agent.generateTriples({
      ...input,
      sentences: ['Die Sonne scheint hell.']
    })
    expect(result.length).toBe(0)
  })
})
