import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import {
    ColumnDef
} from '@tanstack/react-table';

export interface Customer {
    id: string;
    name: string;
    userName: string;
    email: string;
    phone: string;
    website: string;
    address: {
        city: string;
    };
}
export const userColumns : ColumnDef<Customer>[] = [
    {
        id: "select",
        header({ table }) {
            return (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            );
        },
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Button
                    className="text-center text-xl text-metal"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    User ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("id")}</div>
        ),
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "username",
        header: "User Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("username")}</div>
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("email")}</div>
        ),
    },
    {
        accessorKey: "phone",
        header: "Contact Number",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("phone")}</div>
        ),
    },
    {
        accessorKey: "website",
        header: "Website",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("website")}</div>
        ),
    },
    {
        accessorFn: (row) => row.address.city,
        id: "city",
        header: "City",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("city")}</div>
        ),
    },

    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const data: Customer = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(data.id)}>
                            Copy User ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <Link to={`/form/customer/update-${data.id}`}>
                            <DropdownMenuItem>Update customer</DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem onClick={() => console.log("Delete customer functionality here")}>
                            Delete User
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
