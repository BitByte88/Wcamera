var App = function() {
    this.apiUrl = "/api/";
    this.service = "trsys";
    this.appId = "trittschaum"
};
(function() {
    App.prototype.login = function(c, a) {
        var b = {
            service: this.service,
            appId: this.appId,
            mailAddress: c,
            password: a,
            metadata: {}
        };
        return $.ajax({
            url: this.apiUrl + "login",
            type: "POST",
            data: JSON.stringify(b),
            contentType: "application/json",
            dataType: "json",
            scriptCharset: "utf-8"
        })
    };

    App.prototype.logout = function(b) {
        var a = {};
        var c = {
            service: this.service,
            appId: this.appId,
            authKey: b,
            metadata: a,
            _method: "DELETE"
        };
        return $.ajax({
            url: this.apiUrl + "logout",
            type: "DELETE",
            data: JSON.stringify(c),
            contentType: "application/json",
            dataType: "json",
            scriptCharset: "utf-8"
        })
    };

    App.prototype.createAccount = function(c, g, b, e, a, f) {
        var d = {
            service: this.service,
            appId: this.appId,
            authKey: c,
            mailAddress: g,
            password: b,
            userName: e,
            organization: a,
            authority: f
        };
        return $.ajax({
            url: this.apiUrl + "account/create",
            type: "POST",
            data: JSON.stringify(d),
            contentType: "application/json",
            dataType: "json",
            scriptCharset: "utf-8"
        })
    };

    App.prototype.getAccount = function(a) {
        var b = {
            service: this.service,
            appId: this.appId,
            authKey: a
        };
        return $.ajax({
            url: this.apiUrl + "account/get",
            type: "GET",
            data: b,
            contentType: "application/json",
            dataType: "json",
            scriptCharset: "utf-8"
        })
    };

    App.prototype.updateAccount = function(c, b, g, e, a, f) {
        var d = {
            service: this.service,
            appId: this.appId,
            authKey: c,
            userId: b,
            type: "account",
            mailAddress: g,
            userName: e,
            organization: a,
            authority: f
        };
        return $.ajax({
            url: this.apiUrl + "account/update",
            type: "PUT",
            data: JSON.stringify(d),
            contentType: "application/json",
            dataType: "json",
            scriptCharset: "utf-8"
        })
    };

    App.prototype.updateAccountPassword = function(a, c, d) {
        var b = {
            service: this.service,
            appId: this.appId,
            authKey: a,
            type: "password",
            oldPassword: c,
            newPassword: d
        };
        return $.ajax({
            url: this.apiUrl + "account/update",
            type: "PUT",
            data: JSON.stringify(b),
            contentType: "application/json",
            dataType: "json",
            scriptCharset: "utf-8"
        })
    };

    App.prototype.updateAccountSetting = function(b, a, d) {
        var c = {
            service: this.service,
            appId: this.appId,
            authKey: b,
            type: "setting",
            correctionValue: a,
            deleteNoticeFlag: d
        };
        return $.ajax({
            url: this.apiUrl + "account/update",
            type: "PUT",
            data: JSON.stringify(c),
            contentType: "application/json",
            dataType: "json",
            scriptCharset: "utf-8"
        })
    };

    App.prototype.deleteAccount = function(b, a) {
        return $.ajax({
            url: this.apiUrl + "account/delete?service=" + this.service + "&appId=" + this.appId + "&authKey=" + b + "&deleteId=" + a,
            type: "DELETE",
            dataType: "json",
            scriptCharset: "utf-8"
        })
    };

    App.prototype.getAccountList = function(a) {
        var b = {
            service: this.service,
            appId: this.appId,
            authKey: a
        };
        return $.ajax({
            url: this.apiUrl + "accounts/list",
            type: "GET",
            data: b,
            contentType: "application/json",
            dataType: "json",
            scriptCharset: "utf-8"
        })
    };

    App.prototype.getJobList = function(b, a, d) {
        var c = {
            service: this.service,
            appId: this.appId,
            authKey: b,
            datasetId: d,
            metadata: {
                downloadCode: a
            }
        };
        return $.ajax({
            url: this.apiUrl + "jobs/list",
            type: "GET",
            data: c,
            contentType: "application/json",
            dataType: "json",
            scriptCharset: "utf-8"
        })
    };

    App.prototype.getDatasetList = function(a) {
        var b = {
            service: this.service,
            appId: this.appId,
            authKey: a,
            metadata: {}
        };
        return $.ajax({
            url: this.apiUrl + "datasets/list",
            type: "GET",
            data: b,
            contentType: "application/json",
            dataType: "json",
            scriptCharset: "utf-8"
        })
    };

    App.prototype.createDataset = function(b, a, d) {
        var c = {
            service: this.service,
            appId: this.appId,
            authKey: b,
            name: a,
            metadata: {}
        };
        if (d) {
            c.datasetId = d
        }
        return $.ajax({
            url: this.apiUrl + "dataset/create",
            type: "POST",
            data: JSON.stringify(c),
            contentType: "application/json",
            dataType: "json",
            scriptCharset: "utf-8"
        })
    };

    App.prototype.appendImageToDataset = function(d, a, b) {
        var c = {
            service: this.service,
            appId: this.appId,
            authKey: b,
            datasetId: d,
            action: "append",
            metadata: {
                Img: a
            }
        };
        return $.ajax({
            url: this.apiUrl + "dataset/update",
            type: "PUT",
            data: JSON.stringify(c),
            contentType: "application/json",
            dataType: "json",
            scriptCharset: "utf-8"
        })
    };

    App.prototype.deleteImageFromDataset = function(d, a, b) {
        var c = {
            service: this.service,
            appId: this.appId,
            authKey: b,
            name: name,
            action: "delete",
            datasetId: d,
            metadata: {
                Img: a
            }
        };
        return $.ajax({
            url: this.apiUrl + "dataset/update",
            type: "PUT",
            data: JSON.stringify(c),
            contentType: "application/json",
            dataType: "json",
            scriptCharset: "utf-8"
        })
    };

    App.prototype.createJob = function(e, a, c, f, b) {
        var d = {
            service: this.service,
            appId: this.appId,
            authKey: b,
            name: a,
            datasetId: e,
            execution: f,
            metadata: {
                engineType: c
            }
        };
        return $.ajax({
            url: this.apiUrl + "job/create",
            type: "POST",
            data: JSON.stringify(d),
            contentType: "application/json",
            dataType: "json",
            scriptCharset: "utf-8"
        })
    };

    App.prototype.getDataset = function(a, c) {
        var b = {
            service: this.service,
            appId: this.appId,
            authKey: a,
            datasetId: c,
            metadata: {}
        };
        return $.ajax({
            url: this.apiUrl + "dataset/get",
            type: "GET",
            data: b,
            contentType: "application/json",
            dataType: "json",
            scriptCharset: "utf-8"
        })
    };

    App.prototype.getJobStatus = function(a, b) {
        var c = {
            service: this.service,
            appId: this.appId,
            authKey: b,
            type: "status",
            jobId: a,
            metadata: {}
        };
        return $.ajax({
            url: this.apiUrl + "job/get",
            type: "GET",
            data: c,
            contentType: "application/json",
            dataType: "json",
            scriptCharset: "utf-8"
        })
    };

    App.prototype.getJobOutput = function(a, b) {
        var c = {
            service: this.service,
            appId: this.appId,
            authKey: b,
            type: "data",
            jobId: a,
            metadata: {}
        };
        return $.ajax({
            url: this.apiUrl + "job/get",
            type: "GET",
            data: c,
            contentType: "application/json",
            dataType: "json",
            scriptCharset: "utf-8"
        })
    };

    App.prototype.executeJob = function(a, b) {
        var c = {
            service: this.service,
            appId: this.appId,
            authKey: b,
            jobId: a,
            type: "command",
            command: "execute"
        };
        return $.ajax({
            url: this.apiUrl + "job/update",
            type: "PUT",
            data: JSON.stringify(c),
            contentType: "application/json",
            dataType: "json",
            scriptCharset: "utf-8"
        })
    };

    App.prototype.terminateJob = function(a, b) {
        var c = {
            service: this.service,
            appId: this.appId,
            authKey: b,
            jobId: a,
            type: "command",
            command: "terminate"
        };
        return $.ajax({
            url: this.apiUrl + "job/update",
            type: "PUT",
            data: JSON.stringify(c),
            contentType: "application/json",
            dataType: "json",
            scriptCharset: "utf-8"
        })
    };

    App.prototype.updateDatasetName = function(d, a, b) {
        var c = {
            service: this.service,
            appId: this.appId,
            authKey: b,
            name: a,
            action: "overwrite",
            datasetId: d,
            metadata: {}
        };
        return $.ajax({
            url: this.apiUrl + "dataset/update",
            type: "PUT",
            data: JSON.stringify(c),
            contentType: "application/json",
            dataType: "json",
            scriptCharset: "utf-8"
        })
    };

    App.prototype.updateJobName = function(a, b, c) {
        var d = {
            service: this.service,
            appId: this.appId,
            authKey: c,
            jobId: a,
            name: b,
            type: "name"
        };
        return $.ajax({
            url: this.apiUrl + "job/update",
            type: "PUT",
            data: JSON.stringify(d),
            contentType: "application/json",
            dataType: "json",
            scriptCharset: "utf-8"
        })
    };

    App.prototype.deleteDataset = function(d, b) {
        var a = {};
        var c = {
            service: this.service,
            appId: this.appId,
            authKey: b,
            datasetId: d,
            metadata: a,
            _method: "DELETE"
        };
        return $.ajax({
            url: this.apiUrl + "dataset/delete",
            type: "DELETE",
            data: JSON.stringify(c),
            contentType: "application/json",
            dataType: "json",
            scriptCharset: "utf-8"
        })
    };

    App.prototype.deleteJob = function(a, c) {
        var b = {};
        var d = {
            service: this.service,
            appId: this.appId,
            authKey: c,
            jobId: a,
            metadata: b,
            _method: "DELETE"
        };
        return $.ajax({
            url: this.apiUrl + "job/delete",
            type: "DELETE",
            data: JSON.stringify(d),
            contentType: "application/json",
            dataType: "json",
            scriptCharset: "utf-8"
        })
    };

    App.prototype.createCampaigncode = function(a, d, b) {
        var c = {
            service: this.service,
            appId: this.appId,
            authKey: b,
            startDate: a,
            endDate: d
        };
        return $.ajax({
            url: this.apiUrl + "campaigncode/create",
            type: "POST",
            data: JSON.stringify(c),
            contentType: "application/json",
            dataType: "json",
            scriptCharset: "utf-8"
        })
    };

    App.prototype.getCampaigncodeList = function(a) {
        var b = {
            service: this.service,
            appId: this.appId,
            authKey: a
        };
        return $.ajax({
            url: this.apiUrl + "campaigncodes/list",
            type: "GET",
            data: b,
            contentType: "application/json",
            dataType: "json",
            scriptCharset: "utf-8"
        })
    };

    App.prototype.getCampaigncode = function(a) {
        var b = {
            service: this.service,
            appId: this.appId,
            campaignCode: a
        };
        return $.ajax({
            url: this.apiUrl + "campaigncode/get",
            type: "GET",
            data: b,
            contentType: "application/json",
            dataType: "json",
            scriptCharset: "utf-8"
        })
    };

    App.prototype.createDownload = function(b, a, c) {
        var d = {
            service: this.service,
            appId: this.appId,
            authKey: c,
            jobId: b,
            downloadCode: a
        };
        return $.ajax({
            url: this.apiUrl + "download/create",
            type: "POST",
            data: JSON.stringify(d),
            contentType: "application/json",
            dataType: "json",
            scriptCharset: "utf-8"
        })
    };

    App.prototype.getDownload = function(b, a, c) {
        var d = {
            service: this.service,
            appId: this.appId,
            authKey: c,
            jobId: b,
            downloadCode: a
        };
        return $.ajax({
            url: this.apiUrl + "download/get",
            type: "GET",
            data: d,
            contentType: "application/json",
            dataType: "json",
            scriptCharset: "utf-8"
        })
    };

    App.prototype.updateDownload = function(b, a, c) {
        var d = {
            service: this.service,
            appId: this.appId,
            authKey: c,
            jobId: b,
            downloadCode: a
        };
        return $.ajax({
            url: this.apiUrl + "download/update",
            type: "PUT",
            data: JSON.stringify(d),
            contentType: "application/json",
            dataType: "json",
            scriptCharset: "utf-8"
        })
    };

    App.prototype.getDownloadCount = function(a) {
        var b = {
            service: this.service,
            appId: this.appId,
            authKey: a
        };
        return $.ajax({
            url: this.apiUrl + "downloadCount/get",
            type: "GET",
            data: b,
            contentType: "application/json",
            dataType: "json",
            scriptCharset: "utf-8"
        })
    };

    App.prototype.showLoading = function(a) {
        if ($("#processingModal").length == 0) {
            var b = '<div id="processingModal"><div><i class="fa fa-spinner fa-spin fa-5x fa-fw"></i><p>&nbsp;</p></div></div>';
            $("body").append(b)
        }
        $("#processingModal").find("p").text(a).end().show()
    };

    App.prototype.hideLoading = function(a) {
        $("#processingModal").hide()
    }
}());