import React from 'react';
import { useParams, Link } from 'react-router-dom';

const products = [
    // Your products array as defined
];

const ProductDetail = () => {
    const { code } = useParams();
    const product = products.find(p => p.code === parseInt(code));

    if (!product) {
        return <p>Product not found</p>;
    }

    const { image, title, description, ingredients, affiliateLink } = product;

    return (
        <div>
            <header>
                <div className="container">
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/html/terms.html">Terms & Policy</Link></li>
                            <li><Link to="/html/faq.html">FAQ</Link></li>
                            <li><Link to="/html/contact.html">Contact</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div id="product-detail" className="product-detail">
                <div className="product-info">
                    <img id="product-image" className="product-image" src={image} alt={title} />
                    <div className="product-description-container">
                        <h1 id="product-title" className="product-title">{title}</h1>
                        <p id="product-description" className="product-description">{description}</p>
                        <p id="product-ingredients" className="product-ingredients"><strong>Ingredients:</strong> {ingredients}</p>
                        <a href={affiliateLink} target="_blank" rel="noopener noreferrer"><button>Buy Now</button></a>
                        <button onClick={() => window.history.back()}>Back to Products</button>
                        <div className="terms-notice">
                            <h5>Please read our <Link to="/html/terms.html">Terms & Policy</Link> before purchase</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
