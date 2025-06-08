// Axolotl – Empowered by satoshiflow
// Dummy test for EntityRecognitionAgent

import { EntityRecognitionAgent } from '../../lib/agents/EntityRecognitionAgent'

describe('EntityRecognitionAgent', () => {
  it('returns dummy entities', async () => {
    const agent = new EntityRecognitionAgent()
    const result = await agent.run({ document: 'Test document' })
    expect(result.entities).toEqual(['Entity1', 'Entity2'])
  })
})
