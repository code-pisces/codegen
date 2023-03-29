import CrudForm from "@/components/forms/CrudForm";
import { CrudFormRef } from "@/components/forms/CrudForm/CrudForm";
import SeedsDialog from "@/components/SeedsDialog";
import MainLayout from "@/layouts/MainLayout";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import React, { ReactElement, useRef } from "react";
import { useBoolean } from "usehooks-ts";
import type { NextPageWithLayout } from "./_app";

const Crud: NextPageWithLayout = () => {
  const formRef = useRef<CrudFormRef>(null);

  const turnInOptionsToSeed = formRef.current?.controlledFields.map(
    (option) => {
      if (option.name)
        return {
          label: option.name,
          value: option.name,
        };
    }
  ) as { label: string; value: string }[];

  const { value: isSeedsDialogOpened, setFalse: closeSeedsDialog } =
    useBoolean();

  function handleSubmit(data: any) {
    return data;
  }

  return (
    <Container maxWidth="1045px" height="100%" m="auto" py={10}>
      <SeedsDialog
        isOpen={isSeedsDialogOpened}
        onClose={closeSeedsDialog}
        options={turnInOptionsToSeed}
        onConfirm={() => null}
      />
      <Box width="100%" backgroundColor="sageDark.sage3">
        <Box
          as="header"
          paddingX={29}
          paddingY={5}
          borderBottom="2px solid"
          borderColor="sageDark.sage6"
        >
          <Text as="h2" variant="heading" color="white">
            Crud Generator
          </Text>
        </Box>

        <Flex flexDirection="column" marginBottom={10}>
          <CrudForm ref={formRef} onSubmit={handleSubmit} />
        </Flex>
      </Box>
    </Container>
  );
};

Crud.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout title="Dashboard">{page}</MainLayout>;
};

export default Crud;
