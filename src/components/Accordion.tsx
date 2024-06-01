import { useState } from 'hono/jsx'

//////////////////////////////////////////////
///////////// TYPE DECLARATIONS  /////////////
//////////////////////////////////////////////
type AccordionData = {
	heading: string,
	body: string
}

//////////////////////////////////////////////
////// Props for Functional Components  //////
//////////////////////////////////////////////
type $Accordion = {
	accordionItems: AccordionData[]
}

// props for AccordionChild component
type $AccordionChild = {
	closed: boolean,
	item: AccordionData,
	idx: number,
	onItemClicked: (idx: number) => void
}

//////////////////////////////////////////////
/////////// Functional Components  ///////////
//////////////////////////////////////////////
export default function Accordion({accordionItems}: $Accordion) {
	const [openIdx, setOpenIdx] = useState(0);

	function handleItemClicked(idx: number) {
		setOpenIdx(idx);
	}

	return (
		<div class="border border-1 my-2">
			{accordionItems.map((item, idx) => <AccordionChild closed={idx !== openIdx} item={item} idx={idx} onItemClicked={handleItemClicked}/>)}
		</div>
	)
}

function AccordionChild({closed, item, idx, onItemClicked}: $AccordionChild) {
	const hiddenClass = closed ? "grow-hidden" : "";

	return (
		<div>
			<div class="d-flex align-items-center ps-1 bg-light div-hover" onClick={() => onItemClicked(idx)}>
				<h4 class="my-0 ms-2 me-auto h-auto">{item.heading}</h4>
				<div>
					<div class="div-icon" >{closed ? "+" : "-"}</div>
				</div>
			</div>
			<div className={`grow ${hiddenClass}`}>
				<div>
					<div className="py-2 px-3">
						{item.body}
					</div>
				</div>
			</div>
		</div>
	)
}

