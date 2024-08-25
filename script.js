const products = [
    {
        id: 0,
        image: 'assets/images/Ikaria-Juice-Product-1.png',
        title: 'Ikaria Juice',
        price: { value1: 69, value2: 39 },
        description: 'Ancient “Juice” Melts Fat Fast. Experience the power of nature with a blend of potent ingredients designed to aid weight loss.',
        ingredients: 'Milk Thistle, Taraxacum, Panax Ginseng, Resveratrol, Citrus Pectin, EGCG, Fucoxanthin, Bioperine',
        affiliateLink: 'https://theikariajuice.com?&shield=ff0925wsrkmkxuddke55l-6k3e'
    },
    {
        id: 1,
        code: 1002,
        image: 'assets/images/SugarDefender-1.webp',
        title: 'Sugar Defender',
        price: { value1: 69, value2: 49 },
        description: 'Defend against sugar-related health issues with a powerful blend of natural ingredients. Ingredients include Cinnamon, Chromium, Berberine, Gymnema Sylvestre, and Alpha Lipoic Acid.',
        ingredients: 'Cinnamon, Chromium, Berberine, Gymnema Sylvestre, Alpha Lipoic Acid',
        affiliateLink: 'https://ef9c560indmhwv9rybfhk6sz1v.hop.clickbank.net'
    },
    {
        id: 2,
        code: 1003,
        image: 'assets/images/GreenGlucose-1.png',
        title: 'Green Glucose',
        price: { value1: 79, value2: 49 },
        description: 'Supports healthy glucose levels with a potent blend of natural ingredients. Ingredients include Green Tea, Gymnema, Alpha Lipoic Acid, Cinnamon, Chromium, and Berberine.',
        ingredients: 'Green Tea, Gymnema, Alpha Lipoic Acid, Cinnamon, Chromium, Berberine',
        affiliateLink: 'https://2f20a8zmrfxbvnc2z9gfsh27-l.hop.clickbank.net'
    },
    {
        id: 3,
        code: 1004,
        image: 'assets/images/Sumatra-1.png',
        title: 'Sumatra Slim Belly Tonic',
        price: { value1: 59, value2: 39 },
        description: 'Melt stubborn fat with a unique tonic inspired by traditional remedies. Ingredients include Weird Blue Tonic.',
        ingredients: 'Weird Blue Tonic',
        affiliateLink: 'https://e0566xsekitark6i6dio3ayb4c.hop.clickbank.net'
    },
    {
        id: 4,
        code: 1005,
        image: 'assets/images/TheSoomthieDiet.png',
        title: 'The Smoothie Diet',
        price: { value1: 47, value2: 27 },
        description: 'A 21-day weight loss program featuring delicious and healthy smoothies. Ingredients include various fruits and vegetables.',
        ingredients: 'Various fruits and vegetables',
        affiliateLink: 'https://1401cv0kqgnd1y7k1ctgj4x03e.hop.clickbank.net'
    }
];

const searchBar = document.getElementById('searchBar');
const filter = document.getElementById('filter');
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');

// Function to get effective price
const getEffectivePrice = (item) => {
    if (item.discountedPrice !== undefined) {
        return item.discountedPrice;
    } else if (typeof item.price === 'object') {
        return item.price.value2;
    }
    return item.price;
};

// Function to filter and display items
const filterAndDisplayItems = () => {
    let searchData = searchBar.value.toLowerCase();
    let filteredData = products.filter(item => 
        item.title.toLowerCase().includes(searchData)
    );

    const sortBy = filter.value;

    if (sortBy === 'lowest') {
        filteredData.sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b));
    } else if (sortBy === 'highest') {
        filteredData.sort((a, b) => getEffectivePrice(b) - getEffectivePrice(a));
    } else if (sortBy === 'a-z') {
        filteredData.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'z-a') {
        filteredData.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === 'minmax') {
        const minPrice = parseFloat(minPriceInput.value) || 0;
        const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
        filteredData = filteredData.filter(item => {
            const effectivePrice = getEffectivePrice(item);
            return effectivePrice >= minPrice && effectivePrice <= maxPrice;
        });
    }

    displayItem(filteredData);
};

// Function to display items on the main page
const displayItem = (items) => {
    document.getElementById('root').innerHTML = items.map(item => {
        const { image, title, price, discountedPrice, id, code } = item;
        let displayOriginalPrice = '';
        let displayDiscountedPrice = '';

        if (discountedPrice !== undefined) {
            displayOriginalPrice = typeof price === 'object' ? `$${price.value1}.00` : `$${price}.00`;
            displayDiscountedPrice = `$${discountedPrice}.00`;
        } else {
            displayOriginalPrice = typeof price === 'object' ? `$${price.value1}.00 - $${price.value2}.00` : `$${price}.00`;
        }

        return `
            <div class='box'>
                <div class='img-box'>
                    <img class='images' src=${image} alt='${title}'>
                </div>
                <div class='bottom'>
                    <p>${title}</p>
                    <div class='price-container'>
                        <h2 class='original-price' style="${discountedPrice !== undefined ? 'text-decoration: line-through;' : ''}">${displayOriginalPrice}</h2>
                        ${discountedPrice !== undefined ? `<h2 class='discounted-price'>${displayDiscountedPrice}</h2>` : ''}
                    </div>
                    <a href="/${code}"><button>View Product</button></a>
                </div>
            </div>
        `;
    }).join('');
};

// Function to view product details based on code in URL
const viewProduct = () => {
    const code = window.location.pathname.substring(1);
    const product = products.find(p => p.code === parseInt(code));
    if (product) {
        document.body.innerHTML = `
            <header>
                <div class="container">
                    <nav>
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li><a href="/html/terms.html">Terms & Policy</a></li>
                            <li><a href="/html/faq.html">FAQ</a></li>                
                            <li><a href="/html/contact.html">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div id="product-detail" class="product-detail">
                <div class="product-info">
                    <img id="product-image" class="product-image" src="${product.image}" alt="${product.title}">
                    <div class="product-description-container">
                        <h1 id="product-title" class="product-title">${product.title}</h1>
                        <p id="product-description" class="product-description">${product.description}</p>
                        <p id="product-ingredients" class="product-ingredients"><strong>Ingredients:</strong> ${product.ingredients}</p>
                        <a href="${product.affiliateLink}" target="_blank"><button>Buy Now</button></a>
                        <button onclick="window.location.href='index.html'">Back to Products</button>
                        <div class="terms-notice">
                            <h5>Please read our <a href="/html/terms.html">Terms & Policy</a> before purchase</h5>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        document.body.innerHTML = '<p>Product not found</p>';
    }
};

// Event listeners for search and filter
searchBar.addEventListener('keyup', filterAndDisplayItems);
filter.addEventListener('change', (e) => {
    if (e.target.value === 'minmax') {
        minPriceInput.style.display = 'block';
        maxPriceInput.style.display = 'block';
    } else {
        minPriceInput.style.display = 'none';
        maxPriceInput.style.display = 'none';
        minPriceInput.value = '';
        maxPriceInput.value = '';
    }
    filterAndDisplayItems();
});

minPriceInput.addEventListener('input', filterAndDisplayItems);
maxPriceInput.addEventListener('input', filterAndDisplayItems);

// Initial display
displayItem(products);

// Call viewProduct when the page loads
window.onload = viewProduct;
