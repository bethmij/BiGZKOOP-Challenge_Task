
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {selectUserTableData, setUserTableData} from '../../../slices/userSlice.tsx';

export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    address: {
        city: string;
    };
}

const deleteUserData = async (userId: string): Promise<boolean> => {
    try {
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (response.status === 200) {
            alert('User deleted successfully');
            return true;
        }
    } catch (error) {
        console.error('Error deleting user:', error);
    }
    return false;
};

export const userColumns: ColumnDef<User>[] = [
    {
        id: 'select',
        header({ table }) {
            return (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && 'indeterminate')
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
        accessorKey: 'id',
        header: ({ column }) => (
            <Button
                className="text-center text-xl text-metal"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                User ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue('id')}</div>
        ),
    },
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue('name')}</div>
        ),
    },
    {
        accessorKey: 'username',
        header: 'User Name',
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue('username')}</div>
        ),
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue('email')}</div>
        ),
    },
    {
        accessorKey: 'phone',
        header: 'Contact Number',
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue('phone')}</div>
        ),
    },
    {
        accessorKey: 'website',
        header: 'Website',
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue('website')}</div>
        ),
    },
    {
        accessorFn: (row) => row.address.city,
        id: 'city',
        header: 'City',
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue('city')}</div>
        ),
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const data: User = row.original;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const userData = useSelector(selectUserTableData);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const dispatch = useDispatch();

            const handleDelete = () => {
                deleteUserData(data.id).then((success) => {
                    if (success) {
                        const newData = userData.filter((user:User) => user.username!== data.username);
                        console.log(data)
                        dispatch(setUserTableData(newData));
                    }
                });
            };

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
                        {/* Uncomment and adjust the link as needed */}
                        {/* <Link to={`/form/customer/update-${data.id}`}> */}
                        {/*     <DropdownMenuItem>Update customer</DropdownMenuItem> */}
                        {/* </Link> */}
                        <DropdownMenuItem onClick={handleDelete}>
                            Delete User
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];




