import PropTypes from 'prop-types';

const CurrencyComponent = ( { title, description, price } ) => (
  <div className="currency-data">
    <h3>{title}</h3>
    <p>{description}</p>
    <p>{price}</p>
  </div>
)

CurrencyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number,
}

CurrencyComponent.defaultProps = {
  price: 0,
}


export default CurrencyComponent