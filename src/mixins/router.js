const router = {
    data() {
        return {
            url: 'http://localhost:3000/'
        }
    },

    methods: {
        async get(path = 'pokemons') {
            return await fetch(this.url + path, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    "Content-Type": "text/plain"
                }
            })
            .then((response) => response.json())
            .catch((e) => console.error(e))
        },

        async post(pokemons, path = 'pokemons') {
            return await fetch(this.url + path, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pokemons)
            })
            .then((response) => response.json())
            .catch((e) => console.error(e))
        }
    }
}

export default router