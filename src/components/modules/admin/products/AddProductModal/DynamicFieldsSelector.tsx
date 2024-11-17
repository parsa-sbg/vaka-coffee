import React, { useState, useCallback } from 'react';
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from 'react-icons/md';
import { errorsType } from './AddProductModal';


type Field = { id: string; key: string; value: string };

type props = {
    fields: Field[]
    setFields: React.Dispatch<React.SetStateAction<Field[]>>
    errors: {
        section: "key" | "value";
        index: number;
    }[]
    setErrors: React.Dispatch<React.SetStateAction<errorsType>>
}

function DynamicFieldsSelector({ fields, setFields, errors, setErrors }: props) {

    const addNewField = useCallback(() => {
        fields.length < 5 && setFields(prev => [...prev, { id: crypto.randomUUID(), key: '', value: '' }]);
    }, [fields]);

    const handleFieldChange = useCallback(
        (id: string, field: keyof Field, value: string, index: number) => {
            setErrors(prev => ({
                ...prev, dynamicFields:
                    errors.filter(item => item.section !== field || item.index !== index)
            }))
            setFields(prev =>
                prev.map(item => (item.id === id ? { ...item, [field]: value } : item))
            );
        }, [errors]);

    const removeField = (id: string, index: number) => {
        setFields(prev => prev.filter(field => field.id !== id))
        setErrors(prev => ({
            ...prev, dynamicFields: []
        }))
    }

    return (
        <div>
            <h5 className={`mb-1 font-semibold ${errors.length ? 'text-red-600' : ''}`}>فیلد های داینامیک</h5>

            {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                    <input
                        onChange={e => handleFieldChange(field.id, 'key', e.target.value, index)}
                        value={field.key}
                        className={`${errors.some(item => item.index == index && item.section == 'key') ? '!border-red-600' : ''} border border-transparent transition-all duration-300 focus:border-main w-32 max-w-full bg-bgColer outline-none rounded-md text-sm py-1.5 px-2 mb-2`}
                        type="text"
                        placeholder="کلید"
                    />
                    <input
                        onChange={e => handleFieldChange(field.id, 'value', e.target.value, index)}
                        value={field.value}
                        className={`${errors.some(item => item.index == index && item.section == 'value') ? '!border-red-600' : ''}  border border-transparent transition-all duration-300 focus:border-main w-32 max-w-full bg-bgColer outline-none rounded-md text-sm py-1.5 px-2 mb-2`}
                        type="text"
                        placeholder="مقدار"
                    />
                    <button onClick={() => { removeField(field.id, index) }} className={`flec items-center justify-center mb-2 transition-all duration-300 hover:text-red-600 rounded-full p-1.5`}>
                        <MdDelete size={20} />
                    </button>
                </div>
            ))}

            <button
                onClick={addNewField}
                className={`${fields.length >= 5 ? 'hidden' : ''} p-1.5 hover:text-main  rounded-full text-sm flex items-center gap-1 hover:bg-opacity-80 transition`}>
                <IoIosAddCircle size={25} />
            </button>
        </div>
    );
}

export default DynamicFieldsSelector;
