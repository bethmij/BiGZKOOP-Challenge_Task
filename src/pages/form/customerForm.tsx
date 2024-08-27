import {CgFormatRight} from "react-icons/cg";
import {Button} from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {getCustomer} from "../../pages/form/customerDetails.tsx";
import {InputItem} from "@/components/shared/InputItem.tsx";

import {FieldValues, useForm} from "react-hook-form";
import axios from "axios";


export const CustomerForm = () => {

    const form = getCustomer();
    const {register, handleSubmit, formState: {errors}, reset} = useForm()

    const createUser = async (data: FieldValues) => {
        try {
            const response = await axios.post('https://32babf3c1e8445439e4e0dcbb4a3c870.weavy.io', {data}, {
                headers: {
                    'Authorization': `Bearer wys_venqZ3RRX6yr8cKNhglLfxqp9x9hVY1Zfmnm`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('User created:', response.data);
            alert("User created successfully!");
            reset();
        } catch (error) {
            console.error('Error creating user:',error);
        }
    };

    const onSubmit = async (data: FieldValues) => {
        console.log(data);
        if(data) {
            createUser(data).then(()=>{});
        }
    }


    return (
        <>
            <div className="absolute top-0 left-1/2 flex gap-x-5 -ms-32 mt-4 opacity-80">
                <CgFormatRight size="45"/>
                <h1 className="text-4xl ">User Form</h1>
            </div>

            <form className="w-4/5 h-4/5 ms-52 mt-32 flex-col rounded-full absolute "
                  onSubmit={handleSubmit(onSubmit)}>
                <ScrollArea className="h-full w-full rounded-3xl z-0 ">
                    <div className=" bg-[url('@/assets/blured.png')] bg-center bg-cover w-full h-full absolute border-2 -z-50 rounded-3xl opacity-100 "></div>


                    {form.map((formData, index) => (
                        <div key={index} className="flex justify-around mb-4 z-10">
                            {formData.map(data => (
                                <div key={data.id} className=" z-50 w-2/5">
                                        <InputItem id={data.id} inputType="textArea" title={data.title}
                                                   required={true} register={register}
                                                   error={errors[`question${index}`]}/>

                                </div>

                            ))}

                        </div>
                    ))}

                </ScrollArea>

                <Button type="submit"
                        className=" w-2/12 h-12 absolute text-2xl text-opacity-40 -bottom-10 right-0 m-5 mt-10">Submit</Button>
            </form>
        </>
    );
};
