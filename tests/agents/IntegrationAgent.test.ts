import { describe, it, expect, beforeEach } from 'vitest'
import { IntegrationAgent } from '../../lib/agents/IntegrationAgent'
import { AlignedTriple } from '../../lib/agents/SchemaAlignmentAgent'

describe('IntegrationAgent', () => {
  let agent: IntegrationAgent

  const sampleTriple: AlignedTriple = {
    subjectUri: 'http://dbpedia.org/resource/Marie_Curie',
    predicateUri: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
    objectUri: 'http://dbpedia.org/ontology/Scientist',
    original: {
      subject: 'Marie Curie',
      predicate: 'ist ein',
      object: 'Wissenschaftlerin',
      confidence: 0.95
    }
  }

  beforeEach(() => {
    agent = new IntegrationAgent(true)
  })

  it('should integrate a new triple', () => {
    const result = agent.integrateTriple(sampleTriple)
    expect(result).toBe(true)

    const graph = agent.exportGraph()
    expect(graph.length).toBe(1)
    expect(graph[0]).toContain('<http://dbpedia.org/resource/Marie_Curie>')
  })

  it('should prevent duplicate entries', () => {
    agent.integrateTriple(sampleTriple)
    const result = agent.integrateTriple(sampleTriple)

    expect(result).toBe(false)
    expect(agent.exportGraph().length).toBe(1)
  })

  it('should reset the graph', () => {
    agent.integrateTriple(sampleTriple)
    agent.reset()
    expect(agent.exportGraph().length).toBe(0)
  })
})
// This test suite checks the IntegrationAgent's ability to integrate semantic triples into a knowledge graph.
// It verifies that triples can be added, prevents duplicates, and allows for graph reset functionality.