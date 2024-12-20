import { fireEvent, render, screen } from '@testing-library/react';
import AddToCart from '@/components/modules/productpage/AddToCart';
import mongoose from 'mongoose';

// Mocking Zustand store
jest.mock('@/store/cartStore', () => ({
    useCartStore: jest.fn(),
}));

describe('addToCartBtn', () => {
    let addToCartMock: () => void;

    beforeEach(() => {
        // Create a mock function for addToCart
        addToCartMock = jest.fn();

        // Return the mock function in the store mock
        require('@/store/cartStore').useCartStore.mockReturnValue({
            addToCart: addToCartMock,
        });
    });

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
        expect(countSpan).toHaveTextContent('3'); // Max stock limit reached
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

    it('should call addToCart function with correct args', () => {
        const objectId = new mongoose.Types.ObjectId()
        const productName = 'coffee'
        render(<AddToCart productId={objectId} productName={productName} stock={10} />);
        const addBtn = screen.getByRole('button', { name: 'افزودن به سبد خرید' });
        const increaseCountButton = screen.getByRole('button', { name: '+' });


        fireEvent.click(increaseCountButton);

        fireEvent.click(addBtn);

        // Check if the mock function has been called
        expect(addToCartMock).toHaveBeenCalledWith(objectId, 2, productName);
    });
});