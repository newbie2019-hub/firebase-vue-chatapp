<template>
  <div>
    <div class="container mt-5" style="min-height: 80vh; max-height: 80vh; overflow-y: auto">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 mr-2 msg_history">
        <div v-for="(message, i) in messages" :key="i">
          <div class="row mt-2 ml-1" v-if="message.email != authUser.email">
            <img :src="message.photoURL" alt="" width="40px" class="mr-2">
            <div class="card pl-5 pr-5 pt-2 pb-2">
            {{message.message}}
            </div>
          </div>
          <div class="row mt-2 mr-1 justify-content-end" v-else>
            <div class="card pl-5 pr-5 pt-2 pb-2">
            {{message.message}}
            </div>
            <img :src="message.photoURL" alt="" width="40px" class="ml-2">
          </div>
        </div>
      </div>
      <div class="input-container">
        <input type="text" class="form-control" v-model="message" placeholder="Press enter to send message" @keypress.enter="saveMessage">
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="welcomeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Welcome, User!</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            This is a public chat. You are not allowed to send vulgar or bad words. Thank you!
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      message: '',
      messages: [],
      authUser: {},
    };
  },
  methods: {
    scrollToBottom() {
      let box = document.querySelector('.container');
      box.scrollTop = box.scrollHeight;
    },
    saveMessage() {
      var Filter = require('bad-words'),
      filter = new Filter();
      filter.addWords('some', 'bad', 'word');
      var badWords = [
        'pota',
        'pta',
        'yawa',
        'ywa',
        'nmeroy',
        'eroy',
        'demonyo',
      ]
      filter.addWords(...badWords)
      if(this.message.trim() == '')
      return alert('Message is required')

      this.message = filter.clean(this.message)
      //Save to firestore
      db.collection("chat").add({
        message: this.message,
        datetime: new Date(),
        user: this.authUser['displayName'],
        email: this.authUser['email'],
        photoURL: this.authUser['photoURL']
      }).then(()=>{
        this.scrollToBottom()
      });
      this.message = '';
      
    },
    fetchMessage() {
      //retrieve firestore collection automatically

      db.collection("chat").orderBy('datetime', 'asc').onSnapshot((snapshot) => {
        let allMessages = [];
        snapshot.forEach((chat) => {
          allMessages.push(chat.data());
          this.scrollToBottom()
        });
        this.messages = allMessages;
        this.scrollToBottom()
      });
    
    },
  },
  created() {
    this.fetchMessage();
    $('#welcomeModal').modal('show')
    firebase.auth().onAuthStateChanged(user=>{
        if(user){
          this.authUser = user
          console.log(this.authUser)
        }
        else
        {
          this.authUser ={}
        }
    })
  },
  components: {},
  beforeRouteEnter (to, from, next) {
    next(vm=>{

      firebase.auth().onAuthStateChanged(user=>{
        if(user){
          next();
        }
        else
        {
          vm.$router.push('/login')
        }
      })

    })
  },
};
</script>


<style scoped>
.input-container {
  bottom: 5%;
  left: 0;
  position: fixed;
  width: 100%;
  max-width: 80%;
  margin-left: 50%;
  transform: translateX(-50%)
}
</style>