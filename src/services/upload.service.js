import axios from 'axios';

const API_URL = 'http://localhost:8080/api/';

class UploadFilesService {
  upload(file, userId, onUploadProgress) {
    let formData = new FormData();
    formData.append('file', file, `${userId}_avatar.jpg`);
    // formData.append('file', file);

    return axios.post(API_URL + 'upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress
    });
  }
  getFiles() {
    return axios.get(API_URL + 'files');
  }
}

export default new UploadFilesService();
