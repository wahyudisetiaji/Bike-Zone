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
    },
    methods : {

        login(){

            event.preventDefault()
            axios({
                method: 'POST',
                url: 'http://localhost:3000/users/login',
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
                console.log(err.response.data.message);
                if(err.response.data.message){
                    this.errorLogin = 'email or password is wrong !'
                }
                
            })
        },
        register(){
            event.preventDefault()
            axios({
                method: 'POST',
                url: 'http://localhost:3000/users/register',
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
                console.log(err.response);
                
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
        },
        createCart() {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/carts',
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    listItem: this.cart,
                    total: this.totalPrice
                }
            })
            .then((result) => {
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
                url: 'http://localhost:3000/carts',
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
        }

    },
    mounted() {

            axios({
                method: 'GET',
                url: 'http://localhost:3000/items',
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
        }

    }
    
})