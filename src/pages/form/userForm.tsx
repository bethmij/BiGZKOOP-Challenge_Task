import {CgFormatRight} from "react-icons/cg";
import {Button} from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {getCustomer} from "./userDetails.tsx";
import {InputItem} from "@/components/shared/InputItems/InputItem.tsx";

import {FieldValues, useForm} from "react-hook-form";
import axios from "axios";
import {useState} from "react";



export const UserForm = () => {

    const form = getCustomer();
    const {register, handleSubmit, formState: {errors}, reset, setValue} = useForm()
    const [resetForm, setResetForm] = useState(false);


    const createUser = async (data: FieldValues) => {
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/users', {data}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('User created:', response.data);
        } catch (error) {
            console.error('Error creating user:',error);
        }
    };

    const onSubmit = async (data: FieldValues) => {
        console.log(data);
        if(data) {
            createUser(data).then(()=>{
                alert("User created successfully!");
                reset();
                setResetForm(true);
            });
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
                                        <InputItem id={data.id} inputType={data.type} title={data.title} setValue={setValue} isResetForm={resetForm}
                                                   required={data.required} register={register} selectItemList={data?.selectList}
                                                   error={errors[`question${index}`]}  textInputType={data?.inputType}/>

                                </div>

                            ))}

                        </div>
                    ))}

                </ScrollArea>

                <Button type="submit"
                        className=" w-2/12 h-12 absolute text-2xl text-opacity-40 -bottom-5 right-28  mt-10">Submit</Button>
            </form>


        </div>
    );
};
