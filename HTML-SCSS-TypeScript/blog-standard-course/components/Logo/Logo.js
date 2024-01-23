import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain } from "@fortawesome/free-solid-svg-icons";

export const Logo = () => {
    return (
        <div className="text-2xl text-center py-4 font-heading tracking-wider">
            Scotty's BlogStandard
            <FontAwesomeIcon
                icon={faBrain}
                className="text-2xl text-slate-400 pl-2"
            />
        </div>
    );
};
