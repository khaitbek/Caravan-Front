import { Button, TextField } from "@mui/material";
import { Container, Stack } from "@mui/system";
import axios from "axios";
import { useForm } from "react-hook-form"
import { BASE_URL } from "../API/api";

export default function ForgotPassword() {
    const { register, handleSubmit } = useForm();
    const ForgotPasswordHandler = async (data: any) => {
        const newData = new FormData();
        newData.append("Email", data.Email);
        const emailData = await axios.post(`${BASE_URL}/accounts/sendcode`,newData);
        console.log(emailData);
        
    }
    return (
        <form onSubmit={handleSubmit(ForgotPasswordHandler)} action="#">
            <Container>
                <Stack spacing={2} sx={{paddingTop:"10rem"}}>
                    <TextField {...register("email")} placeholder="email" type={"email"} />
                    <Button variant="contained" type="submit">Send</Button>
                </Stack>
            </Container>
        </form>
    )
}
