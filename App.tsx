import React, { useState, useCallback } from 'react';
import type { Message, FamilyGroup } from './types.ts';
import { FAMILY_GROUPS } from './constants.ts';
import Header from './components/Header.tsx';
import Toast from './components/Toast.tsx';
import MessageCard from './components/MessageCard.tsx';
import { PaperAirplaneIcon } from './components/icons.tsx';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleGroupSelection = (groupId: string) => {
    setSelectedGroupIds(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleSendMessage = useCallback(() => {
    if (!title || !body || selectedGroupIds.length === 0) {
      return;
    }

    const recipientNames = FAMILY_GROUPS
      .filter(group => selectedGroupIds.includes(group.id))
      .map(group => group.name);

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      title,
      body,
      recipients: recipientNames,
      timestamp: new Date(),
    };

    setMessages(prev => [newMessage, ...prev]);
    setTitle('');
    setBody('');
    setSelectedGroupIds([]);
    setToastMessage('Mensaje enviado y notificación push despachada.');

  }, [title, body, selectedGroupIds]);

  const isFormValid = title.trim() !== '' && body.trim() !== '' && selectedGroupIds.length > 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
      
      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Message Composer */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Crear Nuevo Mensaje</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Título</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Ej: Recordatorio reunión de padres"
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="body" className="block text-sm font-medium text-slate-700 mb-1">Mensaje</label>
              <textarea
                id="body"
                rows={5}
                value={body}
                onChange={e => setBody(e.target.value)}
                placeholder="Escriba aquí el contenido del comunicado..."
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Destinatarios</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {FAMILY_GROUPS.map((group: FamilyGroup) => (
                        <div key={group.id} className="flex items-center">
                            <input
                                id={`group-${group.id}`}
                                type="checkbox"
                                checked={selectedGroupIds.includes(group.id)}
                                onChange={() => handleGroupSelection(group.id)}
                                className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor={`group-${group.id}`} className="ml-2 block text-sm text-slate-900">{group.name}</label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSendMessage}
                disabled={!isFormValid}
                className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
              >
                <PaperAirplaneIcon />
                <span className="ml-2">Enviar Mensaje</span>
              </button>
            </div>
          </div>
        </div>

        {/* Message History */}
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4">Historial de Mensajes</h2>
          {messages.length === 0 ? (
            <div className="text-center bg-white p-10 rounded-xl shadow-md border border-slate-200">
              <p className="text-slate-500">Aún no se han enviado mensajes.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map(msg => (
                <MessageCard key={msg.id} message={msg} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;