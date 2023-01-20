export class LayoutGrid extends HTMLElement {
	#$ = new LayoutGridInternals(this)

	direction: LayoutDirection = 'horizontal'
	items: LayoutItem[] = []

	insertLayoutItemAfter(item: LayoutItem, sibling?: LayoutItem) {
		const indexOfSibling = this.items.indexOf(sibling)

		item.grid = this

		if (indexOfSibling === -1) {
			this.items.push(item)
			this.append(item)
		} else {
			this.items.splice(indexOfSibling + 1, 0, item)
			this.insertBefore(item, sibling)
		}
	}

	insertLayoutItemBefore(item: LayoutItem, sibling?: LayoutItem) {
		const indexOfSibling = this.items.indexOf(sibling)

		item.grid = this

		if (indexOfSibling === -1) {
			this.items.push(item)
			this.append(item)
		} else {
			this.items.splice(indexOfSibling, 0, item)
			this.insertBefore(item, sibling)
		}
	}

	get ints() {
		return this.#$
	}
}

export class LayoutItem extends HTMLElement {
	grid: LayoutGrid | null = null

	split(direction: LayoutDirection) {
		if (direction === this.grid.direction) {
			// add another child
			this.grid.insertLayoutItemAfter(new LayoutItem(), this.grid.items.at(-1))
		} else {
			// split area into layout of opposing direction
			let subgrid = new LayoutGrid()

			subgrid.direction = 'vertical'

			this.append(subgrid)

			let subitem = new LayoutItem()

			subgrid.append(subitem)

			this.grid.ints.ints.states.add('--dir' + this.grid.ldir.at(0).toUpperCase())
		}
	}
}

export class LayoutGridInternals {
	host: LayoutGrid
	root: ShadowRoot
	ints: ElementInternals
	ldir: LayoutDirection

	constructor(host: LayoutGrid) {
		this.host = host
		this.root = host.attachShadow({ mode: 'open' })
		this.ints = host.attachInternals()
		this.ldir = 'horizontal'

		this.root.append(document.createElement('slot'))

		this.ints.states.add('--grid')
		this.ints.states.add('--dir' + this.ldir.at(0).toUpperCase())
	}
}

customElements.define('a-layout-grid', LayoutGrid)
customElements.define('a-layout-item', LayoutItem)

export const grid = new LayoutGrid()
export const item = new LayoutItem()

grid.insertLayoutItemBefore(item)

document.body.append(grid)

addEventListener('click', event => {
	const doer = (<Element>event.target).closest<HTMLButtonElement>('[data-do]')

	if (doer === null) return

	const emit = doer.dataset.do

	switch (emit) {
		case 'insert:before:item':
			item.split('horizontal')
			break
		case 'insert:after:item':
			item.split('horizontal')
			break
		case 'insert:split:item': {
			// it should split the inner grid, not the item itself
			let potentialGrid = <LayoutGrid>item.childNodes[0]
			let potentialItem = potentialGrid ? potentialGrid.items[0] : null

			if (!potentialGrid) {
				item.append(potentialGrid = new LayoutGrid())

				potentialGrid.direction = 'vertical'
				potentialGrid.ints.ints.states.delete('--dirH')
				potentialGrid.ints.ints.states.add('--dirV')

				potentialItem = new LayoutItem()

				potentialGrid.insertLayoutItemBefore(potentialItem)
			}
			const newItem = new LayoutItem()
			potentialGrid.insertLayoutItemAfter(newItem, potentialItem)
			break
		}
	}
})

type LayoutDirection = 'horizontal' | 'vertical'

interface ElementInternals {
	states: CustomStateSet
}

interface CustomStateSet {
	add(): void
}
