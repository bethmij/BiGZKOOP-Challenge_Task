import {CgFormatRight} from "react-icons/cg";
import {Button} from "@/components/ui/button";
import {ScrollArea } from "@/components/ui/scroll-area";
import {getCustomer} from "./userDetails.tsx";
import {InputItem} from "@/components/shared/InputItems/InputItem.tsx";

import {FieldValues, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectUserTableData, setCurrentUser} from "../../../slices/userSlice.tsx";
import {createUser, getUserData, updateUser} from "@/lib/services/user.ts";

export const UserForm = () => {

    const form = getCustomer();
    const {register, handleSubmit, formState: {errors}, reset, setValue} = useForm()
    const [resetForm, setResetForm] = useState(false);
    const {id} = useParams()
    const userDate = useSelector(selectUserTableData)
    const dispatch = useDispatch()

    const buttonName = id?.startsWith("save")? "Submit" : "Update";

    useEffect(() => {

        if (id?.startsWith("update")){
            const userID = id.split("update-")[1];
            getUserData(userID).then(user => {
                console.log(user)
                dispatch(setCurrentUser(user))
            })
        }
    }, [dispatch, id, userDate]);


    const onSubmit = async (data: FieldValues) => {
        console.log(data);
        if(data) {
            if(buttonName === "Submit") {
                createUser(data).then(() => {
                    alert("User created successfully!");
                });
            }else if(buttonName === "Update" && id ) {
                const userID = id.split("update-")[1];
                updateUser(data, userID).then(() => {
                    alert("User updated successfully!");
                });
            }
            reset();
            setResetForm(true);
        }
    }


    return (
        <div className="overflow-hidden">
            <div className="w-full flex gap-x-5 justify-center mt-5 opacity-80">
                <CgFormatRight size="45"/>
                <h1 className="text-4xl ">User Form</h1>
            </div>


            <form className="w-4/5 h-[80vh] ms-52 mt-10 flex-col rounded-full  "
                  onSubmit={handleSubmit(onSubmit)}>
                <ScrollArea className="h-full w-full rounded-3xl z-0 ">
                    <div className=" bg-[url('@/assets/blured.png')] bg-center bg-cover w-full h-full absolute border-2  rounded-3xl opacity-100 "></div>

                    {form.map((formData, index) => (
                        <div key={index} className="flex justify-around z-10 mt-10">
                            {formData.map(data => (
                                <div key={data.id} className=" z-50 w-2/5 py-10">
                                        <InputItem id={data.id} inputType={data.type} title={data.title}
                                                   setValue={setValue} isResetForm={resetForm}
                                                   required={data.required} register={register}
                                                   selectItemList={data?.selectList} value={data?.value}
                                                   error={errors[`question${index}`]}
                                                   textInputType={data?.inputType}/>

                                </div>
                            ))}
                        </div>
                    ))}
                </ScrollArea>

                <Button type="submit"
                        className=" w-2/12 h-12 absolute text-2xl text-opacity-40 -bottom-5 right-28  mt-10">{buttonName}</Button>
            </form>


        </div>
    );
};
