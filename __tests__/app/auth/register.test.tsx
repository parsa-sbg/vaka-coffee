import Register from '@/app/(auth)/register/page'
import { fireEvent, render, screen } from '@testing-library/react'
import { Toaster } from 'react-hot-toast';


jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

// const mockReplace = jest.fn();
// (useRouter as jest.Mock).mockReturnValue({
//     replace: mockReplace,
// });




describe('register page tests', () => {

    it('render form correctly', () => {
        render(<Register />)

        expect(screen.getByPlaceholderText('نام')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('نام کاربری')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('شماره موبایل')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('رمز عبور')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('تکرار رمز عبور')).toBeInTheDocument()
    })

    it('data validation', () => {
        render(<>
            <Register />
            <Toaster />
        </>)

        const nameInput = screen.getByPlaceholderText('نام')
        const usernameInput = screen.getByPlaceholderText('نام کاربری')
        const passwordInput = screen.getByPlaceholderText('رمز عبور')
        const repeatPasswordInput = screen.getByPlaceholderText('تکرار رمز عبور')
        const phoneInput = screen.getByPlaceholderText('شماره موبایل')

        const submitButton = screen.getByRole('button', { name: 'ثبت نام' })

        fireEvent.change(nameInput, { target: { value: 'parsa' } })
        fireEvent.change(usernameInput, { target: { value: 'parsa1212' } })
        fireEvent.change(passwordInput, { target: { value: '12345vdzx678' } })
        fireEvent.change(repeatPasswordInput, { target: { value: '12345675165' } })
        fireEvent.change(phoneInput, { target: { value: '09666666666' } })

        fireEvent.click(submitButton)

        expect(screen.getByText("تکرار رمز عبور صحیح نیست !")).toBeInTheDocument()
        


    })
})