import { useSelector } from "react-redux";

function ProductList() {
  const { allProducts } = useSelector((state) => state.productsReducer);

  const productsData = allProducts?.products?.map((product) => {
    return (
      <div key={product.uuid}>
        <p>{product.category}</p>
        <p>{product.title}</p>
        <p>{product.description}</p>
        <p>{product.price}</p>
      </div>
    );
  });

  return <div>{productsData}</div>;
}

export default ProductList;
