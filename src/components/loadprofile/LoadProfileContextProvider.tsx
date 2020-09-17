import { CollectionsOutlined } from "@material-ui/icons";
import React, { createContext, useEffect, useState } from "react";
import {
  LoadProfile_Raw,
  LoadProfile_Month,
  LoadProfile_Day,
  LoadProfile_Hour,
} from "../loadprofile/objects";

const LoadProfileContext = createContext<{
  updateLoadProfiles: (rawDatas: LoadProfile_Raw[]) => void;
}>({
  updateLoadProfiles: (rawDatas) => {},
});

type LoadProfileContextProviderProps = {};
const LoadProfileContextProvider: React.FunctionComponent<LoadProfileContextProviderProps> = ({
  children,
  ...others
}) => {
  const [monthlyLoadProfiles, setMonthlyLoadProfiles] = useState<
    Map<string, LoadProfile_Month>
  >(new Map<string, LoadProfile_Month>());

  useEffect(() => {
    console.log("MonthlyLoadProfiles State Updated");
  }, [monthlyLoadProfiles]);

  function updateLoadProfiles(rawDatas: LoadProfile_Raw[]) {
    console.log("Updating load profile datas in context....");
    for (let rawData of rawDatas) {
      let key = `${rawData.month}-${rawData.year}`;
      console.log("key: " + key);
      if (!monthlyLoadProfiles.has(key)) {
        setMonthlyLoadProfiles((prevVal) => {
          // console.log("Inserting new LoadProfileMonth, key: " + key);
          // prevVal.set(key, new LoadProfile_Month(rawData.month, rawData.year));
          return prevVal;
        });
      }

      setMonthlyLoadProfiles((prevVal) => {
        let monthlyLoadProfile = prevVal.get(key) as LoadProfile_Month;
        monthlyLoadProfile?.addData(rawData);
        // prevVal.set(key, monthlyLoadProfile);
        // console.log(prevVal);
        return prevVal;
      });
    }
  }

  return (
    <LoadProfileContext.Provider
      value={{
        updateLoadProfiles,
      }}
    >
      {children}
    </LoadProfileContext.Provider>
  );
};

export default LoadProfileContextProvider;
export { LoadProfileContext };
