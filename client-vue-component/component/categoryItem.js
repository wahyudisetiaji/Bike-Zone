Vue.component('contentcategory', {
    template:
        `
            <div>
                <h3 class="my-4"></h3>
                <div class="list-group" style="text-align:center;">
                    <a href="#" @click="itemCategory('')" class="list-group-item">All Category</a>
                    <a href="#" @click="itemCategory('Gravity')" class="list-group-item">Gravity</a>
                    <a href="#" @click="itemCategory('Enduro')" class="list-group-item">Enduro</a>
                    <a href="#" @click="itemCategory('Hardtail')" class="list-group-item">Hardtail</a>
                </div>
            </div>
        `,
        methods : {

            itemCategory(category) {
      
                axios({
                    method: 'GET',
                    url: `https://server-bikezone.wahyudisetiaji.xyz/items/${category}`,
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then((result) => {
                    this.items = result.data.item
                    this.$emit('list-category', this.items)

                })
                .catch((err) => {
                    console.log(err);
                });
            }
    
        },
        mounted() {
    
                axios({
                    method: 'GET',
                    url: `https://server-bikezone.wahyudisetiaji.xyz/items`,
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then((result) => {
                    this.items = result.data.item
                    this.$emit('list-category', this.items)
     
                })
                .catch((err) => {
                    console.log(err);
                });
    
        }
}) 