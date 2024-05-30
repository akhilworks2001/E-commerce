export const useCart = (currentCart, customer) => {
    const addCart = (product, quantity = null) => {
        let items = [...currentCart.items];

        if (items.length > 0) {
            let checkItemExists = items.find(item => item.id === product.id);
            let checkItemExistsIndex = items.findIndex(item => item.id === product.id);

            if (checkItemExists) {
                items.splice(checkItemExistsIndex, 1, {
                    ...checkItemExists,
                    quantityPurchased: quantity ?? checkItemExists.quantityPurchased + 1
                })

            } else {
                items.push({
                    ...product,
                    quantityPurchased: quantity ?? 1
                })
            }

        } else {
            items.push({
                ...product,
                quantityPurchased: quantity ?? 1
            })
        }

        currentCart.customer = customer;
        currentCart.items = items;
        currentCart.subTotal = 0;
        currentCart.tax = 0;
        currentCart.grandTotal = 0;

        for (const item of currentCart.items) {
            currentCart.subTotal += +item.price * item.quantityPurchased
        }

        currentCart.grandTotal = currentCart.subTotal + currentCart.tax;

        return currentCart;
    }

    const updateCart = (product, quantity) => {
        let items = [...currentCart.items];

        if (items.length > 0) {
            let checkItemExists = items.find(item => item.id === product.id);
            let checkItemExistsIndex = items.findIndex(item => item.id === product.id);

            if (checkItemExists) {
                items.splice(checkItemExistsIndex, 1, {
                    ...checkItemExists,
                    quantityPurchased: quantity
                })

        }
    }

        currentCart.customer = customer;
        currentCart.items = items;
        currentCart.subTotal = 0;
        currentCart.tax = 0;
        currentCart.grandTotal = 0;

        for (const item of currentCart.items) {
            currentCart.subTotal += +item.price * item.quantityPurchased
        }

        currentCart.grandTotal = currentCart.subTotal + currentCart.tax;

        return currentCart;

    }

    const removeItem = (product) => {
        let items = [...currentCart.items];

        if (items.length > 0) {
            let checkItemExists = items.find(item => item.id === product.id);
            let checkItemExistsIndex = items.findIndex(item => item.id === product.id);

            if (checkItemExists) {
                items.splice(checkItemExistsIndex, 1)
        }
    }

        currentCart.customer = customer;
        currentCart.items = items;
        currentCart.subTotal = 0;
        currentCart.tax = 0;
        currentCart.grandTotal = 0;

        for (const item of currentCart.items) {
            currentCart.subTotal += +item.price * item.quantityPurchased
        }

        currentCart.grandTotal = currentCart.subTotal + currentCart.tax;

        return currentCart;
    }

    return [addCart, updateCart, removeItem]
}