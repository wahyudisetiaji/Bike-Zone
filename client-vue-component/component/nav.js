Vue.component('navbarbike', {
    template: 
        `   <div>
                <nav class="navbar navbar-expand-lg fixed-top">
                <div class="container">
                <a class="navbar-brand" href="#">Bike-Zone</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item dropdown">
                            <a v-if="!token" class="nav-link dropdown-toggle" href="#" id="navbarDropdownBlog" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Login
                            </a>
                            <div v-if="!token" class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownBlog">
                                <div v-if="errorLogin">
                                    <div class="alert alert-danger" role="alert">
                                        {{errorLogin}}
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                </div>
                                <form  class="px-4 py-3">
                                    <div class="form-group">
                                    <label for="exampleDropdownFormEmail2">Email address</label>
                                    <input type="email" class="form-control" id="exampleDropdownFormEmail2" placeholder="email@example.com"  v-model="email"  required>
                                    </div>
                                    <div class="form-group">
                                    <label for="exampleDropdownFormPassword2">Password</label>
                                    <input type="password" class="form-control" id="exampleDropdownFormPassword2" placeholder="Password" v-model="password" required>
                                    </div>
                                    <button type="button" @click="login" class="btn btn-dark">Login</button>
                                </form>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Don't have account ? Register</a>
                            </div>
                        </li>
                        <li v-if="!token" class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownBlog" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Register
                            </a>
                            <div v-if="!token" class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownBlog">
                                <form class="px-4 py-3">
                                    <div v-if="successRegister" class="alert alert-success" role="alert">
                                        {{successRegister}}
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div v-if="errorRegister" v-for="err in errorRegister">
                                        <div class="alert alert-danger" role="alert">
                                            {{err}}
                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleDropdownFormName1">Name</label>
                                        <input type="text" class="form-control" id="exampleDropdownFormName1" placeholder="john doe" v-model="name" required>
                                    </div>
                                    <div class="form-group">
                                    <label for="exampleDropdownFormEmail1">Email address</label>
                                    <input type="email" class="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com" v-model="email" required>
                                    </div>
                                    <div class="form-group">
                                    <label for="exampleDropdownFormPassword1">Password</label>
                                    <input type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Password" v-model="password" required>
                                    </div>
                                    <button type="button" @click="register" class="btn btn-dark">Register</button>
                                </form>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Do you have account ? Login</a>
                            </div>
                        </li>
                        <li v-if="token" class="nav-item dropdown">
                            <div class="container">
                                <a href="#" data-toggle="modal" @click="myTransaction" data-target="#modalTransaction">My Transaction</a>
                            </div>
                            </li>
                        <li v-if="token" class="nav-item dropdown">
                            <div class="container">
                            <a href="#" data-toggle="modal" data-target="#modalCart">Cart: {{datacart.totalCart}}</a>
                            </div>
                        </li>
                        <li v-if="token" class="nav-item dropdown">
                            <div class="container">
                            <a href="#" @click="logout">Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
                </div>
            </nav>
       </div>
        `,
        props: ["datacart"],
        data() {
            return {
                name: '',
                email : '',
                password :'',
                success: false,
                successRegister: '',
                errorLogin: '',
                errorRegister: [],
                isLogin: '',
                token: false,
            }
        },
        methods : {
    
            login(){
    
                event.preventDefault()
                axios({
                    method: 'POST',
                    url: 'https://server-bikezone.wahyudisetiaji.xyzusers/login',
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
                    if(err.response.data.message){
                        this.errorLogin = 'email or password is wrong !'
                    }
                    
                })
            },
            register(){
                event.preventDefault()
                axios({
                    method: 'POST',
                    url: 'https://server-bikezone.wahyudisetiaji.xyz/users/register',
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
                this.isLogin = '';
            },
            myTransaction(){
                axios({
                    method: 'GET',
                    url: 'https://server-bikezone.wahyudisetiaji.xyz/carts',
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then((result) => {
                    let transaction = result.data.result;
                    this.$emit('data-transaction', transaction)
                })
                .catch((err) => {
                    console.log(err);
                });
            }
    
        },
        created() {
            let userToken = localStorage.getItem('token')
            if(userToken) {
                this.token = true
            }
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
                    this.$emit('data-token', this.token)
                }
            }
    
        }
        
})