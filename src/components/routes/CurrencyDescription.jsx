import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { useState } from 'react';
import { changeMoney } from '../../redux/money/moneySlice';

const CurrencyDescription = () => {
  const { id } = useParams();
  const currencies = useSelector((state) => state.currency.allCurrencies);
  const price = useSelector((state) => state.currency.usdPrice);
  const money = useSelector((state) => state.money.value);
  const dispatch = useDispatch();
  const [extraCurrencies, setExtraCurrencies] = useState([]);
  const otherCurrencies = async () => {
    const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${id}.json`);
    const data = await response.json();
    setExtraCurrencies(data);
    return data;
  };
  otherCurrencies();
  const handleMoney = (e) => {
    dispatch(changeMoney(e.target.value));
  };

  let color = 0;
  return (
    <div>
      <NavLink className="back-link" to="/">
        <i className="back-arrow">
          <BsFillArrowLeftCircleFill />
        </i>
        {' '}
        Back
      </NavLink>
      <div className="currency-info">
        <h1>{id}</h1>
        <p>
          Name:
          {' '}
          {currencies[id]}
        </p>
        <input className="money" type="number" onChange={handleMoney} placeholder="How much money? (USD)" />
        <p>
          With
          {' '}
          {money}
          {' '}
          USD dollar, you can buy:
          {' '}
        </p>
        <p>
          {price[id] * money}
          {' '}
          {currencies[id]}
          s
        </p>
      </div>
      <hr className="divisor" />
      <div className="extraCurrencies">
        <h2>
          With 1
          {' '}
          {id}
          {' '}
          for the
          {' '}
          <span className="date">
            {extraCurrencies.date}
          </span>
          {' '}
          you can buy:
        </h2>
        <div>
          {extraCurrencies[id] && Object.keys(extraCurrencies[id]).map((key) => {
            color += 1;
            return (
              <div className={color % 2 === 0 ? 'extraCurrency color1' : 'extraCurrency color2'} key={key}>
                <span>
                  {key}
                </span>
                <p>
                  {extraCurrencies[id][key]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CurrencyDescription;
