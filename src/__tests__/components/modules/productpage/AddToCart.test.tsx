import { fireEvent, render, screen } from '@testing-library/react';
import AddToCart from '@/components/modules/productpage/AddToCart';
import mongoose from 'mongoose';


describe('addToCartBtn', () => {

    it('renders correctly if stock is > 0', () => {
        render(<AddToCart productId={new mongoose.Types.ObjectId()} productName='coffee' stock={2} />);
        const addButton = screen.getByRole('button', { name: /افزودن به سبد خرید/i });
        const increaseCountButton = screen.getByRole('button', { name: '+' });
        const minusCountButton = screen.getByRole('button', { name: '-' });

        expect(addButton).toBeInTheDocument();
        expect(increaseCountButton).toBeInTheDocument();
        expect(minusCountButton).toBeInTheDocument();
    });

    it('renders correctly if stock is = 0', () => {
        render(<AddToCart productId={new mongoose.Types.ObjectId()} productName='coffee' stock={0} />);
        const addButton = screen.getByRole('button', { name: /افزودن به سبد خرید/i });
        const increaseCountButton = screen.getByRole('button', { name: '+' });
        const minusCountButton = screen.getByRole('button', { name: '-' });

        expect(addButton).toBeInTheDocument();
        expect(increaseCountButton).toBeInTheDocument();
        expect(minusCountButton).toBeInTheDocument();
    });

    it('should display correct stock if stock > 0', () => {
        render(<AddToCart productId={new mongoose.Types.ObjectId()} productName='coffee' stock={20} />);
        const stockText = screen.getByText('۲۰ عدد موجود است.');
        expect(stockText).toBeInTheDocument();
    });

    it('should display correct stock and be disabled if stock = 0', () => {
        render(<AddToCart productId={new mongoose.Types.ObjectId()} productName='coffee' stock={0} />);
        const stockText = screen.getByText('این محصول موجود نیست !');
        expect(stockText).toBeInTheDocument();

        const addBtn = screen.getByRole('button', { name: /افزودن به سبد خرید/i });
        const increaseCountButton = screen.getByRole('button', { name: '+' });
        const minusCountButton = screen.getByRole('button', { name: '-' });

        expect(addBtn).toBeDisabled();
        expect(increaseCountButton).toBeDisabled();
        expect(minusCountButton).toBeDisabled();
    });

    it('should increase count when + button is clicked', () => {
        render(<AddToCart productId={new mongoose.Types.ObjectId()} productName='coffee' stock={3} />);
        const countSpan = screen.getByTestId('countspan');
        expect(countSpan).toBeInTheDocument();

        const increaseCountButton = screen.getByRole('button', { name: '+' });

        fireEvent.click(increaseCountButton);
        expect(countSpan).toHaveTextContent('2');

        fireEvent.click(increaseCountButton);
        expect(countSpan).toHaveTextContent('3');

        fireEvent.click(increaseCountButton);
        expect(countSpan).toHaveTextContent('3');
    });

    it('should decrease count when - button is clicked', () => {
        render(<AddToCart productId={new mongoose.Types.ObjectId()} productName='coffee' stock={10} />);
        const countSpan = screen.getByTestId('countspan');
        expect(countSpan).toBeInTheDocument();

        const increaseCountButton = screen.getByRole('button', { name: '+' });
        const minusCountButton = screen.getByRole('button', { name: '-' });

        fireEvent.click(minusCountButton);
        expect(countSpan).toHaveTextContent('1');

        fireEvent.click(increaseCountButton);
        fireEvent.click(increaseCountButton);
        fireEvent.click(increaseCountButton);

        fireEvent.click(minusCountButton);
        expect(countSpan).toHaveTextContent('3');
    });

});