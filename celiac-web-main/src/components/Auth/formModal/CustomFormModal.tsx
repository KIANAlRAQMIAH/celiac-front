"use client";
import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, ScrollArea } from "@mantine/core";
// import { PasswordInput, Stack } from "@mantine/core";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { modelActions } from "@/store/modelSlice";
import { authActions } from "@/store/auth-slice";
type CustomModalProps = {
  children: React.ReactNode;
  title?: string;
  initState?: boolean;
  shapeButton?: any;
  bg?: string;
};

export default function CustomModal(props: CustomModalProps) {
  const [opened, { open, close }] = useDisclosure(props.initState);
  //   const [visible, { toggle }] = useDisclosure(false);
  const dispatch = useDispatch();

  const { openModel } = useSelector((state: RootState) => state.Model);
  const closeModelAction = () => {
    dispatch(modelActions.closeAuthModel());
    dispatch(authActions.setValidationMessage(''))
  };
  return (
    <>
      <div className="">
        <Modal
          // lockScroll={true}
          scrollAreaComponent={ScrollArea.Autosize}
          opened={openModel}
          onClose={closeModelAction}
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
