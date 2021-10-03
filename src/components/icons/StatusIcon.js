import React from 'react';

import './StatusIcon.css'

export const SensorStatusIcon = ({name, active, connected}) => {
    return (
        <div class={connected ? "status-icon" : "status-icon status-icon-offline"}>
            <strong>{ name }</strong>
            <div class={active ? "dot dot-active": "dot"}></div>
        </div>
    )
}
