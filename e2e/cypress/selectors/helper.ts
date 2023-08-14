export const select = (selector: string) => () => cy.get(`[data-test="${selector}"]`);
