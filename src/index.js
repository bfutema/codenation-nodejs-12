const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

function filterById(ids, products) {
	return products.filter(product => ids.includes(product.id));
}

function mapProducts(filteredProducts) {
	return filteredProducts.map(filteredProduct => {
		return {
			name: filteredProduct.name,
			category: filteredProduct.category,
		};
	});
}

function getPromotion(products) {
	let array = [];

	products.map(product => {
		if (!array.includes(product.category)) array.push(product.category)
	});

	switch (array.length) {
		case 1 : return promotions[0];
		case 2 : return promotions[1];
		case 3 : return promotions[2];
		case 4 : return promotions[3];
		default : break;
	}
}

function calculateTotal(filteredProducts, typePromotion) {
	let total = 0.0;

	total = filteredProducts.reduce((totalPrice, product) => {
		if (product.promotions.length > 0) {
			let array = [];

			product.promotions.map(promotionObj => {
				if (promotionObj.looks.includes(typePromotion)) totalPrice += promotionObj.price;
				
				promotionObj.looks.map(look => array.push(look));
			});

			if (!array.includes(typePromotion)) totalPrice += product.regularPrice;

		} else totalPrice += product.regularPrice;

		return totalPrice;
	}, 0.0);

	return total;
}

function calculateDiscount(filteredProducts, totalPrice) {
	let totalWithoutDiscount = 0.0;

	filteredProducts.map(filteredProduct => totalWithoutDiscount += filteredProduct.regularPrice );

	const discountValue = (totalWithoutDiscount - totalPrice).toFixed(2);
	const discount = ((discountValue / totalWithoutDiscount) * 100).toFixed(2)+'%';

	return { discountValue, discount };
}

function getShoppingCart(ids, productsList) {
	const filteredProducts = filterById(ids, productsList);
	const products = mapProducts(filteredProducts);
	const promotion = getPromotion(products);
	const totalPrice = calculateTotal(filteredProducts, promotion).toFixed(2);
	const { discountValue, discount } = calculateDiscount(filteredProducts, totalPrice);

	return {
		products: products,
		promotion,
		totalPrice,
		discountValue,
		discount
	};
}

module.exports = { getShoppingCart };
