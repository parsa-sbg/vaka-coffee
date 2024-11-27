import * as React from "react";
import { Range, getTrackBackground } from 'react-range'

const STEP = 20_000

type RangeInputProps = {
    values: number[]
    setValues: React.Dispatch<React.SetStateAction<number[]>>
    setFinalValues: React.Dispatch<React.SetStateAction<number[]>>
    MIN: number
    MAX: number
}

const RangeInput = ({ values, setValues, MIN, MAX, setFinalValues }: RangeInputProps) => {

    return (
        <div className="p-4">

            <Range
                onFinalChange={(finalValues) => {
                    setFinalValues(finalValues)
                }}
                rtl
                values={values}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={(values) => {
                    setValues(values);
                }}

                renderTrack={({ props, children }) => (
                    <div className="!cursor-auto">
                        <div
                            ref={props.ref}
                            style={{
                                height: "7px",
                                width: "100%",
                                borderRadius: "4px",
                                background: getTrackBackground({
                                    values,
                                    rtl: true,
                                    colors: ["#ccc", "#D19960", "#ccc"],
                                    min: MIN,
                                    max: MAX,
                                }),
                            }}
                        >
                            {children}
                        </div>
                    </div>
                )}

                renderThumb={({ props }) => (
                    <div
                        className="rounded-full w-5 h-5 bg-main"
                        {...props}
                        key={props.key}
                    />)}

            />
        </div>
    );
};

export default RangeInput;