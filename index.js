; (function () {

    return $ = {

        _doajax: function (opt) {
            var url = opt.url,
                type = opt.type,
                async = opt.async || false,
                data = opt.data || null,
                success = opt.success,
                error = opt.error || function (res) { },
                complete = function () { };

            var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Micrsosft.XMLHTTP')
            xhr.open(type.toUpperCase(), url, async)
            type === 'POST' ? xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded') : ''
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    success(JSON.parse(xhr.responseText))
                }
                if(xhr.status===404){
                    error('请求错误')
                }
            }

            xhr.send(this.formatData(data))
        },
        formatData: function (opt) {
            var str = ''
            for (let k in opt) {
                str += k + '=' + opt[k] + '&'
            }
            return str.replace(/&$/, '')
        },
        ajax: function (opt) {
            this._doajax(opt)
        },
        get: function (url, success) {
            this._doajax({ url, type: 'GET', success })
        },
        post: function (url, data, success) {
            this._doajax({ url, data, type: 'POST', success })
        }

    }

}())