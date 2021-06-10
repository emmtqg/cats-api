import { useState, useEffect } from "react";

export const useFetch: any = (url: string, headers: any): any => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const response = await fetch(url, { headers });
        const responseJson = await response.json();
        setData(responseJson);
        
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [headers, url]);

  // console.log(`fetch data => ${JSON.stringify(data, null, 2)}`);
  console.log('fetch data');
  return { data, isLoading, isError };
};

export default useFetch;
