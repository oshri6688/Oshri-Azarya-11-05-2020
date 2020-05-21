import { useState, useRef } from 'react';
import { isEmpty } from 'lodash';

const useFetchData = ({
  fetchData,
  dataName,
  defaultData = null,
  updateLoadingOnlyWhenDataEmpty = false,
  clearDataOnlyWhenFetchFailed = false,
  clearDataBeforeFetch = true,
}) => {
  const [data, setData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(false);
  const shouldUpdateLoading = useRef();
  const shouldClearData = clearDataBeforeFetch && !clearDataOnlyWhenFetchFailed;

  shouldUpdateLoading.current = !updateLoadingOnlyWhenDataEmpty || isEmpty(data);

  const clearData = () => {
    shouldUpdateLoading.current = true;
    setData(defaultData);
  };

  const loadData = (...args) => {
    shouldClearData && clearData();
    shouldUpdateLoading.current && setIsLoading(true);

    return fetchData(...args)
      .then((data) => setData(data))
      .catch((error) => {
        clearDataOnlyWhenFetchFailed && clearData();

        console.error(`Error while fetching ${dataName} -`, error);
      })
      .finally(() => setIsLoading(false));
  };

  return {
    data,
    loadData,
    isLoading,
    clearData,
  };
};

export default useFetchData;
