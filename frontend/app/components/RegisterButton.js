import Fab from "@mui/material/Fab";
import { useRouter } from "next/navigation";

export default function RegisterButton() {
  const router = useRouter();

  function handleClick() {
    router.push("/register");
  }

  return (
    <Fab
      sx={{ mr: 2 }}
      className="register-button"
      variant="extended"
      onClick={handleClick}
    >
      Register
    </Fab>
  );
}
