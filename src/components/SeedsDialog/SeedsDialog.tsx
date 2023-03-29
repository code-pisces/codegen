import {
  Box,
  Button,
  ButtonProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
} from "@chakra-ui/react";
import SeedsForm from "../forms/SeedsForm/SeedsForm";

type Props = Pick<ModalProps, "isOpen" | "onClose"> &
  Pick<ButtonProps, "isLoading"> & {
    onConfirm: () => void;
    options?: { label: string; value: string }[];
  };

const SeedsDialog = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  options = [],
}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Seeds</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text
            variant="heading"
            paddingTop={4}
            paddingBottom={2}
            color="sageDark.sage12"
          >
            Add new
          </Text>
          <SeedsForm onSubmit={onConfirm} options={options} />

          <Box></Box>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button isLoading={isLoading} onClick={onConfirm}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SeedsDialog;
