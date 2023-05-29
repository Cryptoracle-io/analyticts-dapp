import React from 'react';

//constants
import { layoutModeTypes , leftSidebarTypes} from "../../Components/constants/layout";

const LightDark = ({ layoutMode, leftSidebarType, onChangeLayoutMode }) => {

    const mode = layoutMode === layoutModeTypes['DARKMODE'] ? layoutModeTypes['LIGHTMODE'] : layoutModeTypes['DARKMODE'] ;
    const sidebar = leftSidebarType === layoutModeTypes['DARK'] ? layoutModeTypes['LIGHT'] : layoutModeTypes['DARK'] ;
    return (
        <div className="ms-1 header-item d-sm-flex">
            <button
                onClick={() => onChangeLayoutMode(mode, sidebar)}
                type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle light-dark-mode">
                <i className='bx bx-moon fs-22'></i>
            </button>
        </div>
    );
};

export default LightDark;