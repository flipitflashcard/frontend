import React, { useContext, createContext, useState, PropsWithChildren } from "react";

const Exceptional = createContext({
    openEffectCard: false,
    handleChangeClick: () => { }
})

export function clickChecking() {
    return useContext(Exceptional);
}

export function CheckProvider({ children }: PropsWithChildren<{}>) {
    const [openEffectCard, setOpenEffectCard] = useState<boolean>(false);

    function handleChangeClick(): void {
        setOpenEffectCard(!openEffectCard);
    }

    return (
        <Exceptional.Provider
            value={{
                openEffectCard,
                handleChangeClick
            }}
        >
            {children}
        </Exceptional.Provider>
    )
}