import { useEffect } from 'react';
import '../styles/App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrencies, getCurrencyPrice } from '../redux/currency/currencySlice';
import CurrencyComponent from './Currency';


function App() {
  const dispatch = useDispatch();
  const  currencies  = useSelector(state => state.currency.allCurrencies);
  const price = useSelector(state => state.currency.usdPrice);

  useEffect(() => {
    dispatch(getCurrencies());
    dispatch(getCurrencyPrice());
  }, [dispatch]);


  return (
    <div className="App">
      {Object.keys(currencies).map((key) => (
        <CurrencyComponent key={key} title={key} description={currencies[key]} price={price[key]} />
      ))}
    </div>
  );
}

export default App;
