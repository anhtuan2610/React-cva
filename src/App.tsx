import { useState } from "react";
import { getProducts } from "./services/product-api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 2;
  const params = {
    PageNumber: currentPage,
    PageSize: itemsPerPage,
    SearchString: searchString,
  };

  let { data, isLoading } = useQuery({
    queryKey: ["products", searchString, currentPage], // search -> có data -> xử lý phân trang
    queryFn: async () => {
      return await getProducts({
        stringUrl: "GetAll",
        params: params,
      });
    },
    staleTime: 1 * 60 * 1000,
  });

  async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchString(e.target.value);
  }

  function renderNumberPagination() {
    const totalItems = 12;
    if (totalItems > 0) {
      const totalPage = Math.ceil(totalItems / itemsPerPage);
      const pageNumbers = [];
      for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(
          <button
            className="border-2 w-8 border-red-600 mx-1"
            onClick={() => handlePagination(i)}
          >
            {i}
          </button>
        );
      }
      return pageNumbers;
    }
    return null;
  }

  // function renderDataPagination() {
  //   if (data?.data) {
  //     const startIndex = (currentPage - 1) * itemsPerPage;
  //     const lastIndex = startIndex + itemsPerPage;
  //     return data?.data.slice(startIndex, lastIndex);
  //   }
  //   return [];
  // }

  function handlePagination(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  return (
    <>
      <div>
        <input
          id="search"
          type="text"
          className="w-1/4 border-2 border-red-600"
          value={searchString}
          onChange={handleSearch}
        />
        {isLoading ? (
          <div>Loading....</div>
        ) : (
          data?.data.map((p) => <div>{p.productName}</div>)
        )}
        <div id="pagination-buttons">
          <div>{renderNumberPagination()}</div>
        </div>
        <div className="cursor-pointer flex justify-center items-center w-8 h-8 rounded-full border-2 border-blue-500" onClick={() => navigate(`/add`)}><button>+</button></div>
      </div>
    </>
  );
}

export default App;
