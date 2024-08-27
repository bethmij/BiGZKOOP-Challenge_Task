import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../../slices/userSlice.tsx";

const genderList = ["MALE", "FEMALE", "OTHER"]

export interface UserDetails {
    id: string,
    title: string,
    type: string,
    placeholder?: string,
    description?: string,
    required?: boolean,
    isEdit?: boolean,
    inputType? : string,
    selectList?: string[],
    value?: string,
}

export function getCustomer() : UserDetails[][] {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const currentUser = useSelector(selectCurrentUser)

    return [
        [{
            id: "id",
            title: "User-Id",
            type: "input",
            placeholder: "",
            description: "Auto generated",
            required: true,
            isEdit:true,
            value: currentUser?.id,

        },
            {
                id: "name",
                title: "User Name",
                type: "input",
                placeholder: "Name",
                description: "Full name required",
                required: true,
                value: currentUser?.name,
        }],

       [
            {
                id: "phone",
                title: "Contact number",
                type: "input",
                placeholder: "Contact",
                description: "Mobile number",
                required: false,
                value: currentUser?.phone,
            },
            {
                id: "email",
                title: "User Email",
                type: "input",
                placeholder: "Email",
                required: true,
                description: "Email required",
                inputType: "email",
                value: currentUser?.email,
       }],
        [{
            id: "gender",
            title: "Gender",
            type: "select",
            placeholder: "Gender",
            description: "",
            selectList: genderList,
            required: false,
        },
            {
                id: "dob",
                title: "Date-of-Birth",
                type:"date",
                placeholder: "Date",
                description: "Date of birth",
                required: false,
            },
        ],

    ]


}


