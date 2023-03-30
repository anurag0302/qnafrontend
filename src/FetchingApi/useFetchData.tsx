import React, { useCallback, useState } from "react";

export const useFetchData = () => {
  const [transformedData, setTransformedData] =
    useState<React.SetStateAction<any>>();
  const [loading, setLoading] = useState(false);

  const kFetch = useCallback(async (_url: any) => {
    setLoading(true);
    try {
      const response = await fetch(_url);

      if (!response) {
        console.log("error");
      }
      const data = await response.json();
      
      setTransformedData(data.Items);
    } catch (err) {
      console.log("error", err);
    }
    setLoading(false);
  }, []);
  return { transformedData, loading, kFetch, setTransformedData };
};
