import { useSearchParams } from 'react-router-dom';

export const useFilterActions = () => {
  const [filterParams, setFilterParams] = useSearchParams();

  const updateURL = (newValues) => {
    const params = new URLSearchParams(filterParams);
    
    Object.entries(newValues).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key); 
      }
    });

// this condition for user if change in pagination dont reset pageNum
    if (!newValues.pageNum) {
      params.set("pageNum", 1);
    }

    setFilterParams(params);
  };

  return { 
    updateURL, 
    filterParams,
    currentPage: Number(filterParams.get("pageNum")) || 1 
  };
};