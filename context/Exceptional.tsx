import React, { useContext, createContext, useState, PropsWithChildren } from "react";

const Exceptional = createContext({
    openEffectCard: false,
    cardViewCounter: 0,
    handleChangeClick: () => { },
    handleChangeViewCounter: () => { },
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

    function handleChangeViewCounter(): void {
        setCardViewCounter(cardViewCounter + 1);
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
                handleChangeViewCounter,
                setOutCardViewCounter
            }}
        >
            {children}
        </Exceptional.Provider>
    )
}