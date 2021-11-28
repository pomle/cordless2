import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

export function useRecommendations() {
  const api = useSelector((state) => {
    console.log(state);
    return null;
  });

  const [data, setData] = useState<any>();

  const fetch = useCallback(() => {
    setData([]);
  }, []);

  return {
    data,
    fetch,
  };
}
