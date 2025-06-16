import { render, fireEvent, screen } from '@testing-library/react';
import Accordion from '@/components/utils/accordion';

describe('Accordion', () => {
  test('content hidden by default and visible after click', () => {
    render(<Accordion title="Example">Content</Accordion>);
    const content = screen.getByText('Content');
    expect(content).not.toBeVisible();

    const button = screen.getByRole('button', { name: /example/i });
    fireEvent.click(button);
    expect(content).toBeVisible();
  });

  test('active prop opens accordion initially', () => {
    render(
      <Accordion title="Example" active>
        Content
      </Accordion>
    );
    expect(screen.getByText('Content')).toBeVisible();
  });
});
