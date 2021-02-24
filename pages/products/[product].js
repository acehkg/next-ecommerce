import fs from 'fs';
import matter from 'gray-matter';
import marked from 'marked';
import styled from 'styled-components';
import { Container } from '../../components/styled/Page';

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled.span`
  font-size: 2rem;
  background: lightslategrey;
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: white;
`;

const Product = ({ product: { data, content } }) => {
  const html = marked(content);
  return (
    <Container>
      <Title>
        <h1>{data.name}</h1>
        <p>{data.description}</p>
      </Title>
      <Price>${data.price / 100}</Price>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Container>
  );
};

export const getStaticPaths = () => {
  const directory = `${process.cwd()}/content`;
  const filenames = fs.readdirSync(directory);
  const paths = filenames.map((filename) => {
    return {
      params: {
        product: filename.replace('.md', ''),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps = async (context) => {
  const productName = context.params.product;
  const filePath = `${process.cwd()}/content/${productName}.md`;
  const fileContent = fs.readFileSync(filePath).toString();
  const { data, content } = matter(fileContent);
  return {
    props: {
      product: {
        data,
        content,
      },
    },
  };
};
export default Product;
