import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrencies, getCurrencyPrice } from '../redux/currency/currencySlice';
import { changeMoney } from '../redux/money/moneySlice';
import Home from '../routes/Home';
import CurrencyComponent from '../components/Currency';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
  useEffect: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  NavLink: jest.fn().mockReturnValue('<a>Mock Link</a>'),
}));
jest.mock('../redux/currency/currencySlice', () => ({
  getCurrencies: jest.fn(),
  getCurrencyPrice: jest.fn(),
}));

describe('Home component', () => {
  it('renders search bar', () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockReturnValueOnce({});
    render(<Home />);
    expect(screen.getByPlaceholderText('search by code')).toBeInTheDocument();
  });

  it('dispatches getCurrencies and getCurrencyPrice actions on mount', () => {
    useSelector.mockReturnValueOnce({});
    const dispatch = jest.fn((value) => value);
    useDispatch.mockReturnValue(dispatch);
    render(<Home />);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(getCurrencies());
    expect(dispatch).toHaveBeenCalledWith(getCurrencyPrice());
  });


  it('displays error message when search is empty', () => {
    useSelector.mockReturnValueOnce({});
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    render(<Home />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Please enter a currency code')).toBeInTheDocument();
    setTimeout(() => {
      expect(screen.queryByText('Please enter a currency code')).not.toBeInTheDocument();
    }, 3000);
  });

  it('dispatches changeMoney action when money input changes', () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockReturnValueOnce({});
    render(<Home />);
    fireEvent.change(screen.getByPlaceholderText('How much money? (USD)'), { target: { value: 50 } });
    expect(dispatch).toHaveBeenCalledWith(changeMoney('50'));
  });
});

describe('Currency component', () => {
  it('renders correctly with all required props', () => {
    const props = {
      title: 'Bitcoin',
      description: 'A decentralized digital currency',
      price: 55000,
      color: 1,
    };
    render(<CurrencyComponent
      title={props.title}
      description={props.description}
      price={props.price}
      color={props.color}
    />);
    screen.debug();
    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.description)).toBeInTheDocument();
    expect(screen.getByText(props.price.toString())).toBeInTheDocument();
  });
  it('defaults to 0 if the price prop is not provided', () => {
    const props = {
      title: 'Ethereum',
      description: 'A blockchain-based software platform',
      color: 2,
    };
    render(<CurrencyComponent
      title={props.title}
      description={props.description}
      color={props.color}
    />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });
  it('applies the correct class name based on the color prop', () => {
    const props1 = {
      title: 'Bitcoin',
      description: 'A decentralized digital currency',
      price: 55000,
      color: 1,
    };
    const props2 = {
      title: 'Ethereum',
      description: 'A blockchain-based software platform',
      price: 3000,
      color: 2,
    };
    render(
      <>
        <CurrencyComponent
          title={props1.title}
          description={props1.description}
          color={props1.color}
        />
        <CurrencyComponent
          title={props2.title}
          description={props2.description}
          color={props2.color}
        />
      </>,
    );
    screen.debug();

    const currency1 = document.querySelector('.color1');
    const currency2 = document.querySelector('.color2');

    expect(currency1).toBeInTheDocument();
    expect(currency2).toBeInTheDocument();
  });
});
