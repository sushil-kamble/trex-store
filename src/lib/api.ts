export async function fetchProducts() {
    const response = await fetch(
        'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json'
    );

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    return response.json();
}
