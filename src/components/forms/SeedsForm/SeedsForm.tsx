import { Box, Button, Input, Select } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useMemo,
} from "react";
import {
  SubmitHandler,
  useFieldArray,
  useForm,
  UseFormSetError,
} from "react-hook-form";
import schema from "./schema";

type Field = {
  key: string;
  value: string;
};

export type FormValues = {
  fields: Array<Field>;
  uniqueKey: string;
};

type Props = {
  onSubmit: SubmitHandler<FormValues>;
  defaultValues?: Partial<FormValues>;
  options?: { label: string; value: string }[];
};

export type SeedsFormRef = {
  setError: UseFormSetError<FormValues>;
};

const FIELD_OPTION = {
  key: "",
  value: "",
};

const SeedsForm: ForwardRefRenderFunction<SeedsFormRef, Props> = (
  { onSubmit, defaultValues, options },
  ref
) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    setError,
    register,
    watch,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      fields: [FIELD_OPTION],
      uniqueKey: "",
      ...defaultValues,
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "fields",
  });

  useImperativeHandle(ref, () => ({
    setError,
  }));

  const watchedArrayFields = watch("fields");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchedArrayFields[index],
    };
  });

  // const newObject = useMemo(() => {
  //   const newObject: Record<string, string> = {};
  //   controlledFields.forEach((field) => {
  //     if (field.key && field.value) {
  //       newObject[field.key] = field.value;
  //     }
  //   });
  //   return newObject;
  // }, [controlledFields]);

  const isAllowedCreateNewField = useMemo(() => {
    const lastField = controlledFields[controlledFields.length - 1];
    return Boolean(lastField.key && lastField.value);
  }, [controlledFields]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
        {fields.map((field, index) => (
          <React.Fragment key={field.id}>
            <Select
              placeholder="Key"
              size="sm"
              {...register(`fields.${index}.key`)}
            >
              {options?.map((option) => (
                <option key={option?.label} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </Select>
            <Input
              placeholder="Value"
              size="sm"
              {...register(`fields.${index}.value`)}
            />
          </React.Fragment>
        ))}
        <Select placeholder="Unique Key" size="sm" {...register("uniqueKey")}>
          {options?.map((option) => (
            <option key={option?.label} value={option?.value}>
              {option?.label}
            </option>
          ))}
        </Select>
      </Box>

      <Button
        mt={8}
        isLoading={isSubmitting}
        variant="ghost"
        isFullWidth
        onClick={() => append(FIELD_OPTION)}
        disabled={!isAllowedCreateNewField}
      >
        New Attribute
      </Button>
      <Button marginTop={3} isLoading={isSubmitting} type="submit" isFullWidth>
        Add object to seeds
      </Button>
    </form>
  );
};

export default forwardRef(SeedsForm);
