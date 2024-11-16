import React, { useState } from 'react'
import { BiSolidImageAdd } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md';

function PicturesSelector() {

    const [preview, setPreview] = useState<string[]>([]);


    const changehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                setPreview(prev => [...prev, reader.result as string]);
                e.target.value = ''
            };

            reader.readAsDataURL(file);
        }
    }

    return (
        <div className="">
            <h5 className='mb-1 font-semibold'>عکس های محصول</h5>

            <div className="grid grid-cols-3 w-full flex-wrap gap-3">

                <div className="group col-span-1 border-2 mx-auto w-24 h-24 !border-opacity-50 hover:!border-opacity-100 transition-colors border-dashed relative dark:border-gray-500 cursor-pointer rounded-lg ">
                    <input
                        onChange={e => { changehandler(e) }}
                        className="w-full h-full absolute bg-red-300 cursor-pointer z-20 opacity-0 hover:file:cursor-pointer"
                        type="file"
                        accept="image/png,image/jpeg"
                    />
                    <BiSolidImageAdd className="absolute top-0 bottom-0 right-0 left-0 m-auto opacity-50 transition-all group-hover:opacity-100" size={35} />
                </div>


                {preview.map((image, index) => (
                    <div key={image + index} className="col-span-1 mx-auto w-24 h-24 border-2 !border-opacity-50 hover:!border-opacity-100 transition-colors overflow-hidden relative dark:border-gray-500 cursor-pointer rounded-lg ">
                        <MdDelete
                            onClick={() => { setPreview(prev => prev.filter((_, i) => i !== index)) }}
                            className="absolute top-1 left-1 bg-[#333] bg-opacity-80 p-0.5 rounded-sm hover:bg-red-700 transition-colors" size={25} />
                        {preview[index] ? <img className="h-full w-full object-cover" src={image} alt="" /> : 'Loading...'}
                    </div>
                ))}

            </div>
        </div>
    )
}

export default PicturesSelector