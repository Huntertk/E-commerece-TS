import { Link } from "react-router-dom";
import ProductCard from "../components/product-card";

const Home = () => {
  const addToCartHandler = () => {

  }

  return (
    <div className="home">
      <section></section>


      <h1>
        Latest Products
        <Link to="/search" className="findmore">More</Link>
      </h1>

      <main>
        <ProductCard
          productId="0198awd798a65"
          name="Macbook"
          price={145000}
          stock={3}
          photo="https://m.media-amazon.com/images/I/618d5bS2lUL._SX679_.jpg"
          handler={addToCartHandler}
        />
      </main>
    </div>
  )
}

export default Home;