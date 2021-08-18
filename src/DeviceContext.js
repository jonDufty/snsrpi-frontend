import React, {createContext, useReducer} from "react";

const DeviceContext = React.createContext({
    device: null,
    logger: null,
    changeDevice: () => {},
    changeLogger: () => {} 
});

export default DeviceContext;


