// const baseURL = `http://localhost:3000`
const baseURL = `https://server-bikezone.wahyudisetiaji.xyz`
var login = new Vue({
    el : "#app",
    data :{
        name: '',
        email : '',
        password :'',
        success: false,
        successRegister: '',
        errorLogin: '',
        errorRegister: [],
        isLogin: '',
        token: false,
        items: '',
        bike: '',
        totalCart: '',
        totalPrice: 0,
        cart: [],
        transaction: [],
        search: ''
    },
    methods : {

        login(){

            event.preventDefault()
            axios({
                method: 'POST',
                url: `${baseURL}/users/login`,
                data: {

                    email : this.email,
                    password : this.password
                    
                }
            })
            .then(result => {  
                let token = result.data.data.token;
                localStorage.setItem('token', token);
                this.isLogin = localStorage.getItem('token')
                this.email = '';
                this.password = '';


            })
            .catch(err => {
                console.log(err.response)
                
                if(err.response.data.message){
                    this.errorLogin = 'email or password is wrong !'
                }
                
            })
        },
        register(){
            event.preventDefault()
            axios({
                method: 'POST',
                url: `${baseURL}/users/register`,
                data: {
                    name : this.name,
                    email : this.email,
                    password : this.password
                    
                }
            })
            .then(result => {

                this.name = '';
                this.email = '';
                this.password = '';
                this.success = true

            })
            .catch(err => {

                if(err.response.data.err.errors.email.message){
                    this.errorRegister.push(err.response.data.err.errors.email.message)
                }
                if(err.response.data.err.errors.name.message){
                    this.errorRegister.push(err.response.data.err.errors.name.message)
                }
                
            })
        },
        logout() {
            localStorage.clear();
            this.token = false;
            this.totalCart = '';
            this.cart = [];
            this.isLogin = '';
            this.transaction = [];
        },
        oneItem(item, index) {
            this.bike = item
        },
        formatPrice(price) {
            return `Rp. ${price.toLocaleString()}`
        },
        buyItem(item, index) {
            this.cart.push(item);
            this.totalPrice += item.price;
            this.totalCart = this.cart.length;
        },
        itemCategory(category) {
  
            axios({
                method: 'GET',
                url: `${baseURL}/items/${category}`,
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
        },
        createCart() {
            axios({
                method: 'POST',
                url: `${baseURL}/carts`,
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    listItem: this.cart,
                    total: this.totalPrice
                }
            })
            .then((result) => {
                swal('Cart success create !, you can check email or your transaction')
                this.cart = [];
                this.totalCart = '';
                this.totalPrice = 0;
            })
            .catch((err) => {
                console.log(err.response);
            });
        },
        myTransaction(){
            axios({
                method: 'GET',
                url: `${baseURL}/carts`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then((result) => {
                this.transaction = result.data.result;
            })
            .catch((err) => {
                console.log(err);
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

    },
    created() {
        let token = localStorage.getItem('token');
        if(token) {
            this.token = true;

        }
    },
    mounted() {

            axios({
                method: 'GET',
                url: `${baseURL}/items`,
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

    },
    watch: {

        success: function(newSuccess, oldSuccess) {
            if(newSuccess){
                this.successRegister = 'Please login now !'
            }
        },
        errorRegister: function() {
           
        },
        isLogin: function(newIslogin, oldIsLogin){
            if(newIslogin) {
                this.token = true;
            }
        },
        search: function(newSearch, oldLogin) {
            if(newSearch) {
                axios({
                    method: 'GET',
                    url: `${baseURL}/items/search/${newSearch}`,
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then((result) => {
                    this.items = result.data.items
                    
                })
                .catch((err) => {
                    console.log(err);
                });
            }
        }

    }
    
})