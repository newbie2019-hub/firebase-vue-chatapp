<template>
  <div id="Login">
    <div class="container h-100" style="height: 100vh !important">
      <div class="row h-100 justify-content-center align-items-center">
        <div
          id="loginbox"
          style=""
          class="col-md-8 col-lg-5 col-sm-8"
          v-if="Login"
        >
          <div class="card p-4">
            <div class="card-header">
              <span style="font-size: 1.5rem">Welcome!</span> <br />
              Please Login to proceed.
            </div>
            <div
              class="alert alert-danger mt-3 ml-3 mr-3"
              role="alert"
              v-if="loginErrors.length > 0">
              <p v-for="(error, i) in loginErrors" :key="i">{{ error }}</p>
            </div>
            <div
              class="alert alert-danger"
              role="alert"
              v-if="errors.length > 0"
            >
              <p v-for="(error, i) in errors" :key="i">{{ error }}</p>
            </div>
            <form id="loginform" class="form-horizontal" role="form" style="">
              <div
                style="
                  margin-bottom: 25px;
                  margin-top: 25px;
                  padding-left: 15px;
                  padding-right: 15px;
                "
                class="input-group"
              >
                <input
                  id="username"
                  type="text"
                  class="form-control"
                  name="username"
                  value=""
                  v-model="data.username"
                  placeholder="Username"
                />
              </div>

              <div
                style="
                  margin-bottom: 25px;
                  padding-left: 15px;
                  padding-right: 15px;
                "
                class="input-group"
              >
                <span class="input-group-addon"
                  ><i class="glyphicon glyphicon-lock"></i
                ></span>
                <input
                  id="login-password"
                  type="password"
                  class="form-control"
                  name="password"
                  placeholder="*******"
                  v-model="data.password"
                />
              </div>
              <div style="margin-top: 10px" class="form-group">
                <!-- Button -->
                <div class="col-sm-12 controls">
                  <button @click.prevent="LoginUser" id="btn-login" href="#" class="btn btn-success btn-block" :disabled="isLoading">
                    {{isLoading ? 'Loading ..' : 'Login'}}
                  </button>
                </div>
              </div>

              <div class="form-group">
                <div class="col-md-12 control">
                  <div style="
                      border-top: 1px solid#888;
                      padding-top: 15px;
                      font-size: 85%;">
                    Don't have an account!
                    <a href="#" @click.prevent="Login = !Login">
                      Sign Up Here
                    </a>
                  </div>
                </div>
                <div class="col-md-12">
                  <div style="
                      padding-top: 15px;
                      font-size: 85%;">
                    Sign-in with 
                    <a href="#" @click.prevent="LogInWithGoogle">
                      Google Account
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div
          id="signupbox"
          style=""
          class="col-md-8 col-lg-5 col-sm-8"
          v-if="!Login"
        >
          <div class="card p-4">
            <div class="card-header">
              <span style="font-size: 1.5rem">Welcome!</span> <br />
              We need your ...
            </div>
            <div
              class="alert alert-danger mt-3 ml-3 mr-3"
              role="alert"
              v-if="errors.length > 0">
              <p v-for="(error, i) in errors" :key="i">{{ error }}</p>
            </div>
            <form
              id="signupform"
              ref="signupForm"
              class="form-horizontal"
              role="form"
              style=""
            >
              <div
                style="
                  margin-bottom: 25px;
                  margin-top: 25px;
                  padding-left: 15px;
                  padding-right: 15px;
                "
                class="input-group"
              >
                <input
                  id="username"
                  type="text"
                  class="form-control"
                  name="username"
                  value=""
                  v-model="signup.username"
                  placeholder="Username"
                />
              </div>

              <div style="margin-bottom: 25px; padding-left: 15px; padding-right: 15px;" class="input-group">
                <input
                  id="password"
                  type="password"
                  class="form-control"
                  name="password"
                  v-model="signup.password"
                  placeholder="Enter Password"
                />
              </div>
              <div
                style="
                  margin-bottom: 25px;
                  padding-left: 15px;
                  padding-right: 15px;
                "
                class="input-group"
              >
                <input
                  id="cpassword"
                  type="password"
                  class="form-control"
                  name="password"
                  v-model="signup.cpassword"
                  placeholder="Confirm Password"
                  @keypress.enter="VerifyPassword"
                />
              </div>
              <div style="margin-top: 10px" class="form-group">
                <!-- Button -->
                <div class="col-sm-12 controls">
                  <button id="btn-login" href="#" @click.prevent="SignUp" class="btn btn-primary btn-block" :disabled="isLoading">
                    {{isLoading ? 'Loading ...' : 'Sign Up'}}
                  </button>
                </div>
              </div>

              <div class="form-group">
                <div class="col-md-12 control">
                  <div
                    style="
                      border-top: 1px solid#888;
                      padding-top: 15px;
                      font-size: 85%;
                    "
                  >
                    Already have an account?
                    <a href="#" @click.prevent="Login = !Login"> Sign In </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      data: {
        username: "",
        password: "",
      },
      signup: {
        username: "",
        password: "",
        cpassword: "",
      },
      Login: true,
      confirmed: false,
      errors: [],
      loginErrors: [],
      isLoading: false,
    };
  },
  methods: {
    async CheckAcc(){
      this.isLoading = true
      let err = [];  

      const check_username = db.collection("users");
      const snapshot = await check_username.where("username", "==", this.signup.username).get();

      if (snapshot.empty) {
        var signup = db.collection("users").doc();
        signup.set({
          username: this.signup.username,
          password: this.signup.password,
          created_at: new Date(),
        });
        this.signup.username = ''
        this.signup.password = ''
        this.signup.cpassword = ''
        this.Login = true
      }
      else
      {
        err.push("• Username already taken!");
      }
      this.isLoading = false
      this.errors = err;
    },
    LogInWithGoogle(){
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      firebase.auth().signInWithPopup(provider).then(result=> {
        var token = result.credential.accessToken;
        var user = result.user;

        this.$router.push('/')
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm=>{

      firebase.auth().onAuthStateChanged(user=>{
        if(user){
          vm.$router.push('/')
        }
      })

    })
  },
  
};
</script>
<style scoped>
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-bottom: 0 !important;
}
</style>