class ProductApi {
  getAll = (params) => {
    const url = "/products";
    return axiosClient.get(url, { params });
  };
}
const productApi = new ProductApi();
export default productApi;
