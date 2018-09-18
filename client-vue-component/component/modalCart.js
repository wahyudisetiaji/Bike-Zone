Vue.component('contentcart', {
    template: 
        `
            <div>
            <!-- Modal Cart-->
            <div class="modal fade" id="modalCart" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">My Cart</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                        <table class="table">
                            <thead>
                              <tr>
                                <th scope="col">No</th>
                                <th scope="col">Item Name</th>
                                <th scope="col">Price</th>
                              </tr>
                            </thead>
                            <tbody >
                              <tr v-for="(item, index) in datacart.cart">
                                <td>{{index+1}}</td>
                                <td>{{item.itemName}}</td>
                                <td>{{formatPrice(item.price)}}</td>
                              </tr>
                            </tbody>
                          </table>
                          <h3 style="text-align:center">Total {{datacart.totalPrice}}</h3>
                    </div>
                    <div class="modal-footer">
                      <button type="button" v-if="datacart.totalCart" @click="createCart" class="btn btn-dark" data-dismiss="modal">Checkout</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `,
        props: ["datacart"],
        methods : {
            formatPrice(price) {
                return `Rp. ${price.toLocaleString()}`
            },
            createCart() {
                axios({
                    method: 'POST',
                    url:  `https://server-bikezone.wahyudisetiaji.xyz/carts`,
                    headers: {
                        token: localStorage.getItem('token')
                    },
                    data: {
                        listItem: this.datacart.cart,
                        total: this.datacart.totalPrice

                    }
                })
                .then((result) => {
                    this.datacart.totalCart = ''
                })
                .catch((err) => {
                    console.log(err.response);
                });
            },
            formatDate(date) {
                var monthNames = [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December"
                ];
          
                let day = date.slice(8, 10);
                let month = date.slice(6, 7);
                let year = date.slice(0, 4);
          
                if (month > 9) {
                  month = `1${month}`;
                }
          
                return day + " " + monthNames[month - 1] + " " + year;
            }
    
        }
})