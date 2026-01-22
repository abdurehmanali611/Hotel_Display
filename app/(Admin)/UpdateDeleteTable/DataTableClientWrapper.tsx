/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export function DataTableClientWrapper({data, refresh}: any) {
    const memoizedColumns = useMemo(() => columns(refresh), [refresh])
    return <DataTable columns={memoizedColumns} data={data} defaultPageSize={3}/>
}