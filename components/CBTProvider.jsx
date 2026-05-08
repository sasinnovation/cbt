'use client';

import { useCBTRuntime } from '@/hooks/useCBTRuntime';

export default function CBTProvider({ children }) {

  async function sendToServer(data) {

    try {

      await fetch('/api/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

    } catch (err) {

      console.error(err);

    }

  }

  useCBTRuntime(sendToServer);

  return children;
}
