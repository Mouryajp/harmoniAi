import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const GetStart = () => {
  const router = useRouter();
  return (
    <div>
      <Button className=" cursor-pointer" onClick={() => router.push("/harmoni")}>
        Lets Get Started..!
      </Button>
    </div>
  );
};

export default GetStart;
