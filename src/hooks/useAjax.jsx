import { useState } from "react";
import { useEffect } from "react";

export function useAjax(
  typeFn,
  uri,
  initialValue = [],
  errorMessage = "An Error Occured"
) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [Fetchdata, setFetchData] = useState(initialValue);
  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await typeFn(uri);
        setFetchData(data);
        setIsFetching(false);
      } catch (error) {
        setError({
          message: error.message || errorMessage,
        });
        setIsFetching(false);
      }
    }
    fetchData();
  }, [typeFn]);

  return { isFetching, error, Fetchdata };
}
