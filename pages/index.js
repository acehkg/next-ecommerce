import Link from 'next/link';
import fs from 'fs';
import matter from 'gray-matter';
import styled from 'styled-components';
import UnstyledLink from '../components/styled/UnstyledLink';
import useCart from '../hooks/useCart';

const Container = styled.div`
  position: relative;
  background: white;
  padding: 1rem 2rem;
  min-height: 12rem;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.025);
  }
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem;
  margin: 0.5rem 0;
`;

const Price = styled.div`
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  font-size: 2rem;
`;

const renderProducts = (product, addItemToCart) => {
  const handleClick = (e) => {
    e.stopPropagation();
    addItemToCart(product.id);
  };
  return (
    <Link key={product.id} href={product.slug}>
      <UnstyledLink>
        <Container>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <button onClick={handleClick}>Add Item to Cart</button>
          <Price>${product.price / 100}</Price>
        </Container>
      </UnstyledLink>
    </Link>
  );
};

const HomePage = (props) => {
  const { cart, addItemToCart } = useCart();
  console.log(cart);
  return (
    <ProductsContainer>
      {props.products.map((product) => renderProducts(product, addItemToCart))}
    </ProductsContainer>
  );
};

export const getStaticProps = async () => {
  const directory = `${process.cwd()}/content`;
  const filenames = fs.readdirSync(directory);
  const products = filenames.map((filename) => {
    //read the file from the fs
    const fileContent = fs.readFileSync(`${directory}/${filename}`).toString();
    //pull out frontmatter
    const { data } = matter(fileContent);
    //return name, slug
    const slug = `/products/${filename.replace('.md', '')}`;
    const product = {
      ...data,
      slug,
    };
    return product;
  });
  return {
    props: {
      products,
    },
  };
};
export default HomePage;
