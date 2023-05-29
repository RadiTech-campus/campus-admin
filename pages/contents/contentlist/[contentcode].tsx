import React from "react";
import { useRouter } from "next/router";

export default function ContentDetail() {
  const router = useRouter();
  const { contentcode } = router.query;
  console.log("contentcode", contentcode);
  return <div>contentCode</div>;
}
