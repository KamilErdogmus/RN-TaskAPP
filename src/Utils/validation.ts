import * as Yup from "yup";

export const Schema = Yup.object().shape({
  title: Yup.string().required("Please enter a title"),
  description: Yup.string().required("Please enter a title"),
  startDate: Yup.date().nullable().required("Start date is required"),
  endDate: Yup.date()
    .nullable()
    .required("End date is required")
    .min(Yup.ref("startDate"), "End date must be later than start date"),
  category: Yup.number()
    .required("Category is required")
    .min(0, "Please select a category"),
  status: Yup.number().required("Status is required"),
});
