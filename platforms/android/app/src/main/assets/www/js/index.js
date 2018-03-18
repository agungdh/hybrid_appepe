/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
function cekLogin(nim, password) {
    const options = {
      method: 'post',
      data: { username: nim, password: password }
    };
     
    cordova.plugin.http.sendRequest(config.base_url + "api/login", options, function(response) {
     if (response.data != "") {
         var data = JSON.parse(response.data);
         json.login = data;
         window.localStorage.setItem('login', JSON.stringify(json.login));
         $("#navigasi").load('html/navigasi.html');
         navigasi("menuUtama");
        } else {
         swal({
             title: "ERROR",
             text: "Login GAGAL !!!",
             type: "error"
            });
         navigasi("login");
        }
    }, function(response) {
      alert(response.status);
      alert(response.error);
    });
}

function ambilDataPelanggaran(nim, password) {
    const options = {
      method: 'post',
      data: { username: nim, password: password }
    };
     
    cordova.plugin.http.sendRequest(config.base_url + "api/data_pelanggaran", options, function(response) {
      var data = JSON.parse(response.data);
      if (data.status == 1) {
            if (data.jumlah_pelanggaran > 0) {
              $.each(data.pelanggaran, function( index, value ) {
                $('#tabel').find('tbody').append(
                  "<tr>\
                  <td>" + value.tanggal_indo + "</td>\
                  <td>" + value.jenis + "</td>\
                  </tr>"
                );  
              });
            }
            $('#tabel').DataTable();
            $("body").attr("class", "");  
          } else {
            swal({
              title: "ERROR",
              text: "Login GAGAL !!!",
              type: "warning"
            });
            navigasi("login");
            $("#navigasi").html('');
          }
    }, function(response) {
      alert(response.status);
      alert(response.error);
    });
}

function apiPost(uri) {
    cordova.plugin.http.uploadFile(config.base_url + "api/test/test", {
        pesan: 'cobak cobak',
        username: json.login.user.username,
        password: json.login.user.password
    }, {}, uri, 'file', function(response) {
        swal({
         title: "SUCCESS",
         text: "Upload BERHASIL !!!",
         type: "success"
        });
    }, function(response) {
        swal({
         title: "ERROR",
         text: "Upload GAGAL !!!",
         type: "error"
        });
    });
}

function ambilFotoGaleri() {
    var pictureSource = navigator.camera.PictureSourceType;
    var destinationType = navigator.camera.DestinationType;
    var mediaType = navigator.camera.MediaType;

    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        destinationType: destinationType.FILE_URI,
        mediaType: mediaType.ALLMEDIA,
        sourceType: pictureSource.PHOTOLIBRARY
    });

    function onPhotoURISuccess(imageURI) {
        apiPost('file://' + imageURI);
    }

    function onFail(message) {
    }
}

function ambilFoto() {
    navigator.camera.getPicture(onSuccess, onFail, { quality: 100,
        destinationType: Camera.DestinationType.FILE_URI });

    function onSuccess(imageURI) {
        apiPost(imageURI);
    }

    function onFail(message) {

    }    
}

function ambilVideo() {
    navigator.device.capture.captureVideo(onSuccess, onFail, { limit: 1});

    function onSuccess(videoURI) {
        apiPost(videoURI[0].fullPath);
    }

    function onFail(message) {

    }    
}

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();