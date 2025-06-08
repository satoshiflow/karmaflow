import { describe, it, expect } from 'vitest'
import { ContentSegmentationAgent } from '../../lib/agents/ContentSegmentationAgent'

describe('ContentSegmentationAgent', () => {
  const agent = new ContentSegmentationAgent(true)

  it('should split text into separate segments', () => {
    const input = 'Absatz eins.\n\nAbsatz zwei.'
    const result = agent.segment(input)
    expect(result.segments.length).toBe(2)
    expect(result.segments[0]).toContain('Absatz eins')
  })

  it('should fallback to sentence splitting', () => {
    const input = 'Satz eins. Satz zwei?'
    const result = agent.segment(input)
    expect(result.segments.length).toBeGreaterThan(1)
  })
})
