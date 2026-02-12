'use client';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ColorModeProvider } from './color-mode';

export function Provider(
  props: React.ComponentProps<typeof ColorModeProvider>,
) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
