import React from 'react';
import PropTypes from 'prop-types';

class Categories extends React.Component {
  render() {
    const { arrayCategories } = this.props;
    return (
      <section>
        <ul>
          {arrayCategories.map((category) => {
            const { id, name } = category;
            return (
              <div key={ id }>
                <input
                  type="radio"
                  id={ id }
                  name="category"
                  value={ name }
                  data-testid="category"
                />
                <label htmlFor={ id }>{ name }</label>
              </div>);
          })}
        </ul>
      </section>
    );
  }
}

Categories.propTypes = {
  arrayCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Categories;
