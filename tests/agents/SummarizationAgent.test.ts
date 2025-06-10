// tests/agents/SummarizationAgent.test.ts
import { describe, it, expect } from 'vitest'
import SummarizationAgent from '../../lib/agents/SummarizationAgent'

const agent = new SummarizationAgent(true)

describe('SummarizationAgent', () => {
  it('should return a basic summary for a long text', () => {
    const text = `Albert Einstein war ein theoretischer Physiker. Er entwickelte die Relativitätstheorie.
      Seine Arbeiten hatten großen Einfluss auf die Physik. Er erhielt 1921 den Nobelpreis.`
    const result = agent.summarize(text)
    expect(result.summary.length).toBeGreaterThan(0)
    expect(result.summary.toLowerCase()).toContain('einstein')
  })

  it('should handle empty input gracefully', () => {
    const result = agent.summarize('')
    expect(result.summary).toBe('')
  })
})