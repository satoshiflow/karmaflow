// tests/agents/EntityRecognitionAgent.test.ts
import { describe, it, expect } from 'vitest'
import { entityRecognitionAgent } from '../../lib/agents/EntityRecognitionAgent'

describe('EntityRecognitionAgent', () => {
  it('should extract known entities from a sentence', async () => {
    const input = 'Albert Einstein war ein theoretischer Physiker.'
    const result = await entityRecognitionAgent(input, { debug: true })

    expect(result.entities.length).toBeGreaterThan(0)
    expect(result.entities[0].name).toContain('Einstein')
    expect(result.quality).toBeGreaterThan(0.5)
  })

  it('should return no entities for irrelevant sentence', async () => {
    const input = 'Das Wetter ist schön heute.'
    const result = await entityRecognitionAgent(input)

    expect(result.entities.length).toBe(0)
    expect(result.quality).toBe(0)
  })
})