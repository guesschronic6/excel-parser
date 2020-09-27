import React, { createContext, useEffect, useState } from "react";
import { LoadProfile_Raw, MonthlyLoadProfile } from "../loadprofile/objects";

export type DeleteLoadpRofileInfo = {
  fileName: string;
  meteringPoints: string[];
};

const LoadProfileContext = createContext<{
  updateLoadProfiles: (rawDatas: LoadProfile_Raw[]) => void;
  monthlyLoadProfiles: Map<string, MonthlyLoadProfile>;
  working: boolean;
  deleteLoadProfiles: (deleteLoadProfileInfo: DeleteLoadpRofileInfo) => void;
}>({
  updateLoadProfiles: (rawDatas) => {},
  monthlyLoadProfiles: new Map(),
  working: false,
  deleteLoadProfiles: (deleteLoadProfileInfo) => {},
});

type LoadProfileContextProviderProps = {};
const LoadProfileContextProvider: React.FunctionComponent<LoadProfileContextProviderProps> = (
  props
) => {
  const { children, ...others } = props;
  const [monthlyLoadProfiles, setMonthlyLoadProfiles] = useState(
    new Map<string, MonthlyLoadProfile>()
  );

  const [buffer, setBuffer] = useState<
    (LoadProfile_Raw[] | DeleteLoadpRofileInfo)[]
  >([]);
  const [working, setWorking] = useState(false);

  useEffect(() => {}, [monthlyLoadProfiles]);

  function updateLoadProfiles(rawDatas: LoadProfile_Raw[]) {
    setBuffer((prevBuffer) => [...prevBuffer, rawDatas]);
  }

  function deleteLoadProfiles(deleteLaodProfileInfo: DeleteLoadpRofileInfo) {
    setBuffer((prevBuffer) => [...prevBuffer, deleteLaodProfileInfo]);
  }

  useEffect(() => {
    if (working) return;
    if (buffer.length <= 0) {
      setWorking(false);
      return;
    }

    let newBuffer = [...buffer];
    let data = newBuffer.pop();
    if (data) {
      setWorking(true);

      if (Array.isArray(data)) {
        console.log("Data instance of ARRRRAAAAY....");
        addRawDatasToMonthlyLoadProfiles(data).then((result) => {
          setMonthlyLoadProfiles(result);
          setWorking(false);
          setBuffer(newBuffer);
        });
      } else {
        console.log("Data instance of ARRRRAAAAY....");
        deleteDataFromMonthlyLoadProfiles(
          data.fileName,
          data.meteringPoints
        ).then((result) => {
          setMonthlyLoadProfiles(result);
          setWorking(false);
          setBuffer(newBuffer);
        });
      }
    }
  }, [buffer]);

  function addRawDatasToMonthlyLoadProfiles(rawDatas: LoadProfile_Raw[]) {
    return new Promise<Map<string, MonthlyLoadProfile>>((resolve, reject) => {
      console.log("Processing rawDatas");
      let newMonthlyLoadProfiles = new Map(monthlyLoadProfiles);
      for (let rawData of rawDatas) {
        let key = `${rawData.billingPeriod.month}-${rawData.year}`;
        if (!newMonthlyLoadProfiles.has(key)) {
          newMonthlyLoadProfiles.set(
            key,
            new MonthlyLoadProfile(rawData.billingPeriod)
          );
        }
        newMonthlyLoadProfiles.get(key)?.addData(rawData);
      }
      newMonthlyLoadProfiles.forEach((mlp) => mlp.initOtherDetails());
      resolve(newMonthlyLoadProfiles);
    });
  }

  function deleteDataFromMonthlyLoadProfiles(
    fileName: string,
    meteringPoints: string[]
  ) {
    return new Promise<Map<string, MonthlyLoadProfile>>((resolve, reject) => {
      console.log("DELETING LAODP ROFILESS");
      let newMonthlyLoadProfiles = new Map(monthlyLoadProfiles);
      for (let key of newMonthlyLoadProfiles.keys()) {
        let mpl = newMonthlyLoadProfiles.get(key);
        mpl?.removeData(fileName, meteringPoints);
      }
      newMonthlyLoadProfiles.forEach((mlp) => {
        mlp.initOtherDetails();
        if (mlp.nonCoincidentPeak === 0) {
          let key = `${mlp.billingPeriod.month}-${mlp.billingPeriod.year}`;
          newMonthlyLoadProfiles.delete(key);
        }
      });
      resolve(newMonthlyLoadProfiles);
    });
  }

  return (
    <LoadProfileContext.Provider
      value={{
        updateLoadProfiles,
        monthlyLoadProfiles,
        deleteLoadProfiles,
        working,
      }}
    >
      {children}
    </LoadProfileContext.Provider>
  );
};

export default LoadProfileContextProvider;
export { LoadProfileContext };
