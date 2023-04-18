import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const CurrencyComponent = ({ title, description, price }) => (
  <div className="currency-data">
    <NavLink
      to={title}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{price}</p>
    </NavLink>
  </div>
);

CurrencyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number,
};

CurrencyComponent.defaultProps = {
  price: 0,
};

export default CurrencyComponent;
