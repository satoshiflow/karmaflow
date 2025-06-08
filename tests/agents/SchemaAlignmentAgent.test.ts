import { describe, it, expect } from 'vitest'
import { SchemaAlignmentAgent, SemanticTriple } from '../../lib/agents/SchemaAlignmentAgent'

describe('SchemaAlignmentAgent', () => {
  const agent = new SchemaAlignmentAgent()

  it('should align known triple components to URIs', () => {
    const triple: SemanticTriple = {
      subject: 'Albert Einstein',
      predicate: 'ist ein',
      object: 'Physiker',
      confidence: 0.95
    }

    const result = agent.alignTriple(triple)

    expect(result.subjectUri).toMatch(/^http/)
    expect(result.predicateUri).toContain('rdf-syntax')
    expect(result.objectUri).toContain('Physicist')
  })

  it('should fallback to urn:unmapped if term not found', () => {
    const triple: SemanticTriple = {
      subject: 'Max Mustermann',
      predicate: 'erfand',
      object: 'Testologie',
      confidence: 0.9
    }

    const result = agent.alignTriple(triple)

    expect(result.subjectUri).toMatch(/^urn:unmapped:/)
    expect(result.objectUri).toMatch(/^urn:unmapped:/)
  })
})
// This test suite checks the SchemaAlignmentAgent's ability to align semantic triples to URIs based on a predefined ontology.
// It verifies that known terms are correctly mapped to URIs and that unmapped terms fall back to a standardized URI format.