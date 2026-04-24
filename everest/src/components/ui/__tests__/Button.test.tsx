import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Button from '../Button';

describe('Button Component', () => {
    it('renders the children correctly', () => {
        render(<Button>Click Me</Button>);
        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('applies the correct variant class', () => {
        const { container } = render(<Button variant="secondary">Secondary</Button>);
        // Based on Button.tsx, the secondary variant has text-white, bg-transparent and border-2
        expect(container.firstChild).toHaveClass('bg-transparent');
        expect(container.firstChild).toHaveClass('text-white');
    });

    it('renders as an anchor tag when "as" prop is "a"', () => {
        render(
            <Button as="a" href="https://example.com">
                Link Button
            </Button>
        );
        const link = screen.getByRole('link', { name: 'Link Button' });
        expect(link).toHaveAttribute('href', 'https://example.com');
    });

    it('renders an icon if passed', () => {
        render(<Button icon="fas fa-home">Home</Button>);
        // Because iconPosition defaults to right, it should be in the document
        // the <i> tag should have the class
        const iconElement = document.querySelector('.fas.fa-home');
        expect(iconElement).toBeInTheDocument();
    });
});
