import { CollectionsOutlined } from "@material-ui/icons";
import React, { createContext, useEffect, useState } from "react";
import { LoadProfile_Raw, MonthlyLoadProfile } from "../loadprofile/objects";

const LoadProfileContext = createContext<{
  updateLoadProfiles: (rawDatas: LoadProfile_Raw[]) => void;
  monthlyLoadProfiles: Map<string, MonthlyLoadProfile>;
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
    Map<string, MonthlyLoadProfile>
  >(new Map<string, MonthlyLoadProfile>());

  useEffect(() => {
    console.log("MonthlyLoadProfiles State Updated");
    console.log(monthlyLoadProfiles);
  }, [monthlyLoadProfiles]);

  function updateLoadProfiles(rawDatas: LoadProfile_Raw[]) {
    console.log("Updating load profile datas in context....");
    new Promise<Map<string, MonthlyLoadProfile>>((resolve, reject) => {
      let newMonthlyLoadProfiles = new Map(monthlyLoadProfiles);
      for (let rawData of rawDatas) {
        let key = `${rawData.billingPeriod.month}-${rawData.year}`;
        if (!newMonthlyLoadProfiles.has(key)) {
          console.log("Loadprofile raw data:");
          console.log(rawData);
          console.log("Adding new monthly load profile, key: " + key);
          newMonthlyLoadProfiles.set(
            key,
            new MonthlyLoadProfile(rawData.billingPeriod)
          );
        }
        newMonthlyLoadProfiles.get(key)?.addData(rawData);
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
