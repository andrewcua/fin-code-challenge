import { createContext, useContext, useState } from 'react';

// No need to export this, we'll create custom hook around it
const School = createContext();

// Custom hook, returns array with state, setter
export const useSchool = () => useContext(School);

// Convenience hook so you don't have to destructure
// everywhere, returns read-only state
export const useSchoolState = () => {
    const [school] = useContext(School);
    return school;
};

// Provider, goes in render tree above components where you
// import/use the accessor hooks above.
export const SchoolProvider = ({children, init}) => {
    const SchoolCtx = useState(init); // [myCtxState, setMyCtxState]
    return <School.Provider value={SchoolCtx}>{children}</School.Provider>;
};
