import {Outlet} from "react-router-dom";

export const RootLayout = () => {
    return (
        <>
            <div className="flex-1 h-screen w-screen bg-[url('@/assets/img.png')] bg-center">
                <Outlet/>
            </div>
        </>
    );
};
