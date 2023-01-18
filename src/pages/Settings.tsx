import { Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
export default function Settings() {
    const { register, handleSubmit } = useForm();
    const {t} = useTranslation();
    const handleFormSubmit = (data: any) => {
        console.log(data);
    }
    return (
        <form action="#" onSubmit={handleSubmit(handleFormSubmit)}>

            <Stack spacing={3} marginBottom={2}>
                <TextField {...register("OldPassword")} placeholder={t("old_password")!} type="password" />
                <TextField {...register("NewPassword")} placeholder={t("new_password")!} type="number" />
                <TextField {...register("VerifyPassword")} placeholder={t("verify_password")!} type="number" />
            </Stack>
            <Button type="submit" variant="contained">{t("submit")}</Button>
        </form>
    )
}
