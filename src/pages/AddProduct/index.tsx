import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { createProduct } from "../../services/product-api";
import { ProductNoId } from "../../services/type-common";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(Number);
  const [quantity, setQuantity] = useState(Number);
  const [image, setImage] = useState("");

  const newProduct: ProductNoId = {
    productName: productName,
    productDescription: productDescription,
    productPrice: productPrice,
    quantity: quantity,
    image: image,
  };

  const mutation = useMutation({
    mutationFn: async () => {
      await createProduct({ stringUrl: "CreateProduct", data: newProduct });
    },
    onSuccess: (data) => {
      console.log(data);
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  async function handleCreate() {
    try {
      mutation.mutate(); // Khi bạn gọi mutate, React Query sẽ bắt đầu thực hiện thao tác mà bạn đã định nghĩa trong mutationFn. Sau khi thao tác hoàn tất, các callback như onSuccess sẽ được gọi dựa trên kết quả của thao tác.
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="py-2">
        <label className="pr-2 w-20 inline-block">Product Name</label>
        <input
          onChange={(e) => setProductName(e.target.value)}
          value={productName}
          className="p-2 border-2 border-red-600"
          type="text"
        />
      </div>
      <div className="py-2">
        <label className="pr-2 w-20 inline-block">Product Description</label>
        <input
          onChange={(e) => setProductDescription(e.target.value)}
          value={productDescription}
          className="p-2 border-2 border-red-600"
          type="text"
        />
      </div>
      <div className="py-2">
        <label className="pr-2 w-20 inline-block">Product Price</label>
        <input
          onChange={(e) => setProductPrice(Number(e.target.value))}
          value={productPrice}
          className="p-2 border-2 border-red-600"
          type="text"
        />
      </div>
      <div className="py-2">
        <label className="pr-2 w-20 inline-block">Quantity</label>
        <input
          onChange={(e) => setQuantity(Number(e.target.value))}
          value={quantity}
          className="p-2 border-2 border-red-600"
          type="text"
        />
      </div>
      <div className="py-2">
        <label className="pr-2 w-20 inline-block">Image</label>
        <input
          onChange={(e) => setImage(e.target.value)}
          value={image}
          className="p-2 border-2 border-red-600"
          type="text"
        />
      </div>
      <div
        className="w-20 h-10 border-2 border-red-600 flex justify-center items-center"
        onClick={handleCreate}
      >
        Submit
      </div>
    </div>
  );
}
