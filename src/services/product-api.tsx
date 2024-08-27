import { get, post, remove, update } from ".";
import { Product, ProductNoId } from "./type-common";

//getProducts({ stringUrl }: { stringUrl?: string }, { params } : {params?: object}) // sai
export async function getProducts({
  stringUrl,
  params,
}: {
  stringUrl?: string;
  params?: object;
}) {
  return await get<{ code: string; message: string; data: Product[] }>({
    // trả về 1 đối tượng gồm 3 đối tượng con
    // url: stringUrl ? `/Product/${stringUrl}` : `/Product`,
    url: stringUrl ? `/Product/${stringUrl}` : `/Product`,
    params: params,
  });
}

export async function createProduct({ stringUrl, data }: {stringUrl: string, data: ProductNoId}) {
  await post({
    url: `/Product/${stringUrl}`,
    data: data,
  });
}

export async function editProduct(data: Product) {
  await update({
    url: `/Product/${data.id}`,
    data: data,
  });
}

export async function deleteProduct(id: string) {
  await remove({ url: `/Product/${id}` });
}
