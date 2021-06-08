import { useState, useEffect } from "react";

export const useFetch = (url: string, headers: any, initialData: any) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const response = await fetch(url, { headers } );
        const responseJson = await response.json();
        setData(responseJson);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [headers, url]);

  // console.log(`fetch data => ${data}`);
  return { data: data, isLoading, isError };
};

export default useFetch;
