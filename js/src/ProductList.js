import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const products = [
    // Your products array as defined
];

const getEffectivePrice = (item) => {
    if (item.discountedPrice !== undefined) {
        return item.discountedPrice;
    } else if (typeof item.price === 'object') {
        return item.price.value2;
    }
    return item.price;
};

const ProductList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());
    const handleFilterChange = (e) => setFilter(e.target.value);
    const handleMinPriceChange = (e) => setMinPrice(e.target.value);
    const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);

    const filterAndDisplayItems = () => {
        let filteredData = products.filter(item => 
            item.title.toLowerCase().includes(searchTerm)
        );

        if (filter === 'lowest') {
            filteredData.sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b));
        } else if (filter === 'highest') {
            filteredData.sort((a, b) => getEffectivePrice(b) - getEffectivePrice(a));
        } else if (filter === 'a-z') {
            filteredData.sort((a, b) => a.title.localeCompare(b.title));
        } else if (filter === 'z-a') {
            filteredData.sort((a, b) => b.title.localeCompare(a.title));
        } else if (filter === 'minmax') {
            const min = parseFloat(minPrice) || 0;
            const max = parseFloat(maxPrice) || Infinity;
            filteredData = filteredData.filter(item => {
                const effectivePrice = getEffectivePrice(item);
                return effectivePrice >= min && effectivePrice <= max;
            });
        }

        return filteredData;
    };

    return (
        <div>
            <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />
            <select value={filter} onChange={handleFilterChange}>
                <option value="">Sort by</option>
                <option value="lowest">Price: Low to High</option>
                <option value="highest">Price: High to Low</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
                <option value="minmax">Price Range</option>
            </select>
            {filter === 'minmax' && (
                <div>
                    <input type="number" placeholder="Min Price" value={minPrice} onChange={handleMinPriceChange} />
                    <input type="number" placeholder="Max Price" value={maxPrice} onChange={handleMaxPriceChange} />
                </div>
            )}
            <div className="product-list">
                {filterAndDisplayItems().map(item => {
                    const { image, title, price, discountedPrice, id, code } = item;
                    let displayOriginalPrice = '';
                    let displayDiscountedPrice = '';

                    if (discountedPrice !== undefined) {
                        displayOriginalPrice = typeof price === 'object' ? `$${price.value1}.00` : `$${price}.00`;
                        displayDiscountedPrice = `$${discountedPrice}.00`;
                    } else {
                        displayOriginalPrice = typeof price === 'object' ? `$${price.value1}.00 - $${price.value2}.00` : `$${price}.00`;
                    }

                    return (
                        <div key={id} className='box'>
                            <div className='img-box'>
                                <img className='images' src={image} alt={title} />
                            </div>
                            <div className='bottom'>
                                <p>{title}</p>
                                <div className='price-container'>
                                    <h2 className='original-price' style={{ textDecoration: discountedPrice !== undefined ? 'line-through' : 'none' }}>{displayOriginalPrice}</h2>
                                    {discountedPrice !== undefined && <h2 className='discounted-price'>{displayDiscountedPrice}</h2>}
                                </div>
                                <Link to={`/${code}`}><button>View Product</button></Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductList;
