import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaginationBar(props) {
  const router = useRouter();
  const [currPage, changePage] = useState(1);
  const searchParams = useSearchParams();
  // Holds all searchParams info
  const title = searchParams.get("title") || "";
  const author = searchParams.get("author") || "";

  function handleChange(func, page) {
    changePage(page);
    router.replace(
      `/search?title=${encodeURIComponent(title)}&author=${encodeURIComponent(
        author
      )}&page=${encodeURIComponent(page)}`
    );
  }

  return (
    <Stack spacing={2} className="pagination-bar">
      <Pagination
        value={currPage}
        count={props.numPages}
        onChange={handleChange}
        shape="rounded"
        variant="outlined"
      />
    </Stack>
  );
}
