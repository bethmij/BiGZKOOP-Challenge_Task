import {LuView} from "react-icons/lu";

import Tables from "@/components/shared/Table/table.tsx";
import {Customer, userColumns} from "@/pages/preview/userTableDetails.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {AiOutlineLoading3Quarters} from "react-icons/ai";

const getUserData = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
    }
};

export default function UserPreview() {
    const [tableData, setTableData] = useState<Customer[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getUserData()
            .then(data => {
                setTableData(data)
            })
            .finally(() => setIsLoading(false))
    }, [])

    return (
        <div>

            <div className="flex gap-x-5 w-full justify-center mt-4 opacity-80">
                <LuView size="45"/>
                <h1 className="text-4xl ">User Preview</h1>
            </div>
            <div className="flex justify-center items-center">
                {isLoading ? (
                    <div className="flex justify-center items-center  w-full mt-24">
                        <AiOutlineLoading3Quarters size={40} className="animate-spin"/>
                    </div>
                ) : (
                    <div className="w-[80vw] h-[90vh]">
                        <Tables columns={userColumns} data={tableData}/>
                    </div>

                )
                }

            </div>
        </div>
    )
}
