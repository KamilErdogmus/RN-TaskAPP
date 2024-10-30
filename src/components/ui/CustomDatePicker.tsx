import React from "react";
import { Datepicker } from "@ui-kitten/components";

const CustomDatePicker = ({ onSelectDate = () => {}, ...props }: any) => {
  return (
    <Datepicker {...props} onSelect={(nextDate) => onSelectDate(nextDate)} />
  );
};

export default CustomDatePicker;
