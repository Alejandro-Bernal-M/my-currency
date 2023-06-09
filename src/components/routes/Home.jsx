import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { getCurrencies, getCurrencyPrice } from '../../redux/currency/currencySlice';
import CurrencyComponent from '../Currency';
import { changeMoney } from '../../redux/money/moneySlice';

const Home = () => {
  const dispatch = useDispatch();
  const currencies = useSelector((state) => state.currency.allCurrencies);
  const price = useSelector((state) => state.currency.usdPrice);
  const money = useSelector((state) => state.money.value);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCurrencies());
    dispatch(getCurrencyPrice());
  }, [dispatch]);

  const handleSearch = () => {
    const search = document.querySelector('.search');
    const error = document.querySelector('.error');
    if (search.value === '') {
      error.textContent = 'Please enter a currency code';
      setTimeout(() => {
        error.textContent = '';
      }, 3000);
    } else {
      error.textContent = '';
      if (!currencies[search.value.toLowerCase()]) {
        error.textContent = 'Currency not found';
        setTimeout(() => {
          error.textContent = '';
        }, 3000);
      } else {
        error.textContent = '';
        navigate(`/${search.value.toLowerCase()}`);
      }
    }
  };

  const handleChange = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleMoney = (e) => {
    dispatch(changeMoney(e.target.value));
  };

  let color = 0;

  return (
    <div className="App">
      <div className="search-bar">
        <input type="text" className="search" placeholder="search by code" onKeyUp={handleChange} />
        <button type="button" className="search-btn" onClick={handleSearch}>
          <BsSearch />
        </button>
        <p className="error" />
      </div>
      <h1 className="title">
        With
        {' '}
        <div className="divisor divisor1">
          <input
            className="money"
            type="number"
            onChange={handleMoney}
            placeholder="Write here (USD)"
          />
        </div>
        {/* {money} */}
        {' '}
        USD you can buy the following currencies:
      </h1>
      <div className="divisor">
        {/* <div className="money-holder">
          <input className="money"
          type="number" onChange={handleMoney} placeholder="Write here (USD)" />
        </div> */}
      </div>
      <div className="search-result" />
      <div className="currencies-holder">
        {currencies && Object.keys(currencies).map((key) => {
          color += 1;
          if (color === 5) {
            color = 1;
          }
          return (
            <CurrencyComponent
              key={key}
              title={key}
              description={currencies[key]}
              price={price[key] * money}
              color={color}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
