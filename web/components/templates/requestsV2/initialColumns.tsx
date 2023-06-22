import { ColumnDef } from "@tanstack/react-table";
import { getUSDate } from "../../shared/utils/utils";
import { NormalizedRequest } from "./builder/abstractRequestBuilder";
import ModelPill from "./modelPill";
import StatusBadge from "./statusBadge";

export const INITIAL_COLUMNS: ColumnDef<NormalizedRequest>[] = [
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: (info) => (
      <span className="text-gray-900 font-medium">
        {getUSDate(info.getValue() as string)}
      </span>
    ),
    meta: {
      sortKey: "created_at",
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => <StatusBadge status={info.getValue() as number | null} />,
    size: 100,
  },
  {
    accessorKey: "requestText",
    header: "Request",
    cell: (info) => info.getValue(),
    meta: {
      sortKey: "request_prompt",
    },
  },
  {
    accessorKey: "responseText",
    header: "Response",
    cell: (info) => info.getValue(),
    meta: {
      sortKey: "response_text",
    },
  },
  {
    accessorKey: "model",
    header: "Model",
    cell: (info) => <ModelPill model={info.getValue() as string} />,
    meta: {
      sortKey: "body_model",
    },
  },
  {
    accessorKey: "totalTokens",
    header: "Tokens",
    cell: (info) => info.getValue(),
    meta: {
      sortKey: "total_tokens",
    },
  },
  {
    accessorKey: "latency",
    header: "Latency",
    cell: (info) => <span>{Number(info.getValue()) / 1000}s</span>,
    meta: {
      sortKey: "latency",
    },
  },

  {
    accessorKey: "user",
    header: "User",
    cell: (info) => info.getValue(),
    meta: {
      sortKey: "user_id",
    },
  },
];
