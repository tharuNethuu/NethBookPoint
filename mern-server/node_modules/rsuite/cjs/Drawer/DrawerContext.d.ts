import React from 'react';
export interface DrawerContextProps {
    /** Custom close button */
    closeButton?: React.ReactNode | boolean;
    /** Render Modal as Drawer */
    isDrawer: boolean;
}
declare const DrawerContext: React.Context<DrawerContextProps | null>;
export default DrawerContext;
