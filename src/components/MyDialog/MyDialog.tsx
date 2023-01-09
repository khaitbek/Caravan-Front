import { ReactNode, useContext, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useToggle } from "../../hooks/useToggle";
import { DialogContext } from "../../context/DialogContext";
import { useForm } from "react-hook-form";
import { Stack } from "@mui/system";


type DialogContextProps = {
  data: object,
  open: boolean,
  setOpen: () => void
}

type dialogComponentProps = {
  data: object,
  register: object
}

export default function MyDialog({ data = {}, open, setOpen }: DialogContextProps) {
  const { dialogMode } = useContext(DialogContext);
  const { register, formState: { errors, isValid }, handleSubmit } = useForm();
  const handleClickOpen = () => {
    setOpen();
  };
  function handleFormSubmit(data: object) {
    console.log(data);
  }
  function handlePost(){

  }

  function handleEdit(){
    
  }

  return (
    <div>
      
      <Dialog open={open} onClose={handleClickOpen}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <form action="#" onSubmit={handleSubmit(handleFormSubmit)}>
            <Stack spacing={3}>
              <TextField {...register("truck__name")} placeholder="Enter your truck's name" type="text" />
            </Stack>
            <Stack spacing={3}>
              <TextField {...register("truck__name")} placeholder="Enter your truck's name" type="text" />
            </Stack>

            <DialogActions>
              {!dialogMode ? <Button type="submit" variant="contained">
                Post
              </Button> : <Button type="submit" variant="contained" color="warning">
                Edit
              </Button>}
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}