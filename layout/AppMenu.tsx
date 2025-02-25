/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model: AppMenuItem[] = [
        {
            label: 'Home',
            items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
        },
        {
            label: 'CVE Information',
            items: [
                { label: 'CVE List', icon: 'pi pi-fw pi-id-card', to: '/cve-list' },
            ]
        },
        {
            label: 'Tools',
            items: [
                { label: 'HTML Generator', icon: 'pi pi-fw pi-eye', to: '/blocks', badge: 'NEW' },
                { label: 'Ahref Checker', icon: 'pi pi-fw pi-globe', url: 'https://blocks.primereact.org', target: '_blank' }
            ]
        },
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
