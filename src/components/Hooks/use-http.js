import { useState } from "react";

function useHttp(requestObj, applyData) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (taskText) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestObj.url, {
        method: requestObj.method,
        body: requestObj.body ? JSON.stringify(requestObj.body) : null,
        headers: requestObj.headers ? requestObj.headers : {},
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };
  return isLoading, error, sendRequest;
}
export default useHttp;
