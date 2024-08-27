export type Product = {
    id: string,
    productName: string,
    productDescription: string,
    productPrice: number,
    quantity: number,
    image: string,
}

export type ProductNoId = Omit<Product, "id"> // use for create, edit