import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrencies, getCurrencyPrice } from '../redux/currency/currencySlice';
import CurrencyComponent from '../components/Currency';

const Home = () => {
  const dispatch = useDispatch();
  const  currencies  = useSelector(state => state.currency.allCurrencies);
  const price = useSelector(state => state.currency.usdPrice);

  useEffect(() => {
    dispatch(getCurrencies());
    dispatch(getCurrencyPrice());
  }, [dispatch]);


  return (
    <div className="App">
      <h1>With 1 USD you can buy:</h1>
      <div className="currencies-holder">
        {Object.keys(currencies).map((key) => (
          <CurrencyComponent key={key} title={key} description={currencies[key]} price={price[key]} />
        ))}
      </div>
    </div>
  );
}

export default Home;