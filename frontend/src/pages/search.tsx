import { useState } from "react"
import ProductCard from "../components/product-card";


const Search = () => {

  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const addToCartHandler = () => {}

  const isNextPage = page < 4
  const isPrevPage = page > 1

  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>

        <div>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input 
            type="range" 
            min={100}
            max={100000}
            value={maxPrice} 
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <div>
          <h4>Category</h4>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All</option>
            <option value="">CAMERA</option>
            <option value="">GAME</option>
            <option value="">LAPTOP</option>
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input 
          type="text" 
          placeholder="Search by name..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
        <div className="search-product-list">
          <ProductCard 
            productId="0198awd798a65"
            name="Macbook"
            price={145000}
            stock={3}
            photo="https://m.media-amazon.com/images/I/618d5bS2lUL._SX679_.jpg"
            handler={addToCartHandler}
          />
        </div>

        <article>
          <button onClick={() => setPage((prev) => prev - 1)} disabled={!isPrevPage}>Prev</button>
          <span>{page} of 4</span>
          <button onClick={() => setPage((prev) => prev + 1)} disabled={!isNextPage}>Next</button>
        </article>
      </main>
    </div>
  )
}

export default Search