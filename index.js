
var app = new App();
var isAssistEnabled;
var imgIdIdx = 0;
<!--郭
//var authKey = localStorage.authKey;
-->

// ヘッダー情報取得
localStorage.organization = "共通ヘッダー";
var organization = localStorage.organization;
$(".orgName").html(organization);

//$('.drawer').drawer();
<!--郭
//objectFitImages( '.thumbnailList img' );
-->

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
<!--郭
//$('#logout').click(function() {
//    // ログアウトAPI
//    app.logout(authKey).then(function(res) {
//        localStorage.removeItem('userName');
//        localStorage.removeItem('organization');
//        localStorage.removeItem('targetJobId');
//        sessionStorage.clear();
//        location.href = "login.html";
//    }).catch(function() {
//        alert("予期しないエラーが発生しました。\nログインからやり直してください。");
//        localStorage.removeItem('userName');
//        localStorage.removeItem('organization');
//        localStorage.removeItem('targetJobId');
//        localStorage.removeItem('autoLogin');
//        sessionStorage.clear();
//        location.href = "login.html";
//        return false;
//    }).then(function() {
//        app.hideLoading();
//        return false;
//    });
//});
-->
$(document).on('click', '[data-transition-id]', function() {
    var dest = $(this).data('transition-id');
    <!-- 「撮影する」ボタン押下 -->
    if (dest == 'V-NEW-2') {
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
              alert(err);
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
      <!--郭
//      $('#V-NEW-2 .photoNum').text($('#V-NEW-2 .results img').length + '枚').css('display', 'block');
      -->
      updateMetaViewport();
      <!--郭
//      isAssistEnabled = !isPhotoRegistered() && $('#assistCheck').prop('checked');
      -->
      isAssistEnabled = $('#assistCheck').prop('checked');
      if (isAssistEnabled) {
          <!--郭
//          showAssist(0);
          -->
          showAssist(4);
      } else {
          hideAssist();
      }
    } else {
      resetMetaViewport();
      <!-- 「撮影」ボタン押下 -->
      if (dest == 'V-NEW-3') {
        <!-- 郭
//        $('#V-NEW-3 ul.thumbnails').empty();
//        $('#V-NEW-2 .results img').each(function() {
//          var $img = $('<img></img>').attr('src', $(this).attr('src')).attr('data-img-id', $(this).attr('data-img-id'));
//          $('#V-NEW-3 ul.thumbnails').append($('<li></li>').append($img));
//        });
        -->
        var dataURL = canvas.toDataURL('image/jpeg');
        var img = document.createElement('img');
        var blob = base64ToFile(dataURL);
        var dest = $(this).data('transition-id');
        $(img).on('load', function() {
          $('#V-NEW-3 .output').append($(img).attr({longdesc:"w/h:" + img.width + "/" + img.height + "," + getByteString(blob.size), 'data-img-id':imgIdIdx++}));
//          $('#V-NEW-2').closest('section').hide();
//          $('#' + dest).show("slide", { direction: "right"}, 200);
        });
        img.setAttribute('src', dataURL);
      <!-- 「撮影終了」ボタン押下 -->
      } else if (dest == 'V-NEW-1') {
        <!-- 郭
//        if (isPhotoRegistered()) {
//          $('.assistCheckWrapper').hide();
//        } else {
//          $('.assistCheckWrapper').show();
//        }
        -->
//        video.srcObject.getTracks()[0].stop();
      }
      $(this).closest('section').hide();
      $('#' + $(this).data('transition-id')).show("slide", { direction: "right"}, 200);
    }
    return false;
});

<!-- 「再撮影」ボタン押下 -->
$('#V-NEW-3 .btRetake').click(function() {
    var imgId = $('#V-NEW-3 .output img').attr('data-img-id');
    $('#V-NEW-3 img[data-img-id=' + imgId + ']').closest('img').remove();
    $('#V-NEW-3').closest('section').hide();
    $('#V-NEW-2').show("slide", { direction: "right"}, 200);
    updateMetaViewport();
});

