import * as React from "react"
import { useTransactionContext } from "@/contexts/TransactionContext.tsx";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button.tsx"
import { Checkbox } from "@/components/ui/checkbox.tsx"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx"
import { Input } from "@/components/ui/input.tsx"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx"

export default function DashboardTransactions() {
    const { transactions } = useTransactionContext();

    return (
        <main className="h-full w-7/12 rounded-lg px-10 shadow-lg">
            <h1 className="mb-10 font-jomhuria text-6xl">Historique des Transactions</h1>
            <h2>Transactions:</h2>
            <ul>
                {transactions.map(transaction => (
                    <li key={transaction.id}>
                        {transaction.amount + "$ " + transaction.date + " " + transaction.id + " de " + transaction.sender_id + " à " + transaction.receiver_id}
                    </li>
                ))}
            </ul>
            <div className="mt-52 flex items-center justify-center">
            </div>
        </main>
    );
}
