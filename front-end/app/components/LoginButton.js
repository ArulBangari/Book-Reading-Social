import Fab from "@mui/material/Fab";
import { useRouter } from "next/navigation";

export default function LoginButton() {
  const router = useRouter();

  function handleClick() {
    router.push("/login");
  }

  return (
    <Fab className="login-button" variant="extended" onClick={handleClick}>
      Login
    </Fab>
  );
}
