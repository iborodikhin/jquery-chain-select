jQuery.fn.extend({
    chain: function(options) {
        if (typeof(options) == 'undefined') {
            return false;
        }

        if (typeof(options['empty']) == 'undefined') {
            options['empty'] = 'выберите значение';
        }

        if (typeof(options['url']) == 'undefined') {
            options.url = location.href;
        }

        if (typeof(options['param']) == 'undefined') {
            options['param'] = 'id';
        }

        if (typeof(options['target']) == 'undefined') {
            return false;
        }

        $(this).change(function () {
            var value = $(this).val();
            var obj   = $(options['target']);
            obj.html('');

            if (value != '') {
                requestData = {};
                requestData[options['param']] = value;
                $.getJSON(options['url'], requestData, function (data) {
                    for (x in data) {
                        if (typeof(data[x]) == "string") {
                            obj.append("<option value='"+x+"' label='"+data[x]+"'>"+data[x]+"</option>");
                        } else {
                            group = $("<optgroup label='"+x+"'></optgroup>");
                            for (y in data[x]) {
                                group.append("<option value='"+y+"' label='"+data[x][y]+"'>"+data[x][y]+"</option>");
                            }
                            obj.append(group);
                        }
                    }
                });
            } else {
                obj.append('<option value="">' + options['empty'] + '</option>');
            }
        })
    }
});