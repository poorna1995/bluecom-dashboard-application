import React from "react";

function DrawerHeaderDropdownIcon(props) {
	return (
		<svg
			width="16"
			height="8"
			viewBox="0 0 23 14"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M20.5368 0.5L11.5337 9.66058L2.39527 0.702072L0.5 2.65549L11.6015 13.5L22.5 2.38606L20.5368 0.5Z"
				fill={props.fill || "currentColor"}
			/>
		</svg>
	);
}

export default DrawerHeaderDropdownIcon;
