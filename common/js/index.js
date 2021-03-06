//var app = new App();
var buttonDiv;
var isAssistEnabled = "true";
var imgIdIdx = 0;
var apiUrl = "./api/";
var count = 0;
var code = null;
/* 郭
var authKey = localStorage.authKey;
*/

// ヘッダー情報取得
localStorage.organization = "共通ヘッダー";
var organization = localStorage.organization;
$(".orgName").html(organization);

//$('.drawer').drawer();
/* 郭
objectFitImages( '.thumbnailList img' );
$(".iziModal").iziModal();

$('#assistCheck').change(function() {
    localStorage.assistCheck = $('#assistCheck').prop('checked');
});
if (localStorage.assistCheck && localStorage.assistCheck == "false") {
    $('#assistCheck').prop('checked', false);
} else {
    localStorage.assistCheck = "true";
}
$('#assistCheck').closest('.assistCheckWrapper').show();

$('#logout').click(function() {
    // ログアウトAPI
    app.logout(authKey).then(function(res) {
        localStorage.removeItem('userName');
        localStorage.removeItem('organization');
        localStorage.removeItem('targetJobId');
        sessionStorage.clear();
        location.href = "login.html";
    }).catch(function() {
        alert("予期しないエラーが発生しました。\nログインからやり直してください。");
        localStorage.removeItem('userName');
        localStorage.removeItem('organization');
        localStorage.removeItem('targetJobId');
        localStorage.removeItem('autoLogin');
        sessionStorage.clear();
        location.href = "login.html";
        return false;
    }).then(function() {
        app.hideLoading();
        return false;
    });
});
*/
$(document).on('click', '[data-transition-id]', function() {
    var dest = $(this).data('transition-id');

    /* 「撮影する」ボタン押下 */
    if (dest == 'V-NEW-2') {
      buttonDiv = $(this).attr('id');
      if (!video.srcObject) {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia(medias)
            .then(function(stream) {
              video.srcObject = stream;
              video.onloadedmetadata = function() {
                var ratio = $(window).width() / video.videoWidth;
                video.width = $(window).width();
                video.height = video.videoHeight * ratio;
                canvas.width = video.width;
                canvas.height = video.height;
                $('#takePhoto').show();
              };
              $('#V-NEW-1').closest('section').hide();
              $('#' + dest).show("slide", { direction: "right"}, 200);
            }).catch(function(err) {
              alert("スマホでご利用お願います。");
              resetMetaViewport();
              $('#V-NEW-2').closest('section').hide();
              $('#V-NEW-1').show();
              return false;
            });
          requestAnimationFrame(draw);
        } else {
          alert("navigator.mediaDevices not supported");
          $('#V-NEW-1').closest('section').hide();
          $('#' + dest).show("slide", { direction: "right"}, 200);
          //return false;
        }
      } else {
        $('#V-NEW-1').closest('section').hide();
        $('#' + dest).show("slide", { direction: "right"}, 200);
      }
      /* 郭
      $('#V-NEW-2 .photoNum').text($('#V-NEW-2 .results img').length + '枚').css('display', 'block');
      */
      updateMetaViewport();
      /* 郭
      isAssistEnabled = !isPhotoRegistered() && $('#assistCheck').prop('checked');
      */
      if (isAssistEnabled) {
          /* 郭
          showAssist(0);
          */
          showAssist(4);
      } else {
          hideAssist();
      }
    } else {
      /* 「撮影」ボタン押下 */
      if (dest == 'V-NEW-3') {
        /* 郭
        $('#V-NEW-3 ul.thumbnails').empty();
        $('#V-NEW-2 .results img').each(function() {
          var $img = $('<img></img>').attr('src', $(this).attr('src')).attr('data-img-id', $(this).attr('data-img-id'));
          $('#V-NEW-3 ul.thumbnails').append($('<li></li>').append($img));
        });
        */
        resetMetaViewport();
        var base64 = canvas.toDataURL('image/jpeg');
        var img = document.createElement('img');
        var blob = base64ToFile(base64);
        var dest = $(this).data('transition-id');
        $(img).on('load', function() {
          $('#V-NEW-3 .output').append($(img).attr({longdesc:"w/h:" + img.width + "/" + img.height + "," + getByteString(blob.size), 'data-img-id':imgIdIdx++}));
        });



//        var base64Trim = canvas.toDataURL('image/jpeg');
//        var imgTrim = document.createElement('img');
//        canvasTrim = document.createElement("canvas");
//        ctxTrim = canvasTrim.getContext("2d");
//        $(imgTrim).on('load', function() {
////          ctxTrim.drawImage(base64Trim, 0, 700, 100, 20, 0, 0, 100, 20);
//          ctxTrim.drawImage(base64Trim, 0, 0, canvas.width, canvas.height);
//        });
//
//        var base64 = canvasTrim.toDataURL('image/jpeg');
//        var img = document.createElement('img');
//        var blob = base64ToFile(base64);
//        var dest = $(this).data('transition-id');
//        $(img).on('load', function() {
//          $('#V-NEW-3 .output').append($(img).attr({longdesc:"w/h:" + img.width + "/" + img.height + "," + getByteString(blob.size), 'data-img-id':imgIdIdx++}));
//        });




        img.setAttribute('src', base64);
        $(this).closest('section').hide();
        $('#' + $(this).data('transition-id')).show("slide", { direction: "right"}, 200);

      /* 「撮影終了」、「戻る」ボタン押下 */
      } else if (dest == 'V-NEW-1') {
        /* 郭
        if (isPhotoRegistered()) {
          $('.assistCheckWrapper').hide();
        } else {
          $('.assistCheckWrapper').show();
        }
        */
        resetMetaViewport();
        if(video.srcObject) {
          video.srcObject.getVideoTracks()[0].stop();
          video.srcObject = null;
        } else {
          videoQr.srcObject.getVideoTracks()[0].stop();
          videoQr.srcObject = null;
        }
        $(this).closest('section').hide();
        $('#' + $(this).data('transition-id')).show("slide", { direction: "right"}, 200);
      }
    }

    /* 「QRコード」ボタン押下 */
    if (dest == 'V-NEW-4') {
      if (!videoQr.srcObject) {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia(mediasQr)
            .then(function(stream) {
              videoQr.srcObject = stream;
              videoQr.onloadedmetadata = function() {
                var ratio = $(window).width() / videoQr.videoWidth;
                videoQr.width = $(window).width();
                videoQr.height = videoQr.videoHeight * ratio;
                canvasQr.width = videoQr.width;
                canvasQr.height = videoQr.height;
              };
              $('#V-NEW-1').closest('section').hide();
              $('#' + dest).show("slide", { direction: "right"}, 200);
            }).catch(function(err) {
              alert("スマホでご利用お願います。");
              resetMetaViewport();
              $('#V-NEW-4').closest('section').hide();
              $('#V-NEW-1').show();
              return false;
            });
          requestAnimationFrame(drawQr);
        } else {
          alert("navigator.mediaDevices not supported");
          $('#V-NEW-1').closest('section').hide();
          $('#' + dest).show("slide", { direction: "right"}, 200);
          //return false;
        }
      } else {
        $('#V-NEW-1').closest('section').hide();
        $('#' + dest).show("slide", { direction: "right"}, 200);
      }
      updateMetaViewport();
    }
    return false;
});

