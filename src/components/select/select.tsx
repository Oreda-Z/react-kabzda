import React, {useState, KeyboardEvent, useEffect} from "react";
import style from './select.module.css'

type ItemType = {
    title: string
    value: any
}

type SelectPropsType = {
    value?: any
    onChange: (value: any) => void
    items: ItemType[]
}

export function Select(props: SelectPropsType) {

    const [active, setActive] = useState(false);
    const [hoveredElementValue, setHoveredElementValue] = useState(props.value)
    const selectItem = props.items.find(i => i.value === props.value);
    const hoveredItem = props.items.find(i => i.value === hoveredElementValue);

    useEffect(() => {
        setHoveredElementValue(props.value);
    }, [props.value])

    const toggleItems = () => setActive(!active);
    const onItemClick = (value: any) => {
        props.onChange(value);
        toggleItems();
    }
    const onKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            for (let i = 0; i < props.items.length; i++) {
                if (props.items[i].value === hoveredElementValue) {
                    const pretendentElement = e.key === "ArrowDown" ? props.items[i + 1] : props.items[i - 1];
                    if (pretendentElement) {
                        props.onChange(pretendentElement.value)
                        return;
                    }
                }
            }
            if(!selectItem) {
                props.onChange(props.items[0].value);
            }
        }
        if (e.key === "Enter" || e.key === "Escape") {
            setActive(false);
        }
    }
    return (
        <>
            <div className={style.select} onKeyUp={onKeyUp} tabIndex={0}>
                <span className={style.main} onClick={toggleItems}>{selectItem && selectItem.title}</span>
                {active &&
                <div className={style.items}>
                    {props.items.map(i => <div
                        onMouseEnter={() => {
                            setHoveredElementValue(i.value)
                        }}
                        className={style.item + " " + (hoveredItem === i ? style.selected : "")}
                        key={i.value}
                        onClick={() => {
                            onItemClick(i.value)
                        }}
                    >{i.title}</div>)}
                </div>}

            </div>
        </>
    );

}