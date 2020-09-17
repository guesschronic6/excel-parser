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
  monthlyLoadProfiles: Map<string, LoadProfile_Month>;
}>({
  updateLoadProfiles: (rawDatas) => {},
  monthlyLoadProfiles: new Map(),
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
    console.log(monthlyLoadProfiles);
    console.log(Array.from(monthlyLoadProfiles.values()));
  }, [monthlyLoadProfiles]);

  function updateLoadProfiles(rawDatas: LoadProfile_Raw[]) {
    console.log("Updating load profile datas in context....");
    new Promise<Map<string, LoadProfile_Month>>((resolve, reject) => {
      let newMonthlyLoadProfiles = new Map(monthlyLoadProfiles);

      for (let rawData of rawDatas) {
        let key = `${rawData.month}-${rawData.year}`;

        if (!monthlyLoadProfiles.has(key)) {
          console.log("Adding new monthly load profile, key: " + key);
          newMonthlyLoadProfiles.set(
            key,
            new LoadProfile_Month(rawData.month, rawData.year)
          );
        }

        let monthlyLoadProfile = newMonthlyLoadProfiles.get(
          key
        ) as LoadProfile_Month;
        monthlyLoadProfile?.addData(rawData);
        newMonthlyLoadProfiles.set(key, monthlyLoadProfile);
      }
      resolve(newMonthlyLoadProfiles);
    })
      .then((result) => {
        setMonthlyLoadProfiles(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <LoadProfileContext.Provider
      value={{
        updateLoadProfiles,
        monthlyLoadProfiles,
      }}
    >
      {children}
    </LoadProfileContext.Provider>
  );
};

export default LoadProfileContextProvider;
export { LoadProfileContext };
