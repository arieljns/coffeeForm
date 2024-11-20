import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useUpload } from '../context/preferencesContext';
import PostOrder from './PostOrder';

jest.mock('../context/preferencesContext', () => ({
  useUpload: jest.fn(),
}));

describe('PostOrder Component', () => {
  const mockUploadPreferencesData = jest.fn();

  beforeEach(() => {
    useUpload.mockReturnValue({
      uploadPreferencesData: mockUploadPreferencesData,
    });
    localStorage.clear();
  });

  test('renders recipe data from localStorage', () => {
    const mockRecipe = {
      title: 'Iced Coffee',
      description: 'A refreshing iced coffee.',
      prep_time_minutes: 5,
      ingredients: [
        { name: 'Coffee' },
        { name: 'Ice' },
      ],
    };

    localStorage.setItem('recipeData', JSON.stringify(mockRecipe));

    render(
      <BrowserRouter>
        <PostOrder />
      </BrowserRouter>
    );

    expect(screen.getByText(/Iced Coffee/i)).toBeInTheDocument();
    expect(screen.getByText(/A refreshing iced coffee/i)).toBeInTheDocument();
    expect(screen.getByText(/5 menit/i)).toBeInTheDocument();
    expect(screen.getByText(/Coffee/i)).toBeInTheDocument();
    expect(screen.getByText(/Ice/i)).toBeInTheDocument();
  });

  test('displays error message if recipe data is not in localStorage', () => {
    render(
      <BrowserRouter>
        <PostOrder />
      </BrowserRouter>
    );

    expect(screen.queryByText(/Iced Coffee/i)).not.toBeInTheDocument();
  });

  test('calls uploadPreferencesData when regenerate is clicked', () => {
    localStorage.setItem('preferences', JSON.stringify({ preference: 'strong' }));

    render(
      <BrowserRouter>
        <PostOrder />
      </BrowserRouter>
    );

    const regenerateButton = screen.getByText(/Regenerate/i);
    fireEvent.click(regenerateButton);

    expect(mockUploadPreferencesData).toHaveBeenCalledWith({ preference: 'strong' });
  });

  test('navigates to the payment page when the payment button is clicked', () => {
    render(
      <BrowserRouter>
        <PostOrder />
      </BrowserRouter>
    );

    const paymentButton = screen.getByText(/Pembayaran/i);
    fireEvent.click(paymentButton);

    expect(window.location.pathname).toBe('/payment');
  });

  test('renders add-ons section', () => {
    render(
      <BrowserRouter>
        <PostOrder />
      </BrowserRouter>
    );

    expect(screen.getByText(/Add Ons:/i)).toBeInTheDocument();
    expect(screen.getByText(/Foam/i)).toBeInTheDocument();
    expect(screen.getByText(/Caramel Syrup/i)).toBeInTheDocument();
    expect(screen.getByText(/Pystachio Syrup/i)).toBeInTheDocument();
  });
});
