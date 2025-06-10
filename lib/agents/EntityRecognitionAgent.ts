// karmaflow/lib/agents/EntityRecognitionAgent.ts
// Axolotl – Empowered by satoshiflow
// Dieser Agent identifiziert benannte Entitäten (Personen, Orte, Organisationen etc.)
// innerhalb eines übergebenen Textes. Er nutzt eine Dummy-Logik zur Extraktion und bewertet die Qualität.

/**
 * @file EntityRecognitionAgent.ts
 * @description
 * Identifiziert benannte Entitäten (Personen, Orte, Organisationen, etc.) in Texten und versieht sie mit Typen und Konfidenzwerten.
 *
 * @example
 * const agent = new EntityRecognitionAgent()
 * const entities = agent.extractEntities("Albert Einstein war ein theoretischer Physiker.")
 *
 * @usage
 * Wird nach der Zusammenfassung verwendet, um strukturierte Informationen zu extrahieren.
 */


import { Logger } from '../utils/logger'
import { AgentError } from '../utils/errorTypes'

interface Entity {
  name: string;
  type: string;
  confidence: number;
}

interface AgentOptions {
  debug?: boolean;
}

interface EntityRecognitionResult {
  entities: Entity[];
  quality: number;
  errors?: string[];
  debugInfo?: any;
}

// Dummy-Funktion zur Entitätenerkennung – später durch LLM ersetzen
async function fakeEntityExtraction(text: string): Promise<Entity[]> {
  const entities: Entity[] = [];

  if (text.includes('Einstein')) {
    entities.push({ name: 'Albert Einstein', type: 'Person', confidence: 0.95 });
  }

  if (text.includes('Physiker')) {
    entities.push({ name: 'Physiker', type: 'Beruf', confidence: 0.85 });
  }

  return entities;
}

export async function entityRecognitionAgent(
  text: string,
  options: AgentOptions = {}
): Promise<EntityRecognitionResult> {
  const logger = new Logger({ debug: options.debug });
  const result: EntityRecognitionResult = {
    entities: [],
    quality: 0
  };

  try {
    logger.debugLog(`[EntityAgent] INPUT: ${text}`);

    const entities = await fakeEntityExtraction(text);
    const quality = entities.length > 0
      ? entities.reduce((acc, e) => acc + e.confidence, 0) / entities.length
      : 0;

    logger.info(`[EntityAgent] Entities: ${JSON.stringify(entities)}`);

    result.entities = entities;
    result.quality = quality;
  } catch (err: any) {
    const message = `[EntityAgent] ERROR: ${err.message}`;
    logger.error(message);
    result.errors = [message];
    throw new AgentError(message);
  }

  return result;
}