<!-- 「画像解析」ボタン押下 -->
$('#V-NEW-3 .btPhotoAnalysis').click(function() {
    showLoading('画像分析中');
    var b64 = $('#V-NEW-3 .output img').attr('src');
    var timestamp = new Date();
    var fileName = timestamp.getFullYear() + (timestamp.getMonth() + 1) + timestamp.getDate()
    + timestamp.getHours() + timestamp.getMinutes() + timestamp.getSeconds() + timestamp..getMilliseconds();
    saveBase64AsFile(b64, fileName);
//    $.ajax({
//        url:
//    });
});

<!-- 画像ファイルテスト用 -->
function saveBase64AsFile(base64, fileName) {
    var link = document.createElement("a");

    document.body.appendChild(link); // for Firefox

    link.setAttribute("href", base64);
    link.setAttribute("download", fileName);
    link.click();
}

$('#registPhoto').click(function() {
    var err = [];
    $('ul.error').empty();
    $('ul.error').hide();
    var datasetName = $('input[name="name"]').val();
    if (datasetName.length > 50) {
        err.push("データセット名は50文字以内で設定してください。");
    }
    if ($('#V-NEW-2 .results img').length > 20) {
        err.push("画像は20枚以内で設定してください。");
    }
    if (err.length > 0) {
      for (var i in err) {
          $('ul.error').append($('<li></li>').text(err[i]));
      }
      $('ul.error').show();
      return false;
    }

    app.showLoading('画像を登録中');
    // データセット新規作成
    app.createDataset(authKey, datasetName).then(function(res) {
        var datasetId = res.datasetid;
        var imgNameIdx = 1;
        var promises = [];
        $('#V-NEW-2 .results img').each(function() {
            // 画像取得
            var b64 = $(this).attr('src');
            // データセット更新API(action=append)
            promises.push(app.appendImageToDataset(datasetId, b64, authKey));
        });
        Promise.all(promises).then(function(res) {
            app.showLoading('3Dデータ変換処理を開始中');
            var engineType = '';
            // ジョブ新規作成　datasetId, name, engineType, execution, authKey
            app.createJob(datasetId, datasetName, engineType, "false", authKey).then(function(res) {
                // ジョブ更新(type=command, command=execute)
                app.executeJob(res.jobid, authKey).then(function() {
                    location.href = "main.html";
                }).catch(function() {
                    alert("予期しないエラーが発生しました。\nログインからやり直してください。");
                    app.hideLoading();
                    localStorage.removeItem('userName');
                    localStorage.removeItem('organization');
                    localStorage.removeItem('targetJobId');
                    localStorage.removeItem('autoLogin');
                    sessionStorage.clear();
                    location.href = "login.html";
                    return false;
                });
            }).catch(function() {
                alert("予期しないエラーが発生しました。\nログインからやり直してください。");
                app.hideLoading();
                localStorage.removeItem('userName');
                localStorage.removeItem('organization');
                localStorage.removeItem('targetJobId');
                localStorage.removeItem('autoLogin');
                sessionStorage.clear();
                location.href = "login.html";
                return false;
            }).then(function() {
                app.hideLoading();
            });
        }).catch(function() {
            alert("予期しないエラーが発生しました。");
            app.hideLoading();
        });
    }).catch(function() {
        alert("予期しないエラーが発生しました。\nログインからやり直してください。");
        app.hideLoading();
        localStorage.removeItem('userName');
        localStorage.removeItem('organization');
        localStorage.removeItem('targetJobId');
        localStorage.removeItem('autoLogin');
        sessionStorage.clear();
        location.href = "login.html";
    });
});

<!--郭  const medias = {audio : false, video : {facingMode : {exact: "environment"}}}, 携帯デバイスのみにする -->
const medias = {audio : false, video : {facingMode : "environment"}},
      video  = document.getElementById("video"),
      canvas = document.getElementById("canvas"),
      ctx    = canvas.getContext("2d");

function draw() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    requestAnimationFrame(draw);
}

