import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Label} from "@/components/ui/label.tsx";
import {FieldValues, UseFormRegister, UseFormSetValue} from "react-hook-form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {useEffect, useState} from "react";
import SearchableDropdown from "@/components/shared/ComboBox/searchableDropdown.tsx";
import {DatePicker} from "@/components/shared/DatePicker/datePicker.tsx";

interface InputProps {
    id: string,
    inputType: string,
    title: string,
    required?: boolean,
    register: UseFormRegister<FieldValues>,
    error?: any,
    selectItemList?: string[],
    setValue?: UseFormSetValue<FieldValues>,
    onSubmit?: (value: any) => void,
    isResetForm?: boolean,
    textInputType?: string,
    value?: string | undefined
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
                        type={props.textInputType || "text"}
                        value={props.value}
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
                              value={props.value}
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
            ) : props.inputType === "comboBox" && Array.isArray(props.selectItemList) ? (
                <div className="flex flex-col gap-y-3">
                    <Label className="text-xl ">{props.title}</Label>
                    {props.setValue ? (
                        <SearchableDropdown
                            id={props.id}
                            title={props.title}
                            list={props.selectItemList}
                            setValue={props.setValue}
                            required={props.required}
                            resetForm={props.isResetForm}
                        />
                    ) : (
                        <span className="text-rose-500">setValue is required for comboBox</span>
                    )}
                    {props.error && <span className="text-rose-500">{props.error.message}</span>}
                </div>
            ) : props.inputType === 'date' ? (
                <div className="flex flex-col gap-y-3">
                    <Label className="text-xl mb-2">{props.title}</Label>
                    <DatePicker/>
                    {props.error && <span className="text-rose-500">{props.error.message}</span>}
                </div>
            ) : null}
        </>
    );
};
