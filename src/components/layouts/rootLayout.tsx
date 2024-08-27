import bgImg from "@/assets/img.png";
import {Outlet} from "react-router-dom";

export const RootLayout = () => {
    return (
        <>
            <div className="relative h-screen m-0">
                <img
                    className="fixed top-0 left-0 w-full h-screen"
                    src={bgImg}
                    alt="Background"
                />
                <div className="relative z-10">
                    <Outlet/>
                </div>
            </div>
        </>
    );
};
