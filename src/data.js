import { writable } from 'svelte/store';


function makeColumn(name, color, cards) {
    return {
        name: name,
        color: color,
        cards: cards
    };
}

function createColumnStore() {
    const { subscribe, set, update } = writable([
        makeColumn('Georgia', 'red', []),
        makeColumn('William', 'blue', []),
        makeColumn('Terry', 'green', []),
        makeColumn('Bernadette', 'yellow', []),
    ]);
    let uid = 0;
    return {
        subscribe,
        set,
        moveCardLeft: (card, currentColumn) => update(columns => {
            let columnIndex = columns.indexOf(currentColumn);
            if (columnIndex > 0) {
                currentColumn.cards = currentColumn.cards.filter(c => c !== card)
                columns[columnIndex - 1].cards.push(card);
            }
            return columns;
        }),

        moveCardRight: (card, currentColumn) => update(columns => {
            let columnIndex = columns.indexOf(currentColumn);
            if (columnIndex < columns.length - 1) {
                currentColumn.cards = currentColumn.cards.filter(c => c !== card)
                columns[columnIndex + 1].cards.push(card);
            }
            return columns;
        }),

        addCard: (column, content) => update(columns => {
            column.cards.push({ id: uid++, content });
            return columns;
        })
    };
}

export const columns = createColumnStore();