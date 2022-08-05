import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 22,
    name: "My first book",
    description: "This is a first book!",
  },
  {
    id: "p2",
    price: 10,
    name: "My second book",
    description: "This is a second book!",
  },
  {
    id: "p3",
    price: 15,
    name: "My third book",
    description: "This is a third book!",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
