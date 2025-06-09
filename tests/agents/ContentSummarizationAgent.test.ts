import { describe, it, expect } from 'vitest'
import { ContentSummarizationAgent } from '../../lib/agents/ContentSummarizationAgent'

describe('ContentSummarizationAgent', () => {
  const agent = new ContentSummarizationAgent(true)

  it('should create summaries for each segment', () => {
    const segments = [
      'Albert Einstein war ein theoretischer Physiker.',
      'Er entwickelte die Relativitätstheorie und erhielt den Nobelpreis.'
    ]
    const result = agent.summarize(segments)
    expect(result.summaries.length).toBe(segments.length)
    expect(result.summaries[0].length).toBeGreaterThan(0)
  })
})
