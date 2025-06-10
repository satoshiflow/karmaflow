/**
 * Interface zur Beschreibung eines ThinkTank-Agenten
 */

export interface Tool {
    id: string;             // Eindeutige Tool-ID (z.B. "validate")
    name: string;           // Anzeigename (z.B. "Validate with Search")
    icon?: string;          // Optional: Icon-Name (Lucide oder eigenes SVG)
    description?: string;   // Optional: Tooltip oder Erklärung
    active?: boolean;       // Tool aktiv/inaktiv
}

export interface Agent {
    id: string;             // Eindeutige Agenten-ID
    name: string;           // Anzeigename
    role: string;           // Rolle (z.B. "Researcher", "Strategist")
    avatarUrl: string;      // URL zum Avatar (kann statisch oder AI-generiert sein)
    description?: string;   // Optional: Beschreibung
    color?: string;         // Optional: UI-Akzentfarbe
    tools: Tool[];          // Liste der Tools, die dieser Agent nutzen kann
    debug?: boolean;        // Debug-Modus aktiviert (Fehler an Benutzer senden)
}