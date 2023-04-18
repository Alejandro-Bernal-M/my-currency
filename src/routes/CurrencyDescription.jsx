import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { changeMoney } from '../redux/money/moneySlice';
import { useDispatch } from 'react-redux';

const CurrencyDescription = () => {
  const { id } = useParams();
  const currencies = useSelector(state => state.currency.allCurrencies);
  const price = useSelector(state => state.currency.usdPrice);
  const money = useSelector(state => state.money.value);
  const dispatch = useDispatch();

  const handleMoney = (e) => {
    dispatch(changeMoney(e.target.value));
  };

  return (
    <div>
      <h1>{id}</h1>
      <p>Name: {currencies[id]}</p>
      <input className='money' type="number" onChange={handleMoney} placeholder='How much money? (USD)'></input>
      <p>With {money} USD dollar, you can buy: </p>
      <p>{price[id]*money} {currencies[id]}s</p>
      <NavLink to={'/'}>back</NavLink>
    </div>
  );
}


export default CurrencyDescription;