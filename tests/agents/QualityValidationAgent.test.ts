// tests/agents/QualityValidationAgent.test.ts

import { describe, it, expect } from 'vitest'
import { QualityValidationAgent, SemanticTriple } from '../../lib/agents/QualityValidationAgent'

// Agent mit Debugmodus
const agent = new QualityValidationAgent(true)

describe('QualityValidationAgent', () => {
  // Beispiel-Triples
  const triples: { triple: SemanticTriple; shouldPass: boolean }[] = [
    {
      triple: {
        subject: 'Isaac Newton',
        predicate: 'entdeckte',
        object: 'das Gravitationsgesetz',
        confidence: 0.9
      },
      shouldPass: true
    },
    {
      triple: {
        subject: 'Einstein',
        predicate: 'war ein',
        object: 'sehr berühmter Denker der modernen Physik',
        confidence: 0.68
      },
      shouldPass: false // bewusst unter Score-Schwelle
    },
    {
      triple: {
        subject: 'Spaghetti',
        predicate: 'ist ein',
        object: 'Mondfahrzeug',
        confidence: 0.3
      },
      shouldPass: false
    }
  ]

  triples.forEach(({ triple, shouldPass }, index) => {
    it(`should ${shouldPass ? 'pass' : 'fail'} triple #${index + 1}`, () => {
      const result = agent.scoreTriple(triple)
      expect(result.passed).toBe(shouldPass)
    })
  })
})
