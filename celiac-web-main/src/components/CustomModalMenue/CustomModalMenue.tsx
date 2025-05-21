"use client";
import { useDisclosure } from "@mantine/hooks";
import { Modal,ScrollArea } from "@mantine/core";
import {useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { modelActions } from "@/store/modelSlice";
type CustomModalProps = {
  children: React.ReactNode;
  title?: string;
  initState?: boolean;
  shapeButton?: any;
  bg?: string;
};

export default function CustomModal(props: CustomModalProps) {
  const [opened, { open, close }] = useDisclosure(props.initState);
  
  const dispatch = useDispatch();

  const { openModelMenu } = useSelector((state: RootState) => state.Model);
  const closeModelMenuAction = () => {
    dispatch(modelActions.closeModelMenu());
   };

  return (
    <>
      <div>
        <Modal
         
          scrollAreaComponent={ScrollArea.Autosize}
          opened={openModelMenu}
          onClose={closeModelMenuAction}
          withCloseButton={true}
          radius="25px"
          centered
          title={props.title}
          size={524}
          padding={32}
          styles={{
            content: {
              backgroundColor: opened ? props.bg : "",
            },
            header: {
              backgroundColor: opened ? props.bg : "",
            },
          }}
        >
          {props.children}
        </Modal>
      </div>
    </>
  );
}
