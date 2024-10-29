import { ImageProps, SafeAreaView, View } from "react-native";
import React, { useRef } from "react";
import { useStore } from "../store/store";
import { Formik, FormikProps } from "formik";
import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Spinner,
  Text,
} from "@ui-kitten/components";
import CustomDatePicker from "../components/ui/CustomDatePicker";
import { Schema } from "../Utils/validation";
import Toast from "react-native-toast-message";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp, StatusType } from "../Utils/types";
import STT from "../components/STT";
import { status } from "../Utils/constants";
import { SCREENS } from "../Utils/SCREENS";

interface FormValues {
  title: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  category: number | undefined;
  status: number;
}

const AddTask = () => {
  const { isDarkMode, addTask } = useStore();
  const navigation = useNavigation<NavigationProp>();
  const formikRef = useRef<FormikProps<FormValues>>(null);

  const LoadingIndicator = (props: ImageProps) => (
    <View className="justify-center items-center">
      <Spinner size="small" />
    </View>
  );

  const handleRecognizedText = (text: string): void => {
    formikRef.current?.setFieldValue("description", text);
  };

  const initialValues: FormValues = {
    title: "",
    description: "",
    startDate: null,
    endDate: null,
    category: undefined,
    status: status.ONGOING,
  };

  return (
    <SafeAreaView
      className={`flex-1 ${isDarkMode ? "bg-dark" : "bg-light-surface"}`}
    >
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        onSubmit={async (values: FormValues, { setSubmitting, resetForm }) => {
          try {
            const newTask = {
              id: uuid.v4().toString(),
              title: values.title,
              description: values.description,
              startDate: values.startDate,
              endDate: values.endDate,
              status: StatusType.ONGOING,
              category: values.category,
              createdAt: new Date(),
            };

            addTask(newTask);
            resetForm();

            Toast.show({
              type: "success",
              text1: "Task successfully created!",
              position: "bottom",
            });
            navigation.navigate(SCREENS.Home);
          } catch (error) {
            console.error(error);
            Toast.show({
              type: "error",
              text1: "Something went wrong",
              position: "bottom",
            });
          } finally {
            setSubmitting(false);
          }
        }}
        validationSchema={Schema}
      >
        {({
          handleChange,
          isSubmitting,
          handleSubmit,
          values,
          setFieldValue,
          errors,
          touched,
        }: FormikProps<FormValues>) => (
          <View className="mx-2 gap-y-4">
            <Input
              size="large"
              value={values.title}
              onChangeText={handleChange("title")}
              placeholder="Task title"
              label="Title"
              status={touched.title && errors.title ? "danger" : "basic"}
              caption={touched.title && errors.title}
            />
            <View className="relative">
              <Input
                size="large"
                multiline
                numberOfLines={5}
                style={{ textTransform: "capitalize" }}
                value={values.description}
                onChangeText={handleChange("description")}
                placeholder="Task Description"
                label="Description"
                textAlignVertical="top"
                status={
                  touched.description && errors.description ? "danger" : "basic"
                }
                caption={touched.description && errors.description}
              />
              <View className="absolute bottom-2 right-2">
                <STT onTextReceived={handleRecognizedText} />
              </View>
            </View>
            <CustomDatePicker
              size="large"
              date={values.startDate}
              label="Start Date"
              onSelectDate={(date: string) => setFieldValue("startDate", date)}
              status={
                touched.startDate && errors.startDate ? "danger" : "basic"
              }
              caption={touched.startDate && errors.startDate}
            />
            <CustomDatePicker
              size="large"
              date={values.endDate}
              label="End Date"
              onSelectDate={(date: string) => setFieldValue("endDate", date)}
              status={touched.endDate && errors.endDate ? "danger" : "basic"}
              caption={touched.endDate && errors.endDate}
            />

            <RadioGroup
              selectedIndex={values.category}
              onChange={(choose: number) => setFieldValue("category", choose)}
              status={touched.category && errors.category ? "danger" : "basic"}
            >
              <Radio>Software</Radio>
              <Radio>Design</Radio>
              <Radio>Operation</Radio>
            </RadioGroup>
            {touched.category && errors.category && (
              <Text status="danger">{errors.category}</Text>
            )}
            <Button
              accessoryLeft={isSubmitting ? LoadingIndicator : undefined}
              onPress={() => handleSubmit()}
              style={{ marginTop: 30 }}
              disabled={isSubmitting}
              status="success"
            >
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default AddTask;
