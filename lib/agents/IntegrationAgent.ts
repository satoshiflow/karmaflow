/**
 * @file IntegrationAgent.ts
 * @description
 * Führt die final validierten und alignierten Tripel in ein zentrales Zielsystem ein, z. B. einen Graph-Store oder RDF-Backend.
 *
 * @usage
 * Schließt den KARMA-Verarbeitungszyklus ab und sorgt für eine saubere Persistierung.
 */


import { AlignedTriple } from './SchemaAlignmentAgent'
import { Logger } from '../utils/logger'

export interface KnowledgeGraph {
  triples: Set<string>
}

export class IntegrationAgent {
  private logger: Logger
  private graph: KnowledgeGraph

  constructor(debug = false) {
    this.logger = new Logger({ level: 'INFO', debug })
    this.graph = { triples: new Set() }
  }

  public integrateTriple(triple: AlignedTriple): boolean {
    const tripleKey = `<${triple.subjectUri}> <${triple.predicateUri}> <${triple.objectUri}>`

    if (this.graph.triples.has(tripleKey)) {
      this.logger.debugLog(`[IntegrationAgent] Duplicate ignored: ${tripleKey}`)
      return false // bereits vorhanden
    }

    this.graph.triples.add(tripleKey)
    this.logger.debugLog(`[IntegrationAgent] Added: ${tripleKey}`)
    return true
  }

  public exportGraph(): string[] {
    return Array.from(this.graph.triples)
  }

  public reset(): void {
    this.graph.triples.clear()
    this.logger.debugLog(`[IntegrationAgent] Graph reset`)
  }
}
