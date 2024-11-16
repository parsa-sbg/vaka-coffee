import React, { useState, useCallback } from 'react';
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from 'react-icons/md';


type Field = { id: string; key: string; value: string };


function DynamicFieldsSelector() {

    const [fields, setFields] = useState<Field[]>([{ id: crypto.randomUUID(), key: '', value: '' }]);

    const addNewField = useCallback(() => {
        fields.length < 5 && setFields(prev => [...prev, { id: crypto.randomUUID(), key: '', value: '' }]);
    }, [fields]);

    const handleFieldChange = useCallback(
        (id: string, field: keyof Field, value: string) => {
            setFields(prev =>
                prev.map(item => (item.id === id ? { ...item, [field]: value } : item))
            );
        },
        []
    );

    const removeField = (id: string) => {
        setFields(prev => prev.filter(field => field.id !== id))
    }

    return (
        <div>
            <h5 className="mb-1 font-semibold">فیلد های داینامیک</h5>

            {fields.map(field => (
                <div key={field.id} className="flex items-center gap-2">
                    <input
                        onChange={e => handleFieldChange(field.id, 'key', e.target.value)}
                        value={field.key}
                        className="w-32 max-w-full bg-bgColer outline-none rounded-md text-sm py-1.5 px-2 mb-2"
                        type="text"
                        placeholder="کلید"
                    />
                    <input
                        onChange={e => handleFieldChange(field.id, 'value', e.target.value)}
                        value={field.value}
                        className="w-32 max-w-full bg-bgColer outline-none rounded-md text-sm py-1.5 px-2 mb-2"
                        type="text"
                        placeholder="مقدار"
                    />
                    <button onClick={() => { removeField(field.id) }} className={`flec items-center justify-center mb-2 transition-all duration-300 hover:text-red-600 rounded-full p-1.5`}>
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
