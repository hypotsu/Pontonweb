const { parseTextToProduct, createNode } = require('./index');

describe('Elikia kata testing parseTextToProduct', () => {
    let product = null;
    let description = null;
    beforeEach(() => {
        product = createNode();
        description = [];
    });
    it('Le prix est 4000 quand on a une telle chaine de caractère price:4000', () => {
        parseTextToProduct('price:4000', product);
        expect(product.price).toBe(4000);
    });
    it('La catégorie du produit est clothe quand on a category:clothe', () => {
        parseTextToProduct('category:clothe', product);
        expect(product.category).toBe('clothe');
    });
    it('Le nom du produit sera iphone-16 quand on a ce text name:iphone-16', () => {
        parseTextToProduct('name:iphone-16', product);
        expect(product.name).toBe('iphone-16');
    });
    it('La quantité sera equal à 30 quand on a quantity:30', () => {
        parseTextToProduct('quantity:30', product);
        expect(product.quantity).toBe(30);
    });
    it('Le prix devrait être 10000 si on a price:10000', () => {
        parseTextToProduct('price:10000', product);
        expect(product.price).toBe(10000);
    });
    it('La marque devrait être Samsung quand on a brand:Samsung', () => {
        parseTextToProduct('brand:Samsung', product);
        expect(product.brand).toBe('Samsung');
    });
    it('La valeur de countryShort serait equal cg si on a country:congo', () => {
        parseTextToProduct('country:congo', product);
        expect(product.countryShort).toBe('cg');
    });
    it('On doit avoir un object product qui correspond à la description', () => {
        description = [
            'brand:Samsung',
            'year:2019',
            'name:Machine à laver',
            'category:electronic',
            'country:South-Korea',
            'quantity:40',
            'price:90000',
        ];

        description.forEach((text) => parseTextToProduct(text, product));

        expect(product.brand).toBe('Samsung');
        expect(product.year).toBe(2019);
        expect(product.name).toBe('Machine à laver');
        expect(product.category).toBe('electronic');
        expect(product.country).toBe('South-Korea');
        expect(product.quantity).toBe(40);
        expect(product.price).toBe(90000);
    });
    it('On majore le prix de 5 % quand la quantity est < 100', () => {
        description = ['price:2000', 'quantity:50'];
        description.forEach((txt) => parseTextToProduct(txt, product));

        expect(product.quantity).toBe(50);
        expect(product.price).toBe(2100);
    });
    it('On reduit le prix de 5 % quand la quantity est > 100 pour les habits, electronique et food', () => {
        description = ['price:20000', 'category:electronic', 'quantity:200', 'name:Fer à repasser'];
        description.forEach((txt) => parseTextToProduct(txt, product));

        expect(product.quantity).toBe(200);
        expect(product.price).toBe(19950);
    });

    it("Le prix à une reduction de 5%  quand il est > 10000 la category est electornic et qu'il vient d'un pays ami", () => {
        description = ['price:15000', 'country:congo', 'category:electronic'];
        description.forEach((txt) => parseTextToProduct(txt, product));

        expect(product.price).toBe(14250);
    });
    it("Le prix est majoré de 5% quand il est > 10000 la category est electornic et qu'il nest pas d'un pays ami", () => {
        description = ['price:15000', 'country:Qatar', 'category:electronic'];
        description.forEach((txt) => parseTextToProduct(txt, product));

        expect(product.price).toBe(15750);
    });
    it('On majore le prix de 5 % quand année < 2010 pour les voitures des pays non amis', () => {
        description = ['price:100000', 'country:japon', 'category:voiture', 'year:2008'];
        description.forEach((txt) => parseTextToProduct(txt, product));

        expect(product.price).toBe(105000);
        expect(product.year).toBe(2008);
        expect(product.category).toBe('voiture');
    });
    it('On reduit le prix de 5 % quand année < 2010 pour les voitures des pays amis', () => {
        description = ['price:100000', 'country:chine', 'category:voiture', 'year:2008'];
        description.forEach((txt) => parseTextToProduct(txt, product));

        expect(product.price).toBe(95000);
        expect(product.year).toBe(2008);
        expect(product.category).toBe('voiture');
    });
    it('On reduit le prix de 10 % quand année > 2010 pour les voitures des pays amis', () => {
        description = ['price:100000', 'country:chine', 'category:voiture', 'year:2015'];
        description.forEach((txt) => parseTextToProduct(txt, product));

        expect(product.price).toBe(90000);
        expect(product.year).toBe(2015);
        expect(product.category).toBe('voiture');
    });
});