/* 「再撮影」ボタン押下 */
$('#V-NEW-3 .btRetake').click(function() {
    $('#V-NEW-3 ul.error').empty();
    $('#V-NEW-3 ul.error').hide();
    var imgId = $('#V-NEW-3 .output img').attr('data-img-id');
    $('#V-NEW-3 img[data-img-id=' + imgId + ']').closest('img').remove();
    $('#V-NEW-3').closest('section').hide();
    $('#V-NEW-2').show("slide", { direction: "right"}, 200);
    updateMetaViewport();
});

/* 「画像解析」ボタン押下 */
$('#V-NEW-3 .btPhotoAnalysis').click(function() {
    $('#V-NEW-3 ul.error').empty();
    $('#V-NEW-3 ul.error').hide();
//    showLoading('画像分析中、、、');
    showLoading('この処理は数秒～数十秒かかることがあります。<br>少々、お待ちくださいませ。');

    var base64 = $('#V-NEW-3 .output img').attr('src');
    if (base64) {
        var blob = base64ToFile(base64);
        var now = new Date();
        var fileName = "" + now.getFullYear() + padZero(now.getMonth() + 1) + padZero(now.getDate()) + padZero(now.getHours()) +
            padZero(now.getMinutes()) + padZero(now.getSeconds()) + padZero(now.getMilliseconds()) + ".jpg";
        function padZero(num) {
            return (num < 10 ? "0" : "") + num;
        }

        /**
         *  AJAX通信パラメータ
         *  @param blob 画像
         *  @param fileName ファイル名
         *  @param angle 撮影角度
         */
        var formData = new FormData();
        formData.append("blob", blob);
        formData.append("fileName", fileName);
        formData.append("angle", buttonDiv);
        $.ajax({
            type : "POST",
            url  : apiUrl,
            data : formData,
            processData : false,
            contentType : false
        }).done(function(data) {
            $('#V-NEW-3 ul.error').empty();
            $('#V-NEW-3 ul.error').hide();
            var jsonParsing = JSON.parse(data);
            alert(jsonParsing);
            hideLoading();
        }).fail(function(XMLHttpRequest, status, error) {
            hideLoading();
            $('#V-NEW-3 ul.error').append($('<li></li>').html('画像分析ができませんでした。<br>撮影ガイドに従い、再撮影してください。'));
            $('#V-NEW-3 ul.error').show();
        });
    } else {
        hideLoading();
        $('#V-NEW-3 ul.error').append($('<li></li>').html('鍵画像は必須項目です。'));
        $('#V-NEW-3 ul.error').show();
    }


//    /* 画像ファイルテスト用 */
//    saveBase64AsFile(b64, fileName);

});

