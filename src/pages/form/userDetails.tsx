const genderList = ["MALE", "FEMALE", "OTHER"]

export interface User {
    id: string,
    title: string,
    type: string,
    placeholder?: string,
    description?: string,
    required?: boolean,
    isEdit?: boolean,
    inputType? : string,
    selectList?: string[],
}

export function getCustomer() : User[][] {
    return [
        [{
            id: "id",
            title: "User-Id",
            type: "input",
            placeholder: "",
            description: "Auto generated",
            required: true,
            isEdit:true
        },
            {
                id: "name",
                title: "User Name",
                type: "input",
                placeholder: "Name",
                description: "Full name required",
                required: true,
        }],

       [
            {
                id: "phone",
                title: "Contact number",
                type: "input",
                placeholder: "Contact",
                description: "Mobile number",
                required: false,
                inputType: "number",
            },
            {
                id: "email",
                title: "User Email",
                type: "input",
                placeholder: "Email",
                required: true,
                description: "Email required",
                inputType: "email",
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


