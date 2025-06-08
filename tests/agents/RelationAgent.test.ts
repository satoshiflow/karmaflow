// tests/agents/RelationAgent.test.ts
import { describe, it, expect } from 'vitest'
import { relationExtractionAgent } from '../../lib/agents/RelationAgent'

describe('RelationAgent', () => {
  it('should extract a valid triple from a sentence', async () => {
    const input = 'Albert Einstein war ein theoretischer Physiker.'
    const result = await relationExtractionAgent(input, { debug: true })

    expect(result.triples.length).toBeGreaterThan(0)
    expect(result.triples[0].subject).toBe('Albert Einstein')
    expect(result.triples[0].predicate).toContain('ist')
    expect(result.triples[0].object).toContain('Physiker')
    expect(result.quality).toBeGreaterThan(0.5)
  })

  it('should return no triples for unstructured input', async () => {
    const input = 'Blauer Himmel über grünem Feld.'
    const result = await relationExtractionAgent(input)

    expect(result.triples.length).toBe(0)
    expect(result.quality).toBe(0)
  })
})