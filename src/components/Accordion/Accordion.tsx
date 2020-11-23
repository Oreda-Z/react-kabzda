import React from "react";

type AccordionPropsType = {
    titleValue: string
    collapsed: boolean
    setCollapsed: (collapsed: boolean) => void
}

function Accordion(props: AccordionPropsType) {
    console.log("Accordion rendering");



    return (
        <div>
            <AccordionTitle title={props.titleValue} onClick={() => props.setCollapsed(!props.collapsed)}/>
            {!props.collapsed && <AccordionBody/>}
        </div>
    )
}


type AccordionTitlePropsType = {
    title: string
    onClick: () => void
}



function AccordionTitle(props: AccordionTitlePropsType) {
    return (
        <div>
            <h3 onClick={props.onClick}>-- {props.title} --</h3>
        </div>
    );
}




function AccordionBody() {
    return (
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul>
    );
}

export default Accordion;