///* 画像ファイルテスト用 */
//function saveBase64AsFile(base64, fileName) {
//    var link = document.createElement("a");
//
//    document.body.appendChild(link); // for Firefox
//
//    link.setAttribute("href", base64);
//    link.setAttribute("download", fileName);
//    link.click();
//}

//$('#registPhoto').click(function() {
//    var err = [];
//    $('ul.error').empty();
//    $('ul.error').hide();
//    var datasetName = $('input[name="name"]').val();
//    if (datasetName.length > 50) {
//        err.push("データセット名は50文字以内で設定してください。");
//    }
//    if ($('#V-NEW-2 .results img').length > 20) {
//        err.push("画像は20枚以内で設定してください。");
//    }
//    if (err.length > 0) {
//      for (var i in err) {
//          $('ul.error').append($('<li></li>').text(err[i]));
//      }
//      $('ul.error').show();
//      return false;
//    }
//
//    app.showLoading('画像を登録中');
//    // データセット新規作成
//    app.createDataset(authKey, datasetName).then(function(res) {
//        var datasetId = res.datasetid;
//        var imgNameIdx = 1;
//        var promises = [];
//        $('#V-NEW-2 .results img').each(function() {
//            // 画像取得
//            var b64 = $(this).attr('src');
//            // データセット更新API(action=append)
//            promises.push(app.appendImageToDataset(datasetId, b64, authKey));
//        });
//        Promise.all(promises).then(function(res) {
//            app.showLoading('3Dデータ変換処理を開始中');
//            var engineType = '';
//            // ジョブ新規作成　datasetId, name, engineType, execution, authKey
//            app.createJob(datasetId, datasetName, engineType, "false", authKey).then(function(res) {
//                // ジョブ更新(type=command, command=execute)
//                app.executeJob(res.jobid, authKey).then(function() {
//                    location.href = "main.html";
//                }).catch(function() {
//                    alert("予期しないエラーが発生しました。\nログインからやり直してください。");
//                    app.hideLoading();
//                    localStorage.removeItem('userName');
//                    localStorage.removeItem('organization');
//                    localStorage.removeItem('targetJobId');
//                    localStorage.removeItem('autoLogin');
//                    sessionStorage.clear();
//                    location.href = "login.html";
//                    return false;
//                });
//            }).catch(function() {
//                alert("予期しないエラーが発生しました。\nログインからやり直してください。");
//                app.hideLoading();
//                localStorage.removeItem('userName');
//                localStorage.removeItem('organization');
//                localStorage.removeItem('targetJobId');
//                localStorage.removeItem('autoLogin');
//                sessionStorage.clear();
//                location.href = "login.html";
//                return false;
//            }).then(function() {
//                app.hideLoading();
//            });
//        }).catch(function() {
//            alert("予期しないエラーが発生しました。");
//            app.hideLoading();
//        });
//    }).catch(function() {
//        alert("予期しないエラーが発生しました。\nログインからやり直してください。");
//        app.hideLoading();
//        localStorage.removeItem('userName');
//        localStorage.removeItem('organization');
//        localStorage.removeItem('targetJobId');
//        localStorage.removeItem('autoLogin');
//        sessionStorage.clear();
//        location.href = "login.html";
//    });
//});

