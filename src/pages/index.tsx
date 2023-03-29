import DataTable from "@/components/DataTable";
import MainLayout from "@/layouts/MainLayout";
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import database from "@/mock/database.json";
import { Cell } from "react-table";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { IoMdEye } from "react-icons/io";
import { useRouter } from "next/router";
import Link from "next/link";

type OptionsProps = {
  view: () => void;
  remove: () => void;
};

function Options({ remove, view }: OptionsProps) {
  return (
    <HStack>
      <IconButton
        size="sm"
        aria-label="View new field"
        variant="ghost"
        onClick={view}
        color="sageDark.11"
        icon={<IoMdEye />}
      />

      <IconButton
        size="sm"
        aria-label="Remove this field"
        variant="ghost"
        onClick={remove}
        color="redDark.red9"
        icon={<DeleteIcon />}
      />
    </HStack>
  );
}

function cellBase(cell: Cell) {
  const { value } = cell;
  if (value) return value;
  return "Empty";
}

const Index: NextPageWithLayout = () => {
  const router = useRouter();

  const getColumns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: cellBase,
    },
    {
      Header: "Description",
      accessor: "description",
      Cell: cellBase,
    },
    {
      Header: "Options",
      Cell: () => {
        return (
          <Options remove={() => null} view={() => router.push("/crud")} />
        );
      },
    },
  ];

  return (
    <Container maxWidth="1045px" height="100%" m="auto" py={10}>
      <Box width="100%" backgroundColor="sageDark.sage3">
        <Box
          as="header"
          paddingX={29}
          paddingY={5}
          borderBottom="2px solid"
          borderColor="sageDark.sage6"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text as="h2" variant="heading" color="white">
            Modules
          </Text>
          <Link passHref href="/crud">
            <Button leftIcon={<AddIcon />}>Novo</Button>
          </Link>
        </Box>

        <Flex flexDirection="column" marginBottom={10}>
          <DataTable
            columns={getColumns}
            data={database.data}
            page={1}
            perPage={20}
            isLoading={false}
            pagination={database.pagination}
            onChangePage={() => null}
          />
        </Flex>
      </Box>
    </Container>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout title="Dashboard">{page}</MainLayout>;
};

export default Index;
