import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { forwardRef, useImperativeHandle } from "react";

interface IFormData {
  numDailyWords: number;
  language: string;
}

interface IProps extends IFormData {
  updateData: (data: Partial<IFormData>) => void;
}

const NUM_WORDS_OPTIONS = [1, 3, 5, 10, 20, 50];
const LANGUAGES_OPTIONS = [
  "German",
  "Spanish",
  "Japanese",
  "Mandarin",
  "Portuguese",
  "Russian",
  "Thai",
  "French",
];

const OptionsForm = forwardRef(
  ({ updateData, numDailyWords, language }: IProps, ref) => {
    useImperativeHandle(ref, () => ({
      checkValid() {
        return true;
      },
    }));

    const handleChange =
      (label: keyof IFormData) => (e: SelectChangeEvent<any>) => {
        updateData({ [label]: e.target.value });
      };

    return (
      <>
        <FormControl fullWidth>
          <InputLabel>Num. Daily Words</InputLabel>
          <Select
            value={numDailyWords}
            label="Num. Daily Words"
            onChange={handleChange("numDailyWords")}
          >
            {NUM_WORDS_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Language</InputLabel>
          <Select
            value={language}
            label="Language"
            onChange={handleChange("language")}
          >
            {LANGUAGES_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </>
    );
  }
);

export default OptionsForm;
