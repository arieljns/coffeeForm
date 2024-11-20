import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useUpload } from '../context/preferencesContext';
import ScrollableForm from './form';

jest.mock('../context/preferencesContext', () => ({
  useUpload: jest.fn(),
}));

describe('ScrollableForm Component', () => {
  const mockUploadPreferencesData = jest.fn();

  beforeEach(() => {
    useUpload.mockReturnValue({
      uploadPreferencesData: mockUploadPreferencesData,
    });
    localStorage.clear();
  });

  test('renders the first question and SVG correctly', () => {
    render(
      <BrowserRouter>
        <ScrollableForm />
      </BrowserRouter>
    );

    expect(screen.getByText(/Hari Ini Kamu Mau Apa\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Kopi/i)).toBeInTheDocument();
    expect(screen.getByText(/Teh/i)).toBeInTheDocument();
  });

  test('moves to the next step when a choice is clicked', () => {
    render(
      <BrowserRouter>
        <ScrollableForm />
      </BrowserRouter>
    );

    // Click "Kopi"
    fireEvent.click(screen.getByText(/Kopi/i));

    // Verify the second question
    expect(screen.getByText(/Mau Kopi Yang Manis Atau Pekat\?/i)).toBeInTheDocument();
  });

  test('updates formData when an option is selected', () => {
    render(
      <BrowserRouter>
        <ScrollableForm />
      </BrowserRouter>
    );

    // Select "Kopi"
    fireEvent.click(screen.getByText(/Kopi/i));

    // Select "Sweet"
    fireEvent.click(screen.getByText(/Sweet/i));

    // Verify the formData updates in context
    expect(screen.getByText(/Mau Kopi nya Pakai Susu\?/i)).toBeInTheDocument();
  });

  test('renders the submit button and calls uploadPreferencesData on submit', () => {
    render(
      <BrowserRouter>
        <ScrollableForm />
      </BrowserRouter>
    );

    // Navigate through all steps
    fireEvent.click(screen.getByText(/Kopi/i)); // Step 1
    fireEvent.click(screen.getByText(/Sweet/i)); // Step 2
    fireEvent.click(screen.getByText(/Iya Pake Susu/i)); // Step 3
    fireEvent.click(screen.getByText(/Iya Creamy/i)); // Step 4

    // Verify the submit step is visible
    expect(screen.getByText(/Submit Order Kamu Disini/i)).toBeInTheDocument();

    // Click submit
    fireEvent.click(screen.getByText(/Submit Order/i));

    // Verify the data was uploaded and stored in localStorage
    expect(mockUploadPreferencesData).toHaveBeenCalledWith({
      beverageType: 'Kopi',
      sweetness: 'manis',
      milk: 'dengan susu',
      creaminess: 'creamy',
    });
    expect(localStorage.getItem('preferences')).toBe(JSON.stringify({
      beverageType: 'Kopi',
      sweetness: 'manis',
      milk: 'dengan susu',
      creaminess: 'creamy',
    }));
  });

  test('renders progress bar updates during navigation', () => {
    render(
      <BrowserRouter>
        <ScrollableForm />
      </BrowserRouter>
    );

    // Verify progress bar width changes as steps progress
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar.style.width).toBe('20%'); // Initial step

    fireEvent.click(screen.getByText(/Kopi/i)); // Step 1
    expect(progressBar.style.width).toBe('40%'); // Step 2

    fireEvent.click(screen.getByText(/Sweet/i)); // Step 2
    expect(progressBar.style.width).toBe('60%'); // Step 3
  });

  test('scrolls to the correct question when step changes', () => {
    render(
      <BrowserRouter>
        <ScrollableForm />
      </BrowserRouter>
    );

    // Mock scrollIntoView to observe behavior
    const mockScrollIntoView = jest.fn();
    Element.prototype.scrollIntoView = mockScrollIntoView;

    fireEvent.click(screen.getByText(/Kopi/i)); // Step 1

    // Verify scrolling is triggered for the second step
    expect(mockScrollIntoView).toHaveBeenCalled();
  });
});
