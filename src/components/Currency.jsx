import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

const CurrencyComponent = (
  {
    title,
    description,
    price,
    color,
  },
) => (
  <div className={color === 1 || color === 4 ? 'currency-data color1' : 'currency-data color2'}>
    <NavLink
      to={title}
    >
      <i className="arrow-icon">
        <BsFillArrowRightCircleFill />
      </i>
    </NavLink>
    <h3>{title}</h3>
    <p>{description}</p>
    <p>{price}</p>
  </div>
);

CurrencyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number,
  color: PropTypes.number.isRequired,
};

CurrencyComponent.defaultProps = {
  price: 0,
};

export default CurrencyComponent;
