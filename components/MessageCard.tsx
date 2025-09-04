import React from 'react';
import type { Message } from '../types.ts';
import { ClockIcon, UsersIcon } from './icons.tsx';

interface MessageCardProps {
  message: Message;
}

const MessageCard: React.FC<MessageCardProps> = ({ message }) => {
  const formattedDate = message.timestamp.toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-5 border border-slate-200 hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-lg font-bold text-slate-800">{message.title}</h3>
      <p className="text-slate-600 mt-2 whitespace-pre-wrap">{message.body}</p>
      <div className="mt-4 pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-slate-500 space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2">
            <UsersIcon />
            <span>Enviado a: {message.recipients.join(', ')}</span>
        </div>
        <div className="flex items-center space-x-2">
            <ClockIcon />
            <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;