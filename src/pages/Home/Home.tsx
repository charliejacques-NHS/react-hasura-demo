import { useProducts, useSiteTitle } from '@app/hooks';
import s from './Home.module.scss';
import { useState } from 'react';
import { BUTTON_TYPE, Button, Pill, Product, TextInput } from '@app/components';
import { NewProductForm } from '@app/forms';
import { useFeatureFlagsContext } from '@app/context';
import { FEATURE_FLAGS } from '@app/types';
import { useTranslation } from 'react-i18next';

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
  const [displayProductForm, setDisplayProductForm] = useState<boolean>(false);

  const { checkFeatureEnabled } = useFeatureFlagsContext();
  const { t } = useTranslation();
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

  const closeNewProductForm = () => {
    setDisplayProductForm(false);
    refetchProducts();
  };

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>
        {t('products')} {totalProducts ? `(${totalProducts})` : ''}
      </h2>
      <div className={s.filters}>
        <TextInput
          wrapperClassName={s.search}
          value={filterText}
          onChange={text => setFilterText(text)}
          placeholder={t('searchForProducts')}
        />
        <div className={s.categories}>
          {distinctProductIds
            .map(id =>
              productCategories.find(({ category }) => category.id === id),
            )
            .map(
              el =>
                el && (
                  <Pill
                    className={
                      s[
                        filteredCategories.includes(el.category.id)
                          ? 'active'
                          : ''
                      ]
                    }
                    text={el.category.friendly_name}
                    key={el.category.id}
                    onClick={() => updateCategoryFilter(el.category.id)}
                  />
                ),
            )}
        </div>
        {checkFeatureEnabled(FEATURE_FLAGS.LIST_NEW_PRODUCTS) && (
          <Button
            type={BUTTON_TYPE.BUTTON}
            onClick={() => setDisplayProductForm(true)}>
            {t('newProduct')}
          </Button>
        )}
      </div>
      <div className={s.productsWrapper}>
        {products.map(product => (
          <Product {...product} />
        ))}
      </div>
      {checkFeatureEnabled(FEATURE_FLAGS.LIST_NEW_PRODUCTS) && (
        <NewProductForm show={displayProductForm} close={closeNewProductForm} />
      )}
    </div>
  );
};

export default Home;