//const medias = {audio : false, video : {facingMode : {exact: "environment"}}},
const medias = {audio : false, video : {facingMode : "environment"}},
      video  = document.getElementById("video"),
      canvas = document.getElementById("canvas"),
      ctx    = canvas.getContext("2d");
const mediasQr = {audio : false, video : {facingMode : "environment"}},
      videoQr  = document.getElementById("videoQr"),
      canvasQr = document.getElementById("canvasQr"),
      ctxQr    = canvasQr.getContext("2d");

function draw() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    requestAnimationFrame(draw);
}

function drawQr() {
    count++;
    ctxQr.drawImage(videoQr, 0, 0, canvasQr.width, canvasQr.height);
    var imageData = ctxQr.getImageData(0, 0, canvasQr.width, canvasQr.height);
    if (count % 50 == 0) {
      code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });
    }
    if (code) {
      drawLineQrCode(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
      drawLineQrCode(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
      drawLineQrCode(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
      drawLineQrCode(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");

      $('#V-NEW-1 .inputQrCode').val(code.data);
      code = null;
      count = 0;

      resetMetaViewport();
      if (videoQr.srcObject) {
          videoQr.srcObject.getVideoTracks()[0].stop();
          videoQr.srcObject = null;
      }
      $('#V-NEW-4').closest('section').hide();
      $('#V-NEW-1').show("slide", { direction: "right"}, 200);

      return;

    } else {
      requestAnimationFrame(drawQr);
//      setTimeout(() => { requestAnimationFrame(drawQr); }, 3000);
    }
}

function drawLineQrCode(begin, end, color) {
  ctxQr.beginPath();
  ctxQr.moveTo(begin.x, begin.y);
  ctxQr.lineTo(end.x, end.y);
  ctxQr.lineWidth = 12;
  ctxQr.strokeStyle = color;
  ctxQr.stroke();
}

/* 郭
var imgIdIdx = 0;
$('#takePhoto').click(function() {
    var dataURL = canvas.toDataURL('image/jpeg');
    var img = document.createElement('img');
    var blob = base64ToFile(dataURL);
    $(img).on('load', function() {
        var $result = $('<li></li>');
        $('#V-NEW-2 .results ul').prepend($result.append($("<p>w/h:" + img.width + "/" + img.height + "," + getByteString(blob.size) + "</p>")).append($(img).attr('data-img-id', imgIdIdx++)));
        $('#V-NEW-2 .photoNum').text($('#V-NEW-2 .results img').length + '枚').css('display', 'block');
        $('#V-NEW-1 .btViewPhoto').closest('li').css('display', 'block');
        if (isAssistEnabled) {
            showAssist($('#V-NEW-2 .results ul li').length);
        }
    });
    img.setAttribute('src', dataURL);
});

$(document).on('click', '#V-NEW-3 .thumbnails img', function() {
    $('#V-NEW-4 .thumbnailDetail').empty();
    var img = document.createElement('img');
    var imgId = $(this).attr('data-img-id');
    $(img).on('load', function() {
        $('#V-NEW-4 .thumbnailDetail').append($(img).attr('data-img-id', imgId));
        $('#V-NEW-3').closest('section').hide();
        $('#V-NEW-4').show("slide", { direction: "right"}, 200);
    });
    img.setAttribute('src', $(this).attr('src'));
});

$('#V-NEW-4 .btRemove').click(function() {
    if (confirm('この画像を削除します。よろしいですか？')) {
        var imgId = $('#V-NEW-4 .thumbnailDetail img').attr('data-img-id');
        $('#V-NEW-2 img[data-img-id=' + imgId + ']').closest('li').remove();
        $('#V-NEW-3 img[data-img-id=' + imgId + ']').closest('li').remove();
        if ($('#V-NEW-3 ul.thumbnails li').length == 0) {
            $('#V-NEW-1 .btViewPhoto, #V-NEW-1 .btRegistPhoto').closest('li').css('display', 'none');
            $('.btBack[data-transition-id="V-NEW-3"]').attr('data-transition-id', 'V-NEW-1');
            $('.btBack[data-transition-id="V-NEW-1"]').click();
            $('.btBack[data-transition-id="V-NEW-1"]').attr('data-transition-id', 'V-NEW-3');
        } else {
            $('.btBack[data-transition-id="V-NEW-3"]').click();
        }
    }
});
*/

function updateMetaViewport() {
    $('header').hide();
    var ua = navigator.userAgent.toLowerCase();
    var isiOS = (ua.indexOf("iphone") > -1) || (ua.indexOf("ipod") > -1) || (ua.indexOf("ipad") > -1);
    var width = 3000;
    if (isiOS) {
        $("meta[name='viewport']").attr("content", "width=" + width + "px,user-scalable=no,shrink-to-fit=yes");
        $('main').css({'margin-top': '-450px'});
        $('.assistWrapper').css({'margin-top': '450px'});
    } else {
        var scale = $(window).width() / width;
        $("meta[name='viewport']").attr("content", "initial-scale=" + scale + ",minimum-scale=" + scale + ",user-scalable=no,shrink-to-fit=yes");
        $('main').css({'margin-top': '-450px'});
        $('.assistWrapper').css({'margin-top': '450px'});
    }
}
function resetMetaViewport() {
    $('main').css({'margin-top': '0'});
    $('header').show();
    $("meta[name='viewport']").attr("content", "width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no");
}

/* 郭
function isPhotoRegistered() {
    return $('#V-NEW-2 .results ul li').length > 0;
}
*/

function showAssist(i) {
	/*郭
    if (i < 11) {
        $('#V-NEW-2 .assistWrapper span').text((i + 1) + '/11');
        $('#V-NEW-2 .assistWrapper').attr('data-index', i).show();
    } else {
        hideAssist();
    }
    */
    $('#V-NEW-2 .assistWrapper').attr('data-index', i).show();
//    $('#V-NEW-2 .backGround').attr('data-index', 5).show();
}

function hideAssist() {
    $('#V-NEW-2 .assistWrapper').removeAttr('data-index');
    $('#V-NEW-2 .assistWrapper').hide();
//    $('#V-NEW-2 .backGround').removeAttr('data-index');
//    $('#V-NEW-2 .backGround').hide();
}

function base64ToFile(data) {
  try{
    let separetedDate = data.split(',');
    let mimeTypeData = separetedDate[0].match(/:(.*?);/);
    let mimeType = Array.isArray(mimeTypeData) ? mimeTypeData[0] : '';
    let decodedData = atob(separetedDate[1]);
    let dataLength = decodedData.length;
    let arrayBuffer = new ArrayBuffer(dataLength);
    let u8arr = new Uint8Array(arrayBuffer);

    for( let i = 0; i < dataLength; i +=1){
      u8arr[i] = decodedData.charCodeAt(i);
    }

    return new Blob([u8arr] , {type:mimeType});

  }catch (errors){
    console.log(errors);
    return new Blob([])
  }
}

function getByteString (size) {
  var target = getTarget(size);
  var d = Math.pow(10, 2);
  var newSize = target !== null ? Math.floor((size / target.target) * d) / d : size;
  return newSize + target.unit;
}
function getTarget (size) {
  var kb = 1024
  var mb = Math.pow(kb, 2)
  var gb = Math.pow(kb, 3)
  var tb = Math.pow(kb, 4)

  if (size >= tb) return { target: tb, unit: 'TB' }
  if (size >= gb) return { target: gb, unit: 'GB' }
  if (size >= mb) return { target: mb, unit: 'MB' }
  if (size >= kb) return { target: kb, unit: 'KB' }

  return { target: null, unit: 'byte' }
}

function showLoading(a) {
    if ($("#processingModal").length == 0) {
        var b = '<div id="processingModal"><div><i class="fa fa-spinner fa-spin fa-5x fa-fw"></i><p>&nbsp;</p></div></div>';
        $("body").append(b);
    }
//    $("#processingModal").find("p").text(a).end().show();
    $("#processingModal").find("p").html(a).end().show();
}
function hideLoading(a) {
    $("#processingModal").hide();
}