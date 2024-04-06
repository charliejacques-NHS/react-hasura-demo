import { useProducts, useSiteTitle } from '@app/hooks';
import s from './Home.module.scss';
import { useState } from 'react';
import { Pill, TextInput } from '@app/components';

/**
 * The home page of the application
 * @returns {JSX.Element}
 */
const Home = (): JSX.Element => {
  useSiteTitle('home');
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const [filterText, setFilterText] = useState<string>('');
  const { products, totalProducts, refetchProducts } = useProducts({
    categories: filteredCategories,
    text: filterText,
  });

  const productCategories = products.map(({ categories }) => categories).flat();
  const distinctProductIds = Array.from(
    new Set(productCategories.map(({ category }) => category.id)),
  );

  const updateCategoryFilter = (newCategory: string) => {
    if (filteredCategories.includes(newCategory)) {
      const tmp = filteredCategories.slice();
      const index = tmp.findIndex(id => id === newCategory);
      index >= 0 && tmp.splice(index, 1);
      setFilteredCategories(tmp);
    } else {
      setFilteredCategories(prev => [...prev, newCategory]);
    }
    refetchProducts();
  };

  return (
    <div className={s.wrapper}>
      <h2>Products {totalProducts ? `(${totalProducts})` : ''}</h2>
      <div className={s.filters}>
        <TextInput
          value={filterText}
          onChange={text => setFilterText(text)}
          placeholder="Search for products"
        />
        <div>
          {distinctProductIds
            .map(id =>
              productCategories.find(({ category }) => category.id === id),
            )
            .map(
              el =>
                el && (
                  <Pill
                    text={el.category.friendly_name}
                    key={el.category.id}
                    onClick={() => updateCategoryFilter(el.category.id)}
                  />
                ),
            )}
        </div>
      </div>
      <div className={s.productsWrapper}>
        {products.map(
          ({ id, image_src, name, description, price, categories }) => (
            <div className={s.product} key={id}>
              <div className={s.info}>
                <div className={s.row}>
                  <img className={s.image} src={image_src} alt={name} />
                  <h3 className={s.name}>{name}</h3>
                </div>
                <p className={s.description}>{description}</p>
                <p className={s.price}>£{price.toFixed(2)}</p>
              </div>
              <div className={s.categoriesWrapper}>
                <span>Categories: </span>
                {categories.map(({ category }) => (
                  <Pill
                    text={category.friendly_name}
                    key={`${id}-${category.id}`}
                  />
                ))}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default Home;