<!-- 郭
//var imgIdIdx = 0;
//$('#takePhoto').click(function() {
//    var dataURL = canvas.toDataURL('image/jpeg');
//    var img = document.createElement('img');
//    var blob = base64ToFile(dataURL);
//    $(img).on('load', function() {
//        var $result = $('<li></li>');
//        $('#V-NEW-2 .results ul').prepend($result.append($("<p>w/h:" + img.width + "/" + img.height + "," + getByteString(blob.size) + "</p>")).append($(img).attr('data-img-id', imgIdIdx++)));
//        $('#V-NEW-2 .photoNum').text($('#V-NEW-2 .results img').length + '枚').css('display', 'block');
//        $('#V-NEW-1 .btViewPhoto').closest('li').css('display', 'block');
//        if (isAssistEnabled) {
//            showAssist($('#V-NEW-2 .results ul li').length);
//        }
//    });
//    img.setAttribute('src', dataURL);
//});
//
//$(document).on('click', '#V-NEW-3 .thumbnails img', function() {
//    $('#V-NEW-4 .thumbnailDetail').empty();
//    var img = document.createElement('img');
//    var imgId = $(this).attr('data-img-id');
//    $(img).on('load', function() {
//        $('#V-NEW-4 .thumbnailDetail').append($(img).attr('data-img-id', imgId));
//        $('#V-NEW-3').closest('section').hide();
//        $('#V-NEW-4').show("slide", { direction: "right"}, 200);
//    });
//    img.setAttribute('src', $(this).attr('src'));
//});
//
//$('#V-NEW-4 .btRemove').click(function() {
//    if (confirm('この画像を削除します。よろしいですか？')) {
//        var imgId = $('#V-NEW-4 .thumbnailDetail img').attr('data-img-id');
//        $('#V-NEW-2 img[data-img-id=' + imgId + ']').closest('li').remove();
//        $('#V-NEW-3 img[data-img-id=' + imgId + ']').closest('li').remove();
//        if ($('#V-NEW-3 ul.thumbnails li').length == 0) {
//            $('#V-NEW-1 .btViewPhoto, #V-NEW-1 .btRegistPhoto').closest('li').css('display', 'none');
//            $('.btBack[data-transition-id="V-NEW-3"]').attr('data-transition-id', 'V-NEW-1');
//            $('.btBack[data-transition-id="V-NEW-1"]').click();
//            $('.btBack[data-transition-id="V-NEW-1"]').attr('data-transition-id', 'V-NEW-3');
//        } else {
//            $('.btBack[data-transition-id="V-NEW-3"]').click();
//        }
//    }
//});
-->

function updateMetaViewport() {
    $('header').hide();
    var ua = navigator.userAgent.toLowerCase();
    var isiOS = (ua.indexOf("iphone") > -1) || (ua.indexOf("ipod") > -1) || (ua.indexOf("ipad") > -1);
    var width = 3000;
    if (isiOS) {
        $("meta[name='viewport']").attr("content", "width=" + width + "px,user-scalable=no,shrink-to-fit=yes");
        $('main').css({'margin-top': '-500px'});
        $('.assistWrapper').css({'margin-top': '500px'});
    } else {
        var scale = $(window).width() / width;
        $("meta[name='viewport']").attr("content", "initial-scale=" + scale + ",minimum-scale=" + scale + ",user-scalable=no,shrink-to-fit=yes");
        $('main').css({'margin-top': '-200px'});
        $('.assistWrapper').css({'margin-top': '200px'});
    }
}
function resetMetaViewport() {
    $('main').css({'margin-top': '0'});
    $('header').show();
    $("meta[name='viewport']").attr("content", "width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no");
}

<!-- 郭
//function isPhotoRegistered() {
//    return $('#V-NEW-2 .results ul li').length > 0;
//}
-->

function showAssist(i) {
	<!--郭
//    if (i < 11) {
//        $('#V-NEW-2 .assistWrapper span').text((i + 1) + '/11');
//        $('#V-NEW-2 .assistWrapper').attr('data-index', i).show();
//    } else {
//        hideAssist();
//    }
    -->
    $('#V-NEW-2 .assistWrapper').attr('data-index', i).show();
}

function hideAssist() {
    $('#V-NEW-2 .assistWrapper').removeAttr('data-index');
    $('#V-NEW-2 .assistWrapper').hide();
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
    $("#processingModal").find("p").text(a).end().show();
}
function hideLoading(a) {
    $("#processingModal").hide();
}