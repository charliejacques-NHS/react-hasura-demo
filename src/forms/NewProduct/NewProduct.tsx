import { FormEvent, useState } from 'react';
import s from './NewProduct.module.scss';
import { BUTTON_TYPE, Button, Modal, Pill, TextInput } from '@app/components';
import { useMutation, useQuery } from 'urql';
import { MUTATIONS, QUERIES } from '@app/graphql';
import { Digital } from 'react-activity';
import { useTranslation } from 'react-i18next';

/**
 * Props Type Interface for {@link NewProduct}
 */
export interface NewProductProps {
  close(): void;
  show: boolean;
}

/**
 * Renders a form for adding a new product
 * @param {NewProductProps} props
 * @returns {JSX.Element}
 */
const NewProduct = ({ show, close }: NewProductProps): JSX.Element => {
  const [_, executeMutation] = useMutation(MUTATIONS.NEW_PRODUCT);
  const [{ data, error, fetching }] = useQuery({
    query: QUERIES.GET_CATEGORIES,
  });
  const { t } = useTranslation();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [imageSrc, setImageSrc] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newProduct: MUTATIONS.NEW_PRODUCT_VARIABLES = {
      name,
      price,
      description,
      categories: [],
    };

    if (selectedCategories.length > 0)
      newProduct.categories = selectedCategories.map(id => ({
        category_id: id,
      }));

    if (imageSrc !== '') newProduct.image_src = imageSrc;

    await executeMutation(newProduct).then(
      ({ data }) => data?.insert_products_one.id && close(),
    );
  };

  const updateSelectedCategories = (newCategory: string) => {
    if (selectedCategories.includes(newCategory)) {
      const tmp = selectedCategories.slice();
      const index = tmp.findIndex(id => id === newCategory);
      index >= 0 && tmp.splice(index, 1);
      setSelectedCategories(tmp);
    } else {
      setSelectedCategories(prev => [...prev, newCategory]);
    }
  };

  if (fetching) return <Digital />;
  if (error) console.log(error);

  return (
    <Modal show={show}>
      <form className={s.wrapper} onSubmit={handleSubmit}>
        <h2 className={s.title}>{t(`newProduct`)}</h2>
        <TextInput
          label={t('name')}
          value={name}
          onChange={text => setName(text)}
        />
        <TextInput
          label={t('description')}
          value={description}
          onChange={text => setDescription(text)}
        />
        <TextInput
          label={t('price')}
          value={price === 0 ? '' : String(price.toFixed(2))}
          onChange={text => setPrice(Number.parseFloat(text))}
        />
        <TextInput
          label={t('image')}
          value={imageSrc}
          onChange={text => setImageSrc(text)}
        />
        {imageSrc && (
          <div className={s.imagePreview}>
            <p>{t('imagePreview')}:</p>
            <img className={s.image} src={imageSrc} alt={name} />
          </div>
        )}
        <div className={s.categoryList}>
          <h3 className={s.categoryTitle}>{t('categories')}: </h3>
          {data?.categories.map(({ id, friendly_name }) => (
            <Pill
              key={id}
              className={s[selectedCategories.includes(id) ? 'active' : '']}
              text={friendly_name}
              onClick={() => updateSelectedCategories(id)}
            />
          ))}
        </div>
        <Button type={BUTTON_TYPE.SUBMIT}>Submit</Button>
      </form>
    </Modal>
  );
};

export default NewProduct;
