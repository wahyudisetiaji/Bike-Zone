Vue.component('contentcard', {
    template: 
        `   
                <div>
                        <div>
                
                            <div class=" card h-100 " v-for="(item, index) in items" >
                                <a href="#"><img class="card-img-top" :src="item.image" alt=""></a>
                                <div class="card-body">
                                    <h4 class="card-title">
                                    <a href="#" @click="oneItem(item, index)" style="color:black" data-toggle="modal" data-target="#exampleModal">{{item.itemName}}</a>
                                    </h4>
                                    <h5>{{formatPrice(item.price)}}</h5>
                                </div>
                                <div class="card-footer">
                                    <button v-if="token" type="button" @click="buyItem(item)" class="btn btn-dark">Buy</button>
                                    <button type="button" class="btn btn-dark" @click="oneItem(item)" data-toggle="modal" data-target="#exampleModal">Detail</button>
                                </div>
                            </div>

                        </div>
                </div>
        `,
        props: ["items", "token"],
        data() { 
            return {
                totalCart: '',
                totalPrice: 0,
                cart: [],
                transaction: [],
            }
        },
        methods : {
            oneItem(bike) {
                this.$emit('detail-item', bike)
            },
            formatPrice(price) {
                return `Rp. ${price.toLocaleString()}`
            },
            buyItem(item) {
                this.cart.push(item);
                this.totalPrice += item.price;
                this.totalCart = this.cart.length;
                let datacart = {
                    cart: this.cart,
                    totalCart: this.totalCart,
                    totalPrice: this.totalPrice
                }

                this.$emit('data-cart', datacart)
            },
            itemCategory(category) {
      
                axios({
                    method: 'GET',
                    url: `http://localhost:3000/items/${category}`,
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then((result) => {
                    this.items = result.data.item   
     
                })
                .catch((err) => {
                    console.log(err);
                });
            }
        }
})