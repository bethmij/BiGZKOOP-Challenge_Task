import {Input} from "../../components/ui/input";

import {Label} from "../ui/label";
import {FieldValues, UseFormRegister, UseFormSetValue} from "react-hook-form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select";
import {useEffect, useState} from "react";
import {Textarea} from "../../components/ui/textarea.tsx";

interface InputProps {
    id: string;
    inputType: 'input' | 'textArea' | 'select' | 'comboBox';
    title: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    error?: any;
    selectItemList?: string[];
    setValue?: UseFormSetValue<FieldValues>;
    onSubmit?: (value: any) => void;
    isResetForm?: boolean
}

export const InputItem = (props: InputProps) => {
    const [selectedOption, setSelectedOption] = useState<string>("");

    const handleSelectChange = (value: string) => {
        setSelectedOption(value);
        if (props.setValue) {
            props.setValue(props.id, value);
        }
        if (props.onSubmit) {
            props.onSubmit(value);
        }
    };
    useEffect(() => {
        if (props.isResetForm) {
            setSelectedOption("");
        }
    }, [props.isResetForm]);

    return (
        <>
            {props.inputType === 'input' ? (
                <div className="flex flex-col gap-y-3">
                    <Label className="text-xl">{props.title}</Label>
                    <Input
                        className="mb-4 text-lg"
                        {...props.register(props.id)}
                        id={props.id}
                        name={props.id}
                        required={props.required || false}
                    />
                    {props.error && <span className="text-rose-500">{props.error.message}</span>}
                </div>
            ) : props.inputType === 'textArea' ? (
                <div className="flex flex-col gap-y-3">
                    <Label className="text-xl mb-2">{props.title}</Label>
                    <Textarea className="text-lg"
                        {...props.register(props.id)}
                        id={props.id}
                        name={props.id}
                        required={props.required || false}
                    />
                    {props.error && <span className="text-rose-500">{props.error.message}</span>}
                </div>
            ) : props.inputType === "select" ? (
                <div className="flex flex-col gap-y-3">
                    <Label className="text-xl mb-2">{props.title}</Label>
                    <Select
                        onValueChange={handleSelectChange}

                        value={selectedOption}
                        required={props.required}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="select"/>
                        </SelectTrigger>
                        <SelectContent>
                            {props.selectItemList?.map(item => (
                                <SelectItem key={item} value={item}>{item}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {props.error && <span className="text-rose-500">{props.error.message}</span>}
                </div>
            ) :  null}
        </>
    );
};
