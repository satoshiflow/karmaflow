import React, { useState } from 'react'
import Markdown from 'react-markdown'

// Tool-Typ: definiert ein interaktives Werkzeug für den Agenten
interface Tool {
    id: string
    name: string
}

// Nachrichtentyp: definiert die Struktur eines Chateintrags
interface Message {
    role: string
    content: string
    tools?: Tool[]
}

// Beispielkonversation mit Markdown + Tools
const mockMessages: Message[] = [
    {
        role: 'user',
        content: 'How can we address the issue of urban traffic congestion?'
    },
    {
        role: 'Researcher',
        content: `### Addressing Urban Traffic Congestion
- Improving public transportation
- Implementing congestion pricing
- Optimizing traffic signal timings
- Promoting remote work`,
        tools: [
            { id: 'validate', name: 'validate with search' },
            { id: 'download', name: 'download' }
        ]
    },
    {
        role: 'user',
        content: 'Can you explain the second strategy in more detail?'
    }
]

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>(mockMessages)
    const [input, setInput] = useState('')

    const sendMessage = () => {
        if (!input.trim()) return
        setMessages([...messages, { role: 'user', content: input }])
        setInput('')
        // TODO: API-Aufruf zur Weiterleitung an LLM-Agenten
    }

    return (
        <div className="flex flex-col w-full h-screen p-4 bg-muted">
            <div className="flex-1 overflow-y-auto space-y-4">
                {messages.map((msg, i) => (
                    <div key={i} className="bg-background p-4 rounded-md shadow-md">
                        <div className="font-bold mb-1">{msg.role}</div>
                        <Markdown className="prose prose-sm text-foreground">
                            {msg.content}
                        </Markdown>
                        {msg.tools && (
                            <div className="flex gap-2 mt-2">
                                {msg.tools.map((tool) => (
                                    <button key={tool.id} className="px-3 py-1 text-sm bg-secondary rounded">
                                        {tool.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-4 flex items-center gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1 p-2 rounded border"
                    placeholder="Type a message..."
                />
                <button
                    onClick={sendMessage}
                    className="px-4 py-2 bg-primary text-white rounded"
                >
                    Send
                </button>
            </div>
        </div>
    )
}

// Hinweis: Agenten-spezifisches Logging, Debug-Ausgaben und Fehlernachrichten
// können als zusätzliche Nachrichten durch Middleware oder im API-Handler eingefügt werden.
// Diese können dann im Chatverlauf angezeigt werden, um den Agenten-Status zu überwachen.
// Beispiel: { role: 'debug', content: 'Agent initialized with tools: validate, download' }
// Diese Nachrichten können dann im Frontend speziell formatiert werden, z.B. mit rotem Text oder Icon.
// Das ermöglicht eine klare Trennung zwischen Benutzerinteraktionen und Agenten-Feedback.
// Diese Struktur ermöglicht es, den Chatverlauf dynamisch zu erweitern und
// gleichzeitig die Interaktivität der Tools zu gewährleisten. Die Verwendung von Markdown
// ermöglicht eine ansprechende Formatierung der Nachrichten, während die Tool-Buttons
// eine einfache Interaktion mit den Agenten-Tools bieten. Die Implementierung von
// API-Aufrufen und Middleware-Logik kann später hinzugefügt werden, um die
// Funktionalität zu erweitern und die Agenten-Interaktionen zu ermöglichen.
// Die Verwendung von React Hooks ermöglicht eine reaktive Aktualisierung des Chatverlaufs
// und eine einfache Handhabung von Benutzereingaben. Die Integration von Markdown
// sorgt für eine ansprechende Darstellung der Nachrichten, während die Tool-Buttons
// eine einfache Interaktion mit den Agenten-Tools ermöglichen. 