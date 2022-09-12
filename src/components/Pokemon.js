export class Pokemon {
    name
    count;
    id;
    freezed;

    constructor(id, name, count = 0, freezed = false) {
        this.setId(id)
        this.setName(name)
        this.setCount(count)
        this.setFreezed(freezed)
    }

    setName(name) {
        this.name = name
    }

    getName() {
        return this.name
    }

    setCount(counter) {
        counter = parseInt(counter)
        if (!counter || counter < 0) {
            counter = 0
        }

        this.count = counter
    }

    getCount() {
        return this.count
    }

    setId(id) {
        this.id = id
    }

    getId() {
        return this.id
    }

    setFreezed(freezed) {
        this.freezed = freezed
    }

    getFreezed() {
        return this.freezed
    }

    increaseCount() {
        this.count++
        return this
     }

    decreaseCount() {
        if (this.count > 0) {
            this.count--
        }
        return this
    }

    toggleFreezePokemon() {
        this.freezed = !this.freezed
    }

}