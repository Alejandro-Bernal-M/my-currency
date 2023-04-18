import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrencies, getCurrencyPrice } from '../redux/currency/currencySlice';
import CurrencyComponent from '../components/Currency';
import { useNavigate } from 'react-router-dom';
import { changeMoney } from '../redux/money/moneySlice';

const Home = () => {
  const dispatch = useDispatch();
  const  currencies  = useSelector(state => state.currency.allCurrencies);
  const price = useSelector(state => state.currency.usdPrice);
  const money = useSelector(state => state.money.value);
  const navigate = useNavigate();
  

  useEffect(() => {
    dispatch(getCurrencies());
    dispatch(getCurrencyPrice());
  }, [dispatch]);

  const handleSearch = () => {
    const search = document.querySelector('.search');
    const error = document.querySelector('.error');
    const result = document.querySelector('.search-result');
    if(search.value === '') {
      error.textContent = 'Please enter a currency code';
      result.textContent = '';
      return;
    } else {
      error.textContent = '';
      if(!currencies[search.value]) {
        error.textContent = 'Currency not found';
        result.textContent = '';
        return;
      } else {
        error.textContent = '';
        navigate(`/${search.value}`);
      }
    }
  };

  const handleMoney = (e) => {
    dispatch(changeMoney(e.target.value));
  };

  return (
    <div className="App">
      <h1>With {money} USD you can buy:</h1>
      <div>
        <input className='money' type="number" onChange={handleMoney} placeholder='How much money? (USD)'></input>
      </div>
      <div className='search-bar'>
        <input type='text' className='search' placeholder='search by code'></input>
        <button type='button' onClick={handleSearch}>Filter</button>
        <p className='error'></p>
      </div>
      <div className='search-result'>
      </div>
      <div className="currencies-holder">
        {Object.keys(currencies).map((key) => (
          <CurrencyComponent key={key} title={key} description={currencies[key]} price={price[key]*money} />
        ))}
      </div>
    </div>
  );
}

export default Home;