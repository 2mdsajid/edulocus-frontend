"use client"
import { TQuestion } from "@/lib/schema/tests.schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
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
import * as React from "react"
import { AiOutlineSortAscending } from "react-icons/ai"
import BackButton from "./BackButton"

interface SearchableResultTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    questions?: TQuestion[]
}

function SearchableResultTable<TData, TValue>({
    columns,
    data,
    questions
}: SearchableResultTableProps<TData, TValue>) {
    const [isanswershown, setIsAnswerShown] = React.useState(false)
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div>

            {/* IF SOMEDAY IT IS SHOWN IN PAST HISTORY WITH ANSWERS OF TESTS */}
            {questions && questions?.length > 0
                ? <div className="flex flex-col gap-2">
                    <BackButton />
                    <div className="max-w-4xl flex flex-col gap-4">
                        {questions && questions.map((question, index) => (
                            <div key={index} className='h-fit'>
                                {/* <RecentQuestionViewer index={index} question={question} /> */}
                            </div>
                        ))}
                    </div>
                </div>
                : <div className="p-2 rounded-md ">
                    <div className="flex justify-between items-center py-4 gap-4">
                        <Input
                            placeholder="Search names..."
                            value={(table.getColumn("username")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("username")?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm"
                        />
                        {questions && questions?.length > 0 && <Button onClick={() => setIsAnswerShown(true)}>view answer</Button>}                    </div>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            No Leaderboard.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex items-center justify-end space-x-2 py-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>}
        </div>
    )
}



export type TSearchableResultTableColumnsData = {
    rank: number
    username: string
    totalScore: number
}

const SearchableResultTableColumns: ColumnDef<TSearchableResultTableColumnsData>[] = [
    {
        accessorKey: "rank",
        header: ({ column }) => {
            return <div className="">Rank</div>
        },
    },
    {
        accessorKey: "username",
        header: ({ column }) => {
            return (
                <div className="flex gap-2 cursor-pointer" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    <p>Name</p>
                    <AiOutlineSortAscending className="text-lg" />
                </div>
            )
        },
        cell: ({ row }) => {
            const val = row.getValue("username") as string
            return <div className=" font-medium">{val}</div>
        },
    },
    {
        accessorKey: "totalScore",
        header: () => <div className="text-right">Score</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("totalScore"))
            return <div className="text-right font-medium">{amount}</div>
        },
    },
]


export { SearchableResultTable, SearchableResultTableColumns }