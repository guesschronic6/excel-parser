import { MonthlyLoadProfile, DailyLoadProfile } from "./objects";
import XLSX from "xlsx";

function generateMonthlyLoadProfileXlsx(
  monthlyLoadProfile: MonthlyLoadProfile
) {
  let workbook = XLSX.utils.book_new();
  let worksheetName = `${monthlyLoadProfile.billingPeriod.toString()}`;
  let worksheetData = generateSheetData(monthlyLoadProfile);
  let worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);
  XLSX.writeFile(
    workbook,
    `Monthly LoadProfile Report of ${monthlyLoadProfile.billingPeriod.toString()}.xlsx`
  );
}

function generateSheetData(monthlyLoadProfile: MonthlyLoadProfile) {
  let data = [];
  let start = monthlyLoadProfile.billingPeriod.startDate;
  let end = monthlyLoadProfile.billingPeriod.enddDate;
  console.log(
    `start date: ${start.toLocaleDateString()} endDate: ${end.toLocaleDateString()}`
  );

  //---------CREATING HEADERS-------------

  let header = ["Date", "Hour"];
  for (let loadProfile of monthlyLoadProfile.loadProfiles.values()) {
    header.push(loadProfile.meteringPoint);
  }
  header.push("Total");

  //----------CONTENT----------------
  data.push(header);
  while (start <= end) {
    let dateString = `${
      start.getMonth() + 1
    }/${start.getDate()}/${start.getFullYear()}`;

    for (let hour = 0; hour < 24; hour++) {
      let row: string[] = [];
      row.push(dateString);

      row.push(hour.toString());
      for (let loadProfile of monthlyLoadProfile.loadProfiles.values()) {
        let dailyLoadProfile =
          loadProfile.dailyLoadProfiles.get(dateString) ||
          new DailyLoadProfile(new Date(dateString));
        row.push(
          dailyLoadProfile.hourlyLoadProfiles[hour].getTotalKwdel().toFixed(2)
        );
      }

      let dailyLoadProfile =
        monthlyLoadProfile.totalLoadpRofile.dailyLoadProfiles.get(dateString) ||
        new DailyLoadProfile(new Date(dateString));
      row.push(
        dailyLoadProfile.hourlyLoadProfiles[hour].getRawTotal().toFixed(2)
      );
      console.log(row);
      data.push(row);
    }
    start.setDate(start.getDate() + 1);
  }

  console.log(data);
  return data;
}

export default generateMonthlyLoadProfileXlsx;
