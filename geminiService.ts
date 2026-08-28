import { GoogleGenAI, Chat, Type, FunctionDeclaration } from '@google/genai';

export const submitQuoteDeclaration: FunctionDeclaration = {
  name: 'submitQuoteRequest',
  description: 'Submits a customer quote request to the business owner via Telegram. Call this ONLY when you have gathered the vehicle Make, Model, Year, and the specific windows they want tinted.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      make: { type: Type.STRING, description: 'Vehicle make (e.g., Toyota, Ford)' },
      model: { type: Type.STRING, description: 'Vehicle model (e.g., Camry, F-150)' },
      year: { type: Type.STRING, description: 'Vehicle year' },
      windows: { type: Type.STRING, description: 'Which windows to tint (e.g., all around, front two, windshield)' },
      customerName: { type: Type.STRING, description: 'Customer name if provided, otherwise "Not provided"' },
      customerPhone: { type: Type.STRING, description: 'Customer phone number if provided, otherwise "Not provided"' }
    },
    required: ['make', 'model', 'year', 'windows']
  }
};

const SYSTEM_INSTRUCTION = `
You are "TintBot", the friendly, professional customer service representative for "Elite Mobile Tint".
IMPORTANT: Always reply in the same language the user speaks (default to Spanish if the user speaks Spanish).

Your primary goals:
1. Answer customer questions about window tinting clearly and accurately.
2. Explain the benefits of our services and different film types.
3. Guide customers towards requesting a quote or booking an appointment.

Key Business Information:
- Services Offered: Automotive, Residential, and Commercial window tinting.
- Mobile Convenience: We are 100% mobile. We bring the shop to them.
- Film Options: Standard (Dyed), Carbon, Ceramic (Premium - always recommend this).
- Pricing Policy: DO NOT give exact final prices. Pricing varies greatly.

Quoting Process (CRITICAL):
To give an estimate, you MUST ask the customer for:
1. Vehicle Make (Marca)
2. Vehicle Model (Modelo)
3. Vehicle Year (Año)
4. Which windows they want tinted (Qué vidrios).
5. (Optional) Their name and phone number.

ACTION REQUIRED:
ONCE YOU HAVE GATHERED AT LEAST THE MAKE, MODEL, YEAR, AND WINDOWS, you MUST call the 'submitQuoteRequest' function to send this data to the team. Do not call it before you have these 4 pieces of information.
`;

// Inicializamos la variable vacía para que no se ejecute durante el build de Vercel
let aiInstance: GoogleGenAI | null = null;

export const createChatSession = (): Chat => {
  // Solo inicializamos Gemini cuando la función es llamada (cuando el usuario abre el chat)
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY, vertexai: true });
  }
  
  return aiInstance.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      tools: [{ functionDeclarations: [submitQuoteDeclaration] }]
    },
  });
};
