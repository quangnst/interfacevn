<template>
  <div>
    <v-row no-gutters justify="center" align="center">
      <v-col cols="8">
        <label for="avatar" class="mb-2 d-block subtitle-2">Avatar</label>
        <div
          class="avatar"
          @click="pickFile"
          style="max-width: 100px; cursor: pointer"
        >
          <input
            type="file"
            style="display: none"
            ref="image"
            accept="image/*"
            @change="onFilePicked"
          />
          <v-avatar size="80" v-if="this.currentUser.files || imageUrl">
            <img :src="imageUrl ? imageUrl : this.currentUser.files" />
          </v-avatar>
          <v-avatar size="80" v-else color="indigo">
            <v-icon dark large> fal fa-user </v-icon>
          </v-avatar>
        </div>
      </v-col>

      <v-col cols="4" class="pl-2">
        <v-btn
          :disabled="!selectedFile"
          color="success"
          dark
          small
          @click="uploadFiles"
        >
          Upload
          <v-icon right dark>fal fa-upload</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import UserServices from '../services/user.service';
import UploadService from '../services/upload.service';
import { mapActions } from 'vuex';
export default {
  name: 'upload-images',
  data() {
    return {
      selectedFile: false,
      imageFile: null,
      imageUrl: null,
      message: '',
    };
  },
  methods: {
    ...mapActions('snackbar', ['showSnack']),

    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(event) {
      // Preview image
      const files = event.target.files;
      if (files[0] !== undefined) {
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
        });

        this.selectedFile = true;
      } else {
        this.imageFile = null;
        this.imageUrl = null;
        this.selectedFile = false;
      }
    },
    upload(file) {
      UploadService.upload(file, this.currentUser._id)
        .then((response) => {
          let prevMessage = this.message ? this.message + '\n' : '';
          this.message = prevMessage + response.data.message;
          this.selectedFile = false;
          // return UploadService.getFiles();
        })
        .then(() => {
          let newUser = {
            _id: this.currentUser._id,
            username: this.currentUser.username,
            phone: this.currentUser.phone,
            files: this.imageUrl ? this.imageUrl : this.currentUser.files,
          };
          return UserServices.updateUser(newUser).then(
            (response) => {
              localStorage.setItem('user', JSON.stringify(response.data));

              this.showSnack({
                text: this.message,
                color: 'success',
                timeout: 3500,
              });
            },
            (error) => {
              console.log(error);
            }
          );
        })
        .catch(() => {
          this.message = 'Could not upload the image:' + file.name;
        });
    },
    uploadFiles() {
      this.message = '';
      this.upload(this.imageFile);
    },
  },
  computed: {
    userAvatar() {
      return `${this.id}_avatar`;
    },

    currentUser() {
      return this.$store.state.auth.user;
    },
  },
};
</script>
