import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

import { OrderDetailsProvider } from '../contexts/OrderDetails';

const renderWithContext = (ui: ReactElement, options: RenderOptions) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { renderWithContext as render };
