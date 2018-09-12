Vue.component('contenttransaction', {
    template: 
        `   <div>
                <!-- Modal Transcation-->
                <div class="modal fade bd-example-modal-lg" id="modalTransaction" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">My Transaction</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div class="modal-body" v-for="(data, index) in transaction">
                        <h5>Date: {{formatDate(data.createdAt)}}</h5>
                        <h5>Id : {{data._id}}</h5>
                            <table class="table">
                                <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Item Name</th> 
                                    <th scope="col">Price</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in data.listItem">
                                        <td>{{index+1}}</td>
                                        <td>{{item.itemName}}</td>
                                        <td>{{formatPrice(item.price)}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h4 style="text-align:center">Total {{formatPrice(data.total)}}</h4>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-dark" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        `,
        props: ["transaction"],
        methods : {
            formatPrice(price) {
                return `Rp. ${price.toLocaleString()}`
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