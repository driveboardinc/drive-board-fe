'use client';

import { toast } from 'sonner';

interface ToastOptions {
  title?: string;
  description?: string;
}

export const useToast = () => {
  const defaultMessages = {
    success: {
      emoji: '✅',
      title: 'Success',
    },
    error: {
      emoji: '❌',
      title: 'Error',
    },
    warning: {
      emoji: '⚠️',
      title: 'Warning',
    },
    info: {
      emoji: '💡',
      title: 'Information',
    },
  };

  const success = (options?: ToastOptions) => {
    toast(
      `${defaultMessages.success.emoji} ${
        options?.title || defaultMessages.success.title
      }`,
      {
        description: options?.description,
      }
    );
  };

  const error = (options?: ToastOptions) => {
    toast(
      `${defaultMessages.error.emoji} ${
        options?.title || defaultMessages.error.title
      }`,
      {
        description: options?.description,
      }
    );
  };

  const warning = (options?: ToastOptions) => {
    toast(
      `${defaultMessages.warning.emoji} ${
        options?.title || defaultMessages.warning.title
      }`,
      {
        description: options?.description,
      }
    );
  };

  const info = (options?: ToastOptions) => {
    toast(
      `${defaultMessages.info.emoji} ${
        options?.title || defaultMessages.info.title
      }`,
      {
        description: options?.description,
      }
    );
  };

  return {
    success,
    error,
    warning,
    info,
  };
};
