import React from "react";
import "components/Button.scss";
import classNames from "classnames";

export default function Button(props) {

   const buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   });

   return (
      <button
         className={buttonClass}
         onClick={props.onClick}
         disabled={props.disabled}
      >
         {/* stories > index.js line 18, line 21 */}
         {props.children}
      </button>
   );
}