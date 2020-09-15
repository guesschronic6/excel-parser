import {
  saveLoadProfileSettings,
  loadLoadProfileSettings,
} from "./StorageManager";

import LoadPRofileObjects from "./loadprofile";

import { Month } from "./enums";

const LoadProfile = {
  Objects: LoadPRofileObjects,
};

export { saveLoadProfileSettings, loadLoadProfileSettings, Month, LoadProfile };
