"use client";

import { FetchingGallery } from "@/lib/actions";
import { useCallback, useEffect, useState } from "react";
import { DataTableClientWrapper } from "./DataTableClientWrapper";

interface galleries {
  galleryType: string;
  title: string;
  image: string;
  price: number;
}

export default function UpdateDeleteTable() {
  const [data, setData] = useState<galleries[]>([]);

  const refetchData = useCallback(async () => {
    const res = await FetchingGallery();
    setData(res);
  }, []);

  useEffect(() => {
    (async () => {
      await refetchData();
    })();
  }, [refetchData]);
  return <div className="container mx-auto py-10">
    <DataTableClientWrapper data={data ?? []} refresh={refetchData}/>
  </div>;
}
