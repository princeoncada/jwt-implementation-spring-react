import {Checkbox, Slider} from "@mui/material";


function Filter({ element, value, changeValue, checked, changeChecked, min, max, step}) {
    return(
        <div className="filter">
            <div className={"element label"}>{element}: </div>
            <div className={"element"}>
                <Checkbox
                    defaultChecked
                    onChange={changeChecked}/>
            </div>
            <Slider
                classes={{root: 'slider element'}}
                value={value}
                onChange={changeValue}
                step={step}
                valueLabelDisplay="auto"
                disabled={checked}
                min={min}
                max={max}
            />
        </div>
    )
}

export default Filter;