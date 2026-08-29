import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Chat } from '@google/genai';
import { createChatSession } from '../services/geminiService';
import { Message } from '../types';
import { SendIcon, ChatIcon, CloseIcon, SparklesIcon } from './Icons';

const formatText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
};

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && !chatRef.current) {
      try {
        chatRef.current = createChatSession();
        setMessages([
          {
            id: Date.now().toString(),
            role: 'model',
            text: "¡Hola! 👋 Soy TintBot de Elite Mobile Tint. ¿En qué te puedo ayudar hoy? ¿Buscas cotizar el polarizado de tu auto o casa?",
            timestamp: Date.now(),
          }
        ]);
      } catch (error) {
        console.error("Failed to initialize chat:", error);
        setMessages([
          {
            id: Date.now().toString(),
            role: 'error',
            text: "Lo siento, tengo problemas para conectarme en este momento. Por favor intenta más tarde.",
            timestamp: Date.now(),
          }
        ]);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSendMessage = useCallback(async () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading || !chatRef.current) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: trimmedInput,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: trimmedInput });
      let responseText = response.text || "";

      if (response.functionCalls && response.functionCalls.length > 0) {
        const call = response.functionCalls[0];
        
        if (call.name === 'submitQuoteRequest') {
          const args = call.args as any;
          const telegramToken = "8731741722:AAGojwSHeg6MMcbrnn4AHjsmdnXZfGmJZPA";
          const chatId = "7682322729";

          if (telegramToken && chatId) {
            const text = `🚨 *Nueva Solicitud de Cotización* 🚨\n\n*Vehículo:* ${args.year} ${args.make} ${args.model}\n*Vidrios:* ${args.windows}\n*Nombre:* ${args.customerName || 'No provisto'}\n*Teléfono:* ${args.customerPhone || 'No provisto'}`;
            
            try {
              await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId, text: text, parse_mode: 'Markdown' })
              });
            } catch (e) {
              console.error("Error sending to Telegram", e);
            }
          }

          const followUp = await chatRef.current.sendMessage({ 
            message: `System: The quote request was successfully sent to the team via Telegram. Please confirm this to the user politely.` 
          });
          
          responseText = followUp.text || "¡He enviado tu solicitud a nuestro equipo! Se pondrán en contacto contigo pronto con una cotización.";
        }
      }

      if (!responseText) {
        responseText = "Lo siento, no pude procesar eso.";
      }

      const newModelMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now(),
      };
      
      setMessages((prev) => [...prev, newModelMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'error',
        text: "¡Ups! Algo salió mal al enviar tu mensaje. Por favor intenta de nuevo.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 transition-all duration-300 ease-in-out transform origin-bottom-right">
          <div className="bg-brand-950 text-white p-4 flex justify-between items-center shadow-md z-10">
            <div className="flex items-center space-x-2">
              <div className="bg-brand-500 p-1.5 rounded-full">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Elite Tint Support</h3>
                <p className="text-xs text-brand-100 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-400 mr-1 animate-pulse"></span>
                  En línea
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white transition-colors p-1 rounded-md hover:bg-brand-900"
              aria-label="Close chat"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-brand-600 text-white rounded-br-none' 
                      : msg.role === 'error'
                        ? 'bg-red-100 text-red-800 border border-red-200 rounded-bl-none'
                        : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                  }`}
                >
                  {msg.role === 'model' ? (
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {formatText(msg.text)}
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex space-x-1.5 items-center">
                  <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-2 py-1 focus-within:ring-2 focus-within:ring-brand-500 focus-within:border-transparent transition-all">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu mensaje..."
                className="flex-1 bg-transparent border-none focus:outline-none px-3 py-2 text-sm text-gray-700 placeholder-gray-400"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className={`p-2 rounded-full transition-colors flex-shrink-0 ${
                  inputValue.trim() && !isLoading 
                    ? 'bg-brand-600 text-white hover:bg-brand-700 shadow-sm' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                aria-label="Send message"
              >
                <SendIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center mt-2">
              <span className="text-[10px] text-gray-400">Powered by AI • Elite Mobile Tint</span>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-500/50 ${
          isOpen ? 'bg-gray-800 text-white rotate-90' : 'bg-brand-600 text-white hover:bg-brand-500'
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <CloseIcon className="w-6 h-6" /> : <ChatIcon className="w-7 h-7" />}
      </button>
    </div>
  );
};