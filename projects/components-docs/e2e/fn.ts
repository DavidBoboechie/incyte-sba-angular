/**
 * Function to ease the screenshots comparison
 * @param component the component name (string), or a list with the component name and inner selectors (string[])
 * @param title to setup if component is a list, or to force a custom title for the screenshot name
 */
export function compareScreenshots(component: string | string[], title?: string) {
    let element;
    if (typeof component === 'string') {
        element = cy.get(component);
    } else {
        component.forEach((c, index) => {
            element = index === 0 ? cy.get(c) : element.get(c);
        })
    }
    element.scrollIntoView().compareSnapshot(title || component);
}


/**
 * Trigger a search typing into the navbar
 */
export function search(value: string) {
    cy.wait(1000); // adding a wait since on some pages there is a forced input focus
    cy.get('doc-navbar').get('#search-bar-input').type('Paris');
    cy.get('doc-navbar').get('#search-bar-button').click();
}

/**
 * Go on a page, and wait a little for the loading
 */
export function visit(path: string, time: number = 1000) {
    cy.visit(path);
    cy.wait(time);
}