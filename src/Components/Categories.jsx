import React from 'react';
import PropTypes from 'prop-types';

class Categories extends React.Component {
  componentDidMount() {
    const { handleCategorySelected } = this.props;
    handleCategorySelected({ target: { value: 'MLB5672' } });
  }

  render() {
    const { arrayCategories, handleCategorySelected } = this.props;
    return (
      <section>
        <ul className="space-y-2">
          {arrayCategories.map((category) => {
            const { id, name } = category;
            return (
              <div key={ id } className="form-check">
                <input
                  onChange={ handleCategorySelected }
                  type="radio"
                  defaultChecked={ name === 'Acessórios para Veículos' }
                  id={ id }
                  name="category"
                  value={ id }
                  data-testid="category"
                  className="form-check-input  rounded-full
                  h-4 w-4 border border-gray-300 bg-white
                  checked:bg-blue-600 checked:border-blue-600
                  focus:outline-none transition duration-200 mt-1
                  align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
                />
                <label
                  className="form-check-label font-sans
                  italic inline-block text-gray-900 cursor-pointer"
                  htmlFor={ id }
                >
                  { name }
                </label>
              </div>);
          })}
        </ul>
      </section>
    );
  }
}

Categories.propTypes = {
  arrayCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleCategorySelected: PropTypes.func.isRequired,
};

export default Categories;
