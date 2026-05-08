'use client';

import { useEffect } from 'react';

import { startAIMonitor } from '@/lib/ai/cheatingAI';
import { startSyncListener } from '@/lib/runtime/syncListener';

export function useCBTRuntime(sendFn) {

  useEffect(() => {

    startAIMonitor();

    startSyncListener(sendFn);

    console.log('✅ CBT Runtime Active');

  }, []);

}
