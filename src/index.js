const createProduct = () => {
    return {
        category: '',
        price: 0,
        country: '',
        year: 2025,
        brand: '',
        name: '',
        quantity: 0,
        countryShort: '',
    };
};

const friend_countries = ['congo', 'chine', 'gabon', 'cameroun', 'senegal'];
const categories = ['clothe', 'electronic', 'food'];

const country_map = {
    congo: 'cg',
    france: 'fr',
    gabon: 'gb',
    chine: 'ch',
    angola: 'an',
};

function parseTextToProduct(textLine, product = createProduct()) {
    const priceMatch = textLine.match(/^price:(.+)$/);
    const originMatch = textLine.match(/^country:(.+)$/);
    const categoryMatch = textLine.match(/^category:(.+)$/);
    const quantityMatch = textLine.match(/^quantity:(.+)$/);
    const brandMatch = textLine.match(/^brand:(.+)$/);
    const yearMatch = textLine.match(/^year:(.+)$/);
    const nameMatch = textLine.match(/^name:(.+)$/);

    if (priceMatch) {
        const price = parseInt(priceMatch[1]);
        if (Number.isInteger(price) && price > 0 && price < 1000000) {
            product.price = price;
        }
        product.price = price;
    } else if (originMatch) {
        const country = originMatch[1];
        if (country && Object.hasOwn(country_map, country)) {
            product.countryShort = country_map[country];
        }
        product.country = country;
    } else if (categoryMatch) {
        const category = categoryMatch[1];

        if (categories.slice(0, 3).includes(category)) {
            if (product.price && product.price > 10000) {
                if (product.country && friend_countries.includes(product.country)) {
                    const price = product.price;
                    product.price = price - price * (5 / 100);
                } else {
                    const price = product.price;
                    product.price = price + price * (5 / 100);
                }
            }
        }
        product.category = category;
    } else if (quantityMatch) {
        const quantity = parseInt(quantityMatch[1]);

        if (quantity < 100 && product.price) {
            product.price += product.price * (5 / 100);
        } else if (quantity > 100 && product.category && categories.includes(product.category)) {
            product.price -= product.price * (5 / 100);
        }
        product.quantity = quantity;
    } else if (brandMatch) {
        product.brand = brandMatch[1];
    } else if (yearMatch) {
        const year = parseInt(yearMatch[1]);

        if (
            year < 2010 &&
            product.category &&
            product.category === 'voiture' &&
            product.country &&
            !friend_countries.includes(product.country)
        ) {
            if (product.price) {
                product.price += product.price * (5 / 100);
            }
        } else if (
            year > 2010 &&
            product.category &&
            product.category === 'voiture' &&
            product.country &&
            friend_countries.includes(product.country)
        ) {
            if (product.price) {
                product.price -= product.price * (10 / 100);
            }
        } else {
            if (product.price) {
                product.price -= product.price * (5 / 100);
            }
        }
        product.year = year;
    } else if (nameMatch) {
        product.name = nameMatch[1];
    }

    return product;
}

module.exports = { parseTextToProduct, createProduct };
