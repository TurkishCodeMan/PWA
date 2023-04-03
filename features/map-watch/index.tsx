"use client";
import React from "react";


  export const Map: React.FC = (props) => {
    const [Client, setClient] = React.useState<React.FC>();

   React.useEffect(() => {
        (async () => {
            if (typeof global.window !== "undefined") {
                const newClient = (await import('./map/index')).default
                setClient(() => newClient as any);
            }
        })();
    }, [])

    if (typeof global.window === "undefined" || !Client) {
        return null;
    }
    
    return Client ? <Client {...props} /> : null;
}