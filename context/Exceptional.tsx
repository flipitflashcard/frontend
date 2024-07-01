import React, { useContext, createContext, useState, PropsWithChildren } from "react";

const Exceptional = createContext({
    openEffectCard: false,
    cardViewCounter: 0,
    handleChangeClick: () => { },
    handleChangeNextViewCounter: () => { },
    handleChangePrevViewCounter: () => { },
    setOutCardViewCounter: (counter: number) => { }
})

export function clickChecking() {
    return useContext(Exceptional);
}

export function CheckProvider({ children }: PropsWithChildren<{}>) {
    const [openEffectCard, setOpenEffectCard] = useState<boolean>(false);
    const [cardViewCounter, setCardViewCounter] = useState<number>(1);

    function handleChangeClick(): void {
        setOpenEffectCard(!openEffectCard);
    }

    function handleChangeNextViewCounter(): void {
        setCardViewCounter(cardViewCounter + 1);
    }

    function handleChangePrevViewCounter(): void {
        setCardViewCounter(cardViewCounter - 1);
    }

    function setOutCardViewCounter(counter: number) {
        setCardViewCounter(counter);
    }

    return (
        <Exceptional.Provider
            value={{
                openEffectCard,
                cardViewCounter,
                handleChangeClick,
                handleChangeNextViewCounter,
                handleChangePrevViewCounter,
                setOutCardViewCounter
            }}
        >
            {children}
        </Exceptional.Provider>
    )
}