import CheckboxControlled from "@/components/inputs/CheckboxControlled/CheckboxControlled";
import InputText from "@/components/inputs/InputText";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useLayoutEffect,
} from "react";
import {
  SubmitHandler,
  useFieldArray,
  useForm,
  UseFormSetError,
} from "react-hook-form";
import schema from "./schema";

export type FormValues = {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  useAllByName: boolean;
  name: string;
  route: string;
  modelName: string;
  tableName: string;
  controller: string;
  transform: string;
  transformer: string;
  fields: any[];
};

type Props = {
  onSubmit: SubmitHandler<FormValues>;
  defaultValues?: Partial<FormValues>;
};

export type CrudFormRef = {
  setError: UseFormSetError<FormValues>;
  controlledFields: any[];
};

type KeysFormValues = keyof FormValues;

export const FIELD_TYPES = [];
const FIELD_OPTION = {
  name: "",
  type: "",
  default: "",
  required: false,
  unique: false,
  index: false,
};

const CrudForm: ForwardRefRenderFunction<CrudFormRef, Props> = (
  { onSubmit, defaultValues },
  ref
) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    setError,
    watch,
    setValue,
    register,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      create: false,
      read: false,
      update: false,
      delete: false,
      name: "",
      useAllByName: false,
      fields: [FIELD_OPTION],
      ...defaultValues,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields",
  });

  const useByNameFieldIsChecked = watch("useAllByName", false);
  const nameFieldValue = watch("name");
  const watchedArrayFields = watch("fields");

  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchedArrayFields[index],
    };
  });

  function firstLetterToUpperCase(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  useLayoutEffect(() => {
    const FIELDS_REFRESH_BY_NAME_CAPITALIZE: Partial<
      Record<KeysFormValues, string>
    > = {
      controller: "Controller",
      transform: "Transform",
      transformer: "Transformer",
    };

    const FIELDS_REFRESH_BY_NAME_LOWER_CASE: KeysFormValues[] = [
      "route",
      "tableName",
    ];

    if (useByNameFieldIsChecked) {
      Object.entries(FIELDS_REFRESH_BY_NAME_CAPITALIZE).forEach(
        ([key, value]) => {
          setValue(
            key as KeysFormValues,
            `${firstLetterToUpperCase(nameFieldValue)}${value}`
          );
        }
      );

      for (const field of FIELDS_REFRESH_BY_NAME_LOWER_CASE) {
        setValue(field, nameFieldValue.toLowerCase());
      }

      setValue("modelName", firstLetterToUpperCase(nameFieldValue));
    }
  }, [useByNameFieldIsChecked, nameFieldValue, setValue]);

  useImperativeHandle(ref, () => ({
    setError,
    controlledFields,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box
        as="fieldset"
        borderBottom="2px solid"
        borderColor="sageDark.sage6"
        paddingX={29}
        paddingY={5}
      >
        <Grid
          maxWidth={810}
          columnGap={12}
          rowGap={19}
          templateColumns="repeat(2, 1fr)"
        >
          <InputText
            label="Name"
            name="name"
            placeholder="Entity name"
            control={control}
          />
          <Flex width="100%">
            <CheckboxControlled
              control={control}
              name="useAllByName"
              label="Use all by name"
            />
          </Flex>

          <InputText
            disabled={useByNameFieldIsChecked}
            label="Table"
            name="tableName"
            control={control}
          />
          <InputText
            disabled={useByNameFieldIsChecked}
            label="Controller"
            name="controller"
            control={control}
          />

          <InputText
            disabled={useByNameFieldIsChecked}
            label="Transform"
            name="transform"
            control={control}
          />
          <InputText
            disabled={useByNameFieldIsChecked}
            label="Transformer"
            name="transformer"
            control={control}
          />

          <InputText
            disabled={useByNameFieldIsChecked}
            label="Route"
            name="route"
            control={control}
          />
          <InputText
            disabled={useByNameFieldIsChecked}
            label="Model"
            name="modelName"
            control={control}
          />
        </Grid>
      </Box>

      <Box paddingX={29} paddingY={5}>
        <Text variant="heading" color="white" fontSize="md">
          Fields
        </Text>

        <Flex marginTop={4} gap={2} flexDirection="column">
          {fields.map((field, index) => (
            <Flex gap={12} key={field.id}>
              <Flex gap={3}>
                <Input
                  placeholder="Name"
                  size="sm"
                  {...register(`fields.${index}.name`)}
                />
                <Input
                  placeholder="Type"
                  size="sm"
                  {...register(`fields.${index}.type`)}
                />
                <Input
                  placeholder="Default value"
                  size="sm"
                  {...register(`fields.${index}.default`)}
                />

                <Box
                  display="grid"
                  gridTemplateColumns="repeat(3, 1fr)"
                  gap={3}
                >
                  <CheckboxControlled
                    control={control}
                    label="Required"
                    name={`fields.${index}.required`}
                    size="sm"
                  />
                  <CheckboxControlled
                    control={control}
                    label="Unique"
                    name={`fields.${index}.unique`}
                    size="sm"
                  />
                  <CheckboxControlled
                    control={control}
                    label="Nullable"
                    name={`fields.${index}.nullable`}
                    size="sm"
                  />
                </Box>
              </Flex>

              <HStack>
                <IconButton
                  size="sm"
                  aria-label="Add new field"
                  variant="ghost"
                  onClick={() => append(FIELD_OPTION)}
                  icon={<AddIcon />}
                />

                <IconButton
                  size="sm"
                  aria-label="Remove this field"
                  variant="ghost"
                  disabled={fields.length === 1}
                  onClick={() => remove(index)}
                  color="redDark.red9"
                  icon={<DeleteIcon />}
                />
              </HStack>
            </Flex>
          ))}
        </Flex>
      </Box>

      <Flex
        as="footer"
        alignItems="center"
        justifyContent="flex-end"
        paddingX={29}
        paddingY={5}
        borderTop="2px solid"
        borderColor="sageDark.sage6"
      >
        <Button isLoading={isSubmitting} type="submit">
          Generate!
        </Button>
      </Flex>
    </form>
  );
};

export default forwardRef(CrudForm);
