import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React, { FormEvent, useEffect, useState } from "react";
import { BillingPeriod } from "../common/object";
import { FileUtil } from "../common/utils";
import PowerSubstationExcelUtil from "./PowerSubstationExcelUtil";
import { PowerSubstationRawData } from "../power_substation/types";
import FormSelectFields from "../styled_components/FormSelectField";
import { FilecardProps } from "../filesdrawer/FileCard";
import { GeneralUtil } from "../common/object";

type PowerSubstationParserProps = {
  file: File;
  render: React.FunctionComponent<FilecardProps>;
  onFileParsed: (rawDatas: PowerSubstationRawData[]) => void;
  onRemoveFile: (file: File) => void;
};

const LoadProfileParser: React.FunctionComponent<PowerSubstationParserProps> = (
  props
) => {
  const { file, render, onFileParsed, onRemoveFile, ...others } = props;
  const [progress, setProgress] = useState<number>(0);
  const [progressInfo, setsProgressInfo] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [openBillingPeriodDialog, setOpenBillingPeriodDialog] = useState(true);
  const [billingYear, setBillingYear] = useState(new Date().getFullYear());
  const [billingMonth, setBillingMonth] = useState(new Date().getMonth() + 1);
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod | null>(
    null
  );

  useEffect(() => {
    if (billingPeriod) {
      startParsing();
    }
  }, [billingPeriod]);

  function startParsing() {
    FileUtil.extractWorkbookFromFile(file)
      .then((workbook) => {
        let bp = billingPeriod;
        return PowerSubstationExcelUtil.extractRawDatasFromWorkbook(
          file.name,
          workbook,
          bp as BillingPeriod,
          handleProgressUpdate
        );
      })
      .then((result) => {
        setErrors(result.errors);
        handleFileParsed(result.value);
      })
      .catch((e) => {
        console.error(e);
        errors.push(e.message);
      });
  }

  function handleFileParsed(rawDatas: PowerSubstationRawData[]) {
    onFileParsed(rawDatas);
  }

  function handleProgressUpdate(info: string, percent: number) {
    setProgress(percent);
    setsProgressInfo(info);
  }

  function handleRemoveFile() {
    onRemoveFile(file);
  }

  function handleYearChange(event: React.ChangeEvent<{ value: unknown }>) {
    setBillingYear(Number(event.target.value));
  }

  function handleMonthChange(event: React.ChangeEvent<{ value: unknown }>) {
    setBillingMonth(Number(event.target.value));
  }

  function handleSubmit(event: FormEvent<HTMLElement>) {
    event.preventDefault();
    setBillingPeriod(new BillingPeriod(billingMonth, billingYear));
    setOpenBillingPeriodDialog(false);
  }

  const classes = useStyles();
  return (
    <React.Fragment>
      {render({
        progress,
        progressInfo,
        file,
        errors,
        onRemoveFile: handleRemoveFile,
      })}
      <Dialog open={openBillingPeriodDialog}>
        <DialogTitle>{`Input Billing Period for ${file.name}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the billing month (in numbers) and the billing year (number)
            e.g. 5 2020 = ( April 26 ~ May 25 2020)
          </DialogContentText>
          <form
            id="billing-period-form"
            className={classes.form}
            onSubmit={handleSubmit}
          >
            <FormSelectFields
              className={classes.billingYear}
              value={billingYear.toString()}
              label="Year"
              onChange={handleYearChange}
              items={GeneralUtil.getYears().map((year) => ({
                value: year.toString(),
                text: year.toString(),
              }))}
            />
            <FormSelectFields
              value={billingMonth.toString()}
              label="Month"
              onChange={handleMonthChange}
              items={GeneralUtil.getMonths().map((month) => ({
                value: month.monthNum.toString(),
                text: month.month.toString(),
              }))}
            />
          </form>
          <DialogActions>
            <Button form="billing-period-form" type="submit">
              OK
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: "flex",
      padding: theme.spacing(3),
      maxWidth: "300px",
    },
    billingYear: {
      flex: 1,
    },
  })
);

export default LoadProfileParser;
