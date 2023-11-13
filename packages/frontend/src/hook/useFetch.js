import { useState } from "react";

export default function useFetch(baseUrl) {
  const [loading, setLoading] = useState(true);

  function get(path) {
    return new Promise((resolve, reject) => {
      const url = baseUrl + path;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (!data) {
            return reject(data);
          }
          resolve(data)
        })
        .catch((err) => {
          console.log("(-) Error: " + err);
          reject(err);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }

  return { get, loading };
}
