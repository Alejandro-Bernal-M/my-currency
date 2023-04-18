import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CurrencyDescription = () => {
  const { id } = useParams();
  const currencies = useSelector(state => state.currency.allCurrencies);
  const price = useSelector(state => state.currency.usdPrice);

  return (
    <div>
      <h1>{id}</h1>
      <p>Name: {currencies[id]}</p>
      <p>With 1 USD dollar, you can buy: </p>
      <p>{price[id]} {currencies[id]}s</p>
      <NavLink to={'/'}>back</NavLink>
    </div>
  );
}


export default CurrencyDescription;