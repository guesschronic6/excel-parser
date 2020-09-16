import { Typography, LinearProgress, Button } from "@material-ui/core";
import { ErrorOutline } from "@material-ui/icons";
import React, { useCallback, useEffect, useState } from "react";
import cardStyles from "./card-styles";
import LoadProfile from "../../common/loadprofile";
import LoadProfileExcelParser from "../../common/loadprofile/LoadProfileExcelParser";

type LoadProfileProps = {
  file: File;
};

const LoadProfileCard: React.FunctionComponent<LoadProfileProps> = ({
  file,
  ...others
}) => {
  const [processing, setProcessing] = useState(false);
  const [processInfo, setProcessInfo] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const classes = cardStyles();

  useEffect(() => {
    setProcessInfo("Parsing excel file...");
    async function generateLoadProfile() {
      setProcessing(true);
      let excelParser = new LoadProfileExcelParser(file);
      await excelParser.extractMonthlyLoadProfileFromFile();
      setProcessing(false);
      setProcessInfo("finished");
    }
    generateLoadProfile();
  }, [file]);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography className={classes.filename}>{file.name}</Typography>
        <div className={classes.progress_content}>
          <LinearProgress
            value={0}
            variant={processing ? "indeterminate" : "determinate"}
          />
          <Typography className={classes.progress_text}>
            {processInfo}
          </Typography>
        </div>
      </div>
      <div className={classes.action}>
        <Button
          className={classes.button}
          size="small"
          color="secondary"
          startIcon={<ErrorOutline color="error" />}
        >
          see errors
        </Button>
        <Button className={classes.button} size="small" color="primary">
          close
        </Button>
      </div>
    </div>
  );
};

export default LoadProfileCard;
